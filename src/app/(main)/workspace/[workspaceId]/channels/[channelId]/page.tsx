import { getUserData } from "@/actions/getUserData";
import { getUserWorkSpaceChannels } from "@/actions/getUserWorkSpaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/WorkSpaces";
import ChatGroup from "@/components/chat-group";
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
        <ChatGroup
          type="Channel"
          userData={userData}
          currentChannelData={currentChannelData}
          currentWorkspaceData={currentWorkspaceData}
          slug={workspaceId}
          chatId={channelId}
          userWorkskpaceChannels={userWorkspaceChannels}
          socketUrl="/api/web-socket/messages"
          headerTitle={currentChannelData.name}
          socketQuery={{
            channelId: currentChannelData.id,
            workspaceId: currentWorkspaceData.id,
          }}
          apiUrl="/api/messages"
          paramkey="channelId"
          paramValue={channelId}
          userWorkspaceData={userWorkspacesData as UserWorkspace[]}
        />
      </div>
    </>
  );
};

export default ChannelId;
