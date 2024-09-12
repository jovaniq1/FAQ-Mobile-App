import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useAtom } from 'jotai';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Image, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { App } from './src';
import { ToastProvider } from './src/components/Toast/toast-manager';
import { CartButton } from './src/components/Cart/CartButton';
import { showCartAtom } from './src/cartStore';
import { PinchToAccess } from './src/components/Pinch/PinchToAccess';
import { FaqDetails } from './src/components/FaqDetails/FaqDetails';
import theme, { normalize } from './src/theme/theme';
import { PressableScale } from './src/components/Toast/components/pressable-scale';

const Stack = createStackNavigator();

const HeaderComponent = ({ props }) => (
  <View
    style={{
      height: normalize(120),
      backgroundColor: theme.DARK_BLUE,
      justifyContent: 'flex-end',
      paddingBottom: normalize(5),
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: normalize(20),
    }}>
    {/* Icon on the left */}
    <PressableScale
      onPress={() => props.navigation.goBack()}
      style={{
        marginTop: normalize(45),
        zIndex: 1,
      }}>
      <MaterialCommunityIcons
        name="arrow-left"
        size={normalize(30)}
        color={theme.WHITE}
      />
    </PressableScale>

    {/* Title in the center */}
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        marginTop: normalize(45),
      }}>
      <Text
        style={{
          fontSize: normalize(20),
          fontWeight: 'bold',
          color: theme.WHITE,
        }}>
        {props.route.params.item.category}
      </Text>
    </View>
    <Image
      source={require('./src/assets/logo2.png')}
      style={{
        resizeMode: 'contain',
        width: normalize(50),
        height: normalize(50),
        backgroundColor: theme.WHITE,
        padding: normalize(20),
        borderRadius: normalize(10),
        marginTop: normalize(45),
      }}
    />
  </View>
);
const AppContainer = () => {
  const [showCart] = useAtom(showCartAtom);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <ToastProvider>
          {showCart && <CartButton />}
          <PinchToAccess>
            <Stack.Navigator>
              <Stack.Screen
                name="Home"
                component={App}
                options={{ headerShown: false }} // Disable header for Home
              />
              <Stack.Screen
                name="Details"
                component={FaqDetails}
                // create nice header for Details
                options={{
                  header: props => <HeaderComponent props={props} />,
                }}
              />
            </Stack.Navigator>
          </PinchToAccess>
        </ToastProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

// eslint-disable-next-line import/no-default-export
export default AppContainer;
