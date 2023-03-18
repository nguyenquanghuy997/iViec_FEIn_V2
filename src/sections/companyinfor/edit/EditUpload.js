
import UploadImage from "@/assets/UploadImage";
import Image from "@/components/Image";
import { Box, Typography,Button } from "@mui/material";
import React from "react";

const EditUpload = ({ style, type, ref,imageHandler ,image}) => {
  return (
    <div className="page">
      <div className="container">
        <Box
          sx={{
            display: type === "avatar" ? "flex" : "block",
            alignItems: type === "avatar" ? "center" : "-moz-initial",
          }}
        >
          <Image
            disabledEffect
            visibleByDefault
            src={image}
            alt="image"
            sx={{
              ...style,
            }}
          />

          <Button
            sx={{
              textTransform: "none",
              border: "1px dashed #1976D2",
              height: 36,
              px: 2,
              cursor: "pointer",
            }}
          >
            <UploadImage />
            <Typography sx={{ ml: 1, fontSize: 14 }}>Tải lên ảnh</Typography>
          </Button>
          <input
            type="file"
            accept="image/*"
            name="image-upload"
            id="input"
            ref={ref}
            onChange={imageHandler}
            style={{
              height: "36px",
              transform: "translateX(-120px)",
              opacity: 0,
              cursor: "pointer",
            }}
          />
        </Box>
      </div>
    </div>
  );
};
export default EditUpload;
