import { useUpdateCompanyInfoMutation } from "@/sections/companyinfor/companyInforSlice";
import { cropImage } from "@/sections/companyinfor/cropUtils";
import { DOMAIN_SERVER_API } from "@/config";
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
import {Controller, useFormContext} from "react-hook-form";
import UploadIcon from "@/assets/UploadIcon";
import CloseIcon from "@/assets/CloseIcon";
import SmallIcon from "@/assets/SmallIcon";
import ResizeIcon from "@/assets/ResizeIcon";

export default function CropImage({ data, handleSubmit }) {
  const [image, setImage] = useState("");
  const [croppedImage, setCroppedImage] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [uploadImage] = useUpdateCompanyInfoMutation();
  const onSubmitImage = async () => {
    const formData = new FormData();
    try {
      formData.append("avatar", croppedImage);
      await uploadImage({ formData }).unwrap();
    } catch (error) {
      throw error;
    }
  };

  const ImageUploadingButton = ({ value, onChange, ...props }) => {
    return (
        <ImageUploading value={value} onChange={onChange}>
          {({ onImageUpload, onImageUpdate }) => (
              <img
                  src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${data}` || value}
                  onClick={value ? onImageUpload : () => onImageUpdate(0)}
                  {...props}
                  style={{
                    cursor: "pointer",
                    width: 140,
                    height: 140,
                    borderRadius: 0,
                    border: "1px solid #000",
                    maxWidth: 140,
                  }}
              />
          )}
        </ImageUploading>
    );
  };

  const ImageCropper = ({open, image, onComplete, containerStyle, ...props}) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const uploadImage = (e) => {
      setImage(URL.createObjectURL(e.target.files[0]));
    };
    return (
        <Dialog
            open={open}
            // maxWidth="sm"
            fullWidth
            sx={{
              "& .MuiPaper-root.MuiPaper-elevation": {
                borderRadius: "6px",
                width: "540px",
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
                <Controller
                    name='avatar'
                    control={control}
                    render={( ) => (
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
                          <label
                              for="avatar"
                              style={{ flex: 1, cursor: "pointer" }}
                          />
                          <input
                              type="file"
                              id="avatar"
                              accept="image/*"
                              style={{ display: "none", userSelect: "none" }}
                              onChange={uploadImage}
                          />
                        </div>
                    )}
                />
              </Box>
              <Button
                  onClick={() => setDialogOpen(false)}
                  sx={{
                    justifyContent: "end",
                    "&:hover": {
                      backgroundColor: "white",
                    },
                    "& svg": {
                      transform: "translateX(190px)",
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
                  aspect={2 / 2}
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
                      onClick={() => {
                        onComplete(cropImage(image, croppedAreaPixels));
                      }}
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
  const { control } = useFormContext();
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
                handleSubmit(onSubmitImage(setCroppedImage(image)));
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
                  width: 120,
                  height: 120,
                  borderRadius: 120,
                  border: "3px solid #fff",
                  maxWidth: 120,
                  cursor: "pointer",
                }}
                onClick={() => setDialogOpen(true)}
            />
        )}
      </div>
  );
}
