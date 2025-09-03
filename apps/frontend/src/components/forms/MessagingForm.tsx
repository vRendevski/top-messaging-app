import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage
} from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form'
import { EventSchemas, type EventTypes } from '@vRendevski/shared/schemas/ws/events';
import { zodV4Resolver } from '@/utils/zodV4Resolver';
import { useSocket } from '@/hooks/useSocket';
import { useUserChats } from '@/hooks/useUserChats';
import { useEffect } from 'react';

interface MessagingFormProps {
  toId: number
}

export default function MessagingForm({ toId }: MessagingFormProps) {
  const { socket } = useSocket();
  const userChats = useUserChats();

  const form = useForm<EventTypes.MessageSend>({
    resolver: zodV4Resolver(EventSchemas.clientToServer.message.send),
    defaultValues: {
      message: "" 
    }
  });

  useEffect(() => {
    form.setValue("toId", toId);
  }, [form, toId])

  function onSubmit(data: EventTypes.MessageSend) {
    socket.emit("message:send", data, (ackData) => {
      userChats.dispatch({ type: "message:sendAcknowledged", payload: ackData });
    });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-[1fr_auto] gap-2">
        <FormField
          control={form.control}
          name={"message"}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea placeholder="Message..." className="resize-none" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {form.formState.errors.root && (
          <p className="text-sm font-medium text-destructive">
            {form.formState.errors.root.message}
          </p>
        )}
        <Button type="submit" variant={"outline"}>Send</Button>
      </form>
    </Form>
  )
}