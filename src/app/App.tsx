import "@/design-system/colors.css"; // vos variables de couleurs
import "@/design-system/typography.css"; // vos variables de typo
import "@/index.css"; // Tailwind
import StaticDesignSystemShowcase from "@/design-system/design-system-showcase/staticShowcase.tsx";
import DynamicDesignSystemShowcase from "@/design-system/design-system-showcase/interactiveShowcase.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PromoCodesPage } from "@/features/promo-codes/pages";
import { StudentsPage } from "@/features/students/pages/StudentsPage";
import { SubscriptionsPage } from "@/features/subscriptions/pages/SubscriptionsPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticDesignSystemShowcase />} />
        <Route
          path="/dynamic_showcase"
          element={<DynamicDesignSystemShowcase />}
        />
        <Route path="/students" element={<StudentsPage />} />
        <Route path="/subscriptions" element={<SubscriptionsPage />} />
        <Route path="/promo-codes" element={<PromoCodesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
