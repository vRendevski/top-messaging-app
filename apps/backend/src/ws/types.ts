import { Server as IOServer, Socket as IOSocket } from "socket.io";
import { ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData } from "@vRendevski/shared";

export const Server = IOServer<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;
export type ServerInstance = InstanceType<typeof Server>;

export type Socket = IOSocket<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>;