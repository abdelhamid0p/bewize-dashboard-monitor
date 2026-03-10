import React from "react";
import { ProfileCard } from "@/shared/components/organisms/profile-card";
import { Badge } from "@/shared/components/atoms/badge";
import studentIcon from "@/assets/icones/students_icone_table.svg";
import type { StudentDetails } from "../model/student-details.types";

interface StudentInfoCardProps {
  student: StudentDetails;
}

/**
 * StudentInfoCard - Feature component composing shared organisms.
 * No business logic — only maps student data to ProfileCard props.
 */
export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({
  student,
}) => {
  const fullName = `${student.firstName} ${student.lastName}`;

  return (
    <ProfileCard
      icon={
        <img
          src={studentIcon}
          alt=""
          className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8"
        />
      }
      name={fullName}
      badges={
        <>
          <Badge className="w-[calc(50%-4px)]">CNE: {student.cne || "—"}</Badge>

          <Badge className="w-[calc(50%-4px)]">
            Niveau: {student.level.levelName || "—"}
          </Badge>

          <Badge className="w-full">
            Date d'inscription
            <br />
            {student.singupDate || "—"}
          </Badge>

          <Badge className="w-full">
            ID de commande
            <br />
            {student.id || "—"}
          </Badge>
        </>
      }
    />
  );
};
