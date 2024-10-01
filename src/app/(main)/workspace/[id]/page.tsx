import { getUserData } from "@/actions/getUserData";
import { getCurrentWorkspaceData, getUserWorkspaceData } from "@/actions/WorkSpaces";
import Typography from "@/components/ui/typography";
import { redirect } from "next/navigation";

const Workspace = async ({ params: { id } }: { params: { id: string } }) => {
  const userData = await getUserData();

  if (!userData) {
    return redirect("/auth");
  }
  const [userWorkspaceData, userWorkSpaceDataError] =
    await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData, currentWorkspaceDataError] = await getCurrentWorkspaceData(id)

  console.log(userWorkspaceData)
  return <div className="">haere we lsj</div>;
};

export default Workspace;
