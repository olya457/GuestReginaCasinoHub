import React from 'react';
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextStyle,
  View,
  ViewStyle,
} from 'react-native';
import {colors, fonts} from '../styleGuide/styleTokens';

type ButtonProps = {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'outline' | 'danger' | 'blue' | 'ghost';
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

export function AppButton({
  title,
  onPress,
  variant = 'primary',
  style,
  textStyle,
}: ButtonProps) {
  const variantButtonStyle = {
    primary: styles.primaryButton,
    outline: styles.outlineButton,
    danger: styles.dangerButton,
    blue: styles.blueButton,
    ghost: styles.ghostButton,
  }[variant];
  const variantTextStyle = {
    primary: styles.primaryText,
    outline: styles.outlineText,
    danger: styles.dangerText,
    blue: styles.blueText,
    ghost: styles.ghostText,
  }[variant];

  return (
    <Pressable
      onPress={onPress}
      style={({pressed}) => [
        styles.button,
        variantButtonStyle,
        pressed && styles.pressed,
        style,
      ]}>
      <Text style={[styles.buttonText, variantTextStyle, textStyle]} numberOfLines={1}>
        {title}
      </Text>
    </Pressable>
  );
}

export function Badge({label, tone = 'gold'}: {label: string; tone?: 'gold' | 'green' | 'blue'}) {
  return (
    <View style={[styles.badge, tone === 'green' && styles.greenBadge, tone === 'blue' && styles.blueBadge]}>
      <Text style={[styles.badgeText, tone === 'green' && styles.greenBadgeText, tone === 'blue' && styles.blueBadgeText]}>
        {label}
      </Text>
    </View>
  );
}

export function PageHeading({
  title,
  subtitle,
  right,
}: {
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.titleRow}>
      <View style={styles.titleCopy}>
        <Text style={styles.headingTitle}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
      {right}
    </View>
  );
}

export function BackButton({label, onPress}: {label: string; onPress: () => void}) {
  return (
    <Pressable onPress={onPress} style={styles.backButton}>
      <Text style={styles.backText}>{'<'} {label}</Text>
    </Pressable>
  );
}

export function SearchField({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (value: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.searchWrap}>
      <Text style={styles.searchIcon}>⌕</Text>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.mutedDark}
        style={styles.searchInput}
        selectionColor={colors.gold}
      />
    </View>
  );
}

export function EmptyState({title, body}: {title: string; body: string}) {
  return (
    <View style={styles.empty}>
      <Text style={styles.emptyTitle}>{title}</Text>
      <Text style={styles.emptyBody}>{body}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    minHeight: 46,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 16,
  },
  primaryButton: {
    backgroundColor: colors.gold,
  },
  outlineButton: {
    borderWidth: 1,
    borderColor: colors.gold,
    backgroundColor: 'transparent',
  },
  dangerButton: {
    backgroundColor: colors.red,
  },
  blueButton: {
    backgroundColor: colors.blue,
  },
  ghostButton: {
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },
  pressed: {
    opacity: 0.72,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '800',
  },
  primaryText: {
    color: '#06100a',
  },
  outlineText: {
    color: colors.gold,
  },
  dangerText: {
    color: colors.white,
  },
  blueText: {
    color: colors.white,
  },
  ghostText: {
    color: colors.muted,
  },
  badge: {
    borderWidth: 1,
    borderColor: colors.goldDeep,
    backgroundColor: 'rgba(215,184,70,0.15)',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  greenBadge: {
    borderColor: '#116b3c',
    backgroundColor: 'rgba(24,180,93,0.18)',
  },
  blueBadge: {
    borderColor: '#1d7096',
    backgroundColor: 'rgba(47,168,223,0.18)',
  },
  badgeText: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: '800',
  },
  greenBadgeText: {
    color: colors.green,
  },
  blueBadgeText: {
    color: colors.blue,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 18,
  },
  titleCopy: {
    flex: 1,
  },
  headingTitle: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 27,
    fontWeight: '800',
  },
  subtitle: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginTop: 6,
  },
  backButton: {
    paddingVertical: 10,
    alignSelf: 'flex-start',
  },
  backText: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: '800',
  },
  searchWrap: {
    height: 52,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 13,
    gap: 10,
    marginBottom: 16,
  },
  searchIcon: {
    color: colors.muted,
    fontSize: 22,
    lineHeight: 22,
  },
  searchInput: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    padding: 0,
  },
  empty: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: 'center',
    marginTop: 22,
  },
  emptyTitle: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 22,
    fontWeight: '800',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyBody: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: 'center',
  },
});
