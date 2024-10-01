import MainContent from "@/components/main-content";
import { ColorPreferencesProvider } from "@/providers/ColorPreferences";
import { ThemeProvider } from "@/providers/ThemeProvider";
import React, { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <ColorPreferencesProvider>
        <MainContent>{children}</MainContent>
      </ColorPreferencesProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
