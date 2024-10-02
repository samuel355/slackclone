import React, { FC } from "react";
import { Button } from "./ui/button";
import { FaPlus } from "react-icons/fa";
import Typography from "./ui/typography";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "./ui/input";
import ImageUpload from "./ui/ImageUpload";

const CreateWorkSpace = () => {
  const formSchema = z.object({
    name: z
      .string()
      .min(3, { message: "workspace name should be at least 3 characters" }),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  async function onSubmit({name}:z.infer <typeof formSchema>) {
    console.log(name);
  }

  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center gap-2 p-2 cursor-pointer">
          <Button variant={"secondary"}>
            <FaPlus />
          </Button>
          <Typography variant="p" text="Add workspace" />
        </div>
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Typography
              className="my-3 text-center"
              variant="h5"
              text="Create Workspace"
            />
          </DialogTitle>
          <hr className="border-gray-400 mb-2" />
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>
                      <Typography text="Name" variant="p" />
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Your company name" {...field} />
                    </FormControl>
                    <FormDescription>
                      <Typography
                        text="This is your workspace name"
                        variant="p"
                      />
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="border"><ImageUpload /></div>

              <Button type="submit" className="w-full">
                <Typography text="Submit" variant="p" />
              </Button>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkSpace;
