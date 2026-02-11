export const Colors = {
  light: {
    background: '#FFF7F0',
    surface: '#FFFFFF',
    surfaceAlt: '#FDEFE6',
    text: '#2B1D14',
    textMuted: '#7A5F4C',
    primary: '#F06B2E',
    primaryHover: '#E25E21',
    primaryMuted: '#F7A47E',
    onPrimary: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.7)',
    border: '#E8D7CC',
    success: '#2E9E6F',
    warning: '#F2A54A',
    danger: '#E85C5C',
  },
  dark: {
    background: '#15110E',
    surface: '#1D1713',
    surfaceAlt: '#261F1A',
    text: '#FBEDE1',
    textMuted: '#C7AFA0',
    primary: '#FF8A4C',
    primaryHover: '#F27D40',
    primaryMuted: '#C9673A',
    onPrimary: '#1D1713',
    overlay: 'rgba(0, 0, 0, 0.7)',
    border: '#3C3028',
    success: '#4BC391',
    warning: '#F8B46C',
    danger: '#F27777',
  },
} as const;

export const Radii = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

export const Typography = {
  title: {
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '700',
  },
  subtitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '400',
  },
  caption: {
    fontSize: 12,
    lineHeight: 16,
    fontWeight: '500',
  },
} as const;
