# 📱 Guide d'utilisation - ZenMenu

## ✨ Nouvelles fonctionnalités

### 1. **Détails complets des recettes**
Chaque recette est désormais cliquable pour afficher :
- 📊 **Calories totales** (ajustées selon le nombre de portions)
- 🛒 **Liste complète des ingrédients** avec quantités
- 👨‍🍳 **Instructions de préparation**
- 🏷️ **Tags de compatibilité** (si disponibles)

**Comment faire :**
- Dans le sélecteur de recettes, cliquez sur le bouton **ℹ️** (bouton vert à droite)
- Un modal fullscreen s'ouvre avec tous les détails
- Les quantités sont automatiquement ajustées selon vos portions

### 2. **Tri automatique de la liste de courses**
La liste de courses est maintenant organisée par rayons pour faciliter vos courses :
- Fruits
- Légumes
- Protéines (viandes & poissons)
- Féculents & céréales
- Produits laitiers
- etc.

### 3. **Navigation optimisée iPhone**
L'application est entièrement repensée pour iPhone :
- ✅ Bottom sheets iOS-style
- ✅ Animations fluides
- ✅ Zones tactiles de 44x44px minimum
- ✅ Support des encoches et safe areas
- ✅ Scroll optimisé avec momentum

---

## 🔧 Enrichir votre fichier JSON

### Format actuel exploité

Votre fichier `recettes.json` contient actuellement :

```json
{
  "id": "DJ001",
  "nom": "Blanc de poulet, Riz blanc, Courgette",
  "calories": 400,
  "ingredients": [
    {
      "nom": "Blanc de poulet",
      "quantite": "150 g",
      "calories": 160
    }
  ],
  "preparation": "Cuire la protéine à la vapeur..."
}
```

### 🎯 Pour améliorer le tri de la liste de courses

Ajoutez le champ `rayon` à chaque ingrédient :

```json
{
  "nom": "Blanc de poulet",
  "quantite": "150 g",
  "calories": 160,
  "rayon": "Viandes & poissons maigres"
}
```

**Rayons suggérés :**
- `"Fruits & légumes frais"`
- `"Viandes & poissons maigres"`
- `"Féculents & céréales"`
- `"Produits laitiers"`
- `"Condiments & huiles"`
- `"Épices & aromates"`
- `"Boissons / infusions"`
- `"Surgelés"`

### 🏷️ Pour ajouter les tags de compatibilité

Ajoutez le champ `compatibilite` à chaque recette :

```json
{
  "id": "DJ001",
  "nom": "Blanc de poulet, Riz blanc, Courgette",
  "calories": 400,
  "compatibilite": [
    "faible gras",
    "digestion facile",
    "anti-reflux"
  ],
  "ingredients": [...],
  "preparation": "..."
}
```

**Tags suggérés :**
- `"faible gras"`
- `"digestion facile"`
- `"anti-reflux"`
- `"sans gluten"`
- `"vésicule biliaire"`
- `"perte de poids"`

---

## 🎨 Ergonomie Mobile

### Gestes tactiles
- **Tap** : Sélectionner une recette
- **Tap sur ℹ️** : Voir les détails
- **Swipe down** : Fermer un modal
- **Tap sur fond grisé** : Fermer un modal

### Navigation
L'application utilise des **bottom sheets** (panneaux qui glissent du bas) au lieu de modals centrés pour une expérience native iOS.

### Portions
- Utilisez les boutons **+** / **-** directement sur chaque repas
- Les quantités dans la liste de courses s'ajustent automatiquement
- Le modal de détail affiche les calories et quantités ajustées

---

## 📊 Données exploitées

### De chaque recette :
- ✅ `id` - Identifiant unique
- ✅ `nom` - Nom de la recette
- ✅ `calories` - Calories totales
- ✅ `ingredients` - Liste avec nom, quantité, calories, rayon (optionnel)
- ✅ `preparation` - Instructions
- ⚠️ `compatibilite` - Tags (à ajouter pour plus de filtres)

### Métadonnées :
- ✅ `meta.titre` - Titre du programme
- ✅ `meta.description` - Description
- ✅ `meta.principes` - Principes nutritionnels
- ✅ `meta.portions_defaut` - Portions par défaut

---

## 🚀 Prochaines améliorations possibles

### Filtres avancés
Avec les tags `compatibilite`, vous pourrez filtrer :
- Recettes faibles en gras
- Recettes adaptées au reflux
- Recettes sans gluten
- etc.

### Navigation par pages
Si vous souhaitez une vraie navigation avec URLs et historique :
- On peut installer React Router
- Créer des pages dédiées : `/plan`, `/courses`, `/recette/:id`
- Ajouter des transitions entre pages

### Recherche améliorée
- Recherche par ingrédient
- Recherche par tag
- Recherche par calories

---

## ❓ Questions fréquentes

**Q : Comment ajouter le champ rayon à toutes mes recettes ?**
R : Utilisez un script Python ou JavaScript pour parser votre JSON et ajouter automatiquement le champ selon des règles (ex: si nom contient "poulet" → rayon = "Viandes & poissons")

**Q : Les portions fonctionnent comment exactement ?**
R : Chaque repas du plan a un nombre de portions (par défaut 1). Les quantités dans la liste de courses sont multipliées par ce nombre.

**Q : Puis-je avoir plusieurs personnes avec portions différentes ?**
R : Actuellement, les portions sont par repas. Pour plusieurs personnes, augmentez simplement le nombre de portions.

**Q : Comment copier la liste de courses ?**
R : Cliquez sur le bouton "📋 Copier" en haut de la liste de courses. Elle sera copiée dans le presse-papier au format texte organisé par rayon.

---

## 💡 Conseils d'utilisation mobile

1. **Ajoutez l'app à l'écran d'accueil** pour une expérience PWA
2. **Utilisez le mode portrait** pour une meilleure expérience
3. **Les modals se ferment** en tapant sur le fond ou le bouton ✕
4. **Les quantités s'ajustent** automatiquement quand vous changez les portions

---

Bon appétit ! 🍽️
