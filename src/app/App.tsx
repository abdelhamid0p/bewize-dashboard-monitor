import "@/shared/design-system/colors.css"; // vos variables de couleurs
import "@/shared/design-system/typography.css"; // vos variables de typo
import "@/index.css"; // Tailwind
import StaticDesignSystemShowcase from "@/shared/design-system/design-system-showcase/staticShowcase.tsx";
import DynamicDesignSystemShowcase from "@/shared/design-system/design-system-showcase/interactiveShowcase.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { LoginPage } from "@/features/auth/pages/login_page";
import { PrivateRoute } from "@/features/auth/components/PrivateRoute";
import { DashboardPage } from "@/features/stats/pages/dashboard_home";
import {
  CommandesPage,
  Dashboard,
  EcolesPage,
  ReclamationsPage,
} from "@/features/navigation/pages/Dashboard";
import { PromoCodesPage } from "@/features/promo-codes/pages";
import { StudentsPage } from "@/features/students/pages/StudentsPage";
import { SubscriptionsPage } from "@/features/subscriptions/pages/SubscriptionsPage";
import { StudentDetailsPage } from "@/features/students/student-details";

function App() {
  return (
    <BrowserRouter basename="/bewize-dashboard-monitor">
      <Routes>
        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard layout - Protected */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardPage />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="students/:studentId" element={<StudentDetailsPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="reductions" element={<PromoCodesPage />} />
          <Route path="orders" element={<CommandesPage />} />
          <Route path="schools" element={<EcolesPage />} />
          <Route path="reclamations" element={<ReclamationsPage />} />
        </Route>

        {/* Design System layout */}
        <Route
          path="/static_showcase"
          element={<StaticDesignSystemShowcase />}
        />
        <Route
          path="/dynamic_showcase"
          element={<DynamicDesignSystemShowcase />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
