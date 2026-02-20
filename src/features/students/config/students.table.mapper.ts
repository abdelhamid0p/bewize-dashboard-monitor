import type { StudentBackend, StudentUI } from "../model";
import { CYCLE_CONFIG, GENDER_CONFIG } from "./students.table.enums";

export const mapStudentToUI = (backendData: StudentBackend): StudentUI => {
  return {
    id: backendData.id,
    cne: backendData.cne,
    name: `${backendData.firstName} ${backendData.lastName}`,
    phone: backendData.phone,
    email: backendData.email,
    gender: GENDER_CONFIG[backendData.gender].label,
    signupDate: new Date(backendData.singupDate).toLocaleDateString("fr-FR"),
    level: `${backendData.level.levelName} (${CYCLE_CONFIG[backendData.level.cycle].label})`,
  };
};
