import React, {useState} from 'react';
import {Text, View, Image, StyleSheet, Pressable} from 'react-native';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import {width} from '../constants';
import CardHomeInfo from './CardHomeInfo';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeProvider';

const Card = ({item, widthOfCard = width, height = 200}) => {
  const {theme} = useTheme();
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isImageError, setIsImageError] = useState(false);
  const navigation = useNavigation();
  const handleNavigate = () => {
    navigation.navigate('PropertyDetailScreen', {id: item._id});
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const handleImageError = () => {
    setIsImageError(true);
  };

  return (
    <Pressable
      style={[
        styles.root,
        {
          shadowColor: theme.secondaryTextColor,
          backgroundColor: theme.backgroundColor,
        },
      ]}
      onPress={handleNavigate}>
      {/* {!isImageLoaded && !isImageError && <CommonLoader />} */}
      {/* Show loading indicator */}
      {!isImageError && (
        <Image
          source={{uri: item.images[0].url}}
          style={[
            styles.image,
            {height},
            {width: widthOfCard},
            !isImageLoaded && styles.hiddenImage,
            {backgroundColor: theme.secondaryColor},
          ]}
          resizeMode="cover"
          onLoad={handleImageLoad}
          onError={handleImageError}
        />
      )}
      <View style={styles.onlyForBox}>
        <Text style={{color: colors.white, fontWeight: weight.bold}}>
          {item.propertyType}
        </Text>
      </View>
      <CardHomeInfo item={item} width={widthOfCard} />
    </Pressable>
  );
};

export default Card;

const styles = StyleSheet.create({
  root: {
    marginVertical: 12,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
  onlyForBox: {
    position: 'absolute',
    left: 5,
    top: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: colors.primary,
    // borderTopLeftRadius: 10,
    // borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    elevation: 3,
    zIndex: 2,
  },
});
