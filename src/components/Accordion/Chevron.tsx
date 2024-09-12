import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather as Icon } from '@expo/vector-icons';
import Animated, {
  useAnimatedStyle,
  withTiming,
  interpolate,
  interpolateColor,
} from 'react-native-reanimated';

import theme from '../../theme/theme';

const size = 30;
const styles = StyleSheet.create({
  container: {
    height: size,
    width: size,
    borderRadius: size / 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

interface ChevronProps {
  transition: Animated.SharedValue<number>;
}

export default ({ transition }: ChevronProps) => {
  const animatedStyle = useAnimatedStyle(() => {
    const rotateZ = interpolate(transition.value, [0, 1], [Math.PI, 0]);
    const backgroundColor = interpolateColor(
      transition.value,
      [0, 1],
      [theme.DARK_BLUE, theme.LIGHT_BLUE],
    );
    return {
      transform: [{ rotateZ: `${rotateZ}rad` }],
      backgroundColor,
    };
  });

  return (
    <Animated.View style={[styles.container, animatedStyle]}>
      <Icon name="chevron-down" color="white" size={24} />
    </Animated.View>
  );
};
