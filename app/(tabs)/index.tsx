import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, ImagePlaceholder, SectionLabel, Tag } from '../../components/ui';
import { colors, fonts, radius, spacing } from '../../constants/theme';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Bonsoir</Text>
          <Text style={styles.title}>Ce soir</Text>
        </View>
        <Pressable style={styles.avatar} onPress={() => router.push('/preferences')}>
          <Ionicons name="person-outline" size={16} color={colors.textMuted} />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Pressable style={styles.generateCard} onPress={() => router.push('/generate-meal')}>
          <View style={{ flex: 1 }}>
            <Text style={styles.generateTitle}>Générer un repas</Text>
            <Text style={styles.generateSubtitle}>À partir de ce qu'il y a dans ton frigo</Text>
          </View>
          <View style={styles.generateIcon}>
            <Ionicons name="restaurant-outline" size={20} color="#fff" />
          </View>
        </Pressable>

        <View>
          <SectionLabel>Dernière suggestion</SectionLabel>
          <Pressable onPress={() => router.push('/recipe')}>
            <Card style={styles.suggestionCard}>
              <ImagePlaceholder style={styles.suggestionImage} />
              <View style={{ flex: 1, minWidth: 0 }}>
                <Text style={styles.suggestionTitle}>Poêlée de poulet aux légumes</Text>
                <Text style={styles.suggestionMeta}>22 min · 2 portions</Text>
                <View style={styles.tagRow}>
                  <Tag label="Poulet" />
                  <Tag label="Poivrons" />
                  <Tag label="+2" />
                </View>
              </View>
            </Card>
          </Pressable>
        </View>

        <View style={styles.statsRow}>
          <Pressable style={{ flex: 1 }} onPress={() => router.push('/(tabs)/inventory')}>
            <Card style={styles.statCard}>
              <Text style={styles.statTitle}>23 produits</Text>
              <Text style={styles.statSubtitle}>Inventaire</Text>
              <Text style={styles.statHighlightAmber}>3 périment bientôt</Text>
            </Card>
          </Pressable>
          <Pressable style={{ flex: 1 }} onPress={() => router.push('/(tabs)/scanner')}>
            <Card style={styles.statCard}>
              <Text style={styles.statTitle}>Scanner</Text>
              <Text style={styles.statSubtitle}>Ticket de courses</Text>
              <Text style={styles.statHighlightPrimary}>Ajouter en 1 photo</Text>
            </Card>
          </Pressable>
        </View>
      </ScrollView>
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
  },
  greeting: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textMuted,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 26,
    color: colors.text,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    gap: spacing.xl,
  },
  generateCard: {
    backgroundColor: colors.primary,
    borderRadius: radius.xl,
    padding: spacing.xxl - 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  generateTitle: {
    fontFamily: fonts.headingSemibold,
    fontSize: 19,
    color: '#fff',
  },
  generateSubtitle: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
    maxWidth: 190,
  },
  generateIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: spacing.md,
  },
  suggestionCard: {
    flexDirection: 'row',
    gap: spacing.md,
    padding: spacing.md + 2,
  },
  suggestionImage: {
    width: 64,
    height: 64,
  },
  suggestionTitle: {
    fontFamily: fonts.headingSemibold,
    fontSize: 14,
    color: colors.text,
  },
  suggestionMeta: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 3,
  },
  tagRow: {
    flexDirection: 'row',
    gap: 6,
    marginTop: 8,
    flexWrap: 'wrap',
  },
  statsRow: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  statCard: {
    padding: spacing.lg,
  },
  statTitle: {
    fontFamily: fonts.headingSemibold,
    fontSize: 14,
    color: colors.text,
  },
  statSubtitle: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 2,
  },
  statHighlightAmber: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: colors.amber,
    marginTop: 8,
  },
  statHighlightPrimary: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    color: colors.primary,
    marginTop: 8,
  },
});
