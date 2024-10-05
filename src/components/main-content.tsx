"use client";
import { cn } from "@/lib/utils";
import { useColorPreferences } from "@/providers/ColorPreferences";
import { useTheme } from "next-themes";
import React, { FC, ReactNode } from "react";

const MainContent: FC<{ children: ReactNode }> = ({ children }) => {
  const { theme } = useTheme();
  const { color } = useColorPreferences();


  let backGroundColor = "bg-primary-dark";

  if (color === "green") {
    backGroundColor = "bg-green-700";
  } else if (color === "blue") {
    backGroundColor = "bg-blue-700";
  }
  return (
    <div className={cn("md:px-2 md:pb-2 md:pt-14 md:h-screen", backGroundColor)}>
      <main
        className={cn(
          "md:ml-[280px] lg:ml-[420px] md:h-full overflow-y-hidden",
          theme === 'dark' ? 'bg-[#232529]' : 'bg-white'
        )}
      >
        {children}
      </main>
    </div>
  );
};

export default MainContent;
