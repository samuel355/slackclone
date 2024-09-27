'use server'

import { subaseServerClient } from "@/supabase/supabaseServer"


export async function registerWithEmail({email}:{email: string}){
  const supabase = await subaseServerClient();
  const response = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: process.env.NEXT_PUBLIC_CURRENT_ORIGIN
    }
  })

  return JSON.stringify(response)
}