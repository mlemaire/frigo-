export const colors = {
  canvas: '#211c17',
  background: '#faf6f1',
  surface: '#fffdfb',
  border: '#e8ded1',
  borderLight: '#efe7da',
  chip: '#f4efe6',

  primary: '#c4501f',
  primarySoft: 'rgba(196,80,31,0.18)',
  primaryTag: '#f0e2d4',

  text: '#2b2420',
  textMuted: '#8a7d6f',
  textFaint: '#a89a89',

  amberBg: '#f7ecd9',
  amber: '#c17d1f',

  dangerBg: '#f6e2dc',
  danger: '#b8442f',

  successBg: '#e7efe3',
  success: '#4f7a4a',

  overlay: 'rgba(43,36,32,0.45)',
} as const;

export const radius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  pill: 100,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
} as const;

export const fonts = {
  heading: 'Poppins_700Bold',
  headingSemibold: 'Poppins_600SemiBold',
  headingMedium: 'Poppins_500Medium',
  body: 'Inter_400Regular',
  bodyMedium: 'Inter_500Medium',
  bodySemibold: 'Inter_600SemiBold',
} as const;
