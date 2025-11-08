# 🚀 Démarrage Rapide - ZenMenu

## ✅ Statut actuel

- ✅ **1200 ingrédients** enrichis avec des rayons
- ✅ **500 recettes** enrichies avec des tags de compatibilité
- ✅ Application compilée avec succès
- ✅ React Router configuré
- ✅ Navigation par pages opérationnelle
- ✅ Système de filtrage avancé prêt

## 🎯 Lancer l'application

### Mode développement
```bash
npm run dev
```
Puis ouvrir : http://localhost:5173

### Mode production (preview)
```bash
npm run build
npm run preview
```

## 📱 Pages disponibles

### 1. **Plan Hebdomadaire** - `/`
**Fonctionnalités :**
- 📅 Planifier vos repas pour la semaine
- ➕➖ Ajuster les portions avec les boutons +/-
- 🎲 Générer un plan aléatoire
- 🔄 Changer chaque recette individuellement
- ℹ️ Voir les détails de chaque recette (calories, ingrédients, préparation)

**Comment utiliser :**
1. Cliquer sur "🎲 Plan aléatoire" pour remplir la semaine
2. Cliquer sur un repas pour le changer
3. Utiliser +/- pour ajuster les portions
4. Cliquer sur ℹ️ pour voir tous les détails

### 2. **Recherche Avancée** - `/recherche`
**Fonctionnalités :**
- 🔍 Recherche textuelle par nom
- 📊 Filtre par calories (slider)
- 🏷️ Filtres par tags multiples
- 📂 Filtre par catégorie (petit déj, déj, dîner, etc.)
- 💳 Cards interactives avec hover effects
- ℹ️ Modal de détail complet

**Tags disponibles :**
- `faible gras` - Cuissons vapeur/four
- `digestion facile` - Préparations douces
- `anti-reflux` - Sans irritants
- `protéines maigres` - Poulet, dinde, poissons
- `perte de poids` - < 450 kcal
- `riche en fibres` - Quinoa, légumes, fruits

**Comment utiliser :**
1. Taper un nom de recette dans la barre de recherche
2. Sélectionner des filtres (tags multiples possibles)
3. Ajuster le slider de calories
4. Cliquer sur une card pour voir les détails
5. 500 recettes à explorer !

### 3. **Liste de Courses** - `/courses`
**Fonctionnalités :**
- 🛒 Liste automatique basée sur votre plan
- 📦 Triée par rayons du magasin
- ✖️ Quantités multipliées selon les portions
- 📋 Bouton copier pour export

**Rayons organisés :**
1. Fruits & légumes frais
2. Viandes & poissons maigres
3. Féculents & céréales
4. Produits laitiers
5. Condiments & huiles
6. Épices & aromates
7. Boissons / infusions
8. Autres

**Comment utiliser :**
1. Planifier vos repas sur la page Plan
2. Aller sur /courses
3. Copier la liste avec 📋
4. Coller dans Notes ou autre app

## 🎨 Navigation

### Mobile (iPhone)
- **Bottom navigation** fixe avec 3 onglets
- **Indicateur visuel** sur l'onglet actif
- **Animations** fluides entre les pages
- **Touch targets** optimaux (44x44px)

### Desktop
- **Top navigation** horizontale
- **Hover effects** sur les onglets
- **Layout** adaptatif

## 🔧 Enrichir à nouveau le JSON

Si vous modifiez `recettes.json` manuellement :
```bash
node scripts/enrichir-json.js
```

Cela ajoutera les rayons et tags manquants sans écraser l'existant.

## 📊 Vérifier les données enrichies

Ouvrir `public/data/recettes.json` et vérifier :

**Ingrédients enrichis :**
```json
{
  "nom": "Blanc de poulet",
  "quantite": "150 g",
  "calories": 160,
  "rayon": "Viandes & poissons maigres"  // ← Ajouté
}
```

**Recettes enrichies :**
```json
{
  "id": "DJ001",
  "nom": "Poulet vapeur",
  "calories": 400,
  "compatibilite": [                      // ← Ajouté
    "faible gras",
    "digestion facile",
    "anti-reflux",
    "protéines maigres",
    "perte de poids"
  ]
}
```

## 🎯 Workflow recommandé

### Planification hebdomadaire
1. **Lundi matin** : Aller sur `/` et cliquer "🎲 Plan aléatoire"
2. **Ajustements** : Remplacer les recettes que vous n'aimez pas
3. **Portions** : Ajuster avec +/- selon le nombre de personnes
4. **Courses** : Aller sur `/courses` et copier la liste
5. **Shopping** : Faire vos courses en suivant les rayons

### Découverte de nouvelles recettes
1. Aller sur `/recherche`
2. Filtrer par "perte de poids" + "digestion facile"
3. Ajuster calories max à 400 kcal
4. Parcourir les résultats
5. Cliquer sur les cards pour voir les détails

### Gestion des portions
- **1 portion** = quantités de base du JSON
- **2 portions** = double les quantités dans la liste de courses
- **Ajustez** selon le nombre de convives

## ⚡ Raccourcis clavier (desktop)

- **/** : Focus sur la recherche (page Recherche)
- **Esc** : Fermer les modals
- **←→** : Naviguer entre les pages (avec les flèches du navigateur)

## 🐛 Dépannage

### L'application ne démarre pas
```bash
# Réinstaller les dépendances
rm -rf node_modules
npm install
npm run dev
```

### Les rayons ne s'affichent pas
```bash
# Relancer l'enrichissement
node scripts/enrichir-json.js
```

### Erreur de compilation TypeScript
```bash
# Vérifier les erreurs
npm run build

# Relancer le serveur
npm run dev
```

### Les filtres ne fonctionnent pas
→ Vérifier que le JSON a été enrichi avec des tags `compatibilite`

## 📱 Test sur mobile

### Option 1 : Même réseau WiFi
1. Lancer `npm run dev`
2. Noter l'adresse réseau (ex: http://192.168.1.XX:5173)
3. Ouvrir sur votre iPhone

### Option 2 : Build et deploy
```bash
npm run build
# Puis déployer dist/ sur Netlify, Vercel, etc.
```

## 🎨 Personnalisation

### Ajouter un nouveau rayon
Éditer `scripts/enrichir-json.js` :
```javascript
const RAYONS_MAP = {
  'mon_ingredient': 'Mon Nouveau Rayon',
};
```

### Ajouter un nouveau tag
Éditer `scripts/enrichir-json.js` dans `determinerTags()` :
```javascript
if (recette.nom.includes('bio')) {
  tags.push('bio');
}
```

### Modifier les couleurs
Éditer `src/index.css` :
```css
:root {
  --primary-color: #votre-couleur;
  --secondary-color: #votre-couleur;
}
```

## 📚 Documentation complète

- `GUIDE_UTILISATION.md` - Guide utilisateur détaillé
- `README_NOUVELLES_FONCTIONNALITES.md` - Documentation technique
- `scripts/README.md` - Documentation du script

## ✨ Fonctionnalités clés

| Fonctionnalité | Page | Raccourci |
|---|---|---|
| Planifier repas | `/` | Home |
| Chercher recettes | `/recherche` | 🔍 |
| Voir courses | `/courses` | 🛒 |
| Détails recette | Partout | ℹ️ |
| Ajuster portions | `/` | +/- |
| Copier liste | `/courses` | 📋 |

## 🎉 C'est prêt !

**Tout est configuré et fonctionnel.**

Commencez par :
```bash
npm run dev
```

Puis explorez les 3 pages et les 500 recettes ! 🍽️

---

**Besoin d'aide ?** Consultez les fichiers de documentation dans le projet.
