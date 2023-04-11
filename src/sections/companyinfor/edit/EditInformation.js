import Drawer from "@mui/material/Drawer";
import {useTheme} from "@mui/material";

import FormCompanyInfor from "./FormCompanyInfor";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";

export default function EditInformation({open, onClose, dataForm}) {
  const theme = useTheme();
  return (
      <div>
        <Drawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
              sx: drawerPaperStyle({...theme, width: 800}),
            }}
            componentsProps={{
              backdrop: {
                sx: {background: 'rgba(9, 30, 66, 0.25) !important', boxShadow: 'none !important'}
              }
            }}
        >
          <FormCompanyInfor data={dataForm} onClose={onClose}/>
        </Drawer>
      </div>
  );
}
