import React from 'react';
import {Modal, Pressable, StyleSheet, Text, View} from 'react-native';
import {colors, fonts, layout} from '../constants/theme';

type BottomSheetProps = {
  visible: boolean;
  title: string;
  body: string;
  children: React.ReactNode;
  onClose: () => void;
};

export function BottomSheet({visible, title, body, children, onClose}: BottomSheetProps) {
  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable style={styles.sheet}>
          <View style={styles.handle} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.body}>{body}</Text>
          <View style={styles.actions}>{children}</View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.72)',
    justifyContent: 'flex-end',
  },
  sheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: layout.horizontal,
    paddingTop: 16,
    paddingBottom: 32 + layout.androidEdge,
  },
  handle: {
    alignSelf: 'center',
    width: 36,
    height: 4,
    borderRadius: 999,
    backgroundColor: colors.borderSoft,
    marginBottom: 28,
  },
  title: {
    color: colors.text,
    fontFamily: fonts.heading,
    fontSize: 25,
    fontWeight: '800',
    marginBottom: 8,
  },
  body: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 22,
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 26,
  },
});
