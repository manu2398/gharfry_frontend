import React, {useState, useEffect} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {size, weight} from '../theme/fonts';
import colors from '../theme/colors';
import Row from './Row';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {useDispatch, useSelector} from 'react-redux';
import {
  likeProperty,
  saveProperty,
  unSaveProperty,
  unlikeProperty,
} from '../redux/reducers/propertyReducer';
import ViewProperties from './ViewProperties';
import {useTheme} from '../context/ThemeProvider';

const handleLike = async (item, auth, dispatch) => {
  dispatch(likeProperty({item, auth}));
  dispatch(saveProperty({item, auth}));
  dispatch({type: 'ALERT', payload: {success: 'Saved'}});
};

const handleUnlike = async (item, auth, dispatch) => {
  dispatch(unlikeProperty({item, auth}));
  dispatch(unSaveProperty({item, auth}));
};

const CardUpper = React.memo(({item, description, style}) => {
  const {theme} = useTheme();
  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);

  const [like, setLike] = useState(false);
  const [load, setLoad] = useState(false);

  useEffect(() => {
    if (item?.likes.find(id => id === auth.user._id)) {
      setLike(true);
    } else {
      setLike(false);
    }
  }, [item?.likes, auth.user._id]);

  return description ? (
    <Row
      style={[
        styles.container,
        style,
        {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
        },
      ]}>
      <Ionicons
        name="location-outline"
        size={23}
        style={[styles.icon, {color: theme.secondaryTextColor}]}
      />
      <Text
        style={[styles.descriptionText, {color: theme.secondaryTextColor}]}
        numberOfLines={1}>
        {description}
      </Text>
    </Row>
  ) : (
    <View style={[style]}>
      <Row style={styles.priceRow}>
        <Row>
          <Text style={[styles.priceText, {color: theme.primaryTextColor}]}>
            ₹{item.rent.toLocaleString('en-IN')}
            <Text style={[styles.subText, {color: theme.primaryTextColor}]}>
              {item.propertyType?.includes('Rent') ||
              item.propertyType?.includes('PG')
                ? '/month'
                : ''}
            </Text>
          </Text>

          <Text
            style={[
              styles.statusText,
              {color: item.propertyActive ? theme.activeGreen : colors.accent},
            ]}>
            {item.propertyActive ? 'Active' : 'Sold'}
          </Text>
          <ViewProperties
            views={item.views}
            trending={item.trending}
            textColor={theme.secondaryTextColor}
            color={theme.info}
          />
        </Row>
        {auth.user._id === item.userId?._id ? null : like ? (
          <Pressable
            onPress={() => handleUnlike(item, auth, dispatch)}
            style={{
              padding: 6,
              backgroundColor: theme.secondaryColor,
              borderColor: theme.borderColor,
              borderWidth: 0.5,
              borderRadius: 20,
            }}>
            <AntDesign name={'heart'} size={16} color={colors.primary} />
          </Pressable>
        ) : (
          <Pressable
            onPress={() => handleLike(item, auth, dispatch)}
            style={{
              padding: 6,
              backgroundColor: theme.secondaryColor,
              borderColor: theme.borderColor,
              borderWidth: 0.5,
              borderRadius: 20,
            }}>
            <AntDesign name={'hearto'} size={16} color={colors.primary} />
          </Pressable>
        )}
      </Row>
      <Row style={{justifyContent: 'space-between'}}>
        {item.propertyType !== 'PG' ? (
          <Text style={[styles.roomType, {color: theme.info}]}>
            Posted by {item.role}
          </Text>
        ) : (
          <Text style={[styles.roomType, {color: theme.info}]}>
            {item.tenantType}
          </Text>
        )}
        <Row>
          {item?.beds && (
            <Row>
              <Text style={{color: theme.secondaryTextColor}}>{item.beds}</Text>
              <MaterialCommunityIcons
                name="bed-single-outline"
                size={20}
                style={[styles.icon, {color: theme.info}]}
              />
            </Row>
          )}
          {item?.baths && (
            <Row>
              <Text style={{color: theme.secondaryTextColor}}>
                {item.baths}
              </Text>
              <MaterialCommunityIcons
                name="bathtub-outline"
                size={18}
                style={{color: theme.info, marginBottom: 3}}
              />
            </Row>
          )}
        </Row>
      </Row>

      <Row style={styles.locationRow}>
        <Ionicons
          name="location-outline"
          size={23}
          style={[styles.icon, {color: theme.secondaryTextColor}]}
        />
        <Text
          style={[styles.addressText, {color: theme.secondaryTextColor}]}
          numberOfLines={1}>
          {item.address}
        </Text>
      </Row>
    </View>
  );
});

export default CardUpper;

const styles = StyleSheet.create({
  container: {
    height: '100%',
    flex: 1,
    borderWidth: 1,
    borderRadius: 5,
    borderLeftWidth: 0,
    overflow: 'hidden',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  icon: {
    marginRight: 5,
  },
  descriptionText: {
    flex: 1,
    fontSize: size.md,
  },
  priceRow: {
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  priceText: {
    fontWeight: weight.full,
    fontSize: size.lg,
  },
  subText: {
    fontWeight: weight.normal,
    fontSize: size.sm,
  },
  statusText: {
    fontWeight: weight.bold,
    paddingHorizontal: 10,
    paddingVertical: 2,
    fontSize: size.xs,
    borderRadius: 5,
  },
  roomType: {
    marginVertical: 5,
    fontWeight: weight.bold,
    fontSize: size.sm + 1,
  },
  locationRow: {
    alignItems: 'center',
  },
  addressText: {
    flex: 1,
    fontSize: size.md,
  },
});
