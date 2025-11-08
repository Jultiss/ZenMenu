# 📝 Changelog - ZenMenu

## [2.0.0] - 8 Novembre 2024

### 🎉 Refonte majeure de l'application

#### ✨ Nouvelles fonctionnalités

##### 1. **Script d'enrichissement automatique**
- ✅ Ajout automatique des rayons pour 1200 ingrédients
- ✅ Génération automatique de tags de compatibilité pour 500 recettes
- ✅ Mapping intelligent de 60+ ingrédients communs
- ✅ Détection automatique basée sur les noms et préparations
- **Fichier** : `scripts/enrichir-json.js`

##### 2. **Page de recherche avancée**
- ✅ Recherche textuelle par nom de recette
- ✅ Filtres multiples par tags (6 tags disponibles)
- ✅ Filtre par catégorie (5 catégories)
- ✅ Filtre par calories avec slider interactif
- ✅ Grille moderne avec cards cliquables
- ✅ Modal de détail complet pour chaque recette
- ✅ Compteur de résultats en temps réel
- **Route** : `/recherche`

##### 3. **Navigation par pages avec React Router**
- ✅ 3 pages distinctes avec URLs propres
- ✅ Bottom navigation iOS-style sur mobile
- ✅ Top navigation sur desktop
- ✅ Indicateurs visuels de page active
- ✅ Animations de transition fluides
- ✅ Support du bouton retour
- **Dépendance** : `react-router-dom@6.x.x`

##### 4. **Tri automatique de la liste de courses**
- ✅ Organisation par rayons du magasin
- ✅ Utilisation du champ `rayon` du JSON
- ✅ Fallback sur catégorisation automatique
- ✅ 8 rayons prédéfinis
- ✅ Export optimisé avec bouton copier

#### 🎨 Améliorations UI/UX

##### Design modernisé
- ✅ Gradients sur tous les boutons et badges
- ✅ Glassmorphism avec backdrop-filter
- ✅ Typography audacieuse (weights 700-800)
- ✅ Shadows subtiles pour la profondeur
- ✅ Palette de couleurs cohérente
- ✅ Animations micro-interactions

##### Composants créés
- ✅ **DetailRecette** - Modal fullscreen pour détails complets
- ✅ **Navigation** - Barre de navigation bottom/top
- ✅ **PlanPage** - Page du plan hebdomadaire
- ✅ **CoursesPage** - Page de la liste de courses
- ✅ **RecherchePage** - Page de recherche avancée

##### Ergonomie mobile perfectionnée
- ✅ Bottom navigation fixe (70px + safe area)
- ✅ Touch targets 44x44px minimum (iOS guidelines)
- ✅ Swipe gestures naturels
- ✅ Modals fullscreen sur mobile
- ✅ Grilles responsives adaptatives
- ✅ Support complet des safe areas iOS
- ✅ Scroll optimisé avec momentum

#### 🔧 Modifications techniques

##### Types TypeScript mis à jour
```typescript
// Ingredient
rayon?: string;

// Recette
calories?: number;
preparation?: string;
compatibilite?: string[];

// RecettesData
desserts?: Recette[];
meta?: {
  titre?: string;
  description?: string;
  principes?: string[];
  portions_defaut?: number;
};
```

##### Fonctions mises à jour
- `genererListeCourses()` - Retourne `IngredientListeCourses[]` avec rayon
- `trouverRecette()` - Support du champ `desserts`
- `obtenirRecettesParType()` - Mapping des types de repas

##### Structure des fichiers
```
src/
├── pages/              # Nouvelles pages
│   ├── PlanPage.tsx
│   ├── CoursesPage.tsx
│   ├── RecherchePage.tsx
│   └── RecherchePage.css
├── components/
│   ├── Navigation.tsx  # Nouvelle navigation
│   ├── Navigation.css
│   ├── DetailRecette.tsx
│   └── DetailRecette.css
scripts/
└── enrichir-json.js    # Script d'enrichissement
```

#### 📊 Données

##### JSON enrichi
- **1200 ingrédients** avec rayons
- **500 recettes** avec tags de compatibilité
- **8 rayons** prédéfinis
- **6 tags** de compatibilité

##### Tags disponibles
- `faible gras` - Cuissons vapeur/four/pochage
- `digestion facile` - Cuissons douces
- `anti-reflux` - Sans irritants (ail, oignon, épices)
- `protéines maigres` - Poulet, dinde, poissons blancs
- `perte de poids` - Moins de 450 kcal
- `riche en fibres` - Quinoa, riz complet, légumes

##### Rayons organisés
1. Fruits & légumes frais
2. Viandes & poissons maigres
3. Féculents & céréales
4. Produits laitiers
5. Condiments & huiles
6. Épices & aromates
7. Boissons / infusions
8. Autres

#### 📖 Documentation

##### Fichiers créés
- ✅ `GUIDE_UTILISATION.md` - Guide complet utilisateur
- ✅ `README_NOUVELLES_FONCTIONNALITES.md` - Documentation technique
- ✅ `scripts/README.md` - Documentation du script
- ✅ `DEMARRAGE_RAPIDE.md` - Guide de démarrage
- ✅ `CHANGELOG.md` - Ce fichier

##### Commentaires inline
- ✅ Tous les nouveaux composants commentés
- ✅ Types TypeScript documentés
- ✅ Props des composants expliquées

#### 🐛 Corrections

##### Bugs résolus
- ✅ Overflow horizontal en mode portrait (iPhone)
- ✅ Badges de repas tronqués
- ✅ Boutons +/- portions déformés
- ✅ Modal de sélection de recettes coupé
- ✅ Utilisation incorrecte de `aliments_joker` (remplacé par `desserts`)

##### Optimisations
- ✅ CSS optimisé pour mobile
- ✅ Lazy loading implicite avec React Router
- ✅ Performances de filtrage optimisées (useMemo)
- ✅ Build size optimisé (193 kB gzipped)

#### 🔄 Breaking Changes

##### Migration nécessaire
- Le champ `aliments_joker` dans RecettesData devient `desserts` (optionnel)
- Les onglets sont remplacés par React Router (navigation par pages)
- `genererListeCourses()` retourne maintenant un tableau au lieu d'une Map

##### Migrations automatiques
- Le script d'enrichissement peut être relancé sans risque
- Les anciennes données sont préservées lors de l'enrichissement

---

## [1.0.0] - Version initiale

### Fonctionnalités de base
- Plan hebdomadaire avec 4 types de repas
- Gestion des portions
- Liste de courses basique
- Recherche par ingrédients
- LocalStorage pour persistance

---

## 🚀 Prochaines versions planifiées

### [2.1.0] - Améliorations UX
- [ ] Mode sombre
- [ ] Favoris et recettes sauvegardées
- [ ] Historique des plans
- [ ] Suggestions intelligentes

### [2.2.0] - Fonctionnalités sociales
- [ ] Partage de plan (lien unique)
- [ ] Export PDF
- [ ] Impression optimisée
- [ ] QR code pour partage

### [3.0.0] - PWA complète
- [ ] Installation sur écran d'accueil
- [ ] Fonctionnement offline
- [ ] Notifications repas
- [ ] Synchronisation cloud

---

## 📝 Notes de migration

### De 1.0.0 vers 2.0.0

1. **Installer React Router** :
   ```bash
   npm install react-router-dom
   ```

2. **Enrichir le JSON** :
   ```bash
   node scripts/enrichir-json.js
   ```

3. **Rebuild** :
   ```bash
   npm run build
   ```

4. **Tester** :
   ```bash
   npm run dev
   ```

---

## 🙏 Contributions

Cette version a été développée avec les objectifs suivants :
- ✅ Ergonomie mobile parfaite (iPhone 16)
- ✅ Exploitation complète des données JSON
- ✅ Navigation moderne par pages
- ✅ Système de filtrage puissant
- ✅ Documentation exhaustive

---

**Version actuelle** : 2.0.0  
**Dernière mise à jour** : 8 novembre 2024  
**Status** : ✅ Stable et prêt pour production
