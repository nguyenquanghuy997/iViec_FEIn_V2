import UploadImage from "@/assets/UploadImage";
import Image from "@/components/Image";
import { Box } from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {RiImageFill} from "react-icons/ri";
import React from "react";

const EditUpload = ({ style, type, ref,imageHandler ,image}) => {
  return (
    <div className="page">
      <div className="container">
        <Box sx={{display: type === "avatar" ? "flex" : "block", alignItems: type === "avatar" ? "center" : "-moz-initial"}}>
          {
            image ? <Image
                disabledEffect
                visibleByDefault
                src={image}
                alt="image"
                sx={{...style}}
            /> : (
                <Box sx={{  display: 'flex', alignItems: 'center', justifyContent: 'center', ...style }}>
                  <RiImageFill color={"#8A94A5"} size={'1.25em'}/>
                </Box>
            )
          }
          <MuiButton
              title={<>Tải lên ảnh<input ref={ref} onChange={imageHandler} hidden name={"image-upload"} id="input" accept="image/*" multiple type="file" /></>}
              variant={"outlined"}
              startIcon={<UploadImage />}
              sx={{border: "1px dashed #1976D2", height: 36}}
              component="label"
          />
        </Box>
      </div>
    </div>
  );
};
export default EditUpload;
