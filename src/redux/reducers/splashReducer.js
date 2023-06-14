// TYPES
export const TYPES = {
  SPLASH: 'SPLASH',
};
//reducer
const initialState = {};

const splashReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPES.SPLASH:
      return action.payload;

    default:
      return state;
  }
};

export default splashReducer;
