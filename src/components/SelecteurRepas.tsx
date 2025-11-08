import { useState } from 'react';
import { Recette, TypeRepas } from '../types';
import DetailRecette from './DetailRecette';
import './SelecteurRepas.css';

interface SelecteurRepasProps {
  recettes: Recette[];
  recetteActuelle: Recette | undefined;
  onSelectionner: (recetteId: string) => void;
  onFermer: () => void;
  typeRepas: TypeRepas;
  portions?: number;
}

export function SelecteurRepas({
  recettes,
  recetteActuelle,
  onSelectionner,
  onFermer,
  typeRepas,
  portions = 1
}: SelecteurRepasProps) {
  const [recherche, setRecherche] = useState('');
  const [recetteDetaillee, setRecetteDetaillee] = useState<Recette | null>(null);

  // Vérification de sécurité
  const recettesValides = recettes || [];
  
  const recettesFiltrees = recettesValides.filter(recette =>
    recette?.nom?.toLowerCase().includes(recherche.toLowerCase())
  );

  const getLabelType = (type: TypeRepas): string => {
    const labels = {
      petit_dejeuner: 'Petit déjeuner',
      dejeuner: 'Déjeuner',
      diner: 'Dîner',
      collation: 'Collation'
    };
    return labels[type];
  };

  return (
    <>
      <div className="modal-overlay" onClick={onFermer}>
        <div className="modal-content" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h2>Choisir un {getLabelType(typeRepas).toLowerCase()}</h2>
            <button className="btn-close" onClick={onFermer}>✕</button>
          </div>

          <div className="modal-body">
            <input
              type="text"
              className="search-input"
              placeholder="Rechercher une recette..."
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              autoFocus
            />

            <div className="recettes-list">
              {recettesFiltrees.length === 0 && (
                <p style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                  {recherche 
                    ? 'Aucune recette ne correspond à votre recherche' 
                    : `Aucune recette disponible pour ce type de repas (${typeRepas})`}
                </p>
              )}
              {recettesFiltrees.map((recette) => (
                <div
                  key={recette.id}
                  className={`recette-item ${recetteActuelle?.id === recette.id ? 'active' : ''}`}
                >
                  <div
                    className="recette-main"
                    style={{ minHeight: '100px', display: 'block' }}
                    onClick={() => {
                      onSelectionner(recette.id);
                      onFermer();
                    }}
                  >
                    <div className="recette-header">
                      <h3 style={{ color: '#0f172a', fontSize: '1.125rem', fontWeight: 700, margin: 0 }}>
                        {recette.nom || 'Nom manquant'}
                      </h3>
                      {recette.calories && (
                        <span className="recette-calories">{recette.calories} kcal</span>
                      )}
                    </div>
                    <ul className="ingredients-preview">
                      {recette.ingredients?.slice(0, 3).map((ing, idx) => (
                        <li key={idx} style={{ color: '#64748b' }}>
                          {ing.nom} ({ing.quantite})
                        </li>
                      ))}
                      {recette.ingredients?.length > 3 && (
                        <li className="plus" style={{ color: '#4338ca' }}>+ {recette.ingredients.length - 3} autre(s)</li>
                      )}
                    </ul>
                  </div>
                  <button
                    className="btn-info"
                    onClick={(e) => {
                      e.stopPropagation();
                      setRecetteDetaillee(recette);
                    }}
                    aria-label="Voir les détails"
                  >
                    ℹ️
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal de détail de recette */}
      {recetteDetaillee && (
        <DetailRecette
          recette={recetteDetaillee}
          portions={portions}
          onClose={() => setRecetteDetaillee(null)}
        />
      )}
    </>
  );
}
