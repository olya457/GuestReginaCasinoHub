import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {colors} from '../constants/theme';
import type {PlaceItem} from '../types/app';

type MapModule = {
  default: React.ComponentType<any>;
  Marker: React.ComponentType<any>;
};

export function PlaceMap({place}: {place: PlaceItem}) {
  const mapModule = React.useMemo<MapModule | null>(() => {
    try {
      return require('react-native-maps') as MapModule;
    } catch {
      return null;
    }
  }, []);

  if (!mapModule) {
    return (
      <View style={[styles.map, styles.fallback]}>
        <Text style={styles.fallbackText}>
          {place.coordinates.latitude.toFixed(4)}, {place.coordinates.longitude.toFixed(4)}
        </Text>
      </View>
    );
  }

  const MapView = mapModule.default;
  const Marker = mapModule.Marker;

  return (
    <View style={styles.map}>
      <MapView
        style={StyleSheet.absoluteFillObject}
        initialRegion={{
          latitude: place.coordinates.latitude,
          longitude: place.coordinates.longitude,
          latitudeDelta: 0.018,
          longitudeDelta: 0.018,
        }}
        scrollEnabled={false}
        pitchEnabled={false}
        rotateEnabled={false}
        zoomEnabled={false}>
        <Marker coordinate={place.coordinates} title={place.title} description={place.address} />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  map: {
    height: 170,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  fallbackText: {
    color: colors.gold,
    fontWeight: '800',
  },
});
