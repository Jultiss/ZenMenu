import { useState } from 'react';
import { RecettesData, RepasPlanifie, TypeRepas, SauvegardePlan } from '../types';
import { PlanHebdo } from '../components/PlanHebdo';
import { ModalSauvegarde } from '../components/ModalSauvegarde';
import { HistoriqueSauvegardes } from '../components/HistoriqueSauvegardes';
import { exportPlanToPDF } from '../utils/exportPlan';
import './PlanPage.css';

interface PlanPageProps {
  plan: RepasPlanifie[];
  recettesData: RecettesData;
  sauvegardes: SauvegardePlan[];
  onModifierRepas: (jour: number, type: TypeRepas, recetteId: string) => void;
  onModifierPortions: (jour: number, type: TypeRepas, portions: number) => void;
  onGenererPlanAleatoire: () => void;
  onViderJour: (jour: number) => void;
  onReinitialiserPlan: () => void;
  onSauvegarderPlan: (nom: string) => void;
  onChargerSauvegarde: (sauvegarde: SauvegardePlan) => void;
  onSupprimerSauvegarde: (id: string) => void;
  onToggleConsomme: (jour: number, type: TypeRepas) => void;
}

export function PlanPage({
  plan,
  recettesData,
  sauvegardes,
  onModifierRepas,
  onModifierPortions,
  onGenererPlanAleatoire,
  onViderJour,
  onReinitialiserPlan,
  onSauvegarderPlan,
  onChargerSauvegarde,
  onSupprimerSauvegarde,
  onToggleConsomme
}: PlanPageProps) {
  const [modalSauvegardeOuverte, setModalSauvegardeOuverte] = useState(false);
  const [historiqueOuvert, setHistoriqueOuvert] = useState(false);
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>📅 Mon Plan Hebdomadaire</h1>
        <div className="header-actions">
          <button 
            className="btn-action btn-gradient"
            onClick={onGenererPlanAleatoire}
          >
            🎲 Plan aléatoire
          </button>
          <button 
            className="btn-action btn-secondary"
            onClick={onReinitialiserPlan}
          >
            🔄 Réinitialiser
          </button>
          <button 
            className="btn-action btn-save"
            onClick={() => setModalSauvegardeOuverte(true)}
          >
            💾 Sauvegarder
          </button>
          <button 
            className="btn-action btn-history"
            onClick={() => setHistoriqueOuvert(true)}
          >
            📚 Historique ({sauvegardes.length})
          </button>
          <button 
            className="btn-action btn-export"
            onClick={exportPlanToPDF}
            title="Exporter le plan en PDF"
          >
            📄 Exporter PDF
          </button>
        </div>
      </div>
      
      <PlanHebdo
        plan={plan}
        recettesData={recettesData}
        onModifierRepas={onModifierRepas}
        onModifierPortions={onModifierPortions}
        onViderJour={onViderJour}
        onToggleConsomme={onToggleConsomme}
      />

      {modalSauvegardeOuverte && (
        <ModalSauvegarde
          onSauvegarder={onSauvegarderPlan}
          onFermer={() => setModalSauvegardeOuverte(false)}
        />
      )}

      {historiqueOuvert && (
        <HistoriqueSauvegardes
          sauvegardes={sauvegardes}
          recettesData={recettesData}
          onCharger={onChargerSauvegarde}
          onSupprimer={onSupprimerSauvegarde}
          onFermer={() => setHistoriqueOuvert(false)}
        />
      )}
    </div>
  );
}
