import { useState } from 'react';

export const usePromptPreloader = () => {
  const [promptPreloaderValue, setPromptPreloaderValue] = useState('');
  return { promptPreloaderValue, setPromptPreloaderValue };
};
