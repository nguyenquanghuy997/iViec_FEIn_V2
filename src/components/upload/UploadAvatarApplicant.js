import {Modal, Upload} from 'antd';
import React, {useState} from 'react';
import {DOMAIN_SERVER_API} from "@/config";
import {API_UPLOAD_FILE_APPLICANTS} from "@/routes/api";
import {UploadLineIcon} from "@/assets/ActionIcon";
import {Button} from "@mui/material";

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
export default function UploadAvatarApplicant({type, fileList = [], setFileList, maxFile, multiple, showUploadList, showButton}) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const token = "Bearer " + localStorage.getItem("accessToken");

  // const [fileList, setFileList] = useState([
  //   {
  //     uid: '-1',
  //     name: 'image.png',
  //     status: 'done',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-xxx',
  //     percent: 50,
  //     name: 'image.png',
  //     status: 'uploading',
  //     url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
  //   },
  //   {
  //     uid: '-5',
  //     name: 'image.png',
  //     status: 'error',
  //   },
  // ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
      <Button sx={{border: "1px dashed #1976D2", padding: "8px 12px", textTransform: "inherit"}}
              startIcon={<UploadLineIcon/>}>Tải ảnh
        lên</Button>
    </div>
  );

  const props = {
    name: 'file',
    action: DOMAIN_SERVER_API + API_UPLOAD_FILE_APPLICANTS,
    headers: {Authorization: token},
    onChange(info) {
      const {status} = info.file;
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
    <>
      <Upload
        {...props}
        listType={type}
        maxCount={maxFile}
        multiple={multiple}
        showUploadList={showUploadList}
        onPreview={handlePreview}
      >
        {showButton && fileList?.length >= maxFile ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
}