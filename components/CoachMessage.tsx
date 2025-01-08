import { Message, MessageProps } from 'stream-chat-react';

export const CoachMessage: React.FC<MessageProps> = (props) => {
  const isCoachMessage = props.message.user?.id === 'coach-bot';

  if (!isCoachMessage) {
    return <Message {...props} />;
  }

  return (
    <div className="coach-message">
      <Message {...props} />
      {/* Add any custom UI elements for coach messages */}
    </div>
  );
}; 