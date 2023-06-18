import {getDataApi, patchDataApi, postDataApi} from '../../utils/fetchData';

export const MESS_TYPE = {
  MESS_LOADING: 'MESS_LOADING',
  ADD_ITEM: 'ADD_ITEM',
  ADD_MESSAGE: 'ADD_MESSAGE',
  GET_CONVERSATION: 'GET_CONVERSATION',
  GET_MESSSAGES: 'GET_MESSSAGES',
  LOGOUT_CONVERSATIONS: 'LOGOUT_CONVERSATIONS',
  UNREAD_MESSAGES: 'UNREAD_MESSAGES',
  UPDATE_UNREAD_MESSAGES: 'UPDATE_UNREAD_MESSAGES',
  ADD_TO_UNREAD: 'ADD_TO_UNREAD',
  ADD_TO_DEEP_UNREAD: 'ADD_TO_DEEP_UNREAD',
  LOADING: 'LOADING',
  MESS_PAGINATION: 'MESS_PAGINATION',
  UPDATE_BLOCKED: 'UPDATE_BLOCKED',
};

export const addItem =
  ({item, message}) =>
  async dispatch => {
    if (message.items.every(v => v.id !== item.id)) {
      dispatch({type: MESS_TYPE.ADD_ITEM, payload: item});
    }
  };

export const addMessage =
  ({msg, auth, socket}) =>
  async dispatch => {
    dispatch({type: MESS_TYPE.ADD_MESSAGE, payload: msg});
    if (msg.conversationId) socket.emit('addMessage', msg);

    try {
      await getDataApi(`getFcm/${msg.recipient}/${msg.text}`, auth.token);
      await postDataApi('message', msg, auth.token);
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const getConversations =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: MESS_TYPE.MESS_LOADING, payload: {loading: true}});
      const res = await getDataApi('conversations', auth.token);
      const res1 = await getDataApi('unread-messages', auth.token);

      dispatch({type: MESS_TYPE.UNREAD_MESSAGES, payload: res1.data.messages});

      let newArr = [];

      res.data.chats.forEach(item => {
        item.recipients.forEach(cv => {
          if (item.propertyId === null) return;
          if (cv._id !== auth.user._id) {
            newArr.push({
              ...cv,
              text: item.text,
              id: item.propertyId._id,
              address: item.propertyId.address,
              image: item.image,
              unreadMessages: [...res1.data.messages].filter(
                i => item._id === i.conversation,
              ),
              conversation: item._id,
              propertyActive: item.propertyId.propertyActive,
              cvDate: item.createdAt,
              blocked: item?.blocked,
              blockedId: item?.blocked_by,
              pUserId: item.propertyId.userId._id,
            });
          }
        });
      });
      dispatch({
        type: MESS_TYPE.GET_CONVERSATION,
        payload: {newArr, count: res.data.count, page: 2, total: 10},
      });
      dispatch({type: MESS_TYPE.MESS_LOADING, payload: {loading: false}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const getMessages =
  ({auth, id, conversationId}) =>
  async dispatch => {
    try {
      dispatch({type: MESS_TYPE.MESS_LOADING, payload: {loading: true}});

      const res = await getDataApi(`message/${id}`, auth.token);

      dispatch({type: MESS_TYPE.GET_MESSSAGES, payload: res.data});

      dispatch({type: 'ALERT', payload: {loading: false}});
      dispatch({
        type: MESS_TYPE.UPDATE_UNREAD_MESSAGES,
        payload: conversationId,
      });

      await patchDataApi(`message-update/${conversationId}`, null, auth.token);

      dispatch({type: MESS_TYPE.MESS_LOADING, payload: {loading: false}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const blockUserConversation =
  ({auth, cvId, value}) =>
  async dispatch => {
    try {
      await patchDataApi(`block-user/${cvId}`, null, auth.token);

      dispatch({
        type: MESS_TYPE.UPDATE_BLOCKED,
        payload: {blocked: true, blockedId: auth.user._id, cvId},
      });
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

//reducer

const initialState = {
  items: [],
  data: [],
  firstLoad: false,
  unreadMessages: [],
  loading: false,
  page: 2,
  total: 10,
  count: 0,
};

const messageReducer = (state = initialState, action) => {
  switch (action.type) {
    case MESS_TYPE.ADD_ITEM:
      return {
        ...state,
        items: [action.payload, ...state.items],
      };

    case MESS_TYPE.MESS_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case MESS_TYPE.ADD_MESSAGE:
      return {
        ...state,
        data: [...state.data, action.payload],
        items: state.items.map(v =>
          v.id === action.payload.id &&
          (v._id === action.payload.recipient ||
            v._id === action.payload.sender)
            ? {
                ...v,
                text: action.payload.text,
                conversation: v.conversation
                  ? v.conversation
                  : action.payload.conversation ||
                    action.payload.conversationId,
              }
            : v,
        ),
      };

    case MESS_TYPE.GET_CONVERSATION:
      return {
        ...state,
        items: action.payload.newArr,
        firstLoad: true,
        count: action.payload.count,
        page: action.payload.page,
        total: action.payload.total,
      };

    case MESS_TYPE.GET_MESSSAGES:
      return {
        ...state,
        data: action.payload.messages.reverse(),
      };

    case MESS_TYPE.LOGOUT_CONVERSATIONS:
      return {
        ...state,
        data: [],
        items: [],
        unreadMessages: [],
        firstLoad: false,
      };

    case MESS_TYPE.UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: action.payload,
      };

    case MESS_TYPE.UPDATE_UNREAD_MESSAGES:
      return {
        ...state,
        unreadMessages: [...state.unreadMessages].filter(
          i => (i.conversationId || i.conversation) !== action.payload,
        ),
        items: [...state.items].map(i =>
          (i.conversationId || i.conversation) === action.payload
            ? {...i, unreadMessages: []}
            : i,
        ),
      };

    case MESS_TYPE.ADD_TO_UNREAD:
      return {
        ...state,
        unreadMessages: [action.payload, ...state.unreadMessages],
      };

    case MESS_TYPE.ADD_TO_DEEP_UNREAD:
      return {
        ...state,
        items: [...state.items].map(i =>
          (i.conversationId || i.conversation) === action.payload.conversationId
            ? {...i, unreadMessages: [action.payload, ...i.unreadMessages]}
            : i,
        ),
      };

    case MESS_TYPE.MESS_PAGINATION:
      return {
        ...state,
        items: [...state.items, ...action.payload.newArr],
        total: action.payload.total,
        count: action.payload.count,
        page: state.page + 1,
      };

    case MESS_TYPE.UPDATE_BLOCKED:
      return {
        ...state,
        items: [...state.items].map(item =>
          item.conversation === action.payload.cvId
            ? {
                ...item,
                blocked: action.payload.blocked,
                blockedId: action.payload.blockedId,
              }
            : item,
        ),
      };

    default:
      return state;
  }
};

export default messageReducer;
