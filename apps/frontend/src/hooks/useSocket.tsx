import { createContext, useContext, useState } from "react";
import io, { type Socket as IOSocket } from "socket.io-client";
import type { ClientToServerEvents, ServerToClientEvents } from "@vRendevski/shared";

type Socket = IOSocket<ServerToClientEvents, ClientToServerEvents>

interface SocketContextProviderState {
  socket: Socket
}

const SocketContext = createContext<SocketContextProviderState | undefined>(undefined);

export function useSocket() {
  const context = useContext(SocketContext);

  if(context === undefined) {
    throw new Error("useSocket must be called within a SocketContextProvider");
  }

  return {
    socket: context.socket
  }
}

export default function SocketContextProvider({ children }: { children: React.ReactNode }) {
  const [ socket ] = useState<Socket>(io({ autoConnect: false, reconnection: false }));

  return (
    <SocketContext.Provider value={{ socket }}>
      { children }
    </SocketContext.Provider>
  )
}