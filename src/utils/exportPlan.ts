/**
 * Exporte le plan hebdomadaire en PDF via l'impression du navigateur
 * Nouvelle approche: ouvrir une fenêtre dédiée avec HTML inline
 */
export function exportPlanToPDF() {
  // Récupérer le contenu du plan
  const planHebdo = document.querySelector('.plan-hebdo');
  
  if (!planHebdo) {
    alert('❌ Aucun plan trouvé à exporter');
    return;
  }
  
  // Cloner le contenu
  const planClone = planHebdo.cloneNode(true) as HTMLElement;
  
  // Supprimer les éléments non nécessaires du clone
  planClone.querySelectorAll('.btn-consomme, .meal-actions, .day-actions, .btn-change, .btn-clear').forEach(el => el.remove());
  
  // Créer le HTML complet pour l'impression
  const printHTML = `
<!DOCTYPE html>
<html lang="fr">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Mon Plan Hebdomadaire - ZenMenu</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }
    
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: white;
      color: black;
      padding: 20px;
    }
    
    .plan-hebdo {
      max-width: 100%;
      background: white;
    }
    
    .plan-hebdo h2 {
      font-size: 24pt;
      margin-bottom: 20px;
      color: #2C3E50;
      text-align: center;
      padding: 15px;
      border: 2px solid #4A90E2;
      background: #E8F3FC;
    }
    
    .plan-grid {
      display: flex;
      flex-direction: column;
      gap: 0;
    }
    
    .grid-header,
    .grid-row {
      display: grid;
      grid-template-columns: 100px repeat(4, 1fr);
      gap: 0;
      border: 1px solid #2C3E50;
    }
    
    .cell {
      border: 1px solid #2C3E50;
      padding: 12px;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
    }
    
    .header-cell {
      background: #4A90E2;
      color: white;
      font-weight: bold;
      font-size: 11pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .day-cell {
      background: #E8F3FC;
      color: #2C3E50;
      font-weight: bold;
      font-size: 10pt;
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
    }
    
    .day-name {
      font-weight: bold;
    }
    
    .meal-cell {
      background: white;
      color: black;
    }
    
    .meal-content {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 5px;
      width: 100%;
    }
    
    .meal-name {
      font-weight: 600;
      font-size: 10pt;
      color: #2C3E50;
    }
    
    .portions-display-print {
      font-size: 8pt;
      color: #4A90E2;
    }
    
    .meal-empty {
      font-size: 9pt;
      color: #95A5B8;
      font-style: italic;
    }
    
    @media print {
      @page {
        margin: 1.5cm;
        size: A4 portrait;
      }
      
      body {
        padding: 0;
      }
    }
  </style>
</head>
<body>
  ${planClone.outerHTML}
  <script>
    // Imprimer automatiquement et fermer après
    window.onload = function() {
      setTimeout(function() {
        window.print();
      }, 250);
    };
    
    // Fermer la fenêtre après l'impression (optionnel)
    window.onafterprint = function() {
      // Ne pas fermer automatiquement pour laisser l'utilisateur voir le résultat
      // window.close();
    };
  </script>
</body>
</html>
  `;
  
  // Ouvrir dans une nouvelle fenêtre
  const printWindow = window.open('', '_blank', 'width=800,height=600');
  
  if (!printWindow) {
    alert('❌ Popup bloquée ! Autorise les popups pour exporter en PDF.');
    return;
  }
  
  printWindow.document.write(printHTML);
  printWindow.document.close();
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
