import { Channel, User } from "@/types/app";
import { FC, useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Typography from "./ui/typography";
import {
  MdOutlineAdminPanelSettings,
  MdOutlineAssistantPhoto,
} from "react-icons/md";
import { useChatFile } from "@/hooks/use-chat-file";
import Link from "next/link";
import Image from "next/image";
import { Form, FormControl, FormField, FormItem } from "./ui/form";
import { cn } from "@/lib/utils";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Edit, Trash } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import axios from "axios";

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
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: content ?? "",
    },
  });

  const isLoading = form.formState.isSubmitting;

  const isSuperAdmin = currentUser.id === channelData?.user_id;
  const isRegulator =
    channelData?.regulators?.includes(currentUser.id) ?? false;
  const isOwner = currentUser.id === user.id;
  const canDelete = !deleted && (isOwner || isSuperAdmin || isRegulator);
  const canEdit = !deleted && isOwner && !fileUrl;
  const isPdf = fileType === "pdf" && fileUrl;
  const isImage = fileType === "image" && fileUrl;

  useEffect(() => form.reset({ content: content ?? "" }), [content, form]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsEditing(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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
            className="object-contain"
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

  const handleDelete = async () => {
    setIsDeleting(true);
    const url = `${socketUrl}/${id}?${new URLSearchParams(socketQuery)}`;
    await axios.delete(url);
    setIsDeleting(false);
    setOpenDeleteDialog(false);
  };

  const onSubmit = async ({ content }: z.infer<typeof formSchema>) => {
    const url = `${socketUrl}/${id}?${new URLSearchParams(socketQuery)}`;
    await axios.patch(url, { content });
    setIsEditing(false);
    form.reset();
  };

  const EditableContent = () =>
    isEditing ? (
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <fieldset
            className="flex items-center w-full gap-x-2 pt-2"
            disabled={isLoading}
          >
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormControl>
                    <Input
                      className="p-2 border-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
                      {...field}
                      placeholder="Edit Message"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button size="sm">Update</Button>
          </fieldset>
        </form>
        <span className="text-[10px]"> Press ESC to cancel, Enter to save</span>
      </Form>
    ) : (
      <div
        className={cn("text-sm", { "text-xs opacity-90 italic": deleted })}
        dangerouslySetInnerHTML={{ __html: content ?? "" }}
      />
    );

  const DeleteDialog = () => (
    <Dialog
      open={openDeleteDialog}
      onOpenChange={() => setOpenDeleteDialog((prevState) => !prevState)}
    >
      <DialogTrigger>
        <Trash size={15} />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure want to delete ?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the
            message:
          </DialogDescription>
          <div className="text-center">
            {isPdf && (
              <div className="items-start justify-center gap-3 relative">
                <Typography text={"share a file"} variant="p" />
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
            {!fileUrl && !isEditing && (
              <div
                className="text-sm"
                dangerouslySetInnerHTML={{ __html: content ?? "" }}
              />
            )}
            {isImage && (
              <Link
                href={publicUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative aspect-square rounded-md mt-2 overflow-hidden border flex items-center bg-secondary h-28 w-48 mx-auto"
              >
                <Image
                  src={publicUrl}
                  alt={content ?? ""}
                  fill
                  className="object-contain"
                />
              </Link>
            )}
          </div>
        </DialogHeader>
        <div className="flex flex-col gap-2">
          <Button
            className="w-full"
            size="sm"
            variant="secondary"
            onClick={() => setOpenDeleteDialog(false)}
          >
            Cancel
          </Button>
          <Button
            className="w-full"
            size="sm"
            variant={"destructive"}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );

  return (
    <div className="relative group flex items-center hover:bg-black/5 px-1 py-2 rounded transition w-full">
      <div className="flex gap-x-2">
        <div className="cursor-pointer hover:drop-shadow-md transition">
          <Avatar>
            <AvatarImage
              className="object-contain w-full h-full"
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
              className="font-semibold text-sm hover:underline cursor-pointer"
              text={user.name ?? user.email}
              variant="p"
            />

            {/* Badge */}
            {isSuperAdmin && (
              <MdOutlineAdminPanelSettings className="w-5 h-5" />
            )}
            {isRegulator && <MdOutlineAssistantPhoto className="w-5 h-5" />}
            {isUpdated && !deleted && (
              <span className="text-xs ">(edited)</span>
            )}
            <span className="text-[10px] font-semibold underline">
              {timestamp}
            </span>
          </div>
          <FilePreview />
          {!fileUrl && <EditableContent />}
        </div>
      </div>

      {canDelete && (
        <div className="hidden absolute group-hover:flex flex-row gap-2 border border-white bg-white dark:bg-black dark:text-white text-black rounded-md p-2 top-0 -translate-y-1/3 right-0">
          <DeleteDialog />
          {canEdit && (
            <Edit
              className="cursor-pointer"
              size={15}
              onClick={() => setIsEditing(true)}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default ChatItem;
