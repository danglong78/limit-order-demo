export const ACTION = {
  TOGGLE_LOADING: 'TOGGLE_LOADING',
}

export const toggleLoading =
  ({ loadingKey, isLoading }) =>
  (dispatch) => {
    dispatch({
      type: ACTION.TOGGLE_LOADING,
      payload: {
        loadingKey,
        isLoading,
      },
    })
  }
