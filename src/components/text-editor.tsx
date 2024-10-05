'use client'
import React from "react";
import { FiPlus } from "react-icons/fi";
import { Button } from "./ui/button";
import { Send } from "lucide-react";
import { useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import PlaceHolder from "@tiptap/extension-placeholder";
import MenuBar from "./menu-bar";

const TextEditor = () => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      PlaceHolder.configure({
        //placeholder: `Message #${"ChannelName" ?? "Username"} `,
      }),
    ],
  });
  return (
    <div className="p-1 border dark:border-zinc-500 border-neutral-700 rounded-md relative overflow-hidden">
      <div className="sticky top-0 z-10">{editor && <MenuBar editor={editor} />}</div>
      <div className="h-[150px] pt-11 flex w-full grow-1">
        {/* Editor contents */}
      </div>
      <div className="absolute top-3 z-10 right-3 bg-black dark:bg-white cursor-pointer transition-all duration-500 hover:scale-110 text-white grid place-content-center rounded-full w-6 h-6">
        <FiPlus size={28} className="dark:text-black" />
      </div>

      <Button size={"sm"} className="absolute bottom-1 right-1">
        <Send size={28} />
      </Button>
    </div>
  );
};

export default TextEditor;
