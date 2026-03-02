import { http, HttpResponse } from 'msw'

interface LoginRequest {
  email: string
  password: string
}

export const handlers = [
  http.post('http://localhost:8080/api/auth/login', async ({ request }) => {
    const { email, password } = await request.json() as LoginRequest

    if (email === 'admin@test.com' && password === '123456') {
      return HttpResponse.json({
        token: 'fake-jwt',
        user: { email },
      })
    }

    return HttpResponse.json(
      { message: 'Identifiants incorrects' },
      { status: 401 }
    )
  }),
]