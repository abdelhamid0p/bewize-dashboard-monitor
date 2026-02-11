import type { AppDispatch } from '@/app/store'
import { loginStart, loginSuccess, loginFailure } from '../store/auth_slice'

export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(loginStart())

    await new Promise((res) => setTimeout(res, 1000))

    if (email === 'admin@test.com' && password === '123456') {
      dispatch(loginSuccess({ email }))
    } else if (email === 'admin@test.com' && password != '123456'){
      dispatch(loginFailure('Mot de passe incorrect'))
    }else {
      dispatch(loginFailure('Email incorret'))
    }
  }
