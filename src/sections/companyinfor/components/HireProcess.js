import HeaderCard from "../HeaderCard";
import { useGetCompanyInfoQuery } from "../companyInforSlice";
import EditHirePipeline from "./EditHirePipeline";
import CloseIcon from "@/assets/CloseIcon";
import IconRole1 from "@/assets/IconRole1";
import NoInformation from "@/assets/NoInformation";
import { PipelineStateType } from "@/utils/enum";
import { Box, List, Drawer, Typography, Button, Divider } from "@mui/material";
import { useState } from "react";

const HireProcess = () => {
  const { data: Data } = useGetCompanyInfoQuery();
  const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const list = () => (
    <Box
      sx={{ width: 700 }}
      role="presentation"
      // onKeyDown={toggleDrawer(false)}
    >
      <List
        sx={{
          display: "flex",
          justifyContent: "space-between",
          p: 0,
        }}
      >
        <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
          Chỉnh sửa Quy trình tuyển dụng
        </Typography>
        <Button
          onClick={handleClose}
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          <CloseIcon />
        </Button>
      </List>
      <Divider />
      <div>
        <EditHirePipeline data={Data} onClose={handleClose} />
      </div>
    </Box>
  );
  return (
    <>
      <HeaderCard
        text="Quy trình tuyển dụng"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        name='isProfilePipelineVisible'
      />
      {open && (
        <Drawer
          anchor="right"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
        >
          {list("right")}
        </Drawer>
      )}
      {Data ? (
        <Box sx={{ background: "white", py: 2, display: "flex", px: 5 }}>
          {Data?.organizationProfilePipelines.map((item, index) => (
            <Box sx={{ minWidth: "200px" }}>
              <div style={{ display: "flex", justifyContent: "center" }}>
                {<IconRole1 />}
              </div>
              <Typography
                sx={{
                  fontSize: 28,
                  color: "#F77A0C",
                  display: "flex",
                  justifyContent: "center",
                }}
                color="text.secondary"
                gutterBottom
              >
                {index + 1}
              </Typography>
              <Typography
                sx={{
                  mb: 1.5,
                  fontSize: 16,
                  fontWeight: 600,
                  display: "flex",
                  justifyContent: "center",
                }}
                color="#172B4D"
              >
                {PipelineStateType(item?.type)}
              </Typography>

              <Typography
                variant="body2"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                {item?.description}
              </Typography>
            </Box>
          ))}
        </Box>
      ) : (
        <Box sx={{ bgcolor: "white" }}>
          {" "}
          <Box sx={{ display: "flex", justifyContent: "center", pt: 4 }}>
            <NoInformation />
          </Box>
          <Typography sx={{ textAlign: "center", pb: 6 }}>
            Hiện chưa có nội dung
          </Typography>
        </Box>
      )}
    </>
  );
};
export default HireProcess;
