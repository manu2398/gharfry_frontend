import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {MESS_TYPE} from './redux/reducers/messageReducer';

const SocketClient = () => {
  const {auth, socket} = useSelector(state => state);
  const dispatch = useDispatch();

  useEffect(() => {
    socket.emit('joinUser', auth.user._id);
  }, [socket, auth.user?._id]);

  useEffect(() => {
    socket.on('addMessageToClient', msg => {
      if (msg.conversationId || msg.conversation) {
        dispatch({type: MESS_TYPE.ADD_MESSAGE, payload: msg});

        dispatch({type: MESS_TYPE.ADD_TO_UNREAD, payload: msg});

        dispatch({type: MESS_TYPE.ADD_TO_DEEP_UNREAD, payload: msg});
      }
    });
  }, [socket]);

  return <></>;
};

export default SocketClient;
