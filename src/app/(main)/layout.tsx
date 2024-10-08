import MainContent from "@/components/main-content";
import { ColorPreferencesProvider } from "@/providers/ColorPreferences";
import QueryProvider from "@/providers/query-provider";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { WebSocketProvider } from "@/providers/web-socket";
import React, { FC, ReactNode } from "react";

const MainLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <WebSocketProvider>
        <ColorPreferencesProvider>
          <MainContent> <QueryProvider>{children}</QueryProvider></MainContent>
        </ColorPreferencesProvider>
      </WebSocketProvider>
    </ThemeProvider>
  );
};

export default MainLayout;
