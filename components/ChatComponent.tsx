import {
  Channel,
  ChannelHeader,
  ChannelList,
  MessageInput,
  MessageList,
  Thread,
  Window,
  useChannelStateContext,
} from 'stream-chat-react';
import 'stream-chat-react/dist/css/index.css';

interface ChatComponentProps {
  onAIResponse: (message: string, chatId: string) => Promise<string>;
}

export const ChatComponent: React.FC<ChatComponentProps> = ({ onAIResponse }) => {
  const filters = { type: 'messaging' };
  const sort = { last_message_at: -1 };

  // Custom message handler
  const CustomMessageInput = () => {
    const { channel } = useChannelStateContext();

    const handleSubmit = async (message: string) => {
      try {
        // First send user message
        await channel.sendMessage({
          text: message,
        });

        // Then generate and send AI response
        const aiResponse = await onAIResponse(message, channel.id);
        
        // AI response is handled by the backend through Stream's API
        // No need to manually send it here as it's done in the backend
      } catch (error) {
        console.error('Error handling message:', error);
      }
    };

    return <MessageInput overrideSubmitHandler={handleSubmit} />;
  };

  return (
    <div className="chat-container">
      <ChannelList 
        filters={filters} 
        sort={sort}
        options={{ state: true, presence: true, limit: 10 }}
      />
      <Channel Input={CustomMessageInput}>
        <Window>
          <ChannelHeader />
          <MessageList />
        </Window>
        <Thread />
      </Channel>
    </div>
  );
};
