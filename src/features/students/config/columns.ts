/**
 * Student table columns configuration
 */

import type { Column } from "@/shared/components/organisms/data-table";

export const STUDENTS_COLUMNS: Column[] = [
  { key: "name", label: "Nom" },
  { key: "phone", label: "Téléphone" },
  { key: "subscriptionType", label: "Type d'abonnement" },
  { key: "planType", label: "Type de plan" },
  { key: "deviceSystem", label: "Appareil / Système" },
  { key: "gender", label: "Genre" },
  { key: "signupDate", label: "Date d'inscription" },
  { key: "level", label: "Niveau" },
  { key: "actions", label: "Actions" },
];
