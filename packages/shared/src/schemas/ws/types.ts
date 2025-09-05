import { type EventTypes } from "./events";

export interface ClientToServerEvents {
  "message:send": (data: EventTypes.MessageSend, ack: (data: EventTypes.MessageReceive) => void) => void
}

export interface ServerToClientEvents {
  "user:seed": (data: EventTypes.UserSeed) => void,
  "user:new": (data: EventTypes.UserNew) => void,
  "user:presence": (data: EventTypes.UserPresence) => void,
  "message:receive": (data: EventTypes.MessageReceive) => void
}

export interface InterServerEvents {
}

export interface SocketData {
  userId: number
}