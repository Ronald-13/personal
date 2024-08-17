
import classes from './ChatBubbles.module.scss';
import cn from 'classnames';
import ChatLoader from '../ChatLoader';
import { useEffect } from 'react';

/**
 * Renders a list of ChatBubbles
 * @param {Object} props - Element's props
 * @returns {ReactElement}
 */


interface Props {
  chat: any[],
  typing: boolean
}

const ChatBubblesComponent = (props: Props) => {
  const {
    chat,
    typing
  } = props;

  useEffect(() => {
      const inputTag = document.getElementById('scrollToElem') as HTMLInputElement;
      inputTag.scrollIntoView(true);
  }, [chat, typing]);

  return (
    <>
        {
          chat.map((el, index) =>
            <div key={`chat:${index}`} className={cn(classes.bubbleWrapper, el.mode === 'sent' ? classes.sent : classes.received)}>
              <div className={classes.bubble}>{el.text}</div>
            </div>
          )
        }
        <div id="scrollToElem"></div>
        {typing && <div className={classes.typing}><ChatLoader /></div>}
    </>
  );
};

ChatBubblesComponent.defaultProps = {
  chat: [],
  typing: false
};

export default ChatBubblesComponent;
