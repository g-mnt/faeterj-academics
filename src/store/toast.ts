import { create } from 'zustand'

type ToastStatus = 'success' | 'error'

type SetToastProps = {
  status: ToastStatus
  title: string
}

type ToastState = {
  isVisible: boolean
  title: string
  status: ToastStatus
}

type ToastActions = {
  showToast: (props: SetToastProps) => void
  hideToast: () => void
}

const initialState: ToastState = {
  isVisible: false,
  title: '',
  status: 'success'
}

export const useToastStore = create<ToastState & ToastActions>((set) => ({
  ...initialState,
  showToast: (props) => { set(() => ({ ...props, isVisible: true })) },
  hideToast: () => { set(() => ({ isVisible: false })) }
}))
