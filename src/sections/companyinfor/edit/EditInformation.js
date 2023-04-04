import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import {RiCloseFill} from "react-icons/ri";
import {Box, Divider, IconButton, Typography} from "@mui/material";

import FormCompanyInfor from "./FormCompanyInfor";
export default function EditInformation({open, onClose, dataForm}) {

  return (
      <div>
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{sx: {width: 800, position: 'fixed', top: '64px', right: 0}}}
            componentsProps={{
              backdrop: {
                sx: {background: 'rgba(9, 30, 66, 0.25) !important', boxShadow: 'none !important'}
              }
            }}
        >
          <Box sx={{ mb: 8 }}>
            <List sx={{display: "flex", alignItems: 'center', justifyContent: "space-between", px: 3, py: 2}}>
              <Typography sx={{fontSize: 16, fontWeight: 600}}>
                Chỉnh sửa Thông tin công ty
              </Typography>
              <IconButton onClick={onClose}>
                <RiCloseFill color="#455570" size={18}/>
              </IconButton>
            </List>
            <Divider/>
            <List sx={{p: 0}}>
              <FormCompanyInfor data={dataForm} onClose={onClose}/>
            </List>
          </Box>
        </Drawer>
      </div>
  );
}
