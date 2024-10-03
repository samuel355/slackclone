"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/ColorPreferences";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { useState } from "react";
import { FaArrowDown, FaArrowUp, FaPlus } from "react-icons/fa6";
import Typography from "./ui/typography";

const InfoSection = () => {
  const { color } = useColorPreferences();
  const [isChannelCollapsed, setIsChannelCollapsed] = useState(false);
  const [isDirectMsgCollapsed, setIsDirectMsgCollapsed] = useState(false);

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

  return (
    <div
      className={cn(
        "fixed text-white left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-64px)] z-20 flex flex-col items-center",
        backGroundColor
      )}
    >
      <div className="w-full flex flex-col gap-2 p-3">
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
                  size={30}
                  className={cn("cursor-pointer p-2 rounded-full", hoverBg)}
                />
              </div>
            </div>
            <CollapsibleContent>
              <Typography
                variant="p"
                text="# Channel name 1"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 2"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 3"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 4"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 5"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 6"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
              <Typography
                variant="p"
                text="# Channel name 7"
                className={cn("px-2 py-1 rounded-sm cursor-pointer", hoverBg)}
              />
            </CollapsibleContent>
          </Collapsible>
        </div>

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
    </div>
  );
};

export default InfoSection;
