/**
 * Student enums - display labels for backend values
 */

export const GENDER_LABELS: Record<string, string> = {
  FEMALE: "Fille",
  MALE: "Garçon",
};

// Colors keyed by backend value for use in renderer
export const GENDER_COLORS: Record<string, "blue" | "red"> = {
  FEMALE: "red",
  MALE: "blue",
};

// Colors keyed by label for use after mapping
export const GENDER_LABEL_COLORS: Record<string, "blue" | "red"> = {
  "Fille": "red",
  "Garçon": "blue",
};

export const CYCLE_LABELS: Record<string, string> = {
  ELEMENTARY_SCHOOL: "Primaire",
  MIDDLE_SCHOOL: "Collège",
  HIGH_SCHOOL: "Lycée",
  UNIVERSITY: "Université",
  OTHER: "Autre",
};
