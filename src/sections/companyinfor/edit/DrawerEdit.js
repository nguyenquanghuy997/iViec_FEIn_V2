import FormCompanyInfor from "./FormCompanyInfor";
import SvgIcon from "@/components/SvgIcon";
import { Box, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React, { useState } from "react";
import CloseIcon from "../../../assets/CloseIcon";

export default function DrawerEdit({dataForm}) {
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
      <List sx={{
        display:'flex',
        justifyContent:'space-between',
        p:0
      }}>
        <Typography sx={{ p: "22px 24px", fontSize: 16, fontWeight: 600 }}>
          Chỉnh sửa thông tin công ty
        </Typography>
        <Button onClick={toggleDrawer(false)} sx={{
          '&:hover':{
            background:'white'
          }
        }}><CloseIcon /></Button>

      </List>
      <Divider />
      <List sx={{ p:0}}>
        <FormCompanyInfor data={dataForm}/>
      </List>
    </Box>
  );

  const renderButton = () => {
    return (
      <Button
        style={{
          padding: "8px 12px 8px 14px",
          borderRadius: 4,
          marginTop: 36,
          display: "flex",
          alignItems: "center",
          flexDirection: "row",
          background: "#F3F4F6",
          textDecoration: "none",
          alignSelf: "flex-end",
          color: "#455570",
        }}
        onClick={toggleDrawer(true)}
      >
        <SvgIcon>
          {`
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.162 12.6667H14V14H2V11.1713L8.6 4.57133L11.428 7.40067L6.16133 12.6667H6.162ZM9.542 3.62933L10.9567 2.21467C11.0817 2.08969 11.2512 2.01948 11.428 2.01948C11.6048 2.01948 11.7743 2.08969 11.8993 2.21467L13.7853 4.10067C13.9103 4.22569 13.9805 4.39522 13.9805 4.572C13.9805 4.74878 13.9103 4.91832 13.7853 5.04333L12.3707 6.45733L9.54267 3.62933H9.542Z" fill="#455570"/>
              </svg>
          `}
        </SvgIcon>

        <span
          style={{
            fontSize: 15,
            fontWeight: "600",
            lineHeight: 20 / 15,
            marginLeft: 8,
            color: "#455570",
          }}
          
        >
          {"Chỉnh sửa "}
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





















