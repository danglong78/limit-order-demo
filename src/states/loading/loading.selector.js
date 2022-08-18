import get from 'lodash/get'

export const selectLoadingKeys = (state) =>
  get(state, `loading.loadingKeys`, {})
