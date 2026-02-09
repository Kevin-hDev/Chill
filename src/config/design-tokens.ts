// src/config/design-tokens.ts
// Centralized design tokens — NEVER hardcode values elsewhere

export const colors = {
  dark: {
    bgPrimary: '#08090a',
    bgElevated: '#111214',
    bgSurface: '#161719',
    border: '#1e2025',
    borderSubtle: '#151618',
    textPrimary: '#f7f8f8',
    textSecondary: '#8a8f98',
    textMuted: '#5c6170',
    accent: '#10B981',
    accentHover: '#34d399',
    accentGlow: 'rgba(16, 185, 129, 0.15)',
    blue: '#4ea7fc',
    red: '#eb5757',
    green: '#4cb782',
    orange: '#fc7840',
  },
  light: {
    bgPrimary: '#fafafa',
    bgElevated: '#ffffff',
    bgSurface: '#f4f4f5',
    border: '#e5e7eb',
    borderSubtle: '#f0f0f2',
    textPrimary: '#111214',
    textSecondary: '#6b7280',
    textMuted: '#9ca3af',
    accent: '#059669',
    accentHover: '#047857',
    accentGlow: 'rgba(5, 150, 105, 0.1)',
    blue: '#2563eb',
    red: '#dc2626',
    green: '#16a34a',
    orange: '#ea580c',
  },
} as const;

export const typography = {
  fonts: {
    heading: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
    body: '"Plus Jakarta Sans Variable", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    mono: '"JetBrains Mono", "Fira Code", "Cascadia Code", monospace',
  },
  sizes: {
    heroH1: '4rem',         // 64px
    h2: '2.5rem',           // 40px
    h3: '1.5rem',           // 24px
    body: '1.0625rem',      // 17px
    bodySmall: '0.9375rem', // 15px
    code: '0.875rem',       // 14px
    micro: '0.8125rem',     // 13px
  },
  weights: {
    regular: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
  },
  letterSpacing: {
    heroH1: '-1.4px',
    h2: '-1px',
    h3: '-0.5px',
    body: '0',
    bodySmall: '-0.011em',
  },
} as const;

export const spacing = {
  headerHeight: '64px',
  pagePaddingInline: '24px',
  pageMaxWidth: '1024px',
  sectionGap: '120px',
  radius: {
    sm: '4px',
    md: '6px',
    lg: '8px',
    xl: '12px',
    '2xl': '16px',
  },
} as const;

export const effects = {
  noiseOpacity: '0.03',
  glowBorderOpacity: '0.4',
  meshGradientSize: '600px',
  cardShadow: '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.08)',
  cardShadowHover: '0 4px 12px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.1)',
} as const;
