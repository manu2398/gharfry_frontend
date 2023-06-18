import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchData';

export const NOTIFICATION_TYPES = {
  GET: 'GET',
  LOGOUT_NOTIFY: 'LOGOUT_NOTIFY',
  UPDATE_NOTIFY: 'UPDATE_NOTIFY',
  UNREAD_NOTIFIES: 'UNREAD_NOTIFIES',
  DELETE_ALL: 'DELETE_ALL',
  NOTIFY_PAGINATION: 'NOTIFY_PAGINATION',
  NOTIFY_LOADING: 'NOTIFY_LOADING',
};

export const getNotifications =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({
        type: NOTIFICATION_TYPES.NOTIFY_LOADING,
        payload: {loading: true},
      });
      const res = await getDataApi('notification', auth.token);

      const res1 = await getDataApi('unread-notify', auth.token);
      dispatch({
        type: NOTIFICATION_TYPES.GET,
        payload: res.data,
      });

      dispatch({
        type: NOTIFICATION_TYPES.UNREAD_NOTIFIES,
        payload: res1.data.unreadNotifies,
      });

      dispatch({
        type: NOTIFICATION_TYPES.NOTIFY_LOADING,
        payload: {loading: false},
      });
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const createNotification =
  ({item, auth, text}) =>
  async dispatch => {
    const data = {
      propId: item && item._id,
      text,
    };

    try {
      await postDataApi('notification', data, auth.token);
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const updateNotification =
  ({id, auth}) =>
  async dispatch => {
    try {
      dispatch({type: NOTIFICATION_TYPES.UPDATE_NOTIFY, payload: id});
      await patchDataApi(`notification/${id}`, null, auth.token);
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const clearAllNotifications =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: NOTIFICATION_TYPES.DELETE_ALL});
      await deleteDataApi(`notification`, auth.token);
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

const initialState = {
  notifications: [],
  total: 0,
  page: 2,
  count: 0,
  firstLoad: false,
  unreadNotifications: [],
  loading: false,
};
const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case NOTIFICATION_TYPES.GET:
      return {
        ...state,
        notifications: action.payload.notifications,
        firstLoad: true,
        total: 10,
        count: action.payload.count,
        page: 2,
      };

    case NOTIFICATION_TYPES.NOTIFY_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case NOTIFICATION_TYPES.LOGOUT_NOTIFY:
      return {
        ...state,
        notifications: [],
        unreadNotifications: [],
        firstLoad: false,
      };

    case NOTIFICATION_TYPES.UPDATE_NOTIFY:
      return {
        ...state,
        notifications: [...state.notifications].map(i =>
          i._id === action.payload ? {...i, receiverHasRead: true} : i,
        ),
        unreadNotifications: [...state.unreadNotifications].filter(
          i => i._id !== action.payload,
        ),
      };

    case NOTIFICATION_TYPES.UNREAD_NOTIFIES:
      return {
        ...state,
        unreadNotifications: action.payload,
      };

    case NOTIFICATION_TYPES.DELETE_ALL:
      return {
        ...state,
        unreadNotifications: [],
        notifications: [],
      };

    case NOTIFICATION_TYPES.NOTIFY_PAGINATION:
      return {
        ...state,
        notifications: [
          ...state.notifications,
          ...action.payload.notifications,
        ],
        total: action.payload.total,
        count: action.payload.count,
        page: state.page + 1,
      };

    default:
      return state;
  }
};

export default notificationReducer;
