import React from "react";
import { StudentDetails } from "../model/student-details.types";

interface StudentInfoCardProps {
  student: StudentDetails;
}

export const StudentInfoCard: React.FC<StudentInfoCardProps> = ({
  student,
}) => {
  return (
    <div className="bg-neutral-50 rounded-xl p-6 flex flex-col gap-4 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="bg-primary-100 rounded-full w-16 h-16 flex items-center justify-center text-3xl font-bold text-primary-700">
          {/* Avatar or initials */}
          {student.firstName.charAt(0)}
        </div>
        <div>
          <div className="text-lg font-semibold text-neutral-900">
            {student.firstName} {student.lastName}
          </div>
          <div className="text-sm text-neutral-500">
            CNE: {student.cne} | Niveau: {student.level.levelName}
          </div>
          <div className="text-xs text-neutral-400">
            Date d'inscription: {student.singupDate}
          </div>
          <div className="text-xs text-neutral-400">ID: {student.id}</div>
        </div>
      </div>
    </div>
  );
};
