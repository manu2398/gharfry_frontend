import {
  deleteDataApi,
  getDataApi,
  patchDataApi,
  postDataApi,
} from '../../utils/fetchData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {PROPERTY_TYPES} from './propertyReducer';
import {MESS_TYPE} from './messageReducer';
import {PROFILE_TYPES} from './profileReducer';
import {FAV_TYPES} from './favoriteReducer';
import {NOTIFICATION_TYPES, createNotification} from './notificationReducer';

// TYPES
export const TYPES = {
  AUTH: 'AUTH',
  UPDATE_CREDITS: 'UPDATE_CREDITS',
  UPDATE_VERIFICATION: 'UPDATE_VERIFICATION',
};

export const login = data => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});
    const res = await postDataApi('login', data);
    await AsyncStorage.setItem('token', res.data.user.token);
    dispatch({
      type: 'AUTH',
      payload: {token: res.data.user.token, user: res.data.user},
    });
    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
  }
};

export const register = data => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});
    const res = await postDataApi('register', data);
    await AsyncStorage.setItem('token', res.data.user.token);

    const fcmToken = await AsyncStorage.getItem('fcmToken');

    if (fcmToken) {
      await postDataApi('pushNotify', {fcmToken, id: res.data.user._id});
    }

    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    console.log(err);
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const accountScreenVerification =
  ({auth}) =>
  async dispatch => {
    try {
      // dispatch({type: 'ALERT', payload: {loading: true}});
      const res = await patchDataApi(
        `accountScreenVerify/${auth.user.email}`,
        null,
        auth.token,
      );

      let item = null;
      let text = `Account has been verified. You can now post a new property/chat with other property owners.`;
      dispatch(createNotification({item, auth, text}));

      dispatch({type: 'ALERT', payload: {success: res.data.message}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const getMe = () => async dispatch => {
  const token = await AsyncStorage.getItem('token');

  // await AsyncStorage.clear();

  dispatch({type: 'SPLASH', payload: {loading: true}});
  if (token) {
    try {
      const res = await getDataApi('me', token);
      let fcmToken = await AsyncStorage.getItem('fcmToken');

      if (fcmToken)
        await patchDataApi(`updateFcm/${res.data.user._id}/${fcmToken}`);

      dispatch({
        type: 'AUTH',
        payload: {token: res.data.user.token, user: res.data.user},
      });

      dispatch({type: 'SPLASH', payload: {loading: false}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return err;
    }
  } else {
    dispatch({
      type: 'AUTH',
      payload: {token: null},
    });
    dispatch({type: 'SPLASH', payload: {}});
  }
};

export const logout = auth => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});
    await AsyncStorage.removeItem('token');
    // await AsyncStorage.clear();
    const res = await getDataApi('logout', auth.token);
    dispatch({type: 'AUTH', payload: {token: null}});
    dispatch({
      type: PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS,
      payload: {result: []},
    });

    dispatch({
      type: PROFILE_TYPES.REMOVE_ID,
      payload: [],
    });

    dispatch({type: MESS_TYPE.LOGOUT_CONVERSATIONS, payload: null});
    dispatch({type: NOTIFICATION_TYPES.LOGOUT_NOTIFY, payload: null});
    dispatch({type: FAV_TYPES.LOGOUT, payload: {}});

    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
  }
};

export const confirmEmail = data => async dispatch => {
  try {
    const token = await AsyncStorage.getItem('token');
    dispatch({type: 'ALERT', payload: {loading: true}});

    const res = await postDataApi('verify', data, token);

    dispatch({type: 'ALERT', payload: {success: res.data.message}});
    dispatch({type: TYPES.UPDATE_VERIFICATION, payload: true});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const forgotPassword = data => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});

    const res = await postDataApi('forgotPassword', data);

    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const resetPassword = data => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});
    const {code, password} = data;

    const res = await postDataApi('resetPassword', {
      otp: code,
      newPassword: password,
    });

    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const updateCredits =
  ({currentCredits, toBeUsed, auth}) =>
  async dispatch => {
    const myCredits = parseInt(currentCredits);
    try {
      if (myCredits === 0) {
        // dispatch({type: OUT_OF_CREDITS_MODAL, payload: true})
        throw new Error('You have 0 credits. Please recharge first.');
      }

      let item = null;
      let text = `🚨 Credits deducted 💰${toBeUsed}`;
      dispatch(createNotification({item, auth, text}));

      if (myCredits + toBeUsed >= 0) {
        const credits = myCredits + toBeUsed;
        dispatch({type: TYPES.UPDATE_CREDITS, payload: credits});
        patchDataApi(`update-credits/${credits}`, null, auth.token);
      } else {
        throw new Error('Not Enough Credits. Please recharge first.');
      }
    } catch (err) {
      dispatch({
        type: 'ALERT',
        payload: {error: err.message || err.response.data.message},
      });
      return {error: err.message || err.response.data.message};
    }
  };

export const addCredits =
  ({currentCredits, toBeUsed, auth}) =>
  async dispatch => {
    const myCredits = parseInt(currentCredits);
    try {
      const credits = myCredits + toBeUsed;
      dispatch({type: TYPES.UPDATE_CREDITS, payload: credits});
      patchDataApi(`update-credits/${credits}`, null, auth.token);

      let item = null;
      let text = `✅ Credits added successfully 💰${toBeUsed}`;
      dispatch(createNotification({item, auth, text}));
    } catch (err) {
      dispatch({
        type: 'ALERT',
        payload: {error: err.response.data.message},
      });
      return {error: err.response.data.message};
    }
  };

export const deleteUser = auth => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});
    const res = await deleteDataApi('delete-user', auth.token);
    if (res.data.success) {
      await AsyncStorage.clear();
      dispatch({type: 'AUTH', payload: {token: null}});
      dispatch({
        type: PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS,
        payload: {result: []},
      });

      dispatch({
        type: PROFILE_TYPES.REMOVE_ID,
        payload: [],
      });

      dispatch({type: MESS_TYPE.LOGOUT_CONVERSATIONS, payload: null});
      dispatch({type: NOTIFICATION_TYPES.LOGOUT_NOTIFY, payload: null});
      dispatch({type: FAV_TYPES.LOGOUT, payload: {}});

      dispatch({type: 'ALERT', payload: {success: res.data.message}});
    }
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
  }
};

//reducer

const authReducer = (state = {}, action) => {
  switch (action.type) {
    case TYPES.AUTH:
      return action.payload;

    case TYPES.UPDATE_CREDITS:
      return {
        ...state,
        user: {...state.user, credits: action.payload},
      };

    case TYPES.UPDATE_VERIFICATION:
      return {
        ...state,
        user: {...state.user, verified: action.payload},
      };

    default:
      return state;
  }
};

export default authReducer;
