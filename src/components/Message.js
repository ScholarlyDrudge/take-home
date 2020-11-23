import React from 'react';
import Moment from 'react-moment';

const Message = (props) => {
    const {name, message, created} = props.message
    return (
        <div className={'container'}>
            <p className={'message'}>{message}</p>
            <p className={'name'}>By {name}</p>
            <p className={'timestamp'}>Posted on <Moment format='MM/DD/YYYY'>{created}</Moment> at <Moment format='H:mm'>{created}</Moment></p>
        </div>
    );
};

export default Message;