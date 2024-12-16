import { redirect } from 'react-router-dom';

import { account, databases } from '../../lib/appwrite';
import { getConversationTitle, getAiResponse } from '../../api/googleAi';
import generateID from '../../utils/generateID';

const userPromptAction = async (formData) => {
  const userPrompt = formData.get('user_prompt');
  let conversation = null;

  const user = await account.get();

  const conversationTitle = await getConversationTitle(userPrompt);
  if (!conversationTitle || conversationTitle.trim() === '') {
    console.error('Error: Conversation title is empty or undefined.');
    throw new Error('Conversation title cannot be empty.');
  }

  try {
    conversation = await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'conversations',
      generateID(),
      {
        title: conversationTitle,
        user_id: user.$id,
      },
    );
  } catch (err) {
    console.error(`Error creating conversation: ${err.message}`);
    throw err;
  }

  if (!conversation || !conversation.$id) {
    console.error('Error: Conversation was not created successfully.');
    throw new Error('Conversation creation failed.');
  }

  const aiResponse = await getAiResponse(userPrompt);

  try {
    await databases.createDocument(
      import.meta.env.VITE_APPWRITE_DATABASE_ID,
      'chats',
      generateID(),
      {
        user_prompt: userPrompt,
        ai_response: aiResponse,
        conversation: conversation.$id,
      },
    );
  } catch (err) {
    console.error(`Error creating chat: ${err.message}`);
    throw err;
  }

  return redirect(`/${conversation.$id}`);
};

const appAction = async ({ request }) => {
  const formData = await request.formData();
  const requestType = formData.get('request_type');

  if (requestType === 'user_prompt') {
    return await userPromptAction(formData);
  }
};

export default appAction;
