import omit from 'lodash/omit';
import { ACTION } from './modal.action';

const initState = {
  modalStack: [],
  modalProps: {},
};

export const modalReducer = (state = initState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION.CLEAR_MODAL_STACK:
      return {
        ...state,
        modalStack: [],
        modalProps: {},
      };

    case ACTION.PUSH_MODAL_STACK:
      return handlePushModalStack(state, payload);

    case ACTION.POP_MODAL_STACK:
      return handlePopModalStack(state, payload);

    default:
      return state;
  }
};

const handlePushModalStack = (state, payload) => {
  const { modalStack, modalProps } = state;
  const { modalKey, props } = payload;
  const isNotExist = !modalStack.find((key) => key === modalKey);

  return {
    ...state,
    modalStack: isNotExist ? [...modalStack, modalKey] : modalStack,
    modalProps: { ...modalProps, [modalKey]: props || {} },
  };
};

const handlePopModalStack = (state, payload) => {
  const { modalStack, modalProps } = state;
  const { modalKey } = payload;
  const topModal =
    modalStack.length && modalStack.reduce((result, next) => next);

  if (topModal !== modalKey) return state;
  return {
    ...state,
    modalStack: modalStack.filter((key) => key !== modalKey),
    modalProps: omit(modalProps, [modalKey]),
  };
};

export default modalReducer;
