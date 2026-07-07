import React, {useMemo, useState} from 'react';
import {
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import {images} from '../assets';
import {AppButton} from '../kit/controls';
import {colors, fonts, layout} from '../styleGuide/styleTokens';

type ArrivalBriefingProps = {
  onFinish: () => void;
};

const slides = [
  {
    title: 'Your Regina Guest Access',
    body: 'Keep your guest code, visit details, and venue access information in one elegant place.',
    image: images.onboardingAccess,
    icon: 'logo',
  },
  {
    title: 'Reserve Guest Services',
    body: 'Browse visitor services, request reservations, and manage your bookings with ease.',
    image: images.onboardingServices,
    icon: '🔔',
  },
  {
    title: 'Control Your Comfort',
    body: 'Adjust climate, lighting scenes, and comfort presets for selected guest areas or reserved spaces.',
    image: images.onboardingComfort,
    icon: '22',
  },
  {
    title: 'Discover Nearby Places',
    body: 'Find museums, landmarks, parks, restaurants, and city highlights worth visiting before or after your casino visit.',
    image: images.onboardingExplore,
    icon: '🧭',
  },
];

export function ArrivalBriefing({onFinish}: ArrivalBriefingProps) {
  const [index, setIndex] = useState(0);
  const {height} = useWindowDimensions();
  const compact = height < 760;
  const slide = slides[index];
  const isLast = index === slides.length - 1;

  const icon = useMemo(() => {
    if (slide.icon === 'logo') {
      return <Image source={images.logo} resizeMode="contain" style={styles.slideLogo} />;
    }
    return <Text style={styles.slideIconText}>{slide.icon}</Text>;
  }, [slide.icon]);

  return (
    <ImageBackground source={slide.image} resizeMode="cover" style={styles.root}>
      <View style={styles.overlay} />
      <View style={[styles.top, compact && styles.topCompact]}>
        <View style={[styles.iconWrap, slide.icon === '22' && styles.temperatureIcon]}>
          {icon}
          {slide.icon === '22' ? <Text style={styles.tempUnit}>Celsius</Text> : null}
        </View>
      </View>
      <View style={[styles.copy, compact && styles.copyCompact]}>
        <Text style={styles.title}>{slide.title}</Text>
        <Text style={styles.body}>{slide.body}</Text>
        <View style={styles.dots}>
          {slides.map((item, itemIndex) => (
            <View
              key={item.title}
              style={[styles.dot, itemIndex === index && styles.dotActive]}
            />
          ))}
        </View>
        <View style={styles.actions}>
          <Pressable onPress={onFinish} style={styles.skip}>
            <Text style={styles.skipText}>Skip</Text>
          </Pressable>
          <AppButton
            title={isLast ? 'Get Started' : 'Next >'}
            onPress={() => (isLast ? onFinish() : setIndex(current => current + 1))}
            style={styles.next}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.42)',
  },
  top: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: layout.androidEdge,
  },
  topCompact: {
    justifyContent: 'flex-start',
    paddingTop: 86 + layout.androidEdge,
  },
  iconWrap: {
    minWidth: 86,
    minHeight: 86,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(8,19,12,0.76)',
    borderWidth: 2,
    borderColor: 'rgba(215,184,70,0.78)',
  },
  temperatureIcon: {
    borderColor: colors.blue,
    borderWidth: 7,
    paddingHorizontal: 15,
  },
  slideLogo: {
    width: 180,
    height: 68,
  },
  slideIconText: {
    color: colors.gold,
    fontSize: 31,
    fontWeight: '900',
  },
  tempUnit: {
    color: colors.muted,
    fontSize: 11,
    marginTop: -4,
  },
  copy: {
    paddingHorizontal: 26,
    paddingBottom: 36 + layout.androidEdge,
  },
  copyCompact: {
    paddingBottom: 24 + layout.androidEdge,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 28,
    fontWeight: '800',
    lineHeight: 34,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14,
    maxWidth: 330,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    marginTop: 50,
    marginBottom: 18,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(47,168,223,0.28)',
  },
  dotActive: {
    width: 24,
    backgroundColor: colors.gold,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
  },
  skip: {
    flex: 0.36,
    height: 48,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'rgba(215,184,70,0.28)',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(4,12,8,0.28)',
  },
  skipText: {
    color: colors.muted,
    fontWeight: '800',
    fontSize: 14,
  },
  next: {
    flex: 1,
  },
});
