import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ImagePlaceholder, PrimaryButton, SectionLabel, Tag } from '../components/ui';
import { colors, fonts, radius, spacing } from '../constants/theme';

const INGREDIENTS = [
  { name: 'Poivrons', quantity: '2' },
  { name: 'Courgette', quantity: '1' },
  { name: 'Lait de coco', quantity: '1 boîte' },
  { name: 'Riz', quantity: '200 g' },
];

const STEPS = [
  'Émincer les poivrons et la courgette.',
  'Faire revenir 5 min à feu vif.',
  'Ajouter le lait de coco, laisser mijoter 12 min.',
  'Servir avec le riz chaud.',
];

export default function RecipeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top', 'bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View>
          <ImagePlaceholder label="Photo du plat" style={styles.hero} radiusValue={0} />
          <Pressable style={[styles.floatingButton, styles.floatingLeft]} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={16} color={colors.text} />
          </Pressable>
          <Pressable style={[styles.floatingButton, styles.floatingRight]}>
            <Ionicons name="heart-outline" size={15} color={colors.text} />
          </Pressable>
        </View>

        <View style={styles.body}>
          <Text style={styles.title}>Curry de légumes du frigo</Text>
          <View style={styles.metaRow}>
            <Tag label="25 min" />
            <Tag label="Facile" />
            <Tag label="2 portions" />
          </View>

          <View style={styles.sectionSpacer}>
            <SectionLabel>Ingrédients</SectionLabel>
          </View>
          <View>
            {INGREDIENTS.map((item, index) => (
              <View
                key={item.name}
                style={[
                  styles.ingredientRow,
                  index < INGREDIENTS.length - 1 && styles.ingredientRowBorder,
                ]}
              >
                <Text style={styles.ingredientName}>{item.name}</Text>
                <Text style={styles.ingredientQuantity}>{item.quantity}</Text>
              </View>
            ))}
          </View>

          <View style={styles.sectionSpacer}>
            <SectionLabel>Étapes</SectionLabel>
          </View>
          <View style={{ gap: 14 }}>
            {STEPS.map((step, index) => (
              <View key={step} style={styles.stepRow}>
                <View style={styles.stepBadge}>
                  <Text style={styles.stepBadgeText}>{index + 1}</Text>
                </View>
                <Text style={styles.stepText}>{step}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <PrimaryButton label="J'ai cuisiné ça" onPress={() => router.push('/cooking-confirmation')} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: 96,
  },
  hero: {
    width: '100%',
    height: 220,
  },
  floatingButton: {
    position: 'absolute',
    top: 18,
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  floatingLeft: {
    left: 18,
  },
  floatingRight: {
    right: 18,
  },
  body: {
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.lg,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.text,
  },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginTop: 10,
  },
  sectionSpacer: {
    marginTop: 22,
  },
  ingredientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },
  ingredientRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  ingredientName: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
  },
  ingredientQuantity: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  stepRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  stepBadge: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepBadgeText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: '#fff',
  },
  stepText: {
    flex: 1,
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.text,
    lineHeight: 19,
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
