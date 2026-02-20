import type { StudentBackendResponse, StudentsFilters } from "../model";

const API_BASE_URL = "http://localhost:8083";

export async function fetchStudents(
  filters: StudentsFilters = {},
): Promise<StudentBackendResponse> {
  const { page = 0, size = 10, search, gender, cycle } = filters;

  // Construire les query params
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  if (search) params.append("search", search);
  if (gender) params.append("gender", gender);
  if (cycle) params.append("cycle", cycle);

  const response = await fetch(
    `${API_BASE_URL}/students?${params.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Si vous avez un token d'authentification :
        // "Authorization": `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Erreur API: ${response.status} ${response.statusText}`);
  }

  return response.json();
}
