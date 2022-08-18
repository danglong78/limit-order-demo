import { useTranslation } from 'next-i18next';
import { toast } from 'react-hot-toast';
import { useCopyToClipboard } from 'react-use';

const useToastCopyToClipboard = (value) => {
  const { t } = useTranslation('common');

  // eslint-disable-next-line no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard();

  const copy = () => {
    copyToClipboard(value);
    toast.success(t('copied'));
  };

  return { copy };
};

export default useToastCopyToClipboard;
