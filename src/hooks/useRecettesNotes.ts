import { RecettesNotes, RecetteNote } from '../types';
import { useLocalStorage } from './useLocalStorage';

export function useRecettesNotes() {
  const [notes, setNotes] = useLocalStorage<RecettesNotes>('zenmenu-recettes-notes', {});

  const ajouterNote = (recetteId: string, texteNote: string) => {
    setNotes(prev => ({
      ...prev,
      [recetteId]: {
        recetteId,
        note: texteNote,
        etoiles: prev[recetteId]?.etoiles || 0,
        dateModification: new Date().toISOString()
      }
    }));
  };

  const definirEtoiles = (recetteId: string, etoiles: number) => {
    const clampedEtoiles = Math.max(0, Math.min(5, etoiles)); // Limiter entre 0 et 5
    
    setNotes(prev => ({
      ...prev,
      [recetteId]: {
        recetteId,
        note: prev[recetteId]?.note,
        etoiles: clampedEtoiles,
        dateModification: new Date().toISOString()
      }
    }));
  };

  const obtenirNote = (recetteId: string): RecetteNote | undefined => {
    return notes[recetteId];
  };

  const supprimerNote = (recetteId: string) => {
    setNotes(prev => {
      const newNotes = { ...prev };
      delete newNotes[recetteId];
      return newNotes;
    });
  };

  const obtenirFavoris = (): RecetteNote[] => {
    return Object.values(notes)
      .filter(note => note.etoiles >= 4)
      .sort((a, b) => b.etoiles - a.etoiles);
  };

  const estFavori = (recetteId: string): boolean => {
    return (notes[recetteId]?.etoiles || 0) >= 4;
  };

  return {
    notes,
    ajouterNote,
    definirEtoiles,
    obtenirNote,
    supprimerNote,
    obtenirFavoris,
    estFavori
  };
}
