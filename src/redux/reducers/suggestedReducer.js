import {getDataApi} from '../../utils/fetchData';
import {PROPERTY_TYPES} from './propertyReducer';

//TYPES
const SUGGEST_TYPES = {
  SUGGESTED_ALERT: 'SUGGESTED_ALERT',
  SUGGESTED_PROPS: 'SUGGESTED_PROPS',
};

//ACTION
export const getSuggestedProp =
  ({auth, id}) =>
  async dispatch => {
    try {
      dispatch({
        type: SUGGEST_TYPES.SUGGESTED_ALERT,
        payload: {loading: true},
      });
      const res = await getDataApi(`suggested-property/${id}`, auth.token);
      dispatch({
        type: SUGGEST_TYPES.SUGGESTED_PROPS,
        payload: res.data.suggestedProperties,
      });
      dispatch({
        type: SUGGEST_TYPES.SUGGESTED_ALERT,
        payload: {loading: false},
      });
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

// REDUCER

const initialState = {
  loading: false,
  suggestedProperties: [],
};
export const suggestedPostReducer = (state = initialState, action) => {
  switch (action.type) {
    case SUGGEST_TYPES.SUGGESTED_ALERT:
      return {...state, loading: action.payload.loading};

    case SUGGEST_TYPES.SUGGESTED_PROPS:
      return {
        ...state,
        suggestedProperties: action.payload,
      };

    case PROPERTY_TYPES.UPDATE_POST:
      return {
        ...state,
        suggestedProperties: state.suggestedProperties.map(post =>
          post._id === action.payload._id ? action.payload : post,
        ),
      };

    default:
      return state;
  }
};

export default suggestedPostReducer;
