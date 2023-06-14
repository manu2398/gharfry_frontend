import {Image, Pressable, StyleSheet, Text, Dimensions} from 'react-native';
import React, {useState} from 'react';
import Row from './Row';
import CardUpper from './CardUpper';
import {useNavigation} from '@react-navigation/native';
import CommonLoader from './CommonLoader';
import {useTheme} from '../context/ThemeProvider';

const {width} = Dimensions.get('window');

const CardHorizontal = ({item, style, fromIT}) => {
  const {theme} = useTheme();

  const [isImageLoaded, setIsImageLoaded] = useState(false);
  if (!item) return; // added as the item was still present on the map after deletion

  const navigation = useNavigation();

  const handleNavigate = () => {
    if (item?.boundingBox) return;

    navigation.push('PropertyDetailScreen', {id: item._id});
  };

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  return (
    <Pressable onPress={handleNavigate}>
      <Row style={[styles.container, style]}>
        {(item?.image || item.images[0].url) && (
          <>
            {!isImageLoaded && <CommonLoader />}

            <Image
              source={{uri: fromIT ? item.image : item.images[0].url}}
              style={[styles.image, !isImageLoaded && styles.hiddenImage]}
              resizeMode="cover"
              onLoad={handleImageLoad}
            />
          </>
        )}

        {fromIT ? (
          <CardUpper
            description={item.description}
            style={[
              styles.horizontalContainer,
              {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          />
        ) : (
          <CardUpper
            item={item}
            style={[
              styles.horizontalContainer,
              {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              },
            ]}
          />
        )}
      </Row>
    </Pressable>
  );
};

export default CardHorizontal;

const styles = StyleSheet.create({
  container: {
    borderRadius: 5,
    width,
    paddingHorizontal: 10,
    zIndex: 10,
  },
  horizontalContainer: {
    flex: 1,
    padding: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderLeftWidth: 0,
    overflow: 'hidden',
    height: 97,
  },
  image: {
    width: 97,
    aspectRatio: 1,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5,
    overflow: 'hidden',
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
});
