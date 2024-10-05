import { getUserData } from "@/actions/getUserData";
import { getUserWorkSpaceChannels } from "@/actions/getUserWorkSpaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/WorkSpaces";
import InfoSection from "@/components/info-section";
import NoDataScreen from "@/components/no-data-screen";
import Sidebar from "@/components/sidebar";
import Typography from "@/components/ui/typography";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const Workspace = async ({
  params: { workspaceId },
}: {
  params: { workspaceId: string };
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

  if(userWorkspaceChannels.length > 0){
    redirect(`/workspace/${workspaceId}/channels/${userWorkspaceChannels[0].id}`)
  }

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
          currentChannelId=""
        />

        <NoDataScreen
          userId={userData.id}
          workspaceId={currentWorkspaceData.id}
          workspaceName={currentWorkspaceData.name}
        />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
