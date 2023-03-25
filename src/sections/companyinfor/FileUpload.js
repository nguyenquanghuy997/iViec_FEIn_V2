import ImageIcon from "../../assets/ImageIcon";
import { Box, Stack, Typography } from "@mui/material";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Controller, useController, useFormContext } from "react-hook-form";

const FileUpload = ({ limit, multiple, name }) => {
  const {
    control,
    formState: { isSubmitting},
  } = useFormContext();

  const { field } = useController({ name, control });
  const [singleFile, setSingleFile] = useState([]);
  const [fileList, setFileList] = useState([]);
  const wrapperRef = useRef(null);
  const [selectedFile, setSelectedFile] = useState(null);

  const onDragEnter = () => wrapperRef.current?.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current?.classList.remove("dragover");

  const onFileDrop = useCallback(
    (e) => {
      const target = e.target;
      if (!target.files) return;

      if (limit === 1) {
        const newFile = Object.values(target.files).map((file) => file);
        setSingleFile(newFile);
        field.onChange(newFile[0]);
      }

      // var file = e.target.files[0];
      const reader = new FileReader();
      // var url = reader.readAsDataURL(file);
      reader.onloadend = () => setSelectedFile([reader.result]);
    },
    [field, fileList, limit, multiple, singleFile]
  );

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
  };

  const fileSingleRemove = () => {
    setSingleFile([]);
  };

  useEffect(() => {
    if (isSubmitting) {
      setFileList([]);
      setSingleFile([]);
    }
  }, [isSubmitting]);

  return (
    <>
      {fileList.length > 0 || singleFile.length > 0 ? (
        <Stack>
          {(multiple ? fileList : singleFile).map((item, index) => {
            return (
              <Box
                key={index}
                sx={{
                  position: "relative",
                }}
              >
                <Box
                  display="flex"
                  onClick={() => {
                    if (multiple) {
                      fileRemove(item);
                    } else {
                      fileSingleRemove();
                    }
                  }}
                  sx={{ cursor: "pointer" }}
                >
                  <img
                    src={selectedFile}
                    alt="upload"
                    width={80}
                    height={80}
                    style={{
                      borderRadius: "4px",
                    }}
                  />
                </Box>
              </Box>
            );
          })}
        </Stack>
      ) : (
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          sx={{
            position: "relative",
            width: 80,
            height: 80,
            background: "#EFF3F6",
            borderRadius: "4px",
          }}
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDragLeave}
        >
          <Stack justifyContent="center" sx={{ p: 1, textAlign: "center" }}>
            <Typography variant="body1" component="span">
              <ImageIcon />
            </Typography>
          </Stack>
          <Controller
            name={name}
            defaultValue=""
            control={control}
            render={({ field: { name, onBlur, ref } }) => (
              <input
                type="file"
                name={name}
                onBlur={onBlur}
                ref={ref}
                onChange={onFileDrop}
                multiple
                accept="image/jpg, image/png, image/jpeg"
                style={{
                  opacity: 0,
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: 100,
                  height: 100,
                  cursor: "pointer",
                }}
              />
            )}
          />
        </Box>
      )}
    </>
  );
};

export default FileUpload;
