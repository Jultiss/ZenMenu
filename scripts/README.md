# 🔧 Script d'enrichissement automatique

## 📋 Description

Ce script enrichit automatiquement votre fichier `recettes.json` en ajoutant :
- **Rayons** pour chaque ingrédient
- **Tags de compatibilité** pour chaque recette

## 🚀 Utilisation

### Méthode 1 : Ligne de commande
```bash
cd /Users/julientissidre/Workflow/ZenMenu
node scripts/enrichir-json.js
```

### Méthode 2 : Via npm (optionnel)
Vous pouvez ajouter un script dans `package.json` :
```json
{
  "scripts": {
    "enrichir": "node scripts/enrichir-json.js"
  }
}
```
Puis lancer :
```bash
npm run enrichir
```

## 📊 Résultat attendu

```
📖 Lecture du fichier JSON...
💾 Sauvegarde du fichier enrichi...

✅ Enrichissement terminé !
   📦 2847 ingrédients enrichis avec des rayons
   🏷️  500 recettes enrichies avec des tags

📄 Fichier sauvegardé : /Users/julientissidre/Workflow/ZenMenu/public/data/recettes.json
```

## 🏷️ Rayons ajoutés automatiquement

- **Fruits & légumes frais** : pommes, carottes, courgettes, etc.
- **Viandes & poissons maigres** : poulet, dinde, cabillaud, etc.
- **Féculents & céréales** : riz, pâtes, quinoa, pain, etc.
- **Produits laitiers** : lait, yaourt, fromage, etc.
- **Condiments & huiles** : huile d'olive, citron, miel, etc.
- **Épices & aromates** : cannelle, curcuma, basilic, etc.
- **Boissons / infusions** : eau, tisanes, thé, etc.
- **Autres** : ingrédients non catégorisés

## 🏷️ Tags générés automatiquement

### faible gras
Recettes avec cuisson :
- vapeur
- four
- pochage

### digestion facile
Recettes avec :
- cuisson vapeur
- préparation douce

### anti-reflux
Recettes **sans** :
- ail
- oignon
- épices fortes

### protéines maigres
Recettes contenant :
- poulet
- dinde
- cabillaud
- colin
- sole
- truite
- daurade

### perte de poids
Recettes avec :
- moins de 450 kcal

### riche en fibres
Recettes contenant :
- quinoa
- riz complet
- légumes
- fruits
- avoine

## ⚙️ Personnalisation

### Ajouter de nouveaux rayons

Éditer `enrichir-json.js` et ajouter dans `RAYONS_MAP` :
```javascript
const RAYONS_MAP = {
  // ... existants
  'nouvel_ingredient': 'Nouveau Rayon',
};
```

### Ajouter de nouvelles règles de tags

Éditer la fonction `determinerTags()` :
```javascript
function determinerTags(recette) {
  const tags = [];
  
  // Votre nouvelle règle
  if (recette.nom.includes('vegetarien')) {
    tags.push('végétarien');
  }
  
  return tags;
}
```

## 🔄 Relancer le script

Le script peut être relancé plusieurs fois sans problème :
- Il ne **remplace pas** les rayons/tags existants
- Il ajoute uniquement ce qui manque
- Aucun risque de duplication

## ⚠️ Sauvegarde

Le script modifie directement `public/data/recettes.json`.

Pour faire une sauvegarde avant :
```bash
cp public/data/recettes.json public/data/recettes.backup.json
```

## 🐛 Dépannage

### Erreur : Cannot find module
```bash
# Vérifier que vous êtes dans le bon dossier
pwd
# Devrait afficher : /Users/julientissidre/Workflow/ZenMenu
```

### Erreur : Permission denied
```bash
# Donner les permissions
chmod +x scripts/enrichir-json.js
```

### Le fichier n'est pas modifié
```bash
# Vérifier que le fichier existe
ls -la public/data/recettes.json

# Vérifier les permissions
chmod 644 public/data/recettes.json
```

## ✅ Vérification

Après l'exécution, vérifier que :
1. Les ingrédients ont un champ `rayon`
2. Les recettes ont un tableau `compatibilite`
3. Le fichier JSON est toujours valide

Exemple d'ingrédient enrichi :
```json
{
  "nom": "Blanc de poulet",
  "quantite": "150 g",
  "calories": 160,
  "rayon": "Viandes & poissons maigres"  // ← Ajouté
}
```

Exemple de recette enrichie :
```json
{
  "id": "DJ001",
  "nom": "Poulet vapeur",
  "calories": 400,
  "compatibilite": [                      // ← Ajouté
    "faible gras",
    "digestion facile",
    "anti-reflux",
    "protéines maigres"
  ],
  "ingredients": [...],
  "preparation": "..."
}
```

---

**Note** : Ce script utilise Node.js vanilla (pas de dépendances externes).
