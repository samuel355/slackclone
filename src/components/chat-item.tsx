import { Channel, User } from "@/types/app";
import { FC, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import { useChatFile } from "@/hooks/use-chat-file";
import Link from "next/link";
import Image from "next/image";
import { Form } from "./ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

type ChatItemProps = {
  id: string;
  content: string | null;
  user: User;
  timestamp: string;
  fileUrl: string | null;
  deleted: boolean;
  currentUser: User;
  isUpdated: boolean;
  socketUrl: string;
  socketQuery: Record<string, string>;
  channelData?: Channel;
};

const formSchema = z.object({
  content: z
    .string()
    .min(2, { message: "Message must be at least 2 characters long" }),
});

const ChatItem: FC<ChatItemProps> = ({
  id,
  content,
  user,
  timestamp,
  fileUrl,
  deleted,
  currentUser,
  isUpdated,
  socketUrl,
  socketQuery,
  channelData,
}) => {
  const { publicUrl, fileType, loading, error } = useChatFile(fileUrl!);
  const [isEditing, setIsEditing] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content ?? "",
    },
  });

  const isSuperAdmin = currentUser.id === channelData?.user_id;
  const isRegulator =
    channelData?.regulators?.includes(currentUser.id) ?? false;
  const isOwner = currentUser.id === user.id;
  const canDelete = !deleted && (isOwner || isSuperAdmin || isRegulator);
  const canEdit = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;
  //const isLoading =

  const FilePreview = () => (
    <>
      {isImage && (
        <Link
          href={publicUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-28 w-48"
        >
          <Image
            src={publicUrl}
            alt={content ?? ""}
            fill
            className="object-cover"
          />
        </Link>
      )}
      {isPdf && (
        <div className="flex flex-col items-start justify-center gap-2 px-2 py-1 border rounded-md shadow bg-white dark:bg-gray-800">
          <Typography
            className="text-lg font-semibold text-gray-700 dark:text-gray-200"
            text={"share a file"}
            variant="p"
          />
          <Link
            href={publicUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors duration-300 ease-in-out"
          >
            View Pdf
          </Link>
        </div>
      )}
    </>
  );

  const EditableContent = () =>
    isEditing ? (
      <Form {...form}>
        <form></form>
      </Form>
    ) : (
      <div
        className={cn("text-sm", { "text-xs opacity-90 italic": deleted })}
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    );
  return (
    <div className="relative group flex items-center hover:bg-black/5 px-1 py-2 rounded transition w-full">
      <div className="flex gap-x-2">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage
              className="object-cover w-full h-full"
              src={user.avatar_url}
              alt={user.name ?? user.email}
            />
            <AvatarFallback className={"bg-neutral-700"}>
              <Typography
                className="uppercase"
                text={user.name?.slice(0, 2) ?? "DP"}
                variant="p"
              />
            </AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col w-full">
          <div className="flex items-center gap-x-2">
            <Typography
              className="font-semi-bold text-sm hover:underline cursor-pointer"
              text={user.name ?? user.email}
              variant="p"
            />

            {/* Badge */}
            <MdOutlineAdminPanelSettings className="w-5 h-5" />
            <span className="text-xs ">(edited)</span>
            <span className="">{timestamp}</span>
          </div>
          <FilePreview />
          {!fileUrl && <EditableContent />}
        </div>
      </div>
    </div>
  );
};

export default ChatItem;
