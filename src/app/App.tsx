import "@/design-system/colors.css"; // vos variables de couleurs
import "@/design-system/typography.css"; // vos variables de typo
import "@/index.css"; // Tailwind
import StaticDesignSystemShowcase from "@/design-system/design-system-showcase/staticShowcase.tsx";
import DynamicDesignSystemShowcase from "@/design-system/design-system-showcase/interactiveShowcase.tsx";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StudentsTablePage } from "@/features/students/pages/StudentsTablePage";
import { SubscriptionsTablePage } from "@/features/subscriptions/pages/SubscriptionsTablePage";
import { PromoCodesTablePage } from "@/features/promo-codes/pages";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StaticDesignSystemShowcase />} />
        <Route
          path="/dynamic_showcase"
          element={<DynamicDesignSystemShowcase />}
        />
        <Route path="/students" element={<StudentsTablePage />} />
        <Route path="/subscriptions" element={<SubscriptionsTablePage />} />
        <Route path="/promo-codes" element={<PromoCodesTablePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
