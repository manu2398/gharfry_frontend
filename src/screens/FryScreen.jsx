import {
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Screen from '../components/Screen';
import {useTheme} from '../context/ThemeProvider';
import colors from '../theme/colors';

import Ionicons from 'react-native-vector-icons/Ionicons';
import Row from '../components/Row';
import {size, weight} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {LIST_MARGIN} from '../constants';
import TrendingProperties from '../components/TrendingProperties';
import RecentlyAddedProperties from '../components/RecentlyAddedProperties';

const FryScreen = () => {
  const {theme} = useTheme();
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.push('FindLocationScreen');
  };

  return (
    <Screen>
      <ScrollView style={{flex: 1}} showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{
            width: '100%',
            height: 320,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          resizeMode="cover"
          source={require('../assets/background.jpg')}
          blurRadius={3}>
          <View
            style={{
              height: '100%',
              width: '100%',
              position: 'absolute',
              backgroundColor: 'rgba(0, 0, 0, 0.4)',
            }}
          />
          <View
            style={{
              width: '85%',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontWeight: weight.full,
                fontSize: size.xl,
                marginBottom: 10,
                color: '#fff',
              }}>
              Buy or Sell your property with{' '}
              <Text style={{color: 'tomato'}}> GharFry!</Text>
            </Text>
          </View>
          <Pressable
            onPress={handlePress}
            style={{
              width: '90%',
              height: 50,
              borderColor: theme.borderColor,
              borderWidth: 2,
              color: theme.primaryTextColor,
              backgroundColor: theme.backgroundColor,
              marginBottom: -60,
              justifyContent: 'center',
              borderRadius: 30,
              elevation: 3,
              paddingHorizontal: 15,
              paddingVertical: 10,
            }}>
            <Row>
              <Ionicons
                name={'search-outline'}
                size={22}
                color={colors.primary}
              />
              <Text style={{color: theme.secondaryTextColor, marginLeft: 10}}>
                Search your nearest landmark here
              </Text>
            </Row>
          </Pressable>
        </ImageBackground>

        <View style={{paddingHorizontal: LIST_MARGIN + 10}}>
          <RecentlyAddedProperties />
          <TrendingProperties />
        </View>
      </ScrollView>
    </Screen>
  );
};

export default FryScreen;

const styles = StyleSheet.create({});
