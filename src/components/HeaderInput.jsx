import {
  Platform,
  Text,
  TouchableOpacity,
  StyleSheet,
  Pressable,
  View,
} from 'react-native';
import colors from '../theme/colors';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Row from './Row';
import {size, weight} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {useTheme} from '../context/ThemeProvider';
import {useSelector} from 'react-redux';

const HeaderInput = ({location}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const {notify} = useSelector(state => state);
  return (
    <Row>
      <TouchableOpacity
        onPress={() => navigation.navigate('FindLocationScreen')}
        style={[styles.searchContainer, {borderColor: theme.borderColor}]}>
        <Row style={{alignItems: 'center'}}>
          <MaterialCommunityIcons
            name="magnify"
            color={colors.primary}
            size={28}
          />
          <Text
            style={[styles.text, {color: theme.secondaryTextColor}]}
            numberOfLines={1}>
            {location}
          </Text>
        </Row>
      </TouchableOpacity>
      <Pressable
        style={styles.notifyBell}
        onPress={() => navigation.navigate('NotificationScreen')}>
        <MaterialCommunityIcons
          name="bell-outline"
          color={theme.secondaryTextColor}
          size={23}
          style={{padding: 6}}
        />
        {notify.unreadNotifications.length > 0 && (
          <View
            style={{
              padding: 2,
              backgroundColor: colors.accent,
              borderRadius: 10,
              position: 'absolute',
              // bottom: 0,
              right: 2,
              minWidth: 16,
              minHeight: 16,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Text
              style={{color: colors.white, fontSize: 10, fontWeight: 'bold'}}>
              {notify.unreadNotifications.length}
            </Text>
          </View>
        )}
      </Pressable>
    </Row>
  );
};

export default HeaderInput;

const styles = StyleSheet.create({
  searchContainer: {
    borderWidth: 1,
    borderRadius: 30,
    padding: 10,
    marginTop: Platform.OS === 'ios' ? 50 : 20,
    flex: 1,
  },
  text: {
    fontSize: size.md,
    marginLeft: 10,
    fontWeight: weight.bold,
  },
  notifyBell: {
    marginTop: Platform.OS === 'android' ? 20 : 40,
  },
});
