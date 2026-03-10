import React from "react";
import { InfoSection } from "@/shared/components/organisms/info-section";
import type { InfoFieldItem } from "@/shared/components/molecules/info-field-grid";
import type { StudentDetails } from "../model/student-details.types";

interface StudentDetailsFieldsProps {
  student: StudentDetails;
}

/**
 * StudentDetailsFields - Feature component composing shared organisms.
 * No business logic — only maps student data to InfoSection props.
 */
export const StudentDetailsFields: React.FC<StudentDetailsFieldsProps> = ({
  student,
}) => {
  const fields: InfoFieldItem[] = [
    { label: "Nom", value: student.firstName },
    { label: "Email", value: student.email },
    { label: "Genre", value: student.gender },
    { label: "École", value: "GSLM" },
    {
      label: "Pays/Ville",
      value: `${student.locationCountry},${student.locationCity}`,
    },
    { label: "Dernière connexion / visite", value: student.lastVisit },
  ];

  return (
    <InfoSection
      title="Informations de l'étudiant"
      fields={fields}
      columns={2}
    />
  );
};
