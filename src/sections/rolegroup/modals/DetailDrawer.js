import CloseIcon from "../../../assets/CloseIcon";
import { Box, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React from "react";

export default function DetailDrawer({ open, onClose, onOpen }) {
  const list = () => (
    <Box
      sx={{ width: "600px" }}
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
          Xem chi tiết vai trò
        </Typography>
        <Button
          onClick={onClose}
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
      <Typography variant="h4" sx={{ px: 3, pt: 3 }}>
        Nhân viên tuyển dụng
      </Typography>
      <div style={{ padding: "24px" }}>
        <span
          style={{
            fontSize: 14,
            fontWeight: 400,
            margin: "24px 16px 0 0",
            color: "#5C6A82",
            width: "160px",
          }}
        >
          Mô tả
        </span>

        <span
          style={{
            fontSize: 14,
            fontWeight: 500,
            color: "#172B4D",
           
          }}
        >
          Lorem ipsum dolor sit amet consectetur. Sed ut enim vitae non eget
          sociis congue. Orci tristique leo tempus velit tincidunt. Sit cum
          molestie aenean ante. Condimentum lorem
        </span>
        <Divider />
      </div>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="right" open={open} onClose={onClose} onOpen={onOpen}>
        {list("right")}
      </Drawer>
    </div>
  );
}
