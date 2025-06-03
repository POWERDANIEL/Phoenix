import { motion } from 'framer-motion';
import { useEffect, useRef, ReactNode } from 'react';
import { usePromptPreloader } from '../hooks/userPromptPreloader';
import PageTitle from './PageTitle';
import PromptField from './PromptField';
import Greetings from '../pages/Greetings';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const chatHistoryRef = useRef<HTMLDivElement>(null);
  const { promptPreloaderValue } = usePromptPreloader();

  useEffect(() => {
    const chatHistory = chatHistoryRef.current;
    if (chatHistory && promptPreloaderValue) {
      chatHistory.scroll({
        top: chatHistory.scrollHeight - chatHistory.clientHeight,
        behavior: 'smooth',
      });
    }
  }, [promptPreloaderValue]);

  return (
    <>
      <PageTitle title='Phoenix - chat to supercharge your ideas' />
      <div className='h-dvh grid grid-rows-[max-content,minmax(0,1fr),max-content]'>
        <div ref={chatHistoryRef} className='px-5 pb-5 flex flex-col overflow-y-auto'>
          <div className='max-w-[840px] w-full mx-auto grow'>
            {children ?? <Greetings />}
          </div>
        </div>
        <div className='bg-light-background dark:bg-dark-background'>
          <div className='max-w-[870px] px-5 w-full mx-auto'>
            <PromptField />
            <motion.p
              initial={{ opacity: 0, translateY: '-4px' }}
              animate={{ opacity: 1, translateY: 0 }}
              transition={{ duration: 0.2, delay: 0.8, ease: 'easeOut' }}
              className='text-bodySmall text-center text-light-onSurfaceVariant dark:text-dark-onSurfaceVariant p-3'
            >
              Phoenix may display inaccurate info, including about people, so double-check its responses.
              <a href='https://support.google.com/gemini?p=privacy_notice' target='_blank' className='inline underline ms-1'>
                Your privacy & Gemini Apps
              </a>
            </motion.p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
