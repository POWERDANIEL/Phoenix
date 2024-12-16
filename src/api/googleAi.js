import model from '../lib/googleAi';

const getConversationTitle = async (userPrompt) => {
  try {
    const result = await model.generateContent(
      `Given a user prompt, generate a concise and informative title that accurately describes the conversation. Consider keywords, topics, and the overall intent of the prompt. Response in plain text format, not markdown.
      
      Prompt: ${userPrompt}`,
    );
    return result.response.text();
  } catch (err) {
    console.log(`Error generating conversation title: ${err.message}`);
  }

  return null;
};

const getAiResponse = async (userPrompt, chats = []) => {
  try {
    const chat = model.startChat({ history: chats, temperature: 1.5 });
    const result = await chat.sendMessage(userPrompt);

    return result.response.text();
  } catch (err) {
    console.log(`Error generating AI response: ${err.message}`);
  }
  return null;
};

export { getConversationTitle, getAiResponse };
