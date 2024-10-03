'use server'
import { supabaseServerClient } from "@/supabase/supabaseServer";
import { getUserData } from "./getUserData";

export const CreateChannel = async ({
  name,
  userId,
  workspaceId,
}: {
  name: string;
  userId: string;
  workspaceId: string;
}) => {
  const supabase = await supabaseServerClient();
  const userData = await getUserData();

  if (!userData) {
    return { error: "No user data" };
  }

  const { error, data: channelRecord } = await supabase
    .from("channels")
    .insert({
      name,
      user_id: userId,
      workspace_id: workspaceId,
    })
    .select("*");

  if (error) {
    return { error: "Insert failed" };
  }

  //Update Channel Members Array
  const [, updateChannelMembersError] = await updateChannelMembers(
    channelRecord[0].id,
    userId
  );

  if (updateChannelMembersError) {
    return { error: "Update Members channel failed" };
  }

  //Add Channel to user's channels array
  const [, addChannelError] = await AddChannelToUser(
    userData.id,
    channelRecord[0].id
  );

  if(addChannelError){
    return {error: 'Add channel to user error'}
  }

  //Update workspace channel to channel array
  const [, updateWorkspaceChannelError] = await updateWorkspaceChannel(
    channelRecord[0].id,
    workspaceId
  );

  if(updateWorkspaceChannelError){
    return {error: 'Update workspace channel failed'}
  }

  return channelRecord[0];
};

//Update channel members function
const updateChannelMembers = async (channelId: string, userId: string) => {
  const supabase = await supabaseServerClient();
  const { data: updateChannelData, error: updateChannelError } =
    await supabase.rpc("update_channel_members", {
      new_member: userId,
      channel_id: channelId,
    });

  return [updateChannelData, updateChannelError];
};

//Add Channel to user function
const AddChannelToUser = async (userId: string, channelId: string) => {
  const supabase = await supabaseServerClient();

  const { data: addChannelData, error: addChannelError } = await supabase.rpc(
    "update_user_channels",
    {
      user_id: userId,
      channel_id: channelId,
    }
  );
  return [addChannelData, addChannelError]
};


//Update workspace
const updateWorkspaceChannel = async (channelId: string, workspaceId: string) => {
  const supabase = await supabaseServerClient();
  const { data: updateWorkspaceData, error: updateWorkspaceError } =
    await supabase.rpc("add_channel_to_workspace", {
      channel_id: channelId,
      workspace_id: workspaceId,
    });

  return [updateWorkspaceData, updateWorkspaceError];
};