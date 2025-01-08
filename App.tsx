import { useEffect, useState } from 'react';
import { StreamProvider } from './components/StreamProvider';
import { ChatComponent } from './components/ChatComponent';

const App: React.FC = () => {
  const STREAM_API_KEY = process.env.STREAM_API_KEY!;
  const BACKEND_ENDPOINT = process.env.BACKEND_ENDPOINT!;
  const [userToken, setUserToken] = useState<string>('');
  
  // In a real app, you'd get these from your auth system
  const userData = {
    id: 'user-' + Math.random().toString(36).substr(2, 9), // Generate random user ID for demo
    name: 'User Name',
    image: 'https://example.com/user-image.jpg',
  };

  useEffect(() => {
    // In a real app, you'd get the token from your backend
    // For demo purposes, we're generating a token here
    const generateToken = async () => {
      try {
        const response = await fetch(`${BACKEND_ENDPOINT}/token`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: userData.id,
          }),
        });
        const data = await response.json();
        setUserToken(data.token);
      } catch (error) {
        console.error('Failed to get token:', error);
      }
    };

    generateToken();
  }, [userData.id]);

  // Function to generate AI response
  const generateAIResponse = async (message: string, chatId: string) => {
    try {
      const response = await fetch(`${BACKEND_ENDPOINT}/generate-response`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          user_id: userData.id,
          message: message,
          chat_id: chatId,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to generate response');
      }
      
      const data = await response.json();
      return data.response;
    } catch (error) {
      console.error('Error generating AI response:', error);
      throw error;
    }
  };

  if (!userToken) {
    return <div>Loading...</div>;
  }

  return (
    <StreamProvider
      apiKey={STREAM_API_KEY}
      userData={userData}
      userToken={userToken}
    >
      <ChatComponent onAIResponse={generateAIResponse} />
    </StreamProvider>
  );
};

export default App;
