import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, BackButton, Badge} from '../components/ui';
import {colors, fonts} from '../constants/theme';
import {events} from '../data/events';
import {useAppStore} from '../state/AppStore';

type EventDetailScreenProps = {
  eventId: string;
  onBack: () => void;
};

export function EventDetailScreen({eventId, onBack}: EventDetailScreenProps) {
  const event = events.find(item => item.id === eventId) ?? events[0];
  const {savedEventIds, toggleSavedEvent} = useAppStore();
  const saved = savedEventIds.includes(event.id);

  return (
    <ScreenScaffold>
      <BackButton label="Back" onPress={onBack} />
      <View style={styles.divider} />
      <View style={styles.titleRow}>
        <Text style={styles.title}>{event.title}</Text>
        <Badge label={event.tag} />
      </View>
      <Text style={styles.meta}>⏱ {event.time}     📍 {event.location}</Text>
      <Text style={styles.description}>{event.description}</Text>
      <AppButton
        title={saved ? 'Saved to Visit' : 'Save Event'}
        onPress={() => toggleSavedEvent(event.id)}
        variant={saved ? 'ghost' : 'primary'}
        style={styles.save}
        textStyle={saved && styles.savedText}
      />
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginHorizontal: -20,
    marginBottom: 34,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
  },
  title: {
    flex: 1,
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 29,
    lineHeight: 36,
    fontWeight: '800',
  },
  meta: {
    color: colors.muted,
    fontSize: 14,
    marginTop: 12,
  },
  description: {
    color: colors.muted,
    fontSize: 16,
    lineHeight: 27,
    marginTop: 24,
  },
  save: {
    marginTop: 28,
  },
  savedText: {
    color: colors.green,
  },
});
