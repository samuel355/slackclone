"use client";

import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/ColorPreferences";

const InfoSection = () => {
  const { color } = useColorPreferences();

  let backGroundColor = "bg-primary-light";
  if (color === "green") {
    backGroundColor = "bg-green-900";
  } else if (color === "blue") {
    backGroundColor = "bg-blue-900";
  }

  return (
    <div
      className={cn(
        "fixed left-20 rounded-l-xl md:w-52 lg:w-[350px] h-[calc(100%-64px)] z-20 flex flex-col items-center",
        backGroundColor
      )}
    >
      {/* Channels */}
      {/* Dms */}
      <p>Channels</p>
      <p>Dms</p>
    </div>
  );
};

export default InfoSection;
