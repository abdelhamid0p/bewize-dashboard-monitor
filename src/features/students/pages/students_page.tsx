import { SearchInput } from "@/shared/components/atoms/search-input"
import { Button } from "@/components/ui/button"
import { Download, MoreVertical } from "lucide-react"
import { StudentsFilters } from "../components/students_filters"
import { StudentsTableContainer } from "../components/students_table_container"

export const StudentsPage = () => {
  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Les étudiants</h1>
        <div className="flex items-center gap-3">
          <Button variant="default" className="bg-purple-600 hover:bg-purple-700">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
          <Button variant="outline" size="icon">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Filtres */}
      <div className="flex items-center justify-between gap-4">
        <SearchInput placeholder="Rechercher..." />
        <StudentsFilters />
      </div>

      {/* Table */}
      <StudentsTableContainer />

      {/* Pagination */}
      <div className="flex items-center justify-center gap-2">
        <Button variant="outline" size="sm">←</Button>
        <Button variant="default" size="sm" className="bg-purple-600">1</Button>
        <Button variant="outline" size="sm">→</Button>
      </div>
    </div>
  )
}