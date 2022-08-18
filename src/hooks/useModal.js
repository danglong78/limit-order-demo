import { useDispatch, useSelector } from 'react-redux';
import {
  clearModalStack,
  popModalStack,
  pushModalStack,
} from 'states/modal/modal.action';
import { selectCurrentModalKey } from 'states/modal/modal.selector';

export default function useModal(modalKey) {
  const dispatch = useDispatch();
  const currentModalKey = useSelector(selectCurrentModalKey);

  const toggleModal = ({ isVisible, props }) => {
    if (!modalKey) return;

    if (isVisible) {
      dispatch(pushModalStack({ modalKey, props }));
    } else {
      dispatch(popModalStack({ modalKey }));
    }
  };

  const closeAllModals = () => {
    dispatch(clearModalStack());
  };

  return {
    toggleModal,
    closeAllModals,
    isCurrentModal: currentModalKey === modalKey,
  };
}
