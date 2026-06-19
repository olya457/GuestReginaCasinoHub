import React, {useMemo, useState} from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, Badge, ScreenTitle, SearchField} from '../components/ui';
import {colors} from '../constants/theme';
import {placeCategories, places} from '../data/places';
import type {PlaceItem} from '../types/app';
import {openDirections} from '../utils/directions';

type ExploreScreenProps = {
  onOpenPlace: (placeId: string) => void;
};

function PlaceCard({
  place,
  onOpenPlace,
}: {
  place: PlaceItem;
  onOpenPlace: (placeId: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onOpenPlace(place.id)}>
        <ImageBackground source={place.image} resizeMode="cover" style={styles.cardImage}>
          <View style={styles.imageShade} />
          <Text style={styles.cardTitle}>{place.title}</Text>
          <Badge label={place.tag} />
        </ImageBackground>
      </Pressable>
      <View style={styles.cardBody}>
        <Text style={styles.description} numberOfLines={3}>
          {place.description}
        </Text>
        <View style={styles.actions}>
          <AppButton
            title="View Details"
            variant="outline"
            onPress={() => onOpenPlace(place.id)}
            style={styles.actionButton}
          />
          <AppButton
            title="Get Directions"
            variant="ghost"
            onPress={() => openDirections(place)}
            style={styles.actionButton}
          />
        </View>
      </View>
    </View>
  );
}

export function ExploreScreen({onOpenPlace}: ExploreScreenProps) {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<(typeof placeCategories)[number]>('All');
  const filteredPlaces = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return places.filter(place => {
      const matchesCategory = category === 'All' || place.category === category;
      const matchesQuery =
        !normalized ||
        place.title.toLowerCase().includes(normalized) ||
        place.tag.toLowerCase().includes(normalized) ||
        place.description.toLowerCase().includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  return (
    <ScreenScaffold withTabBar>
      <ScreenTitle title="Explore Regina" />
      <SearchField value={query} onChangeText={setQuery} placeholder="Search places..." />
      <View style={styles.filters}>
        {placeCategories.map(item => (
          <Pressable
            key={item}
            onPress={() => setCategory(item)}
            style={[styles.filter, category === item && styles.filterActive]}>
            <Text style={[styles.filterText, category === item && styles.filterTextActive]}>
              {item}
            </Text>
          </Pressable>
        ))}
      </View>
      {filteredPlaces.map(place => (
        <PlaceCard key={place.id} place={place} onOpenPlace={onOpenPlace} />
      ))}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filter: {
    minHeight: 34,
    paddingHorizontal: 14,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterActive: {
    backgroundColor: colors.gold,
    borderColor: colors.gold,
  },
  filterText: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: '800',
  },
  filterTextActive: {
    color: '#06100a',
  },
  card: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  cardImage: {
    minHeight: 86,
    padding: 14,
    justifyContent: 'flex-end',
    alignItems: 'flex-start',
  },
  imageShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.46)',
  },
  cardTitle: {
    color: colors.text,
    fontSize: 17,
    fontWeight: '900',
    marginBottom: 5,
  },
  cardBody: {
    padding: 14,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  actions: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 13,
  },
  actionButton: {
    flex: 1,
    minHeight: 40,
  },
});
