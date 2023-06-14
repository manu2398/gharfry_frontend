import {getDataApi} from '../../utils/fetchData';

// TYPES
export const TYPES = {
  STATUS: 'STATUS',
};

export const getProperty =
  ({auth, id, onEdit}) =>
  async dispatch => {
    try {
      dispatch({type: 'ALERT', payload: {loading: true}});
      const res = await getDataApi(`get-single-property/${id}`, auth.token);
      dispatch({type: TYPES.STATUS, payload: {...res.data.property, onEdit}});
      dispatch({type: 'ALERT', payload: {}});
    } catch (err) {
      dispatch({
        type: 'ALERT',
        payload: {error: err.response.data.message},
      });
      return {error: err.response.data.message};
    }
  };

const statusReducer = (state = {}, action) => {
  switch (action.type) {
    case 'STATUS':
      return action.payload;

    default:
      return state;
  }
};

export default statusReducer;
