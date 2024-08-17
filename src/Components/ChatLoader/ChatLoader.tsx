import { useState } from 'react';
import classes from './ChatLoader.module.scss';

/**
 * Renders a list of ChatLoader
 * @param {Object} props - Element's props
 * @returns {ReactElement}
 */


interface Props {

}

const ChatLoaderComponent = (props: Props) => {
  const {

  } = props; 

  return (
    <>
      <div className={classes.pulse}></div>
    </>
  );
};

ChatLoaderComponent.defaultProps = {

};

export default ChatLoaderComponent;
