# Design System - Monad AI Chat

## 🎨 Color Palette

### Primary Colors
```css
Background:     #0a0a0f (Deep Black)
Surface:        rgba(255, 255, 255, 0.03) (White 3%)
Border:         rgba(255, 255, 255, 0.05-0.10) (White 5-10%)
```

### Accent Colors
```css
Violet:         #8b5cf6 (Primary Accent)
Purple:         #a855f7 (Secondary Accent)
Gradient:       from-violet-500 to-purple-600
```

### Text Colors
```css
Primary:        #ffffff (White)
Secondary:      #e4e4e7 (Gray 200)
Tertiary:       #a1a1aa (Gray 400)
Muted:          #71717a (Gray 500)
Disabled:       #52525b (Gray 600)
```

### Semantic Colors
```css
Success:        #22c55e (Green)
Error:          #ef4444 (Red)
Warning:        #f59e0b (Amber)
Info:           #3b82f6 (Blue)
```

## 📐 Spacing Scale

```css
xs:   0.25rem (4px)
sm:   0.5rem  (8px)
md:   1rem    (16px)
lg:   1.5rem  (24px)
xl:   2rem    (32px)
2xl:  3rem    (48px)
3xl:  4rem    (64px)
```

## 🔤 Typography

### Font Family
```css
Primary: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif
```

### Font Sizes
```css
xs:   0.75rem  (12px)
sm:   0.875rem (14px)
base: 1rem     (16px)
lg:   1.125rem (18px)
xl:   1.25rem  (20px)
2xl:  1.5rem   (24px)
3xl:  1.875rem (30px)
4xl:  2.25rem  (36px)
```

### Font Weights
```css
normal:   400
medium:   500
semibold: 600
bold:     700
```

## 🎭 Effects

### Shadows
```css
sm:  0 1px 2px 0 rgba(0, 0, 0, 0.05)
md:  0 4px 6px -1px rgba(0, 0, 0, 0.1)
lg:  0 10px 15px -3px rgba(0, 0, 0, 0.1)
xl:  0 20px 25px -5px rgba(0, 0, 0, 0.1)

Colored (Violet):
shadow-violet-500/20
shadow-violet-500/30
```

### Blur
```css
backdrop-blur-sm:  4px
backdrop-blur-md:  12px
backdrop-blur-lg:  16px
backdrop-blur-xl:  24px
backdrop-blur-2xl: 40px
```

### Border Radius
```css
sm:   0.375rem (6px)
md:   0.5rem   (8px)
lg:   0.75rem  (12px)
xl:   1rem     (16px)
2xl:  1.5rem   (24px)
full: 9999px
```

## 🎬 Animations

### Durations
```css
fast:     150ms
normal:   200ms
slow:     300ms
slower:   500ms
```

### Easing
```css
ease-out:     cubic-bezier(0, 0, 0.2, 1)
ease-in-out:  cubic-bezier(0.4, 0, 0.2, 1)
spring:       type: 'spring', damping: 30, stiffness: 300
```

### Common Animations
```css
Fade In:
  initial: { opacity: 0 }
  animate: { opacity: 1 }
  duration: 0.2s

Slide Up:
  initial: { opacity: 0, y: 20 }
  animate: { opacity: 1, y: 0 }
  duration: 0.3s

Scale:
  whileHover: { scale: 1.02 }
  whileTap: { scale: 0.98 }
```

## 🧩 Components

### Button
```css
Primary:
  bg-gradient-to-r from-violet-600 to-purple-600
  hover:from-violet-500 hover:to-purple-500
  rounded-xl px-4 py-3.5
  shadow-lg shadow-violet-500/20

Secondary:
  bg-white/[0.03] hover:bg-white/[0.05]
  border border-white/10
  rounded-xl px-4 py-3
```

### Input
```css
bg-white/[0.03]
border border-white/10
rounded-2xl px-5 py-4
focus:ring-2 focus:ring-violet-500/50
```

### Card
```css
bg-white/[0.02]
border border-white/10
rounded-xl p-4
backdrop-blur-sm
```

### Message Bubble
```css
User:
  bg-gradient-to-br from-violet-600 to-purple-600
  rounded-2xl px-5 py-3.5
  shadow-lg shadow-violet-500/20

AI:
  bg-white/[0.03]
  border border-white/10
  rounded-2xl px-5 py-3.5
  backdrop-blur-sm
```

## 🎯 States

### Hover
```css
Scale: 1.01-1.05
Opacity: Increase by 0.1
Background: Lighten by 0.02
Border: Increase opacity by 0.05
```

### Active/Focus
```css
Ring: 2px solid violet-500/50
Scale: 0.98-0.99
```

### Disabled
```css
Opacity: 0.4-0.5
Cursor: not-allowed
Pointer Events: none
```

## 📱 Responsive Breakpoints

```css
sm:  640px
md:  768px
lg:  1024px
xl:  1280px
2xl: 1536px
```

## ♿ Accessibility

### Focus Indicators
```css
outline: 2px solid rgba(139, 92, 246, 0.5)
outline-offset: 2px
```

### Color Contrast
- All text meets WCAG AA standards
- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text

### Interactive Elements
- Minimum touch target: 44x44px
- Clear focus indicators
- Keyboard navigation support

## 🎨 Design Principles

### 1. Clarity
- Clear visual hierarchy
- Consistent spacing
- Readable typography

### 2. Simplicity
- Minimal design elements
- Purposeful animations
- Clean layouts

### 3. Consistency
- Reusable components
- Consistent patterns
- Predictable interactions

### 4. Performance
- Optimized animations
- Efficient rendering
- Fast load times

### 5. Accessibility
- Keyboard navigation
- Screen reader support
- High contrast

## 🔧 Usage Examples

### Creating a Button
```tsx
<button className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-xl px-4 py-3.5 transition-all duration-200 shadow-lg shadow-violet-500/20">
  Click Me
</button>
```

### Creating a Card
```tsx
<div className="bg-white/[0.02] border border-white/10 rounded-xl p-4 backdrop-blur-sm hover:bg-white/[0.04] transition-all duration-200">
  Card Content
</div>
```

### Creating an Input
```tsx
<input className="w-full bg-white/[0.03] text-white rounded-2xl px-5 py-4 border border-white/10 focus:outline-none focus:ring-2 focus:ring-violet-500/50 transition-all duration-200" />
```

---

This design system ensures consistency across the entire application and provides a foundation for future development.

