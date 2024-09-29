"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./getUserData";
import { updateUserWorkspace } from "./updateUserWorkspace";
import { addMemberToWorkSpace } from "./addMemberToWorkSpace";

export const createWorkSpace = async ({
  imageUrl,
  name,
  slug,
  invite_code,
}: {
  imageUrl?: string;
  name: string;
  slug: string;
  invite_code: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error, data: workspaceRecord } = await supabase
    .from("workspaces")
    .insert({
      image_url: imageUrl,
      name,
      slug,
      super_admin: userData.id,
      invite_code,
    })
    .select("*");

  if (error) {
    return { error };
  }

  const [updateWorkspaceData, updateWorkspaceError] = await updateUserWorkspace(
    userData.id,
    workspaceRecord[0].id
  );

  if (updateWorkspaceError) {
    return { error: updateWorkspaceError };
  }

  //Add user to workspace members
  const [addMemberToWorkspaceData, addMemberToWorkspaceError] =
    await addMemberToWorkSpace(userData.id, workspaceRecord[0].id);

  if(addMemberToWorkspaceError){
    return {error: addMemberToWorkspaceError}
  }
};
