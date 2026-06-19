import React, {useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, ScreenTitle} from '../components/ui';
import {colors, fonts} from '../constants/theme';
import {useAppStore} from '../state/AppStore';
import type {ComfortSettings} from '../types/app';

const climateModes: ComfortSettings['climateMode'][] = ['Cool', 'Heat', 'Auto', 'Fan'];
const presets: {label: ComfortSettings['preset']; temp: number}[] = [
  {label: 'Sleep', temp: 19},
  {label: 'Comfort', temp: 22},
  {label: 'Energy', temp: 20},
];
const scenes: ComfortSettings['lightingScene'][] = [
  'Relax',
  'Work',
  'Sleep',
  'Bright',
  'Movie',
  'Romance',
];
const zones: ComfortSettings['zone'][] = ['Main Room', 'Bathroom', 'Entry', 'Bedside'];
const brightnessStops = [40, 55, 70, 85, 100];

export function ComfortScreen() {
  const {comfortSettings, updateComfortSettings} = useAppStore();
  const [tab, setTab] = useState<'Climate' | 'Lighting'>('Climate');
  const [draft, setDraft] = useState<ComfortSettings>(comfortSettings);
  const [notice, setNotice] = useState('');

  function updateDraft(next: Partial<ComfortSettings>) {
    setNotice('');
    setDraft(current => ({...current, ...next}));
  }

  function apply(label: string) {
    updateComfortSettings(draft);
    setNotice(label);
  }

  return (
    <ScreenScaffold withTabBar>
      <ScreenTitle title="Guest Comfort" />
      <View style={styles.segment}>
        {(['Climate', 'Lighting'] as const).map(item => (
          <Pressable
            key={item}
            onPress={() => setTab(item)}
            style={[styles.segmentButton, tab === item && styles.segmentActive]}>
            <Text style={[styles.segmentText, tab === item && styles.segmentTextActive]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {tab === 'Climate' ? (
        <View>
          <View style={styles.temperatureCard}>
            <Text style={styles.overline}>CURRENT TEMPERATURE</Text>
            <View style={styles.temperatureRow}>
              <Pressable
                onPress={() => updateDraft({temperature: Math.max(16, draft.temperature - 1)})}
                style={styles.roundButton}>
                <Text style={styles.roundText}>-</Text>
              </Pressable>
              <View style={styles.temperatureValue}>
                <Text style={styles.temperatureText}>{draft.temperature}</Text>
                <Text style={styles.temperatureUnit}>Celsius</Text>
              </View>
              <Pressable
                onPress={() => updateDraft({temperature: Math.min(28, draft.temperature + 1)})}
                style={styles.roundButton}>
                <Text style={styles.roundText}>+</Text>
              </Pressable>
            </View>
            <View style={styles.currentBadge}>
              <Text style={styles.currentBadgeText}>Current: 23 C</Text>
            </View>
          </View>
          <Text style={styles.label}>MODE</Text>
          <View style={styles.gridFour}>
            {climateModes.map(mode => (
              <AppButton
                key={mode}
                title={mode}
                variant={draft.climateMode === mode ? 'blue' : 'ghost'}
                onPress={() => updateDraft({climateMode: mode})}
                style={styles.gridButton}
              />
            ))}
          </View>
          <Text style={styles.label}>QUICK PRESETS</Text>
          <View style={styles.presetRow}>
            {presets.map(preset => (
              <Pressable
                key={preset.label}
                onPress={() =>
                  updateDraft({preset: preset.label, temperature: preset.temp})
                }
                style={[
                  styles.preset,
                  draft.preset === preset.label && styles.presetActive,
                ]}>
                <Text
                  style={[
                    styles.presetTitle,
                    draft.preset === preset.label && styles.presetTitleActive,
                  ]}>
                  {preset.label}
                </Text>
                <Text style={styles.presetTemp}>{preset.temp} C</Text>
              </Pressable>
            ))}
          </View>
          <AppButton
            title="Apply Climate Settings"
            variant="blue"
            onPress={() => apply('Climate settings saved')}
            style={styles.apply}
          />
        </View>
      ) : (
        <View>
          <View style={styles.brightnessCard}>
            <View>
              <Text style={styles.cardLabel}>Master Brightness</Text>
              <Text style={styles.cardHint}>Adjust overall light level</Text>
            </View>
            <Text style={styles.brightnessValue}>{draft.brightness}%</Text>
            <View style={styles.brightnessTrack}>
              <View style={[styles.brightnessFill, {width: `${draft.brightness}%`}]} />
              <View style={[styles.brightnessKnob, {left: `${draft.brightness - 4}%`}]} />
            </View>
            <View style={styles.brightnessStops}>
              {brightnessStops.map(stop => (
                <Pressable
                  key={stop}
                  onPress={() => updateDraft({brightness: stop})}
                  style={styles.brightnessStop}>
                  <Text
                    style={[
                      styles.stopText,
                      draft.brightness === stop && styles.stopTextActive,
                    ]}>
                    {stop}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>
          <Text style={styles.label}>LIGHTING SCENES</Text>
          <View style={styles.gridTwo}>
            {scenes.map(scene => (
              <AppButton
                key={scene}
                title={scene}
                variant={draft.lightingScene === scene ? 'outline' : 'ghost'}
                onPress={() => updateDraft({lightingScene: scene})}
                style={styles.wideButton}
              />
            ))}
          </View>
          <Text style={styles.label}>ZONE CONTROL</Text>
          <View style={styles.gridTwo}>
            {zones.map(zone => (
              <AppButton
                key={zone}
                title={zone}
                variant={draft.zone === zone ? 'outline' : 'ghost'}
                onPress={() => updateDraft({zone})}
                style={styles.wideButton}
              />
            ))}
          </View>
          <AppButton
            title="Apply Lighting Settings"
            onPress={() => apply('Lighting settings saved')}
            style={styles.apply}
          />
        </View>
      )}
      {notice ? <Text style={styles.notice}>{notice}</Text> : null}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  segment: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    flexDirection: 'row',
    padding: 4,
    marginBottom: 22,
  },
  segmentButton: {
    flex: 1,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  segmentActive: {
    backgroundColor: colors.gold,
  },
  segmentText: {
    color: colors.muted,
    fontWeight: '900',
  },
  segmentTextActive: {
    color: '#06100a',
  },
  temperatureCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 20,
    alignItems: 'center',
  },
  overline: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 2,
  },
  temperatureRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    marginTop: 18,
  },
  roundButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.surfaceElevated,
  },
  roundText: {
    color: colors.text,
    fontSize: 25,
  },
  temperatureValue: {
    minWidth: 96,
    alignItems: 'center',
  },
  temperatureText: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 48,
    fontWeight: '800',
    lineHeight: 52,
  },
  temperatureUnit: {
    color: colors.muted,
    fontSize: 12,
  },
  currentBadge: {
    borderRadius: 999,
    borderWidth: 1,
    borderColor: '#1d7096',
    backgroundColor: 'rgba(47,168,223,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    marginTop: 12,
  },
  currentBadgeText: {
    color: colors.blue,
    fontSize: 12,
    fontWeight: '800',
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 2,
    marginTop: 18,
    marginBottom: 9,
  },
  gridFour: {
    flexDirection: 'row',
    gap: 8,
  },
  gridButton: {
    flex: 1,
    minHeight: 42,
  },
  presetRow: {
    flexDirection: 'row',
    gap: 8,
  },
  preset: {
    flex: 1,
    minHeight: 58,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  presetActive: {
    borderColor: colors.green,
    backgroundColor: 'rgba(24,180,93,0.12)',
  },
  presetTitle: {
    color: colors.muted,
    fontWeight: '900',
    fontSize: 14,
  },
  presetTitleActive: {
    color: colors.green,
  },
  presetTemp: {
    color: colors.mutedDark,
    fontSize: 12,
    marginTop: 3,
  },
  apply: {
    marginTop: 18,
    minHeight: 52,
  },
  brightnessCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 18,
  },
  cardLabel: {
    color: colors.text,
    fontSize: 16,
    fontWeight: '900',
  },
  cardHint: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 4,
  },
  brightnessValue: {
    position: 'absolute',
    right: 18,
    top: 22,
    color: colors.gold,
    fontFamily: fonts.heading,
    fontSize: 36,
    fontWeight: '800',
  },
  brightnessTrack: {
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.borderSoft,
    marginTop: 24,
    overflow: 'visible',
  },
  brightnessFill: {
    height: 5,
    borderRadius: 999,
    backgroundColor: colors.gold,
  },
  brightnessKnob: {
    position: 'absolute',
    top: -6,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.gold,
  },
  brightnessStops: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 14,
  },
  brightnessStop: {
    minWidth: 38,
    alignItems: 'center',
  },
  stopText: {
    color: colors.mutedDark,
    fontSize: 11,
    fontWeight: '800',
  },
  stopTextActive: {
    color: colors.gold,
  },
  gridTwo: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  wideButton: {
    width: '48.5%',
    minHeight: 44,
  },
  notice: {
    color: colors.green,
    textAlign: 'center',
    marginTop: 16,
    fontWeight: '900',
  },
});
