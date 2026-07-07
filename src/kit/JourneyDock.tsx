import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, layout, shadow} from '../styleGuide/styleTokens';
import type {TabKey} from '../domain/visitTypes';

const tabs: {key: TabKey; label: string; icon: string}[] = [
  {key: 'access', label: 'Access', icon: '🔑'},
  {key: 'assistant', label: 'Assistant', icon: '💬'},
  {key: 'services', label: 'Services', icon: '🔔'},
  {key: 'comfort', label: 'Comfort', icon: '🌡️'},
  {key: 'explore', label: 'Explore', icon: '🧭'},
];

export function JourneyDock({
  activeTab,
  onChange,
}: {
  activeTab: TabKey;
  onChange: (tab: TabKey) => void;
}) {
  return (
    <View style={styles.wrap} pointerEvents="box-none">
      <View style={styles.panel}>
        {tabs.map(tab => {
          const active = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              onPress={() => onChange(tab.key)}
              style={({pressed}) => [styles.tab, pressed && styles.pressed]}>
              <View style={[styles.iconBubble, active && styles.iconBubbleActive]}>
                <Text style={styles.icon}>{tab.icon}</Text>
              </View>
              <Text style={[styles.label, active && styles.labelActive]} numberOfLines={1}>
                {tab.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    position: 'absolute',
    left: 16,
    right: 16,
    bottom: layout.tabBottom,
  },
  panel: {
    minHeight: layout.tabHeight,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: 'rgba(12,29,19,0.96)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 8,
    paddingVertical: 8,
    ...shadow,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  pressed: {
    opacity: 0.72,
  },
  iconBubble: {
    width: 36,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconBubbleActive: {
    backgroundColor: 'rgba(215,184,70,0.18)',
    borderWidth: 1,
    borderColor: 'rgba(215,184,70,0.36)',
  },
  icon: {
    fontSize: 18,
  },
  label: {
    color: colors.mutedDark,
    fontSize: 10,
    fontWeight: '800',
  },
  labelActive: {
    color: colors.gold,
  },
});
