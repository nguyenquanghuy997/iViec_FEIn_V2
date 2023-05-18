import {useTheme} from "@mui/material/styles";

export const FANPAGE = "fanpage";
export const ACCOUNT = "account";
export const UNCONNECT = "unconnect";
export const ROLE ='role'
const theme = useTheme();
export const ACTION = {
  FANPAGE,
  ACCOUNT,
  UNCONNECT,
  ROLE
};

export const ACTION_CONTENT = {
  role:{ confirm:'Xác nhận xóa vai trò', text:'Bạn có chắc chắn muốn xóa vai trò', color: theme.palette.common.red600, textButton:'Xóa'},
  fanpage: { confirm:'Xác nhận xóa Fanpage',text: "Bạn có chắc chắn muốn xóa Fanpage", color: theme.palette.common.red600, textButton:'Xóa' },
  account: { confirm:'Xác nhận xóa tài khoản',text: "Bạn có chắc chắn muốn xóa tài khoản", color: theme.palette.common.red600,  textButton:'Xóa'},
  unconnect: { confirm:'Xác nhận ngắt kết nối ',text: "Bạn có chắc chắn muốn ngắt kết nối với tài khoản ", color: theme.palette.common.neutral700 , textButton:'Ngắt kết nối'},
};
