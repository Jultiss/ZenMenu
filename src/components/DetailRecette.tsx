import React from 'react';
import { Recette } from '../types';
import './DetailRecette.css';

interface DetailRecetteProps {
  recette: Recette;
  portions: number;
  onClose: () => void;
}

const DetailRecette: React.FC<DetailRecetteProps> = ({ recette, portions, onClose }) => {
  // Calculer les quantités ajustées en fonction des portions
  const ajusterQuantite = (quantite: string, portions: number): string => {
    // Extraire le nombre de la quantité (ex: "150 g" -> 150)
    const match = quantite.match(/(\d+(?:\.\d+)?)/);
    if (match) {
      const nombre = parseFloat(match[1]);
      const unite = quantite.replace(match[1], '').trim();
      const nouveauNombre = (nombre * portions).toFixed(0);
      return `${nouveauNombre} ${unite}`;
    }
    return quantite;
  };

  const caloriesTotal = recette.calories ? recette.calories * portions : null;

  return (
    <div className="detail-recette-overlay" onClick={onClose}>
      <div className="detail-recette-modal" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="detail-header">
          <button className="btn-close" onClick={onClose} aria-label="Fermer">
            ✕
          </button>
          <h2 className="detail-titre">{recette.nom}</h2>
          {caloriesTotal && (
            <div className="detail-calories">
              <span className="calories-badge">{caloriesTotal} kcal</span>
              <span className="portions-info">({portions} portion{portions > 1 ? 's' : ''})</span>
            </div>
          )}
        </div>

        {/* Contenu scrollable */}
        <div className="detail-content">
          {/* Tags de compatibilité */}
          {recette.compatibilite && recette.compatibilite.length > 0 && (
            <div className="detail-section">
              <h3 className="section-titre">🏷️ Compatibilité</h3>
              <div className="tags-container">
                {recette.compatibilite.map((tag, index) => (
                  <span key={index} className="tag-compatibilite">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Ingrédients */}
          <div className="detail-section">
            <h3 className="section-titre">🛒 Ingrédients</h3>
            <ul className="ingredients-list">
              {recette.ingredients.map((ingredient, index) => (
                <li key={index} className="ingredient-item">
                  <span className="ingredient-nom">{ingredient.nom}</span>
                  <span className="ingredient-quantite">
                    {ajusterQuantite(ingredient.quantite, portions)}
                  </span>
                  {ingredient.calories && (
                    <span className="ingredient-calories">
                      {(ingredient.calories * portions).toFixed(0)} kcal
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>

          {/* Préparation */}
          {recette.preparation && (
            <div className="detail-section">
              <h3 className="section-titre">👨‍🍳 Préparation</h3>
              <p className="preparation-text">{recette.preparation}</p>
            </div>
          )}
        </div>

        {/* Footer fixe avec bouton de fermeture */}
        <div className="detail-footer">
          <button className="btn-fermer" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailRecette;
