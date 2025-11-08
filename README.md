# 🍽️ Plan Menu Digestion

Application web en français pour planifier des repas anti-reflux et adaptés à la digestion, avec génération automatique de liste de courses.

## 🎯 Fonctionnalités

- **Planification hebdomadaire** : Organisez vos repas pour toute la semaine (petit déjeuner, déjeuner, dîner, collation)
- **Substitution facile** : Changez n'importe quel repas en un clic
- **Liste de courses** : Génération automatique d'une liste de courses agrégée
- **Persistance** : Votre plan est sauvegardé dans le navigateur (localStorage)
- **Interface responsive** : Fonctionne sur ordinateur, tablette et mobile

## 🚀 Installation

### Prérequis
- Node.js (version 16 ou supérieure)
- npm ou yarn

### Étapes

1. **Installer les dépendances** :
```bash
npm install
```

2. **Lancer le serveur de développement** :
```bash
npm run dev
```

3. **Ouvrir l'application** :
Ouvrez votre navigateur à l'adresse indiquée (généralement `http://localhost:5173`)

## 📦 Build pour la production

```bash
npm run build
```

Les fichiers optimisés seront dans le dossier `dist/`.

Pour prévisualiser le build de production :
```bash
npm run preview
```

## 🏗️ Structure du projet

```
ZenMenu/
├── public/
│   └── data/
│       └── recettes.json          # Base de données des recettes
├── src/
│   ├── components/                # Composants React
│   │   ├── PlanHebdo.tsx         # Grille de planification hebdomadaire
│   │   ├── SelecteurRepas.tsx    # Modal de sélection de repas
│   │   ├── ListeCourses.tsx      # Affichage de la liste de courses
│   │   └── *.css                 # Styles des composants
│   ├── hooks/
│   │   └── useLocalStorage.ts    # Hook personnalisé pour localStorage
│   ├── utils/
│   │   └── planUtils.ts          # Fonctions utilitaires
│   ├── types.ts                  # Définitions TypeScript
│   ├── App.tsx                   # Composant principal
│   ├── App.css                   # Styles globaux de l'app
│   ├── main.tsx                  # Point d'entrée
│   └── index.css                 # Styles de base
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── README.md
```

## 🔧 Technologies utilisées

- **React 18** - Bibliothèque UI
- **TypeScript** - Typage statique
- **Vite** - Build tool et dev server ultra-rapide
- **CSS Modules** - Styles scopés
- **localStorage** - Persistance des données

## 📝 Ajouter/Modifier des recettes

Éditez le fichier `public/data/recettes.json` :

```json
{
  "petits_dejeuners": [...],
  "dejeuners": [...],
  "diners": [...],
  "collations": [...],
  "aliments_joker": [...]
}
```

Chaque recette suit ce format :
```json
{
  "id": "PD01",
  "nom": "Nom de la recette",
  "ingredients": [
    { "nom": "Ingrédient 1", "quantite": "100g" },
    { "nom": "Ingrédient 2", "quantite": "2" }
  ]
}
```

## 🎨 Personnalisation

Les couleurs et styles globaux sont définis dans `src/index.css` via des variables CSS :

```css
:root {
  --primary-color: #4f46e5;
  --secondary-color: #10b981;
  --bg-color: #f9fafb;
  /* ... */
}
```

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints à :
- Mobile : < 768px
- Tablette : 768px - 1024px
- Desktop : > 1024px

## 🧪 Conseils nutritionnels

Cette application est conçue pour aider à planifier des repas :
- Anti-reflux gastro-œsophagien (RGO)
- Pauvres en graisses
- Adaptés aux problèmes de vésicule biliaire
- Faciles à digérer

⚠️ **Important** : Consultez toujours un professionnel de santé pour des conseils nutritionnels personnalisés.

## 📄 Licence

MIT

## 🤝 Contribution

Les contributions sont les bienvenues ! N'hésitez pas à ouvrir une issue ou une pull request.
