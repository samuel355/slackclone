import { NextApiResponse } from "next";
import {Server as NetServer, Socket } from "net";
import {Server as SocketIOServer} from 'socket.io'


export type User = {
  avatar_url: string;
  channels: string[] | null;
  created_at: string | null;
  email: string;
  id: string;
  is_away: boolean;
  name: string | null;
  phone: string | null;
  type: string | null;
  workspaces: string[] | null;
};

export type Workspace = {
  channels: string[] | null;
  created_at: string;
  id: string;
  image_url: string | null;
  invite_code: string | null;
  members: string[] | null;
  name: string | null;
  regulators: string[] | null;
  slug: string;
  super_admin: string;
};

export type Channel = {
  id: string;
  members: string[] | null;
  name: string;
  regulators: string[] | null;
  user_id: string;
  workspace_id: string;
};

export type Messages = {
  channel_id: string;
  content: string | null;
  created_at: string;
  file_url: string | null;
  id: string;
  is_deleted: boolean;
  updated_at: string;
  user_id: string;
  workspace_id: string;
};

export type SocketIoApiResponse = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer
    }
  }
}


export type MessageWithUser = Messages & {user: User}