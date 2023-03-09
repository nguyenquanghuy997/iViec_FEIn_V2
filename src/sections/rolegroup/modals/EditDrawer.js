import CloseIcon from "../../../assets/CloseIcon";
import RolegroupForm from "../RolegroupForm";
import { Box, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React from "react";

export default function EditDrawer({ open, onClose, onOpen }) {
  const list = () => (
    <Box
      sx={{ width: 600 }}
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
          Chỉnh sửa vai trò
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
      <RolegroupForm onClose={onClose} />
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
