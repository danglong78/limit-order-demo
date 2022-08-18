export const ACTION = {
  PUSH_MODAL_STACK: 'PUSH_MODAL_STACK',
  POP_MODAL_STACK: 'POP_MODAL_STACK',
  CLEAR_MODAL_STACK: 'CLEAR_MODAL_STACK',
};

export const pushModalStack =
  ({ modalKey, props }) =>
  (dispatch) =>
    dispatch({
      type: ACTION.PUSH_MODAL_STACK,
      payload: {
        modalKey,
        props,
      },
    });

export const popModalStack =
  ({ modalKey }) =>
  (dispatch) =>
    dispatch({
      type: ACTION.POP_MODAL_STACK,
      payload: { modalKey },
    });

export const clearModalStack = () => (dispatch) =>
  dispatch({
    type: ACTION.CLEAR_MODAL_STACK,
  });
