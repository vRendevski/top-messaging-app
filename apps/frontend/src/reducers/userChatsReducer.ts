import type { EventTypes } from "@vRendevski/shared";

export interface Message {
  id: number,
  fromId: number,
  fromUsername: string,
  toId: number,
  sentAt: Date,
  contents: string
}

export interface UserChat {
  id: number,
  username: string,
  isOnline: boolean,
  messages: Message[]
}

export type UserChatReducerAction = 
  | { type: "user:seed"; payload: EventTypes.UserSeed } 
  | { type: "user:new"; payload: EventTypes.UserNew }
  | { type: "user:presence"; payload: EventTypes.UserPresence }
  | { type: "message:sendAcknowledged"; payload: Message }
  | { type: "message:receive"; payload: EventTypes.MessageReceive }

export default function userChatsReducer(userChats: UserChat[], action: UserChatReducerAction) {
  switch(action.type) {
    case 'user:seed': {
      return action.payload;
    }
    case 'user:new': {
      return [ ...userChats, { ...action.payload, isOnline: false, messages: [] }];
    }
    case 'user:presence': {
      return userChats.map(userChat => {
        if(userChat.id === action.payload.id) {
          return { ...userChat, isOnline: action.payload.isOnline };
        }
        return { ...userChat };
      })
    }
    case 'message:receive': {
      return userChats.map(userChat => {
        if(userChat.id === action.payload.fromId) {
          return { ...userChat, messages: [ ...userChat.messages, action.payload ]};
        }
        return { ...userChat };
      })
    }
    case 'message:sendAcknowledged': {
      return userChats.map(userChat => {
        if(userChat.id === action.payload.toId) {
          return { ...userChat, messages: [ ...userChat.messages, action.payload ]};
        }
        return { ...userChat };
      })
    }
  }
}