import { User, Workspace } from "@/types/app";
import React, { FC } from "react";

type SidebarProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
  userData: User;
};

const Sidebar: FC<SidebarProps> = ({
  userWorkspacesData,
  userData,
  currentWorkspaceData,
}) => {
  console.log(
    "user Workspace data: ",
    userWorkspacesData,
    "\n current workspace: ",
    currentWorkspaceData,
    "\n user data: ",
    userData
  );
  return <aside></aside>;
};

export default Sidebar;
