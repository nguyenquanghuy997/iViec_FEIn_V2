import { DOMAIN_SERVER_API } from "@/config";
import { cropImage } from "@/sections/companyinfor/cropUtils";
import { Box, Button, Dialog, DialogContent, DialogTitle, Slider, Stack, } from "@mui/material";
import CloseIcon from "public/assets/icons/candidate/CloseIcon";
import UploadIcon from "public/assets/icons/company/UploadIcon";
import { useEffect, useState } from "react";
import Cropper from "react-easy-crop";
import { Controller, useFormContext } from "react-hook-form";
import ImageUploading from "react-images-uploading";
import { useUploadImageOfferMutation } from "@/sections/offer-form/OfferFormSlice";
import {useTheme} from "@mui/material/styles";

export default function CropImage({logo, handleSubmit }) {
  const [image, setImage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [croppedImage, setCroppedImage] = useState(null);
  const { control } = useFormContext();
  const [uploadImage] = useUploadImageOfferMutation();
  const  theme = useTheme();
  const onSubmitImage = async () => {
    try {
      const file = new FormData();
      file.append("Files", new File([croppedImage.file], image[0].file.name));
      const res = await uploadImage(file).unwrap();
      handleSubmit?.(res);
    } catch (error) {
      //
    }
  };

  useEffect(() => {
    if (!croppedImage) return;
    onSubmitImage();
  }, [croppedImage]);

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
                color: theme.palette.common.neutral700,
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
                  color: theme.palette.common.neutral700,
                  borderColor: theme.palette.common.neutral700,
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                startIcon={<UploadIcon />}
              >
                Tải lên
              </Button>
              <Controller
                name="avatar"
                control={control}
                render={() => (
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
                {/* <SmallIcon /> */}
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
                    color: theme.palette.common.neutral100,
                    height: 5,
                    "& .MuiSlider-thumb": {
                      height: 20,
                      width: 20,
                      backgroundColor: theme.palette.common.neutral700,
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
                {/* <ResizeIcon /> */}
              </Stack>
              <div>
                <Button
                  variant="text"
                  sx={{ color: theme.palette.common.neutral700 }}
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
                    backgroundColor: theme.palette.common.blue700,
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

  return (
    <div className="cropImage">
      {croppedImage?.url ? (
        <img
          alt=""
          src={croppedImage.url}
          style={{
            width: 140,
            height: 140,
            maxWidth: 140,
            borderRadius: 0,
            cursor: "pointer",
          }}
          onClick={() => setDialogOpen(true)}
        />
      ) : (
        <ImageUploading
          onChange={(newImage) => {
            setDialogOpen(true);
            setImage(newImage);
          }}
        >
          {({ onImageUpload }) => {
            return (
              <img
                alt=""
                src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${logo}`}
                style={{
                  width: 140,
                  height: 140,
                  maxWidth: 140,
                  borderRadius: 0,
                  cursor: "pointer",
                }}
                onClick={onImageUpload}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null; // prevents looping
                  currentTarget.src = "/assets/ImageDefaultAdd.svg";
                }}
              />
            );
          }}
        </ImageUploading>
      )}
      <ImageCropper
        open={dialogOpen}
        image={(image.length > 0 && image[0].dataURL) || image}
        onComplete={(imagePromise) => {
          imagePromise.then((image) => {
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
    </div>
  );
}
