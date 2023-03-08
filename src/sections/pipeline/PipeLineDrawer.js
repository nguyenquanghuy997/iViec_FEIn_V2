import CloseIcon from "../../assets/CloseIcon";
import PipelineForm from "./PipelineForm";
import { Box, Button, Typography } from "@mui/material";
import { Divider } from "@mui/material";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import React from "react";

export default function DrawerEdit({ open, onClose, onOpen }) {

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
          Thêm mới vai trò
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
      <PipelineForm onClose={onClose} />
      <List sx={{ p: 0 }}></List>
    </Box>
  );

  return (
    <div>
      <Drawer
        anchor="right"
        open={open}
        onClose={onClose}
        onOpen={onOpen}
      >
        {list("right")}
      </Drawer>
    </div>
  );
}
