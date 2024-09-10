import { Dimensions } from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

export const scaleWidth = SCREEN_WIDTH / 375;
export const scaleHeight = SCREEN_HEIGHT / 812;
export const scale = Math.min(scaleWidth, scaleHeight);

export function normalize(size: number) {
  const newSize = Math.ceil(size * scale);
  return newSize;
}

export default {
  FONTS: {
    FONT_REGULAR: 'Roboto-Regular',
    FONT_MEDIUM: 'Roboto-Medium',
    FONT_BOLD: 'Roboto-Bold',
    FONT_LIGHT: 'Roboto-Light',
    MAIN_FONT: " 'Nunito Sans",
    MAIN_FONT2: 'sans-serif',
  },
  WIDTH: SCREEN_WIDTH,
  HEIGHT: SCREEN_HEIGHT,
  DARK_BLUE: '#001d60',
  LIGHT_BLUE: '#0ca0db',
  DARK_GREEN: '#004f44',
  LIGHT_GREEN: '#8dc448',
  RED_COLOR: '#ff0000',

  GREEN_COLOR_CONTAINER: '#004f44',
  GREEN_COLOR_CONTAINER_LIGHT_MEDIUM: '#00ba8b',
  SCREEN_HEADER_COLOR_GREEN: '#047857',
  SCREEN_BACKGROUND_COLOR_GREEN: '#089f7f',
  SCREEN_BACKGROUND_COLOR_GREEN_DARK: '#1b4332',
  BOTTOM_TABS_COLOR: '#008000',
  BOTTOM_TABS_COLOR_INACTIVE: '#202124',
  GREEN_COLOR_CONTAINER_LIGHT_WHITE: '#f2fff6',
  GREEN_COLOR_CONTAINER_LIGHT: '#99f3cd',
  GREEN_COLOR_CONTAINER_LIGHT_RGBA: 'rgba(153, 243, 205, ',
  NEW_GREEN_COLOR: '#006400',
  GREEN_COLOR_CONTAINER_OPACITY: 'rgba(0, 79, 68, 0.5)',
  GREEN_COLOR_CONTAINER_LIGHT_MEDIUM_OPACITY: 'rgba(0, 186, 139, 0.5)',
  SCREEN_HEADER_COLOR_GREEN_OPACITY: 'rgba(4, 120, 87, 0.5)',
  SCREEN_BACKGROUND_COLOR_GREEN_OPACITY: 'rgba(8, 159, 127, 0.6)',
  SCREEN_BACKGROUND_COLOR_GREEN_DARK_OPACITY: 'rgba(27, 67, 50, 0.5)',
  BOTTOM_TABS_COLOR_OPACITY: 'rgba(0, 128, 0, 0.8)',
  BOTTOM_TABS_COLOR_INACTIVE_OPACITY: 'rgba(32, 33, 36, 0.5)',
  GREEN_COLOR_CONTAINER_LIGHT_WHITE_OPACITY: 'rgba(242, 255, 246, 0.5)',
  GREEN_COLOR_CONTAINER_LIGHT_OPACITY: 'rgba(153, 243, 205, 0.5)',
  GREEN_OPACITY: 'rgba(134,218,20, 0.5)',

  WHITE: '#ffffff',
  GREY: '#808080',
  BLACK: '#111',
};
