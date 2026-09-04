import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../../constants/theme';

const PROVIDERS = ['Gemini', 'Claude', 'GPT'];

export default function SettingsScreen() {
  const [provider, setProvider] = useState('Gemini');
  const [keyVisible, setKeyVisible] = useState(false);

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Réglages</Text>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.accountCard}>
          <View style={styles.accountAvatar}>
            <Text style={styles.accountAvatarText}>M</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.accountEmail}>moi@example.com</Text>
            <Text style={styles.accountLabel}>Compte personnel</Text>
          </View>
          <Pressable onPress={() => router.replace('/')}>
            <Text style={styles.logout}>Déconnexion</Text>
          </Pressable>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Clé API IA (BYOK)</Text>
          <Text style={styles.sectionHint}>
            Ta clé reste stockée uniquement sur cet appareil, jamais partagée.
          </Text>

          <View style={styles.segment}>
            {PROVIDERS.map((item) => {
              const selected = item === provider;
              return (
                <Pressable
                  key={item}
                  style={[styles.segmentItem, selected && styles.segmentItemSelected]}
                  onPress={() => setProvider(item)}
                >
                  <Text style={[styles.segmentText, selected && styles.segmentTextSelected]}>
                    {item}
                  </Text>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Clé API</Text>
            <View style={styles.keyInput}>
              <Text style={styles.keyValue}>
                {keyVisible ? 'sk-ia-9f8c-2d41-example' : '••••••••••••••••'}
              </Text>
              <Pressable onPress={() => setKeyVisible((v) => !v)} hitSlop={8}>
                <Ionicons
                  name={keyVisible ? 'eye-off-outline' : 'eye-outline'}
                  size={16}
                  color={colors.textFaint}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.testRow}>
            <Pressable style={styles.testButton}>
              <Text style={styles.testButtonText}>Tester la connexion</Text>
            </Pressable>
            <Text style={styles.connected}>● Connecté</Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionTitle}>Application</Text>
          <SettingsRow label="Version" value="1.4.0" />
          <SettingsRow label="Politique de confidentialité" chevron />
          <SettingsRow label="Conditions d'utilisation" chevron last />
        </View>

        <Text style={styles.deleteAccount}>Supprimer mon compte</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function SettingsRow({
  label,
  value,
  chevron,
  last,
}: {
  label: string;
  value?: string;
  chevron?: boolean;
  last?: boolean;
}) {
  return (
    <View style={[styles.settingsRow, !last && styles.settingsRowBorder]}>
      <Text style={styles.settingsLabel}>{label}</Text>
      {value ? (
        <Text style={styles.settingsValue}>{value}</Text>
      ) : chevron ? (
        <Text style={styles.settingsChevron}>›</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.text,
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xxl,
    gap: spacing.xl + 2,
  },
  accountCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    padding: spacing.lg,
  },
  accountAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  accountAvatarText: {
    fontFamily: fonts.headingSemibold,
    fontSize: 16,
    color: '#fff',
  },
  accountEmail: {
    fontFamily: fonts.bodySemibold,
    fontSize: 14,
    color: colors.text,
  },
  accountLabel: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  logout: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.primary,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textFaint,
    marginBottom: 6,
  },
  sectionHint: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  segment: {
    flexDirection: 'row',
    backgroundColor: colors.chip,
    borderRadius: radius.md,
    padding: 4,
    marginBottom: spacing.md,
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
  field: {
    gap: 6,
    marginBottom: spacing.sm + 2,
  },
  fieldLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textMuted,
  },
  keyInput: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
  },
  keyValue: {
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
    letterSpacing: 2,
  },
  testRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  testButton: {
    flex: 1,
    height: 40,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  testButtonText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  connected: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.success,
    marginLeft: spacing.md,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  settingsRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  settingsLabel: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
  },
  settingsValue: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  settingsChevron: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textFaint,
  },
  deleteAccount: {
    textAlign: 'center',
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.danger,
  },
});
