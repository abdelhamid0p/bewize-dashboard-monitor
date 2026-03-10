import React from "react";
import { useParams } from "react-router-dom";
import { useStudentDetails } from "../hooks/useStudentDetails";
import { StudentInfoCard } from "../components/StudentInfoCard";
import { StudentDetailsFields } from "../components/StudentDetailsFields";
import { OrdersTable } from "../components/OrdersTable";
import { SubscriptionsTable } from "../components/SubscriptionsTable";

/**
 * StudentDetailsPage - Feature page that composes feature components.
 * Only handles data fetching via hook and orchestrates layout.
 * No inline UI logic — delegates everything to shared components.
 */
export const StudentDetailsPage: React.FC = () => {
  const { studentId } = useParams<{ studentId: string }>();
  const { student, isLoading, isError } = useStudentDetails(studentId!);

  if (isLoading) return <div className="p-8">Chargement...</div>;
  if (isError || !student)
    return (
      <div className="p-8 text-red-500">
        Erreur lors du chargement des données.
      </div>
    );

  return (
    <div className="p-4 sm:p-5 md:p-6 lg:p-8 2xl:p-10 space-y-5 sm:space-y-6 md:space-y-7 lg:space-y-8">
      <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-semibold text-neutral-900">
        Détails de l'étudiant
      </h1>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-5 md:gap-6">
        <div className="w-full lg:w-80 xl:w-100 2xl:w-90 shrink-0">
          <StudentInfoCard student={student} />
        </div>
        <div className="flex-1 ">
          <StudentDetailsFields student={student} />
        </div>
      </div>

      <OrdersTable orders={student.orders} />
      <SubscriptionsTable orders={student.orders} />
    </div>
  );
};
