"use client";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import Typography from "./ui/typography";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { z } from "zod";
import { useForm, useFormContext } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { toast } from "sonner";
import { CreateChannel } from "@/actions/CreateChannel";
import { useRouter } from "next/navigation";

const CreateChannelDialog: FC<{
  dialogOpen: boolean;
  setDialogOpen: Dispatch<SetStateAction<boolean>>;
  workspaceId: string;
  userId: string;
}> = ({ dialogOpen, setDialogOpen, workspaceId, userId }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter()

  const formSchema = z.object({
    name: z
      .string()
      .min(2, { message: "Channel name must be at least 2 characters long" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async ({name}: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)

      //Create the channel
      await CreateChannel({
        name, userId, workspaceId
      })

      router.refresh();
      setIsSubmitting(false)
      setDialogOpen(false)
      form.reset()
      toast.success('Channel Created Successfully')
    } catch (error) {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog
      open={dialogOpen}
      onOpenChange={() => setDialogOpen((prevState) => !prevState)}
    >
      <DialogContent aria-describedby="Channel dialog">
        <DialogHeader>
          <DialogTitle className="my-4">
            <Typography className="" text="Create a Channel" variant="p" />
          </DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              name="name"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    <Typography text="Name" variant="p" />
                  </FormLabel>
                  <FormDescription>
                    <Typography text="This is your channel name" variant="p" />
                  </FormDescription>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Your channel name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button disabled={isSubmitting} type="submit" className="mt-3">
              <Typography
                text={isSubmitting ? "Creating..." : "Create"}
                variant="p"
              />
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateChannelDialog;
