import { getUserData } from "@/actions/getUserData";
import { createUploadthing, type FileRouter } from "uploadthing/next";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

const currUser = async () => {
  const user = await getUserData();
  return { userId: user?.id };
};

export const ourFileRouter = {
  workspaceImage: f({ image: { maxFileSize: "4MB", maxFileCount: 1 } })
    .middleware(() => currUser())
    .onUploadComplete(() => {
      console.log("upload completed");
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
