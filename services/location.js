import axios from 'axios';
import {endPoint} from '../src/constants';

export const getSuggestedLocations = async text => {
  try {
    const {data} = await axios.get(`${endPoint}/api/places/${text}`);
    if (data) return data;
    return [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getGeometry = async placeId => {
  try {
    const {data} = await axios.get(`${endPoint}/api/geometry/${placeId}`);
    if (data) return data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getItParks = async city => {
  try {
    const {data} = await axios.get(`${endPoint}/api/itParks/${city}`);
    if (data) return data;
    return null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getHospitals = async ({latitude, longitude}) => {
  try {
    const res = await axios.get(
      `${endPoint}/api/nearbyHospitals/${latitude}/${longitude}`,
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSchools = async ({latitude, longitude}) => {
  try {
    const res = await axios.get(
      `${endPoint}/api/nearbySchools/${latitude}/${longitude}`,
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getMalls = async ({latitude, longitude}) => {
  try {
    const res = await axios.get(
      `${endPoint}/api/nearbyMalls/${latitude}/${longitude}`,
    );

    return res.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
