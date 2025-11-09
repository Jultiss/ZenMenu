import { useState, useMemo } from 'react';
import { RecettesData, Recette, TypeRepas, RecetteNote } from '../types';
import DetailRecette from '../components/DetailRecette';
import { StarRating } from '../components/StarRating';
import { JOURS_SEMAINE, TYPES_REPAS } from '../utils/planUtils';
import './RecherchePage.css';
import './RecherchePage-modal.css';

interface RecherchePageProps {
  recettesData: RecettesData;
  onAjouterAuPlan: (jour: number, type: TypeRepas, recetteId: string) => void;
  obtenirNote?: (recetteId: string) => RecetteNote | undefined;
  onSauvegarderNote?: (recetteId: string, texte: string, etoiles: number) => void;
}

export function RecherchePage({ recettesData, onAjouterAuPlan, obtenirNote, onSauvegarderNote }: RecherchePageProps) {
  const [recherche, setRecherche] = useState('');
  const [tagsSelectionnes, setTagsSelectionnes] = useState<string[]>([]);
  const [categorieSelectionnee, setCategorieSelectionnee] = useState<string>('toutes');
  const [recetteDetaillee, setRecetteDetaillee] = useState<Recette | null>(null);
  const [caloriesMax, setCaloriesMax] = useState<number>(1000);
  const [recetteAAjouter, setRecetteAAjouter] = useState<Recette | null>(null);
  const [afficherFavoris, setAfficherFavoris] = useState(false);

  // Récupérer toutes les recettes
  const toutesRecettes = useMemo(() => {
    const recettes: Recette[] = [];
    if (recettesData.petits_dejeuners) recettes.push(...recettesData.petits_dejeuners);
    if (recettesData.dejeuners) recettes.push(...recettesData.dejeuners);
    if (recettesData.diners) recettes.push(...recettesData.diners);
    if (recettesData.collations) recettes.push(...recettesData.collations);
    if (recettesData.desserts) recettes.push(...recettesData.desserts);
    return recettes;
  }, [recettesData]);

  // Extraire tous les tags uniques
  const tousLesTags = useMemo(() => {
    const tags = new Set<string>();
    toutesRecettes.forEach(recette => {
      if (recette.compatibilite) {
        recette.compatibilite.forEach(tag => tags.add(tag));
      }
    });
    return Array.from(tags).sort();
  }, [toutesRecettes]);

  // Filtrer les recettes
  const recettesFiltrees = useMemo(() => {
    return toutesRecettes.filter(recette => {
      // Filtre par recherche textuelle
      if (recherche && !recette.nom.toLowerCase().includes(recherche.toLowerCase())) {
        return false;
      }

      // Filtre par catégorie
      if (categorieSelectionnee !== 'toutes') {
        const categorie = 
          recettesData.petits_dejeuners?.includes(recette) ? 'petit_dejeuner' :
          recettesData.dejeuners?.includes(recette) ? 'dejeuner' :
          recettesData.diners?.includes(recette) ? 'diner' :
          recettesData.collations?.includes(recette) ? 'collation' : 'dessert';
        
        if (categorie !== categorieSelectionnee) {
          return false;
        }
      }

      // Filtre par tags
      if (tagsSelectionnes.length > 0) {
        if (!recette.compatibilite || !tagsSelectionnes.every(tag => recette.compatibilite?.includes(tag))) {
          return false;
        }
      }

      // Filtre par calories
      if (recette.calories && recette.calories > caloriesMax) {
        return false;
      }

      // Filtre par favoris (≥4 étoiles)
      if (afficherFavoris && obtenirNote) {
        const note = obtenirNote(recette.id);
        if (!note || note.etoiles < 4) {
          return false;
        }
      }

      return true;
    });
  }, [toutesRecettes, recherche, categorieSelectionnee, tagsSelectionnes, caloriesMax, afficherFavoris, obtenirNote, recettesData]);

  const toggleTag = (tag: string) => {
    setTagsSelectionnes(prev =>
      prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag]
    );
  };

  const reinitialiserFiltres = () => {
    setRecherche('');
    setTagsSelectionnes([]);
    setCategorieSelectionnee('toutes');
    setCaloriesMax(1000);
    setAfficherFavoris(false);
  };

  return (
    <div className="page-container recherche-page">
      <div className="page-header">
        <h1>🔍 Recherche de Recettes</h1>
        <p className="page-subtitle">
          {recettesFiltrees.length} recette{recettesFiltrees.length > 1 ? 's' : ''} trouvée{recettesFiltrees.length > 1 ? 's' : ''}
        </p>
      </div>

      {/* Barre de recherche */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Rechercher par nom..."
          value={recherche}
          onChange={(e) => setRecherche(e.target.value)}
          className="search-input-main"
        />
        {obtenirNote && (
          <button
            className={`btn-favoris-toggle ${afficherFavoris ? 'active' : ''}`}
            onClick={() => setAfficherFavoris(!afficherFavoris)}
            title={afficherFavoris ? "Afficher toutes les recettes" : "Afficher uniquement les favoris"}
          >
            {afficherFavoris ? '⭐ Favoris' : '☆ Favoris'}
          </button>
        )}
      </div>

      {/* Filtres */}
      <div className="filtres-section">
        <div className="filtre-group">
          <label className="filtre-label">Catégorie</label>
          <select
            value={categorieSelectionnee}
            onChange={(e) => setCategorieSelectionnee(e.target.value)}
            className="filtre-select"
          >
            <option value="toutes">Toutes</option>
            <option value="petit_dejeuner">Petit déjeuner</option>
            <option value="dejeuner">Déjeuner</option>
            <option value="diner">Dîner</option>
            <option value="collation">Collation</option>
            <option value="dessert">Dessert</option>
          </select>
        </div>

        <div className="filtre-group">
          <label className="filtre-label">Calories max: {caloriesMax} kcal</label>
          <input
            type="range"
            min="100"
            max="1000"
            step="50"
            value={caloriesMax}
            onChange={(e) => setCaloriesMax(Number(e.target.value))}
            className="filtre-range"
          />
        </div>

        {tousLesTags.length > 0 && (
          <div className="filtre-group tags-group">
            <label className="filtre-label">Filtres</label>
            <div className="tags-filtres">
              {tousLesTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`tag-filtre ${tagsSelectionnes.includes(tag) ? 'active' : ''}`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
        )}

        <button onClick={reinitialiserFiltres} className="btn-reset">
          🔄 Réinitialiser
        </button>
      </div>

      {/* Résultats */}
      <div className="resultats-grid">
        {recettesFiltrees.map(recette => (
          <div
            key={recette.id}
            className="recette-card"
            onClick={() => setRecetteDetaillee(recette)}
          >
            <div className="recette-card-header">
              <h3 className="recette-card-nom">{recette.nom}</h3>
              {recette.calories && (
                <span className="recette-card-calories">{recette.calories} kcal</span>
              )}
            </div>
            
            {obtenirNote && obtenirNote(recette.id) && obtenirNote(recette.id)!.etoiles > 0 && (
              <div className="recette-card-rating">
                <StarRating rating={obtenirNote(recette.id)!.etoiles} readonly size="small" />
              </div>
            )}
            
            {recette.compatibilite && recette.compatibilite.length > 0 && (
              <div className="recette-card-tags">
                {recette.compatibilite.slice(0, 3).map((tag, idx) => (
                  <span key={idx} className="mini-tag">{tag}</span>
                ))}
                {recette.compatibilite.length > 3 && (
                  <span className="mini-tag plus">+{recette.compatibilite.length - 3}</span>
                )}
              </div>
            )}

            <div className="recette-card-footer">
              <span className="ingredients-count">
                {recette.ingredients.length} ingrédient{recette.ingredients.length > 1 ? 's' : ''}
              </span>
              <div className="recette-card-actions">
                <button 
                  className="btn-ajouter-plan"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRecetteAAjouter(recette);
                  }}
                >
                  + Plan
                </button>
                <button 
                  className="btn-voir-detail"
                  onClick={(e) => {
                    e.stopPropagation();
                    setRecetteDetaillee(recette);
                  }}
                >
                  Détails →
                </button>
              </div>
            </div>
          </div>
        ))}

        {recettesFiltrees.length === 0 && (
          <div className="no-results">
            <p className="no-results-text">Aucune recette ne correspond à vos critères</p>
            <button onClick={reinitialiserFiltres} className="btn-reset-inline">
              Réinitialiser les filtres
            </button>
          </div>
        )}
      </div>

      {/* Modal de détail */}
      {recetteDetaillee && (
        <DetailRecette
          recette={recetteDetaillee}
          portions={1}
          onClose={() => setRecetteDetaillee(null)}
          note={obtenirNote ? obtenirNote(recetteDetaillee.id) : undefined}
          onSauvegarderNote={onSauvegarderNote}
        />
      )}

      {/* Modal d'ajout au plan */}
      {recetteAAjouter && (
        <div className="modal-overlay" onClick={() => setRecetteAAjouter(null)}>
          <div className="modal-ajout-plan" onClick={(e) => e.stopPropagation()}>
            <h3>Ajouter "{recetteAAjouter.nom}" au plan</h3>
            <p className="modal-subtitle">Choisissez le jour et le type de repas</p>
            
            <div className="selection-grid">
              {JOURS_SEMAINE.map((jour, index) => (
                <div key={jour} className="jour-section">
                  <h4 className="jour-titre">{jour}</h4>
                  <div className="repas-buttons">
                    {TYPES_REPAS.map(({ type, label }) => (
                      <button
                        key={type}
                        className="btn-select-repas"
                        onClick={() => {
                          onAjouterAuPlan(index + 1, type, recetteAAjouter.id);
                          setRecetteAAjouter(null);
                          alert(`"${recetteAAjouter.nom}" ajouté au ${label.toLowerCase()} de ${jour} !`);
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <button className="btn-close-modal" onClick={() => setRecetteAAjouter(null)}>
              Annuler
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
