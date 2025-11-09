export type Ingredient = {
  nom: string;
  quantite: string;
  calories?: number;
  rayon?: string; // Pour le tri de la liste de courses par rayon
};

export type Recette = {
  id: string;
  nom: string;
  type?: string; // Type de repas (pour le nouveau format JSON)
  calories?: number;
  ingredients: Ingredient[];
  preparation?: string;
  compatibilite?: string[]; // Tags de compatibilité (ex: "faible gras", "digestion facile")
};

export type RecettesData = {
  meta?: {
    titre?: string;
    description?: string;
    principes?: string[];
    portions_defaut?: number;
  };
  petits_dejeuners: Recette[];
  dejeuners: Recette[];
  diners: Recette[];
  collations: Recette[];
  desserts?: Recette[];
};

export type TypeRepas = "petit_dejeuner" | "dejeuner" | "diner" | "collation";

export type RepasPlanifie = {
  jour: number; // 1 = lundi, 7 = dimanche
  type: TypeRepas;
  recetteId: string | null;
  portions: number; // Nombre de portions (par défaut 1)
  consomme?: boolean; // Pour le suivi des repas
};

export type SauvegardePlan = {
  id: string;
  nom: string; // Ex: "Semaine du 11/11 au 17/11" ou "Semaine 46"
  dateCreation: string; // ISO date
  plan: RepasPlanifie[];
  notesCourses?: string; // Notes supplémentaires pour la liste de courses
};
