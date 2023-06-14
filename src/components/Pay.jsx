import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

import RazorpayCheckout from 'react-native-razorpay';

import {useDispatch, useSelector} from 'react-redux';
import {addCredits} from '../redux/reducers/authReducer';
import {TYPES} from '../redux/reducers/alertReducer';
import {weight} from '../theme/fonts';
import colors from '../theme/colors';
import {useTheme} from '../context/ThemeProvider';

const Pay = ({title, credits, price}) => {
  const {auth} = useSelector(state => state);
  const dispatch = useDispatch();
  const {theme} = useTheme();

  const handlePress = async () => {
    dispatch({
      type: 'ALERT',
      payload: {success: 'We are not accepting payments as of now.'},
    });
  };

  return (
    <TouchableOpacity
      onPress={() => {
        var options = {
          description: 'Buying credits',
          image: 'https://i.imgur.com/3g7nmJC.png',
          currency: 'INR',
          key: 'rzp_test_bWe4pjYFGxOVVC', // Your api key
          amount: price * 100,
          name: ` 💰${credits} - ${title}`,
          prefill: {
            email: auth.user.email,
            name: auth.user.fullname,
          },
          theme: {color: '#F37254'},
        };
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            // alert(`Success: ${data.razorpay_payment_id}`);
            dispatch(
              addCredits({
                currentCredits: auth.user.credits,
                toBeUsed: credits,
                auth,
              }),
            ).then(() => {
              dispatch({
                type: TYPES.ALERT,
                payload: {success: 'Credits are added successfully.'},
              });
            });
          })
          .catch(error => {
            // handle failure
            console.log(error.code);
            if (error.code === 0) alert(`Payment was cancelled!`);
          });
      }}

      // onPress={handlePress}
    >
      <View
        style={[
          styles.payTile,
          {
            backgroundColor: theme.backgroundColor,
            borderColor: theme.borderColor,
          },
        ]}>
        <Text style={[styles.title, {color: theme.secondaryTextColor}]}>
          {title}
        </Text>
        <Text style={[styles.price, {color: theme.secondaryTextColor}]}>
          ₹{price}
        </Text>
        <Text style={[styles.credits, {color: theme.secondaryTextColor}]}>
          {credits} 💰
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default Pay;

const styles = StyleSheet.create({
  payTile: {
    width: 140,
    // backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 1,
    borderWidth: 0.5,
    padding: 16,
    marginBottom: 16,
    shadowColor: colors.primary,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.4,
    shadowRadius: 2,
    elevation: 2,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: weight.full,
    marginBottom: 8,
  },
  price: {
    fontSize: 23,
  },
  credits: {
    fontSize: 20,
  },
});
