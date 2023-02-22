import CloseIcon from "../../../public/assets/icons/company/CloseIcon";
import ResizeIcon from "../../../public/assets/icons/company/ResizeIcon";
import SmallIcon from "../../../public/assets/icons/company/SmallIcon";
import UploadIcon from "../../../public/assets/icons/company/UploadIcon";
import { cropImage } from "./cropUtils";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  Box,
  Slider,
  Stack,
} from "@mui/material";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import ImageUploading from "react-images-uploading";

export default function CropImageBG() {
  const [image, setImage] = useState([]);
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const ImageCropper = ({
    open,
    image,
    onComplete,
    containerStyle,
    ...props
  }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const uploadImage = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
      <Dialog
        open={open}
        // maxWidth="md"
        fullWidth
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            borderRadius: "6px",
            width: "760px",
          },
        }}
      >
        <DialogTitle
          sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <span
              style={{
                fontSize: 16,
                color: "#455570",
                fontWeight: 600,
                display: "inline",
                mr: 2,
              }}
            >
              Thay ảnh đại diện
            </span>

            <Box sx={{ display: "inline", ml: 2 }}>
              <Button
                variant="outlined"
                sx={{
                  width: "fit-content",
                  height: "30px",
                  color: "#455570",
                  borderColor: "#455570",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                startIcon={<UploadIcon />}
              >
                Tải lên
              </Button>

              <div
                style={{
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  position: "absolute",
                }}
              >
                <label for="avatar" style={{ flex: 1, cursor: "pointer" }} />
                <input
                  type="file"
                  id="avatar"
                  accept="image/*"
                  style={{ display: "none", userSelect: "none" }}
                  onChange={uploadImage}
                />
              </div>
            </Box>
            <Button
              onClick={() => setDialogOpen(false)}
              sx={{
                justifyContent: "end",
                "&:hover": {
                  backgroundColor: "white",
                },
                "& svg": {
                  transform: "translateX(255px)",
                },
              }}
            >
              <CloseIcon />
            </Button>
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            padding: "0!important",
          }}
        >
          <div style={containerStyle}>
            <Cropper
              image={image}
              crop={crop}
              zoom={zoom}
              aspect={9 / 2}
              onCropChange={setCrop}
              onCropComplete={(_, croppedAreaPixels) => {
                setCroppedAreaPixels(croppedAreaPixels);
              }}
              onZoomChange={setZoom}
              {...props}
            />
          </div>
          <div className="controls" style={{ width: "100%" }}>
            <Box
              sx={{ p: 3, display: "flex", justifyContent: "space-between" }}
            >
              <Stack
                spacing={2}
                direction="row"
                sx={{ mb: 1, width: "210px" }}
                alignItems="center"
              >
                <SmallIcon />
                <Slider
                  aria-label="Default"
                  valueLabelDisplay="auto"
                  value={zoom}
                  min={1}
                  max={100}
                  // aria-labelledby="Zoom"
                  onChange={(e) => {
                    setZoom(e.target.value);
                  }}
                  className="zoom-range"
                  sx={{
                    color: "#E7E9ED",
                    height: 5,
                    "& .MuiSlider-thumb": {
                      height: 20,
                      width: 20,
                      backgroundColor: "#455570",
                      border: "4px solid white",
                      "&:focus, &:hover, &.Mui-active, &.Mui-focusVisible": {
                        boxShadow: "none",
                      },
                      "&:before": {
                        display: "none",
                      },
                    },
                  }}
                />
                <ResizeIcon />
              </Stack>
              <div>
                <Button
                  variant="text"
                  sx={{ color: "#455570" }}
                  onClick={() => setDialogOpen(false)}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  onClick={() =>
                    onComplete(cropImage(image, croppedAreaPixels))
                  }
                  sx={{
                    backgroundColor: "#1976D2",
                  }}
                >
                  Lưu
                </Button>
              </div>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  const ImageUploadingButton = ({ value, onChange, ...props }) => {
    return (
      <ImageUploading value={value} onChange={onChange}>
        {({ onImageUpload, onImageUpdate }) => (
          <Button
            color="primary"
            onClick={value ? onImageUpload : () => onImageUpdate(0)}
            {...props}
            sx={{
              cursor: "pointer",
              height: 250,
              width: "100%",
            }}
          >
            Upload
          </Button>
        )}
      </ImageUploading>
    );
  };

  return (
    <div className="cropImage">
      {croppedImage ? (
        ""
      ) : (
        <ImageUploadingButton
          value={image}
          onChange={(newImage) => {
            setDialogOpen(true);
            setImage(newImage);
          }}
        />
      )}
      <ImageCropper
        open={dialogOpen}
        image={(image.length > 0 && image[0].dataURL) || image}
        onComplete={(imagePromisse) => {
          imagePromisse.then((image) => {
            setCroppedImage(image);
            setDialogOpen(false);
          });
        }}
        containerStyle={{
          position: "relative",
          //   width: "100%",
          height: 300,
        }}
      />
      {croppedImage && (
        <img
          src={croppedImage}
          alt="blab"
          style={{
            height: 250,
            width: "100%",
            cursor: "pointer",
          }}
          onClick={() => setDialogOpen(true)}
        />
      )}
    </div>
  );
}
