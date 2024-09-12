import React, { useState } from 'react';
import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import Animated, {
  Easing,
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  useDerivedValue,
  interpolate,
} from 'react-native-reanimated';

import theme, { normalize } from '../../theme/theme';

import Chevron from './Chevron';
import Item, { LIST_ITEM_HEIGHT } from './ListItem';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    // position: 'absolute',
    // padding: normalize(10),

    // height: LIST_ITEM_HEIGHT,
  },
  title: {
    // height: (LIST_ITEM_HEIGHT * 2) / 1.2,
    fontSize: normalize(14),
    width: theme.WIDTH * 0.8,
    flexGrow: 1,
    color: theme.DARK_BLUE,

    fontWeight: 'bold',
    // width: theme.WIDTH * 0.8,
  },
  question: {
    fontSize: normalize(16),
    fontWeight: 'bold',
    color: theme.DARK_BLUE,
  },
  items: {
    overflow: 'hidden',
    flexDirection: 'column',
  },
});

export type questions = {
  id: number;
  question: string;
  answer: string;
  lastModified: string;
};

interface ListProps {
  question: questions; // Ensure it's a single question object, not an array.
  transition: { value: Animated.SharedValue<number> };
  setTextHeight: (height: number) => void;
}

export default ({ question, transition, setTextHeight }: ListProps) => {
  // const [open, setOpen] = useState(false);

  // const toggleList = () => {
  //   transition.value = withTiming(open ? 0 : 1, {
  //     duration: 400,
  //     easing: Easing.inOut(Easing.ease),
  //   });
  //   setOpen(prev => !prev);
  // };

  // Calculate the height based on the length of the answer
  // const answerHeight = LIST_ITEM_HEIGHT * (question?.answer.length * 2 || 1);

  // const height = useDerivedValue(() => {
  //   return interpolate(
  //     transition.value,
  //     [0, 1],
  //     [LIST_ITEM_HEIGHT, answerHeight],
  //   );
  // });

  const animatedStyle = useAnimatedStyle(() => ({
    // height: height.value,
    opacity: transition.value,
  }));

  const bottomRadius = useDerivedValue(() =>
    interpolate(transition.value, [0, 1], [8, 0]),
  );

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderBottomLeftRadius: bottomRadius.value,
    borderBottomRightRadius: bottomRadius.value,
  }));

  return (
    <>
      <Animated.View style={[styles.container]}>
        <View>
          <Text style={styles.question}>{`Question:`}</Text>
          <Text style={styles.title}>{`${question?.question}`}</Text>
        </View>
        <Chevron {...{ transition }} />
      </Animated.View>

      <Animated.View style={[styles.items, animatedStyle]}>
        <Item question={question} isLast={false} />
        {/* Ensure Item component handles question correctly */}
      </Animated.View>
    </>
  );
};
