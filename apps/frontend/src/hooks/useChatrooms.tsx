import { useEffect, useReducer } from 'react'
import { useSocket } from './useSocket';
import chatroomReducer from '@/reducers/chatroomsReducer';
import { type EventTypes } from '@vRendevski/shared/schemas/ws/events';

export default function useChatrooms() {
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

  return { chatrooms, dispatch };
}