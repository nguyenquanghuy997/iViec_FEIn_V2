import { useContext } from 'react'

import { ConfirmModalContext } from '@/contexts/ConfirmModalContext'

const useConfirmModal = () => {
  const context = useContext(ConfirmModalContext)

  if (!context) throw new Error('ConfirmModal context must be use inside ConfirmModalProvider')

  return context
}

export default useConfirmModal;