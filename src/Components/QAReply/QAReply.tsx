
import ChatLoader from '../ChatLoader';
import classes from './QAReply.module.scss';

/**
 * Renders a list of QAReply
 * @param {Object} props - Element's props
 * @returns {ReactElement}
 */


interface Props {
  replyText: string,
  defaultOptions: string[],
  doneWriting: boolean,
  typing: boolean,
  onDefaultOptionClick: any
}

const QAReply = (props: Props) => {
  const {
    replyText,
    defaultOptions,
    doneWriting,
    typing,
    onDefaultOptionClick
  } = props;

  return (
    <div className={classes.replyWrapper}>
      { typing ? <div className={classes.typing}><ChatLoader/></div> : <div className={classes.reply}>{replyText}</div> }
      {
        defaultOptions.length > 0 && doneWriting &&
        <div className={classes.defaultOptionsWrapper}>
          {
            defaultOptions.map((el, index) => 
              <>
               <div key={`default-options-${index}`}>
                 <button className={classes.button} onClick={() => onDefaultOptionClick(el)}>{el}</button>
                </div>
              </>
            )
          }
        </div>
      }
    </div>
  );
};

QAReply.defaultProps = {
  replyText: '',
  defaultOptions: [],
  doneWriting: false,
  typing: false,
  onDefaultOptionClick: null
};

export default QAReply;
