import { useRouter } from 'next/router';
import Conversation from './Conversation';

export default function ConversationPage() {
  const { query } = useRouter();
  // Placeholder conversation data
  const conversation = { title: 'Conversation', chats: [] };
  return <Conversation title={conversation.title} chats={conversation.chats} />;
}
