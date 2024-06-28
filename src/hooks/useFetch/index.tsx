import { useCallback, useEffect, useState } from 'react'
import { type FetchApiProps, type FetchApiReturn, type FetchFunctionProps } from 'hooks/useFetch/types'
import { AxiosError } from 'axios'
import { useToast } from '../useToast'

export const useFetch = <P, T>(
  fetchFunction: FetchFunctionProps<P, T>,
  { params, showErrorToast }: FetchApiProps<P> = { showErrorToast: true }
): FetchApiReturn<P, T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const { errorToast } = useToast()

  const fetchRequest = useCallback(async (newParams?: P) => {
    setLoading(true)
    try {
      const data = await fetchFunction(newParams ?? params as P)
      setData(data)
      return data
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error)
        if (showErrorToast === true) {
          errorToast(error.message)
        }
      }
    } finally {
      setLoading(false)
    }

    return null
  }, [params])

  useEffect(() => {
    if (params !== undefined) {
      fetchRequest().catch(() => {})
    }
  }, [])

  return [
    { data, isLoading, error },
    fetchRequest
  ]
}
