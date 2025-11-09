import './StarRating.css';

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  readonly?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export function StarRating({ rating, onRatingChange, readonly = false, size = 'medium' }: StarRatingProps) {
  const handleClick = (value: number) => {
    if (readonly || !onRatingChange) return;
    
    // Si on clique sur l'étoile déjà sélectionnée, on désélectionne (rating = 0)
    if (value === rating) {
      onRatingChange(0);
    } else {
      onRatingChange(value);
    }
  };

  return (
    <div className={`star-rating ${size} ${readonly ? 'readonly' : 'interactive'}`}>
      {[1, 2, 3, 4, 5].map((value) => (
        <button
          key={value}
          type="button"
          className={`star ${value <= rating ? 'filled' : 'empty'}`}
          onClick={() => handleClick(value)}
          disabled={readonly}
          aria-label={`${value} étoile${value > 1 ? 's' : ''}`}
          title={`${value} étoile${value > 1 ? 's' : ''}`}
        >
          {value <= rating ? '⭐' : '☆'}
        </button>
      ))}
    </div>
  );
}
