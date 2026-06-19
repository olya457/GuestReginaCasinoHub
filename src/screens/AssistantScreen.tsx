import React, {useMemo, useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {BottomSheet} from '../components/BottomSheet';
import {ScreenScaffold} from '../components/ScreenScaffold';
import {AppButton, EmptyState, ScreenTitle} from '../components/ui';
import {colors} from '../constants/theme';
import {useAppStore} from '../state/AppStore';

export function AssistantScreen() {
  const {assistantMessages, askAssistant, clearAssistant} = useAppStore();
  const [confirmClear, setConfirmClear] = useState(false);
  const questions = useMemo(
    () => [
      'How do I activate my access code?',
      'Can I reserve a service from the app?',
      "Where can I see today's events?",
      'Can I change comfort settings?',
      'Where can I find places to visit nearby?',
    ],
    [],
  );

  return (
    <ScreenScaffold withTabBar scroll={false}>
      <ScreenTitle
        title="Guest Assistant"
        subtitle="Tap a question to get instant help"
        right={
          <AppButton
            title="Clear"
            variant="ghost"
            onPress={() => setConfirmClear(true)}
            style={styles.clearButton}
          />
        }
      />
      <ScrollView
        style={styles.messages}
        contentContainerStyle={styles.messagesContent}
        showsVerticalScrollIndicator={false}>
        {assistantMessages.length === 0 ? (
          <EmptyState
            title="Chat History Cleared"
            body="Ask a question below whenever you need venue help."
          />
        ) : (
          assistantMessages.map(message => (
            <View
              key={message.id}
              style={[
                styles.bubble,
                message.role === 'user' ? styles.userBubble : styles.assistantBubble,
              ]}>
              <Text
                style={[
                  styles.bubbleText,
                  message.role === 'user' ? styles.userText : styles.assistantText,
                ]}>
                {message.text}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
      <View style={styles.questionPanel}>
        <Text style={styles.questionLabel}>ASK A QUESTION</Text>
        {questions.map(question => (
          <AppButton
            key={question}
            title={question}
            variant="ghost"
            onPress={() => askAssistant(question)}
            style={styles.questionButton}
            textStyle={styles.questionText}
          />
        ))}
      </View>
      <BottomSheet
        visible={confirmClear}
        title="Delete Chat History?"
        body="This will remove all previous assistant messages from this session."
        onClose={() => setConfirmClear(false)}>
        <AppButton
          title="Cancel"
          variant="ghost"
          onPress={() => setConfirmClear(false)}
          style={styles.sheetButton}
        />
        <AppButton
          title="Delete Chat"
          variant="danger"
          onPress={() => {
            clearAssistant();
            setConfirmClear(false);
          }}
          style={styles.sheetButton}
        />
      </BottomSheet>
    </ScreenScaffold>
  );
}

const styles = StyleSheet.create({
  clearButton: {
    minHeight: 38,
    paddingHorizontal: 14,
  },
  messages: {
    flex: 1,
    marginHorizontal: -20,
    paddingHorizontal: 20,
  },
  messagesContent: {
    paddingTop: 16,
    paddingBottom: 20,
  },
  bubble: {
    maxWidth: '82%',
    borderRadius: 16,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 12,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: colors.gold,
    borderTopRightRadius: 6,
  },
  assistantBubble: {
    alignSelf: 'flex-start',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderTopLeftRadius: 6,
  },
  bubbleText: {
    fontSize: 14,
    lineHeight: 21,
  },
  userText: {
    color: '#050b07',
  },
  assistantText: {
    color: colors.text,
  },
  questionPanel: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingTop: 14,
    gap: 8,
  },
  questionLabel: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 2,
    marginBottom: 3,
  },
  questionButton: {
    minHeight: 39,
    alignItems: 'flex-start',
    paddingHorizontal: 12,
  },
  questionText: {
    color: colors.text,
    fontWeight: '500',
    fontSize: 13,
  },
  sheetButton: {
    flex: 1,
  },
});
