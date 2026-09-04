import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, ImagePlaceholder, PrimaryButton, ScreenHeader, SectionLabel } from '../components/ui';
import { colors, fonts, radius, spacing } from '../constants/theme';

const CONSTRAINTS = ['Moins de 20 min', 'Protéiné', 'Vider le frigo', 'Batch cooking'];

export default function GenerateMealScreen() {
  const [selected, setSelected] = useState<string[]>(['Moins de 20 min', 'Protéiné']);
  const [craving, setCraving] = useState('');
  const [showResult, setShowResult] = useState(false);

  const toggle = (label: string) => {
    setSelected((prev) =>
      prev.includes(label) ? prev.filter((item) => item !== label) : [...prev, label]
    );
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Générer un repas" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <SectionLabel>Contraintes</SectionLabel>
          <View style={styles.chipRow}>
            {CONSTRAINTS.map((label) => (
              <Chip
                key={label}
                label={label}
                selected={selected.includes(label)}
                onPress={() => toggle(label)}
              />
            ))}
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Une envie particulière ? (optionnel)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Un truc rapide et réconfortant..."
            placeholderTextColor={colors.textFaint}
            multiline
            value={craving}
            onChangeText={setCraving}
          />
        </View>

        <PrimaryButton label="Générer une recette" onPress={() => setShowResult(true)} />

        {showResult && (
          <>
            <View style={styles.divider} />
            <View>
              <SectionLabel>Résultat</SectionLabel>
              <View style={styles.resultCard}>
                <ImagePlaceholder label="Photo du plat" style={styles.resultImage} radiusValue={0} />
                <View style={styles.resultBody}>
                  <Text style={styles.resultTitle}>Curry de légumes du frigo</Text>
                  <Text style={styles.resultMeta}>25 min · 2 portions</Text>
                  <View style={styles.ingredientsRow}>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.usedLabel}>✓ Utilisés</Text>
                      <Text style={styles.ingredientList}>
                        Poivrons{'\n'}Courgette{'\n'}Lait de coco{'\n'}Riz
                      </Text>
                    </View>
                    <View style={{ flex: 1 }}>
                      <Text style={styles.missingLabel}>Manquants</Text>
                      <Text style={styles.ingredientList}>Coriandre fraîche</Text>
                    </View>
                  </View>
                  <Pressable style={styles.resultButton} onPress={() => router.push('/recipe')}>
                    <Text style={styles.resultButtonText}>Voir la recette complète</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: 18,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textMuted,
  },
  textArea: {
    height: 64,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 4,
  },
  resultCard: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    overflow: 'hidden',
  },
  resultImage: {
    width: '100%',
    height: 130,
  },
  resultBody: {
    padding: spacing.md + 2,
  },
  resultTitle: {
    fontFamily: fonts.headingSemibold,
    fontSize: 15,
    color: colors.text,
  },
  resultMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 3,
  },
  ingredientsRow: {
    flexDirection: 'row',
    gap: spacing.md - 2,
    marginTop: spacing.md,
  },
  usedLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: colors.success,
    marginBottom: 6,
  },
  missingLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: colors.amber,
    marginBottom: 6,
  },
  ingredientList: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.text,
    lineHeight: 20,
  },
  resultButton: {
    marginTop: 14,
    height: 44,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  resultButtonText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.primary,
  },
});
