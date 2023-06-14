import {getDataApi} from '../../utils/fetchData';
import {PROPERTY_TYPES} from './propertyReducer';

//TYPES
const RECENT_TYPES = {
  RECENT_ALERT: 'RECENT_ALERT',
  RECENT_PROPS: 'RECENT_PROPS',
};

//ACTION
export const getRecentProps =
  ({auth, latitude, longitude}) =>
  async dispatch => {
    try {
      dispatch({
        type: RECENT_TYPES.RECENT_ALERT,
        payload: {loading: true},
      });
      const res = await getDataApi(
        `recently-added/${latitude}/${longitude}`,
        auth.token,
      );
      dispatch({
        type: RECENT_TYPES.RECENT_PROPS,
        payload: res.data.properties,
      });
      dispatch({
        type: RECENT_TYPES.RECENT_ALERT,
        payload: {loading: false},
      });
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

// REDUCER

const initialState = {
  loading: false,
  recentProperties: [],
};
const recentPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case RECENT_TYPES.RECENT_ALERT:
      return {...state, loading: action.payload.loading};

    case RECENT_TYPES.RECENT_PROPS:
      return {
        ...state,
        recentProperties: action.payload,
      };

    case PROPERTY_TYPES.UPDATE_POST:
      return {
        ...state,
        recentProperties: state.recentProperties.map(post =>
          post._id === action.payload._id ? action.payload : post,
        ),
      };

    default:
      return state;
  }
};

export default recentPostsReducer;
