import { createFileRoute, useParams } from '@tanstack/react-router'
import MessagingForm from '@/components/forms/MessagingForm'
import { useUserChats } from '@/hooks/useUserChats';
import UserPresence from '@/components/shared/UserPresence';
import UserChatMessage from '@/components/shared/UserChatMessage';

export const Route = createFileRoute('/chat/$chatId')({
  component: RouteComponent,
  params: {
    parse: (params) => ({
      chatId: Number(params.chatId)
    }),
    stringify: (params) => ({
      chatId: String(params.chatId)
    })
  }
})

function RouteComponent() {
  const { chatId: chatIdParam } = useParams({ from: "/chat/$chatId" });
  const { userChats } = useUserChats();

  const userChat = userChats.find(uc => uc.id === chatIdParam);

  if(userChat === undefined) {
    return (
      <div className="w-full flex justify-center items-center">
        <h1 className="text-xl">
          Something went wrong. Please try again later!
        </h1>
      </div>
    )
  }

  return (
    <div className="h-screen w-full grid grid-rows-[auto_1fr_auto]">
      <section className="sticky p-4 top-0 border-b">
        <UserPresence username={userChat.username} isOnline={userChat.isOnline} />
      </section>
      <section className="flex flex-col px-4 overflow-y-scroll">
        { userChat.messages.map((message, index) => (
          <UserChatMessage 
            key={message.id} 
            shouldDisplayHeader={index === 0 || userChat.messages[index-1].fromId !== message.fromId }
            sentBy={message.fromUsername}
            sentAt={message.sentAt}
            contents={message.contents}
          />
        ))}
      </section>
      <section className="sticky p-4 bottom-0">
        <MessagingForm toId={chatIdParam}/>
      </section>
    </div>
  )
}
