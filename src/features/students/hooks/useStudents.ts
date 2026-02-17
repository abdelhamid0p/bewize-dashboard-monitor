import { useState } from "react"
import { useFetchData } from "@/shared/hooks/useFetchData"
import { fetchStudents } from "../api/students_api"
import {
  SUBSCRIPTION_TYPE_CONFIG,
  PLAN_TYPE_CONFIG,
  PAGE_SIZE,
} from "../config/student_config"
import type { StudentUI } from "../model/student_types"

export function useStudents() {
  const [currentPage, setCurrentPage] = useState(1)

  const query = useFetchData(
    fetchStudents,
    (data: any[]): StudentUI[] =>
      data.map((student: any) => ({
        id:                     student.id,
        name:                   student.name,
        phone:                  student.phone,
        subscriptionType:       SUBSCRIPTION_TYPE_CONFIG[student.subscriptionType as keyof typeof SUBSCRIPTION_TYPE_CONFIG].label,
        subscriptionBadgeColor: SUBSCRIPTION_TYPE_CONFIG[student.subscriptionType as keyof typeof SUBSCRIPTION_TYPE_CONFIG].color,
        planType:               PLAN_TYPE_CONFIG[student.planType as keyof typeof PLAN_TYPE_CONFIG].label,
        device:                 student.device,
        gender:                 student.gender,
        registrationDate:       student.registrationDate,
        level:                  student.level,
      }))
  )

  const totalItems = query.data?.length || 0
  const totalPages = Math.ceil(totalItems / PAGE_SIZE)
  const paginatedData = query.data?.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  )

  return {
    ...query,
    data:        paginatedData,
    currentPage,
    totalPages,
    totalItems,
    goToPage:    setCurrentPage,
  }
}