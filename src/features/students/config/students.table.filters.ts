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
    key: "deviceType",
    label: "Type d'appareil",
    type: "select",
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
    type: "select",
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
    type: "select",
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
    type: "select",
    options: [
      { label: "Annuel", value: "ANNUAL" },
      { label: "Mensuel", value: "MONTHLY" },
      { label: "Trimestriel", value: "QUARTERLY" },
      { label: "Semestriel", value: "SEMESTER" },
    ],
  },
];
