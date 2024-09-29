"use server";

import { supabaseServerClient } from "@/supabase/supabaseServer";

export const updateUserWorkspace = async (
  userId: string,
  workspaceId: string
) => {
  const supabase = await supabaseServerClient();

  //update user record
  const { error: updateWorkspaceError, data: updateWorkspaceData } =
    await supabase.rpc("add_workskpace_to_user", {
      user_id: userId,
      new_workspace: workspaceId,
    });

  return [updateWorkspaceData, updateWorkspaceError];
};
