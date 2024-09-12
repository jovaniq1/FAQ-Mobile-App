import {
  StyleSheet,
  View,
  Text,
  Button,
  TextInput,
  Image,
  StatusBar,
} from 'react-native';
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
import React, { useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import Accordion from '../Accordion';
import { ListItem } from '../ListItem/ListItem';
import type { faqProps } from '../../constants/constants';
import theme, { normalize } from '../../theme/theme';
import { FAQ_DATA } from '../../constants/constants';
import { PressableScale } from '../Toast/components/pressable-scale';
import { BouncingCircles } from '../Cart/BouncingCircles';
import { SearchComponent } from '../SearchComponent/SearchComponent';

import EmptySearch from './EmptySearch';

// Constants for list item height, margin, and additional measurements
const ListItemHeight = 80;
const Margin = 10;
const FullListItemHeight = ListItemHeight + Margin;

// Calculating total list height based on the number of items
const ListHeight = FullListItemHeight * 15;

// Constants for list margin top and a nice offset
const ListMarginTop = 20;

const NiceOffset = 100;

const refreshingHeight = 90;
const loadingValue = 60;

// Main application component
const FaqDetails = ({ navigation, route }) => {
  const { item: data } = route.params;

  // Reference for animated flat list
  const scrollAnimatedRef = useAnimatedRef<Animated.FlatList<number>>();
  const [loading, setLoading] = useState(true);
  const [showLoading, setShowLoading] = useState(false);

  const [searchQuery, setSearchQuery] = useState('');

  const scrollOffset = useScrollViewOffset(scrollAnimatedRef as any);

  const [filteredQuestions, setFilteredQuestions] = useState(data.questions);
  const [showSearchData, setShowSearchData] = useState(false);
  const scrollPosition = useSharedValue(0);
  const loadingOffset = useSharedValue(0);

  const onPullDown = () => {
    setLoading(true);
    setSearchQuery('');

    setFilteredQuestions(data.questions);
  };

  const scrollHandler = useAnimatedScrollHandler({
    onScroll: event => {
      scrollPosition.value = event.contentOffset.y;
    },
    onEndDrag: event => {
      const threshold = -100; // How far user needs to pull down to trigger refresh
      if (event.contentOffset.y < threshold) {
        runOnJS(onPullDown)();
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

  // checks if user starts searching if so we show results
  useEffect(() => {
    if (filteredQuestions.length > 0) {
      setShowSearchData(true);
    } else {
      setShowSearchData(false);
    }
  }, [filteredQuestions]);
  const searchInputRef = useRef(null);

  const scrollToInput = () => {
    const scrollHeight = 35;
    requestAnimationFrame(() => {
      scrollAnimatedRef.current.scrollTo({ y: scrollHeight, animated: true });
    });
  };

  const flatListStyle = useAnimatedStyle(() => {
    return {
      flex: 1,
      paddingBottom: 200,

      transform: [{ translateY: loadingOffset.value }],
    };
  });

  const combinedOpacity = useDerivedValue(() => {
    // Assuming the use of some condition to decide which to use. You might need to introduce some logic here.
    // Let's say we decide based on which of the two is currently not zero or whichever was last updated.

    if (-scrollPosition.value > 0 && loadingOffset.value === 0) {
      return interpolate(
        -scrollPosition.value,
        [0, loadingValue],
        [0, 1],
        Extrapolation.CLAMP,
      );
    } else {
      return interpolate(
        loadingOffset.value,
        [loadingValue, 0], // Reverse the range for decreasing effect
        [1, 0],
        Extrapolation.CLAMP,
      );
    }
  });

  const animatedIndicatorStyle = useAnimatedStyle(() => {
    // Compute opacity based on the negative scroll position to a minimum of 0 (not visible) and maximum of 1 (fully visible)
    const scale = interpolate(
      -scrollPosition.value,
      [0, loadingValue], // Assuming 100 is the point at which full opacity should be reached
      [1.2, 1.4],
      Extrapolation.CLAMP,
    );

    return {
      opacity: combinedOpacity.value, // Use spring for smoother transitions
      transform: [{ scale: scale }], // Scale based on opacity for a dynamic effect
    };
  });

  const onCardPress = (item: faqProps, index: number) => {
    navigation.navigate('Details', { item });
    setShowLoading(true);
  };

  // Render the app
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <Animated.View style={[styles.refresh, animatedIndicatorStyle]}>
        <BouncingCircles />
      </Animated.View>
      {/* todo make top smaller */}
      <Animated.ScrollView
        ref={scrollAnimatedRef}
        onScroll={scrollHandler}
        data={data?.questions}
        scrollEventThrottle={16} //60fps
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          marginTop: normalize(5),
          backgroundColor: theme.WHITE,
          //   height: ListHeight + data?.questions?.length * NiceOffset,
          //   marginBottom: normalize(200),
          //   flex: 1,
          //   height: '100%',
          paddingBottom: 200,

          flexGrow: 1,
        }}
        style={flatListStyle} // apply the animated style here
      >
        <View
          style={{
            marginHorizontal: normalize(10),
            marginTop: normalize(20),
          }}>
          {/* <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              alignItems: 'center',
            }}>
            <Image
              source={require('../../assets/logo2.png')}
              style={
                {
                  // alignSelf: 'flex-start',
                  // resizeMode: 'fit-content',
                  // marginBottom: normalize(10),
                }
              }
            />
            <Text
              style={{
                width: '50%',
                alignSelf: 'center',
                textAlign: 'center',
                fontSize: normalize(18),
                fontWeight: 'bold',
                color: theme.DARK_BLUE,
              }}>
              {data.category}
            </Text>
          </View> */}

          {/* <Text
            style={{
              marginTop: normalize(10),
              textAlign: 'left',
              fontSize: normalize(16),
              zIndex: -1,
            }}>
            {FAQ_DATA.description}
          </Text> */}

          {/* <PressableScale
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
          </PressableScale> */}

          {/* {showMore && (
            <Text
              style={{
                marginTop: normalize(10),
                textAlign: 'left',
                fontSize: normalize(14),
              }}>
              {FAQ_DATA.description2}
            </Text>
          )} */}
        </View>
        {/* search component */}
        <SearchComponent
          onFocused={() => scrollToInput()}
          questionsData={filteredQuestions}
          constantData={data.questions}
          setSearchQuestions={setFilteredQuestions}
          setIsLoadingQuestions={setLoading}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
        />

        {/* list Item of category showing name and icon arrow for next */}
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginHorizontal: normalize(20),
            marginTop: normalize(20),
          }}>
          <Text
            style={{
              fontSize: normalize(18),
              fontWeight: 'bold',
              color: theme.DARK_BLUE,
            }}>
            Questions
          </Text>
        </View>
        <View style={{ marginTop: normalize(0) }}>
          {filteredQuestions?.length === 0 ? (
            <EmptySearch />
          ) : (
            filteredQuestions?.map((item: faqProps, index: number) => (
              <ListItem
                key={index.toString()}
                item={item}
                index={index}
                loading={loading}
                scrollOffset={scrollOffset}
                onCardPress={onCardPress}
                isAccordion={true}
              />
            ))
          )}
        </View>
      </Animated.ScrollView>
    </View>
  );
};

// Styles for the main application component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.WHITE,
  },

  refresh: {
    height: 90,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 25,
    left: 0,
    right: 0,
    paddingTop: normalize(20),
    paddingBottom: normalize(20),
  },
});

// Export the main application component
export { FaqDetails };
