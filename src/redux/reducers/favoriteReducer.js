import {getDataApi} from '../../utils/fetchData';

//TYPES
export const FAV_TYPES = {
  FAV_LOADING: 'FAV_LOADING',
  GET_FAV: 'GET_FAV',
  UPDATE_FAV: 'UPDATE_FAV',
  ADD: 'ADD',
  PAGINATION: 'PAGINATION',
  LOGOUT: 'LOGOUT',
  UPDATE_COUNT: 'UPDATE_COUNT',
};

//ACTION
export const getFav =
  ({auth}) =>
  async dispatch => {
    try {
      dispatch({type: FAV_TYPES.FAV_LOADING, payload: {loading: true}});

      const res = await getDataApi('savedPosts', auth.token);
      dispatch({
        type: FAV_TYPES.GET_FAV,
        payload: res.data,
      });
      dispatch({type: FAV_TYPES.FAV_LOADING, payload: {loading: false}});
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

// REDUCER

const initialState = {
  loading: false,
  firstLoad: false,
  fav: [],
  page: 2,
  count: 0,
  total: 0,
};
const savedPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case FAV_TYPES.GET_FAV:
      return {
        ...state,
        fav: action.payload.savedPosts,
        count: action.payload.count,
        total: action.payload.total,
        firstLoad: true,
        page: 2,
      };

    case FAV_TYPES.FAV_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };

    case FAV_TYPES.UPDATE_FAV:
      return {
        ...state,
        fav: [...state.fav].filter(item => item._id !== action.payload._id),
      };

    case FAV_TYPES.ADD:
      return {
        ...state,
        fav: [...action.payload, ...state.fav],
      };

    case FAV_TYPES.PAGINATION:
      return {
        ...state,
        fav: [...state.fav, ...action.payload.savedPosts],
        total: action.payload.total,
        count: action.payload.count,
        page: state.page + 1,
      };

    case FAV_TYPES.LOGOUT:
      return {
        ...state,
        fav: [],
        page: 2,
        count: 0,
        total: 0,
        firstLoad: false,
      };

    case FAV_TYPES.UPDATE_COUNT:
      return {
        ...state,
        count: state.count + action.paylaod,
      };

    default:
      return state;
  }
};

export default savedPostReducer;
