import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { RecettesData, RepasPlanifie, TypeRepas, Recette, SauvegardePlan } from './types';
import { initializerPlanVide } from './utils/planUtils';
import { useLocalStorage } from './hooks/useLocalStorage';
import { useTheme } from './hooks/useTheme';
import { Navigation } from './components/Navigation';
import { ThemeToggle } from './components/ThemeToggle';
import { PlanPage } from './pages/PlanPage';
import { CoursesPage } from './pages/CoursesPage';
import { RecherchePage } from './pages/RecherchePage';
import './App.css';
import './responsive-improvements.css';

// Fonction pour transformer le nouveau format JSON (tableau) vers l'ancien format (objet)
function transformerRecettes(data: any): RecettesData {
  // Si c'est déjà l'ancien format, le retourner tel quel
  if (data.petits_dejeuners && data.dejeuners && data.diners && data.collations) {
    return data as RecettesData;
  }
  
  // Si c'est un tableau, le transformer
  if (Array.isArray(data)) {
    const recettes: Recette[] = data;
    
    // Détecter et supprimer les doublons par NOM (pas ID)
    const recettesUniques = recettes.reduce((acc, recette) => {
      // Garder seulement la première occurrence de chaque nom de recette
      if (!acc.find(r => r.nom.toLowerCase() === recette.nom.toLowerCase())) {
        acc.push(recette);
      }
      return acc;
    }, [] as Recette[]);
    
    console.log(`🔍 Recettes brutes: ${recettes.length}, Recettes uniques par nom: ${recettesUniques.length}`);
    
    return {
      petits_dejeuners: recettesUniques.filter(r => r.type === 'petits_dejeuner' || r.type === 'petit_dejeuner'),
      dejeuners: recettesUniques.filter(r => r.type === 'dejeuner'),
      diners: recettesUniques.filter(r => r.type === 'diner'),
      collations: recettesUniques.filter(r => r.type === 'collation'),
      desserts: recettesUniques.filter(r => r.type === 'dessert')
    };
  }
  
  // Sinon retourner des tableaux vides
  return {
    petits_dejeuners: [],
    dejeuners: [],
    diners: [],
    collations: [],
    desserts: []
  };
}

function App() {
  const [recettesData, setRecettesData] = useState<RecettesData | null>(null);
  const [plan, setPlan] = useLocalStorage<RepasPlanifie[]>('plan-menu-digestion', initializerPlanVide());
  const [sauvegardes, setSauvegardes] = useLocalStorage<SauvegardePlan[]>('plan-menu-sauvegardes', []);
  const [chargement, setChargement] = useState(true);
  const [erreur, setErreur] = useState<string | null>(null);
  const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();

  // Gérer le scroll du header
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsHeaderScrolled(scrollTop > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Charger les données des recettes
  useEffect(() => {
    fetch(`${import.meta.env.BASE_URL}data/recettes.json`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Impossible de charger les recettes');
        }
        return response.json();
      })
      .then(data => {
        // Transformer le format si nécessaire
        const recettesTransformees = transformerRecettes(data);
        
        // Log pour vérifier le nombre de recettes par type
        console.log('📊 Recettes chargées:');
        console.log('  - Petits déjeuners:', recettesTransformees.petits_dejeuners.length);
        console.log('  - Déjeuners:', recettesTransformees.dejeuners.length);
        console.log('  - Dîners:', recettesTransformees.diners.length);
        console.log('  - Collations:', recettesTransformees.collations?.length || 0);
        console.log('  - Desserts:', recettesTransformees.desserts?.length || 0);
        const total = recettesTransformees.petits_dejeuners.length + 
                      recettesTransformees.dejeuners.length + 
                      recettesTransformees.diners.length +
                      (recettesTransformees.collations?.length || 0) +
                      (recettesTransformees.desserts?.length || 0);
        console.log('  ✅ TOTAL:', total, 'recettes');
        
        setRecettesData(recettesTransformees);
        setChargement(false);
      })
      .catch(err => {
        setErreur(err.message);
        setChargement(false);
      });
  }, []);

  const modifierRepas = (jour: number, type: TypeRepas, recetteId: string) => {
    setPlan((prevPlan: RepasPlanifie[]) =>
      prevPlan.map((repas: RepasPlanifie) =>
        repas.jour === jour && repas.type === type
          ? { ...repas, recetteId }
          : repas
      )
    );
  };

  const modifierPortions = (jour: number, type: TypeRepas, portions: number) => {
    // S'assurer que les portions sont au minimum à 1
    const portionsValides = Math.max(1, portions);
    
    setPlan((prevPlan: RepasPlanifie[]) =>
      prevPlan.map((repas: RepasPlanifie) =>
        repas.jour === jour && repas.type === type
          ? { ...repas, portions: portionsValides }
          : repas
      )
    );
  };

  const viderJour = (jour: number) => {
    setPlan((prevPlan: RepasPlanifie[]) =>
      prevPlan.map((repas: RepasPlanifie) =>
        repas.jour === jour
          ? { ...repas, recetteId: null }
          : repas
      )
    );
  };

  const reinitialiserPlan = () => {
    if (window.confirm('⚠️ Voulez-vous vraiment réinitialiser tout le plan de la semaine ?')) {
      setPlan((prevPlan: RepasPlanifie[]) =>
        prevPlan.map((repas: RepasPlanifie) => ({
          ...repas,
          recetteId: null,
          portions: 1
        }))
      );
    }
  };

  const genererPlanAleatoire = () => {
    if (!recettesData) return;

    // Compteur pour limiter les répétitions (max 2 fois par recette)
    const compteurRecettes = new Map<string, number>();

    // Fonction pour sélectionner une recette aléatoire sans trop de répétitions
    const selectionnerRecetteAleatoire = (recettes: any[]) => {
      // Filtrer les recettes qui ont été utilisées moins de 2 fois
      const recettesDisponibles = recettes.filter(r => {
        const count = compteurRecettes.get(r.id) || 0;
        return count < 2;
      });

      // Si toutes les recettes ont été utilisées 2 fois, réinitialiser et utiliser toutes les recettes
      const pool = recettesDisponibles.length > 0 ? recettesDisponibles : recettes;
      
      // Sélection aléatoire
      const index = Math.floor(Math.random() * pool.length);
      const recetteId = pool[index].id;
      
      // Incrémenter le compteur
      compteurRecettes.set(recetteId, (compteurRecettes.get(recetteId) || 0) + 1);
      
      return recetteId;
    };

    // Créer un nouveau plan avec des recettes aléatoires
    const nouveauPlan: RepasPlanifie[] = [];
    
    for (let jour = 1; jour <= 7; jour++) {
      // Petit déjeuner
      nouveauPlan.push({
        jour,
        type: 'petit_dejeuner',
        recetteId: selectionnerRecetteAleatoire(recettesData.petits_dejeuners),
        portions: 1
      });

      // Déjeuner
      nouveauPlan.push({
        jour,
        type: 'dejeuner',
        recetteId: selectionnerRecetteAleatoire(recettesData.dejeuners),
        portions: 1
      });

      // Dîner
      nouveauPlan.push({
        jour,
        type: 'diner',
        recetteId: selectionnerRecetteAleatoire(recettesData.diners),
        portions: 1
      });

      // Collation
      nouveauPlan.push({
        jour,
        type: 'collation',
        recetteId: selectionnerRecetteAleatoire(recettesData.collations),
        portions: 1
      });
    }

    setPlan(nouveauPlan);
  };

  const sauvegarderPlan = (nom: string) => {
    const nouvelleSauvegarde: SauvegardePlan = {
      id: Date.now().toString(),
      nom,
      dateCreation: new Date().toISOString(),
      plan: [...plan]
    };
    
    setSauvegardes((prevSauvegardes: SauvegardePlan[]) => [nouvelleSauvegarde, ...prevSauvegardes]);
  };

  const chargerSauvegarde = (sauvegarde: SauvegardePlan) => {
    setPlan(sauvegarde.plan);
  };

  const supprimerSauvegarde = (id: string) => {
    setSauvegardes((prevSauvegardes: SauvegardePlan[]) => 
      prevSauvegardes.filter(s => s.id !== id)
    );
  };

  const toggleConsomme = (jour: number, type: TypeRepas) => {
    setPlan((prevPlan: RepasPlanifie[]) =>
      prevPlan.map((repas: RepasPlanifie) =>
        repas.jour === jour && repas.type === type
          ? { ...repas, consomme: !repas.consomme }
          : repas
      )
    );
  };


  if (chargement) {
    return (
      <div className="app loading">
        <div className="loader">
          <div className="spinner"></div>
          <p>Chargement des recettes...</p>
        </div>
      </div>
    );
  }

  if (erreur || !recettesData) {
    return (
      <div className="app error">
        <div className="error-message">
          <h2>❌ Erreur</h2>
          <p>{erreur || 'Une erreur est survenue'}</p>
        </div>
      </div>
    );
  }

  return (
    <Router>
      <div className="app">
        <header className={`app-header ${isHeaderScrolled ? 'scrolled' : ''}`}>
          <div className="header-content">
            <div className="zen-icon">
              <span>🍃</span>
            </div>
            <h1 className="app-title">
              <span className="zen">Zen</span>Menu
            </h1>
            <p className="tagline">Nutrition intuitive</p>
          </div>
          
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </header>

        <Navigation isScrolled={isHeaderScrolled} />

        <main className="app-main">
          <Routes>
            <Route
              path="/"
              element={
                <PlanPage
                  plan={plan}
                  recettesData={recettesData}
                  sauvegardes={sauvegardes}
                  onModifierRepas={modifierRepas}
                  onModifierPortions={modifierPortions}
                  onGenererPlanAleatoire={genererPlanAleatoire}
                  onViderJour={viderJour}
                  onReinitialiserPlan={reinitialiserPlan}
                  onSauvegarderPlan={sauvegarderPlan}
                  onChargerSauvegarde={chargerSauvegarde}
                  onSupprimerSauvegarde={supprimerSauvegarde}
                  onToggleConsomme={toggleConsomme}
                />
              }
            />
            <Route
              path="/recherche"
              element={
                <RecherchePage 
                  recettesData={recettesData}
                  onAjouterAuPlan={modifierRepas}
                />
              }
            />
            <Route
              path="/courses"
              element={<CoursesPage plan={plan} recettesData={recettesData} />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
