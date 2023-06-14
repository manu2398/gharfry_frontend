import {StyleSheet, Text, View} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../theme/colors';
import Row from './Row';
import {size, weight} from '../theme/fonts';

const ViewProperties = ({
  views,
  trending,
  color = colors.info,
  size = 16,
  textSize = 12,
  textColor = colors.grey,
}) => {
  return (
    <Row>
      <MaterialCommunityIcons name="eye" size={size} color={colors.border} />
      <Text
        style={{
          fontWeight: weight.bold,
          fontSize: textSize,
          color: textColor,
        }}>
        {views.length}
      </Text>
      {trending && (
        <MaterialCommunityIcons name="trending-up" size={size} color={color} />
      )}
    </Row>
  );
};

export default ViewProperties;

const styles = StyleSheet.create({});
