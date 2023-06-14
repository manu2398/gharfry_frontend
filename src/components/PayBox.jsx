import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {LIST_MARGIN} from '../constants';
import Row from './Row';
import Pay from './Pay';
import {useSelector} from 'react-redux';
import {weight} from '../theme/fonts';
import colors from '../theme/colors';
import {useTheme} from '../context/ThemeProvider';

// 25 credits === 30 rupees
// 1 credit === 1.19 rupees
const payListings = [
  {
    title: 'Basic',
    id: 1,
    credits: 80,
    pay: 99,
  },
  {
    title: 'Standard',
    id: 2,
    credits: 170,
    pay: 199,
  },
  {
    title: 'Premium',
    id: 3,
    credits: 360,
    pay: 399,
  },
  {
    title: 'Deluxe',
    id: 4,
    credits: 500,
    pay: 599,
  },
];
const PayBox = () => {
  const {theme} = useTheme();
  const {auth} = useSelector(state => state);

  return (
    <>
      <View
        style={{
          marginHorizontal: LIST_MARGIN,
          marginBottom: 10,
        }}>
        <Text style={[styles.heading, {color: theme.secondaryTextColor}]}>
          Pricing and Plans
        </Text>
        <Row style={{justifyContent: 'space-between'}}>
          <Text style={{color: theme.secondaryTextColor}}>
            My Credits = 💰{auth.user.credits}
          </Text>
          <Text style={{color: theme.secondaryTextColor}}>1💰 ~ ₹1.17</Text>
        </Row>
      </View>
      <View style={styles.payContainer}>
        {payListings.map(payList => (
          <Pay
            key={payList.id}
            title={payList.title}
            price={payList.pay}
            credits={payList.credits}
          />
        ))}
      </View>
    </>
  );
};

export default PayBox;

const styles = StyleSheet.create({
  payContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderColor: colors.border,
    // borderWidth: 1,
    marginHorizontal: 10,
    borderRadius: 10,
    paddingVertical: 15,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  heading: {
    fontSize: 20,
    fontWeight: weight.full,
    marginBottom: 3,
    color: colors.grey,
  },
});
