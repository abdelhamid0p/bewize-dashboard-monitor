import { useEffect, useState } from "react"

export function useFetchData<T, U>(
  fetcher: () => Promise<T>,                  // fonction qui récupère les données
  mapper?: (data: T) => U,                    // fonction qui transforme les données si besoin
  deps: any[] = []                             // dépendances pour relancer l'effet
) {
  const [data, setData] = useState<U | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      setError(null)
      try {
        const result = await fetcher()
        setData(mapper ? mapper(result) : (result as unknown as U))
      } catch (err) {
        setError(err as Error)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, deps)

  return { data, loading, error }
}
