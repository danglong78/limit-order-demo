import dynamic from 'next/dynamic';
import { MODAL_KEY } from 'constants/modalKey.constant';
import GlobalModalsLoading from './GlobalModalsLoading.component';

export const loadingPayload = {
  loading: GlobalModalsLoading,
};

export const AppModalConfig = {
  [MODAL_KEY.WALLET_CONNECT]: dynamic(
    () => import('components/WalletModal/ConnectModal.component'),
    loadingPayload
  ),

  [MODAL_KEY.SELECT_TOKEN]: dynamic(
    () => import('components/ModalSelectToken.component'),
    loadingPayload
  ),
};
