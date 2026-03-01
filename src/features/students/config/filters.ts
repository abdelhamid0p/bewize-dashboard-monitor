/**
 * Student filters configuration
 */

import type { FilterConfig } from "@/shared/components/organisms/data-table";

export const STUDENTS_FILTERS: FilterConfig[] = [
  {
    key: "gender",
    label: "Genre",
    options: [
      { label: "Fille", value: "FEMALE" },
      { label: "Garçon", value: "MALE" },
    ],
  },
  {
    key: "deviceType",
    label: "Type d'appareil",
    options: [
      { label: "Ordinateur / iOS", value: "COMPUTER_IOS" },
      { label: "Mobile / Android", value: "MOBILE_ANDROID" },
      { label: "Tablet / MacOS", value: "TABLET_MACOS" },
      { label: "Desktop / Web", value: "DESKTOP_WEB" },
      { label: "Mobile / Windows", value: "MOBILE_WINDOWS" },
    ],
  },
  {
    key: "level",
    label: "Niveau",
    options: [
      { label: "CP", value: "CP" },
      { label: "CE1", value: "CE1" },
      { label: "CE2", value: "CE2" },
      { label: "CM1", value: "CM1" },
      { label: "CM2", value: "CM2" },
    ],
  },
  {
    key: "type",
    label: "Type d'abonnement",
    options: [
      { label: "Freemium", value: "FREEMIUM" },
      { label: "Premium", value: "PREMIUM" },
      { label: "Essai gratuit", value: "TRIAL" },
      { label: "Pro", value: "PRO" },
    ],
  },
  {
    key: "planType",
    label: "Type de plan",
    options: [
      { label: "Annuel", value: "ANNUAL" },
      { label: "Mensuel", value: "MONTHLY" },
      { label: "Trimestriel", value: "QUARTERLY" },
      { label: "Semestriel", value: "SEMESTER" },
    ],
  },
];
