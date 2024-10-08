"use client";
import { useChatFetcher } from "@/hooks/use-chat-fetcher";
import { Channel, User, Workspace } from "@/types/app";
import { FC } from "react";
import DotAnimatedLoader from "./dot-animated-loader";
import Typography from "./ui/typography";

type ChatMessagesProps = {
  userData: User;
  name: string;
  chatId: string;
  apiUrl: string;
  socketUrl: string;
  socketQuery: Record<string, string>;
  paramkey: "channelId" | "recipientId";
  paramValue: string;
  type: "Channel" | "DirectMessage";
  workspaceData: Workspace;
  channelData?: Channel;
};

const ChatMessages: FC<ChatMessagesProps> = ({
  userData,
  name,
  chatId,
  apiUrl,
  socketUrl,
  socketQuery,
  paramkey,
  paramValue,
  type,
  workspaceData,
  channelData,
}) => {
  const queryKey =
    type === "Channel" ? `channel:${chatId}` : `direct_message:${chatId}`;
  const { data, status, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useChatFetcher({
      queryKey,
      apiUrl,
      paramkey,
      paramValue,
      pageSize: 10,
    });

  if (status === "pending") return <DotAnimatedLoader />;
  if (status === "error") {
    return <div>Error Occured</div>;
  }

  const renderMessages = () =>
    data.pages.map((page) =>
      page.data.map((message) => (
        <div key={message.id} className="">
          {message ? message.content : "No message yet"}
        </div>
      ))
    );
  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessages;
