/* eslint-disable global-require */
/* eslint-disable import/no-unresolved */
import React, { useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import PropTypes from 'prop-types';

import useTheme from 'hooks/useTheme';
import useChangeTinyMceTheme from 'hooks/useChangeTinyMceTheme';

import 'utils/tinymce.util';

const QWERTYEditor = React.forwardRef(
  ({ name, initialValue, onEditorChange }, ref) => {
    const { isDark } = useTheme();
    const id = `editor_${name}`;

    useChangeTinyMceTheme({ ref, id });

    return (
      <div>
        <Editor
          id={id}
          textareaName={name}
          initialValue={initialValue}
          onInit={(_evt, editor) => {
            ref.current = editor;
          }}
          init={{
            skin_url: isDark
              ? '/tinymce/skins/ui/oxide-dark'
              : '/tinymce/skins/ui/oxide', // Static files path(step 2)
            content_css: isDark
              ? '/tinymce/skins/content/dark/content.min.css'
              : '/tinymce/skins/content/default/content.min.css',
            // icons_url:'/tinymce/icons/default/icons.min.js',
            height: 250,
            plugins: [
              'advlist autolink link image lists charmap hr anchor ',
              'searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking',
              'table template paste help',
            ],
            toolbar:
              'undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | ' +
              'bullist numlist outdent indent | link image| ' +
              'forecolor backcolor emoticons | help',
            menu: {
              favs: {
                items: 'code visualaid | searchreplace | emoticons',
              },
            },
            menubar: 'favs file edit view insert format tools table help',
          }}
          onEditorChange={onEditorChange}
        />
      </div>
    );
  }
);

QWERTYEditor.defaultProps = {
  initialValue: '',
  onEditorChange: () => {},
};

QWERTYEditor.propTypes = {
  name: PropTypes.string.isRequired,
  initialValue: PropTypes.string,
  onEditorChange: PropTypes.func,
};

export default QWERTYEditor;
