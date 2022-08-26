import { toast } from 'react-hot-toast';
import { useCopyToClipboard } from 'react-use';

const useToastCopyToClipboard = (value) => {

  // eslint-disable-next-line no-unused-vars
  const [_, copyToClipboard] = useCopyToClipboard();

  const copy = () => {
    copyToClipboard(value);
    toast.success('Copied');
  };

  return { copy };
};

export default useToastCopyToClipboard;
