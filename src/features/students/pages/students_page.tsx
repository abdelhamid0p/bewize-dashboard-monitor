import { SearchInput } from "@/components/atoms/search-input/search_input";
import { Button } from "@/components/ui/button";
import { Calendar, Download, Settings2 } from "lucide-react";
import { StudentsFilters } from "../components/students_filters";
import { StudentsTableContainer } from "../components/students_table_container";

export const StudentsPage = () => {
  return (
    <div className="p-6 space-y-4">
      {/* Header (à changer avec l organism nav-bar) */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-neutral-900">Les étudiants</h1>
        <div className="flex items-center gap-3">
          <Button className="bg-primary-500 hover:bg-primary-600 text-white rounded-full px-5">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full border-neutral-300"
          >
            <Settings2 className="h-4 w-4 text-neutral-600" />
          </Button>
        </div>
      </div>

      {/* Barre recherche + Filtres */}
      <div className="flex items-center justify-between gap-4">
        {/* Gauche : Recherche + Date */}
        <div className="flex items-center gap-3">
          <SearchInput placeholder="Rechercher..." />
          <Button
            variant="outline"
            className="flex items-center gap-2 rounded-full border-neutral-300 text-neutral-600 text-sm px-4"
          >
            <Calendar className="h-4 w-4" />
            Date
          </Button>
        </div>

        {/* Droite : Filtres */}
        <StudentsFilters />
      </div>

      {/* Table */}
      <StudentsTableContainer />
    </div>
  );
};
