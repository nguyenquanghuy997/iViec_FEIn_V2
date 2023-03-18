/* eslint-disable @typescript-eslint/no-var-requires */
import React, {useEffect, useRef, useState} from "react";

function Editor({onChange, name, value, placeholder}) {
  const editorRef = useRef()
  const [editorLoaded, setEditorLoaded] = useState(false)
  const {CKEditor, ClassicEditor} = editorRef.current || {}

  useEffect(() => {
    editorRef.current = {
      CKEditor: require('@ckeditor/ckeditor5-react').CKEditor,
      ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
      // Alignment: require('@ckeditor/ckeditor5-alignment').Alignment,
    }
    setEditorLoaded(true)
  }, []);

  return (
      <>
        {editorLoaded && <CKEditor
            name={name}
            config={{
              toolbar: {
                items: [
                  'bold',
                  '|',
                  'italic',
                  '|',
                  'link',
                  '|',
                  'bulletedList',
                  '|',
                  'numberedList',
                ]
              },
              alignment: {
                options: ['left', 'right']
              },
              language: 'vi',
              placeholder: placeholder || 'Nhập thông tin',
            }}
            editor={ClassicEditor}
            data={value}
            onReady={editor => {
              editor.editing.view.change((writer) => {
                writer.setStyle(
                    "height",
                    "370px",
                    editor.editing.view.document.getRoot()
                );
              });
            }}
            onChange={(event, editor) => {
              const data = editor.getData();
              onChange(data);
            }}
        />}
      </>
  )
}

export default Editor;
