import React, { useEffect, useRef } from 'react';
import {
  View,
  ScrollView,
  Vibration,
  StyleSheet,
  Text,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useAtom } from 'jotai';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';

import {
  cartAtom,
  showCartAtom,
  useClearCart,
  useShowCartIcon,
} from '../../cartStore';
import theme, { normalize } from '../../theme/theme';
import { PressableScale } from '../Toast/components/pressable-scale';
import { useKeyboardVisible } from '../../hooks/useKeyboardVisible';

import { CartItem } from './CartItem'; // Import CartItem component
import AnimatedButton from './CheckoutAnimation';
import { BouncingCircles } from './BouncingCircles';

const CartList = ({ showToast }) => {
  const [isLoading, setIsLoading] = React.useState(false);
  const isKeyboardVisible = useKeyboardVisible();
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [id, setId] = React.useState('');
  const [showError, setShowError] = React.useState(false);
  const scrollViewRef = useRef(null);
  const nameInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const idInputRef = useRef(null);
  useEffect(() => {
    if (!isKeyboardVisible && scrollViewRef.current) {
      // setIsLoading(false);
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  }, [isKeyboardVisible]);

  const [cart] = useAtom(cartAtom);
  const handleShowCart = useShowCartIcon();

  // animation for opacity
  const opacity = useSharedValue(1);

  const showCompletedAnimation = () => {
    // check if total cost is greater than 0
    if (name === '' || email === '' || id === '') {
      setShowError(true);
      return;
    } else {
      setShowError(false);
    }

    setIsLoading(true);
    opacity.value = withTiming(0, { duration: 1000 }, () => {
      // runOnJS(handleClearCart)();
    });
    // check if all fields are filled with the refs

    // show cart button again
    setTimeout(() => {
      showToast({
        title: '',
        key: 'cartw',
        ToastOffset: theme.HEIGHT * 0.5,
        ToastHeight: 50,
        BaseSafeArea: 0.1,
        autodismiss: true,
        ToastStyles: {
          zIndex: 1000,
          width: theme.WIDTH,
          borderRadius: 120,
          height: theme.HEIGHT * 0.8,
          borderCurve: 'continuous',
          alignItems: 'center',

          justifyContent: 'center',
        },
        leading: () => <AnimatedButton />,
      });
      Vibration.vibrate(5000);
    }, 5000);
    setTimeout(() => {
      handleShowCart(true);
    }, 7500);
  };

  const rStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const scrollToInput = inputRef => {
    requestAnimationFrame(() => {
      inputRef.current.measureLayout(
        scrollViewRef.current,
        (x, y) => {
          scrollViewRef.current.scrollTo({ y: y - 100, animated: true });
        },
        error => {
          console.log('measureLayout failed', error);
        },
      );
    });
  };

  return (
    <View
      style={{
        width: '100%',
        height: '100%',
      }}>
      <View
        style={{
          paddingTop: normalize(20),
          paddingBottom: normalize(10),
          backgroundColor: theme.DARK_BLUE,
          borderTopEndRadius: normalize(10),
          borderTopStartRadius: normalize(10),
          paddingHorizontal: normalize(20),
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={require('../../assets/message.png')}
            style={styles.floatingBtn}
          />
          <View>
            <Text
              style={{
                fontSize: normalize(20),
                color: theme.WHITE,
                fontWeight: 'bold',
                textAlign: 'flex-start',
              }}>
              Apexus Answers Chat
            </Text>
            <Text
              style={{
                fontSize: normalize(12),
                fontWeight: 'bold',
                textAlign: 'flex-start',
                color: theme.GREY,
              }}>
              powered by Talkdesk
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        style={styles.container}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          height: theme.HEIGHT,
        }}>
        <View
          style={{
            backgroundColor: 'rgb(158, 161, 168)',
            padding: normalize(20),
          }}>
          <Text
            style={{
              fontSize: normalize(20),
              color: theme.WHITE,
              fontWeight: 'bold',
              textAlign: 'flex-start',
            }}>
            Welcome!
          </Text>
          <Text
            style={{
              marginTop: normalize(10),
              fontSize: normalize(14),
              fontWeight: 'bold',
              textAlign: 'flex-start',
              color: theme.WHITE,
            }}>
            Please fill out the form below to chat with Apexus Answers.
          </Text>
        </View>
        {showError && (
          <Text style={styles.errorText}>Please fill out all fields</Text>
        )}

        {isLoading && (
          <View
            style={{
              // flex: 1,
              zIndex: 20,
              position: 'absolute',
              left: 0,
              right: 0,
              bottom: theme.HEIGHT * 0.75,
            }}>
            <BouncingCircles />
          </View>
        )}
        <Animated.View style={[styles.textInputStyles, rStyle]}>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: normalize(16), fontWeight: 'bold' }}>
              Name
            </Text>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: 'bold',
                color: theme.RED_COLOR,
              }}>
              *
            </Text>
          </View>

          <TextInput
            ref={nameInputRef}
            onChangeText={(text: string) => setName(text)}
            value={name}
            style={styles.textInputStyle}
            placeholder="Type Name"
            keyboardType="default"
            returnKeyType="next"
            onSubmitEditing={() => {
              emailInputRef.current.focus();
            }}
            onFocus={() => scrollToInput(nameInputRef)}
          />
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: normalize(16), fontWeight: 'bold' }}>
              Email
            </Text>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: 'bold',
                color: theme.RED_COLOR,
              }}>
              *
            </Text>
          </View>
          <TextInput
            ref={emailInputRef}
            style={styles.textInputStyle}
            onChangeText={(text: string) => setEmail(text)}
            value={email}
            placeholder="Type Email"
            returnKeyType="next"
            onFocus={() => scrollToInput(emailInputRef)}
            onSubmitEditing={() => {
              idInputRef.current.focus();
            }}
          />

          <View style={{ flexDirection: 'row' }}>
            <Text style={{ fontSize: normalize(16), fontWeight: 'bold' }}>
              340BID
            </Text>
            <Text
              style={{
                fontSize: normalize(20),
                fontWeight: 'bold',
                color: theme.RED_COLOR,
              }}>
              *
            </Text>
          </View>
          <TextInput
            ref={idInputRef}
            onChangeText={(text: string) => setId(text)}
            value={id}
            style={styles.textInputStyle}
            returnKeyType="done"
            placeholder="Type 340BID"
            onFocus={() => scrollToInput(idInputRef)}
            onSubmitEditing={() => {
              showCompletedAnimation();
            }}
          />
        </Animated.View>
        <View style={styles.total}>
          <PressableScale
            onPress={() => {
              showCompletedAnimation();
            }}
            style={styles.button}>
            <Text style={styles.buttonAddToCartText}>
              {isLoading ? 'Loading' : 'Start Chat'}
            </Text>
          </PressableScale>
          <Text
            style={{
              fontSize: normalize(12),
              fontWeight: 'bold',
              alignSelf: 'center',
              textAlign: 'center',
              color: theme.GREY,
              marginHorizontal: normalize(20),
            }}>
            You can chat with an Apexus Answers specialist from 8am - 5pm CST
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: theme.HEIGHT,
    paddingBottom: normalize(400),
  },
  errorText: {
    fontSize: normalize(16),
    color: theme.RED_COLOR,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: normalize(15),
  },
  buttonAddToCartText: {
    color: theme.WHITE,
    alignSelf: 'center',
    fontSize: normalize(18),
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    padding: normalize(10),
    marginVertical: normalize(10),
    marginHorizontal: normalize(10),
    backgroundColor: theme.LIGHT_BLUE,
    borderRadius: normalize(10),
  },

  textInputStyles: {
    padding: normalize(10),
    margin: normalize(10),
  },

  total: { marginBottom: normalize(120) },
  floatingBtn: {
    height: normalize(40),
    width: normalize(40),
    borderRadius: normalize(10),
    justifyContent: 'center',
    color: theme.WHITE,
    fontSize: normalize(26),
    padding: normalize(5),
    alignItems: 'center',
    overflow: 'visible',
    marginRight: normalize(10),
  },
  textInputStyle: {
    backgroundColor: theme.WHITE,
    borderColor: theme.GREY,
    padding: normalize(10),
    borderRadius: normalize(5),
    borderWidth: 1,
    marginBottom: normalize(10),
  },
});

export { CartList };
