import React from 'react';
import {
  Pressable,
  PressableProps,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { colors, fonts, radius, spacing } from '../constants/theme';

export function Chip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, selected ? styles.chipSelected : styles.chipDefault]}
    >
      <Text style={selected ? styles.chipTextSelected : styles.chipTextDefault}>
        {label}
      </Text>
    </Pressable>
  );
}

export function PrimaryButton({
  label,
  onPress,
  style,
  disabled,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
  disabled?: boolean;
}) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={[styles.primaryButton, disabled && styles.primaryButtonDisabled, style]}
    >
      <Text style={styles.primaryButtonText}>{label}</Text>
    </Pressable>
  );
}

export function OutlineButton({
  label,
  onPress,
  style,
}: {
  label: string;
  onPress?: () => void;
  style?: ViewStyle;
}) {
  return (
    <Pressable onPress={onPress} style={[styles.outlineButton, style]}>
      <Text style={styles.outlineButtonText}>{label}</Text>
    </Pressable>
  );
}

export function Card({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: ViewStyle;
}) {
  return <View style={[styles.card, style]}>{children}</View>;
}

export function SectionLabel({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionLabel}>{children}</Text>;
}

export function Tag({
  label,
  bg = colors.chip,
  color = colors.textMuted,
}: {
  label: string;
  bg?: string;
  color?: string;
}) {
  return (
    <View style={[styles.tag, { backgroundColor: bg }]}>
      <Text style={[styles.tagText, { color }]}>{label}</Text>
    </View>
  );
}

export function ImagePlaceholder({
  label = 'Photo',
  style,
  radiusValue = radius.md,
}: {
  label?: string;
  style?: ViewStyle;
  radiusValue?: number;
}) {
  return (
    <View
      style={[
        styles.imagePlaceholder,
        { borderRadius: radiusValue },
        style,
      ]}
    >
      <Ionicons name="image-outline" size={20} color={colors.textFaint} />
      <Text style={styles.imagePlaceholderLabel}>{label}</Text>
    </View>
  );
}

export function ScreenHeader({
  title,
  onBack,
}: {
  title: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.header}>
      <Pressable
        onPress={onBack ?? (() => router.back())}
        hitSlop={12}
        style={styles.backButton}
      >
        <Ionicons name="chevron-back" size={20} color={colors.text} />
      </Pressable>
      <Text style={styles.headerTitle}>{title}</Text>
    </View>
  );
}

export function Stepper({
  value,
  onDecrement,
  onIncrement,
}: {
  value: string;
  onDecrement: () => void;
  onIncrement: () => void;
}) {
  return (
    <View style={styles.stepperRow}>
      <Pressable onPress={onDecrement} style={styles.stepperButton} hitSlop={8}>
        <Text style={styles.stepperButtonText}>–</Text>
      </Pressable>
      <Text style={styles.stepperValue}>{value}</Text>
      <Pressable onPress={onIncrement} style={styles.stepperButton} hitSlop={8}>
        <Text style={styles.stepperButtonText}>+</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: radius.pill,
  },
  chipDefault: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary,
  },
  chipTextDefault: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  chipTextSelected: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: '#fff',
  },
  primaryButton: {
    height: 50,
    borderRadius: radius.lg - 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonDisabled: {
    opacity: 0.5,
  },
  primaryButtonText: {
    fontFamily: fonts.headingSemibold,
    fontSize: 15,
    color: '#fff',
  },
  outlineButton: {
    height: 48,
    borderRadius: radius.lg - 2,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  outlineButtonText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.primary,
  },
  card: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
  },
  sectionLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textFaint,
    marginBottom: spacing.md - 2,
  },
  tag: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
  },
  tagText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
  },
  imagePlaceholder: {
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  imagePlaceholderLabel: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textFaint,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xl,
    paddingBottom: spacing.sm,
  },
  backButton: {
    width: 28,
    alignItems: 'flex-start',
  },
  headerTitle: {
    fontFamily: fonts.heading,
    fontSize: 19,
    color: colors.text,
  },
  stepperRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },
  stepperButton: {
    width: 26,
    height: 26,
    borderRadius: radius.sm,
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepperButtonText: {
    fontSize: 15,
    color: colors.textMuted,
  },
  stepperValue: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
    width: 60,
    textAlign: 'center',
  },
});
