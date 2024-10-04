"use client";
import { FC, useState } from "react";
import Typography from "./ui/typography";
import { Button } from "./ui/button";
import CreateChannelDialog from "./create-channel-dialog";

const NoDataScreen: FC<{
  workspaceName: string;
  userId: string;
  workspaceId: string;
}> = ({ userId, workspaceId, workspaceName }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  return (
    <div className="w-full h-[calc(100vh-64px)] p-4">
      <Typography text={`Welcome to the # ${workspaceName}`} variant="h3" />
      <Typography
        text={`Heyy there!!! 👋`}
        variant="p"
        className="my-3"
      />

      <Typography
        text={`Get Started by creating a channel or direct message`}
        variant="p"
        className="my-3"
      />

      <div className="w-fit">
        <Button className="w-full my-2" onClick={() => setDialogOpen(prevState => !prevState)}>
          <Typography variant="p" text="Create Channel" />
        </Button>
      </div>

      <CreateChannelDialog
        userId={userId}
        workspaceId={workspaceId}
        dialogOpen={dialogOpen}
        setDialogOpen={setDialogOpen}
      />
    </div>
  );
};

export default NoDataScreen;
