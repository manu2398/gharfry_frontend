import {
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import colors from '../theme/colors';
import {size} from '../theme/fonts';
import {useDispatch, useSelector} from 'react-redux';
import {updateFilter} from '../redux/reducers/filterReducer';
import {useTheme} from '../context/ThemeProvider';

const FilterList = () => {
  const {theme} = useTheme();
  const {filter} = useSelector(state => state);
  const myFilters = [
    {
      text: 'All',
      id: 0,
      // width: 20,
      beds: 0,
      //  distance: 1
    },
    {
      text: 'For Sale-House',
      id: 1,
      // width: 100,
      // beds: 0,
      // distance: 1,
    },
    {
      text: 'For Sale-Flat',
      id: 2,
      // width: 85,
      // beds: 0,
      // distance: 1,
    },
    {
      text: 'For Rent-House',
      id: 3,
      // width: 100,
      // beds: 0,
      // distance: 1,
    },
    {
      text: 'For Rent-Flat',
      id: 4,
      // width: 86,
      // beds: 0,
      // distance: 1,
    },
    {
      text: 'PG',
      id: 5,
      // width: 20,
      beds: 0,
      //  distance: 1
    },
    {
      text: 'Commercial-Rent',
      id: 6,
      // width: 112,
      beds: 0,
      // distance: 1,
    },
    {
      text: 'Commercial-Sale',
      id: 7,
      // width: 112,
      beds: 0,
      // distance: 1,
    },
    {
      text: 'Land/Plot',
      id: 8,
      // width: 65,
      beds: 0,
      // distance: 1,
    },
  ];

  const flatListRef = useRef(null);

  const scrollToId = id => {
    const filterIndex = myFilters.findIndex(filter => filter.id === id);
    if (filterIndex !== -1) {
      flatListRef.current.scrollToIndex({
        index: filterIndex,
        animated: true,
        viewPosition: 0.5, // Scroll to the center of the item
      });
    }
  };

  useEffect(() => {
    if (filter.text === 'All') {
      handlePress(filter, filter.id);
    }
  }, [filter.text]);

  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const handlePress = item => {
    setActiveIndex(item.id);

    scrollToId(item.id);

    dispatch(updateFilter(item));
  };

  const ListItem = ({item}) => {
    return (
      <Pressable
        key={item.id}
        style={[
          styles.tile,
          {
            width: item.width,
          },

          activeIndex === item.id
            ? {
                borderBottomWidth: 1.8,
                borderBottomColor: colors.primary,
              }
            : {},
        ]}
        onPress={() => handlePress(item)}>
        <Text
          style={[
            styles.text,
            activeIndex === item.id
              ? {
                  color: theme.primaryTextColor,
                  fontWeight: '800',
                  fontSize: size.md,
                }
              : {color: theme.secondaryTextColor},
          ]}>
          {item.text}
        </Text>
      </Pressable>
    );
  };
  return (
    <FlatList
      ref={flatListRef}
      horizontal
      data={myFilters}
      keyExtractor={item => item.id.toString()}
      renderItem={({item}) => <ListItem item={item} />}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default FilterList;

const styles = StyleSheet.create({
  tile: {
    margin: 10,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  text: {
    fontWeight: '500',
    fontSize: 14,
  },
});
