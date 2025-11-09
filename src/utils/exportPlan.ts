/**
 * Exporte le plan hebdomadaire en PDF via l'impression du navigateur
 */
export function exportPlanToPDF() {
  // Debug: Vérifier si le plan existe
  const planHebdo = document.querySelector('.plan-hebdo');
  const planGrid = document.querySelector('.plan-grid');
  
  console.log('=== DEBUG EXPORT PDF ===');
  console.log('plan-hebdo trouvé:', !!planHebdo);
  console.log('plan-grid trouvé:', !!planGrid);
  
  if (planGrid) {
    const rows = planGrid.querySelectorAll('.grid-row');
    console.log('Nombre de lignes:', rows.length);
    const meals = planGrid.querySelectorAll('.meal-name');
    console.log('Nombre de repas:', meals.length);
  }
  
  // FORCER les styles inline pour bypasser @media print
  const html = document.documentElement;
  html.style.setProperty('background', 'white', 'important');
  html.style.setProperty('color', 'black', 'important');
  
  document.body.style.setProperty('background', 'white', 'important');
  document.body.style.setProperty('color', 'black', 'important');
  
  // Ajouter une classe temporaire pour les styles d'impression
  document.body.classList.add('printing-plan');
  html.classList.add('printing-active');
  
  // Alerter l'utilisateur des paramètres à vérifier
  const message = 
`📄 IMPORTANT - Paramètres d'impression:

Dans l'aperçu, active :
✓ "Arrière-plans" / "Background graphics"
✓ "Couleurs d'arrière-plan"

Chrome: Plus de paramètres → Options de fond
Safari: Menu → Imprimer les arrière-plans
Firefox: Options de page → Couleurs d'arrière-plan`;
  
  alert(message);
  
  // Petit délai pour que les styles s'appliquent
  setTimeout(() => {
    // Déclencher la boîte de dialogue d'impression
    window.print();
    
    // Retirer la classe après impression
    setTimeout(() => {
      document.body.classList.remove('printing-plan');
      html.classList.remove('printing-active');
      html.style.removeProperty('background');
      html.style.removeProperty('color');
      document.body.style.removeProperty('background');
      document.body.style.removeProperty('color');
    }, 1000);
  }, 100);
}

/**
 * Partage le plan via l'API Web Share (mobile)
 */
export async function sharePlan(planText: string) {
  if (navigator.share) {
    try {
      await navigator.share({
        title: 'Mon Plan ZenMenu',
        text: planText,
      });
      return true;
    } catch (error) {
      console.log('Partage annulé');
      return false;
    }
  }
  return false;
}
