export interface StudentResponse {
  id: string
  name: string
  phone: string
  subscriptionType: "freemium" | "premium" | "pro" | "essai-gratuit"
  planType: "annual" | "monthly" | "trimestriel"
  device: string
  gender: "Fille" | "Garçon"
  registrationDate: string
  level: "CM1" | "CM2" | "CP" | "CH1" | "CH2"
}

export interface StudentUI {
  id: string
  name: string
  phone: string
  subscriptionType: string
  subscriptionBadgeColor: "green" | "yellow" | "blue" | "red"
  planType: string
  device: string
  gender: string
  registrationDate: string
  level: string
}