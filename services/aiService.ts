export const sendMessageToAI = async (message: string, channelId: string) => {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      message,
      channelId,
    }),
  });
  return response.json();
}; 