import FormCompanyInfor from "./FormCompanyInfor";
import { Box, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React, { useState } from "react";
import { RiCloseFill } from "react-icons/ri";

export default function DrawerEdit({ dataForm }) {
  const [open, setOpen] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };
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
          Chỉnh sửa Thông tin công ty
        </Typography>
        <Button
          onClick={toggleDrawer(false)}
          sx={{
            "&:hover": {
              background: "white",
            },
          }}
        >
          <RiCloseFill color="#455570" size={16} />
        </Button>
      </List>
      <Divider />
      <List sx={{ p: 0 }}>
        <FormCompanyInfor data={dataForm} onClose={toggleDrawer(false)} />
      </List>
    </Box>
  );

  const renderButton = () => {
    return (
      <Button
        style={{
          marginTop: "40px",
          padding: "8px 12px 8px 14px",
          borderRadius: 4,
          background: "#F3F4F6",
          textTransform: "none",
          color: "#455570",
        }}
        onClick={toggleDrawer(true)}
      >
        <span
          style={{
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 20 / 15,
            marginLeft: 6,
            color: "#455570",
          }}
        >
          Chỉnh sửa
        </span>
      </Button>
    );
  };

  return (
    <div>
      {renderButton()}
      <Drawer
        anchor="right"
        open={open}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
