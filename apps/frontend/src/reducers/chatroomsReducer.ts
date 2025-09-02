export interface Chatroom {
  id: number,
  name: string,
  isActive: boolean,
  unreadCount: number,
}

export type ChatroomReducerAction = 
  | { type: "addOnlineUser"; payload: Omit<Chatroom, "isActive"> } 
  | { type: "addOfflineUser"; payload: Omit<Chatroom, "isActive"> }

export default function chatroomReducer(chatrooms: Chatroom[], action: ChatroomReducerAction) {
  switch(action.type) {
    case 'addOnlineUser': {
      let found = false;
      const newChatrooms = chatrooms.map(chatroom => {
        if(chatroom.id === action.payload.id) {
          found = true;
          return { ...chatroom, isActive: true };
        }
        return { ...chatroom };
      });
      return newChatrooms.concat(found ? [] : { ...action.payload, isActive: true });
    }
    case 'addOfflineUser': {
      let found = false;
      const newChatrooms = chatrooms.map(chatroom => {
        if(chatroom.id === action.payload.id) {
          found = true;
          return { ...chatroom, isActive: false };
        }
        return { ...chatroom };
      });
      return newChatrooms.concat(found ? [] : { ...action.payload, isActive: false });
    }
  }
}