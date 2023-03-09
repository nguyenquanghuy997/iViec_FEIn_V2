import EditIcon from "../../assets/EditIcon";
import ConnectDialog from "../connect/ConnectDialog";
import { DeleteIcon } from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Stack,
  Switch,
  Typography,
} from "@mui/material";
import { styled } from "@mui/styles";
import React,{useState} from "react";

const ActiveSwitch = styled(Switch)(({}) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

const BottomNavPipeline = ({
  selecedLength,
  open,
  onClose,
  onOpen,
  ...props
}) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <Drawer
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
      onOpen={onOpen}
      {...props}
    >
      <Content>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            <FormControlLabel
              control={<ActiveSwitch defaultChecked />}
              label="Đang hoạt động"
            />
            <IconButton
              size="small"
              sx={{ color: "#1976D2", mx: 0.5 }}
            //   onClick={() => setShowDelete(true)}
            >
              <EditIcon />
            </IconButton>
            <IconButton
              size="small"
              sx={{ color: "#1976D2", mx: 0.5 }}
              onClick={() => setOpenDialog(true)}
            >
              <DeleteIcon />
            </IconButton>
            <ConnectDialog
              onClose={() => setOpenDialog(false)}
              onDelete={()=> console.log('Tuyeyet')}
              open={openDialog}
              type="role"
            />
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography>Đã chọn: {selecedLength}</Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }}
            />
            <IconButton size="medium" onClick={onClose}>
              <Iconify icon="ic:baseline-close" />
            </IconButton>
          </Box>
        </Box>
      </Content>
    </Drawer>
  );
};

export default React.memo(BottomNavPipeline);
