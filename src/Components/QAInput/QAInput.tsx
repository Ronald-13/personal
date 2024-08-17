import { useState } from 'react';
import classes from './QAInput.module.scss';

/**
 * Renders a list of QAInput
 * @param {Object} props - Element's props
 * @returns {ReactElement}
 */


interface Props {
  onKeyUp: any,
  onChange: any,
  question: string,
  disabled: boolean
}

const QAInputComponent = (props: Props) => {
  const {
    onKeyUp,
    onChange,
    question,
    disabled
  } = props; 

  return (
    <>
      <div className={classes.inputWrapper}>
        <input
          className={classes.input}
          type="text"
          id="textInput"
          name="textInput"
          placeholder="Ask me something about Ronald..."
          onKeyUp={onKeyUp}
          value={question}
          onChange={onChange}
          disabled={disabled}
          autoComplete="off"
        />
      </div>
    </>
  );
};

QAInputComponent.defaultProps = {
  onKeyUp: null,
  onChange: null,
  question: '',
  disabled: false
};

export default QAInputComponent;
