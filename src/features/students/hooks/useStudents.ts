import { useState, useEffect } from "react"
import { fetchStudents } from "../api/students_api"
import { GENDER_CONFIG, CYCLE_CONFIG } from "../config/student_config"
import type { StudentUI, StudentsFilters } from "../model"

export function useStudents(initialFilters: StudentsFilters = {}) {
  const [data, setData] = useState<StudentUI[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [filters, setFilters] = useState<StudentsFilters>(initialFilters);
  const [meta, setMeta] = useState({
    page: 0,
    size: 10,
    totalElements: 0,
    totalPages: 0,
  });

  useEffect(() => {
    const loadStudents = async () => {
      setLoading(true)
      setError(null)

      try {
        const response = await fetchStudents(filters)

        // Transformer les données backend → UI
        const transformedData: StudentUI[] = response.data.map((student) => ({
          id:         student.id,
          cne:        student.cne,
          name:       `${student.firstName} ${student.lastName}`,
          phone:      student.phone,
          email:      student.email,
          gender:     GENDER_CONFIG[student.gender].label,
          genderColor: GENDER_CONFIG[student.gender].color,
          signupDate: new Date(student.singupDate).toLocaleDateString("fr-FR"),
          level:      `${student.level.levelName} (${CYCLE_CONFIG[student.level.cycle].label})`,
        }))

        setData(transformedData)
        setMeta(response.meta)
      } catch (err) {
        setError(err instanceof Error ? err : new Error("Erreur inconnue"))
      } finally {
        setLoading(false)
      }
    }

    loadStudents()
  }, [filters])

  const goToPage = (page: number) => {
    setFilters((prev) => ({ ...prev, page }))
  }

  const updateFilters = (newFilters: Partial<StudentsFilters>) => {
    setFilters((prev) => ({ ...prev, ...newFilters, page: 0 }))
  }

  return {
    data,
    loading,
    error,
    meta,
    currentPage: meta.page,
    totalPages: meta.totalPages,
    totalElements: meta.totalElements,
    goToPage,
    updateFilters,
  }
}