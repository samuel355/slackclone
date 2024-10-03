"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { Channel } from "@/types/app";

export const getUserWorkSpaceChannels = async (
  workspaceId: string,
  userId: string
) => {
  const supabase = await supabaseServerClient();
  const { data: workspaceChannelData, error: workspaceChannelError } =
    await supabase
      .from("workspaces")
      .select("channels")
      .eq("id", workspaceId)
      .single();

  if (workspaceChannelError) {
    console.log(workspaceChannelError);
    return [];
  }

  const channelId = workspaceChannelData.channels;
  if (!channelId || channelId.length <= 0) {
    console.log("No channels found");
    return [];
  }

  const { data: channelsData, error: channelsError } = await supabase
    .from("channels")
    .select("*")
    .in("id", channelId);

  if (channelsError) {
    console.log(channelsError);
    return [];
  }

  const userWorkSpaceChannels = channelsData.filter((channel) =>
    channel.members.includes(userId)
  );

  return userWorkSpaceChannels as Channel[];
};
