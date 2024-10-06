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
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const ChannelId = async ({
  params: { channelId, workspaceId },
}: {
  params: { channelId: string; workspaceId: string };
}) => {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }
  const [userWorkspacesData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkSpaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    (channel) => channel.id === channelId
  );

  if (!currentChannelData) return redirect("/");

  return (
    <>
      <div className="hidden md:block">
        <div className="h-[calc(100vh-256px)] overflow-y-auto [&::-webkit-scrollbar-thumb]:rounded-[6px] [&::-webkit-scrollbar-thumb]:bg-foreground/60 [&::-webkit-scrollbar-track]:bg-none [&::-webkit-scrollbar]:w-2">
          <Sidebar
            currentWorkspaceData={currentWorkspaceData}
            userData={userData}
            userWorkspacesData={userWorkspacesData as UserWorkspace[]}
          />
          <InfoSection
            currentWorkspaceData={currentWorkspaceData}
            userData={userData}
            userWorkskpaceChannels={userWorkspaceChannels}
            currentChannelId={channelId}
          />
          <div className="p-4 relative w-full overflow-hidden">
            <ChatHeader title={currentChannelData.name} />
            <div className="mt-10">
              <Typography text="Chat Content" variant="h4" />
            </div>
          </div>
        </div>

        <div className="m-4">
          <TextEditor
            workspaceData={currentWorkspaceData}
            apiUrl="/api/web-socket/messages"
            type="channel"
            channel={currentChannelData}
            userData={userData}
          />
        </div>
      </div>
    </>
  );
};

export default ChannelId;
