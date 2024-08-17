import { useEffect, useRef, useState } from "react";
import ChatBubbles from "../../Components/ChatBubbles";
import ChatInput from "../../Components/ChatInput";
import QAInput from "../../Components/QAInput";
import Links from "../../Components/Links";
import QAReply from "../../Components/QAReply";
import useWindowDimensions from "../../CustomHooks/useWindowDimensions";
import { getChat, wakeUpServer } from "../../Services/mainService";
import classes from './Home.module.scss';
import TagManager from 'react-gtm-module'

const HomePage = () => {

  const replyRef = useRef('');
  const [replyText, setReplyText] = useState('');
  const [question, setQuestion] = useState('');
  const [botReply, setBotReply] = useState('');
  const [inputDisabled, setInputDisabled] = useState(false);
  const [defaultOptions, setDefaultOptions] = useState([]);
  const [doneWriting, setDoneWriting] = useState(false);
  const { height, width } = useWindowDimensions();
  const [chatArray, setChatArray] = useState<any>([]);
  const [apiLoading, setApiLoading] = useState(false);

  useEffect(() => {
    wakeUpServer();
    TagManager.dataLayer({
      dataLayer: {
          page: 'home',
      },
      dataLayerName: 'PageDataLayer'
  })
  }, []);

  useEffect(() => {
    if (botReply) {
      let contentArray = botReply.split("");
      let current = 0;
      replyRef.current = '';

      const intervalId = setInterval(() => {
        if (current < contentArray.length) {
          replyRef.current = (replyRef.current + contentArray[current++]);
          setReplyText(replyRef.current);
        }
        else {
          setInputDisabled(false);
          clearInterval(intervalId);
          setDoneWriting(true);
        }
      }, 50);

    }
  }, [botReply]);

  const sendQuestion = async (_question: string, mode: string) => {
      setInputDisabled(true);
      setDoneWriting(false);
      setBotReply('');
      setDefaultOptions([]);
      setApiLoading(true);
      setQuestion('');
      const res = await getChat(_question);
      setApiLoading(false);
      if (mode === 'qa') setBotReply(res.text);
      if (mode === 'chat') setInputDisabled(false);
      setChatArray((el: any) => [...el, { text: res.text, mode: 'received' }]);
      if (res.documentLink) {
        var link = document.createElement('a');
        link.href = res.documentLink;
        link.download = 'CV_RONALD.pdf';
        link.target = '_self';
        link.dispatchEvent(new MouseEvent('click'));
      }
      else if (res.defaultOptions) {
        setDefaultOptions(res.defaultOptions);
      }
  }

  const handleOnKeyUp = (event: any) => {
    if (event.keyCode === 13 && !!question.trim()) {
      setChatArray((el: any) => [...el, { text: question, mode: 'sent' }]);
      sendQuestion(question, 'qa');
    }
  };

  const handleChange = (e: any) => {
    setQuestion(e.target.value);
  };

  const handleDefaultOptionClick = (question: string) => {
    if(!!question.trim()){
      setQuestion(question);
      setChatArray((el: any) => [...el, { text: question, mode: 'sent' }]);
      sendQuestion(question, 'qa');
    }
  }

  const handleOnChatSend = () => {
    if(!!question.trim()){
      setChatArray((el: any) => [...el, { text: question, mode: 'sent' }]);
      sendQuestion(question, 'chat');
    }
  }

  const handleOnChatKeyUp = (event: any) => {
    if (event.keyCode === 13 && !!question.trim()) {
      setChatArray((el: any) => [...el, { text: question, mode: 'sent' }]);
      sendQuestion(question, 'chat');
    }
  }

  return (
    <>
      {width <= 768 ?
        <>
          <div className={classes.chatWrapper}>
            <ChatBubbles chat={chatArray} typing={apiLoading} />
            <ChatInput
              onSend={handleOnChatSend}
              onKeyUp={handleOnChatKeyUp}
              onChange={handleChange}
              question={question}
              disabled={inputDisabled}
            />
          </div>
        </> :
        <>
          <Links orientation={'left'} type={'social-media-links'} />
          <Links orientation={'right'} type={'mail-link'} />
          <QAInput
            onKeyUp={handleOnKeyUp}
            onChange={handleChange}
            question={question}
            disabled={inputDisabled}
          />
          <QAReply
            replyText={replyText}
            defaultOptions={defaultOptions}
            doneWriting={doneWriting}
            typing={apiLoading}
            onDefaultOptionClick={handleDefaultOptionClick}
          />
        </>
      }
    </>
  )
}

export default HomePage;