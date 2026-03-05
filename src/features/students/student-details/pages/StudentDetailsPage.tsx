import React from "react";
import { useParams } from "react-router-dom";
import { useStudentDetails } from "../hooks/useStudentDetails";
import { StudentInfoCard } from "../components/StudentInfoCard";
import { StudentDetailsFields } from "../components/StudentDetailsFields";
import { OrdersTable } from "../components/OrdersTable";
import { SubscriptionsTable } from "../components/SubscriptionsTable";

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
    <div className="p-8 space-y-6">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 min-w-[320px]">
          <StudentInfoCard student={student} />
        </div>
        <div className="flex-1 min-w-[320px]">
          <StudentDetailsFields student={student} />
        </div>
      </div>
      <OrdersTable orders={student.orders} />
      <SubscriptionsTable orders={student.orders} />
    </div>
  );
};
