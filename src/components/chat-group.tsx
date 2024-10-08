"use client";
import { getUserData } from "@/actions/getUserData";
import { getUserWorkSpaceChannels } from "@/actions/getUserWorkSpaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/WorkSpaces";
import ChatHeader from "@/components/chat-header";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import TextEditor from "@/components/text-editor";
import Typography from "@/components/ui/typography";
import {
  Channel,
  User,
  Workspace as UserWorkspace,
  Workspace,
} from "@/types/app";
import { redirect } from "next/navigation";
import { FC } from "react";

type ChatGroupProps = {
  type: "Channel" | "DirectMessage";
  socketUrl: string;
  apiUrl: string;
  headerTitle: string;
  chatId: string;
  socketQuery: Record<string, string>;
  paramkey: "channelId" | "recipientId";
  paramValue: string;
  userData: User;
  currentWorkspaceData: Workspace;
  currentChannelData: Channel | undefined;
  userWorkspaceData: Workspace[];
  userWorkspaceChannels: Channel[];
  slug: string;
};

const ChatGroup: FC<ChatGroupProps> = async ({
  type,
  socketUrl,
  apiUrl,
  headerTitle,
  chatId,
  socketQuery,
  paramkey,
  paramValue,
  currentChannelData,
  currentWorkspaceData,
  slug,
  userData,
  userWorkspaceChannels,
  userWorkspaceData,
}) => {
  return (
    <>
      <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
        <Sidebar
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkspacesData={userWorkspaceData as Workspace[]}
        />
        <InfoSection
          currentWorkspaceData={currentWorkspaceData}
          userData={userData}
          userWorkskpaceChannels={userWorkspaceChannels}
          currentChannelId={
            type === "Channel" ? currentChannelData?.id : undefined
          }
        />
        <div className="p-4 relative w-full overflow-hidden">
          <ChatHeader title={headerTitle} chatId={chatId} userData={userData} />
          <div className="mt-10">
            <Typography text="Chat Content" variant="h4" />
          </div>
        </div>
      </div>

      <div className="m-4">
        <TextEditor
          workspaceData={currentWorkspaceData}
          apiUrl={socketUrl}
          type={type}
          channel={currentChannelData}
          userData={userData}
          recipientId={type === "DirectMessage" ? chatId : undefined}
        />
      </div>
    </>
  );
};

export default ChatGroup;
