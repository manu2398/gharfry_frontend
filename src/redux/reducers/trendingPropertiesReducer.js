import {getDataApi} from '../../utils/fetchData';
import {PROPERTY_TYPES} from './propertyReducer';

//TYPES
const TRENDING_TYPES = {
  TRENDING_ALERT: 'TRENDING_ALERT',
  TRENDING_PROPS: 'TRENDING_PROPS',
};

//ACTION
export const getTrendingProps =
  ({auth, latitude, longitude}) =>
  async dispatch => {
    try {
      dispatch({
        type: TRENDING_TYPES.TRENDING_ALERT,
        payload: {loading: true},
      });
      const res = await getDataApi(
        `trending/${latitude}/${longitude}`,
        auth.token,
      );
      dispatch({
        type: TRENDING_TYPES.TRENDING_PROPS,
        payload: res.data.properties,
      });
      dispatch({
        type: TRENDING_TYPES.TRENDING_ALERT,
        payload: {loading: false},
      });
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

// REDUCER

const initialState = {
  loading: false,
  trendingProperties: [],
};
const trendingPostsReducer = (state = initialState, action) => {
  switch (action.type) {
    case TRENDING_TYPES.TRENDING_ALERT:
      return {...state, loading: action.payload.loading};

    case TRENDING_TYPES.TRENDING_PROPS:
      return {
        ...state,
        trendingProperties: action.payload,
      };

    case PROPERTY_TYPES.UPDATE_POST:
      return {
        ...state,
        trendingProperties: state.trendingProperties.map(post =>
          post._id === action.payload._id ? action.payload : post,
        ),
      };

    default:
      return state;
  }
};

export default trendingPostsReducer;
