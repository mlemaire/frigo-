import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chip, PrimaryButton, ScreenHeader, SectionLabel } from '../components/ui';
import { colors, fonts, radius, spacing } from '../constants/theme';

const DIETS = ['Omnivore', 'Végétarien', 'Végan', 'Sans gluten'];
const TIME_OPTIONS = ['15', '30', '45', '60+'];

export default function PreferencesScreen() {
  const [diet, setDiet] = useState('Omnivore');
  const [restrictions, setRestrictions] = useState(['Fruits à coque']);
  const [cravings, setCravings] = useState('');
  const [weekTime, setWeekTime] = useState('30');
  const [weekendTime, setWeekendTime] = useState('45');

  const removeRestriction = (item: string) => {
    setRestrictions((prev) => prev.filter((r) => r !== item));
  };

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScreenHeader title="Préférences" />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View>
          <SectionLabel>Régime alimentaire</SectionLabel>
          <View style={styles.chipRow}>
            {DIETS.map((label) => (
              <Chip key={label} label={label} selected={diet === label} onPress={() => setDiet(label)} />
            ))}
          </View>
        </View>

        <View>
          <SectionLabel>Restrictions / allergies</SectionLabel>
          <View style={styles.chipRow}>
            {restrictions.map((item) => (
              <Pressable key={item} style={styles.restrictionChip} onPress={() => removeRestriction(item)}>
                <Text style={styles.restrictionText}>{item} ✕</Text>
              </Pressable>
            ))}
            <Pressable style={styles.addChip}>
              <Text style={styles.addChipText}>+ Ajouter</Text>
            </Pressable>
          </View>
        </View>

        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Envies du moment</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Envie de plats réconfortants, peu d'épices..."
            placeholderTextColor={colors.textFaint}
            multiline
            value={cravings}
            onChangeText={setCravings}
          />
        </View>

        <TimeSegment
          label="Temps de cuisine — semaine"
          value={weekTime}
          onChange={setWeekTime}
        />
        <TimeSegment
          label="Temps de cuisine — week-end"
          value={weekendTime}
          onChange={setWeekendTime}
        />

        <PrimaryButton label="Enregistrer" style={{ marginTop: 6 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

function TimeSegment({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <View>
      <SectionLabel>{label}</SectionLabel>
      <View style={styles.segment}>
        {TIME_OPTIONS.map((option) => {
          const selected = option === value;
          return (
            <Pressable
              key={option}
              style={[styles.segmentItem, selected && styles.segmentItemSelected]}
              onPress={() => onChange(option)}
            >
              <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
                {option}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
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
    gap: spacing.xl,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  restrictionChip: {
    backgroundColor: colors.dangerBg,
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  restrictionText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.danger,
  },
  addChip: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderStyle: 'dashed',
    paddingVertical: 7,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  addChipText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textFaint,
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
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.chip,
    borderRadius: radius.md,
    padding: 4,
  },
  segmentItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: radius.md - 3,
  },
  segmentItemSelected: {
    backgroundColor: colors.surface,
  },
  segmentText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  segmentTextSelected: {
    fontFamily: fonts.bodySemibold,
    color: colors.text,
  },
});
