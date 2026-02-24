import type { StudentBackend, StudentUI } from "../model";
import { CYCLE_CONFIG, GENDER_CONFIG } from "./students.table.enums";

export const mapStudentToUI = (backendData: StudentBackend): StudentUI => {
  const genderLabel = GENDER_CONFIG[backendData.gender]?.label ?? "—";
  const cycleLabel = CYCLE_CONFIG[backendData.level?.cycle]?.label ?? "—";
  const levelName = backendData.level?.levelName ?? "—";
  const signupDate = backendData.singupDate
    ? new Date(backendData.singupDate).toLocaleDateString("fr-FR")
    : "—";

  return {
    id: backendData.id,
    cne: backendData.cne,
    name: `${backendData.firstName} ${backendData.lastName}`,
    phone: backendData.phone,
    email: backendData.email,
    gender: genderLabel,
    signupDate,
    level: `${levelName} (${cycleLabel})`,
  };
};
