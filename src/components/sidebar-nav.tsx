import { Workspace } from "@/types/app";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";
import { RiHome2Fill } from "react-icons/ri";
import { PiChatsTeardrop } from "react-icons/pi";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import CreateWorkSpace from "./create-workspace";

type sidebarNavProps = {
  userWorkspacesData: Workspace[];
  currentWorkspaceData: Workspace;
};

const SidebarNav: FC<sidebarNavProps> = ({
  currentWorkspaceData,
  userWorkspacesData,
}) => {
  return (
    <nav>
      <ul className="flex flex-col space-y-4">
        <li>
          <div className="cursor-pointer items-center text-white mb-4 w-10 h-10 rounded-lg overflow-hidden">
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  {" "}
                  <AvatarImage
                    src={currentWorkspaceData.image_url || ""}
                    alt={currentWorkspaceData.name || "Workspace image"}
                    className="object-cover w-full h-full"
                  />
                  <AvatarFallback className="bg-neutral-700">
                    <Typography
                      variant="p"
                      text={currentWorkspaceData.name?.slice(0, 2) || ""}
                    />
                  </AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="p-0" side="bottom">
                <Card className="w-[350px] border-0">
                  <CardContent className="flex p-0 flex-col">
                    {userWorkspacesData.map((workspace) => (
                      <div
                        key={workspace.id}
                        className="hover:opacity-75 px-2 py-1 flex gap-2"
                      >
                        <Avatar>
                          <AvatarImage
                            src={workspace.image_url || ""}
                            alt={workspace.name || "Workspace image"}
                            className="object-cover w-full h-full"
                          />
                          <AvatarFallback>
                            <Typography
                              variant="p"
                              text={workspace?.name?.slice(0, 2) || ""}
                            />
                          </AvatarFallback>
                          <Typography
                            variant="p"
                            text={workspace.name?.slice(0, 2) || ""}
                            className="text-sm"
                          />
                        </Avatar>

                        <div>
                          <Typography
                            variant="p"
                            text={workspace.name || ""}
                            className="text-sm"
                          />
                          <Typography
                            variant="p"
                            text={workspace.invite_code || ""}
                            className="text-xs"
                          />
                        </div>
                      </div>
                    ))}
                    <Separator />
                    
                    <CreateWorkSpace />
                  </CardContent>
                </Card>
              </PopoverContent>
            </Popover>
          </div>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
              <RiHome2Fill
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography
              variant="p"
              text="Home"
              className="text-xs lg:text-sm md:text-sm"
            />
          </div>
        </li>
        <li>
          <div className="flex flex-col items-center cursor-pointer group text-white">
            <div className="p-2 rounded-lg bg-[rgba(255,255,255,0.3)]">
              <PiChatsTeardrop
                size={20}
                className="group-hover:scale-125 transition-all duration-300"
              />
            </div>
            <Typography
              variant="p"
              text="Dms"
              className="text-xs lg:text-sm md:text-sm"
            />
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
