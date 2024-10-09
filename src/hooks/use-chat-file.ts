"use client";
import { supabaseClient } from "@/supabase/supabaseClient";
import { useEffect, useState } from "react";

export const useChatFile = (filePath: string) => {
  const [publicUrl, setPublicUrl] = useState("");
  const [fileType, setFileType] = useState("");
  const [loading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const supabase = supabaseClient;

  useEffect(() => {
    const fetchFile = async () => {
      try {
        const {
          data: { publicUrl },
        } = await supabase.storage.from("chat-files").getPublicUrl(filePath);

        if (publicUrl) {
          setPublicUrl(publicUrl);
          if (filePath.startsWith("chat/img-")) {
            setFileType("image");
          } else if (filePath.startsWith("chat/pdf-")) {
            setFileType("pdf");
          }
          setIsLoading(false);
        }
      } catch (error:any) {
        setError(error);
        setIsLoading(false);
      }
    };

    if(filePath){
      fetchFile();
    }
  }, [filePath, supabase.storage]);

  return {publicUrl, fileType, loading, error}
};
