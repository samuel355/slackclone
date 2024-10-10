import { getUserDataPages } from "@/actions/getUserData";
import supabaseServerClientPages from "@/supabase/supabaseServerPages";
import { SocketIoApiResponse } from "@/types/app";
import { SupabaseClient } from "@supabase/supabase-js";
import { NextApiRequest } from "next";

export default async function handler(
  req: NextApiRequest,
  res: SocketIoApiResponse
) {
  if (!["DELETE", "PATCH"].includes(req.method!)) {
    return res.status(405).json({ message: "Method is not allowed" });
  }

  try {
    const userData = await getUserDataPages(req, res);

    if (!userData) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    const { messageId, channelId, workspaceId } = req.query as Record<
      string,
      string
    >;
    if (!messageId || !channelId || !workspaceId) {
      return res.status(400).json({ error: "Invalid request" });
    }
    const { content } = req.body;
    const supabase = supabaseServerClientPages(req, res);
    const { data: messageData, error } = await supabase
      .from("messages")
      .select("*, user:user_id(*)")
      .eq("id", messageId)
      .single();

    if (error || !messageData) {
      return res.status(404).json({ error: "Message not found" });
    }

    const isMessageOwner = messageData.user_id === userData.id;
    //type in ('user', 'admin', 'regulator')
    const isAdmin = userData.type === "admin";
    const isRegulator = userData.type === "regulator";
    const canEditMessage = isMessageOwner || !messageData.is_deleted;

    if (!canEditMessage) {
      return res.status(403).json({ error: "Forbidden" });
    }

    if (req.method === "PATCH") {
      if (!isMessageOwner) {
        return res.status(403).json({ error: "Forbidden" });
      }
      await updateMessageContent(supabase, messageId, content);
    } else if (req.method === "DELETE") {
      await deleteMessage(supabase, messageId);
    } else {
      return res.status(403).json({ error: "Something went wront" });
    }

    const { data: updatedMessage, error: messageError } = (await supabase
      .from("messages")
      .select("*, user:user_id(*)")
      .order("created_at", { ascending: true })
      .eq("id", messageId)
      .single()) as Record<string, any>;

    if (messageError || !updatedMessage) {
      return res.status(404).json({ error: "message not found" });
    }

    res?.socket?.server?.io?.emit(
      `channel: ${channelId}:channel-message:update`,
      updatedMessage
    );
    res.status(200).json({ message: updatedMessage });
  } catch (error) {
    console.log("MESSAGE ID ERROR", error);
    return res.status(500).json({ error: "Internal server error" });
  }
}

async function updateMessageContent(
  supabase: SupabaseClient,
  messageId: string,
  content: string
) {
  await supabase
    .from("message")
    .update({
      content,
      updated_at: new Date().toISOString(),
    })
    .eq("id", messageId)
    .select("*, user: user_id(*)")
    .single();
}

async function deleteMessage(supabase: SupabaseClient, messageId: string) {
  await supabase
    .from("message")
    .update({
      content: "This message has been deleted",
      updated_at: new Date().toISOString(),
      file_url: null,
      is_deleted: true,
    })
    .eq("id", messageId)
    .select("*, user: user_id(*)")
    .single();
}
