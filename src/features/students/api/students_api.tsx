import type { StudentResponse } from "../model/student_types"

export async function fetchStudents(): Promise<StudentResponse[]> {
  // Simuler un appel API
  return Promise.resolve([
    {
      id: "1",
      name: "Lola",
      phone: "0612234353",
      subscriptionType: "freemium",
      planType: "annual",
      device: "Ordinateur / iOS",
      gender: "Fille",
      registrationDate: "06/07/2024",
      level: "CM1",
    },
    {
      id: "2",
      name: "Salma",
      phone: "0612234678",
      subscriptionType: "premium",
      planType: "monthly",
      device: "Mobile / Android",
      gender: "Fille",
      registrationDate: "12/12/2022",
      level: "CP",
    },
    {
      id: "3",
      name: "Emane",
      phone: "0612234540",
      subscriptionType: "essai-gratuit",
      planType: "trimestriel",
      device: "Tablet / MacOS",
      gender: "Fille",
      registrationDate: "11/01/2023",
      level: "CM1",
    },
    {
      id: "4",
      name: "Aya",
      phone: "0612234456",
      subscriptionType: "pro",
      planType: "monthly",
      device: "Desktop / Web",
      gender: "Fille",
      registrationDate: "22/04/2023",
      level: "CH2",
    },
    {
      id: "5",
      name: "Sara",
      phone: "0612234369",
      subscriptionType: "freemium",
      planType: "annual",
      device: "Desktop / iOS",
      gender: "Fille",
      registrationDate: "08/09/2024",
      level: "CP",
    },
  ])
}