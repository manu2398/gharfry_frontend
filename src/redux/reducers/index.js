import {combineReducers} from 'redux';
import alertReducer from './alertReducer';
import authReducer from './authReducer';
import detailPostReducer from './detailPostReducer';
import profileReducer from './profileReducer';
import propertyReducer from './propertyReducer';
import statusReducer from './statusReducer';
import suggestedPostReducer from './suggestedReducer';
import socketReducer from './socketReduces';
import messageReducer from './messageReducer';
import filterReducer from './filterReducer';
import splashReducer from './splashReducer';
import savedPostReducer from './favoriteReducer';
import recentPostsReducer from './recentlyAddedReducer';
import trendingPostsReducer from './trendingPropertiesReducer';
import notificationReducer from './notificationReducer';
import getNearestReducer from './getNearestReducer';

export default combineReducers({
  alert: alertReducer,
  auth: authReducer,
  profile: profileReducer,
  properties: propertyReducer,
  detailPost: detailPostReducer,
  status: statusReducer,
  suggestedPosts: suggestedPostReducer,
  socket: socketReducer,
  message: messageReducer,
  filter: filterReducer,
  splash: splashReducer,
  fav: savedPostReducer,
  recentProps: recentPostsReducer,
  trendingProps: trendingPostsReducer,
  notify: notificationReducer,
  getNearest: getNearestReducer,
});
