import { DOMAIN_SERVER_API } from "@/config";

//PipelineStateType
export const PipelineStateType = (item, result) => {
  switch (item) {
    case 0:
      return "Ứng tuyển";
    case 1:
      return "Thi tuyển";
    case 2:
      return "Phỏng Vấn";
    case 3:
      switch (result) {
        case 0:
          return "Kết quả - Đạt";
        case 1:
          return "Kết quả - Cân nhắc";
        case 2:
          return "Kết quả - Loại";
        default:
          return "Kết quả";
      }
    case 4:
      return "Mời nhận việc";
  }
};
//Giới tính
export const Sex = (item) => {
  switch (item) {
    case 0:
      return "Nam";
    case 1:
      return "Nữ";
    case 2:
      return "Khác";
    case 3:
      return "Không yêu cầu";
  }
};
//Tình trạng hôn nhân
export const MaritalStatus = (item) => {
  switch (item) {
    case 0:
      return "Độc thân";
    case 1:
      return "Kết hôn";
    case 2:
      return "Khác";
  }
};
//Địa chỉ
export const Address = (item) =>
  `${item?.address ? item?.address + "," : ""} ${item?.villageName ? item?.villageName + "," : ""}  ${
    item?.districtName ? item?.districtName + "," : ""
  } ${item?.provinceName ? item?.provinceName : ""}`;
//Đơn vị tiền tệ
export const Currency = (item) => {
  switch (item) {
    case 0:
      return "USD";
    case 1:
      return "VNĐ";
  }
};
//Số năm kinh nghiệm
export const YearOfExperience = (item) => {
  switch (item) {
    case 0:
      return "Chưa có kinh nghiệm";
    case 1:
      return "Dưới 1 năm";
    case 2:
      return "1-2 năm";
    case 3:
      return "2-3 năm";
    case 4:
      return "3-5 năm";
    case 5:
      return "5-7 năm";
    case 6:
      return "7-10 năm";
    case 7:
      return "Trên 10 năm";
  }
};

//Link image
export const srcImage = (image) => {
  return DOMAIN_SERVER_API+"/Image/GetImage?imagePath="+image
};