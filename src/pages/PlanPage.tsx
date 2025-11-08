import { RecettesData, RepasPlanifie, TypeRepas } from '../types';
import { PlanHebdo } from '../components/PlanHebdo';
import './PlanPage.css';

interface PlanPageProps {
  plan: RepasPlanifie[];
  recettesData: RecettesData;
  onModifierRepas: (jour: number, type: TypeRepas, recetteId: string) => void;
  onModifierPortions: (jour: number, type: TypeRepas, portions: number) => void;
  onGenererPlanAleatoire: () => void;
  onViderJour: (jour: number) => void;
  onReinitialiserPlan: () => void;
}

export function PlanPage({
  plan,
  recettesData,
  onModifierRepas,
  onModifierPortions,
  onGenererPlanAleatoire,
  onViderJour,
  onReinitialiserPlan
}: PlanPageProps) {
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
            className="btn-action btn-print"
            onClick={() => window.print()}
          >
            🖨️ Imprimer
          </button>
        </div>
      </div>
      
      <PlanHebdo
        plan={plan}
        recettesData={recettesData}
        onModifierRepas={onModifierRepas}
        onModifierPortions={onModifierPortions}
        onViderJour={onViderJour}
      />
    </div>
  );
}
