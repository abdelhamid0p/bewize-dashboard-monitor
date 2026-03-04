import type { AppDispatch } from '@/app/store'
import { loginStart, loginSuccess, loginFailure } from '../store/auth_slice'
import { 
  validateCredentials, 
  createSession, 
  clearSession 
} from '@/shared/storage/authStorage'

/**
 * Login avec validation sécurisée (hash SHA-256)
 * Les credentials sont vérifiés contre le hash stocké
 */
export const login =
  (email: string, password: string) =>
  async (dispatch: AppDispatch) => {
    dispatch(loginStart())

    try {
      // Validation avec hash
      const isValid = await validateCredentials(email, password)

      if (isValid) {
        await createSession(email)
        dispatch(loginSuccess({ email }))
      } else {
        dispatch(loginFailure('Email ou mot de passe incorrect'))
      }
    } catch (error) {
      console.error('Login error:', error)
      dispatch(loginFailure('Erreur lors de la connexion'))
    }
  }

export const logout = () => (dispatch: AppDispatch) => {
  clearSession()
  dispatch({ type: 'auth/logout' })
}
