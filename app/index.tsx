import React from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../constants/theme';

export default function LoginScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <View style={styles.content}>
        <View style={styles.brandBlock}>
          <View style={styles.logoBadge}>
            <Ionicons name="nutrition-outline" size={30} color="#fff" />
          </View>
          <View style={{ alignItems: 'center' }}>
            <Text style={styles.brandTitle}>Frigo+</Text>
            <Text style={styles.brandSubtitle}>Ce que t'as chez toi, en bon repas</Text>
          </View>
        </View>

        <View style={styles.form}>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="moi@example.com"
              placeholderTextColor={colors.textFaint}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.fieldLabel}>Mot de passe</Text>
            <TextInput
              style={styles.input}
              placeholder="••••••••"
              placeholderTextColor={colors.textFaint}
              secureTextEntry
            />
          </View>
        </View>

        <View style={styles.actions}>
          <Pressable style={styles.primaryButton} onPress={() => router.replace('/(tabs)')}>
            <Text style={styles.primaryButtonText}>Se connecter</Text>
          </Pressable>
          <View style={styles.dividerRow}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ou</Text>
            <View style={styles.dividerLine} />
          </View>
          <Pressable style={styles.googleButton} onPress={() => router.replace('/(tabs)')}>
            <Ionicons name="logo-google" size={18} color={colors.text} />
            <Text style={styles.googleButtonText}>Continuer avec Google</Text>
          </Pressable>
        </View>
      </View>

      <Text style={styles.footerText}>
        Pas de compte ? <Text style={styles.footerLink}>Créer un compte</Text>
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.xxl + 4,
    paddingVertical: spacing.xxl,
    justifyContent: 'space-between',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    gap: 36,
  },
  brandBlock: {
    alignItems: 'center',
    gap: 14,
  },
  logoBadge: {
    width: 64,
    height: 64,
    borderRadius: radius.xl,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.text,
  },
  brandSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: 4,
  },
  form: {
    gap: spacing.md,
  },
  field: {
    gap: 6,
  },
  fieldLabel: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.textMuted,
  },
  input: {
    height: 48,
    borderRadius: radius.md,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 14,
    fontFamily: fonts.body,
    fontSize: 14,
    color: colors.text,
  },
  actions: {
    gap: 14,
  },
  primaryButton: {
    height: 50,
    borderRadius: radius.lg - 2,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButtonText: {
    fontFamily: fonts.headingSemibold,
    fontSize: 15,
    color: '#fff',
  },
  dividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: colors.border,
  },
  dividerText: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textFaint,
  },
  googleButton: {
    height: 50,
    borderRadius: radius.lg - 2,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleButtonText: {
    fontFamily: fonts.headingSemibold,
    fontSize: 14,
    color: colors.text,
  },
  footerText: {
    textAlign: 'center',
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  footerLink: {
    color: colors.primary,
    fontFamily: fonts.bodySemibold,
  },
});
