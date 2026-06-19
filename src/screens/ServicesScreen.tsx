import React, {useMemo, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, Badge, ScreenTitle, SearchField} from '../components/ui';
import {colors} from '../constants/theme';
import {services} from '../data/services';
import type {ServiceItem} from '../types/app';

type ServicesScreenProps = {
  onOpenService: (serviceId: string) => void;
  onOpenReservations: () => void;
};

function ServiceCard({
  service,
  onOpen,
}: {
  service: ServiceItem;
  onOpen: (serviceId: string) => void;
}) {
  return (
    <View style={styles.card}>
      <Pressable onPress={() => onOpen(service.id)} style={styles.cardTop}>
        <View style={styles.emojiBox}>
          <Text style={styles.emoji}>{service.emoji}</Text>
        </View>
        <View style={styles.cardTitleWrap}>
          <Text style={styles.cardTitle}>{service.title}</Text>
          <Badge label={service.tag} />
        </View>
      </Pressable>
      <View style={styles.cardBody}>
        <Text style={styles.description} numberOfLines={3}>
          {service.description}
        </Text>
        <AppButton title="Reserve" onPress={() => onOpen(service.id)} style={styles.reserve} />
      </View>
    </View>
  );
}

export function ServicesScreen({onOpenService, onOpenReservations}: ServicesScreenProps) {
  const [query, setQuery] = useState('');
  const filteredServices = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) {
      return services;
    }
    return services.filter(
      service =>
        service.title.toLowerCase().includes(normalized) ||
        service.tag.toLowerCase().includes(normalized) ||
        service.description.toLowerCase().includes(normalized),
    );
  }, [query]);

  return (
    <ScreenScaffold withTabBar>
      <ScreenTitle
        title="Reserve Services"
        right={
          <AppButton
            title="My Bookings"
            variant="outline"
            onPress={onOpenReservations}
            style={styles.bookingButton}
          />
        }
      />
      <SearchField value={query} onChangeText={setQuery} placeholder="Search services..." />
      {filteredServices.map(service => (
        <ServiceCard key={service.id} service={service} onOpen={onOpenService} />
      ))}
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  bookingButton: {
    minHeight: 38,
    paddingHorizontal: 12,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    overflow: 'hidden',
    marginBottom: 12,
  },
  cardTop: {
    minHeight: 68,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 13,
    paddingVertical: 12,
    backgroundColor: colors.surfaceSoft,
  },
  emojiBox: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.05)',
  },
  emoji: {
    fontSize: 21,
  },
  cardTitleWrap: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 5,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  cardBody: {
    padding: 14,
  },
  description: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
  },
  reserve: {
    marginTop: 12,
  },
});
