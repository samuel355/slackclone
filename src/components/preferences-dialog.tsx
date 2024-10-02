"use client";

import { useColorPreferences } from "@/providers/ColorPreferences";
import { useTheme } from "next-themes";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import Typography from "./ui/typography";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { HiOutlinePaintBrush } from "react-icons/hi2";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { MdLightMode } from "react-icons/md";
import { BsLaptop } from "react-icons/bs";

const PreferencesDialog = () => {
  const { theme, setTheme } = useTheme();
  const { selectColor } = useColorPreferences();
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Typography
          className="hover:text-white hover:bg-blue-700 px-2 py-1 rounded cursor-pointer"
          text="Color Preferences"
          variant="p"
        />
      </DialogTrigger>
      <DialogContent className="max-w-xs md:w-fit">
        <DialogTitle>
          {" "}
          <Typography text="Prefereces" variant="h3" className="py-5" />{" "}
          <hr className="bg-gray-200" />
        </DialogTitle>
        <Tabs orientation="horizontal" defaultValue="themes">
          <TabsList>
            <TabsTrigger value="themes">
              <HiOutlinePaintBrush className="mr-2" />
              <Typography text="Theme" variant="h3" className=" " />
            </TabsTrigger>
          </TabsList>
          <TabsContent className="max-w-xs md:max-w-fit" value="themes">
            <Typography
              text="Color Mode"
              variant="p"
              className="py-2 font-bold"
            />
            <Typography
              text="Choose if slack apperance should be light or dark or follow computer settings"
              variant="p"
              className="pb-4"
            />
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => setTheme("light")}
                variant={"outline"}
                className={`w-full ${cn(
                  theme === "light" && "border-blue-600"
                )}`}
              >
                <MdLightMode className="mr-2" size={20} />
                <Typography text="Light" variant="p" />
              </Button>

              <Button
                onClick={() => setTheme("dark")}
                variant={"outline"}
                className={`w-full ${cn(
                  theme === "dark" && "border-blue-600"
                )}`}
              >
                <BsLaptop className="mr-2" size={20} />
                <Typography text="Dark" variant="p" />
              </Button>

              <Button
                onClick={() => setTheme("sytem")}
                variant={"outline"}
                className={`w-full ${cn(
                  theme === "system" && "border-blue-600"
                )}`}
              >
                <MdLightMode className="mr-2" size={20} />
                <Typography text="System" variant="p" />
              </Button>
            </div>
            <hr className="bg-gray-200 my-5" />
            <Typography
              text="Single Color"
              variant="p"
              className="py-2 font-bold"
            />

            <div className="flex flex-row flex-wrap gap-2">
              <Button
                variant={"outline"}
                onClick={() => selectColor("green")}
                className=" hover:border-green-800 broder-2"
              >
                Green
              </Button>

              <Button
                variant={"outline"}
                onClick={() => selectColor("blue")}
                className=" hover:border-blue-800 broder-2"
              >
                Blue
              </Button>

              <Button
                variant={"outline"}
                onClick={() => selectColor("")}
                className=" hover:border-red-800 broder-2"
              >
                Reset
              </Button>
            </div>
          </TabsContent> 
        </Tabs>
      </DialogContent>
    </Dialog>
  );
};

export default PreferencesDialog;
