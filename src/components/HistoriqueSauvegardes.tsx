import { useState } from 'react';
import { SauvegardePlan, RecettesData } from '../types';
import { trouverRecette } from '../utils/planUtils';
import './HistoriqueSauvegardes.css';

interface HistoriqueSauvegardesProps {
  sauvegardes: SauvegardePlan[];
  recettesData: RecettesData;
  onCharger: (sauvegarde: SauvegardePlan) => void;
  onSupprimer: (id: string) => void;
  onFermer: () => void;
}

export function HistoriqueSauvegardes({
  sauvegardes,
  recettesData,
  onCharger,
  onSupprimer,
  onFermer
}: HistoriqueSauvegardesProps) {
  const [vueSelectionnee, setVueSelectionnee] = useState<'liste' | 'stats'>('liste');
  const [sauvegardeDetail, setSauvegardeDetail] = useState<string | null>(null);

  // Calculer les statistiques
  const calculerStats = () => {
    const recettesUtilisees: { [id: string]: number } = {};
    const repasConsommes = sauvegardes.reduce((total, sauvegarde) => {
      return total + sauvegarde.plan.filter(r => r.consomme).length;
    }, 0);

    sauvegardes.forEach(sauvegarde => {
      sauvegarde.plan.forEach(repas => {
        if (repas.recetteId) {
          recettesUtilisees[repas.recetteId] = (recettesUtilisees[repas.recetteId] || 0) + 1;
        }
      });
    });

    const top5 = Object.entries(recettesUtilisees)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([id, count]) => ({
        recette: trouverRecette(recettesData, id),
        count
      }));

    return {
      totalSauvegardes: sauvegardes.length,
      repasConsommes,
      top5Recettes: top5
    };
  };

  const stats = calculerStats();

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="modal-overlay" onClick={onFermer}>
      <div className="modal-content historique-modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>📚 Historique & Statistiques</h2>
          <button className="btn-close" onClick={onFermer}>✕</button>
        </div>

        <div className="historique-tabs">
          <button
            className={`tab-btn ${vueSelectionnee === 'liste' ? 'active' : ''}`}
            onClick={() => setVueSelectionnee('liste')}
          >
            📋 Sauvegardes ({sauvegardes.length})
          </button>
          <button
            className={`tab-btn ${vueSelectionnee === 'stats' ? 'active' : ''}`}
            onClick={() => setVueSelectionnee('stats')}
          >
            📊 Statistiques
          </button>
        </div>

        <div className="modal-body historique-body">
          {vueSelectionnee === 'liste' ? (
            <div className="sauvegardes-liste">
              {sauvegardes.length === 0 ? (
                <div className="empty-state">
                  <p>💾 Aucune sauvegarde pour le moment</p>
                  <p className="help-text">Créez votre première sauvegarde en cliquant sur "Sauvegarder" dans le plan de menu</p>
                </div>
              ) : (
                sauvegardes.map(sauvegarde => (
                  <div key={sauvegarde.id} className="sauvegarde-card">
                    <div className="sauvegarde-header">
                      <div>
                        <h3>{sauvegarde.nom}</h3>
                        <p className="sauvegarde-date">
                          Créée le {formatDate(sauvegarde.dateCreation)}
                        </p>
                      </div>
                      <div className="sauvegarde-actions">
                        <button
                          className="btn-icon"
                          onClick={() => setSauvegardeDetail(
                            sauvegardeDetail === sauvegarde.id ? null : sauvegarde.id
                          )}
                          title="Voir détails"
                        >
                          👁️
                        </button>
                        <button
                          className="btn-icon btn-load"
                          onClick={() => {
                            if (confirm(`Charger "${sauvegarde.nom}" ?\nCela remplacera votre plan actuel.`)) {
                              onCharger(sauvegarde);
                              onFermer();
                            }
                          }}
                          title="Charger ce plan"
                        >
                          📂
                        </button>
                        <button
                          className="btn-icon btn-delete"
                          onClick={() => {
                            if (confirm(`Supprimer "${sauvegarde.nom}" ?`)) {
                              onSupprimer(sauvegarde.id);
                            }
                          }}
                          title="Supprimer"
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                    
                    {sauvegardeDetail === sauvegarde.id && (
                      <div className="sauvegarde-detail">
                        <div className="detail-stats">
                          <span>
                            {sauvegarde.plan.filter(r => r.recetteId).length} repas planifiés
                          </span>
                          <span>
                            {sauvegarde.plan.filter(r => r.consomme).length} repas consommés
                          </span>
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          ) : (
            <div className="stats-container">
              <div className="stat-card">
                <div className="stat-icon">💾</div>
                <div className="stat-value">{stats.totalSauvegardes}</div>
                <div className="stat-label">Plans sauvegardés</div>
              </div>

              <div className="stat-card">
                <div className="stat-icon">✅</div>
                <div className="stat-value">{stats.repasConsommes}</div>
                <div className="stat-label">Repas consommés</div>
              </div>

              <div className="top-recettes">
                <h3>🏆 Top 5 des recettes</h3>
                {stats.top5Recettes.length === 0 ? (
                  <p className="help-text">Aucune donnée pour le moment</p>
                ) : (
                  <div className="recettes-list">
                    {stats.top5Recettes.map(({ recette, count }, index) => (
                      <div key={recette?.id || index} className="recette-stat">
                        <span className="recette-rank">#{index + 1}</span>
                        <span className="recette-nom">{recette?.nom || 'Recette inconnue'}</span>
                        <span className="recette-count">{count}×</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
