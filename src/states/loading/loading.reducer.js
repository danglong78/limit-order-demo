import get from 'lodash/get'
import { ACTION } from './loading.action'

const initState = {
  loadingKeys: {},
}

export const loadingReducer = (state = initState, action) => {
  const { type, payload } = action

  switch (type) {
    case ACTION.TOGGLE_LOADING:
      return handleToggleLoading(state, payload)

    default:
      return state
  }
}

const handleToggleLoading = (state, payload) => {
  const { loadingKey, isLoading } = payload
  const oldLoadingKeyState = get(state, `loadingKeys.${loadingKey}`)

  return {
    ...state,
    loadingKeys: {
      ...state.loadingKeys,
      [loadingKey]: isLoading !== undefined ? isLoading : !oldLoadingKeyState,
    },
  }
}
