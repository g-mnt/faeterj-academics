import type React from 'react'
import { type ApplicationStackParamList } from 'src/navigations/types'

export interface RouteData {
  name: keyof ApplicationStackParamList
  component: React.FC
  icon: string
  hidden: boolean
  displayName: string
}

export interface UseRoutesData {
  routes: RouteData[]
}
