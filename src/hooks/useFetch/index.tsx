import { useCallback, useEffect, useState } from 'react'
import { type FetchApiStateReturn, type FetchApiProps, type FetchApiReturn, type FetchFunctionProps } from 'hooks/useFetch/types'
import { AxiosError } from 'axios'
import { useToast } from '../useToast'
import { useLogout } from '../useLogout'

export const useFetch = <P, T>(
  fetchFunction: FetchFunctionProps<P, T>,
  { params, showErrorToast }: FetchApiProps<P> = { showErrorToast: true }
): FetchApiReturn<P, T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setLoading] = useState(false)
  const [error, setError] = useState<AxiosError | null>(null)
  const { logout } = useLogout()
  const { errorToast } = useToast()

  const fetchRequest = useCallback(async (newParams?: P): Promise<FetchApiStateReturn<T>> => {
    setLoading(true)
    try {
      const data = await fetchFunction(newParams ?? params as P)
      setData(data)
      return ({
        data,
        isLoading: false,
        error: null
      })
    } catch (error) {
      if (error instanceof AxiosError) {
        setError(error)

        if (error.response?.status === 401) {
          logout()
          errorToast('Login expirado!')
        } else if (showErrorToast === true) {
          errorToast(error.response?.data.message as string ?? error.message)
        }
      }

      return {
        data: null,
        error: error as AxiosError,
        isLoading: false
      }
    } finally {
      setLoading(false)
    }
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
