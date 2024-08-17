import { useState } from 'react';
import classes from './ChatInput.module.scss';

/**
 * Renders a list of ChatInput
 * @param {Object} props - Element's props
 * @returns {ReactElement}
 */


interface Props {
  onSend: any,
  onKeyUp: any,
  onChange: any,
  question: string,
  disabled: boolean,
}

const ChatInputComponent = (props: Props) => {
  const {
    onSend,
    onKeyUp,
    onChange,
    question,
    disabled
  } = props; 

  return (
    <>
      <div className={classes.inputWrapperSm}>
        <textarea
          className={classes.input}
          id="textInput"
          name="textInput"
          placeholder="Ask me something about Ronald..."
          onKeyUp={onKeyUp}
          value={question}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
        />
        <button className={classes.button} onClick={onSend}>Send</button>
      </div>
    </>
  );
};

ChatInputComponent.defaultProps = {
  onSend: null,
  onKeyUp: null,
  onChange: null,
  question: '',
  disabled: false
};

export default ChatInputComponent;
