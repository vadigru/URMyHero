import React from 'react';
import PropTypes from 'prop-types';

import './message.scss';


const Message = (props) => {
  return (
    <span className="message">{props.message}</span>
  );
}

Message.propTypes = {
  message: PropTypes.string,
};

export default Message;
