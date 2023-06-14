// TYPES
export const TYPES = {
  ADDFILTER: 'ADDFILTER',
  UPDATE: 'UPDATE',
  CLEAR: 'CLEAR',
};

export const addFilter = item => dispatch => {
  dispatch({type: TYPES.ADDFILTER, payload: item});
};

export const updateFilter = item => dispatch => {
  dispatch({type: TYPES.UPDATE, payload: item});
};

const initialState = {};

const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.ADDFILTER:
      return action.payload;

    case TYPES.UPDATE:
      return {...state, ...action.payload};

    case TYPES.CLEAR:
      return action.payload;

    default:
      return state;
  }
};

export default filterReducer;
