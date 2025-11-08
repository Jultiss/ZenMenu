/**
 * Script pour enrichir automatiquement recettes.json
 * Ajoute les rayons et les tags de compatibilité
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mapping des ingrédients vers leurs rayons
const RAYONS_MAP = {
  // Viandes & Poissons
  'poulet': 'Viandes & poissons maigres',
  'dinde': 'Viandes & poissons maigres',
  'blanc de poulet': 'Viandes & poissons maigres',
  'filet de dinde': 'Viandes & poissons maigres',
  'cabillaud': 'Viandes & poissons maigres',
  'colin': 'Viandes & poissons maigres',
  'sole': 'Viandes & poissons maigres',
  'truite': 'Viandes & poissons maigres',
  'saumon': 'Viandes & poissons maigres',
  'daurade': 'Viandes & poissons maigres',
  'merlu': 'Viandes & poissons maigres',
  'bar': 'Viandes & poissons maigres',
  'lotte': 'Viandes & poissons maigres',
  
  // Féculents
  'riz': 'Féculents & céréales',
  'riz blanc': 'Féculents & céréales',
  'riz complet': 'Féculents & céréales',
  'quinoa': 'Féculents & céréales',
  'pâtes': 'Féculents & céréales',
  'pomme de terre': 'Féculents & céréales',
  'patate douce': 'Féculents & céréales',
  'semoule': 'Féculents & céréales',
  'pain': 'Féculents & céréales',
  'pain complet': 'Féculents & céréales',
  'flocons d\'avoine': 'Féculents & céréales',
  'avoine': 'Féculents & céréales',
  
  // Légumes
  'courgette': 'Fruits & légumes frais',
  'carotte': 'Fruits & légumes frais',
  'haricot': 'Fruits & légumes frais',
  'haricots verts': 'Fruits & légumes frais',
  'brocoli': 'Fruits & légumes frais',
  'épinard': 'Fruits & légumes frais',
  'épinards': 'Fruits & légumes frais',
  'chou-fleur': 'Fruits & légumes frais',
  'fenouil': 'Fruits & légumes frais',
  'courge': 'Fruits & légumes frais',
  'concombre': 'Fruits & légumes frais',
  'tomate': 'Fruits & légumes frais',
  'salade': 'Fruits & légumes frais',
  'laitue': 'Fruits & légumes frais',
  'poireau': 'Fruits & légumes frais',
  'céleri': 'Fruits & légumes frais',
  'asperge': 'Fruits & légumes frais',
  
  // Fruits
  'pomme': 'Fruits & légumes frais',
  'poire': 'Fruits & légumes frais',
  'banane': 'Fruits & légumes frais',
  'kiwi': 'Fruits & légumes frais',
  'fruits rouges': 'Fruits & légumes frais',
  'fraise': 'Fruits & légumes frais',
  'myrtille': 'Fruits & légumes frais',
  'framboise': 'Fruits & légumes frais',
  'pêche': 'Fruits & légumes frais',
  'abricot': 'Fruits & légumes frais',
  'raisin': 'Fruits & légumes frais',
  
  // Produits laitiers
  'lait': 'Produits laitiers',
  'yaourt': 'Produits laitiers',
  'fromage': 'Produits laitiers',
  'fromage blanc': 'Produits laitiers',
  'lait d\'amande': 'Produits laitiers',
  'lait de soja': 'Produits laitiers',
  
  // Condiments & Huiles
  'huile': 'Condiments & huiles',
  'huile d\'olive': 'Condiments & huiles',
  'huile de colza': 'Condiments & huiles',
  'citron': 'Condiments & huiles',
  'vinaigre': 'Condiments & huiles',
  'miel': 'Condiments & huiles',
  'sirop d\'érable': 'Condiments & huiles',
  'tahini': 'Condiments & huiles',
  'purée d\'amande': 'Condiments & huiles',
  'purée de noisette': 'Condiments & huiles',
  
  // Épices & Aromates
  'cannelle': 'Épices & aromates',
  'curcuma': 'Épices & aromates',
  'curcuma doux': 'Épices & aromates',
  'vanille': 'Épices & aromates',
  'basilic': 'Épices & aromates',
  'persil': 'Épices & aromates',
  'ciboulette': 'Épices & aromates',
  'thym': 'Épices & aromates',
  'romarin': 'Épices & aromates',
  'menthe': 'Épices & aromates',
  
  // Boissons
  'eau': 'Boissons / infusions',
  'tisane': 'Boissons / infusions',
  'infusion': 'Boissons / infusions',
  'thé': 'Boissons / infusions',
};

// Règles pour déterminer les tags de compatibilité
function determinerTags(recette) {
  const tags = [];
  const nomLower = recette.nom.toLowerCase();
  const preparation = (recette.preparation || '').toLowerCase();
  
  // Faible en gras (toutes les recettes avec cuisson vapeur/four)
  if (preparation.includes('vapeur') || preparation.includes('four') || preparation.includes('pochage')) {
    tags.push('faible gras');
  }
  
  // Digestion facile
  if (preparation.includes('vapeur') || preparation.includes('doux')) {
    tags.push('digestion facile');
  }
  
  // Anti-reflux (cuissons douces, pas d'ingrédients irritants)
  if (!nomLower.includes('ail') && !nomLower.includes('oignon') && !nomLower.includes('épicé')) {
    tags.push('anti-reflux');
  }
  
  // Protéines maigres
  const proteinesMaigres = ['poulet', 'dinde', 'cabillaud', 'colin', 'sole', 'truite', 'daurade'];
  if (proteinesMaigres.some(p => nomLower.includes(p))) {
    tags.push('protéines maigres');
  }
  
  // Perte de poids (si calories < 450)
  if (recette.calories && recette.calories < 450) {
    tags.push('perte de poids');
  }
  
  // Riche en fibres
  const richeEnFibres = ['quinoa', 'riz complet', 'légumes', 'fruits', 'avoine'];
  if (richeEnFibres.some(f => nomLower.includes(f))) {
    tags.push('riche en fibres');
  }
  
  return [...new Set(tags)]; // Supprimer les doublons
}

// Trouver le rayon d'un ingrédient
function trouverRayon(nomIngredient) {
  const nomLower = nomIngredient.toLowerCase().trim();
  
  // Recherche exacte
  if (RAYONS_MAP[nomLower]) {
    return RAYONS_MAP[nomLower];
  }
  
  // Recherche partielle
  for (const [key, rayon] of Object.entries(RAYONS_MAP)) {
    if (nomLower.includes(key) || key.includes(nomLower)) {
      return rayon;
    }
  }
  
  // Par défaut
  return 'Autres';
}

// Enrichir le fichier JSON
function enrichirJSON() {
  const jsonPath = path.join(__dirname, '../public/data/recettes.json');
  
  console.log('📖 Lecture du fichier JSON...');
  const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));
  
  let ingredientsEnrichis = 0;
  let recettesEnrichies = 0;
  
  // Parcourir toutes les catégories de recettes
  const categories = ['petits_dejeuners', 'dejeuners', 'diners', 'collations', 'desserts'];
  
  categories.forEach(categorie => {
    if (!data[categorie]) return;
    
    data[categorie].forEach(recette => {
      // Ajouter les rayons aux ingrédients
      if (recette.ingredients) {
        recette.ingredients.forEach(ingredient => {
          if (!ingredient.rayon) {
            ingredient.rayon = trouverRayon(ingredient.nom);
            ingredientsEnrichis++;
          }
        });
      }
      
      // Ajouter les tags de compatibilité
      if (!recette.compatibilite || recette.compatibilite.length === 0) {
        recette.compatibilite = determinerTags(recette);
        if (recette.compatibilite.length > 0) {
          recettesEnrichies++;
        }
      }
    });
  });
  
  // Sauvegarder le fichier enrichi
  console.log('💾 Sauvegarde du fichier enrichi...');
  fs.writeFileSync(jsonPath, JSON.stringify(data, null, 2), 'utf-8');
  
  console.log('\n✅ Enrichissement terminé !');
  console.log(`   📦 ${ingredientsEnrichis} ingrédients enrichis avec des rayons`);
  console.log(`   🏷️  ${recettesEnrichies} recettes enrichies avec des tags`);
  console.log(`\n📄 Fichier sauvegardé : ${jsonPath}`);
}

// Exécuter le script
try {
  enrichirJSON();
} catch (error) {
  console.error('❌ Erreur :', error.message);
  process.exit(1);
}
