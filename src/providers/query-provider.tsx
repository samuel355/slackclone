'use client'
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode, useState } from "react";

type QueryProviderProps = {
  children: ReactNode;
};

const QueryProvider: FC<QueryProviderProps> = ({ children }) => {
  const [queryClient] = useState(() => new QueryClient());
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;
