import { useRef, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useToggle } from '../hooks/useToggle';
import Avatar from './Avatar';
import { IconBtn } from './Button';

interface UserPromptProps {
  text: string;
  user?: { name: string };
}

const UserPrompt = ({ text, user }: UserPromptProps) => {
  const [isExpanded, toggleExpand] = useToggle();
  const textBoxRef = useRef<HTMLParagraphElement>(null);
  const [hasMoreContent, setMoreContent] = useState(false);

  useEffect(() => {
    if (textBoxRef.current) {
      setMoreContent(textBoxRef.current.scrollHeight > textBoxRef.current.clientHeight);
    }
  }, [textBoxRef]);

  return (
    <div className='grid grid-cols-1 items-start gap-1 py-4 md:grid-cols-[max-content,minmax(0,1fr),max-content] md:gap-5'>
      <Avatar name={user?.name} />
      <p
        className={`text-bodyLarge pt-1 whitespace-pre-wrap ${!isExpanded ? 'line-clamp-4' : ''}`}
        ref={textBoxRef}
      >
        {text}
      </p>
      {hasMoreContent && (
        <IconBtn
          icon={isExpanded ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
          onClick={toggleExpand}
          title={isExpanded ? 'Collapse text' : 'Expand text'}
        />
      )}
    </div>
  );
};

UserPrompt.propTypes = {
  text: PropTypes.string,
};

export default UserPrompt;
