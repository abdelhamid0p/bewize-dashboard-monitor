import type { FilterConfig } from "@/features/tables/types";

export const STUDENTS_TABLE_FILTERS: FilterConfig[] = [
  {
    key: "gender",
    label: "Genre",
    type: "select",
    options: [
      { label: "Fille", value: "FEMALE" },
      { label: "Garcon", value: "MALE" },
    ],
  },
  {
    key: "cycle",
    label: "Cycle",
    type: "select",
    options: [
      { label: "Primaire", value: "ELEMENTARY_SCHOOL" },
      { label: "College", value: "MIDDLE_SCHOOL" },
      { label: "Lycee", value: "HIGH_SCHOOL" },
    ],
  },
];
