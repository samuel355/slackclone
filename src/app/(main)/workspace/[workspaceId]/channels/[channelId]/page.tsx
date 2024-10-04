import { getUserData } from "@/actions/getUserData";
import { getUserWorkSpaceChannels } from "@/actions/getUserWorkSpaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/WorkSpaces";
import ChatHeader from "@/components/chat-header";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
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
        </div>
      </div>
    </>
  );
};

export default ChannelId;
