import { useToastStore } from 'src/store/toast'
import { type UseToastData } from './types'

export function useToast (): UseToastData {
  const [showToast, hideToast] = useToastStore((state) => [state.showToast, state.hideToast])
  function clearToast (): void {
    setTimeout(() => {
      hideToast()
    }, 2000)
  }

  function successToast (title: string): void {
    showToast({ title, status: 'success' })
    clearToast()
  }

  function errorToast (title: string): void {
    showToast({ title, status: 'error' })
    clearToast()
  }

  return { successToast, errorToast }
}
