import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {ReginaMapPanel} from '../kit/ReginaMapPanel';
import {VisitShell} from '../kit/VisitShell';
import {AppButton, BackButton, Badge} from '../kit/controls';
import {colors, fonts} from '../styleGuide/styleTokens';
import {places} from '../conciergeDesk/cityHighlights';
import {useVisitMemory} from '../guestMemory/VisitMemory';
import {openDirections} from '../helpers/routeLauncher';

type CityPlaceStoryProps = {
  placeId: string;
  onBack: () => void;
};

export function CityPlaceStory({placeId, onBack}: CityPlaceStoryProps) {
  const place = places.find(item => item.id === placeId) ?? places[0];
  const {savedPlaceIds, toggleSavedPlace} = useVisitMemory();
  const saved = savedPlaceIds.includes(place.id);

  return (
    <VisitShell>
      <BackButton label="Back to Explore" onPress={onBack} />
      <Image source={place.image} resizeMode="cover" style={styles.image} />
      <View style={styles.titleRow}>
        <Text style={styles.title}>{place.title}</Text>
        <Badge label={place.tag} />
      </View>
      <Text style={styles.description}>{place.description}</Text>
      <View style={styles.infoBlock}>
        <Text style={styles.infoText}>📍 {place.address}</Text>
        <Text style={styles.infoText}>⏱ Suggested visit: {place.suggestedVisit}</Text>
        <Text style={styles.infoText}>⭐ Best for: {place.bestFor}</Text>
      </View>
      <Text style={styles.tip}>{place.tip}</Text>
      <ReginaMapPanel place={place} />
      <View style={styles.actions}>
        <AppButton
          title={saved ? 'Saved Place' : 'Save Place'}
          variant={saved ? 'ghost' : 'outline'}
          onPress={() => toggleSavedPlace(place.id)}
          style={styles.actionButton}
          textStyle={saved && styles.savedText}
        />
        <AppButton
          title="Get Directions"
          variant="blue"
          onPress={() => openDirections(place)}
          style={styles.actionButton}
        />
      </View>
    </VisitShell>
  );
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 164,
    borderRadius: 18,
    marginTop: 18,
    marginBottom: 20,
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
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 12,
  },
  infoBlock: {
    gap: 10,
    marginVertical: 20,
  },
  infoText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  tip: {
    color: colors.text,
    fontSize: 14,
    lineHeight: 22,
    borderLeftWidth: 3,
    borderLeftColor: colors.gold,
    paddingLeft: 12,
    marginBottom: 18,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  actionButton: {
    flex: 1,
  },
  savedText: {
    color: colors.green,
  },
});
