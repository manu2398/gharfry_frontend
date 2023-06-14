import {PROPERTY_TYPES} from './propertyReducer';

const detailPostReducer = (state = [], action) => {
  switch (action.type) {
    case PROPERTY_TYPES.GET_POST:
      return [...state, action.payload];

    case PROPERTY_TYPES.UPDATE_POST:
      return state.map(post =>
        post._id === action.payload._id ? action.payload : post,
      );

    default:
      return state;
  }
};

export default detailPostReducer;
