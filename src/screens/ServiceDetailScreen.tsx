import React, {useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';
import {BottomSheet} from '../components/BottomSheet';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, BackButton, Badge} from '../components/ui';
import {colors, fonts} from '../constants/theme';
import {services} from '../data/services';
import {useAppStore} from '../state/AppStore';
import {visitDateLabel} from '../utils/date';

type ServiceDetailScreenProps = {
  serviceId: string;
  onBack: () => void;
};

const timeSlots = ['5:30 PM', '6:00 PM', '7:00 PM', '8:30 PM', '9:30 PM'];

export function ServiceDetailScreen({serviceId, onBack}: ServiceDetailScreenProps) {
  const service = services.find(item => item.id === serviceId) ?? services[0];
  const [time, setTime] = useState('7:00 PM');
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState(false);
  const {addReservation} = useAppStore();

  return (
    <ScreenScaffold>
      <BackButton label="Back to Services" onPress={onBack} />
      <View style={styles.hero}>
        <View style={styles.emojiBox}>
          <Text style={styles.emoji}>{service.emoji}</Text>
        </View>
        <View style={styles.heroCopy}>
          <Text style={styles.title}>{service.title}</Text>
          <Badge label={service.tag} />
        </View>
      </View>
      <Text style={styles.description}>{service.description}</Text>
      <Text style={styles.label}>DATE</Text>
      <View style={styles.field}>
        <Text style={styles.fieldText}>{visitDateLabel}</Text>
      </View>
      <Text style={styles.label}>TIME</Text>
      <View style={styles.timeGrid}>
        {timeSlots.map(slot => (
          <AppButton
            key={slot}
            title={slot}
            variant={time === slot ? 'primary' : 'ghost'}
            onPress={() => setTime(slot)}
            style={styles.timeButton}
          />
        ))}
      </View>
      <Text style={styles.label}>GUEST NOTES (OPTIONAL)</Text>
      <TextInput
        value={notes}
        onChangeText={setNotes}
        placeholder="Add special requests or notes..."
        placeholderTextColor={colors.mutedDark}
        multiline
        textAlignVertical="top"
        selectionColor={colors.gold}
        style={styles.notes}
      />
      <AppButton
        title="Confirm Reservation"
        onPress={() => {
          addReservation(service, time, notes);
          setSuccess(true);
        }}
        style={styles.confirm}
      />
      <BottomSheet
        visible={success}
        title="Service Reserved"
        body="Your reservation request has been saved. You can view or cancel it in My Reservations."
        onClose={() => setSuccess(false)}>
        <AppButton
          title="Done"
          onPress={() => {
            setSuccess(false);
            onBack();
          }}
          style={styles.doneButton}
        />
      </BottomSheet>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  hero: {
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surfaceSoft,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    padding: 18,
    marginTop: 18,
  },
  emojiBox: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.06)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: {
    fontSize: 26,
  },
  heroCopy: {
    flex: 1,
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 22,
    fontWeight: '800',
  },
  description: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 20,
    marginBottom: 20,
  },
  label: {
    color: colors.muted,
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
    marginTop: 10,
  },
  field: {
    minHeight: 48,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    paddingHorizontal: 14,
  },
  fieldText: {
    color: colors.text,
    fontSize: 15,
    fontWeight: '700',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeButton: {
    minWidth: '30%',
    flexGrow: 1,
  },
  notes: {
    minHeight: 88,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    color: colors.text,
    padding: 14,
    fontSize: 15,
  },
  confirm: {
    marginTop: 18,
  },
  doneButton: {
    flex: 1,
  },
});
