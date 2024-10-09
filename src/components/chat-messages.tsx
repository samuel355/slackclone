"use client";
import { useChatFetcher } from "@/hooks/use-chat-fetcher";
import { Channel, User, Workspace } from "@/types/app";
import { FC } from "react";
import DotAnimatedLoader from "./dot-animated-loader";
import Typography from "./ui/typography";
import ChatItem from "./chat-item";
import { format } from "date-fns";

const DATE_FORMAT = 'd MMM yyy, HH:mm'
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
        <ChatItem
          key={message.id}
          currentUser={userData}
          user={message.user}
          content={message.content}
          fileUrl={message.file_url}
          deleted ={message.is_deleted}
          id={message.id}
          timestamp={format(new Date (message.created_at), DATE_FORMAT)}
          isUpdated={message.updated_at !== message.created_at }
          socketQuery={socketQuery}
          socketUrl={socketUrl}
        />
      ))
    );
  return (
    <div className="flex flex-1 flex-col py-4 overflow-y-auto">
      <div className="flex flex-col-reverse mt-auto">{renderMessages()}</div>
    </div>
  );
};

export default ChatMessages;
