/**
 * Exporte le plan hebdomadaire en PDF via l'impression du navigateur
 */
export function exportPlanToPDF() {
  // Ajouter une classe temporaire pour les styles d'impression
  document.body.classList.add('printing-plan');
  
  // Déclencher la boîte de dialogue d'impression
  window.print();
  
  // Retirer la classe après un court délai
  setTimeout(() => {
    document.body.classList.remove('printing-plan');
  }, 1000);
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
