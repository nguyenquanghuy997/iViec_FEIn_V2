import {memo, useMemo, useRef} from "react";
import '@/utils/highlight'
import {Editor as TinyEditor} from "@tinymce/tinymce-react";
import {EditorStyle} from "@/components/form/editor/style";
import {API_KEY_EDITOR} from '@/config';
import HelperText from "@/components/BaseComponents/HelperText";

const MemoEditor = memo(TinyEditor, (prevProps, nextProps) => {
  if (prevProps.initialValue !== nextProps.initialValue) {
    return false;
  }
  return true;
});

const Editor = (
    {
      id = null,
      initialValue,
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
    }) => {

  const _editorRef = useRef(null);
  const editorId = useMemo(() => id || 'editor_' + Date.now(), [id]);

  return (
      <>
        <EditorStyle>
          <MemoEditor
              id={editorId}
              apiKey={API_KEY_EDITOR}
              onInit={(evt, editor) => _editorRef.current = editor}
              initialValue={initialValue}
              init={{
                height,
                menubar,
                plugins,
                toolbar,
                statusbar: false,
                content_style: `
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
                body { font-family: Inter, sans-serif; font-size: 14px; color: #455570 }
              `,
              }}
              {...props}
          />
          {!!error && (
              <HelperText errorText={error.message} />
          )}
        </EditorStyle>
      </>
  )
};

export default Editor;
