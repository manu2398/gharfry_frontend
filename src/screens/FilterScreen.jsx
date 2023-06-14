import React, {useState, useEffect} from 'react';
import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import ModalHeader from '../components/ModalHeader';
import {useNavigation} from '@react-navigation/native';
import {useDispatch, useSelector} from 'react-redux';
import {TYPES, addFilter, updateFilter} from '../redux/reducers/filterReducer';
// import {Dropdown} from 'react-native-element-dropdown';
// import AntDesign from 'react-native-vector-icons/AntDesign';
import {weight} from '../theme/fonts';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import colors from '../theme/colors';
import {useTheme} from '../context/ThemeProvider';
// import BudgetSlider from '../components/BudgetSlider';

const FilterScreen = () => {
  const {theme} = useTheme();
  const [selectedBeds, setSelectedBeds] = useState(0);
  const [selectedDistance, setSelectedDistance] = useState(0);
  // const [value, setValue] = useState(null);
  const [myValue, setMyValue] = useState(null);
  // const [price, setPrice] = useState(null);
  // const [isFocus, setIsFocus] = useState(false);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const {filter} = useSelector(state => state);

  // const data = [
  //   {label: 'All', value: 'All', id: 0},
  //   {label: 'For Sale-House', value: 'For Sale-House', id: 1},
  //   {label: 'For Rent-House', value: 'For Rent-House', id: 3},
  //   {label: 'For Sale-Flat', value: 'For Sale-Flat', id: 2},
  //   {label: 'For Rent-Flat', value: 'For Rent-Flat', id: 4},
  //   {label: 'PG', value: 'PG', id: 5},
  //   {label: 'Commercial-Sale', value: 'Commercial-Sale', id: 7},
  //   {label: 'Commercial-Rent', value: 'Commercial-Rent', id: 6},
  //   {label: 'Land/Plot', value: 'Land/Plot', id: 8},
  // ];

  useEffect(() => {
    if (filter?.text) {
      setSelectedBeds(filter.beds);
      setSelectedDistance(filter.distance);
      setMyValue(filter.text);
      // setValue(filter.text);
      // setMyValue(filter);
      // setPrice(filter?.price);
    }
  }, [filter]);

  const obj = {};
  const filterPressed = () => {
    if (selectedBeds) {
      obj.beds = selectedBeds;
    }

    if (selectedDistance) {
      obj.distance = selectedDistance;
    }

    obj.text = myValue;
    // obj.id = myValue.id;

    // obj.price = price;

    dispatch(updateFilter(obj));
    navigation.goBack();
  };

  const clearFilter = () => {
    dispatch({
      type: TYPES.CLEAR,
      payload: {text: 'All', id: 0, width: 60, beds: 0, distance: 1},
    });
    navigation.goBack();
  };

  return (
    <Screen>
      <ModalHeader xShown text={'Select Filters'} onPress={filterPressed} />
      <View
        style={[styles.container, {backgroundColor: theme.backgroundColor}]}>
        {filter.text === 'All' ||
        filter.text === 'Land/Plot' ||
        filter.text === 'Commercial-Rent' ||
        filter.text === 'Commercial-Sale' ? (
          <></>
        ) : (
          <View style={styles.row}>
            <Text style={[styles.label, {color: theme.primaryTextColor}]}>
              Beds:
            </Text>
            <View
              style={[
                styles.optionContainer,
                {
                  backgroundColor: theme.backgroundColor,
                  borderColor: theme.borderColor,
                },
              ]}>
              <TouchableOpacity
                style={[
                  styles.option,
                  {borderColor: theme.borderColor},
                  selectedBeds === '1' && styles.selectedOption,
                ]}
                onPress={() => setSelectedBeds('1')}>
                <Text
                  style={[
                    styles.optionText,
                    {color: theme.primaryTextColor},
                    selectedBeds === '1' && styles.selectedOptionText,
                  ]}>
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {borderColor: theme.borderColor},
                  selectedBeds === '2' && styles.selectedOption,
                ]}
                onPress={() => setSelectedBeds('2')}>
                <Text
                  style={[
                    styles.optionText,
                    {color: theme.primaryTextColor},
                    selectedBeds === '2' && styles.selectedOptionText,
                  ]}>
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {borderColor: theme.borderColor},
                  selectedBeds === '3' && styles.selectedOption,
                ]}
                onPress={() => setSelectedBeds('3')}>
                <Text
                  style={[
                    styles.optionText,
                    {color: theme.primaryTextColor},
                    selectedBeds === '3' && styles.selectedOptionText,
                  ]}>
                  3
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {borderColor: theme.borderColor},
                  selectedBeds === '4' && styles.selectedOption,
                ]}
                onPress={() => setSelectedBeds('4')}>
                <Text
                  style={[
                    styles.optionText,
                    {color: theme.primaryTextColor},
                    selectedBeds === '4' && styles.selectedOptionText,
                  ]}>
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[
                  styles.option,
                  {borderColor: theme.borderColor},
                  selectedBeds === '5' && styles.selectedOption,
                ]}
                onPress={() => setSelectedBeds('5')}>
                <Text
                  style={[
                    styles.optionText,
                    {color: theme.primaryTextColor},
                    selectedBeds === '5' && styles.selectedOptionText,
                  ]}>
                  5
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <View style={styles.row}>
          <Text style={[styles.label, {color: theme.primaryTextColor}]}>
            Distance (km):
          </Text>
          <View
            style={[
              styles.optionContainer,
              {
                backgroundColor: theme.backgroundColor,
                borderColor: theme.borderColor,
              },
            ]}>
            <TouchableOpacity
              style={[
                styles.option,
                {borderColor: theme.borderColor},
                selectedDistance === '1' && styles.selectedOption,
              ]}
              onPress={() => setSelectedDistance('1')}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.primaryTextColor},
                  selectedDistance === '1' && styles.selectedOptionText,
                ]}>
                1
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {borderColor: theme.borderColor},
                selectedDistance === '2' && styles.selectedOption,
              ]}
              onPress={() => setSelectedDistance('2')}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.primaryTextColor},
                  selectedDistance === '2' && styles.selectedOptionText,
                ]}>
                2
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {borderColor: theme.borderColor},
                selectedDistance === '3' && styles.selectedOption,
              ]}
              onPress={() => setSelectedDistance('3')}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.primaryTextColor},
                  selectedDistance === '3' && styles.selectedOptionText,
                ]}>
                3
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {borderColor: theme.borderColor},
                selectedDistance === '4' && styles.selectedOption,
              ]}
              onPress={() => setSelectedDistance('4')}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.primaryTextColor},
                  selectedDistance === '4' && styles.selectedOptionText,
                ]}>
                4
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.option,
                {borderColor: theme.borderColor},
                selectedDistance === '5' && styles.selectedOption,
              ]}
              onPress={() => setSelectedDistance('5')}>
              <Text
                style={[
                  styles.optionText,
                  {color: theme.primaryTextColor},
                  selectedDistance === '5' && styles.selectedOptionText,
                ]}>
                5
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* <View>
          <Text
            style={[
              {marginBottom: 5, fontWeight: weight.bold},
              isFocus && {color: 'blue'},
            ]}>
            Select Property Type
          </Text>

          <Dropdown
            style={[
              styles.dropdown,
              isFocus && {borderColor: 'blue'},
              {width: '100%'},
            ]}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={!isFocus ? 'Select item' : '...'}
            value={value}
            onFocus={() => {
              setIsFocus(true);
            }}
            onBlur={() => {
              setIsFocus(false);
            }}
            onChange={item => {
              setValue(item.label);
              setMyValue(item);
              setIsFocus(false);
            }}
            renderLeftIcon={() => (
              <AntDesign
                style={styles.icon}
                color={isFocus ? 'blue' : 'black'}
                name="Safety"
                size={20}
              />
            )}
          />
        </View>

        {(filter.text === 'PG' ||
          value === 'PG' ||
          filter.text === 'For Rent-House' ||
          value === 'For Rent-House' ||
          filter.text === 'For Rent-Flat' ||
          value === 'For Rent-Flat' ||
          filter.text === 'Commercial-Rent' ||
          value === 'Commercial-Rent') && (
          <BudgetSlider setPrice={p => setPrice(p)} value={value} />
        )} */}
      </View>
      <View style={styles.buttonContainer}>
        <Pressable onPress={filterPressed}>
          <Text style={[styles.button1, {color: theme.info}]}>
            Apply Filter
          </Text>
        </Pressable>

        <Pressable onPress={clearFilter}>
          <Text style={[styles.button2, {color: theme.primaryTextColor}]}>
            Clear Filters
          </Text>
        </Pressable>
      </View>
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  label: {
    flex: 1,
    fontWeight: 'bold',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    backgroundColor: '#fff',
    flex: 2,
  },
  option: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
    borderWidth: 1,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  optionText: {
    fontWeight: 'bold',
  },
  selectedOption: {
    backgroundColor: 'tomato',
  },
  selectedOptionText: {
    color: '#fff',
  },
  slider: {
    flex: 2,
    marginLeft: 16,
  },
  priceRangeText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 16,
  },
  closeButtonText: {
    color: 'tomato',
    fontWeight: 'bold',
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    backgroundColor: 'white',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label1: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  container2: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    paddingHorizontal: LIST_MARGIN,
    paddingVertical: 20,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  button1: {
    color: colors.info,
    fontWeight: weight.bold,
    padding: 5,
  },
  button2: {
    color: colors.black,
    fontWeight: weight.normal,
    padding: 5,
  },
});

export default FilterScreen;
