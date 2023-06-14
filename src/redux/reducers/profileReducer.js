// TYPES
import {getDataApi, patchDataApi} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';
import {PROPERTY_TYPES} from './propertyReducer';

export const PROFILE_TYPES = {
  GET_PROFILE_USER: 'GET_PROFILE_USER',
  GET_PROFILE_PROPERTIES: 'GET_PROFILE_PROPERTIES',
  GET_PROFILE_ID: 'GET_PROFILE_ID',
  ADD_PROFILE_PROPERTY: 'ADD_PROFILE_PROPERTY',
  REMOVE_PROFILE_PROPERTY: 'REMOVE_PROFILE_PROPERTY',
  GET_PROFILE_PROPERTIES_UPDATE: 'GET_PROFILE_PROPERTIES_UPDATE',
  REMOVE_ID: 'REMOVE_ID',
};

//actions
export const getUserProfile =
  ({id, auth}) =>
  async dispatch => {
    dispatch({type: 'ALERT', payload: {loading: true}});

    dispatch({type: PROFILE_TYPES.GET_PROFILE_ID, payload: id});
    try {
      const res = await getDataApi(`profile/${id}`, auth.token);
      const res1 = await getDataApi(`get-user-properties/${id}`, auth.token);
      dispatch({type: PROFILE_TYPES.GET_PROFILE_USER, payload: res.data});
      dispatch({
        type: PROFILE_TYPES.GET_PROFILE_PROPERTIES,
        payload: {...res1.data, _id: id, page: 2},
      });
      dispatch({type: 'ALERT', payload: {loading: false}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

export const updateProfileUser = (auth, data) => async dispatch => {
  try {
    let media;
    dispatch({type: 'ALERT', payload: true});

    console.log(data);

    dispatch({
      type: 'AUTH',
      payload: {
        ...auth,
        user: {
          ...auth.user,
          avatar: data.avatar || auth.user.avatar,
          fullname: data.fullname,
          bio: data.bio,
        },
      },
    });

    if (data.avatar !== auth.user.avatar) {
      media = await imageUpload([data.avatar]);
    } else {
      media = data.avatar;
    }

    await patchDataApi('update', {...data, avatar: media[0].url}, auth.token);

    dispatch({type: 'ALERT', payload: false});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

// reducer
const initialState = {
  users: [],
  userProperties: [],
  ids: [],
};

export default profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_TYPES.GET_PROFILE_USER:
      return {
        ...state,
        users: [...state.users, action.payload.user],
      };

    case PROFILE_TYPES.GET_PROFILE_ID:
      return {
        ...state,
        ids: [...state.ids, action.payload],
      };
    case PROFILE_TYPES.REMOVE_ID:
      return {
        ...state,
        ids: action.payload,
        users: action.payload,
        userProperties: action.payload,
      };
    case PROFILE_TYPES.GET_PROFILE_PROPERTIES:
      return {
        ...state,
        userProperties: [...state.userProperties, action.payload],
      };

    case PROFILE_TYPES.GET_PROFILE_PROPERTIES_UPDATE:
      return {
        ...state,
        userProperties: [...state.userProperties].map(p =>
          p._id === action.payload._id
            ? {
                ...p,
                userProperties: [
                  ...p.userProperties,
                  ...action.payload.userProperties,
                ],
                page: action.payload.page + 1,
                total: action.payload.total,
                count: action.payload.count,
              }
            : p,
        ),
      };
    case PROFILE_TYPES.ADD_PROFILE_PROPERTY:
      return {
        ...state,
        userProperties: state.userProperties.map(user => {
          if (user._id === action.payload.userId) {
            return {
              ...user,
              userProperties: [action.payload, ...user.userProperties],
            };
          } else {
            return user;
          }
        }),
      };
    case PROFILE_TYPES.REMOVE_PROFILE_PROPERTY:
      return {
        ...state,
        userProperties: state.userProperties.map(user => {
          if (user._id === action.payload.userId._id) {
            return {
              ...user,
              userProperties: user.userProperties.filter(
                p => p._id !== action.payload._id,
              ),
            };
          } else {
            return user;
          }
        }),
      };
    case PROPERTY_TYPES.UPDATE_POST:
      return {
        ...state,
        userProperties: state.userProperties.map(user => {
          if (user._id === action.payload.userId._id) {
            return {
              ...user,
              userProperties: user.userProperties.map(post => {
                if (post._id === action.payload._id) {
                  return {
                    ...action.payload,
                  };
                } else {
                  return post;
                }
              }),
            };
          } else {
            return user;
          }
        }),
      };

    default:
      return state;
  }
};
