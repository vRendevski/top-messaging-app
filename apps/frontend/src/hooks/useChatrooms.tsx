import { createContext, useContext, useEffect, useReducer } from 'react'
import { useSocket } from './useSocket';
import chatroomReducer, { type Chatroom, type ChatroomReducerAction } from '@/reducers/chatroomsReducer';
import { type EventTypes } from '@vRendevski/shared/schemas/ws/events';

interface ChatroomsProviderState {
  chatrooms: Chatroom[],
  dispatch: (action: ChatroomReducerAction) => void 
}

const ChatroomsContext = createContext<ChatroomsProviderState | undefined>(undefined);

export function useChatrooms() {
  const context = useContext(ChatroomsContext);

  if(context === undefined) {
    throw new Error("useChatrooms must be called within a ChatroomsContextProvider");
  }

  return context;
}

export default function ChatroomsContextProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const [ chatrooms, dispatch ] = useReducer(chatroomReducer, []);

  useEffect(() => {
    function handleAddOnlineUser(data: EventTypes.AddOnlineUser) {
      dispatch({ type: "addOnlineUser", payload: { id: data.id, name: data.username, unreadCount: data.unreadCount }});
    }

    function handleAddOfflineUser(data: EventTypes.AddOfflineUser) {
      dispatch({ type: "addOfflineUser", payload: { id: data.id, name: data.username, unreadCount: data.unreadCount }});
    }

    socket.on("addOnlineUser", handleAddOnlineUser);
    socket.on("addOfflineUser", handleAddOfflineUser);

    return () => {
      socket.off("addOnlineUser", handleAddOnlineUser);
      socket.off("addOfflineUser", handleAddOfflineUser);
    }
  }, [socket]);

  return (
    <ChatroomsContext.Provider value={{ chatrooms, dispatch }}>
      { children }
    </ChatroomsContext.Provider>
  )
}