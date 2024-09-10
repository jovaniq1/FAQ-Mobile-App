import { Dimensions, StyleSheet, View, Text } from 'react-native';
import type { SharedValue } from 'react-native-reanimated';
import Animated, {
  Easing,
  Extrapolation,
  interpolate,
  interpolateColor,
  runOnJS,
  useAnimatedStyle,
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import type { productsProps } from '../../constants/constants';
import theme, { normalize } from '../../theme/theme';
import { PressableScale } from '../Toast/components/pressable-scale';

// Constants for list item height, margin, and additional measurements
const ListItemHeight = 80;
const Margin = 10;
const FullListItemHeight = ListItemHeight + Margin;

// Constants for list margin top and a nice offset
const ListMarginTop = 40;

const NiceOffset = 40;

// Get screen dimensions
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

// Define the props for each list item
type ListItemProps = {
  index: number;
  item: productsProps;
  loading: boolean;
  scrollOffset: SharedValue<number>;
  onCardPress: (item: productsProps, index: number) => void;
};

// Functional component representing each item in the list
const ListItem: React.FC<ListItemProps> = ({
  index,
  item,
  loading = false,
  scrollOffset,
  onCardPress,
}) => {
  // Calculate base translateY for the item
  const baseTranslateY = index * FullListItemHeight;

  // Calculate item width and spacing
  const itemWidth = ScreenWidth * 0.95;
  const itemSpacing = (ScreenWidth - itemWidth) / 2;
  // Reanimated shared value for loading state
  const [isLoading, setIsLoading] = useState(false);

  const BottomThreshold = ScreenHeight - ListMarginTop - NiceOffset;

  const visibleAmount = useDerivedValue(() => {
    // Calculate the distance between the top of the item and the bottom of the screen after scrolling

    const distanceFromTop =
      scrollOffset.value + BottomThreshold - baseTranslateY;

    return interpolate(
      distanceFromTop,
      [0, FullListItemHeight], // Input range: [0, FullListItemHeight]
      [0, FullListItemHeight], // Output range: [0, FullListItemHeight]
      // You can set .CLAMP to see the difference
      Extrapolation.EXTEND, // Extrapolate values outside the input range
    );
  }, []);

  // Derived value for the real translateY of the item
  const realTranslateY = useDerivedValue(() => {
    return interpolate(
      visibleAmount.value,
      [0, FullListItemHeight],
      [
        scrollOffset.value + BottomThreshold - FullListItemHeight,
        baseTranslateY,
      ],
      Extrapolation.CLAMP,
    );
  }, []);

  // Derived value for the scale of the item
  const scale = useDerivedValue(() => {
    return interpolate(
      visibleAmount.value,
      [0, FullListItemHeight],
      [0.6, 1],
      Extrapolation.CLAMP,
    );
  }, [baseTranslateY]);

  // Animated style for the item
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        visibleAmount.value,
        [0, FullListItemHeight / 3, FullListItemHeight],
        // The opacity will be 0.7 when the item is fully visible
        [0.3, 0.4, 0.7],
        Extrapolation.EXTEND,
      ),
      transform: [
        {
          translateY: realTranslateY.value,
        },
        {
          scale: scale.value,
        },
      ],
    };
  }, []);
  const skeleton = useSharedValue(1); // This will be used to interpolate colors
  const skeletonColor = useSharedValue(0); // This will be used to interpolate colors

  useEffect(() => {
    if (loading || isLoading) {
      skeleton.value = withTiming(FullListItemHeight, {
        duration: 1500,
      });
      skeletonColor.value = withRepeat(
        withTiming(FullListItemHeight, {
          duration: 1500,
          easing: Easing.linear,
        }),
        -1, // Repeat indefinitely
        true, // Reverse the animation
      );
    } else {
      skeleton.value = withTiming(0, {
        duration: 1000,
      });
      skeletonColor.value = withTiming(0, {
        duration: 1000,
      });
    }
  }, [loading, isLoading]);

  function handleLoadingWithDelay(isScaleOne: boolean) {
    // If scale is 1, set isLoading to true immediately (or keep it true), then set to false after 1.5 seconds
    if (isScaleOne) {
      setIsLoading(true);
    } else {
      setTimeout(() => {
        setIsLoading(false);
      }, 1500);
    }
  }
  useDerivedValue(() => {
    if (scale.value === 1) {
      // Call handleLoadingWithDelay with false when scale reaches 1
      runOnJS(handleLoadingWithDelay)(false);
    } else {
      // Call handleLoadingWithDelay with true when scale is not 1
      runOnJS(handleLoadingWithDelay)(true);
    }
  });

  const rSkeletonStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      skeletonColor.value,
      [0, FullListItemHeight],
      [theme.GREY, theme.WHITE],
    );
    return { backgroundColor };
  });

  const rSkeletonTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(
      skeleton.value,
      [0, FullListItemHeight],
      [1, 0], // Reverse the opacity values if you want it to fade in instead
    );

    return { opacity };
  });

  if (loading || isLoading) {
    return (
      <Animated.View
        style={[
          { width: itemWidth, left: itemSpacing, zIndex: -index },
          styles.container,
          rContainerStyle,
        ]}>
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
          }}>
          <View style={{ flexDirection: 'row', flex: 1 }}>
            <Animated.View style={[styles.image, rSkeletonStyle]} />

            <View
              style={{
                paddingLeft: normalize(10),
                marginVertical: normalize(20),
                justifyContent: 'center',
              }}>
              <Animated.View
                style={[styles.smallPlaceholder, rSkeletonStyle]}
              />
              <Animated.View style={[styles.placeholder, rSkeletonStyle]} />
            </View>
          </View>
          <Animated.View
            style={[styles.imagePlaceholderCart, rSkeletonStyle]}
          />
        </View>
      </Animated.View>
    );
  }

  // Render actual content
  return (
    <Animated.View
      style={[
        { width: itemWidth, left: itemSpacing, zIndex: -index },
        styles.container,

        rContainerStyle,
        rSkeletonTextStyle,
      ]}>
      {/* <View
        key={index.toString()}
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          height: normalize(60),
          marginHorizontal: normalize(20),
          marginTop: normalize(10),
          backgroundColor: theme.WHITE,
          padding: normalize(10),
          // borderWidth: 1,
          borderRadius: normalize(10),
          borderColor: 'gray',
          shadowColor: theme.BLACK,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}> */}
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="account"
          size={24}
          color="black"
          style={{ marginRight: normalize(10) }}
        />
        <Text
          style={{
            fontSize: normalize(14),
            fontWeight: 'bold',
            width: theme.WIDTH * 0.6,
          }}>
          {item?.category}
        </Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <MaterialCommunityIcons
          name="arrow-right"
          size={24}
          color="black"
          style={{ marginRight: normalize(10) }}
        />
      </View>
      {/* </View> */}
    </Animated.View>
  );
};

export { ListItem };

const styles = StyleSheet.create({
  container: {
    height: ListItemHeight,
    backgroundColor: theme.WHITE,
    position: 'absolute',
    // top: 0,
    borderRadius: normalize(15),

    shadowColor: theme.BLACK,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,

    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: normalize(10),
    padding: normalize(10),
    borderColor: 'gray',
  },

  placeholder: {
    width: normalize(200),
    height: normalize(20),
    borderRadius: 5,
  },
  smallPlaceholder: {
    width: normalize(100),
    height: normalize(20),
    borderRadius: 5,

    marginBottom: normalize(10),
  },
  imagePlaceholderCart: {
    padding: normalize(10),
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: normalize(40),
    height: normalize(40),
    borderRadius: 10,
    marginRight: normalize(10),
  },
  image: {
    height: '90%',
    aspectRatio: 1,
    borderRadius: normalize(15),
    margin: normalize(5),
  },
});
