import { motion } from 'framer-motion';
import { usePromptPreloader } from '../hooks/userPromptPreloader';
import PageTitle from '../components/PageTitle';
import UserPrompt from '../components/UserPrompt';
import AiResponse from '../components/AiResponse';
import PromptPreloader from '../components/PromptPreloader';

interface Chat {
  $id: string;
  user_prompt: string;
  ai_response: string;
}

interface ConversationProps {
  title: string;
  chats: Chat[];
}

const Conversation = ({ title, chats }: ConversationProps) => {
  const { promptPreloaderValue } = usePromptPreloader();

  return (
    <>
      <PageTitle title={`${title} | Phoenix`} />
      <motion.div
        className='max-w-[700px] mx-auto !will-change-auto'
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2, delay: 0.05, ease: 'easeOut' }}
      >
        {chats.map((chat) => (
          <div key={chat.$id}>
            <UserPrompt text={chat.user_prompt} />
            <AiResponse aiResponse={chat.ai_response} />
          </div>
        ))}
      </motion.div>
      {promptPreloaderValue && <PromptPreloader promptValue={promptPreloaderValue} />}
    </>
  );
};

export default Conversation;
