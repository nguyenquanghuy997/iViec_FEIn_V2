import {useState, memo, useEffect} from "react";
import {Box} from "@mui/material";
import {DOMAIN_SERVER_API} from "@/config";
import {RiImageFill} from "react-icons/ri";
import ImageCropper from "@/sections/companyinfor/upload/ImageCropper";
import {useTheme} from "@mui/material/styles";

const CropImage = ({ defaultImage, size, companyInfor }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const theme = useTheme();
  // const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);
  const handleCloseModal = () => {
    setDialogOpen(false);
    // setImage(null);
    // setCroppedImage(null);
  }

  useEffect(() => {
    setImage(`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${defaultImage}`)
  }, [defaultImage, dialogOpen])

  return (
      <>
        {size === "cover" && (
              <Box className={"box-image"}
                   sx={{
                     width: "100%", height: "185px",
                     display: "flex", justifyContent: "center", alignItems: "center",
                     position: "relative", cursor: "pointer",
                     backgroundColor: theme.palette.common.neutral100,
                     "> img": {
                       width: "100%",
                       height: "185px",
                       objectFit: "cover",
                       imageRendering: "pixelated",
                     },
                   }}
                   onClick={() => setDialogOpen(true)}
              >
                {defaultImage ? <img src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${defaultImage}`} alt="cover"/> : (
                    <Box sx={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                      <RiImageFill size={24} color={theme.palette.common.neutral500}/>
                    </Box>
                )}
              </Box>
          )}
        {
          size === 'avatar' && (
              <Box onClick={() => setDialogOpen(true)}>
                {defaultImage ? <img
                    className={"avatar-image"}
                    src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${defaultImage}`}
                /> : (
                    <Box onClick={() => setDialogOpen(true)} className={"avatar-image"} sx={{display: 'flex', alignItems: "center", justifyContent: 'center'}}>
                      <RiImageFill size={24} color={theme.palette.common.neutral500}/>
                    </Box>
                )}
              </Box>

            )
        }
        {
          dialogOpen && (
              <ImageCropper
                  open={dialogOpen}
                  image={image}
                  setImage={setImage}
                  companyInfor={companyInfor}
                  size={size}
                  // setCroppedImage={setCroppedImage}
                  onClose={handleCloseModal}
                  onComplete={(imagePromise) => {
                    imagePromise.then((image) => {
                      setImage(image);
                      // setCroppedImage(image);
                      setDialogOpen(false);
                    });
                  }}
                  containerStyle={{
                    position: "relative",
                    width: "100%",
                    minHeight: 300,
                  }}
                />
            )
        }
      </>
  )
};

export default memo(CropImage);