import {getDataApi, postDataApi, patchDataApi} from '../../utils/fetchData';
import {imageUpload} from '../../utils/imageUpload';
import {TYPES} from './authReducer';
import {FAV_TYPES} from './favoriteReducer';
import {createNotification} from './notificationReducer';
import {PROFILE_TYPES} from './profileReducer';

// TYPES
export const PROPERTY_TYPES = {
  CREATE_POST: 'CREATE_POST',
  GET_PROPERTY_IN_RADIUS: 'GET_PROPERTY_IN_RADIUS',
  GET_PROPERTY_IN_RADIUS_UPDATE: 'GET_PROPERTY_IN_RADIUS_UPDATE',
  GET_POST: 'GET_POST',
  UPDATE_POST: 'UPDATE_POST',
  REMOVE_POST: 'REMOVE_POST',
};

//actions
export const createPost = (data, auth) => async dispatch => {
  try {
    let media = [];
    dispatch({type: 'ALERT', payload: {loading: true}});
    const newData = {
      ...data,
      latitude: data.geometry.latitude,
      longitude: data.geometry.longitude,
    };

    media = await imageUpload(data.images);

    const res = await postDataApi(
      'create-property',
      {...newData, images: media},
      auth.token,
    );
    dispatch({
      type: PROFILE_TYPES.ADD_PROFILE_PROPERTY,
      payload: res.data.property,
    });

    let text = 'Your property is now live';

    const item = res.data.property;

    dispatch(createNotification({item, auth, text}));
    dispatch({type: 'ALERT', payload: {success: res.data.message}});
  } catch (err) {
    console.log(err);
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const getPropertyInRadius = (data, auth) => async dispatch => {
  try {
    dispatch({type: 'ALERT', payload: {loading: true}});

    const res = await getDataApi(
      `get-property-in-radius/${data.distance}/${data.latitude}/${data.longitude}`,
      auth.token,
    );

    dispatch({
      type: PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS,
      payload: {...res.data, page: 2},
    });
    dispatch({type: 'ALERT', payload: {}});
  } catch (err) {
    dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    return {error: err.response.data.message};
  }
};

export const getPropertyDetails =
  ({detailPost, id, auth}) =>
  async dispatch => {
    if (detailPost.every(post => post._id !== id)) {
      try {
        dispatch({type: 'ALERT', payload: {loading: true}});
        const res = await getDataApi(`get-single-property/${id}`, auth.token);
        dispatch({type: PROPERTY_TYPES.GET_POST, payload: res.data.property});
        dispatch({type: 'ALERT', payload: {}});
      } catch (err) {
        dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
        return {error: err.response.data.message};
      }
    }
  };

export const updatePost =
  ({values, auth, status}) =>
  async dispatch => {
    try {
      let media = [];

      dispatch({type: 'ALERT', payload: {loading: true}});
      const newData = {
        ...values,
        latitude: values.geometry.latitude,
        longitude: values.geometry.longitude,
      };

      const imageNewUrl = newData.images.filter(img => !img.url);
      const imageOldUrl = newData.images.filter(img => img.url);

      if (imageNewUrl.length > 0) {
        media = await imageUpload(imageNewUrl);
      }

      const res = await patchDataApi(
        `update-property/${status._id}`,
        {...newData, images: [...imageOldUrl, ...media]},
        auth.token,
      );

      dispatch({
        type: PROPERTY_TYPES.UPDATE_POST,
        payload: res.data.newPost,
      });
      dispatch({type: 'ALERT', payload: {success: res.data.message}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const likeProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newData = {...item, likes: [...item.likes, auth.user._id]};
      dispatch({
        type: PROPERTY_TYPES.UPDATE_POST,
        payload: newData,
      });

      dispatch({
        type: FAV_TYPES.ADD,
        payload: [newData],
      });

      await patchDataApi(
        `update-property/${item._id}`,
        {...newData},
        auth.token,
      );
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const unlikeProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newData = {
        ...item,
        likes: item.likes.filter(id => id !== auth.user._id),
      };

      console.log(newData);
      dispatch({
        type: PROPERTY_TYPES.UPDATE_POST,
        payload: newData,
      });
      await patchDataApi(
        `update-property/${item._id}`,
        {...newData},
        auth.token,
      );
    } catch (err) {
      console.log(err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

// export const deleteProperty =
//   ({item, auth}) =>
//   async dispatch => {
//     try {
//       dispatch({type: 'ALERT', payload: {loading: true}});
//       // dispatch({
//       //   type: PROPERTY_TYPES.REMOVE_POST,
//       //   payload: item,
//       // });

//       // dispatch({
//       //   type: PROFILE_TYPES.REMOVE_PROFILE_PROPERTY,
//       //   payload: item,
//       // });

//       const res = await patchDataApi(
//         `delete-property/${item._id}`,
//         null,
//         auth.token,
//       );
//       dispatch({type: 'ALERT', payload: {success: res.data.message}});
//     } catch (err) {
//       dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
//       return {error: err.response.data.message};
//     }
//   }

export const deleteProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newData = {
        ...item,
        propertyActive: false,
      };
      dispatch({
        type: PROPERTY_TYPES.UPDATE_POST,
        payload: newData,
      });

      dispatch({
        type: PROPERTY_TYPES.REMOVE_POST,
        payload: item,
      });

      const res = await patchDataApi(
        `update-property/${item._id}`,
        {...newData},
        auth.token,
      );

      let text = 'Property has been marked as sold';

      dispatch(createNotification({item, auth, text}));
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const republishProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newData = {
        ...item,
        propertyActive: true,
        createdAt: new Date(),
        likes: [],
        views: [],
      };
      dispatch({
        type: PROPERTY_TYPES.UPDATE_POST,
        payload: newData,
      });

      let text = 'Property has been republished';

      dispatch(createNotification({item, auth, text}));

      await patchDataApi(
        `update-property/${item._id}`,
        {...newData},
        auth.token,
      );
    } catch (err) {
      console.log('raaan', err);
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const saveProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newSavedUser = {
        ...auth.user,
        saved: [...auth.user.saved, item._id],
      };
      dispatch({
        type: TYPES.AUTH,
        payload: {...auth, user: newSavedUser},
      });

      await patchDataApi(`save-post/${item._id}`, null, auth.token);
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const unSaveProperty =
  ({item, auth}) =>
  async dispatch => {
    try {
      const newSavedUser = {
        ...auth.user,
        saved: [...auth.user.saved].filter(id => id !== item._id),
      };
      dispatch({
        type: TYPES.AUTH,
        payload: {...auth, user: newSavedUser},
      });

      dispatch({
        type: FAV_TYPES.UPDATE_FAV,
        payload: item,
      });
      // dispatch({type: FAV_TYPES.UPDATE_COUNT, payload: -1});
      await patchDataApi(`unsave-post/${item._id}`, null, auth.token);
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

export const addToViews =
  ({auth, id}) =>
  async dispatch => {
    try {
      await patchDataApi(`addView/${id}`, null, auth.token);
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
      return {error: err.response.data.message};
    }
  };

//reducer

const initialState = {
  properties: [],
  total: 0,
  page: 2,
  count: 0,
  firstLoad: false,
  loading: false,
};

export default propertyReducer = (state = initialState, action) => {
  switch (action.type) {
    case PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS:
      return {
        ...state,
        properties: action.payload.result,
        total: action.payload.total,
        count: action.payload.count,
        firstLoad: true,
        page: 2,
      };

    case PROPERTY_TYPES.GET_PROPERTY_IN_RADIUS_UPDATE:
      return {
        ...state,
        properties: [...state.properties, ...action.payload.result],
        total: action.payload.total,
        count: action.payload.count,
        page: state.page + 1,
      };
    case PROPERTY_TYPES.UPDATE_POST:
      return {
        ...state,
        properties: state.properties.map(post =>
          post._id === action.payload._id ? action.payload : post,
        ),
      };
    case PROPERTY_TYPES.REMOVE_POST:
      return {
        ...state,
        properties: state.properties.filter(
          post => post._id !== action.payload._id,
        ),
      };

    default:
      return state;
  }
};
