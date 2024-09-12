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
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import type { productsProps } from '../../constants/constants';
import theme, { normalize } from '../../theme/theme';
import { PressableScale } from '../Toast/components/pressable-scale';
import List from '../Accordion/List';

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
  isAccordion?: boolean;
};

// Functional component representing each item in the list
const ListItem: React.FC<ListItemProps> = ({
  index,
  item,
  loading = false,
  scrollOffset,
  onCardPress,
  isAccordion = false,
}) => {
  // Calculate base translateY for the item
  const baseTranslateY = index * FullListItemHeight;
  const [open, setOpen] = useState(false);
  const [textHeight, setTextHeight] = useState(0);
  const [textHeightAnswer, setTextHeightAnswer] = useState(0);

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

  const transition = useSharedValue(0);
  // Define default heights or fallback safely
  const questionHeight = isAccordion
    ? Math.max(textHeight + 45 || 1, 90) // Min value for visual consistency
    : ListItemHeight || 1;

  const answerHeight =
    questionHeight + Math.max(textHeightAnswer + 60 || 1, 40); // Add min for proper space

  const height = useDerivedValue(() => {
    return interpolate(
      transition.value,
      [0, 1],
      [questionHeight, answerHeight],
    );
  });

  // Animated style for the item
  const rContainerStyle = useAnimatedStyle(() => {
    return {
      height: height.value,

      flexGrow: 1,

      // zIndex: 2000 - index,
      opacity: interpolate(
        visibleAmount.value,

        [0, FullListItemHeight / 3, FullListItemHeight],
        // The opacity will be 0.7 when the item is fully visible
        [0.3, 0.4, 0.7],
        Extrapolation.EXTEND,
      ),
      transform: [
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
      // collapses if expanded when loading
      if (isAccordion) {
        setOpen(false);
        transition.value = withTiming(0, {
          duration: 400,
          easing: Easing.inOut(Easing.ease),
        });
      }
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

  const toggleList = () => {
    transition.value = withTiming(open ? 0 : 1, {
      duration: 400,
      easing: Easing.inOut(Easing.ease),
    });
    setOpen(prev => !prev);
  };

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
    <PressableScale
      onPress={() => {
        if (!isAccordion) {
          onCardPress(item, index);
        } else {
          toggleList();
        }
      }}>
      {/* used to calculate the height of the text */}
      {isAccordion && (
        <>
          <View style={{ position: 'absolute', zIndex: -1000, opacity: 0 }}>
            <Text
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setTextHeight(height);
              }}
              style={styles.title}>{`${item?.question}`}</Text>
          </View>
          <View style={{ position: 'absolute', zIndex: -1000, opacity: 0 }}>
            <Text
              onLayout={event => {
                const { height } = event.nativeEvent.layout;
                setTextHeightAnswer(height);
              }}
              style={styles.title}>{`${item?.answer}`}</Text>
          </View>
        </>
      )}

      <Animated.View
        style={[
          { width: itemWidth, left: itemSpacing },
          styles.container,

          rContainerStyle,
          rSkeletonTextStyle,
        ]}>
        {isAccordion ? (
          <View>
            <List
              question={item}
              transition={transition}
              setTextHeight={setTextHeight}
            />
          </View>
        ) : (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <MaterialIcons
                name="library-books"
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
          </>
        )}
      </Animated.View>
    </PressableScale>
  );
};

export { ListItem };

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.WHITE,

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
  title: {
    // height: (LIST_ITEM_HEIGHT * 2) / 1.2,
    fontSize: normalize(14),
    width: theme.WIDTH * 0.8,
    flexGrow: 1,
    color: theme.WHITE,
    zIndex: -1000,
    opacity: 0,

    fontWeight: 'bold',
    // width: theme.WIDTH * 0.8,
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
