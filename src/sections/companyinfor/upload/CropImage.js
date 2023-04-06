import {useState, memo, useEffect} from "react";
import {Box} from "@mui/material";
import {DOMAIN_SERVER_API} from "@/config";
import {RiImageFill} from "react-icons/ri";
import ImageCropper from "@/sections/companyinfor/upload/ImageCropper";

const CropImage = ({ defaultImage, size, companyInfor }) => {
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [croppedImage, setCroppedImage] = useState(null);
  const [image, setImage] = useState(null);

  const handleCloseModal = () => {
    setDialogOpen(false);
    setImage(null);
    // setCroppedImage(null);
  }

  useEffect(() => {
    setImage(`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${defaultImage}`)
  }, [defaultImage])

  return (
      <>
        {size === "cover" ? (
              <Box className={"box-image"}
                   sx={{
                     width: "100%", height: "185px",
                     display: "flex", justifyContent: "center", alignItems: "center",
                     position: "relative", cursor: "pointer",
                     backgroundColor: '#E7E9ED',
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
                      <RiImageFill size={24} color="#8A94A5"/>
                    </Box>
                )}
              </Box>
          ) : (
              <img
                  className={"avatar-image"}
                  src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${defaultImage}`}
                  onClick={() => setDialogOpen(true)}
              />
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