// @mui
// components
import Iconify from "@/components/Iconify";
import Image from "@/components/Image";
import { varFade } from "@/components/animate";
import { fData } from "@/utils/formatNumber";
import getFileData from "@/utils/getFileData";
import {
  IconButton,
  List,
  ListItem,
  ListItemText,

} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { AnimatePresence, m } from "framer-motion";
import PropTypes from "prop-types";
// import { useDropzone } from "react-dropzone";

// const DropZoneStyle = styled("div")(({ theme }) => ({
//   outline: "none",
//   padding: theme.spacing(5, 1),
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: theme.palette.background.neutral,
//   border: `1px dashed ${theme.palette.grey[500_32]}`,
//   justifyContent: "center",
//   alignItems: "center",
//   width: "80px",
//   height: "80px",
//   "&:hover": { opacity: 0.72, cursor: "pointer" },
// }));

MultiFilePreviewCustom.propTypes = {
  files: PropTypes.array.isRequired,
  onRemove: PropTypes.func,
  showPreview: PropTypes.bool,
};

export default function MultiFilePreviewCustom({
  showPreview = false,
  files,
  onRemove,
}) {
  const hasFile = files?.length > 0;
  // const { getRootProps } = useDropzone();

  return (
    <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
      <AnimatePresence>
        {[1, 2, 3, 4, 5, 6]?.map((file, index) => {
          const { key, name, size, path } = getFileData(file, index);

          if (showPreview) {
            return (
              <ListItem
                key={key}
                component={m.div}
                {...varFade().inRight}
                sx={{
                  p: 0,
                  m: 0.5,
                  width: 80,
                  height: 80,
                  borderRadius: 1.25,
                  overflow: "hidden",
                  position: "relative",
                  display: "inline-flex",
                  border: (theme) => `solid 1px ${theme.palette.divider}`,
                }}
              >
                <Image alt="preview" src={path} ratio="1/1" />

                {onRemove && (
                  <IconButton
                    size="small"
                    onClick={() => onRemove(file)}
                    sx={{
                      top: 6,
                      p: "2px",
                      right: 6,
                      position: "absolute",
                      color: "common.white",
                      bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                      "&:hover": {
                        bgcolor: (theme) =>
                          alpha(theme.palette.grey[900], 0.48),
                      },
                    }}
                  >
                    <Iconify icon={"eva:close-fill"} />
                  </IconButton>
                )}
              </ListItem>
            );
          }

          return (
            <ListItem
              key={key}
              component={m.div}
              {...varFade().inRight}
              sx={{
                my: 1,
                px: 2,
                py: 0.75,
                borderRadius: 0.75,
                border: (theme) => `solid 1px ${theme.palette.divider}`,
              }}
            >
              <Iconify
                icon={"eva:file-fill"}
                sx={{ width: 28, height: 28, color: "text.secondary", mr: 2 }}
              />

              <ListItemText
                primary={typeof file === "string" ? file : name}
                secondary={typeof file === "string" ? "" : fData(size || 0)}
                primaryTypographyProps={{ variant: "subtitle2" }}
                secondaryTypographyProps={{ variant: "caption" }}
              />

              {onRemove && (
                <IconButton
                  edge="end"
                  size="small"
                  onClick={() => onRemove(file)}
                >
                  <Iconify icon={"eva:close-fill"} />
                </IconButton>
              )}
            </ListItem>
          );
        })}
        <ListItem
          key="uploadImagesQuestion"
          component={m.div}
          {...varFade().inRight}
          sx={{
            p: 0,
            m: 0.5,
            width: 80,
            height: 80,
            borderRadius: 1.25,
            overflow: "hidden",
            position: "relative",
            display: "inline-flex",
            border: (theme) => `solid 1px ${theme.palette.divider}`,
          }}
        >
          {/* <DropZoneStyle {...props}>
            <Iconify icon={"eva:close-fill"} />
          </DropZoneStyle> */}
          <Image
            alt="preview"
            src={"/assets/images/upload.png"}
            ratio="1/1"
            resizeMode="contain"
            sx={{
              height: "16px",
              width: "16px",
            }}
          />

          {/* <Typography ml={2}>Tải lên hình ảnh hoặc video</Typography> */}

          {/* <ListItemText
          primary={typeof file === "string" ? file : name}
          secondary={typeof file === "string" ? "" : fData(size || 0)}
          primaryTypographyProps={{ variant: "subtitle2" }}
          secondaryTypographyProps={{ variant: "caption" }}
        /> */}

          {/* {onRemove && (
          <IconButton edge="end" size="small" onClick={() => onRemove(file)}>
            <Iconify icon={"eva:close-fill"} />
          </IconButton>
        )} */}
        </ListItem>
      </AnimatePresence>
    </List>
  );
}
