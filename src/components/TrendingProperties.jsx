import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import Card from './Card';
import {size, weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from './Row';
import CommonLoader from './CommonLoader';
import {useLocationContext} from '../context/CurrentLocationContext';
import {useDispatch, useSelector} from 'react-redux';
import {getTrendingProps} from '../redux/reducers/trendingPropertiesReducer';

const data = [
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de76111550a05fd9aa17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de76111550a05fd59a17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de76111550a05fd5a17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de76111550a059aa17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de7611550a05fd59aa17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de7550a05fd59aa17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '67de76111550a05fd59aa17',
  },
  {
    address: 'Sample Address ',
    amenities: [
      {key: 1, value: 'AC', selected: false},
      {key: 2, value: 'Fridge', selected: false},
      {key: 3, value: 'Cooler', selected: true},
      {key: 4, value: 'W. Machine', selected: false},
      {key: 5, value: 'Food', selected: false},
      {key: 6, value: 'WiFi', selected: true},
      {key: 7, value: 'Geyser', selected: false},
      {key: 8, value: 'Almirah', selected: true},
      {key: 9, value: 'Table & Chair', selected: true},
      {key: 10, value: 'Parking', selected: false},
      {key: 11, value: 'TV', selected: true},
      {key: 12, value: 'Housekeeping', selected: false},
      {key: 13, value: 'Power backup', selected: true},
      {key: 14, value: 'CCTV', selected: false},
      {key: 15, value: 'RO Water', selected: true},
    ],
    geometry: {
      type: 'Point',
      coordinates: [76.71686050901663, 30.72421506389128],
    },
    latitude: 30.72421506389128,
    longitude: 76.71686050901663,
    images: [
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe19y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512725/letsrentz/meopl3f5x2b6oncsu4qv.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe12y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512491/letsrentz/bfbvuxisipn9f8syztoj.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe17y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685511971/letsrentz/zzkqjsxldp1biidliv7i.jpg',
      },
      {
        public_id: 'letsrentz/tbpgyd18bpsb2bpxe14y',
        url: 'https://res.cloudinary.com/dmiu93fth/image/upload/v1685512566/letsrentz/vzcujcvualebxlqhsp02.jpg',
      },
    ],
    sqft: 1005,
    sharingType: 'Single Sharing',
    furnishing: 'Semi-Furnished',
    rent: 51321329,
    beds: '3',
    pid: '1210553',
    baths: '3',
    description: 'Sample Description',
    propertyActive: true,
    role: 'Broker',
    floor: '3',
    tenantType: 'For Family only',
    propertyType: 'For Sale-Flat',
    commercial: 'Showroom',
    userId: '646a49e162d98dd01a32ce72',
    views: [
      53, 38, 47, 93, 3, 27, 30, 57, 23, 1, 34, 87, 93, 50, 59, 16, 89, 7, 56,
      81, 91, 94, 22, 26, 33, 68, 52, 78, 30, 90, 46, 96, 60, 99, 40, 65, 85,
      19, 71, 50, 4, 97, 26, 16, 59, 89, 4, 74, 91, 82, 42, 3, 86, 6, 52, 81,
      93, 48, 11, 30, 39, 13, 25, 14, 35, 98, 77, 59, 74, 19, 57, 55, 64, 56, 3,
      92, 35, 19, 47, 27, 46,
    ],
    likes: [
      56, 40, 53, 28, 58, 94, 78, 27, 55, 7, 59, 33, 6, 8, 31, 97, 46, 79, 79,
      55, 66, 98, 83, 76, 61, 58, 49, 84, 49, 70, 5, 70, 54, 31, 68, 97, 18, 43,
      14, 29, 70, 87, 63, 84, 54, 18, 67, 3, 36, 20, 27, 21, 66, 5, 92, 60, 49,
      7, 81, 58, 84, 93, 17, 45, 12, 67, 81, 37,
    ],
    trending: false,
    createdAt: '1980-06-04T04:17:38.381Z',
    _id: '647de761150a05fd59aa17',
  },
];

const TrendingProperties = () => {
  const {theme} = useTheme();

  const dispatch = useDispatch();
  const {location} = useLocationContext();
  const {auth, trendingProps} = useSelector(state => state);

  useEffect(() => {
    dispatch(
      getTrendingProps({
        auth,
        latitude: location?.coords?.latitude,
        longitude: location?.coords?.longitude,
      }),
    );
  }, [location]);
  return (
    <View>
      <Row>
        <MaterialCommunityIcons
          name="trending-up"
          size={24}
          style={{color: theme.info, marginTop: 25}}
        />
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Most Viewed {!location || location === 'notGranted' ? `` : `near you`}
        </Text>
      </Row>
      {trendingProps.loading ? (
        <CommonLoader />
      ) : trendingProps.trendingProperties.length > 0 ? (
        <ScrollView horizontal>
          {trendingProps.trendingProperties.map(item => (
            <View key={item._id} style={{flex: 1, marginRight: 34}}>
              <Card item={item} widthOfCard={280} height={120} />
            </View>
          ))}
        </ScrollView>
      ) : (
        <Text style={{color: theme.secondaryTextColor}}>
          No Properties found!
        </Text>
      )}
    </View>
  );
};

export default TrendingProperties;

const styles = StyleSheet.create({
  heading: {
    fontSize: size.md,
    fontWeight: weight.bold,
    marginTop: 30,
    marginBottom: 5,
    marginLeft: 5,
  },
});
