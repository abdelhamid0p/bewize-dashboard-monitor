/**
 * Student mapper - transforms backend data to UI format
 */

import type { StudentBackend, StudentUI } from "../model/student.types";
import { GENDER_LABELS, CYCLE_LABELS } from "./enums";

/**
 * Map a single student from backend format to UI format
 */
export const mapStudentToUI = (backend: StudentBackend): StudentUI => {
  const genderLabel = GENDER_LABELS[backend.gender] ?? "—";
  const cycleLabel = CYCLE_LABELS[backend.level?.cycle] ?? "";
  const levelName = backend.level?.levelName ?? "—";
  const signupDate = backend.singupDate
    ? new Date(backend.singupDate).toLocaleDateString("fr-FR")
    : "—";

  return {
    id: backend.id,
    cne: backend.cne,
    name: backend.firstName,
    phone: backend.phone || "—",
    email: backend.email || "—",
    gender: genderLabel,
    signupDate,
    level: cycleLabel ? `${levelName} (${cycleLabel})` : levelName,
  };
};
