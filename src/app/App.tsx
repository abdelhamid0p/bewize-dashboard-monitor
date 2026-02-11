import '@/shared/design-system/colors.css'  // vos variables de couleurs
import '@/shared/design-system/typography.css' // vos variables de typo
import '@/index.css'             // Tailwind
import StaticDesignSystemShowcase from "@/shared/design-system/design-system-showcase/staticShowcase.tsx";
import DynamicDesignSystemShowcase from "@/shared/design-system/design-system-showcase/interactiveShowcase.tsx";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/pages/LoginPage';
import { AbonnementsPage, CommandesPage, Dashboard, DashboardHome, StudentsPage } from '@/pages/Dashboard';


function App() {
    return (
        <BrowserRouter>

        <Routes>

        {/* Login Page */}
        <Route path="/" element={<LoginPage />} />

        {/* Dashboard layout */}
        <Route path="/dashboard" element={<Dashboard />}>
          <Route index element={<DashboardHome />} />
          <Route path="students" element={<StudentsPage />} />
          <Route path="orders" element={<CommandesPage />} />
          <Route path="subscriptions" element={<AbonnementsPage />} />
        </Route>

        {/* Design System layout */}
        <Route path="/static_showcase" element={<StaticDesignSystemShowcase />} />
        <Route path="/dynamic_showcase" element={<DynamicDesignSystemShowcase />} />

        </Routes>

        </BrowserRouter>
    );
}

export default App;