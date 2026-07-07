import React from 'react';
import {ActivityIndicator, Image, ImageBackground, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {colors, fonts} from '../styleGuide/styleTokens';

export function WelcomeCurtain() {
  return (
    <ImageBackground source={images.onboardingAccess} resizeMode="cover" style={styles.root}>
      <View style={styles.overlay} />
      <View style={styles.center}>
        <Image source={images.logo} resizeMode="contain" style={styles.logo} />
        <Text style={styles.title}>CONCIERGE REGINA</Text>
        <Text style={styles.kicker}>VISIT CASINO</Text>
        <Text style={styles.status}>Preparing Your Regina Visit...</Text>
        <ActivityIndicator color={colors.gold} size="large" style={styles.loader} />
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
    justifyContent: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,8,6,0.58)',
  },
  center: {
    alignItems: 'center',
    paddingHorizontal: 28,
  },
  logo: {
    width: 300,
    height: 96,
    maxWidth: '86%',
  },
  title: {
    color: colors.gold,
    fontFamily: fonts.heading,
    fontSize: 30,
    fontWeight: '800',
    marginTop: 28,
    letterSpacing: 0,
  },
  kicker: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 2,
    marginTop: 8,
  },
  status: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 34,
    textAlign: 'center',
  },
  loader: {
    marginTop: 24,
  },
});
