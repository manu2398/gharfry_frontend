import {getHospitals, getSchools} from '../../../services/location';
import {getDataApi} from '../../utils/fetchData';
import {PROPERTY_TYPES} from './propertyReducer';

//TYPES
const NEAREST_TYPES = {
  NEAREST_ALERT: 'NEAREST_ALERT',
  NEAREST_HOSPITALS: 'NEAREST_HOSPITALS',
  NEAREST_SCHOOLS: 'NEAREST_SCHOOLS',
  NEAREST_MALLS: 'NEAREST_MALLS',
};

//ACTION
export const getNearest =
  ({latitude, longitude}) =>
  async dispatch => {
    try {
      dispatch({
        type: NEAREST_TYPES.NEAREST_ALERT,
        payload: {loading: true},
      });
      const hospitals = await getHospitals({latitude, longitude});
      const schools = await getSchools({latitude, longitude});
      //   const malls = await getMalls({latitude, longitude});

      dispatch({
        type: NEAREST_TYPES.NEAREST_HOSPITALS,
        payload: hospitals,
      });

      dispatch({
        type: NEAREST_TYPES.NEAREST_SCHOOLS,
        payload: schools,
      });

      //   dispatch({
      //     type: NEAREST_TYPES.NEAREST_MALLS,
      //     payload: malls,
      //   });
      dispatch({
        type: NEAREST_TYPES.NEAREST_ALERT,
        payload: {loading: false},
      });
    } catch (err) {
      dispatch({type: 'ALERT', payload: {error: err.response.data.message}});
    }
  };

// REDUCER

const initialState = {
  loading: false,
  nearestHospitals: [],
  nearestSchools: [],
  nearestMalls: [],
};
const getNearestReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEAREST_TYPES.NEAREST_ALERT:
      return {...state, loading: action.payload.loading};

    case NEAREST_TYPES.NEAREST_HOSPITALS:
      return {
        ...state,
        nearestHospitals: action.payload,
      };

    case NEAREST_TYPES.NEAREST_SCHOOLS:
      return {
        ...state,
        nearestSchools: action.payload,
      };

    // case NEAREST_TYPES.NEAREST_MALLS:
    //   return {
    //     ...state,
    //     nearestMalls: action.payload,
    //   };

    default:
      return state;
  }
};

export default getNearestReducer;
