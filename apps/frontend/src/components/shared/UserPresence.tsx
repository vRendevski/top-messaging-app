import OnlineCircle from '../shared/OnlineCircle';
import OfflineCircle from '../shared/OfflineCircle';

interface UserPresenceProps {
  username: string,
  isOnline: boolean
}

export default function UserPresence({ username, isOnline}: UserPresenceProps) {
  return (
    <div className="flex gap-2 items-center">
      { isOnline ? <OnlineCircle /> : <OfflineCircle /> }
      { username }
    </div>
  )
}