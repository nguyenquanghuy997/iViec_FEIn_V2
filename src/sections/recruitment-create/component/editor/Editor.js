import {memo, useMemo, useRef} from 'react';
import {FormHelperText} from '@mui/material';
import {styled} from '@mui/material/styles';
import {Editor as TinyEditor} from '@tinymce/tinymce-react';
import {API_KEY_EDITOR} from '@/config';

const EditorStyle = styled('div')(({theme: {palette}}) => ({
  '.tox-tinymce': {
    border: '1px solid ' + palette.text.primary,
    borderRadius: '6px',
  },
  '.tox-editor-header .tox-toolbar__primary': {
    '> .tox-toolbar__group:not(:last-of-type)': {
      position: 'relative',
      '&:after': {
        position: 'absolute',
        content: `""`,
        top: 9, right: 0,
        borderRight: '1px solid ' + palette.text.primary,
        height: '60%', width: 1,
      }
    }
  }
}));

const MemoEditor = memo(TinyEditor, () => true);

export default function Editor(
    {
      id = null,
      initialValue,
      onChange,
      height = 380,
      menubar = false,
      plugins = [
          'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
          'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
          'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
      ],
      toolbar = 'bold italic underline strikethrough | forecolor numlist bullist | link',
      error,
      ...props
    }) {
  const _editor = useRef(null);
  const editorId = useMemo(() => id || 'editor_' + Date.now(), [id]);

  return (
      <EditorStyle>
        <MemoEditor
            id={editorId}
            apiKey={API_KEY_EDITOR}
            onInit={(evt, editor) => _editor.current = editor}
            initialValue={initialValue}
            init={{
              language: 'vi',
              height,
              menubar,
              plugins,
              toolbar,
              statusbar: false,
              content_style: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body { font-family: Inter, sans-serif; font-size:14px; color: #455570 }
              `,
              placeholder: props.placeholder || '',
            }}
            onEditorChange={onChange}
            {...props}
        />

        {!!error && (<FormHelperText error sx={{ mt: 2}}>{error.message}</FormHelperText>)}
      </EditorStyle>
  )
}