# Chill Product Page — Design

## Context

Chill is a free desktop app (Windows + Linux) that packages SSH, Wake-on-LAN, and Tailscale configuration into a single tool. It's not exclusively tied to ChillShell — anyone needing remote access can use it. Tailscale is built in (no separate install needed). Each feature is configured in one click (3 clicks total for full setup). Download links are not ready yet (placeholders).

## Page Structure — Approach A: Hero + Feature Sections

### 1. Hero
- H1: "Chill"
- Tagline: "SSH, Wake-on-LAN, and Tailscale — in three clicks."
- Subtitle explaining the all-in-one value proposition
- Download buttons (placeholder/disabled for now)
- Badge: "Free · Windows & Linux"
- Image: 0.png (dashboard screenshot)

### 2. SSH Setup Section (image right)
- H2: "SSH in one click"
- Text: explains one-click SSH server install and activation
- Image: 1.png

### 3. Wake-on-LAN Section (image left — alternating layout)
- H2: "Wake-on-LAN, simplified"
- Text: explains WoL config automation, BIOS still manual
- Image: 2.png

### 4. Tailscale Section (image right)
- H2: "Tailscale built in"
- Text: explains built-in Tailscale (no separate install), sign in/create account
- Image: 3.png

### 5. CTA Section
- Download buttons (placeholder)
- Link to manual tutorials as alternative

## Technical Notes

- Images are localized (en/fr) and themed (dark/light) at: `public/images/chill/{lang}/{theme}/{0-3}.png`
- Uses `useTheme` hook for runtime theme detection
- Language determined at page level via `getLangFromUrl()`
- Feature sections use simple grid layout with scroll reveal animations (no 3D perspective)
- SEO/GEO will be refined in a later pass

## Key Messaging

- NOT "ChillShell companion" — Chill is useful for anyone doing remote access
- Tailscale is BUILT IN — no need to install it separately
- Three clicks, not one — one click per feature
- Free, no strings attached
