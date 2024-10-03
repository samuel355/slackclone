import { getUserData } from "@/actions/getUserData";
import { getUserWorkSpaceChannels } from "@/actions/getUserWorkSpaceChannels";
import {
  getCurrentWorkspaceData,
  getUserWorkspaceData,
} from "@/actions/WorkSpaces";
import InfoSection from "@/components/info-section";
import Sidebar from "@/components/sidebar";
import Typography from "@/components/ui/typography";
import { Workspace as UserWorkspace } from "@/types/app";
import { redirect } from "next/navigation";

const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }
  const [userWorkspacesData] =
    await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] =
    await getCurrentWorkspaceData(id);

  const userWorkspaceChannels = await getUserWorkSpaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

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
        />
        Workspace
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
        <Typography text="Here we to again" variant="p" />
      </div>
      <div className="md:hidden block min-h-screen">Mobile</div>
    </>
  );
};

export default Workspace;
