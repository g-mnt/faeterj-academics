import { useFetch } from 'hooks/useFetch'
import { type FetchFunctionProps } from 'hooks/useFetch/types'
import { useEffect, useRef, useState } from 'react'
import { type InfinityScrollParamsProps } from 'hooks/useInfinityScroll/types'
import { type Meta, type PaginatedRequestProps, type PaginatedResponse } from 'types/request'

export function useInfinityScroll<P extends PaginatedRequestProps, T> (
  fetchFunction: FetchFunctionProps<P, PaginatedResponse<T>>,
  params?: InfinityScrollParamsProps<P>
) {
  const page = useRef(params?.initialPage || 1)
  const [{ isLoading }, fetchRequest] = useFetch(fetchFunction)
  const meta = useRef<Meta>()
  const [data, setData] = useState<T[]>()

  useEffect(() => {
    page.current = 1
    loadMore().catch(() => {})
  }, [JSON.stringify(params?.params)])

  async function loadMore () {
    if (params?.params && !isLoading) {
      if (meta.current && meta.current.current_page >= meta.current.last_page) {
        return
      }

      try {
        const { data } = await fetchRequest({ ...params.params, page: page.current })
        page.current++

        if (data) {
          meta.current = data.meta
          setData(prev => [...(prev || []), ...data.data])
        }
      } catch (e) {
        // handle this error
      }
    }
  }
  return {
    data, isLoading, loadMore
  }
}
