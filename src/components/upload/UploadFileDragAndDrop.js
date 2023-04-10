import React from 'react';
import {DOMAIN_SERVER_API} from "@/config";
import {API_UPLOAD_FILE_APPLICANTS} from "@/routes/api";
import {Grid, Typography} from "@mui/material";
import {Upload} from "antd";

const {Dragger} = Upload;

export default function
  UploadFileDragAndDrop({setFileList, maxFile, multiple, showUploadList, height = 80, accept, url = API_UPLOAD_FILE_APPLICANTS, autoUpload = true}) {
  const token = "Bearer " + localStorage.getItem("accessToken");
  
  const props = {
    name: 'file',
    action: DOMAIN_SERVER_API + url,
    headers: {Authorization: token},
    beforeUpload: (() => autoUpload),
    onChange(info) {
      setFileList(info.fileList);
      // if(!autoUpload) return setFileList(info.fileList);
      
      // const {status} = info.file;
      // if (status === 'uploading') {
      //   setFileList(info.fileList);
      // }
      // if (status === 'done') {
      //   setFileList(info.fileList);
      // } else if (status === 'error') {
      //   setFileList(info.fileList);
      // }
    },
    onDrop() {
      
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