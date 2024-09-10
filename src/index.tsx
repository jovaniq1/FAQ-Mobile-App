import { StatusBar } from 'expo-status-bar';
import {
  Dimensions,
  StyleSheet,
  View,
  ActivityIndicator,
  Text,
  Button,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import { useAtom } from 'jotai';
import Animated, {
  Extrapolation,
  interpolate,
  runOnJS,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useDerivedValue,
  useScrollViewOffset,
  useSharedValue,
  withSpring,
  withTiming,
} from 'react-native-reanimated';
import React, { useEffect, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { ListItem } from './components/ListItem/ListItem';
import {
  productsAtom,
  useAddToCart,
  useClearCart,
  useRemoveFromCart,
} from './cartStore';
import type { productsProps, faqProps } from './constants/constants';
import theme, { normalize } from './theme/theme';
import { HorizontalStroller } from './components/HorizontalStroller';
import { useToast } from './components/Toast/toast-manager';
import { PinchToAccess } from './components/Pinch/PinchToAccess';
import { FAQ_DATA } from './constants/constants';
import { PressableScale } from './components/Toast/components/pressable-scale';
import { BouncingCircles } from './components/Cart/BouncingCircles';

// Constants for list item height, margin, and additional measurements
const ListItemHeight = 80;
const Margin = 10;
const FullListItemHeight = ListItemHeight + Margin;

// Calculating total list height based on the number of items
const ListHeight = FullListItemHeight * 15;

// Constants for list margin top and a nice offset
const ListMarginTop = 20;

const NiceOffset = 300;

// Get screen dimensions
const { height: ScreenHeight, width: ScreenWidth } = Dimensions.get('window');

const refreshingHeight = 60;

// Main application component
const App = () => {
  // Reference for animated flat list
  const scrollAnimatedRef = useAnimatedRef<Animated.FlatList<number>>();
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);

  const { showToast } = useToast();
  const scrollToIndex = useSharedValue(0);
  const handleClearCart = useClearCart();

  const [products] = useAtom(productsAtom);
  const handleAddToCart = useAddToCart();
  const handleRemoveFromCart = useRemoveFromCart();

  // show item details
  const showItemDetails = (id: number) => {
    showToast({
      title: '',
      key: 'see_exercises',
      ToastOffset: theme.HEIGHT * 0.5,
      ToastHeight: 50,
      BaseSafeArea: 0.1,

      ToastStyles: {
        zIndex: 0,
        width: theme.WIDTH,
        height: theme.HEIGHT,
      },
      // eslint-disable-next-line react/no-unstable-nested-components
      leading: () => (
        <View>
          <PinchToAccess showToast={showToast}>
            <HorizontalStroller id={id} scrollToIndex={scrollToIndex} />
          </PinchToAccess>
        </View>
      ),
    });
  };

  const scrollOffset = useScrollViewOffset(scrollAnimatedRef as any);

  const scrollPosition = useSharedValue(0);
  const loadingOffset = useSharedValue(0);

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
    onEndDrag: event => {
      const threshold = -100; // How far user needs to pull down to trigger refresh
      if (event.contentOffset.y < threshold) {
        runOnJS(setLoading)(true);
        loadingOffset.value = withTiming(refreshingHeight, { duration: 500 }); // Animate FlatList down
      }
    },
  });

  // set loading to false after 2 seconds
  useEffect(() => {
    if (loading) {
      // clears data
      setTimeout(() => {
        setLoading(false);
        loadingOffset.value = withSpring(0); // Move the FlatList back up
      }, 3000);
    }
  }, [loading]);

  const flatListStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateY: loadingOffset.value }],
    };
  });

  const combinedOpacity = useDerivedValue(() => {
    // Assuming the use of some condition to decide which to use. You might need to introduce some logic here.
    // Let's say we decide based on which of the two is currently not zero or whichever was last updated.

    if (-scrollPosition.value > 0 && loadingOffset.value === 0) {
      return interpolate(
        -scrollPosition.value,
        [0, 60],
        [0, 1],
        Extrapolation.CLAMP,
      );
    } else {
      return interpolate(
        loadingOffset.value,
        [60, 0], // Reverse the range for decreasing effect
        [1, 0],
        Extrapolation.CLAMP,
      );
    }
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    // Compute opacity based on the negative scroll position to a minimum of 0 (not visible) and maximum of 1 (fully visible)
    const scale = interpolate(
      -scrollPosition.value,
      [0, 60], // Assuming 100 is the point at which full opacity should be reached
      [1.2, 1.5],
      Extrapolation.CLAMP,
    );

    return {
      opacity: combinedOpacity.value, // Use spring for smoother transitions
      transform: [{ scale: scale }], // Scale based on opacity for a dynamic effect
    };
  });

  const onCardPress = (item: faqProps, index: number) => {
    setShowLoading(true);
  };

  // Render the app
  return (
    <View style={styles.container}>
      <Animated.ScrollView
        ref={scrollAnimatedRef}
        onScroll={scrollHandler}
        data={FAQ_DATA.faq}
        scrollEventThrottle={16} //60fps
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          marginTop: ListMarginTop,
          backgroundColor: theme.WHITE,
          height: ListHeight + NiceOffset,
          marginBottom: normalize(20),
        }}
        style={flatListStyle} // apply the animated style here
        renderItem={({ item, index }) => (
          <View
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
            }}>
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
          </View>
        )}
        keyExtractor={(_, index) => index.toString()}>
        <Animated.View style={[styles.refresh, animatedIndicatorStyle]}>
          <BouncingCircles />
        </Animated.View>
        <View
          style={{ marginHorizontal: normalize(20), marginTop: normalize(50) }}>
          <Image
            source={require('./assets/logo.png')}
            style={{
              alignSelf: 'center',

              resizeMode: 'fit-content',
              marginBottom: normalize(10),
            }}
          />
          <Text
            style={{
              textAlign: 'left',
              fontSize: normalize(24),
              fontWeight: 'bold',
            }}>
            {FAQ_DATA.title}
          </Text>
          <Text
            style={{
              marginTop: normalize(10),
              textAlign: 'left',
              fontSize: normalize(16),
              zIndex: -1,
            }}>
            {FAQ_DATA.description}
          </Text>

          <PressableScale
            onPress={() => setShowMore(!showMore)}
            style={{
              justifyContent: 'center',
              alignItems: 'flex-start',
              height: normalize(30),
              left: 0,
              right: 0,
            }}>
            <Text
              style={{
                fontSize: normalize(14),
                color: 'blue',
                fontWeight: 'bold',
              }}>
              {!showMore ? ' Show More' : 'Hide'}
            </Text>
          </PressableScale>

          {showMore && (
            <Text
              style={{
                marginTop: normalize(10),
                textAlign: 'left',
                fontSize: normalize(14),
              }}>
              {FAQ_DATA.description2}
            </Text>
          )}
        </View>
        {/* search component */}
        <View
          style={{
            borderColor: 'gray',
            borderWidth: 1,
            marginHorizontal: normalize(20),
            marginVertical: normalize(10),
            marginTop: normalize(20),
            alignItems: 'center',
            borderRadius: normalize(10),
            flexDirection: 'row',
          }}>
          <MaterialCommunityIcons
            name="magnify"
            size={24}
            color="black"
            style={{ marginLeft: normalize(10), marginRight: normalize(10) }}
          />
          <TextInput
            style={{
              height: normalize(40),
            }}
            placeholder="Search by keyword or subject"
          />
        </View>

        {/* list Item of category showing name and icon arrow for next */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: normalize(20),
            marginTop: normalize(20),
          }}>
          <Text style={{ fontSize: normalize(18), fontWeight: 'bold' }}>
            Categories
          </Text>
        </View>
        <View style={{ marginTop: normalize(0) }}>
          {FAQ_DATA.faq?.map((item: faqProps, index: number) => (
            <ListItem
              key={index.toString()}
              item={item}
              index={index}
              loading={loading}
              scrollOffset={scrollOffset}
            />
          ))}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

// Styles for the main application component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: normalize(55),
  },

  refresh: {
    height: refreshingHeight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 8,
    left: 0,
    right: 0,
    paddingTop: normalize(20),
  },
});

// Export the main application component
export { App };
