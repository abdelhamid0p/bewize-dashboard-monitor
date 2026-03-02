import { DashboardLayout } from "@/shared/components/templates/DashboardLayout";

export const Dashboard = () => {
  return <DashboardLayout></DashboardLayout>;
};

export const CommandesPage = () => {
  return <div className="bg-white p-6 rounded-lg">Commandes Page (test)</div>;
};

export const EcolesPage = () => {
  return <div className="bg-white p-6 rounded-lg">Ecoles Page (test)</div>;
};

export const ReclamationsPage = () => {
  return (
    <div className="bg-white p-6 rounded-lg">Reclamations Page (test)</div>
  );
};

export default Dashboard;
