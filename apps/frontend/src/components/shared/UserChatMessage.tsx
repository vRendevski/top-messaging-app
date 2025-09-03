interface UserChatMessageProps {
  shouldDisplayHeader: boolean
  sentBy: string,
  sentAt: Date,
  contents: string
}

export default function UserChatMessage({ shouldDisplayHeader, sentBy, sentAt, contents }: UserChatMessageProps) {
  return (
    <>
      { shouldDisplayHeader === true &&
        <h1 className="text-muted-foreground text-xs mt-4">
          {`${sentBy}, ${sentAt.toLocaleString()}`}
        </h1>}
      <p>{contents}</p>
    </>
  )
}