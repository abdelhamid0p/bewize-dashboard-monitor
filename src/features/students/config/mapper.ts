/**
 * Student mapper - transforms backend data to UI format
 */

import type { StudentBackend, StudentUI } from "../model/student.types";
import { GENDER_LABELS, CYCLE_LABELS } from "./enums";

/**
 * Map a single student from backend format to UI format
 */
export const mapStudentToUI = (backend: StudentBackend): StudentUI => {
  const genderLabel = GENDER_LABELS[backend.gender];
  const cycleLabel = CYCLE_LABELS[backend.level?.cycle];
  const levelName = backend.level?.levelName;
  const signupDate = backend.singupDate
    ? new Date(backend.singupDate).toLocaleDateString("fr-FR")
    : undefined;

  return {
    id: backend.id,
    name: backend.firstName,
    phone: backend.phone,
    subscriptionType: undefined,
    planType: undefined,
    deviceSystem: undefined,
    gender: genderLabel,
    signupDate: signupDate ?? "",
    level: cycleLabel ? `${levelName} (${cycleLabel})` : levelName ?? "",
  };
};
