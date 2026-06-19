import {Platform} from 'react-native';

export const colors = {
  canvas: '#020806',
  surface: '#0b1b12',
  surfaceElevated: '#102318',
  surfaceSoft: '#172b1f',
  surfaceWarm: '#23180f',
  border: '#213d2d',
  borderSoft: '#2b4936',
  text: '#f4efd9',
  muted: '#91a090',
  mutedDark: '#5d735f',
  gold: '#d7b846',
  goldDeep: '#7b681e',
  green: '#18b45d',
  blue: '#2fa8df',
  red: '#cf575a',
  blackGlass: 'rgba(0,0,0,0.52)',
  cardGlass: 'rgba(13,31,21,0.88)',
  white: '#ffffff',
};

export const fonts = {
  heading: Platform.select({ios: 'Georgia', android: 'serif', default: 'serif'}),
};

export const layout = {
  horizontal: 20,
  radius: 18,
  tabHeight: 74,
  tabBottom: Platform.OS === 'ios' ? 20 : 30,
  androidEdge: Platform.OS === 'android' ? 30 : 0,
};

export const shadow = Platform.select({
  ios: {
    shadowColor: '#000',
    shadowOpacity: 0.32,
    shadowRadius: 16,
    shadowOffset: {width: 0, height: 8},
  },
  android: {
    elevation: 10,
  },
  default: {},
});
