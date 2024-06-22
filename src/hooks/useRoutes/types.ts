import type React from 'react'
import { type ApplicationStackParamList } from 'src/navigations/types'

export type RouteData = {
  name: keyof ApplicationStackParamList
  component: React.FC
  icon: string
  hidden: boolean
  displayName: string
}

export type UseRoutesData = {
  routes: RouteData[]
}
