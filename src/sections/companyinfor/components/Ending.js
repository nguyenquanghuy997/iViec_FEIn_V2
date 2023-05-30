import HeaderCard from "../HeaderCard";
import { useUpdateCompanyEndingMutation } from "../companyInforSlice";
import EditorEnding from "../edit/EditorEnding";
import LoadingScreen from "@/components/LoadingScreen";
import { drawerPaperStyle } from "@/components/drawer-edit-form/styles";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import { QuoteIcon } from "@/sections/companyinfor/icon";
import { Box, Drawer, Typography, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useSnackbar } from "notistack";
import { useState } from "react";

const PlaceholderStyle = styled("div")(({ theme }) => ({
  background: "white",
  padding: "8px 96px 24px 96px",
  minHeight: 150,
  position: "relative",
  "& .content": {
    backgroundColor: "white",
    color: theme.palette.common.neutral700,
    background: theme.palette.common.bgrMaster,
    position: "relative",
    padding: "24px 96px",
    "& .quote-icon": {
      position: "absolute",
      top: -100,
      left: "40px",
      fontSize: "128px",
      color: theme.palette.common.neutral400,
    },
  },
}));

const Ending = ({ data }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [checked, setChecked] = useState(data?.isConclusionVisible);
  const [loading, setLoading] = useState(false);
  const [updateVisibleHuman] = useUpdateCompanyEndingMutation();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeChecked = async () => {
    try {
      await updateVisibleHuman({
        organizationId: data?.id,
        isConclusionVisible: !checked,
      }).unwrap();
      enqueueSnackbar("Chỉnh sửa hiển thị thành công!", {
        autoHideDuration: 1000,
      });
      setChecked(!checked);
      setLoading(false);
    } catch (e) {
      enqueueSnackbar(
        "Chỉnh sửa hiển thị không thành công, vui lòng thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      setLoading(false);
      return e;
    }
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <>
      <Box sx={{ minHeight: "296px" }}>
        <HeaderCard
          text="Lời kết"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          handleChange={handleChangeChecked}
          checked={checked}
        />
        {data?.conclusion ? (
          <PlaceholderStyle
            style={{
              borderBottomLeftRadius: "4px",
              borderBottomRightRadius: "4px",
            }}
          >
            <div className="content" style={{ borderRadius: "4px" }}>
              <div className={"quote-icon"}>
                <QuoteIcon />
              </div>
              <Typography
                sx={{
                  fontSize: 14,
                  fontWeight: 400,
                  color: theme.palette.common.neutral700,
                }}
                dangerouslySetInnerHTML={{ __html: data?.conclusion }}
              />
              <Typography
                sx={{
                  textAlign: "end",
                  fontSize: 14,
                  fontWeight: 500,
                  color: theme.palette.common.neutral700,
                  fontStyle: "italic",
                }}
              >
                {data?.name}
              </Typography>
            </div>
          </PlaceholderStyle>
        ) : (
          <EmptyValue text={"Hiện chưa có nội dung Lời kết"} />
        )}
      </Box>
      <Drawer
        anchor="right"
        open={open}
        onClose={handleClose}
        PaperProps={{
          sx: drawerPaperStyle({ ...theme, width: 800 }),
        }}
        componentsProps={{
          backdrop: {
            sx: {
              background: "rgba(9, 30, 66, 0.25) !important",
              boxShadow: "none !important",
            },
          },
        }}
      >
        <EditorEnding data={data} onClose={handleClose} />
      </Drawer>
    </>
  );
};
export default Ending;
