import { useSocket } from "@/providers/web-socket";
import { MessageWithUser } from "@/types/app";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

type ChatFetcherProps = {
  queryKey: string;
  apiUrl: string;
  paramkey: "channelId" | "recipientId";
  paramValue: string;
  pageSize: number;
};

export const useChatFetcher = ({
  queryKey,
  apiUrl,
  paramValue,
  paramkey,
  pageSize,
}: ChatFetcherProps) => {
  const { isConnected } = useSocket();

  const fetcher = async ({
    pageParam = 0,
  }: any): Promise<{ data: MessageWithUser[] }> => {
    const url = `${apiUrl}?${paramkey}=${encodeURIComponent(
      paramValue
    )}&page=${pageParam}&limit=${pageSize}`;
    
    const {data} = await axios.get<MessageWithUser>(url)

    return data as any
  };

  return useInfiniteQuery<{ data: MessageWithUser[] }, Error>({
    queryKey: [queryKey, paramValue],
    queryFn: fetcher,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.data.length === pageSize ? allPages.length : undefined,
    refetchInterval: isConnected ? false : 1000,
    retry: 3,
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
    initialPageParam: 0,
  });
};
