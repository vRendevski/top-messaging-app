import { createContext, useContext, useEffect, useReducer } from 'react'
import { useSocket } from './useSocket';
import userChatsReducer, { type UserChat, type UserChatReducerAction } from '@/reducers/userChatsReducer';
import { type EventTypes } from '@vRendevski/shared';

interface UserChatsProviderState {
  userChats: UserChat[],
  dispatch: (action: UserChatReducerAction) => void 
}

const UserChatsContext = createContext<UserChatsProviderState | undefined>(undefined);

export function useUserChats() {
  const context = useContext(UserChatsContext);

  if(context === undefined) {
    throw new Error("useChatrooms must be called within a ChatroomsContextProvider");
  }

  return context;
}

export default function UserChatsProvider({ children }: { children: React.ReactNode }) {
  const { socket } = useSocket();
  const [ userChats, dispatch ] = useReducer(userChatsReducer, []);

  useEffect(() => {
    function handleUserSeed(payload: EventTypes.UserSeed) {
      payload = payload.map(item => ({
        ...item,
        messages: item.messages.map(message => ({ ...message, sentAt: new Date(message.sentAt) }))
      }));
      dispatch({ type: "user:seed", payload }) 
    }

    function handleUserNew(payload: EventTypes.UserNew) {
      dispatch({ type: "user:new", payload });
    }

    function handleUserPresence(payload: EventTypes.UserPresence) {
      dispatch({ type: "user:presence", payload });
    }

    function handleMessageReceive(payload: EventTypes.MessageReceive) {
      payload.sentAt = new Date(payload.sentAt);
      dispatch({ type: "message:receive", payload });
    }

    socket.on("user:seed", handleUserSeed);
    socket.on("user:new", handleUserNew);
    socket.on("user:presence", handleUserPresence);
    socket.on("message:receive", handleMessageReceive);

    return () => {
      socket.off("message:receive", handleMessageReceive);
      socket.off("user:presence", handleUserPresence);
      socket.off("user:new", handleUserNew);
      socket.off("user:seed", handleUserSeed);
    }
  }, [socket]);

  return (
    <UserChatsContext.Provider value={{ userChats, dispatch }}>
      { children }
    </UserChatsContext.Provider>
  )
}