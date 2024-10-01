import { Workspace } from "@/types/app";
import { FC } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { Card, CardContent } from "./ui/card";
import { Separator } from "./ui/separator";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";

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
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
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
                </TooltipTrigger>
                <TooltipContent className="p-0" side="bottom">
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
                      <div className="flex items-center gap-2 p-2">
                        <Button variant={"secondary"}>
                          <FaPlus />
                        </Button>
                        <Typography variant="p" text="Add workspace" />
                      </div>
                    </CardContent>
                  </Card>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </li>
      </ul>
    </nav>
  );
};

export default SidebarNav;
