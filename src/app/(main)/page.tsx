import { getUserData } from "@/actions/getUserData";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const userData = await getUserData();
  if (!userData) {
    return redirect("/auth");
  }

  const userWorkSpaceId = userData.workspaces?.[0]

  if(!userWorkSpaceId){
    return redirect('/create-workspace')
  }

  if(userWorkSpaceId){
    return redirect(`/workspace/${userWorkSpaceId}`)
  }
}
