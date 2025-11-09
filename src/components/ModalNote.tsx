import { useState, useEffect } from 'react';
import { Recette, RecetteNote } from '../types';
import { StarRating } from './StarRating';
import './ModalNote.css';

interface ModalNoteProps {
  recette: Recette;
  noteExistante?: RecetteNote;
  onSauvegarder: (recetteId: string, note: string, etoiles: number) => void;
  onFermer: () => void;
}

export function ModalNote({ recette, noteExistante, onSauvegarder, onFermer }: ModalNoteProps) {
  const [etoiles, setEtoiles] = useState(noteExistante?.etoiles || 0);
  const [texteNote, setTexteNote] = useState(noteExistante?.note || '');

  useEffect(() => {
    // Empêcher le scroll du body quand la modale est ouverte
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleSauvegarder = () => {
    onSauvegarder(recette.id, texteNote, etoiles);
    onFermer();
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onFermer();
    }
  };

  const handleModalClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-note" onClick={handleModalClick}>
        <div className="modal-note-header">
          <h2>📝 {noteExistante ? 'Modifier' : 'Ajouter une note'}</h2>
          <button className="btn-close" onClick={onFermer} aria-label="Fermer">
            ✕
          </button>
        </div>

        <div className="modal-note-content">
          <div className="recette-info">
            <h3>{recette.nom}</h3>
            <p className="recette-type">{recette.type}</p>
          </div>

          <div className="rating-section">
            <label>⭐ Votre note :</label>
            <StarRating 
              rating={etoiles} 
              onRatingChange={setEtoiles}
              size="large"
            />
            <span className="rating-label">
              {etoiles === 0 && 'Pas encore notée'}
              {etoiles === 1 && 'Bof...'}
              {etoiles === 2 && 'Passable'}
              {etoiles === 3 && 'Bien'}
              {etoiles === 4 && 'Très bien !'}
              {etoiles === 5 && 'Excellente ! ❤️'}
            </span>
          </div>

          <div className="note-section">
            <label htmlFor="note-textarea">💭 Vos notes :</label>
            <textarea
              id="note-textarea"
              value={texteNote}
              onChange={(e) => setTexteNote(e.target.value)}
              placeholder="Ex: Ajouter plus de sel, parfait pour le dimanche soir, trop épicé..."
              rows={4}
              maxLength={500}
            />
            <span className="char-count">{texteNote.length}/500</span>
          </div>
        </div>

        <div className="modal-note-footer">
          <button className="btn-annuler" onClick={onFermer}>
            Annuler
          </button>
          <button className="btn-sauvegarder" onClick={handleSauvegarder}>
            {noteExistante ? 'Modifier' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
}
