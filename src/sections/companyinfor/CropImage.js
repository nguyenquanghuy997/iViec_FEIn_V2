import AvatarComponent from "./AvatarComponent";
import {
  useUpdateCompanyInfoMutation,
  useUploadImageCompanyMutation,
} from "./companyInforSlice";
import { cropImage } from "./cropUtils";
import { DOMAIN_SERVER_API } from "@/config";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
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
import {
  RiCloseFill,
  RiUpload2Fill,
  RiImage2Fill,
  RiImageFill,
} from "react-icons/ri";
import ImageUploading from "react-images-uploading";

export default function CropImage({ data, size }) {
  const { data: Data } = useGetCompanyInfoQuery();
  const [image, setImage] = useState(croppedImage ? croppedImage : []);
  const [croppedImage, setCroppedImage] = useState(
    data
      ? `http://103.176.149.158:5001/api/Image/GetImage?imagePath=${data}`
      : null
  );
  const [dialogOpen, setDialogOpen] = useState(false);

  const [uploadImg] = useUploadImageCompanyMutation();
  const [updateImageCompany] = useUpdateCompanyInfoMutation();

  const ImageUploadingButton = ({ value, onChange, maxNumber = 3000 }) => {
    return (
      <ImageUploading
        value={value}
        onChange={onChange}
        maxNumber={maxNumber}
        sx={{ position: "relative" }}
      >
        {({ onImageUpload, onImageUpdate }) =>
          size === "cover" ? (
            <Box
              sx={{
                width: "100%",
                height: "185px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                position: "relative",
                cursor: "pointer",
                "> img": {
                  width: "100%",
                  height: "185px!important",
                  objectFit: "cover",
                  imageRendering: "pixelated",
                },
              }}
              onClick={value ? onImageUpload : () => onImageUpdate(0)}
            >
              {data ? (
                <img
                  src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${data}`}
                  alt="cover"
                />
              ) : (
                <Box sx={{ alignItems: "center" }}>
                  <RiImageFill size={20} color="#8A94A5" />
                </Box>
              )}
            </Box>
          ) : (
            <>
              <AvatarComponent
                sx={{
                  marginTop: "-30px",
                  width: "139.2px",
                  backgroundColor: "#E7E9ED",
                  height: "139.2px",
                  border: "3px solid white",
                  cursor: "pointer",
                  "&:hover .change-img": {
                    opacity: 1,
                  },
                }}
                linkAvatar={
                  data
                    ? `${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${data}`
                    : null
                }
                onClick={value ? onImageUpload : () => onImageUpdate(0)}
              />
            </>
          )
        }
      </ImageUploading>
    );
  };

  const ImageCropper = ({ open, image, containerStyle, ...props }) => {
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
    const uploadImage = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage(URL.createObjectURL(file));
      }
    };

    const onSubmitImage = async () => {
      const { file, url } = await cropImage(image, croppedAreaPixels);
      setCroppedImage(url);
      if (file) {
        try {
          let imageCode = await uploadImg({
            File: file,
            OrganizationId: Data?.organizationInformation.id,
          }).unwrap();
          let requestAvatar = {
            id: Data?.organizationInformation?.id,
            avatar: imageCode,
            coverPhoto: Data?.organizationInformation.coverPhoto,
            provinceId: Data?.organizationInformation.provinceId,
            districtId: Data?.organizationInformation.districtId,
            address: Data?.organizationInformation.address,
            email: Data?.organizationInformation.email,
            description: Data?.organizationInformation.description,
            phoneNumber: Data?.organizationInformation.phoneNumber,
            jobCategoryIds: Data?.organizationInformation.jobCategoryIds?.map(
              (item) => item?.value
            ),
            organizationSize: Data?.organizationInformation.organizationSize,
          };
          let requestCoverPhoto = {
            id: Data?.organizationInformation?.id,
            coverPhoto: imageCode,
            avatar: Data?.organizationInformation.avatar,
            provinceId: Data?.organizationInformation.provinceId,
            districtId: Data?.organizationInformation.districtId,
            address: Data?.organizationInformation.address,
            email: Data?.organizationInformation.email,
            description: Data?.organizationInformation.description,
            phoneNumber: Data?.organizationInformation.phoneNumber,
            jobCategoryIds: Data?.organizationInformation.jobCategoryIds?.map(
              (item) => item?.value
            ),
            organizationSize: Data?.organizationInformation.organizationSize,
          };

          if (imageCode) {
            size === "cover"
              ? await updateImageCompany(requestCoverPhoto).unwrap()
              : await updateImageCompany(requestAvatar).unwrap();
          }
        } catch (error) {
          // console.log("ERROR: ", error);
        }
      }
      setDialogOpen(false);
    };
    return (
      <Dialog
        open={open}
        // maxWidth="sm"
        fullWidth
        sx={{
          "& .MuiPaper-root.MuiPaper-elevation": {
            borderRadius: "6px",
            width: size === "cover" ? "740px" : "540px",
          },
        }}
      >
        <DialogTitle
          sx={{
            mb: 2,
            height: "100%",
            width: "100%",
            "& .MuiBox-root": {
              display: "flex",
              justifyContent: "space-between",
            },
          }}
        >
          <Box>
            {size === "cover" ? (
              <span
                style={{
                  fontSize: "16px",
                  color: "#455570",
                  fontWeight: 600,
                  display: "inline",
                  mr: 2,
                }}
              >
                Thay ảnh bìa
              </span>
            ) : (
              <span
                style={{
                  fontSize: "16px",
                  color: "#455570",
                  fontWeight: 600,
                  display: "inline",
                  mr: 2,
                }}
              >
                Thay ảnh đại diện
              </span>
            )}

            <Box sx={{ display: "inline", ml: 2 }}>
              <Button
                variant="outlined"
                component="label"
                sx={{
                  width: "fit-content",
                  height: "30px",
                  color: "#455570",
                  borderColor: "#455570",
                  fontSize: "12px",
                  cursor: "pointer",
                }}
                startIcon={<RiUpload2Fill />}
              >
                Tải lên
                <input
                  hidden
                  accept="image/*"
                  id="image"
                  type="file"
                  onChange={uploadImage}
                />
              </Button>
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
              <RiCloseFill color="#5C6A82" size={20} />
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
              aspect={size === "cover" ? 9 / 2 : 2 / 2}
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
                <RiImage2Fill size={22} />
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
                <RiImage2Fill size={35} />
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
                  onClick={onSubmitImage}
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

  return (
    <div className="cropImage" style={{}}>
      {croppedImage ? (
        <img
          src={croppedImage}
          alt="blab"
          style={{
            backgroundColor: size === "cover" ? " #E7E9ED" : "transparent",
            width: size === "cover" ? "100%" : "150px",
            height: size === "cover" ? "225px" : "150px",
            borderRadius: size === "cover" ? "none" : "50%",
            marginTop: size === "cover" ? 0 : "-30px",
            border: size === "cover" ? "0" : "3px solid white",
            objectFit: "cover",
            cursor: "pointer",
          }}
          onClick={() => setDialogOpen(true)}
        />
      ) : (
        <ImageUploadingButton
          value={image}
          onChange={(newImage) => {
            setDialogOpen(true);
            if (newImage) {
              setImage(newImage);
            }
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
          minHeight: 300,
        }}
      />
    </div>
  );
}
