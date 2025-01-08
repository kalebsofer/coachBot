import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

interface StreamProviderProps {
  children: React.ReactNode;
  apiKey: string;
  userData: {
    id: string;
    name: string;
    image?: string;
  };
  userToken: string;
}

export const StreamProvider: React.FC<StreamProviderProps> = ({
  children,
  apiKey,
  userData,
  userToken,
}) => {
  const chatClient = StreamChat.getInstance(apiKey);

  // Initialize user connection
  useEffect(() => {
    const connectUser = async () => {
      try {
        await chatClient.connectUser(userData, userToken);
      } catch (error) {
        console.error('Failed to connect user:', error);
      }
    };

    connectUser();

    return () => {
      chatClient.disconnectUser();
    };
  }, [chatClient, userData, userToken]);

  return (
    <Chat client={chatClient}>
      {children}
    </Chat>
  );
}; 