import { useState } from 'react';
import { RecettesData, Recette, TypeRepas } from '../types';
import './RechercheIngredients.css';

interface RechercheIngredientsProps {
  recettesData: RecettesData;
  onAjouterRecette?: (recette: Recette, type: TypeRepas) => void;
}

export function RechercheIngredients({ recettesData, onAjouterRecette }: RechercheIngredientsProps) {
  const [ingredientsRecherche, setIngredientsRecherche] = useState<string>('');
  const [recettesTrouvees, setRecettesTrouvees] = useState<{
    petits_dejeuners: Recette[];
    dejeuners: Recette[];
    diners: Recette[];
    collations: Recette[];
  } | null>(null);
  const [afficherResultats, setAfficherResultats] = useState(false);

  const normaliserTexte = (texte: string) => {
    return texte
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, ''); // Supprime les accents
  };

  const rechercherRecettes = () => {
    if (!ingredientsRecherche.trim()) {
      alert('Veuillez saisir au moins un ingrédient');
      return;
    }

    // Diviser la recherche en mots-clés
    const motsRecherche = ingredientsRecherche
      .split(',')
      .map(mot => normaliserTexte(mot.trim()))
      .filter(mot => mot.length > 0);

    if (motsRecherche.length === 0) {
      alert('Veuillez saisir au moins un ingrédient valide');
      return;
    }

    // Fonction pour vérifier si une recette contient les ingrédients recherchés
    const recetteContientIngredients = (recette: Recette): boolean => {
      return motsRecherche.some(motRecherche => {
        return recette.ingredients.some(ingredient => {
          const nomIngredient = normaliserTexte(ingredient.nom);
          return nomIngredient.includes(motRecherche);
        });
      });
    };

    // Rechercher dans toutes les catégories
    const resultats = {
      petits_dejeuners: recettesData.petits_dejeuners.filter(recetteContientIngredients),
      dejeuners: recettesData.dejeuners.filter(recetteContientIngredients),
      diners: recettesData.diners.filter(recetteContientIngredients),
      collations: recettesData.collations.filter(recetteContientIngredients),
    };

    setRecettesTrouvees(resultats);
    setAfficherResultats(true);
  };

  const obtenirTypeRepas = (categorie: string): TypeRepas => {
    switch (categorie) {
      case 'petits_dejeuners':
        return 'petit_dejeuner';
      case 'dejeuners':
        return 'dejeuner';
      case 'diners':
        return 'diner';
      case 'collations':
        return 'collation';
      default:
        return 'dejeuner';
    }
  };

  const getNomCategorie = (categorie: string): string => {
    switch (categorie) {
      case 'petits_dejeuners':
        return '🌅 Petits déjeuners';
      case 'dejeuners':
        return '☀️ Déjeuners';
      case 'diners':
        return '🌙 Dîners';
      case 'collations':
        return '🍎 Collations';
      default:
        return categorie;
    }
  };

  const reinitialiserRecherche = () => {
    setIngredientsRecherche('');
    setRecettesTrouvees(null);
    setAfficherResultats(false);
  };

  const totalRecettes = recettesTrouvees
    ? recettesTrouvees.petits_dejeuners.length +
      recettesTrouvees.dejeuners.length +
      recettesTrouvees.diners.length +
      recettesTrouvees.collations.length
    : 0;

  return (
    <div className="recherche-ingredients">
      <div className="recherche-header">
        <h2>🔍 Recherche par ingrédients</h2>
        <p className="recherche-subtitle">
          Trouvez des recettes avec ce que vous avez dans vos placards
        </p>
      </div>

      <div className="recherche-form">
        <div className="input-group">
          <input
            type="text"
            className="input-recherche"
            placeholder="Ex: poulet, riz, courgette (séparez par des virgules)"
            value={ingredientsRecherche}
            onChange={(e) => setIngredientsRecherche(e.target.value)}
            onKeyPress={(e) => {
              if (e.key === 'Enter') {
                rechercherRecettes();
              }
            }}
          />
          <button className="btn-rechercher" onClick={rechercherRecettes}>
            🔍 Rechercher
          </button>
        </div>
        
        {afficherResultats && (
          <button className="btn-reinitialiser" onClick={reinitialiserRecherche}>
            ↺ Nouvelle recherche
          </button>
        )}
      </div>

      {afficherResultats && recettesTrouvees && (
        <div className="resultats-recherche">
          <div className="resultats-header">
            <h3>
              {totalRecettes > 0
                ? `${totalRecettes} recette${totalRecettes > 1 ? 's' : ''} trouvée${totalRecettes > 1 ? 's' : ''}`
                : 'Aucune recette trouvée'}
            </h3>
            {totalRecettes > 0 && (
              <p className="resultats-info">
                Contenant : <strong>{ingredientsRecherche}</strong>
              </p>
            )}
          </div>

          {totalRecettes === 0 ? (
            <div className="aucun-resultat">
              <p>
                😕 Aucune recette ne correspond à votre recherche.
              </p>
              <p className="suggestion">
                Essayez avec des ingrédients plus généraux (ex: poulet, riz, légumes)
              </p>
            </div>
          ) : (
            <div className="resultats-categories">
              {(['petits_dejeuners', 'dejeuners', 'diners', 'collations'] as const).map(categorie => {
                const recettes = recettesTrouvees[categorie];
                
                if (recettes.length === 0) return null;

                return (
                  <div key={categorie} className="categorie-resultats">
                    <h4 className="categorie-nom">{getNomCategorie(categorie)}</h4>
                    <div className="recettes-grid">
                      {recettes.map(recette => (
                        <div key={recette.id} className="recette-card">
                          <div className="recette-card-header">
                            <h5 className="recette-nom">{recette.nom}</h5>
                          </div>
                          <div className="recette-ingredients">
                            <p className="ingredients-titre">Ingrédients :</p>
                            <ul className="ingredients-liste">
                              {recette.ingredients.map((ing, idx) => (
                                <li key={idx} className="ingredient-item">
                                  {ing.nom} <span className="quantite">({ing.quantite})</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          {onAjouterRecette && (
                            <button
                              className="btn-ajouter-recette"
                              onClick={() => onAjouterRecette(recette, obtenirTypeRepas(categorie))}
                            >
                              + Ajouter au plan
                            </button>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
