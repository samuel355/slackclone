"use client";
import React, { FC, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import MenuBar from "./menu-bar";
import axios from "axios";
import ChannelId from "@/app/(main)/workspace/[workspaceId]/channels/[channelId]/page";
import { Channel, User, Workspace } from "@/types/app";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import ChatFileUpload from "./chat-file-upload";

type TextEditorProps = {
  apiUrl: string;
  type: "channel" | "directMessage";
  channel: Channel;
  workspaceData: Workspace;
  userData: User;
};

const TextEditor: FC<TextEditorProps> = ({
  apiUrl,
  type,
  channel,
  workspaceData,
  userData,
}) => {
  const [content, setContent] = useState("");
  const [fileUploadModal, setFileUploadModal] = useState(false);

  const toggleFileUploadModal = () =>
    setFileUploadModal((prevState) => !prevState);

  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        placeholder: `Message #${
          type === "channel" ? channel.name : "username"
        }`,
      }),
    ],
    autofocus: true,
    content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  });

  const handleSendMessage = async () => {
    if (content.length < 2) return;

    try {
      await axios.post(
        `${apiUrl}?channelId=${channel?.id}&workspaceId=${workspaceData.id}`,
        { content }
      );
      setContent("");
      editor?.commands.setContent("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden">
      <div className="sticky top-0 z-10">
        {editor && <MenuBar editor={editor} />}
      </div>
      <div className="h-[150px] pt-11 flex w-full grow-1">
        <EditorContent
          className="prose w-full h-full dark:text-white leading-[1.15px] overflow-y-hidden whitespace-pre-wrap"
          editor={editor}
        />
      </div>
      <div className="absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6">
        <FiPlus
          onClick={toggleFileUploadModal}
          size={28}
          className="dark:text-black"
        />
      </div>

      <Button
        onClick={handleSendMessage}
        disabled={content.length < 2}
        size={"sm"}
        className="absolute bottom-1 right-1"
      >
        <Send size={28} />
      </Button>

      <Dialog onOpenChange={toggleFileUploadModal} open={fileUploadModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>File Upload </DialogTitle>
            <DialogDescription>
              Upload a file to share with the channel
            </DialogDescription>
          </DialogHeader>

          <ChatFileUpload
            userData={userData}
            workspaceData={workspaceData}
            channel={channel}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TextEditor;
