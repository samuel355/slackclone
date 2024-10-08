"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/ColorPreferences";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { FC, useState } from "react";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa6";
import Typography from "./ui/typography";
import CreateChannelDialog from "./create-channel-dialog";
import { Channel, User, Workspace } from "@/types/app";
import { useRouter } from "next/navigation";

const InfoSection: FC<{
  userData: User;
  currentWorkspaceData: Workspace;
  userWorkskpaceChannels: Channel[];
  currentChannelId: string | undefined;
}> = ({ userData, currentWorkspaceData, userWorkskpaceChannels, currentChannelId }) => {
  const { color } = useColorPreferences();
  const [isChannelCollapsed, setIsChannelCollapsed] = useState(true);
  const [isDirectMsgCollapsed, setIsDirectMsgCollapsed] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const router = useRouter();
  const [activeChannel, setActiveChannel] = useState(false);

  let backGroundColor = "bg-primary-light";
  if (color === "green") {
    backGroundColor = "bg-green-900";
  } else if (color === "blue") {
    backGroundColor = "bg-blue-900";
  }

  let hoverBg = "hover:bg-primary-dark";
  if (color === "green") {
    hoverBg = "hover:bg-green-700";
  } else if (color === "blue") {
    hoverBg = "hover:bg-blue-700";
  }

  let activeBg = "bg-primary-dark";
  if (color === "green") {
    activeBg = "bg-green-700";
  } else if (color === "blue") {
    activeBg = "bg-blue-700";
  }

  const navigateToChannel = (channelId: string) => {
    const url = `/workspace/${currentWorkspaceData.id}/channels/${channelId}`;
    router.push(url);
    setActiveChannel(true);
  };
  return (
    <div
      className={cn(
        "fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-64px)] z-20 flex flex-col items-center",
        backGroundColor
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
        {/* Channesl */}
        <div>
          <Collapsible
            open={isChannelCollapsed}
            onOpenChange={() =>
              setIsChannelCollapsed((prevState) => !prevState)
            }
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isChannelCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography variant="p" text="Channels" className="font-bold" />
              </CollapsibleTrigger>
              <div>
                <FaPlus
                  onClick={() => setDialogOpen(true)}
                  size={30}
                  className={cn("cursor-pointer p-2 rounded-full", hoverBg)}
                />
              </div>
            </div>
            <CollapsibleContent>
              {userWorkskpaceChannels.map((channel) => {
                const selectedChannel = currentChannelId === channel.id
                return (
                  <Typography
                    onClick={() => navigateToChannel(channel.id)}
                    key={channel.id}
                    variant="p"
                    text={`# ${channel.name}`}
                    className={cn(
                      "px-2 py-1 rounded-sm cursor-pointer",
                      hoverBg,
                      selectedChannel && activeBg
                    )}
                  />
                );
              })}
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* Direct Messages */}
        <div>
          <Collapsible
            open={isDirectMsgCollapsed}
            onOpenChange={() =>
              setIsDirectMsgCollapsed((prevState) => !prevState)
            }
            className="flex flex-col gap-2"
          >
            <div className="flex items-center justify-between">
              <CollapsibleTrigger className="flex items-center gap-2">
                {isDirectMsgCollapsed ? <FaArrowDown /> : <FaArrowUp />}
                <Typography
                  variant="p"
                  text="Direct Messages"
                  className="font-bold"
                />
              </CollapsibleTrigger>
              <div>
                <FaPlus
                  size={30}
                  className={cn("cursor-pointer p-2 rounded-full", hoverBg)}
                />
              </div>
            </div>

            <CollapsibleContent>
              <Typography
                variant="p"
                text="User Name 1"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="User Name 1"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="User Name 1"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>
      </div>

      <CreateChannelDialog
        setDialogOpen={setDialogOpen}
        dialogOpen={dialogOpen}
        userId={userData.id}
        workspaceId={currentWorkspaceData.id}
      />
    </div>
  );
};

export default InfoSection;
