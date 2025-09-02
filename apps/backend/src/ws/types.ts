import { Server as IOServer, Socket as IOSocket } from "socket.io";
import { type EventTypes } from "@vRendevski/shared/schemas/ws/events";

export interface ClientToServerEvents {
}

export interface ServerToClientEvents {
  addOnlineUser: (data: EventTypes.AddOnlineUser) => void;
  addOfflineUser: (data: EventTypes.AddOfflineUser) => void;
}

export interface InterServerEvents {
}

export interface SocketData {
  userId: number
}

export const Server = IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type ServerInstance = InstanceType<typeof Server>;

export type Socket = IOSocket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;