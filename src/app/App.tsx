
import '@/design-system/colors.css'  // vos variables de couleurs
import '@/design-system/typography.css' // vos variables de typo
import '@/index.css'             // Tailwind
import StaticDesignSystemShowcase from "@/shared/design-system/design-system-showcase/staticShowcase";
import DynamicDesignSystemShowcase from "@/shared/design-system/design-system-showcase/interactiveShowcase";

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
    return (
        <BrowserRouter>

            <Routes>
                <Route path="/" element={<StaticDesignSystemShowcase />} />
                <Route path="/dynamic_showcase" element={<DynamicDesignSystemShowcase />} />


            </Routes>
        </BrowserRouter>

    );
}

export default App;