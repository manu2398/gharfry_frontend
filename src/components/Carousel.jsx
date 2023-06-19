import {
  Alert,
  FlatList,
  Image,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
  Share,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import React, {useRef, useState} from 'react';
import colors from '../theme/colors';
import CardHorizontal from './CardHorizontal';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import Row from './Row';
import {
  deleteProperty,
  republishProperty,
} from '../redux/reducers/propertyReducer';
import {weight} from '../theme/fonts';
import {getProperty} from '../redux/reducers/statusReducer';
import CommonLoader from './CommonLoader';
import {updateCredits} from '../redux/reducers/authReducer';
import BottomSheetModal from './BottomSheet';
import PayBox from './PayBox';
// import dynamicLinks from '@react-native-firebase/dynamic-links';

const Carousel = ({item, cards}) => {
  const {width} = useWindowDimensions();
  const [imageIdx, setImageIdx] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {auth} = useSelector(state => state);

  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };

  const viewabilityConfig = {
    itemVisiblePercentThreshold: 51,
  };

  const onViewableItemsChanged = useRef(({viewableItems}) => {
    if (viewableItems.length > 0) {
      setImageIdx(viewableItems[0].index);
    }
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleDelete = item => {
    Alert.alert('Sold Propety', 'Are you sure, this property is sold?', [
      {
        text: 'Yes',
        onPress: () => {
          dispatch(deleteProperty({item, auth}));
          navigation.goBack();
        },
      },
      {text: 'No'},
    ]);
  };

  const handleRepublish = item => {
    Alert.alert(
      'Republish Property',
      'Republish this property for 💰25 credits now',
      [
        {
          text: 'Yes',
          onPress: async () => {
            const res = await dispatch(
              updateCredits({
                currentCredits: auth.user.credits,
                toBeUsed: -25,
                auth,
              }),
            );

            if (res?.error) {
              handleOpenModal();
              return;
            }
            dispatch(republishProperty({item, auth}));
            navigation.goBack();
          },
        },
        {text: 'No'},
      ],
    );
  };

  // const handleShare = async item => {
  //   try {
  //     const link = await generateDynamicLink(item);
  //     const shareOptions = {
  //       title: 'Gharfry',
  //       message: `Gharfry, Check out this property: ${item.address}\nType: ${
  //         item.propertyType
  //       }\nPrice: ₹${item.rent.toLocaleString('en-IN')}\nUID: ${
  //         item.pid
  //       }\n${link}`,
  //     };

  //     const result = await Share.share(shareOptions);
  //     console.log(result.action); // Check the sharing action (shared, dismissed, etc.)
  //     if (result.activityType) {
  //       console.log(result.activityType); // Check the activity type (Facebook, Twitter, etc.)
  //     }
  //   } catch (error) {
  //     console.log('Error sharing:', error.message);
  //   }
  // };

  // const generateDynamicLink = async item => {
  //   try {
  //     let link = await dynamicLinks().buildShortLink(
  //       {
  //         link: `https://gharfryapp.page.link/Tbeh?id=${item._id}`,
  //         domainUriPrefix: 'https://gharfryapp.page.link',
  //         android: {
  //           packageName: 'com.testapp',
  //         },
  //         navigation: {
  //           forcedRedirectEnabled: true,
  //         },
  //       },
  //       dynamicLinks.ShortLinkType.DEFAULT,
  //     );

  //     return link;
  //   } catch (error) {
  //     console.log('error>>>', error);
  //   }
  // };

  return (
    <View>
      {/* Carousel images */}
      <FlatList
        data={cards ? item : item.images}
        renderItem={({item}) =>
          cards ? (
            <CardHorizontal item={item} />
          ) : (
            <View style={{flex: 1}}>
              {!isImageLoaded && <CommonLoader />}

              <Image
                source={{uri: item.url}}
                style={[
                  {width, aspectRatio: 1},
                  !isImageLoaded && styles.hiddenImage,
                ]}
                onLoad={handleImageLoad}
              />
            </View>
          )
        }
        showsHorizontalScrollIndicator={false}
        horizontal
        pagingEnabled
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged.current}
      />
      <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PayBox />
      </BottomSheetModal>

      {/* Carousel Dots */}
      <View style={styles.dotContainer}>
        {!cards &&
          item.images.map((_, idx) => (
            <View
              key={idx}
              style={[
                styles.dot,
                {
                  backgroundColor:
                    imageIdx === idx ? colors.primary : colors.white,
                },
              ]}
            />
          ))}
      </View>

      {!cards && (
        <Ionicons
          name="arrow-back"
          size={24}
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        />
      )}

      {/* Carousel Icons */}
      {!cards && item.reviewed && (
        <Row style={styles.carouselIconsContainer}>
          {auth.user._id === item.userId?._id && (
            <>
              {item.propertyActive && (
                <Feather
                  name="edit"
                  size={24}
                  color={colors.black}
                  style={styles.carouselIcon}
                  onPress={async () => {
                    await dispatch(
                      getProperty({auth, id: item._id, onEdit: true}),
                    );
                    navigation.navigate('AddPropertyScreen', {onEdit: true});
                  }}
                />
              )}
              {!item.propertyActive ? (
                <Pressable onPress={() => handleRepublish(item)}>
                  <View style={[styles.carouselIcon, styles.republishButton]}>
                    <Text style={styles.carouselIconText}>REPUBLISH</Text>
                  </View>
                </Pressable>
              ) : (
                <Pressable onPress={() => handleDelete(item)}>
                  <View style={[styles.carouselIcon, styles.soldButton]}>
                    <Text style={styles.carouselIconText}>SOLD</Text>
                  </View>
                </Pressable>
              )}
            </>
          )}
          {item.propertyActive && (
            <Feather
              name="share"
              size={24}
              color={colors.black}
              style={styles.carouselIcon}
              onPress={() => {}}
            />
          )}
        </Row>
      )}
      {/* Carousel Icons */}

      {!cards && (
        <View style={styles.pidContainer}>
          <Text style={styles.pidText}>PID: {item.pid}</Text>
        </View>
      )}
    </View>
  );
};

export default Carousel;

const styles = StyleSheet.create({
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 5,
    margin: 10,
    marginHorizontal: 2,
    opacity: 0.8,
  },
  backButton: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'white',
    color: 'black',
    borderRadius: 20,
    padding: 4,
    elevation: 4,
  },
  shareButton: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 4,
    elevation: 4,
    marginRight: 5,
  },
  pidContainer: {
    position: 'absolute',
    bottom: 0,
    right: 5,
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: 5,
  },
  pidText: {fontWeight: weight.bold, color: colors.white},
  soldButton: {
    borderWidth: 0.5,
    borderColor: 'white',
    borderRadius: 3,
    marginRight: 5,
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
    padding: 7,
  },
  textSold: {
    color: 'white',
    fontWeight: weight.bold,
  },
  carouselIconsContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  carouselIcon: {
    backgroundColor: colors.white,
    borderRadius: 20,
    padding: 4,
    elevation: 4,
    marginRight: 5,
  },
  soldButton: {
    backgroundColor: 'rgba(255, 99, 71, 0.8)',
    borderWidth: 0.5,
    borderColor: colors.white,
    padding: 7,
  },
  republishButton: {
    backgroundColor: 'rgba(34, 139, 34, 0.7)',
    borderWidth: 0.5,
    borderColor: colors.white,
    padding: 7,
  },
  carouselIconText: {
    color: colors.white,
    fontWeight: weight.bold,
  },
  hiddenImage: {
    opacity: 0, // Hide the image until it is loaded
  },
});
