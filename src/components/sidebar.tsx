"use client";

import { User, Workspace } from "@/types/app";
import React, { FC } from "react";
import { FiPlus } from "react-icons/fi";
import { GoDotFill, GoDot } from "react-icons/go";
import { GiNightSleep } from "react-icons/gi";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/ColorPreferences";
import { useTheme } from "next-themes";
import { Tooltip, TooltipProvider, TooltipTrigger } from "./ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import SidebarNav from "./sidebar-nav";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";

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
  const { theme } = useTheme();
  const { color } = useColorPreferences();

  let backGroundColor = "bg-primary-dark";

  if (color === "green") {
    backGroundColor = "bg-green-700";
  } else if (color === "blue") {
    backGroundColor = "bg-blue-700";
  }
  return (
    <aside
      className={`fixed top-0 left-0 pt-[68px] pb-8 z-30 flex flex-col justify-between items-center h-screen w-20`}
    >
      <SidebarNav
        currentWorkspaceData={currentWorkspaceData}
        userWorkspacesData={userWorkspacesData}
      />
      <div className="flex flex-col space-y-3">
        <div
          className={`bg-[rgba(255,255,255,0.3)] cursor-pointer transition-all duration-300 hover:scale-110 text-white grid place-content-center rounded-full w-10 h-10`}
        >
          <FiPlus size={28} />
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div>
                <Popover>
                  <PopoverTrigger>
                    <div className="h-10 w-10 relative cursor-pointer group">
                      <div className="h-full w-full rounded-lg overflow-hidden">
                        <Image
                          alt={userData.name || "user image"}
                          width={300}
                          height={300}
                          className="object-cover w-full h-full group-hover:scale-125 transition-all duration-300"
                          src={userData.avatar_url}
                        />
                        <div
                          className={cn(
                            "absolute z-10 rounded-full -right-[20%] -bottom-1",
                            backGroundColor
                          )}
                        >
                          {userData.is_away ? (
                            <GoDot className="text-white text-xl" />
                          ) : (
                            <GoDotFill size={17} className="text-green-600" />
                          )}
                        </div>
                      </div>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent side="right">
                    <div>
                      <div className="flex space-x-3">
                        <Avatar>
                          <AvatarImage
                            className="w-full rounded-full border"
                            src={userData.avatar_url}
                          />
                          <AvatarFallback className="uppercase">
                            {userData.name && userData.name?.slice(0, 2)}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-col flex">
                          <Typography
                            text={userData.name || ""}
                            variant="p"
                            className="font-bold"
                          />
                          <div className="flex items-start space-x-1">
                            {userData.is_away ? (
                              <GiNightSleep size={12} />
                            ) : (
                              <GoDotFill size={17} className="text-green-600" />
                            )}
                            <span className="text-xs">
                              {" "}
                              {userData.is_away ? "Away" : "Active"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </TooltipTrigger>
          </Tooltip>
        </TooltipProvider>
      </div>
    </aside>
  );
};

export default Sidebar;
