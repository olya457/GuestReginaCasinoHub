import React from 'react';
import {ImageBackground, Pressable, StyleSheet, Text, View} from 'react-native';
import {images} from '../assets';
import {VisitShell} from '../kit/VisitShell';
import {AppButton, Badge, PageHeading} from '../kit/controls';
import {colors} from '../styleGuide/styleTokens';
import {events} from '../conciergeDesk/liveEvents';
import {useVisitMemory} from '../guestMemory/VisitMemory';

type ArrivalAccessDeskProps = {
  onOpenEvent: (eventId: string) => void;
};

const qrRows = [
  '111001101',
  '100010001',
  '101110101',
  '100000101',
  '111010111',
  '001110000',
  '110011010',
  '100000011',
  '111101111',
];

function GuestCodeCard() {
  return (
    <View style={styles.codeCard}>
      <View style={styles.codeHeader}>
        <View>
          <Text style={styles.cardTitle}>Guest Identification Code</Text>
          <Text style={styles.cardSub}>Show to staff when access confirmation is required</Text>
        </View>
        <Badge label="● Active" tone="green" />
      </View>
      <View style={styles.qr}>
        {qrRows.map((row, rowIndex) => (
          <View key={`${row}-${rowIndex}`} style={styles.qrRow}>
            {row.split('').map((cell, cellIndex) => (
              <View
                key={`${rowIndex}-${cellIndex}`}
                style={[styles.qrCell, cell === '1' && styles.qrCellOn]}
              />
            ))}
          </View>
        ))}
      </View>
      <Text style={styles.guestCode}>RCG-2026-7841-XKPM</Text>
    </View>
  );
}

export function ArrivalAccessDesk({onOpenEvent}: ArrivalAccessDeskProps) {
  const {savedEventIds, toggleSavedEvent} = useVisitMemory();

  return (
    <VisitShell withTabBar>
      <ImageBackground source={images.onboardingAccess} resizeMode="cover" style={styles.hero}>
        <View style={styles.heroShade} />
        <PageHeading
          title="Welcome to Regina"
          subtitle="Manage access, services, events, and your visit from one place."
        />
      </ImageBackground>
      <GuestCodeCard />
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Today's Events</Text>
        <Badge label={`${events.length} events`} />
      </View>
      {events.map((event, index) => {
        const saved = savedEventIds.includes(event.id);
        return (
          <View key={event.id} style={styles.eventCard}>
            <Pressable
              onPress={() => onOpenEvent(event.id)}
              style={[
                styles.eventTop,
                index % 3 === 1 && styles.eventTopWarm,
                index % 3 === 2 && styles.eventTopGreen,
              ]}>
              <View style={styles.eventTitleRow}>
                <Text style={styles.eventTitle} numberOfLines={2}>
                  {event.title}
                </Text>
                <Badge label={event.tag} />
              </View>
            </Pressable>
            <View style={styles.eventBody}>
              <Text style={styles.eventMeta}>
                {event.time} - {event.location}
              </Text>
              <View style={styles.eventActions}>
                <AppButton
                  title="View Details"
                  variant="outline"
                  onPress={() => onOpenEvent(event.id)}
                  style={styles.eventButton}
                />
                <AppButton
                  title={saved ? 'Saved' : 'Save'}
                  variant="ghost"
                  onPress={() => toggleSavedEvent(event.id)}
                  style={styles.eventButton}
                  textStyle={saved && styles.savedText}
                />
              </View>
            </View>
          </View>
        );
      })}
    </VisitShell>
  );
}

const styles = StyleSheet.create({
  hero: {
    minHeight: 150,
    borderRadius: 22,
    overflow: 'hidden',
    padding: 20,
    justifyContent: 'flex-end',
    marginBottom: 18,
  },
  heroShade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,10,6,0.62)',
  },
  codeCard: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    alignItems: 'center',
  },
  codeHeader: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 12,
    marginBottom: 16,
  },
  cardTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '800',
  },
  cardSub: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 17,
    marginTop: 4,
    maxWidth: 210,
  },
  qr: {
    width: 128,
    height: 128,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.borderSoft,
    backgroundColor: '#06100a',
    padding: 12,
    justifyContent: 'space-between',
  },
  qrRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qrCell: {
    width: 9,
    height: 9,
    backgroundColor: 'transparent',
  },
  qrCellOn: {
    backgroundColor: colors.gold,
  },
  guestCode: {
    color: colors.mutedDark,
    letterSpacing: 2,
    fontSize: 11,
    marginTop: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 20,
    marginBottom: 12,
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: '900',
  },
  eventCard: {
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginBottom: 12,
  },
  eventTop: {
    minHeight: 66,
    paddingHorizontal: 14,
    paddingVertical: 13,
    backgroundColor: '#0c1d38',
    justifyContent: 'center',
  },
  eventTopWarm: {
    backgroundColor: '#2b1508',
  },
  eventTopGreen: {
    backgroundColor: '#17271a',
  },
  eventTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  eventTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
    flex: 1,
  },
  eventBody: {
    padding: 14,
  },
  eventMeta: {
    color: colors.muted,
    fontSize: 13,
    marginBottom: 11,
  },
  eventActions: {
    flexDirection: 'row',
    gap: 8,
  },
  eventButton: {
    flex: 1,
    minHeight: 40,
  },
  savedText: {
    color: colors.green,
  },
});
