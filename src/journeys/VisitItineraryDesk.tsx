import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {ActionSheetDock} from '../kit/ActionSheetDock';
import {VisitShell} from '../kit/VisitShell';
import {AppButton, BackButton, Badge, EmptyState} from '../kit/controls';
import {colors, fonts} from '../styleGuide/styleTokens';
import {useVisitMemory} from '../guestMemory/VisitMemory';
import type {ReservationItem} from '../domain/visitTypes';

type VisitItineraryDeskProps = {
  onBack: () => void;
};

export function VisitItineraryDesk({onBack}: VisitItineraryDeskProps) {
  const {reservations, cancelReservation} = useVisitMemory();
  const [selected, setSelected] = useState<ReservationItem | null>(null);

  return (
    <VisitShell>
      <BackButton label="Back to Services" onPress={onBack} />
      <Text style={styles.title}>My Reservations</Text>
      {reservations.length === 0 ? (
        <EmptyState
          title="No Reservations Yet"
          body="Saved service requests will appear here and stay available after reopening the app."
        />
      ) : (
        reservations.map(reservation => (
          <View key={reservation.id} style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.cardTitle}>
                {reservation.emoji} {reservation.serviceTitle}
              </Text>
              <Badge label="● Reserved" tone="green" />
            </View>
            <Text style={styles.meta}>
              📅 {reservation.date}     ⏱ {reservation.time}
            </Text>
            {reservation.notes ? <Text style={styles.notes}>{reservation.notes}</Text> : null}
            <AppButton
              title="Cancel Reservation"
              variant="ghost"
              onPress={() => setSelected(reservation)}
              style={styles.cancelGhost}
              textStyle={styles.cancelText}
            />
          </View>
        ))
      )}
      <ActionSheetDock
        visible={Boolean(selected)}
        title="Cancel Reservation?"
        body="Are you sure you want to cancel this service reservation?"
        onClose={() => setSelected(null)}>
        <AppButton
          title="Keep Reservation"
          variant="ghost"
          onPress={() => setSelected(null)}
          style={styles.sheetButton}
        />
        <AppButton
          title="Cancel"
          variant="danger"
          onPress={() => {
            if (selected) {
              cancelReservation(selected.id);
            }
            setSelected(null);
          }}
          style={styles.sheetButton}
        />
      </ActionSheetDock>
    </VisitShell>
  );
}

const styles = StyleSheet.create({
  title: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 25,
    fontWeight: '800',
    marginTop: 8,
    marginBottom: 20,
  },
  card: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    padding: 16,
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    color: colors.text,
    fontSize: 15,
    fontWeight: '900',
  },
  meta: {
    color: colors.muted,
    fontSize: 13,
    marginTop: 14,
  },
  notes: {
    color: colors.muted,
    fontSize: 13,
    lineHeight: 20,
    marginTop: 10,
  },
  cancelGhost: {
    marginTop: 14,
    borderColor: 'rgba(207,87,90,0.4)',
  },
  cancelText: {
    color: colors.red,
  },
  sheetButton: {
    flex: 1,
  },
});
