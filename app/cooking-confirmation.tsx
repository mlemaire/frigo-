import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { OutlineButton, PrimaryButton, Stepper } from '../components/ui';
import { colors, fonts, radius, spacing } from '../constants/theme';

type IngredientLine = {
  name: string;
  amount: number;
  unit: string;
};

const INITIAL_LINES: IngredientLine[] = [
  { name: 'Lait de coco', amount: 1, unit: 'boîte' },
  { name: 'Poivron', amount: 2, unit: '' },
  { name: 'Courgette', amount: 1, unit: '' },
  { name: 'Riz', amount: 200, unit: 'g' },
];

function formatAmount(line: IngredientLine) {
  return line.unit ? `${line.amount} ${line.unit}` : `${line.amount}`;
}

export default function CookingConfirmationScreen() {
  const [lines, setLines] = useState(INITIAL_LINES);

  const adjust = (index: number, delta: number) => {
    setLines((prev) =>
      prev.map((line, i) =>
        i === index ? { ...line, amount: Math.max(0, line.amount + delta) } : line
      )
    );
  };

  return (
    <View style={styles.overlay}>
      <Pressable style={StyleSheet.absoluteFill} onPress={() => router.back()} />
      <SafeAreaView edges={['bottom']} style={styles.sheetWrapper}>
        <View style={styles.sheet}>
          <View style={styles.grabber} />
          <Text style={styles.title}>Confirmer les quantités utilisées</Text>
          <Text style={styles.subtitle}>
            Ajuste si besoin avant la mise à jour de ton inventaire.
          </Text>

          <View style={styles.lines}>
            {lines.map((line, index) => (
              <View key={line.name} style={styles.line}>
                <Text style={styles.lineName}>{line.name}</Text>
                <Stepper
                  value={formatAmount(line)}
                  onDecrement={() => adjust(index, line.unit === 'g' ? -50 : -1)}
                  onIncrement={() => adjust(index, line.unit === 'g' ? 50 : 1)}
                />
              </View>
            ))}
          </View>

          <View style={styles.actions}>
            <OutlineButton
              label="Annuler"
              style={styles.cancelButton}
              onPress={() => router.back()}
            />
            <PrimaryButton
              label="Confirmer"
              style={styles.confirmButton}
              onPress={() => router.dismissTo('/(tabs)')}
            />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: 'flex-end',
  },
  sheetWrapper: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.xl + 4,
    borderTopRightRadius: radius.xl + 4,
  },
  sheet: {
    paddingHorizontal: spacing.xl + 2,
    paddingTop: spacing.xxl,
    paddingBottom: spacing.xxl + 4,
  },
  grabber: {
    width: 36,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
    alignSelf: 'center',
    marginBottom: 18,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 17,
    color: colors.text,
  },
  subtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 18,
  },
  lines: {
    gap: spacing.md,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lineName: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: 22,
  },
  cancelButton: {
    flex: 1,
    height: 48,
  },
  confirmButton: {
    flex: 1,
    height: 48,
  },
});
