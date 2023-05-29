import UploadImage from "@/assets/UploadImage";
import MuiButton from "@/components/BaseComponents/MuiButton";
import Image from "@/components/Image";
import { Box } from "@mui/material";
import { forwardRef } from "react";
import { RiImageFill } from "react-icons/ri";

const EditUpload = forwardRef(
  ({ title = "Tải lên ảnh", style, type, imageHandler, image, btnSx }, ref) => {
    const btnPropsStyle = {
      border: "1px dashed #1976D2",
      height: 36,
      fontWeight: 600,
      ...btnSx,
    };

    return (
      <div className="page">
        <div className="container">
          <Box
            sx={{
              display: "flex",
              flexDirection: type === "avatar" ? "row" : "column",
              alignItems: type === "avatar" ? "center" : "flex-start",
            }}
          >
            {image ? (
              <Image
                disabledEffect
                visibleByDefault
                src={image}
                alt="image"
                sx={{ ...style }}
              />
            ) : (
              <Box
                sx={{
                  height: "220px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  ...style,
                }}
              >
                <RiImageFill color={"#8A94A5"} size={"1.25em"} />
              </Box>
            )}
            <MuiButton
              title={
                <>
                  {title}
                  <input
                    onChange={imageHandler}
                    hidden
                    name={"image-upload"}
                    id="input"
                    accept="image/*"
                    multiple
                    type="file"
                  />
                </>
              }
              ref={ref}
              variant={"outlined"}
              startIcon={<UploadImage />}
              sx={{ ...btnPropsStyle }}
              component="label"
            />
          </Box>
        </div>
      </div>
    );
  }
);

export default EditUpload;
