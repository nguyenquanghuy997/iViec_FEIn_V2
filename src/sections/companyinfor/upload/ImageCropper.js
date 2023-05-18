import {memo, useState} from "react";
import {get} from "lodash";
import {cropImage} from "@/sections/companyinfor/cropUtils";
import {Box, Dialog, DialogContent, DialogTitle, IconButton, Slider, Stack, Typography} from "@mui/material";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {RiCloseFill, RiImage2Fill, RiUpload2Fill} from "react-icons/ri";
import Cropper from "react-easy-crop";
import {useUpdateCompanyInfoMutation, useUploadImageCompanyMutation} from "@/sections/companyinfor/companyInforSlice";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {useTheme} from "@mui/material/styles";

const renderTitle = (title) => {
  return (
      <Typography sx={{
        fontSize: style.FONT_BASE,
        color: style.COLOR_TEXT_PRIMARY,
        fontWeight: style.FONT_SEMI_BOLD,
        display: "inline",
        mr: 2,
      }}>
        {title}
      </Typography>
  )
}
const ImageCropper = (
    {
      open,
      size,
      containerStyle,
      companyInfor,
      onClose,
      image,
      setImage,
      ...props
    }) => {
  const [crop, setCrop] = useState({x: 0, y: 0});
  const [zoom, setZoom] = useState(1);

  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const theme = useTheme();
  const [uploadImg] = useUploadImageCompanyMutation();
  const [updateImageCompany] = useUpdateCompanyInfoMutation();
  const uploadImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const onSubmitImage = async () => {
    const {file, url} = await cropImage(image, croppedAreaPixels);
    setImage(url);
    if (size === 'cover') {
      try {
        let imageCode = await uploadImg({
          File: file,
          OrganizationId: get(companyInfor, 'organizationInformation.id')
        }).unwrap();
        let requestCoverPhoto = {
          id: get(companyInfor, 'organizationInformation.id'),
          coverPhoto: imageCode,
        };
        await updateImageCompany(requestCoverPhoto).unwrap();
        onClose();
      } catch (e) {
        throw e;
      }
    } else {
      try {
        let imageCode = await uploadImg({
          File: file,
          OrganizationId: get(companyInfor, 'organizationInformation.id')
        }).unwrap();
        let requestAvatar = {
          id: get(companyInfor, 'organizationInformation.id'),
          avatar: imageCode,
        };
        await updateImageCompany(requestAvatar).unwrap();
        onClose();
      } catch (e) {
        throw e;
      }
    }
  };

  return (
      <Dialog open={open} fullWidth sx={{"& .MuiPaper-root.MuiPaper-elevation": {borderRadius: "6px", width: '100%'}}}>
        <DialogTitle sx={{mb: 2, minHeight: '68px'}}>
          <Box sx={{display: "flex", alignItems: 'center', justifyContent: 'space-between'}}>
            <Box sx={{display: "flex", alignItems: 'center'}}>
              {size === "cover" ? renderTitle('Thay ảnh bìa') : renderTitle('Thay ảnh đại diện')}
              <MuiButton
                  title={<>Tải lên<input hidden accept="image/*" type="file" onChange={uploadImage}/></>}
                  onChange={uploadImage}
                  variant={"outlined"}
                  startIcon={<RiUpload2Fill/>}
                  sx={{border: "1px solid " + theme.palette.common.neutral700, height: 30, maxWidth: 120, color: theme.palette.common.neutral700, fontWeight: 600}}
                  component="label"
              />
            </Box>
            <IconButton edge={"end"} onClick={onClose}>
              <RiCloseFill color={theme.palette.common.borderObject} size={24}/>
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent sx={{padding: 0}}>
          <div style={containerStyle}>
            <Cropper
                image={image}
                crop={crop}
                zoom={zoom}
                aspect={size === "cover" ? 9 / 3 : 2 / 2}
                onCropChange={setCrop}
                onCropComplete={(_, croppedAreaPixels) => {
                  setCroppedAreaPixels(croppedAreaPixels);
                }}
                onZoomChange={setZoom}
                {...props}
            />
          </div>
          <div className="controls" style={{width: "100%"}}>
            <Box sx={{p: 3, display: "flex", justifyContent: "space-between"}}>
              <Stack spacing={2} direction="row" sx={{maxWidth: "208px", width: '100%'}} alignItems="center">
                <RiImage2Fill size={22}/>
                <Slider
                    aria-label="Default"
                    valueLabelDisplay="auto"
                    value={zoom}
                    min={1}
                    max={100}
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
                <RiImage2Fill size={35}/>
              </Stack>
              <Box sx={{display: 'flex'}}>
                <MuiButton
                    title={"Hủy"}
                    color={"basic"}
                    onClick={onClose}
                    sx={{height: 36}}
                />
                <MuiButton
                    title={"Lưu"}
                    onClick={onSubmitImage}
                    sx={{height: 36}}
                />
              </Box>
            </Box>
          </div>
        </DialogContent>
      </Dialog>
  );
};

export default memo(ImageCropper);