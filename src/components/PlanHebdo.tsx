import { useState } from 'react';
import { RepasPlanifie, RecettesData, TypeRepas, RecetteNote } from '../types';
import { JOURS_SEMAINE, TYPES_REPAS, trouverRecette, obtenirRecettesParType } from '../utils/planUtils';
import { SelecteurRepas } from './SelecteurRepas';
import './PlanHebdo.css';

interface PlanHebdoProps {
  plan: RepasPlanifie[];
  recettesData: RecettesData;
  onModifierRepas: (jour: number, type: TypeRepas, recetteId: string) => void;
  onModifierPortions: (jour: number, type: TypeRepas, portions: number) => void;
  onViderJour: (jour: number) => void;
  onToggleConsomme?: (jour: number, type: TypeRepas) => void;
  obtenirNote?: (recetteId: string) => RecetteNote | undefined;
  onSauvegarderNote?: (recetteId: string, texte: string, etoiles: number) => void;
}

export function PlanHebdo({ plan, recettesData, onModifierRepas, onModifierPortions, onViderJour, onToggleConsomme, obtenirNote, onSauvegarderNote }: PlanHebdoProps) {
  const [selectionEnCours, setSelectionEnCours] = useState<{
    jour: number;
    type: TypeRepas;
  } | null>(null);

  const obtenirRepas = (jour: number, type: TypeRepas): RepasPlanifie | undefined => {
    return plan.find(r => r.jour === jour && r.type === type);
  };

  const ouvrirSelecteur = (jour: number, type: TypeRepas) => {
    setSelectionEnCours({ jour, type });
  };

  const fermerSelecteur = () => {
    setSelectionEnCours(null);
  };

  const handleSelectionner = (recetteId: string) => {
    if (selectionEnCours) {
      onModifierRepas(selectionEnCours.jour, selectionEnCours.type, recetteId);
    }
  };

  return (
    <div className="plan-hebdo">
      <div className="plan-grid">
        <div className="grid-header">
          <div className="cell"></div>
          {TYPES_REPAS.map(({ label }) => (
            <div key={label} className="cell header-cell">{label}</div>
          ))}
        </div>

        {JOURS_SEMAINE.map((jour, index) => (
          <div key={jour} className="grid-row">
            <div className="cell day-cell">
              <span className="day-name">{jour}</span>
              <div className="day-actions">
                <button
                  className="btn-day-action btn-clear"
                  onClick={() => {
                    if (window.confirm(`Voulez-vous vraiment vider tous les repas de ${jour} ?`)) {
                      onViderJour(index + 1);
                    }
                  }}
                  title="Vider la journée"
                >
                  🗑️
                </button>
              </div>
            </div>
            {TYPES_REPAS.map(({ type, label }) => {
              const repas = obtenirRepas(index + 1, type);
              const recette = repas?.recetteId 
                ? trouverRecette(recettesData, repas.recetteId)
                : undefined;

              return (
                <div
                  key={`${jour}-${type}`}
                  className="cell meal-cell"
                  data-meal-type={label}
                >
                  {recette ? (
                    <div className="meal-content">
                      {onToggleConsomme && (
                        <button
                          className={`btn-consomme ${repas?.consomme ? 'active' : ''}`}
                          onClick={(e) => {
                            e.stopPropagation();
                            onToggleConsomme(index + 1, type);
                          }}
                          title={repas?.consomme ? "Marquer comme non consommé" : "Marquer comme consommé"}
                        >
                          {repas?.consomme ? '✓' : ''}
                        </button>
                      )}
                      <div 
                        className="meal-name"
                        onClick={() => ouvrirSelecteur(index + 1, type)}
                      >
                        {recette.nom}
                      </div>
                      <span className="portions-display-print">
                        {repas?.portions || 1} portion{(repas?.portions || 1) > 1 ? 's' : ''}
                      </span>
                      <div className="meal-actions">
                        <div className="portions-control">
                          <button
                            className="btn-portion"
                            onClick={(e) => {
                              e.stopPropagation();
                              onModifierPortions(index + 1, type, (repas?.portions || 1) - 1);
                            }}
                            disabled={(repas?.portions || 1) <= 1}
                          >
                            −
                          </button>
                          <span className="portions-display">
                            {repas?.portions || 1} portion{(repas?.portions || 1) > 1 ? 's' : ''}
                          </span>
                          <button
                            className="btn-portion"
                            onClick={(e) => {
                              e.stopPropagation();
                              onModifierPortions(index + 1, type, (repas?.portions || 1) + 1);
                            }}
                          >
                            +
                          </button>
                        </div>
                        <button 
                          className="btn-change"
                          onClick={() => ouvrirSelecteur(index + 1, type)}
                        >
                          Changer
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div 
                      className="meal-empty"
                      onClick={() => ouvrirSelecteur(index + 1, type)}
                    >
                      <span className="add-icon">+</span>
                      <span>Ajouter</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        ))}
      </div>

      {selectionEnCours && (
        <SelecteurRepas
          recettes={obtenirRecettesParType(recettesData, selectionEnCours.type)}
          recetteActuelle={
            obtenirRepas(selectionEnCours.jour, selectionEnCours.type)?.recetteId
              ? trouverRecette(
                  recettesData,
                  obtenirRepas(selectionEnCours.jour, selectionEnCours.type)!.recetteId!
                )
              : undefined
          }
          onSelectionner={handleSelectionner}
          onFermer={fermerSelecteur}
          typeRepas={selectionEnCours.type}
          portions={obtenirRepas(selectionEnCours.jour, selectionEnCours.type)?.portions || 1}
          obtenirNote={obtenirNote}
          onSauvegarderNote={onSauvegarderNote}
        />
      )}
    </div>
  );
}
