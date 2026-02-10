
import '@/shared/design-system/colors.css'  // vos variables de couleurs
import '@/shared/design-system/typography.css' // vos variables de typo
import '@/index.css'             // Tailwind
import StaticDesignSystemShowcase from "@/shared/design-system/design-system-showcase/staticShowcase.tsx";
import DynamicDesignSystemShowcase from "@/shared/design-system/design-system-showcase/interactiveShowcase.tsx";

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginPage } from '@/features/auth/pages/LoginPage';


function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/static_showcase" element={<StaticDesignSystemShowcase />} />
                <Route path="/dynamic_showcase" element={<DynamicDesignSystemShowcase />} />
                <Route path="/auth" element={<LoginPage />} />
                <Route path='/dashboard' element={<div>Dashboard Page (protected)</div>} />


            </Routes>
        </BrowserRouter>

    );
}

export default App;