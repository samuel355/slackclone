"use client";
import { Channel, User, Workspace } from "@/types/app";
import React, { FC, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { z } from "zod";
import { v4 as uuid } from "uuid";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { File } from "lucide-react";
import Typography from "./ui/typography";
import { supabaseClient } from "@/supabase/supabaseClient";

type ChatFileUploadProps = {
  userData: User;
  workspaceData: Workspace;
  channel: Channel;
  toggleFileUploadModal: () => void
};

const formSchema = z.object({
  file: z
    .instanceof(FileList)
    .refine((files) => files?.length === 1, "File is required")
    .refine((files) => {
      const file = files?.[0];
      return (
        file?.type === "application/pdf" || file?.type.startsWith("image/")
      );
    }, "File must be an image or a PDF"),
});

const ChatFileUpload: FC<ChatFileUploadProps> = ({
  userData,
  workspaceData,
  channel,
  toggleFileUploadModal
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      file: undefined,
    },
  });

  const imageRef = form.register("file");

  async function handleFileUpload(values: z.infer<typeof formSchema>) {
    setIsUploading(true);
    const uniqueId = uuid();
    const file = values.file?.[0];
    if (!file) return;

    const supabase = supabaseClient;

    let fileTypePrefix = "";
    if (file.type.startsWith("image/")) {
      fileTypePrefix = "img";
    } else if (file.type === "application/pdf") {
      fileTypePrefix = "pdf";
    }

    const fileName = `chat/${fileTypePrefix}-${uniqueId}`;
    const { data, error } = await supabase.storage
      .from("chat-files")
      .upload(fileName, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("Error Uploading file: ", error);
      return { error: error.message };
    }

    const { data: messageData, error: messageInsertError } = await supabase
      .from("messages")
      .insert({
        file_url: data.path,
        user_id: userData.id,
        workspace_id: workspaceData.id,
        channel_id: channel.id,
        content: `File uploaded: ${file.name}`,
      });

    if (messageInsertError) {
      console.log("Error inserting message: ", messageInsertError);
      return { error: messageInsertError.message };
    }

    setIsUploading(false)
    toggleFileUploadModal()
    toast.success("File uploaded successfully");
    form.reset()
  }

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="border border-dashed border-gray-200 rounded-lg flex flex-col gap-1 p-6 items-center">
          <File className="w-12 h-12" />
          <span className="text-sm font-medium text-gray-500">
            <Typography text="Drad and drop your files here" variant="p" />
          </span>
        </div>
        <div className="space-y-2 text-sm">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleFileUpload)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel htmlFor="file" className="text-sm font-medium">
                      File
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...imageRef}
                        type="file"
                        id="file"
                        accept="image/*,application/pdf"
                        placeholder="Choose a file"
                        onChange={(event) =>
                          field.onChange(event.target?.files)
                        }
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isUploading} size={"lg"}>
                <Typography text="Upload" variant="p" />
              </Button>
            </form>
          </Form>
        </div>
      </CardContent>
    </Card>
  );
};

export default ChatFileUpload;
