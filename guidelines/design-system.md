# Design System Documentation for Portfolio Website

## Color Palette

### Primary Colors

- **Dark Background**: #0E1824 (Deep blue-green dark)
- **Text White**: #FFFFFF (Pure white)
- **Coral Accent**: #FF6B6B (Vibrant coral pink for highlights and accents)
- **Gradient Background**: 
  - Base: #0E1824 (Dark blue-green)
  - Accent: #FF6B6B (Coral pink)
  - Pattern: Multiple radial gradients with 10-15% opacity of coral pink on dark background
  - Animation: Subtle rotation for dynamic effect

### Secondary Colors

- **Dark Blue-Green**: #1A2837 (Slightly lighter than main background)
- **Light Accent**: #B6FFD3 (Pale mint green for subtle accents)

## Typography

- **Primary Font**: Poppins
  - Weights: 300 (Light), 400 (Regular), 500 (Medium), 600 (Semi-bold), 700 (Bold)
  - Used for: All text elements

## Gradients

### Text Gradients
- **Primary**: From #1A2837 to #FF6B6B
- **Usage**: Headings and highlighted text

### Background Gradients
- **Primary**: Animated gradient with #0E1824 base and radial patterns of #FF6B6B at 10-15% opacity
- **Usage**: Page backgrounds, section backgrounds

## Animation
- **Background Rotation**: 30s linear infinite
- **Text Entry**: Fade and slide-up animation
- **Hover Effects**: Subtle scale and color transitions

## Spacing
- **Section Padding**: py-12 md:py-20
- **Content Width**: max-w-7xl mx-auto
- **Gutters**: px-4 sm:px-6 lg:px-8

## Components

### Buttons
- **Primary**: Coral pink background with white text
- **Secondary**: Transparent with coral pink border
- **Hover**: Slight scale and shadow effect

### Cards
- **Background**: #1A2837 with subtle border
- **Hover**: Slight elevation and scale effect
- **Content Padding**: p-6

- **Card Background**: #1A2837 (Dark blue-green, slightly lighter than main background)
- **Light Green**: #B6FFD3 (Pale mint green for accent elements)
- **Button Green**: #62E0A3 (Medium mint green)
- **Grey Text**: #B4B4B4 (Muted grey for secondary text)

### Accent/UI Colors

- **Action Button**: #4BF795 (Vibrant mint green)
- **Action Button Hover**: #3DD682 (Slightly darker mint green)
- **Link Text**: #4BF795 (Vibrant mint green)
- **Badge Background**: #1E3042 (Dark blue with slight transparency)

### Status Colors

- **Info Badges**: Various pastel colors (#B6FFD3, #FFE3B6, etc.) with dark text

## Typography

### Font Families

- **Primary Font**: Inter, -apple-system, BlinkMacSystemFont, sans-serif
- **Heading Font**: Same as primary (Inter)
- **UI Elements**: Same as primary (Inter)

### Font Sizes

- **Page Title**: 40px / 2.5rem (e.g., "The story of me being")
- **Section Headers**: 32px / 2rem (e.g., "Let's know more about me")
- **Subsection Headers**: 24px / 1.5rem (e.g., "My Tech Stacks")
- **Card Titles**: 18px / 1.125rem
- **Body Text**: 16px / 1rem
- **Small Text/Captions**: 14px / 0.875rem
- **Micro Text**: 12px / 0.75rem (e.g., footer text)

### Font Weights

- **Bold/Headers**: 700
- **Semi-Bold**: 600 (For subheaders)
- **Regular**: 400 (For body text)
- **Light**: 300 (For captions)

### Line Heights

- **Headers**: 1.2
- **Body Text**: 1.5
- **Small Text**: 1.4

## Spacing System

### Base Unit

- Base unit: 8px

### Spacing Scale

- **4xs**: 4px (0.25rem) - Minimum spacing
- **3xs**: 8px (0.5rem) - Tight spacing between related elements
- **2xs**: 12px (0.75rem) - Compact spacing
- **xs**: 16px (1rem) - Standard small spacing
- **sm**: 24px (1.5rem) - Medium spacing between related elements
- **md**: 32px (2rem) - Standard section spacing
- **lg**: 48px (3rem) - Large section spacing
- **xl**: 64px (4rem) - Extra large spacing between major sections
- **2xl**: 80px (5rem) - Maximum spacing between major page blocks

### Component Specific Spacing

- **Card Padding**: 24px (1.5rem)
- **Button Padding**: 12px 20px (0.75rem 1.25rem)
- **Navigation Item Spacing**: 24px (1.5rem)
- **Section Margins**: 80px (5rem) top and bottom

## Border Radius

- **Small Elements**: 4px (0.25rem)
- **Buttons**: 100px (6.25rem) - Fully rounded
- **Cards**: 16px (1rem)
- **Badges/Tags**: 100px (6.25rem) - Fully rounded

## Shadows

- **Card Shadow**: 0 8px 20px rgba(0, 0, 0, 0.2)
- **Hover Shadow**: 0 12px 24px rgba(0, 0, 0, 0.3)
- **Button Shadow**: 0 4px 12px rgba(75, 247, 149, 0.3) (For green buttons)

## Grid System

- **Container Max Width**: 1200px
- **Number of Columns**: 12
- **Gutter Width**: 24px (1.5rem)
- **Breakpoints**:
  - Mobile: < 576px
  - Tablet: 576px - 992px
  - Desktop: > 992px

## Components

### Buttons

- **Primary Button**:

  - Background: #4BF795
  - Text Color: #0E1824
  - Border Radius: 100px (6.25rem)
  - Padding: 12px 20px
  - Font Weight: 600
  - Transition: 0.3s ease all

- **Secondary Button**:
  - Background: Transparent
  - Border: 1px solid #4BF795
  - Text Color: #FFFFFF
  - Border Radius: 100px (6.25rem)
  - Padding: 12px 20px
  - Font Weight: 600

### Cards

- **Standard Card**:

  - Background: #1A2837
  - Border Radius: 16px
  - Padding: 24px
  - Shadow: 0 8px 20px rgba(0, 0, 0, 0.2)

- **Interactive Card**:
  - Default State: Same as Standard Card
  - Hover State: Transform: translateY(-5px), Shadow: 0 12px 24px rgba(0, 0, 0, 0.3)
  - Transition: 0.3s ease all

### Navigation

- **Nav Item**:
  - Text Color: #FFFFFF
  - Hover: Text Color: #4BF795
  - Active: Text Color: #4BF795
  - Font Weight: 500
  - Spacing Between Items: 24px

### Tags/Badges

- **Tag**:
  - Background: Varies (#B6FFD3, #FFE3B6, etc.)
  - Text Color: Dark color that contrasts with background
  - Border Radius: 100px (6.25rem)
  - Padding: 6px 12px
  - Font Size: 14px
  - Font Weight: 500

## Iconography

- **Icon Size**:
  - Small: 16px
  - Medium: 24px
  - Large: 32px
- **Icon Color**: Primarily #FFFFFF or #4BF795
- **Icon Style**: Rounded, modern, consistent stroke width

## Animations & Transitions

- **Standard Transition**: 0.3s ease all
- **Button Hover**: Slight scale (1.05) and shadow increase
- **Card Hover**: translateY(-5px) with increased shadow
- **Link Hover**: Color change with subtle underline animation

## Image Treatment

- **Border Radius for Images**: 12px (0.75rem)
- **Image Containers**: Overflow hidden with matching border radius
- **Hover Effects**: Slight scale (1.05) on interactive images

## Accessibility Guidelines

- **Text Contrast**: Maintains WCAG AA standard minimum (4.5:1 for normal text)
- **Focus States**: Visible outline on interactive elements for keyboard navigation
- **Text Size**: Minimum 14px for readability
- **Interactive Area**: Minimum 44x44px tap/click target for mobile

This design system provides a comprehensive foundation for the portfolio website, maintaining consistency across the dark mode interface with mint green accents that give it a modern, tech-focused aesthetic.
