import Row from './Row';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Entypo from 'react-native-vector-icons/Entypo';
import {Pressable, Text, StyleSheet, Animated} from 'react-native';
import colors from '../theme/colors';
import {weight} from '../theme/fonts';
import {useNavigation} from '@react-navigation/native';
import {useSelector} from 'react-redux';
import BottomSheetModal from './BottomSheet';
import {useState} from 'react';
import PayBox from './PayBox';
import {useTheme} from '../context/ThemeProvider';

const HeaderBottomBar = ({setMapShown, mapShown, total}) => {
  const {theme} = useTheme();
  const navigation = useNavigation();
  const handleMapPress = () => {
    if (mapShown) return setMapShown(false);
    setMapShown(true);
  };

  const {auth, filter, properties} = useSelector(state => state);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Row style={styles.containerRow}>
        <Row>
          <MaterialCommunityIcons
            name="fire"
            color={colors.primary}
            size={20}
          />
          <Text style={{color: theme.secondaryTextColor, marginRight: 15}}>
            {total === 0 || total === undefined
              ? `Search Spaces (${filter?.distance} km)`
              : `${properties.count} Available (${filter?.distance} km)`}
          </Text>
          <Pressable onPress={handleOpenModal}>
            <Row>
              <Text style={{color: colors.black}}>💰</Text>
              <Text
                style={{
                  color: theme.primaryTextColor,
                  fontWeight: weight.bold,
                }}>
                {auth.user.credits}
              </Text>
            </Row>
          </Pressable>
        </Row>
        <Row>
          <Row>
            <MaterialCommunityIcons
              name="filter-variant"
              color={theme.info}
              size={18}
            />
            <Pressable
              onPress={() => navigation.navigate('FilterScreen')}
              style={{marginRight: 15, paddingVertical: 3}}>
              <Text style={[styles.boldText, {color: theme.info}]}>Filter</Text>
              {(filter?.beds > 0 || filter?.distance > 1) && (
                <Entypo
                  name="dot-single"
                  color={colors.primary}
                  size={22}
                  style={{position: 'absolute', right: -10, bottom: 11}}
                />
              )}
            </Pressable>
          </Row>
          {mapShown ? (
            <Pressable onPress={handleMapPress}>
              <Row>
                <MaterialCommunityIcons
                  name="view-list"
                  color={theme.info}
                  size={18}
                />
                <Text style={[styles.boldText, {color: theme.info}]}>List</Text>
              </Row>
            </Pressable>
          ) : (
            <Pressable onPress={handleMapPress}>
              <Row>
                <MaterialCommunityIcons
                  name="map-outline"
                  color={theme.info}
                  size={20}
                />
                <Text style={[styles.boldText, {color: theme.info}]}>Map</Text>
              </Row>
            </Pressable>
          )}
        </Row>
      </Row>
      <BottomSheetModal isOpen={isModalOpen} onClose={handleCloseModal}>
        <PayBox />
      </BottomSheetModal>
    </>
  );
};

export default HeaderBottomBar;

const styles = StyleSheet.create({
  containerRow: {
    justifyContent: 'space-between',
    marginVertical: 7,
  },
  boldText: {
    fontWeight: weight.semi,
    paddingVertical: 3,
  },
});
