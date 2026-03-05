import React from "react";
import { StudentDetails } from "../model/student-details.types";

interface StudentDetailsFieldsProps {
  student: StudentDetails;
}

export const StudentDetailsFields: React.FC<StudentDetailsFieldsProps> = ({
  student,
}) => {
  return (
    <div className="bg-neutral-50 rounded-xl p-6 grid grid-cols-2 gap-4 shadow-sm">
      <div>
        <div className="text-xs text-neutral-500 mb-1">Nom</div>
        <div className="text-base font-medium text-neutral-900">
          {student.firstName} {student.lastName}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">Email</div>
        <div className="text-base font-medium text-neutral-900">
          {student.email}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">Genre</div>
        <div className="text-base font-medium text-neutral-900">
          {student.gender}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">École</div>
        <div className="text-base font-medium text-neutral-900">GSLM</div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">Pays/Ville</div>
        <div className="text-base font-medium text-neutral-900">
          {student.locationCountry},{student.locationCity}
        </div>
      </div>
      <div>
        <div className="text-xs text-neutral-500 mb-1">
          Dernière connexion / visite
        </div>
        <div className="text-base font-medium text-neutral-900">
          {student.lastVisit}
        </div>
      </div>
    </div>
  );
};
