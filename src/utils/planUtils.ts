import { RepasPlanifie, TypeRepas, RecettesData, Recette } from '../types';

export const JOURS_SEMAINE = [
  'Lundi',
  'Mardi',
  'Mercredi',
  'Jeudi',
  'Vendredi',
  'Samedi',
  'Dimanche'
];

export const TYPES_REPAS: { type: TypeRepas; label: string }[] = [
  { type: 'petit_dejeuner', label: 'Petit déjeuner' },
  { type: 'dejeuner', label: 'Déjeuner' },
  { type: 'diner', label: 'Dîner' },
  { type: 'collation', label: 'Collation' }
];

// Initialiser un plan vide pour la semaine
export function initializerPlanVide(): RepasPlanifie[] {
  const plan: RepasPlanifie[] = [];
  
  for (let jour = 1; jour <= 7; jour++) {
    TYPES_REPAS.forEach(({ type }) => {
      plan.push({
        jour,
        type,
        recetteId: null,
        portions: 1 // Par défaut 1 portion
      });
    });
  }
  
  return plan;
}

// Trouver une recette par son ID
export function trouverRecette(recettesData: RecettesData, recetteId: string): Recette | undefined {
  const toutesRecettes = [
    ...recettesData.petits_dejeuners,
    ...recettesData.dejeuners,
    ...recettesData.diners,
    ...recettesData.collations,
    ...(recettesData.desserts || [])
  ];
  
  return toutesRecettes.find(r => r.id === recetteId);
}

// Obtenir les recettes selon le type
export function obtenirRecettesParType(recettesData: RecettesData, type: TypeRepas): Recette[] {
  switch (type) {
    case 'petit_dejeuner':
      return recettesData.petits_dejeuners;
    case 'dejeuner':
      return recettesData.dejeuners;
    case 'diner':
      return recettesData.diners;
    case 'collation':
      return recettesData.collations;
    default:
      return [];
  }
}

// Parser une quantité pour extraire le nombre et l'unité
function parseQuantite(quantite: string): { valeur: number; unite: string } | null {
  // Normaliser la chaîne
  const quantiteNormalisee = quantite.trim().toLowerCase();
  
  // Patterns de quantités courantes
  const patterns = [
    // Nombres avec unités (ex: "80 g", "200 ml", "1 c. à café")
    /^(\d+(?:[.,]\d+)?)\s*(.+)$/,
    // Juste un nombre (ex: "2", "1")
    /^(\d+(?:[.,]\d+)?)$/,
  ];
  
  for (const pattern of patterns) {
    const match = quantiteNormalisee.match(pattern);
    if (match) {
      const valeur = parseFloat(match[1].replace(',', '.'));
      const unite = match[2] ? match[2].trim() : 'unité(s)';
      return { valeur, unite };
    }
  }
  
  // Si on ne peut pas parser, retourner null
  return null;
}

// Normaliser les unités similaires
function normaliserUnite(unite: string): string {
  const uniteNormalisee = unite.toLowerCase().trim();
  
  // Mapper les variantes vers une forme standard
  const mappingUnites: { [key: string]: string } = {
    'g': 'g',
    'grammes': 'g',
    'gramme': 'g',
    'gr': 'g',
    'kg': 'kg',
    'kilogrammes': 'kg',
    'ml': 'ml',
    'millilitres': 'ml',
    'millilitre': 'ml',
    'l': 'l',
    'litres': 'l',
    'litre': 'l',
    'c. à café': 'c. à café',
    'cuillère à café': 'c. à café',
    'cuillères à café': 'c. à café',
    'c. à soupe': 'c. à soupe',
    'cuillère à soupe': 'c. à soupe',
    'cuillères à soupe': 'c. à soupe',
    'tasse': 'tasse',
    'tasses': 'tasse',
    'tranche': 'tranche(s)',
    'tranches': 'tranche(s)',
    'pot': 'pot(s)',
    'pots': 'pot(s)',
    'pincée': 'pincée',
    'pincées': 'pincée',
    'unité': 'unité(s)',
    'unités': 'unité(s)',
    'unité(s)': 'unité(s)',
  };
  
  return mappingUnites[uniteNormalisee] || uniteNormalisee;
}

// Type pour représenter un ingrédient dans la liste de courses
export type IngredientListeCourses = {
  nom: string;
  quantites: string[];
  rayon?: string; // Rayon du magasin pour le tri
};

// Générer une liste de courses agrégée avec addition des quantités
export function genererListeCourses(plan: RepasPlanifie[], recettesData: RecettesData): IngredientListeCourses[] {
  const ingredientsMap = new Map<string, Map<string, number>>();
  const quantitesNonParsables = new Map<string, string[]>();
  const rayonsMap = new Map<string, string>(); // Pour stocker le rayon de chaque ingrédient
  
  plan.forEach(repas => {
    if (repas.recetteId) {
      const recette = trouverRecette(recettesData, repas.recetteId);
      const portions = repas.portions || 1; // Récupérer le nombre de portions
      
      if (recette) {
        recette.ingredients.forEach(ingredient => {
          const nom = ingredient.nom.toLowerCase();
          
          // Stocker le rayon si disponible (on garde le premier trouvé)
          if (ingredient.rayon && !rayonsMap.has(nom)) {
            rayonsMap.set(nom, ingredient.rayon);
          }
          
          const parsed = parseQuantite(ingredient.quantite);
          
          if (parsed) {
            const uniteNormalisee = normaliserUnite(parsed.unite);
            
            if (!ingredientsMap.has(nom)) {
              ingredientsMap.set(nom, new Map());
            }
            
            const unitesMap = ingredientsMap.get(nom)!;
            const valeurActuelle = unitesMap.get(uniteNormalisee) || 0;
            // Multiplier la quantité par le nombre de portions
            unitesMap.set(uniteNormalisee, valeurActuelle + (parsed.valeur * portions));
          } else {
            // Si on ne peut pas parser, on garde les quantités séparées
            if (!quantitesNonParsables.has(nom)) {
              quantitesNonParsables.set(nom, []);
            }
            // Pour les quantités non parsables, on indique le nombre de portions si > 1
            const quantiteAvecPortions = portions > 1 
              ? `${ingredient.quantite} (×${portions})`
              : ingredient.quantite;
            quantitesNonParsables.get(nom)!.push(quantiteAvecPortions);
          }
        });
      }
    }
  });
  
  // Convertir en format final
  const resultat: IngredientListeCourses[] = [];
  
  // Ajouter les quantités parsées et additionnées
  ingredientsMap.forEach((unitesMap, nom) => {
    const quantites: string[] = [];
    unitesMap.forEach((valeur, unite) => {
      // Arrondir à 2 décimales si nécessaire
      const valeurFormatee = valeur % 1 === 0 ? valeur.toString() : valeur.toFixed(1);
      quantites.push(`${valeurFormatee} ${unite}`);
    });
    resultat.push({
      nom,
      quantites,
      rayon: rayonsMap.get(nom)
    });
  });
  
  // Ajouter les quantités non parsables (listées séparément)
  quantitesNonParsables.forEach((quantites, nom) => {
    const existant = resultat.find(ing => ing.nom === nom);
    if (existant) {
      // Fusionner avec les quantités déjà présentes
      existant.quantites.push(...quantites);
    } else {
      resultat.push({
        nom,
        quantites,
        rayon: rayonsMap.get(nom)
      });
    }
  });
  
  return resultat;
}
