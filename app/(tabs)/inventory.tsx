import React, { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { colors, fonts, radius, spacing } from '../../constants/theme';

const FILTERS = ['Tous', 'Frigo', 'Placard', 'Surgelé'];

type Product = {
  name: string;
  quantity: string;
  expiry?: string;
  expiryTone?: 'amber' | 'danger' | 'success';
};

const FRIDGE: Product[] = [
  { name: 'Yaourts nature', quantity: 'x4', expiry: '2j', expiryTone: 'amber' },
  { name: 'Poulet', quantity: '500 g', expiry: 'demain', expiryTone: 'danger' },
  { name: 'Poivrons', quantity: 'x3', expiry: '5j', expiryTone: 'success' },
  { name: 'Lait', quantity: '1 L', expiry: '6j', expiryTone: 'success' },
];

const PANTRY: Product[] = [
  { name: 'Riz', quantity: '1 kg' },
  { name: 'Lait de coco', quantity: '2 boîtes' },
];

const TONE_STYLES = {
  amber: { bg: colors.amberBg, color: colors.amber },
  danger: { bg: colors.dangerBg, color: colors.danger },
  success: { bg: colors.successBg, color: colors.success },
} as const;

export default function InventoryScreen() {
  const [activeFilter, setActiveFilter] = useState('Tous');

  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <View style={styles.header}>
        <Text style={styles.title}>Inventaire</Text>
        <Pressable style={styles.addIconButton}>
          <Ionicons name="add" size={18} color={colors.text} />
        </Pressable>
      </View>

      <View style={styles.searchWrapper}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={15} color={colors.textFaint} />
          <Text style={styles.searchPlaceholder}>Rechercher un produit</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.filterRow}
      >
        {FILTERS.map((filter) => {
          const selected = filter === activeFilter;
          return (
            <Pressable
              key={filter}
              onPress={() => setActiveFilter(filter)}
              style={[styles.filterChip, selected ? styles.filterChipSelected : styles.filterChipDefault]}
            >
              <Text style={selected ? styles.filterTextSelected : styles.filterTextDefault}>
                {filter}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <ScrollView contentContainerStyle={styles.list} showsVerticalScrollIndicator={false}>
        <ProductSection title="Frigo" products={FRIDGE} />
        <ProductSection title="Placard" products={PANTRY} />
      </ScrollView>

      <Pressable style={styles.fab}>
        <Ionicons name="add" size={24} color="#fff" />
      </Pressable>
    </SafeAreaView>
  );
}

function ProductSection({ title, products }: { title: string; products: Product[] }) {
  return (
    <View>
      <Text style={styles.sectionTitle}>{title}</Text>
      <View>
        {products.map((product, index) => (
          <View
            key={product.name}
            style={[styles.row, index < products.length - 1 && styles.rowBorder]}
          >
            <View>
              <Text style={styles.productName}>{product.name}</Text>
              <Text style={styles.productQuantity}>{product.quantity}</Text>
            </View>
            {product.expiry ? (
              <View
                style={[
                  styles.expiryBadge,
                  { backgroundColor: TONE_STYLES[product.expiryTone ?? 'success'].bg },
                ]}
              >
                <Text
                  style={[
                    styles.expiryText,
                    { color: TONE_STYLES[product.expiryTone ?? 'success'].color },
                  ]}
                >
                  {product.expiry}
                </Text>
              </View>
            ) : (
              <Text style={styles.expiryDash}>—</Text>
            )}
          </View>
        ))}
      </View>
    </View>
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
    justifyContent: 'space-between',
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.heading,
    fontSize: 20,
    color: colors.text,
  },
  addIconButton: {
    width: 34,
    height: 34,
    borderRadius: radius.sm + 2,
    backgroundColor: colors.chip,
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchWrapper: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
  },
  searchBar: {
    height: 42,
    borderRadius: radius.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    gap: 8,
  },
  searchPlaceholder: {
    fontFamily: fonts.body,
    fontSize: 13,
    color: colors.textFaint,
  },
  filterRow: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.md,
    gap: spacing.sm,
  },
  filterChip: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: radius.pill,
  },
  filterChipDefault: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  filterChipSelected: {
    backgroundColor: colors.primary,
  },
  filterTextDefault: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: colors.text,
  },
  filterTextSelected: {
    fontFamily: fonts.bodySemibold,
    fontSize: 12,
    color: '#fff',
  },
  list: {
    paddingHorizontal: spacing.xl,
    paddingBottom: 100,
    paddingTop: 4,
  },
  sectionTitle: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: colors.textFaint,
    marginTop: 10,
    marginBottom: 6,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 11,
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  productName: {
    fontFamily: fonts.bodySemibold,
    fontSize: 13,
    color: colors.text,
  },
  productQuantity: {
    fontFamily: fonts.body,
    fontSize: 12,
    color: colors.textMuted,
  },
  expiryBadge: {
    paddingVertical: 4,
    paddingHorizontal: 9,
    borderRadius: radius.pill,
  },
  expiryText: {
    fontFamily: fonts.bodySemibold,
    fontSize: 11,
  },
  expiryDash: {
    fontFamily: fonts.body,
    fontSize: 11,
    color: colors.textFaint,
  },
  fab: {
    position: 'absolute',
    right: spacing.xl,
    bottom: 24,
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },
});
