import {
  Image,
  Keyboard,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Screen from '../components/Screen';
import {LIST_MARGIN} from '../constants';
import Row from '../components/Row';
import {useDispatch, useSelector} from 'react-redux';
import {getDataApi} from '../utils/fetchData';
import {useNavigation} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CommonLoader from '../components/CommonLoader';
import {weight} from '../theme/fonts';
import {useTheme} from '../context/ThemeProvider';
import colors from '../theme/colors';

const SearchUserScreen = () => {
  const {theme} = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [load, setLoad] = useState(false);
  const [property, setProperty] = useState([]);
  const navigation = useNavigation();

  const dispatch = useDispatch();
  const {auth} = useSelector(state => state);
  useEffect(() => {
    if (searchTerm === '') {
      setProperty([]);
      Keyboard.dismiss();
    }
  }, [searchTerm]);

  const handleSearch = () => {
    setProperty([]);
    setLoad(true);
    if (searchTerm && auth.token) {
      getDataApi(`searchByPid?searchTerm=${searchTerm}`, auth.token)
        .then(res => setProperty([res.data.property]))
        .catch(err => {
          dispatch({
            type: 'ALERT',
            payload: {error: err.response.data.message},
          });
        });
    }
    setSearchTerm('');
    setLoad(false);
  };

  const handleNavigate = property => {
    navigation.navigate('PropertyDetailScreen', {id: property._id});
    setSearchTerm('');
    setProperty([]);
  };

  return (
    <Screen>
      <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
        Search By PID
      </Text>
      <View
        style={{
          paddingHorizontal: LIST_MARGIN,
          marginBottom: 30,
        }}>
        <TextInput
          style={[
            styles.inputContainer,
            {
              borderColor: theme.borderColor,
              backgroundColor: theme.backgroundColor,
              color: theme.primaryTextColor,
            },
          ]}
          placeholder="Search property by unique PID"
          value={searchTerm}
          selectionColor={colors.primary}
          onChangeText={setSearchTerm}
          onSubmitEditing={handleSearch}
          placeholderTextColor={theme.secondaryTextColor}
        />
        {load && <CommonLoader />}

        {property.map((property, idx) => (
          <Pressable
            style={{
              paddingVertical: 10,
              padding: 10,
              borderRadius: 7,
              borderWidth: 1,
              borderColor: theme.borderColor,
            }}
            onPress={() => handleNavigate(property)}
            key={idx}>
            <Row style={{justifyContent: 'space-between'}}>
              <Image
                source={{uri: property.images[0].url}}
                style={{width: 40, aspectRatio: 1, borderRadius: 20}}
              />
              <Text style={[styles.name, {color: theme.secondaryTextColor}]}>
                PID: {property.pid}
              </Text>

              <MaterialCommunityIcons
                name={'chevron-right'}
                color={theme.secondaryTextColor}
                size={20}
              />
            </Row>
          </Pressable>
        ))}
      </View>
    </Screen>
  );
};

export default SearchUserScreen;

const styles = StyleSheet.create({
  inputContainer: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginVertical: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
    flex: 1,
    marginLeft: 10,
  },
  heading: {
    fontSize: 24,
    fontWeight: weight.full,
    marginTop: 10,
    paddingHorizontal: LIST_MARGIN,
  },
});
