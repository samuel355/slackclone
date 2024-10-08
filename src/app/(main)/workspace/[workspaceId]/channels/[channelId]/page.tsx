import { getUserData } from '@/actions/getUserData';
import { getUserWorkSpaceChannels } from '@/actions/getUserWorkSpaceChannels';
import { getCurrentWorkspaceData, getUserWorkspaceData } from '@/actions/WorkSpaces';
import ChatGroup from '@/components/chat-group';
import { redirect } from 'next/navigation';
import { Workspace as UserWorkspace } from '@/types/app';


const ChannelId = async ({
  params: { channelId, workspaceId },
}: {
  params: {
    workspaceId: string;
    channelId: string;
  };
}) => {
  const userData = await getUserData();

  if (!userData) return redirect('/auth');

  const [userWorkspaceData] = await getUserWorkspaceData(userData.workspaces!);

  const [currentWorkspaceData] = await getCurrentWorkspaceData(workspaceId);

  const userWorkspaceChannels = await getUserWorkSpaceChannels(
    currentWorkspaceData.id,
    userData.id
  );

  const currentChannelData = userWorkspaceChannels.find(
    channel => channel.id === channelId
  );

  if (!currentChannelData) return redirect('/');

  return (
    <div className='hidden md:block'>
      <ChatGroup
        type='Channel'
        userData={userData}
        currentChannelData={currentChannelData}
        currentWorkspaceData={currentWorkspaceData}
        slug={workspaceId}
        chatId={channelId}
        userWorkspaceChannels={userWorkspaceChannels}
        socketUrl='/api/web-socket/messages'
        socketQuery={{
          channelId: currentChannelData.id,
          workspaceId: currentWorkspaceData,
        }}
        apiUrl='/api/messages'
        headerTitle={currentChannelData.name}
        paramkey='channelId'
        paramValue={channelId}
        userWorkspaceData={userWorkspaceData as UserWorkspace[]}
      />
    </div>
  );
};

export default ChannelId;