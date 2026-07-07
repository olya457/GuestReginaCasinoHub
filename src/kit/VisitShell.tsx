import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import {colors, layout} from '../styleGuide/styleTokens';

type VisitShellProps = {
  children: React.ReactNode;
  withTabBar?: boolean;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
};

export function VisitShell({
  children,
  withTabBar = false,
  scroll = true,
  contentStyle,
}: VisitShellProps) {
  const bottomPadding = withTabBar
    ? layout.tabHeight + layout.tabBottom + 24
    : 26 + layout.androidEdge;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={[styles.root, {paddingTop: layout.androidEdge}]}>
        {scroll ? (
          <ScrollView
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            contentContainerStyle={[
              styles.content,
              {paddingBottom: bottomPadding},
              contentStyle,
            ]}>
            {children}
          </ScrollView>
        ) : (
          <View style={[styles.content, styles.flexContent, {paddingBottom: bottomPadding}, contentStyle]}>
            {children}
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  root: {
    flex: 1,
    backgroundColor: colors.canvas,
  },
  content: {
    paddingHorizontal: layout.horizontal,
    paddingTop: 20,
  },
  flexContent: {
    flex: 1,
  },
});
