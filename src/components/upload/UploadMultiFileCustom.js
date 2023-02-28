// @mui
//
import BlockContent from "./BlockContent";
import MultiFilePreviewCustom from "./MultiFilePreviewCustom";
import RejectionFiles from "./RejectionFiles";
import { Box, Button, Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import { useDropzone } from "react-dropzone";

const DropZoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

UploadMultiFile.propTypes = {
  files: PropTypes.array.isRequired,
  error: PropTypes.bool,
  showPreview: PropTypes.bool,
  onUpload: PropTypes.func,
  onRemove: PropTypes.func,
  onRemoveAll: PropTypes.func,
  helperText: PropTypes.node,
  sx: PropTypes.object,
};

export default function UploadMultiFile({
  error,
  showPreview = false,
  files,
  onUpload,
  onRemove,
  onRemoveAll,
  helperText,
  sx,
  ...other
}) {
  console.log("🚀 ~ file: UploadMultiFileCustom.js:42 ~ files:", files);
  const {
    getRootProps,
    acceptedFiles,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({
    ...other,
  });
  console.log(
    "🚀 ~ file: UploadMultiFileCustom.js:53 ~ acceptedFiles:",
    acceptedFiles
  );

  return (
    <Box sx={{ width: "100%", ...sx }}>
      {/* <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
        }}
      >
        <input {...getInputProps()} />

        <BlockContent />
      </DropZoneStyle> */}
      <MultiFilePreviewCustom
        files={acceptedFiles}
        showPreview={showPreview}
        onRemove={onRemove}
        {...getRootProps()}
      />
      {/* {fileRejections.length > 0 && (
        <RejectionFiles fileRejections={fileRejections} />
      )}

   

      {/* 
      {files?.length > 0 && (
        <Stack direction="row" justifyContent="flex-end" spacing={1.5}>
          <Button color="inherit" size="small" onClick={onRemoveAll}>
            Remove all
          </Button>
          <Button size="small" variant="contained" onClick={onUpload}>
            Upload files
          </Button>
        </Stack>
      )}

      {helperText && helperText} */}
    </Box>
  );
}
