import {Dimensions, Platform} from 'react-native';

const LIST_MARGIN = 10;
const width = Dimensions.get('screen').width - LIST_MARGIN * 2;

const baseHeight = 135;
const iosNotch = 50;
const iosHeight = baseHeight + iosNotch;

let androidNotch = 20;
// if (StatusBar.currentHeight) androidNotch = StatusBar.currentHeight;

const androidHeight = baseHeight + androidNotch;
const HEADER_HEIGHT = Platform.OS === 'ios' ? iosHeight : androidHeight;

// const endPoint = 'http://192.168.29.215:9000';
// const endPoint = 'http://10.0.2.2:9000';
// const endPoint = 'https://gharfry-backend.vercel.app';
const endPoint = 'https://gharfry-web-service.onrender.com';

export {width, LIST_MARGIN, HEADER_HEIGHT, endPoint};
