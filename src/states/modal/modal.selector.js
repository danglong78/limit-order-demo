import get from 'lodash/get';

export const selectModalStack = (state) => get(state, `modal.modalStack`, []);

export const selectModalProps = (state) => get(state, `modal.modalProps`, []);

export const selectCurrentModalKey = (state) => {
  const modalStack = selectModalStack(state);
  return modalStack.length > 0
    ? modalStack.reduce((result, next) => next)
    : undefined;
};
