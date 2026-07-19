---
name: Obsidian Red Pro
colors:
  surface: '#131313'
  surface-dim: '#131313'
  surface-bright: '#3a3939'
  surface-container-lowest: '#0e0e0e'
  surface-container-low: '#1c1b1b'
  surface-container: '#201f1f'
  surface-container-high: '#2a2a2a'
  surface-container-highest: '#353534'
  on-surface: '#e5e2e1'
  on-surface-variant: '#ebbbb4'
  inverse-surface: '#e5e2e1'
  inverse-on-surface: '#313030'
  outline: '#b18780'
  outline-variant: '#603e39'
  surface-tint: '#ffb4a8'
  primary: '#ffb4a8'
  on-primary: '#690100'
  primary-container: '#ff5540'
  on-primary-container: '#5c0000'
  inverse-primary: '#c00100'
  secondary: '#c8c6c5'
  on-secondary: '#313030'
  secondary-container: '#474746'
  on-secondary-container: '#b7b5b4'
  tertiary: '#ffb4a8'
  on-tertiary: '#620f08'
  tertiary-container: '#e26e5d'
  on-tertiary-container: '#590703'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdad4'
  primary-fixed-dim: '#ffb4a8'
  on-primary-fixed: '#410000'
  on-primary-fixed-variant: '#930100'
  secondary-fixed: '#e5e2e1'
  secondary-fixed-dim: '#c8c6c5'
  on-secondary-fixed: '#1c1b1b'
  on-secondary-fixed-variant: '#474746'
  tertiary-fixed: '#ffdad4'
  tertiary-fixed-dim: '#ffb4a8'
  on-tertiary-fixed: '#410000'
  on-tertiary-fixed-variant: '#82271c'
  background: '#131313'
  on-background: '#e5e2e1'
  surface-variant: '#353534'
typography:
  display-lg:
    fontFamily: Hanken Grotesk
    fontSize: 48px
    fontWeight: '700'
    lineHeight: 56px
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Hanken Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 40px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Hanken Grotesk
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 28px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  label-bold:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
  caption:
    fontFamily: Hanken Grotesk
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  gutter: 24px
  margin-mobile: 16px
  margin-desktop: 64px
---

## Brand & Style
The design system embodies a high-performance, cinematic aesthetic tailored for professional-grade software. It leverages a **Liquid Glass** style, merging the depth of dark glassmorphism with high-impact, aggressive red accents. The personality is authoritative, precise, and fast—evoking the feeling of a supercar cockpit or a premium developer environment.

The visual language is defined by deep obsidian surfaces, structural red light-leaks, and refined roundedness. It prioritizes focus by eliminating visual noise, using vibrant red only to signal action, status, or intent. The atmosphere is strictly dark, maintaining a "Pro Edition" feel that reduces eye strain while commanding attention.

## Colors
The palette is a dual-tone system of high-performance red and deep black.
- **Primary Red (#FF0000):** Used sparingly for critical CTAs, active states, and focus indicators.
- **Obsidian Core (#000000 - #080808):** The foundational background and surface colors.
- **Secondary Glass (#1A1A1A):** Used for semi-transparent layers with backdrop blurring.
- **Deep Crimson (#4D0000):** Used for subdued glows and low-priority background accents.

Strictly avoid white backgrounds or light gray surfaces. Contrast is achieved through luminous red highlights against true black.

## Typography
The system uses **Hanken Grotesk** exclusively to maintain a sharp, technical, and contemporary feel. 
- **Headlines:** Use heavy weights (700+) with tighter letter spacing for a high-impact, editorial look.
- **Body:** Standardized at 16px for optimal legibility against dark backgrounds.
- **Labels:** Small caps or uppercase with increased tracking are used for metadata and technical indicators to enhance the "instrument panel" aesthetic.
- **Color:** Text should be pure white for primary information and mid-tone gray (#A0A0A0) for secondary details. Use Primary Red only for critical semantic highlights.

## Layout & Spacing
The layout follows a strict 4px grid system to ensure mathematical precision. 
- **Grid:** Use a 12-column fluid grid for desktop with wide 64px margins to create a premium, spacious feel.
- **Padding:** High-internal padding (24px+) within cards and containers is required to support the large corner radii.
- **Hierarchy:** Use spacing rather than lines to separate content wherever possible, preserving the "liquid" feel of the interface.

## Elevation & Depth
Depth is created through **Liquid Glass** layering rather than traditional shadows.
- **Base Layer:** True Black (#000000).
- **Surface Layer:** Semi-transparent Black (#080808 at 80% opacity) with a 20px backdrop blur.
- **Borders:** 1px solid borders are used to define edges. Use a dark red (#330000) for inactive states and a vibrant red (#FF0000) for active or hovered states.
- **Inner Glow:** Elements should have a subtle 1px inner-top highlight of #FFFFFF at 5% opacity to simulate light hitting glass edges.
- **Ambient Glow:** Use "Red Atmospheric Diffusion"—soft, large-radius blurs of #FF0000 at 5-10% opacity placed behind primary containers to create a sense of backlighting.

## Shapes
The shape language is ultra-smooth and premium.
- **Containers:** Use a base radius of 24px (`rounded-xl` equivalent) for all main cards and modals to achieve the "Liquid" look.
- **Buttons/Inputs:** Use 12px to 16px radius. 
- **Visual Consistency:** Ensure that nested elements have proportional radii (outer radius minus padding) to maintain geometric harmony.

## Components
- **Buttons:** 
  - *Primary:* Solid Red (#FF0000) with white text. Apply a subtle outer red glow on hover.
  - *Secondary:* Glass background with a 1px Red border.
- **Cards:** Glassmorphic fill (True Black @ 70% opacity), 24px border radius, and a 1px #1A1A1A border. On hover, the border transitions to Primary Red.
- **Inputs:** Dark obsidian backgrounds (#080808) with a 1px bottom border. On focus, the border expands to a full 1px Primary Red frame with a faint red outer glow.
- **Chips:** High-contrast small badges with black text on a primary red background for "Active" or "Live" status.
- **Progress Bars:** Thin 2px lines. The track is #1A1A1A, and the indicator is #FF0000 with a motion-blur glow effect.
- **Lists:** Separated by 1px dark gray (#1A1A1A) lines with generous vertical padding (16px+).