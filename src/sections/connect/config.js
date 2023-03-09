
export const FANPAGE = "fanpage";
export const ACCOUNT = "account";
export const UNCONNECT = "unconnect";

export const ACTION = {
  FANPAGE,
  ACCOUNT,
  UNCONNECT,
};

export const ACTION_CONTENT = {
  fanpage: { confirm:'Xác nhận xóa Fanpage',text: "Bạn có chắc chắn muốn xóa Fanpage", color: "#E53935", textButton:'Xóa' },
  account: { confirm:'Xác nhận xóa tài khoản',text: "Bạn có chắc chắn muốn xóa tài khoản", color: "#E53935",  textButton:'Xóa'},
  unconnect: { confirm:'Xác nhận ngắt kết nối ',text: "Bạn có chắc chắn muốn ngắt kết nối với tài khoản ", color: "#455570" , textButton:'Ngắt kết nối'},
};