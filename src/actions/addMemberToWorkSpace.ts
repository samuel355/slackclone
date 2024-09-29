import { supabaseServerClient } from "@/supabase/supabaseServer";

export const addMemberToWorkSpace = async (
  userId: string,
  workspaceId: number
) => {
  const supabase = await supabaseServerClient();

  //update the workspace members
  const { error: addMemberToWorkspaceError, data: addMemberToWorkspaceData } =
    await supabase.rpc("add_member_to_user_workspace", {
      user_id: userId,
      workspace_id: workspaceId,
    });

  return [addMemberToWorkspaceData, addMemberToWorkspaceError]
};
