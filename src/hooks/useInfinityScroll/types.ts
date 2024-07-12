import { type PaginatedRequestProps } from 'types/request'

export type InfinityScrollParamsProps<P extends PaginatedRequestProps> = {
  initialPage?: number
  params?: P
}

export type UseInfinityScrollData<T> = {
  data: T[]
  isLoading: boolean
  loadMore: () => Promise<void>
  refresh: () => Promise<void>
}
