import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-hot-toast';
import { useDropzone } from 'react-dropzone';
import { useDispatch } from 'react-redux';
import { uploadFile } from 'services/upload.service';
import { toggleLoading } from 'states/loading/loading.action';
import toBase64 from 'utils/toBase64.util';
import PictureUpload from 'components/PictureUpload.component';
import LoadingWrapper from 'components/LoadingWrapper.component';
import classNames from 'classnames';
import withCatch from 'utils/withCatch.util';
import { useTranslation } from 'next-i18next';

const FileInput = ({
  handleDrop,
  fileType,
  loadingKey,
  error,
  disabled,
  maxFiles,
}) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('common');

  const { getRootProps, getInputProps } = useDropzone({
    onDrop: async (acceptedFiles) => {
      toggleLoading({ loadingKey })(dispatch);
      const listBase64 = await Promise.all(
        acceptedFiles.map((file) => toBase64(file))
      );
      const [listResponse, err] = await withCatch(
        Promise.all(listBase64.map((base64) => uploadFile(base64)))
      );

      toggleLoading({ loadingKey })(dispatch);
      if (err) {
        toast.error(err.message);
        return;
      }

      if (listResponse) handleDrop(listResponse);
    },
    accept: fileType,
    maxSize: 1024 * 1024 * 50,
    noKeyboard: true,
    maxFiles,
    multiple: maxFiles !== 1,
    disabled,
    onDropRejected: ([rejectedFile]) => {
      let errorMsg;
      switch (rejectedFile.errors[0].code) {
        case 'file-too-large':
          errorMsg = t('fileTooLarge');
          break;

        case 'too-many-files':
          errorMsg = t('tooManyFiles');
          break;

        default:
          errorMsg = t('fileInvalidType');
          break;
      }

      toast.error(errorMsg);
    },
  });

  return (
    <LoadingWrapper loadingKeys={[loadingKey]}>
      <div
        {...getRootProps({ className: 'dropzone' })}
        className={classNames('file-input__wrapper', {
          'file-input__wrapper--error': error,
          'file-input__wrapper--disabled': disabled,
        })}
      >
        <div className="file-input__content">
          <PictureUpload />
          <div className="file-input__input-wrapper">
            <label htmlFor="file-upload">
              <span className="file-input__label">{t('uploadAFile')}</span>
              <span className="pl-1">{t('orDragAndDrop')}</span>
              <input
                {...getInputProps()}
                id="file-upload"
                name="file-upload"
                className="sr-only"
              />
            </label>
          </div>
          <p className="file-input__des">{`PNG, JPG, PDF... ${t(
            'upTo'
          )} 50MB`}</p>
        </div>
      </div>
    </LoadingWrapper>
  );
};

FileInput.defaultProps = {
  handleDrop: () => {},
  isMultiple: false,
  error: false,
  disabled: false,
  maxFiles: 0,
};

FileInput.propTypes = {
  handleDrop: PropTypes.func,
  fileType: PropTypes.string.isRequired,
  isMultiple: PropTypes.bool,
  loadingKey: PropTypes.string.isRequired,
  error: PropTypes.bool,
  disabled: PropTypes.bool,
  maxFiles: PropTypes.number,
};

export default FileInput;
