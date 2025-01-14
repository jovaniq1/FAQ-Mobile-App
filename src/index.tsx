import { StyleSheet, View, Text, Button, StatusBar, Image } from 'react-native';
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
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { ListItem } from './components/ListItem/ListItem';
import type { faqProps } from './constants/constants';
import theme, { normalize } from './theme/theme';
import { FAQ_DATA } from './constants/constants';
import { PressableScale } from './components/Toast/components/pressable-scale';
import { BouncingCircles } from './components/Cart/BouncingCircles';
import { SearchComponent } from './components/SearchComponent/SearchComponent';
import EmptySearch from './components/FaqDetails/EmptySearch';

// Constants for list item height, margin, and additional measurements
const ListItemHeight = 80;
const Margin = 10;
const FullListItemHeight = ListItemHeight + Margin;

// Calculating total list height based on the number of items
const ListHeight = FullListItemHeight * 15;

// Constants for list margin top and a nice offset
const ListMarginTop = 20;

const NiceOffset = 300;

const refreshingHeight = 60;

// Main application component
const App = ({ navigation }) => {
  // Reference for animated flat list
  const scrollAnimatedRef = useAnimatedRef<Animated.FlatList<number>>();
  const [loading, setLoading] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const allQuestions = FAQ_DATA.faq?.map(category => category.questions).flat();

  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showSearchData, setShowSearchData] = useState(false);

  const scrollOffset = useScrollViewOffset(scrollAnimatedRef as any);

  const scrollPosition = useSharedValue(0);
  const loadingOffset = useSharedValue(0);
  const onPullDown = () => {
    setLoading(true);
    setSearchQuery('');
    setShowSearchData(false);

    setFilteredQuestions([]);
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

  //

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
    }
  }, [filteredQuestions]);
  const searchInputRef = useRef(null);

  const scrollToInput = () => {
    const scrollHeight = showMore ? 480 : 330;
    requestAnimationFrame(() => {
      scrollAnimatedRef.current.scrollTo({ y: scrollHeight, animated: true });
    });
  };

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
    navigation.navigate('Details', { item });
    setShowLoading(true);
  };

  // Render the app
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />

      <Animated.ScrollView
        ref={scrollAnimatedRef}
        onScroll={scrollHandler}
        data={FAQ_DATA.faq}
        scrollEventThrottle={16} //60fps
        showsVerticalScrollIndicator={true}
        contentContainerStyle={{
          marginTop: ListMarginTop,
          backgroundColor: theme.WHITE,
          height: showMore
            ? ListHeight + NiceOffset + NiceOffset
            : ListHeight + NiceOffset,
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
        <SearchComponent
          onFocused={() => scrollToInput()}
          questionsData={allQuestions}
          constantData={allQuestions}
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
          <Text style={{ fontSize: normalize(18), fontWeight: 'bold' }}>
            {showSearchData ? 'Questions' : 'Categories'}
          </Text>
        </View>
        <View style={{ marginTop: normalize(0) }}>
          {showSearchData ? (
            filteredQuestions.length === 0 ? (
              <EmptySearch />
            ) : (
              filteredQuestions.map((item: faqProps, index: number) => (
                <ListItem
                  key={index.toString()}
                  item={item}
                  index={index}
                  loading={loading}
                  isAccordion={true}
                  scrollOffset={scrollOffset}
                  onCardPress={onCardPress}
                />
              ))
            )
          ) : (
            FAQ_DATA.faq?.map((item: faqProps, index: number) => (
              <ListItem
                key={index.toString()}
                item={item}
                index={index}
                loading={loading}
                scrollOffset={scrollOffset}
                onCardPress={onCardPress}
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
    height: refreshingHeight,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 5,
    left: 0,
    right: 0,
    zIndex: 20,
    // paddingTop: normalize(0),
  },
});

// Export the main application component
export { App };
