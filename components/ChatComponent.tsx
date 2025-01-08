import React from 'react';
import { Chat, ChannelList, Channel, MessageInput, MessageList } from 'stream-chat-react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StreamChat } from 'stream-chat';

const client = StreamChat.getInstance('7twndvy6zfbk');

const ChatComponent = () => {
  return (
    <SafeAreaProvider>
      <Chat client={client}>
        <ChannelList />
        <Channel>
          <MessageList />
          <MessageInput />
        </Channel>
      </Chat>
    </SafeAreaProvider>
  );
};

export default ChatComponent;
