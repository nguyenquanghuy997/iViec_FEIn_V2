import { Button } from "../DesignSystem";
import { BoxItemFileStyle, EditorStyle } from "./styles";
import { DeleteIcon } from "@/assets/ActionIcon";
import { EDITOR_API_KEY } from "@/config";
import palette from "@/theme/palette";
import { showIconByFileType } from "@/utils/function";
import { calcFileSize } from "@/utils/function";
import {
  Box,
  FormHelperText,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { Editor as TinyEditor } from "@tinymce/tinymce-react";
import { useRef, useMemo, memo } from "react";
import { RiAttachment2 } from "react-icons/ri";

const MemoEditor = memo(TinyEditor, (prevProps, nextProps) => {
  if (prevProps.initialValue !== nextProps.initialValue) {
    return false;
  }
  return true;
});

export const renderFileUploadItem = (
  file,
  index,
  removeFileUpload,
  displayButtonDelete
) => {
  if (!file) return;
  let fileType = file.name.slice(file.name.lastIndexOf("."));

  return (
    <BoxItemFileStyle className="file-upload-item" key={index}>
      {showIconByFileType(fileType)}
      <Stack sx={{ mx: 1 }}>
        <Typography
          sx={{
            color: palette.light.common.neutral700,
            fontSize: 13,
            fontWeight: 600,
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "125px",
          }}
        >
          {file.name}
        </Typography>
        <Typography
          sx={{
            color: palette.light.common.neutral700,
            fontSize: 12,
            fontWeight: 400,
          }}
        >
          {calcFileSize(file.size)}
        </Typography>
      </Stack>
      {!displayButtonDelete && (
        <IconButton
          size="small"
          sx={{ color: palette.light.blue700, mx: 0.5 }}
          onClick={() => {
            removeFileUpload(index);
          }}
        >
          <DeleteIcon />
        </IconButton>
      )}
    </BoxItemFileStyle>
  );
};

export default function Editor({
  id = null,
  initialValue,
  onChange,
  height = 380,
  menubar = false,
  plugins = [
    "advlist",
    "autolink",
    "lists",
    "link",
    "image",
    "charmap",
    "preview",
    "anchor",
    "searchreplace",
    "visualblocks",
    "code",
    "fullscreen",
    "insertdatetime",
    "media",
    "table",
    "code",
    "help",
    "wordcount",
  ],
  toolbar = "bold italic underline strikethrough | forecolor numlist bullist ",
  hasAttachFiles = false,
  attachFiles: attachFilesList = [],
  handleFileChange,
  removeFileUpload,
  error,
  ...props
}) {
  const _editor = useRef(null);
  const editorId = useMemo(() => id || "editor_" + Date.now(), [id]);

  const attachFiles = useMemo(() => {
    let aryFiles = [];
    for (let i = 0; i < attachFilesList.length; i++) {
      aryFiles.push(attachFilesList[i]);
    }
    return aryFiles;
  }, [attachFilesList]);

  return (
    <EditorStyle className={hasAttachFiles ? "has-attach-files" : ""}>
      {hasAttachFiles && (
        <Button
          variant="contained"
          color="default"
          startIcon={<RiAttachment2 size={18} color="#455570" />}
          component="label"
          className="btn-attachment-files"
        >
          Đính kèm file
          <input
            hidden
            accept=".doc,.docx,.pdf,.xlsx,.xls"
            multiple
            type="file"
            onChange={handleFileChange}
          />
        </Button>
      )}

      <MemoEditor
        id={editorId}
        apiKey={EDITOR_API_KEY}
        onInit={(evt, editor) => (_editor.current = editor)}
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
        onEditorChange={onChange}
        {...props}
      />

      {hasAttachFiles && attachFiles.length > 0 && (
        <Box display={"flex"} sx={{ overflowX: "auto", mt: 2 }}>
          {attachFiles.map((file, index) =>
            renderFileUploadItem(file, index, removeFileUpload)
          )}
        </Box>
      )}

      {!!error && <FormHelperText error>{error.message}</FormHelperText>}
    </EditorStyle>
  );
}
