import React from 'react'
import useDetectScreen from 'hooks/useDetectScreen'

import Loading from 'components/Loading.component'

const GlobalModalsLoading = () => {
  const { mobileScreen } = useDetectScreen()
  const size = mobileScreen ? 'sm' : 'base'

  return (
    <div className="modal__backdrop">
      <div className="modal__loading">
        <Loading size={size} />
      </div>
    </div>
  )
}

export default GlobalModalsLoading
