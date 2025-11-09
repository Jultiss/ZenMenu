# 🎨 ZenMenu - Design System Documentation

> **Style:** Wellness/Santé moderne inspiré de Headspace & Calm  
> **Public cible:** 30-55 ans, problèmes digestifs/reflux  
> **Objectif:** Interface apaisante, rassurante, professionnelle

---

## 🎨 Palette de Couleurs

### Couleurs Principales

```css
/* Bleu Apaisant - Digestion/Santé */
--primary-color: #4A90E2
--primary-hover: #357ABD
--primary-light: #7FB3F0
--primary-lightest: #E8F3FC

/* Vert Menthe - Anti-reflux/Naturel */
--secondary-color: #00D4AA
--secondary-hover: #00B894
--secondary-light: #66E5CC
--secondary-lightest: #E6FAF6

/* Violet Doux - Accent */
--accent-color: #7B68EE
--accent-hover: #6251D6
--accent-light: #A396F5
--accent-lightest: #F0EDFF
```

### Couleurs de Fond

```css
--bg-primary: #FFFFFF         /* Blanc pur */
--bg-secondary: #F8FAFB       /* Blanc cassé principal */
--bg-tertiary: #F0F4F8        /* Gris très clair */
--bg-card: #FFFFFF            /* Cards */
```

### Texte

```css
--text-primary: #2C3E50       /* Gris foncé - Texte principal */
--text-secondary: #5A6C7D     /* Texte secondaire */
--text-tertiary: #95A5B8      /* Texte tertiaire/placeholders */
--text-white: #FFFFFF         /* Blanc sur fonds colorés */
--text-muted: #B8C5D3         /* Texte désactivé */
```

---

## 🌈 Gradients

```css
--gradient-primary: linear-gradient(135deg, #4A90E2 0%, #7FB3F0 100%)
--gradient-secondary: linear-gradient(135deg, #00D4AA 0%, #66E5CC 100%)
--gradient-accent: linear-gradient(135deg, #7B68EE 0%, #A396F5 100%)
--gradient-wellness: linear-gradient(135deg, #4A90E2 0%, #7B68EE 50%, #00D4AA 100%)
--gradient-header: linear-gradient(135deg, #4A90E2 0%, #6A7FE8 100%)
```

**Usage:**
- `gradient-primary` : Boutons principaux, headers
- `gradient-secondary` : Actions positives (sauvegarder, confirmer)
- `gradient-accent` : Éléments de navigation, highlights
- `gradient-wellness` : Slider de calories, éléments décoratifs
- `gradient-header` : En-tête de l'application

---

## 📐 Espacements

```css
--spacing-xs: 0.5rem    /* 8px */
--spacing-sm: 0.75rem   /* 12px */
--spacing-md: 1rem      /* 16px */
--spacing-lg: 1.5rem    /* 24px */
--spacing-xl: 2rem      /* 32px */
--spacing-2xl: 3rem     /* 48px */
--spacing-3xl: 4rem     /* 64px */
```

---

## 🔲 Rayons de Bordure (iOS 26 Style)

```css
--radius-xs: 8px
--radius-sm: 12px
--radius-md: 16px
--radius-lg: 20px        /* Default - Cards, inputs */
--radius-xl: 24px        /* Cards du plan */
--radius-2xl: 28px       /* Sections principales */
--radius-3xl: 32px       /* Containers large */
--radius-full: 9999px    /* Pills/Boutons */
```

**Recommandations:**
- Boutons: `radius-full` (pills)
- Cards plan: `radius-xl` (24px)
- Inputs/Selects: `radius-2xl` (28px)
- Sections: `radius-2xl` (28px)

---

## 💫 Ombres Douces

```css
--shadow-xs: 0 1px 2px 0 rgba(0, 0, 0, 0.02)
--shadow-sm: 0 2px 4px 0 rgba(74, 144, 226, 0.06)
--shadow-md: 0 4px 12px 0 rgba(74, 144, 226, 0.08)
--shadow-lg: 0 8px 24px 0 rgba(74, 144, 226, 0.12)
--shadow-xl: 0 12px 32px 0 rgba(74, 144, 226, 0.15)
--shadow-card: 0 2px 8px 0 rgba(74, 144, 226, 0.04)
--shadow-float: 0 8px 16px -4px rgba(74, 144, 226, 0.12)
```

**Note:** Toutes les ombres ont une teinte bleue (#4A90E2) pour cohérence.

---

## 🎭 Glassmorphisme

```css
--glass-bg: rgba(255, 255, 255, 0.7)
--glass-border: rgba(255, 255, 255, 0.3)
--glass-shadow: 0 8px 32px 0 rgba(74, 144, 226, 0.1)
```

**Usage:** Navigation bottom bar, overlays, modals

```css
.navigation {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  box-shadow: var(--glass-shadow);
}
```

---

## ✨ Transitions & Animations

```css
--transition-fast: 0.15s cubic-bezier(0.4, 0, 0.2, 1)
--transition-base: 0.25s cubic-bezier(0.4, 0, 0.2, 1)
--transition-slow: 0.35s cubic-bezier(0.4, 0, 0.2, 1)
--transition-bounce: 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)
```

**Micro-interactions:**

```css
/* Bouton standard */
.btn {
  transition: all var(--transition-base);
}
.btn:hover {
  transform: translateY(-2px) scale(1.02);
}
.btn:active {
  transform: translateY(0) scale(0.98);
}

/* Bouton portion - Bounce effect */
.btn-portion:hover {
  transform: scale(1.2) rotate(10deg);
  transition: all var(--transition-bounce);
}

/* Slider thumb */
.slider-thumb:hover {
  transform: scale(1.2);
  cursor: grab;
}
.slider-thumb:active {
  cursor: grabbing;
  transform: scale(1.1);
}
```

---

## 📝 Typographie

### Tailles

```css
--font-size-xs: 0.75rem    /* 12px */
--font-size-sm: 0.875rem   /* 14px */
--font-size-base: 1rem     /* 16px */
--font-size-lg: 1.125rem   /* 18px */
--font-size-xl: 1.25rem    /* 20px */
--font-size-2xl: 1.5rem    /* 24px */
--font-size-3xl: 1.875rem  /* 30px */
```

### Poids

```css
--font-weight-normal: 400
--font-weight-medium: 500
--font-weight-semibold: 600
--font-weight-bold: 700
--font-weight-extrabold: 800
```

### Stack

```
-apple-system, BlinkMacSystemFont, 'Inter', 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif
```

---

## 🎯 Composants

### Boutons

#### Bouton Principal (Primary)
```css
.btn-primary {
  background: var(--gradient-primary);
  color: white;
  padding: var(--spacing-sm) var(--spacing-xl);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.3px;
  box-shadow: var(--shadow-md);
}
```

#### Bouton Secondaire
```css
.btn-secondary {
  background: white;
  color: var(--text-secondary);
  border: 2px solid var(--border-medium);
}
.btn-secondary:hover {
  border-color: var(--primary-color);
  color: var(--primary-color);
  background: var(--primary-lightest);
}
```

### Cards

```css
.card {
  background: var(--bg-card);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-card);
  padding: var(--spacing-md);
}

.card:hover {
  border-color: var(--primary-light);
  transform: translateY(-4px);
  box-shadow: var(--shadow-float);
  background: linear-gradient(135deg, #FFFFFF 0%, var(--primary-lightest) 100%);
}
```

### Inputs

```css
.input {
  padding: var(--spacing-md) var(--spacing-lg);
  border: 2px solid var(--border-light);
  border-radius: var(--radius-2xl);
  font-size: var(--font-size-base);
  background: var(--bg-card);
}

.input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 4px var(--primary-lightest);
  transform: translateY(-2px);
}
```

### Chips/Tags (Filtres)

```css
.chip {
  padding: var(--spacing-sm) var(--spacing-lg);
  border: 2px solid var(--border-medium);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.chip.active {
  background: var(--gradient-primary);
  color: white;
  border-color: var(--primary-color);
  box-shadow: var(--shadow-md);
}
```

---

## 📱 Responsive

### Breakpoints

```css
/* Mobile */
@media (max-width: 767px) { }

/* Tablet */
@media (min-width: 768px) and (max-width: 1199px) { }

/* Desktop */
@media (min-width: 1200px) { }
```

### Safe Areas iOS

```css
/* Header */
padding-top: max(var(--spacing-lg), calc(env(safe-area-inset-top) + 0.5rem));

/* Navigation bottom */
padding-bottom: calc(var(--spacing-xs) + env(safe-area-inset-bottom));

/* Content */
padding-bottom: max(90px, calc(90px + env(safe-area-inset-bottom)));
```

---

## 🎨 Exemples d'Usage

### Header avec Gradient

```css
.app-header {
  background: var(--gradient-header);
  color: var(--text-white);
  padding: var(--spacing-lg) var(--spacing-lg) var(--spacing-xl);
  border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
}
```

### Slider Moderne

```css
.slider {
  background: var(--gradient-wellness);
  height: 10px;
  border-radius: var(--radius-full);
}

.slider-thumb {
  width: 28px;
  height: 28px;
  background: white;
  border: 4px solid var(--primary-color);
  box-shadow: var(--shadow-md);
  cursor: grab;
}

.slider-thumb:hover {
  transform: scale(1.2);
  box-shadow: var(--shadow-lg);
}
```

### Navigation Bottom Bar

```css
.navigation {
  background: var(--glass-bg);
  backdrop-filter: blur(24px) saturate(180%);
  border-top: 1px solid var(--border-light);
  box-shadow: 0 -4px 24px rgba(74, 144, 226, 0.08);
}

.nav-link.active {
  color: var(--primary-color);
  background: var(--primary-lightest);
}

.nav-link.active::before {
  content: '';
  background: var(--gradient-primary);
  height: 3px;
  border-radius: 0 0 var(--radius-sm) var(--radius-sm);
}
```

---

## ♿ Accessibilité

### Contraste

Tous les textes respectent WCAG AA:
- Texte normal: ratio minimum 4.5:1
- Texte large: ratio minimum 3:1

### Taille des zones tactiles

Minimum 44x44px pour les boutons sur mobile (Apple HIG)

```css
button {
  min-height: 44px;
  min-width: 44px;
}
```

### Focus visible

```css
:focus-visible {
  outline: 2px solid var(--primary-color);
  outline-offset: 2px;
}
```

---

## 🎯 Principes de Design

1. **Apaisant:** Couleurs douces, transitions fluides
2. **Rassurant:** Hiérarchie claire, feedback visuel
3. **Moderne:** Coins arrondis iOS, glassmorphisme
4. **Professionnel:** Cohérence, simplicité
5. **Accessible:** Contrastes conformes, zones tactiles suffisantes

---

## 📦 Export Figma/Design Tools

### Tokens JSON

Pour importer dans Figma Tokens:

```json
{
  "colors": {
    "primary": "#4A90E2",
    "secondary": "#00D4AA",
    "accent": "#7B68EE"
  },
  "spacing": {
    "xs": "8px",
    "sm": "12px",
    "md": "16px",
    "lg": "24px"
  },
  "radius": {
    "full": "9999px",
    "xl": "24px",
    "2xl": "28px"
  }
}
```

---

**Version:** 2.0 - Refonte Wellness  
**Dernière mise à jour:** Novembre 2024  
**Responsable:** ZenMenu Design Team
