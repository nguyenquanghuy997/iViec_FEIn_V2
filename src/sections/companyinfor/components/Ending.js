import HeaderCard from "../HeaderCard";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Drawer, Box,Divider, List, Typography, Button } from "@mui/material";
import CloseIcon from "@/assets/CloseIcon";
import EditorEnding from "./EditorEnding";


const Ending = () => {
  const [open, setOpen] = useState();
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const PlaceholderStyle = styled("div")(({}) => ({
    background: "white",
    padding: "12px 96px",
    "& .content": {
      backgroundColor: "white",
      color: "#455570",
      background: "#F2F4F5",
      position: "relative",
      padding: "24px 96px",
    },

    "& cite": {
      fontStyle: "italic",
      fontWeight: 500,
      fontSize: 14,
      paddingTop: "10px",
      display: "flex",
      justifyContent: "flex-end",
    },
    "& blockquote:before": {
      content: '" ,, "',
      // fontFamily: themeFont.typography.fontFamily,
      position: "absolute",
      // content: "\f10d";
      top: -100,
      left: "20px",
      fontSize: "128px",
      color: "#A2AAB7",
    },
  }));
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
          Chỉnh sửa Lời kết
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
        <EditorEnding onClose={handleClose}/>
      </div>
    </Box>
  );
  return (
    <>
      <HeaderCard
        text="Lời kết"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
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
      <PlaceholderStyle>
        <div className="content">
          <blockquote>
            Là thành viên thuộc Tập đoàn giáo dục hàng đầu Việt Nam, Atlantic
            Group hiện là một trong những nhà cung cấp dịch vụ giáo dục và du
            học có uy tín và được khách hàng yêu mến tại Việt Nam và Khu vực.
            <br />
            <br />
            Thành lập ngày 31/01/1997, khởi nguồn từ Trung tâm Dịch vụ giáo dục
            do 4 thành viên sáng lập cùng sản phẩm du học đầu tiên của Việt Nam
            mang tên “Trí tuệ Việt Nam – TTVN”, sản phẩm được coi là đặt nền
            móng cho sự phát triển của giáo dục tại Việt Nam. Sau 22 năm hoạt
            động, có hơn 15000 nhân viên chính thức với gần 200 văn phòng giao
            dịch tại 59 tỉnh thành thuộc gần 90 chi nhánh
          </blockquote>
          <cite>
            Tập đoàn Giáo dục và Đào tạo Quốc tế Đại Tây Dương (Atlantic Group)
          </cite>
        </div>
      </PlaceholderStyle>
    </>
  );
};
export default Ending;
