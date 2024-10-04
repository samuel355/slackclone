import { FC } from "react"
import Typography from "./ui/typography"
import {IoMdHeadset } from 'react-icons/io'


const ChatHeader:FC<{title: string}> = ({title}) => {
  return (
    <div className="absolute top-0 left-0 w-full h-10">
      <div className="h-10 flex items-center justify-between px-4 fixed md:w-[calc(100%-305px)] lg:w-[calc(100%-447px)] bg-white dark:bg-neutral-800 border-b border-b-white/30 shadow-md">
        <Typography text={'#' + ' ' + title} variant="h4" />
        <IoMdHeadset />
      </div>
    </div>
  )
}

export default ChatHeader
