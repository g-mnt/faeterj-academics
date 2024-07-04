import { useFetch } from 'hooks/useFetch'
import { type FetchFunctionProps } from 'hooks/useFetch/types'
import { useEffect, useRef, useState } from 'react'
import { type UseInfinityScrollData, type InfinityScrollParamsProps } from 'hooks/useInfinityScroll/types'
import { type Meta, type PaginatedRequestProps, type PaginatedResponse } from 'types/request'

export function useInfinityScroll<P extends PaginatedRequestProps, T> (
  fetchFunction: FetchFunctionProps<P, PaginatedResponse<T>>,
  params?: InfinityScrollParamsProps<P>
): UseInfinityScrollData<T> {
  const page = useRef(params?.initialPage ?? 1)
  const [{ isLoading }, fetchRequest] = useFetch(fetchFunction)
  const meta = useRef<Meta>()
  const [data, setData] = useState<T[]>([])

  useEffect(() => {
    page.current = 1
    loadMore().catch(() => {})
  }, [JSON.stringify(params?.params)])

  async function loadMore (): Promise<void> {
    if (params?.params !== undefined && !isLoading) {
      if (meta.current !== undefined && meta.current.current_page >= meta.current.last_page) {
        return
      }

      const { data } = await fetchRequest({ ...params.params, page: page.current })
      page.current++

      if (data !== null) {
        meta.current = data.meta
        setData(prev => page.current === 1 ? data.data : [...(prev ?? []), ...data.data])
      }
    }
  }

  async function refresh (): Promise<void> {
    if (params?.params !== undefined && !isLoading) {
      page.current = 1
      const { data } = await fetchRequest({ ...params.params, page: page.current })
      page.current++

      if (data !== null) {
        meta.current = data.meta
        setData(data.data)
      }
    }
  }

  return {
    data, isLoading, loadMore, refresh
  }
}
