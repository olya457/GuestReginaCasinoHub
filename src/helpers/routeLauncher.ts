import {Linking, Platform} from 'react-native';
import type {PlaceItem} from '../domain/visitTypes';

export function openDirections(place: PlaceItem) {
  const {latitude, longitude} = place.coordinates;
  const label = encodeURIComponent(place.title);
  const url =
    Platform.OS === 'ios'
      ? `http://maps.apple.com/?ll=${latitude},${longitude}&q=${label}`
      : `geo:${latitude},${longitude}?q=${latitude},${longitude}(${label})`;

  Linking.openURL(url).catch(() => undefined);
}
