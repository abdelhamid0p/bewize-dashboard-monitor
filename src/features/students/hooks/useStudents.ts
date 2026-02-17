import { useFetchData } from "@/shared/hooks"
import { fetchStudents } from "../api/students_api"
import { SUBSCRIPTION_TYPE_CONFIG, PLAN_TYPE_CONFIG } from "../config/student_config"
import type { StudentUI } from "../model/student_types"

export function useStudents() {
  return useFetchData(
    fetchStudents,
    (data: any[]): StudentUI[] =>
      data.map((student: any) => ({
        id: student.id,
        name: student.name,
        phone: student.phone,
        subscriptionType: SUBSCRIPTION_TYPE_CONFIG[student.subscriptionType as keyof typeof SUBSCRIPTION_TYPE_CONFIG].label,
        subscriptionBadgeColor: SUBSCRIPTION_TYPE_CONFIG[student.subscriptionType as keyof typeof SUBSCRIPTION_TYPE_CONFIG].color,
        planType: PLAN_TYPE_CONFIG[student.planType as keyof typeof PLAN_TYPE_CONFIG].label,
        device: student.device,
        gender: student.gender,
        registrationDate: student.registrationDate,
        level: student.level,
      }))
  )
}