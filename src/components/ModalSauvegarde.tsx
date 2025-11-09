import { useState } from 'react';
import './ModalSauvegarde.css';

interface ModalSauvegardeProps {
  onSauvegarder: (nom: string) => void;
  onFermer: () => void;
}

export function ModalSauvegarde({ onSauvegarder, onFermer }: ModalSauvegardeProps) {
  const [nom, setNom] = useState(() => {
    // Générer un nom par défaut basé sur la semaine
    const now = new Date();
    const lundi = new Date(now);
    lundi.setDate(now.getDate() - now.getDay() + 1);
    const dimanche = new Date(lundi);
    dimanche.setDate(lundi.getDate() + 6);
    
    const formatDate = (date: Date) => 
      `${date.getDate().toString().padStart(2, '0')}/${(date.getMonth() + 1).toString().padStart(2, '0')}`;
    
    return `Semaine du ${formatDate(lundi)} au ${formatDate(dimanche)}`;
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nom.trim()) {
      onSauvegarder(nom.trim());
      onFermer();
    }
  };

  return (
    <div className="modal-overlay" onClick={onFermer}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2>💾 Sauvegarder le plan</h2>
          <button className="btn-close" onClick={onFermer}>✕</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-body">
          <div className="form-group">
            <label htmlFor="nom-sauvegarde">
              Nom de la sauvegarde
            </label>
            <input
              id="nom-sauvegarde"
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: Semaine du 11/11 au 17/11"
              autoFocus
              required
            />
            <p className="help-text">
              Ce nom vous aidera à retrouver cette sauvegarde plus tard
            </p>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onFermer}>
              Annuler
            </button>
            <button type="submit" className="btn-primary">
              💾 Sauvegarder
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
