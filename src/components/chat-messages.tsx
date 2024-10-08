"use client";
import { useChatFetcher } from "@/hooks/use-chat-fetcher";
import { Channel, User, Workspace } from "@/types/app";
import { FC } from "react";
import DotAnimatedLoader from "./dot-animated-loader";

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
  const {data, status, fetchNextPage, hasNextPage, isFetchingNextPage} = useChatFetcher({
    queryKey,
    apiUrl,
    paramkey,
    paramValue,
    pageSize: 10,
  });
  
  if (status === "pending") return <DotAnimatedLoader />
  return <div>Messages t</div>;
};

export default ChatMessages;
