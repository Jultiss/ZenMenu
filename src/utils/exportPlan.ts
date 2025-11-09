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
  
  // Ajouter une classe temporaire pour les styles d'impression
  document.body.classList.add('printing-plan');
  
  // Petit délai pour que les styles s'appliquent
  setTimeout(() => {
    // Déclencher la boîte de dialogue d'impression
    window.print();
    
    // Retirer la classe après impression
    setTimeout(() => {
      document.body.classList.remove('printing-plan');
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
