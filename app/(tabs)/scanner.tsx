import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePlaceholder, PrimaryButton, Tag } from '../../components/ui';
import { colors, fonts, radius, spacing } from '../../constants/theme';

type ScannedLine = {
  name: string;
  quantity: string;
  category: string;
  categoryBg: string;
  categoryColor: string;
  included: boolean;
};

const INITIAL_LINES: ScannedLine[] = [
  {
    name: 'Tomates',
    quantity: 'x6',
    category: 'Légumes',
    categoryBg: colors.successBg,
    categoryColor: colors.success,
    included: true,
  },
  {
    name: 'Pâtes',
    quantity: '500g',
    category: 'Épicerie',
    categoryBg: colors.chip,
    categoryColor: colors.textMuted,
    included: true,
  },
  {
    name: 'Yaourts nature',
    quantity: 'x8',
    category: 'Frigo',
    categoryBg: colors.primaryTag,
    categoryColor: colors.primary,
    included: true,
  },
  {
    name: 'Sac plastique',
    quantity: '—',
    category: 'Ignorer',
    categoryBg: colors.border,
    categoryColor: colors.textMuted,
    included: false,
  },
];

export default function ScannerScreen() {
  const [lines, setLines] = useState(INITIAL_LINES);
  const includedCount = lines.filter((line) => line.included).length;

  const toggleLine = (name: string) => {
    setLines((prev) =>
      prev.map((line) => (line.name === name ? { ...line, included: !line.included } : line))
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Voici ce que j'ai trouvé</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.receiptCard}>
          <ImagePlaceholder label="Ticket" style={styles.receiptImage} radiusValue={8} />
          <View>
            <Text style={styles.receiptTitle}>Ticket Carrefour</Text>
            <Text style={styles.receiptSubtitle}>Aujourd'hui · 14:32</Text>
          </View>
        </View>

        <Text style={styles.hint}>
          Vérifie les produits avant de les ajouter à ton inventaire.
        </Text>

        <View style={{ gap: spacing.sm + 2 }}>
          {lines.map((line) => (
            <Pressable
              key={line.name}
              onPress={() => toggleLine(line.name)}
              style={[styles.lineCard, !line.included && styles.lineCardIgnored]}
            >
              <View
                style={[
                  styles.checkbox,
                  line.included
                    ? { backgroundColor: colors.primary }
                    : { borderWidth: 1.5, borderColor: colors.textFaint },
                ]}
              >
                {line.included && <Ionicons name="checkmark" size={12} color="#fff" />}
              </View>
              <Text
                style={[
                  styles.lineName,
                  !line.included && styles.lineNameIgnored,
                ]}
              >
                {line.name}
              </Text>
              <Text style={styles.lineQuantity}>{line.quantity}</Text>
              <Tag label={line.category} bg={line.categoryBg} color={line.categoryColor} />
            </Pressable>
          ))}
        </View>

        <Pressable>
          <Text style={styles.addManual}>+ Ajouter une ligne manuellement</Text>
        </Pressable>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label={`Ajouter ${includedCount} produits à l'inventaire`} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 18,
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: 100,
  },
  receiptCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg - 2,
    padding: 10,
    marginBottom: spacing.lg,
  },
  receiptImage: {
    width: 44,
    height: 58,
  },
  receiptTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  receiptSubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  hint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 14,
  },
  lineCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg - 2,
    padding: spacing.md,
  },
  lineCardIgnored: {
    backgroundColor: colors.chip,
    opacity: 0.55,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  lineName: {
    flex: 1,
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  lineNameIgnored: {
    textDecorationLine: 'line-through',
  },
  lineQuantity: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    width: 36,
    textAlign: 'center',
  },
  addManual: {
    textAlign: 'center',
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.primary,
    marginTop: 16,
  },
  footer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    padding: spacing.xl,
    backgroundColor: colors.background,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
