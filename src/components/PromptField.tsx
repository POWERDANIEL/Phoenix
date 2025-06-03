import { motion } from 'framer-motion';
import { useRef, useCallback, useState } from 'react';
import { IconBtn } from './Button';

const PromptField = () => {
  const inputField = useRef<HTMLDivElement>(null);
  const inputFieldContainer = useRef<HTMLDivElement>(null);
  const [placeholderShown, setPlaceholderShown] = useState(true);
  const [isMultiline, setMultiline] = useState(false);
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = useCallback(() => {
    if (inputField.current && inputField.current.innerText === '\n') {
      inputField.current.innerHTML = '';
    }
    if (inputField.current && inputFieldContainer.current) {
      setPlaceholderShown(!inputField.current.innerText);
      setMultiline(inputFieldContainer.current.clientHeight > 64);
      setInputValue(inputField.current.innerText.trim());
    }
  }, []);

  const moveCursorToEnd = useCallback(() => {
    const editableElem = inputField.current;
    if (!editableElem) return;
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(editableElem);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }, []);

  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      if (inputField.current) {
        inputField.current.innerText += e.clipboardData.getData('text');
      }
      handleInputChange();
      moveCursorToEnd();
    },
    [handleInputChange, moveCursorToEnd]
  );

  const handleSubmit = useCallback(() => {
    if (!inputValue) return;
    // TODO: send prompt
    if (inputField.current) inputField.current.innerHTML = '';
    handleInputChange();
  }, [handleInputChange, inputValue]);

  const promptFieldVariant = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.2,
        duration: 0.4,
        delay: 0.4,
        ease: [0.05, 0.7, 0.1, 1],
      },
    },
  };

  const promptFieldChildrenVariant = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <motion.div
      className={`prompt-field-container ${isMultiline ? 'rounded-large' : ''}`}
      variants={promptFieldVariant}
      initial='hidden'
      animate='visible'
      ref={inputFieldContainer}
    >
      <motion.div
        className={`prompt-field ${placeholderShown ? '' : 'after:hidden'}`}
        contentEditable
        role='textbox'
        aria-multiline
        aria-label='Enter a prompt here'
        data-placeholder='Enter a prompt here'
        variants={promptFieldChildrenVariant}
        ref={inputField}
        onInput={handleInputChange}
        onPaste={handlePaste}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSubmit();
          }
        }}
      />
      <IconBtn
        icon='send'
        title='Submit'
        size='large'
        classes='ms-auto'
        variants={promptFieldChildrenVariant}
        onClick={handleSubmit}
      />
      <div className='state-layer'></div>
    </motion.div>
  );
};

export default PromptField;
