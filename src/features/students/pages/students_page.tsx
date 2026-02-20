import { useState } from "react";
import { SearchInput } from "@/components/atoms/search-input/search_input";
import { Button } from "@/components/atoms/button";
import { Download, Settings2 } from "lucide-react";
import { StudentsFilters } from "../components/students_filters";
import { StudentsTableContainer } from "../components/students_table_container";

export const StudentsPage = () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div className="p-6 space-y-4">
      {/* A remplacer par navbar Components Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Les étudiants</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            variant="secondary"
            size="icon"
            className="rounded-full border-neutral-300"
          >
            <Settings2 className="h-4 w-4 text-neutral-600" />
          </Button>
        </div>
      </div>

      {/* Recherche + Filtres */}
      <div className="flex items-center justify-between ">
        <div className="flex items-center ">
          <SearchInput
            placeholder="Rechercher..."
            value={searchValue}
            onChange={setSearchValue}
          />
        </div>

        <StudentsFilters />
      </div>

      {/* Table avec pagination serveur */}
      <StudentsTableContainer />
    </div>
  );
};
