import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '@/shared/hooks'
import { restoreSession } from '../store/auth_slice'
import { getValidSession } from '@/shared/storage/authStorage'

/**
 * Hook pour initialiser l'authentification au démarrage.
 * Vérifie la validité de la session (expiration + signature).
 */
export const useAuthInit = () => {
  const dispatch = useAppDispatch()
  const initialized = useAppSelector((state) => state.auth.initialized)

  useEffect(() => {
    if (initialized) return

    const initAuth = async () => {
      const session = await getValidSession()
      
      if (session) {
        dispatch(restoreSession({ email: session.email }))
      } else {
        dispatch(restoreSession(null))
      }
    }

    initAuth()
  }, [dispatch, initialized])

  return { initialized }
}
