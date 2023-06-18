import {StyleSheet, Text, View} from 'react-native';
import {size, weight} from '../theme/fonts';
import CardUpper from './CardUpper';

import Row from './Row';
import formattedTimeStamp from '../utils/formattedTimeStamp';
import {useTheme} from '../context/ThemeProvider';

const CardHomeInfo = ({item, width}) => {
  const {theme} = useTheme();

  return (
    <View
      style={[
        styles.cardFooterContainer,
        {
          backgroundColor: theme.backgroundColor,
          borderColor: theme.borderColor,
          width,
        },
      ]}>
      <CardUpper item={item} width={width} />

      {width == 280 ? (
        <></>
      ) : (
        <>
          <Row
            style={{
              marginVertical: 5,
            }}>
            {item.propertyType === 'Land/Plot' ? (
              <></>
            ) : (
              <Text style={{color: theme.secondaryTextColor}}>
                {item.furnishing} •
              </Text>
            )}
            <Text
              style={{marginHorizontal: 5, color: theme.secondaryTextColor}}>
              {item.sqft.toLocaleString('en-IN')} Sq Ft
            </Text>
          </Row>

          <Row
            style={{
              marginTop: 5,
              justifyContent: 'space-between',
            }}>
            <Text style={{color: theme.secondaryTextColor, fontSize: size.sm}}>
              {formattedTimeStamp(item.createdAt)}
            </Text>

            <Text
              style={{fontWeight: weight.bold, color: theme.primaryTextColor}}>
              UID: {item.pid}
            </Text>
          </Row>
        </>
      )}
    </View>
  );
};

export default CardHomeInfo;

const styles = StyleSheet.create({
  cardFooterContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderWidth: 1,
    borderTopWidth: 0,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
  },

  roomType: {
    marginVertical: 5,
    fontWeight: weight.semi,
    fontSize: size.md,
  },
});
