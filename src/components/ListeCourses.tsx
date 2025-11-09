import { useState, useEffect } from 'react';
import { RepasPlanifie, RecettesData } from '../types';
import { genererListeCourses, IngredientListeCourses } from '../utils/planUtils';
import './ListeCourses.css';

// Fonction pour catégoriser un ingrédient (utilisée en fallback si pas de rayon)
function categoriserIngredient(nom: string): string {
  const nomLower = nom.toLowerCase();
  
  // Fruits
  if (/pomme|poire|banane|kiwi|fruits rouges|fruits|compote|sorbet/.test(nomLower)) {
    return 'Fruits';
  }
  
  // Légumes
  if (/courgette|carotte|haricot|fenouil|courge|potiron|patate douce|légume|brocoli|petit pois|tomate|laitue|poireau|panais/.test(nomLower)) {
    return 'Légumes';
  }
  
  // Protéines animales
  if (/poulet|dinde|cabillaud|truite|colin|merlu|poisson|œuf|blanc d'œuf/.test(nomLower)) {
    return 'Protéines (viandes & poissons)';
  }
  
  // Féculents & céréales
  if (/riz|quinoa|pâtes|semoule|pain|pomme de terre|flocons d'avoine|flocons de sarrasin|farine|crème de riz|galette/.test(nomLower)) {
    return 'Féculents & céréales';
  }
  
  // Produits laitiers & substituts
  if (/lait|yaourt|fromage/.test(nomLower)) {
    return 'Produits laitiers & substituts végétaux';
  }
  
  // Protéines végétales
  if (/tofu|lentille|pois chiche|houmous/.test(nomLower)) {
    return 'Protéines végétales';
  }
  
  // Épices & aromates
  if (/cannelle|curcuma|vanille|herbes|basilic|persil|ciboulette|romarin/.test(nomLower)) {
    return 'Épices & aromates';
  }
  
  // Huiles & condiments
  if (/huile|vinaigr|citron|miel|tahini|purée d'amande|purée de noisette|confiture/.test(nomLower)) {
    return 'Huiles & condiments';
  }
  
  // Noix & graines
  if (/amande|noisette|noix|graine/.test(nomLower)) {
    return 'Noix & graines';
  }
  
  // Boissons
  if (/tisane|infusion|vin|eau/.test(nomLower)) {
    return 'Boissons';
  }
  
  // Autres (chocolat, raisins secs, etc.)
  return 'Autres';
}

interface ListeCoursesProps {
  plan: RepasPlanifie[];
  recettesData: RecettesData;
}

export function ListeCourses({ plan, recettesData }: ListeCoursesProps) {
  const ingredientsList = genererListeCourses(plan, recettesData);
  
  // État pour tracker les articles achetés (stockés dans localStorage)
  const [articlesAchetes, setArticlesAchetes] = useState<Set<string>>(() => {
    const saved = localStorage.getItem('articlesAchetes');
    return saved ? new Set(JSON.parse(saved)) : new Set();
  });

  // Sauvegarder dans localStorage à chaque changement
  useEffect(() => {
    localStorage.setItem('articlesAchetes', JSON.stringify(Array.from(articlesAchetes)));
  }, [articlesAchetes]);

  // Fonction pour toggler le statut d'achat d'un article
  const toggleArticleAchete = (nomIngredient: string) => {
    setArticlesAchetes(prev => {
      const newSet = new Set(prev);
      if (newSet.has(nomIngredient)) {
        newSet.delete(nomIngredient);
      } else {
        newSet.add(nomIngredient);
      }
      return newSet;
    });
  };

  // Organiser les ingrédients par rayon (ou catégorie si pas de rayon)
  const ingredientsParRayon = new Map<string, IngredientListeCourses[]>();
  
  ingredientsList.forEach((ingredient) => {
    // Utiliser le rayon du JSON ou fallback sur la catégorisation automatique
    const rayon = ingredient.rayon || categoriserIngredient(ingredient.nom);
    
    if (!ingredientsParRayon.has(rayon)) {
      ingredientsParRayon.set(rayon, []);
    }
    
    ingredientsParRayon.get(rayon)!.push(ingredient);
  });

  // Afficher tous les rayons trouvés (même s'ils ne sont pas dans ordreCategories)
  const tousLesRayons = Array.from(ingredientsParRayon.keys());

  // Ordre des catégories - utiliser les rayons du JSON
  const ordreCategories = [
    'Fruits et légumes',
    'Viandes & poissons maigres',
    'Produits végétaux',
    'Produits frais',
    'Épicerie sèche',
    'Épicerie sucrée',
    'Condiments & huiles',
    'Boissons / infusions',
    // Fallback pour les anciennes catégories si besoin
    'Fruits',
    'Légumes',
    'Protéines (viandes & poissons)',
    'Protéines végétales',
    'Féculents & céréales',
    'Produits laitiers & substituts végétaux',
    'Noix & graines',
    'Huiles & condiments',
    'Épices & aromates',
    'Boissons',
    'Autres'
  ];

  const copierListeCourses = () => {
    let texte = '🛒 LISTE DE COURSES\n\n';
    
    // Parcourir toutes les catégories dans l'ordre + celles non listées
    const categoriesATraiter = [
      ...ordreCategories,
      ...tousLesRayons.filter(rayon => !ordreCategories.includes(rayon))
    ];
    
    categoriesATraiter.forEach(categorie => {
      const ingredientsCategorie = ingredientsParRayon.get(categorie);
      if (ingredientsCategorie && ingredientsCategorie.length > 0) {
        texte += `\n${categorie.toUpperCase()}\n${'='.repeat(categorie.length)}\n`;
        ingredientsCategorie.forEach((ingredient) => {
          texte += `• ${ingredient.nom.charAt(0).toUpperCase() + ingredient.nom.slice(1)}: ${ingredient.quantites.join(', ')}\n`;
        });
      }
    });
    
    if (texte.length <= 50) {
      alert('❌ La liste de courses est vide. Ajoutez des recettes au plan !');
      return;
    }

    // Méthode compatible iOS/Safari
    const textarea = document.createElement('textarea');
    textarea.value = texte;
    textarea.style.position = 'fixed';
    textarea.style.top = '0';
    textarea.style.left = '0';
    textarea.style.width = '2em';
    textarea.style.height = '2em';
    textarea.style.padding = '0';
    textarea.style.border = 'none';
    textarea.style.outline = 'none';
    textarea.style.boxShadow = 'none';
    textarea.style.background = 'transparent';
    
    document.body.appendChild(textarea);
    textarea.focus();
    textarea.select();
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textarea);
      
      if (successful) {
        alert('✅ Liste de courses copiée dans le presse-papier !');
      } else {
        alert('❌ Erreur lors de la copie. Veuillez réessayer.');
      }
    } catch (err) {
      document.body.removeChild(textarea);
      alert('❌ Erreur lors de la copie: ' + err);
    }
  };

  if (ingredientsList.length === 0) {
    return (
      <div className="liste-courses">
        <p className="empty-message">
          Ajoutez des repas à votre plan pour générer une liste de courses.
        </p>
      </div>
    );
  }

  // Fonction pour afficher une catégorie
  const renderCategorie = (categorie: string, isAchete: boolean) => {
    const ingredientsCategorie = ingredientsParRayon.get(categorie);
    
    if (!ingredientsCategorie || ingredientsCategorie.length === 0) {
      return null;
    }

    // Filtrer selon le statut d'achat
    const ingredientsFiltres = ingredientsCategorie.filter(ingredient => 
      articlesAchetes.has(ingredient.nom) === isAchete
    );

    if (ingredientsFiltres.length === 0) {
      return null;
    }
    
    return (
      <div key={`${categorie}-${isAchete}`} className="categorie-section">
        <h3 className="categorie-titre">{categorie}</h3>
        <div className="ingredients-grouped">
          {ingredientsFiltres.map((ingredient) => (
            <div 
              key={ingredient.nom} 
              className={`ingredient-group ${isAchete ? 'achete' : ''}`}
              onClick={() => toggleArticleAchete(ingredient.nom)}
            >
              <span className="ingredient-nom">
                {ingredient.nom.charAt(0).toUpperCase() + ingredient.nom.slice(1)}
              </span>
              <span className="ingredient-quantites">
                {ingredient.quantites.join(', ')}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Calculer les compteurs
  const nombreArticlesAchetes = Array.from(articlesAchetes).filter(nom => 
    ingredientsList.some(ing => ing.nom === nom)
  ).length;

  return (
    <div className="liste-courses">
      <div className="liste-header">
        <h2>🛒 Liste de courses</h2>
        <button className="btn-copy" onClick={copierListeCourses}>
          📋 Copier
        </button>
      </div>

      {/* Articles à acheter */}
      <div className="ingredients-par-categorie">
        {/* Afficher d'abord les catégories dans l'ordre défini */}
        {ordreCategories.map(categorie => renderCategorie(categorie, false))}
        
        {/* Afficher les catégories non prévues dans l'ordre */}
        {tousLesRayons
          .filter(rayon => !ordreCategories.includes(rayon))
          .map(categorie => renderCategorie(categorie, false))}
      </div>

      {/* Articles achetés */}
      {nombreArticlesAchetes > 0 && (
        <>
          <div className="separateur-achetes">
            <h3>✅ Articles achetés ({nombreArticlesAchetes})</h3>
            <p className="info-achetes">Cliquez sur un article pour le remettre dans la liste</p>
          </div>
          <div className="ingredients-par-categorie achetes">
            {/* Afficher d'abord les catégories dans l'ordre défini */}
            {ordreCategories.map(categorie => renderCategorie(categorie, true))}
            
            {/* Afficher les catégories non prévues dans l'ordre */}
            {tousLesRayons
              .filter(rayon => !ordreCategories.includes(rayon))
              .map(categorie => renderCategorie(categorie, true))}
          </div>
        </>
      )}
    </div>
  );
}
