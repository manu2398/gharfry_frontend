import {useState} from 'react';
import {Animated, View, StyleSheet} from 'react-native';
import {HEADER_HEIGHT, LIST_MARGIN} from '../constants';
import HeaderInput from './HeaderInput';
import HeaderBottomBar from './HeaderBottomBar';
import FilterList from './FilterList';
import {useTheme} from '../context/ThemeProvider';

const AnimatedListHeader = ({
  scrollAnimation,
  setMapShown,
  mapShown,
  location,
  total,
}) => {
  const {theme} = useTheme();
  const [offsetAnimation] = useState(new Animated.Value(0));

  const [clampedAnimation, setClampedAnimation] = useState(
    Animated.diffClamp(
      Animated.add(
        scrollAnimation.interpolate({
          inputRange: [0, 1],
          outputRange: [0, 1],
          extrapolateLeft: 'clamp',
        }),
        offsetAnimation,
      ),
      0,
      1,
    ),
  );

  const navBarTranslate = clampedAnimation.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, -HEADER_HEIGHT],
    extrapolate: 'clamp',
  });

  const onLayout = event => {
    let {height} = event.nativeEvent.layout;
    setClampedAnimation(
      Animated.diffClamp(
        Animated.add(
          scrollAnimation.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 1],
            extrapolateLeft: 'clamp',
          }),
          offsetAnimation,
        ),
        0,
        height,
      ),
    );
  };
  return (
    <Animated.View
      style={[
        {transform: [{translateY: navBarTranslate}]},
        styles.container,
        {
          backgroundColor: theme.backgroundColor,
          borderBottomColor: theme.borderColor,
        },
      ]}
      onLayout={onLayout}>
      <View style={{marginHorizontal: LIST_MARGIN}}>
        <HeaderInput location={location} />
        <HeaderBottomBar
          setMapShown={setMapShown}
          mapShown={mapShown}
          total={total}
        />
        <FilterList />
      </View>
    </Animated.View>
  );
};

export default AnimatedListHeader;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    height: HEADER_HEIGHT,
    zIndex: 1000,
    borderBottomWidth: 1,
  },
});
