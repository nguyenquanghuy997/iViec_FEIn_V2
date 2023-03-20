import React from 'react';
import {DOMAIN_SERVER_API} from "@/config";
import {API_UPLOAD_FILE_APPLICANTS} from "@/routes/api";
import {Grid, Typography} from "@mui/material";
import {Upload} from "antd";

const {Dragger} = Upload;

export default function
  UploadFileDragAndDrop({setFileList, maxFile, multiple, showUploadList, height = 80, accept}) {
  const token = "Bearer " + localStorage.getItem("accessToken");

  const props = {
    name: 'file',
    action: DOMAIN_SERVER_API + API_UPLOAD_FILE_APPLICANTS,
    headers: {Authorization: token},
    onChange(info) {
      const {status} = info.file;
      console.log(status);
      if (status !== 'uploading') {
        setFileList(info.fileList);
      }
      if (status === 'done') {
        setFileList(info.fileList);
      } else if (status === 'error') {
        setFileList(info.fileList);
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };

  return (
    <Dragger {...props}
             maxCount={maxFile}
             multiple={multiple}
             accept={accept}
             showUploadList={showUploadList}
             height={height}
             style={{background: "white"}}>
      <Grid>
        <Typography variant={"textSize14500"} color={"#1976D2"}>Nhấn hoặc kéo thả để Tải lên và Scan
          CV</Typography>
      </Grid>
      <Grid>
        <Typography variant={"textSize13"} color={"#5C6A82"}>Tải lên file .doc, .xls, .pdf, .png, .jpg
          tối
          đa 15MB</Typography>
      </Grid>
    </Dragger>
  );
}