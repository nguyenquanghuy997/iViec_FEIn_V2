import { DOMAIN_SERVER_API } from "@/config";

export const formatPhoneNumber = (phoneNumberString) => {
  const phone = phoneNumberString.replace(/\D/g, "");
  const match = phone.match(/^(\d{1,4})(\d{0,3})(\d{0,3})/);
  if (match) {
    return `${match[1]}${match[2] ? " " : ""}${match[2]}${match[3] ? " " : ""}${
      match[3]
    }${match[4] ? " " : ""}`;
  }
  return null;
};

//PipelineStateType
export const PipelineStateType = (item, result) => {
  switch (item) {
    case 0:
      return "Ứng tuyển";
    case 1:
      return "Thi tuyển";
    case 2:
      switch (result) {
        case 0:
          return "Đạt";
        case 1:
          return "Cân nhắc";
        case 2:
          return "Không đạt";
        default:
          return "Phỏng Vấn";
      }
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
//Tình trạng hôn nhân
export const Status = (item) => {
  switch (item) {
    case true:
      return "Đang hoạt động";
    case false:
      return "Không hoạt động";
  }
};
//Địa chỉ
export const Address = (item) => {
  return [
    item?.address,
    item?.villageName,
    item?.districtName,
    item?.provinceName,
  ]
    .filter((i) => i)
    .join(", ");
};
//Đơn vị tiền tệ
export const Currency = (item) => {
  switch (item) {
    case 0:
      return "VNĐ";
    case 1:
      return "USD";
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
  if (/data:.+;base64/g.test(image) || String(image).startsWith("http"))
    return image;
  return DOMAIN_SERVER_API + "/Image/GetImage?imagePath=" + image;
};

//RecruitmentProcessStatus
export const RecruitmentProcessStatus = (item) => {
  switch (item) {
    case 0: //"Draft"
      return "Bản nháp";
    case 1: //"WaitingOrganizationApproval":
      return "Chờ nội bộ phê duyệt";
    case 2: //"OrganizationReject":
      return "Nội bộ từ chối";
    case 3: //"WaitingMedusaApproval":
      return "Chờ iVIEC phê duyệt";
    case 4: //"MedusaReject":
      return "iVIEC từ chối";
    case 5: //"Recruiting":
      return "Đang tuyển dụng"; //DADTWJ LICHJ
    case 6: //"Calendared":
      return "Đã lên lịch";
    case 7: //"Expired":
      return "Hết hạn"; //DATWJH LICHJ
    case 8: //"Closed":
      return "Đóng";
  }
};
//RecruitmentProcessStatus
export const DivProcessStatus = (item) => {
  switch (item) {
    case 0: //"Draft"
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#455570" }}>Bản nháp</span>;
    case 1: //"WaitingOrganizationApproval":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#F77A0C" }}>Chờ nội bộ phê duyệt</span>;
    case 2: //"OrganizationReject":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#E53935" }}>Nội bộ từ chối</span>;
    case 3: //"WaitingMedusaApproval":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#F77A0C" }}>Chờ iVIEC phê duyệt</span>;
    case 4: //"MedusaReject":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#E53935" }}>iVIEC từ chối</span>;
    case 5: //"Recruiting":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#388E3C" }}>Đang tuyển dụng</span>;
    case 6: //"Calendared":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#388E3C" }}>Đã lên lịch</span>;
    case 7: //"Expired":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#455570" }}>Hết hạn</span>;
    case 8: //"Closed":
      return <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 500, color: "#455570" }}>Đóng</span>;
  }
};
//RecruitmentWorkingForm
export const RecruitmentWorkingForm = (item) => {
  switch (item) {
    case 0: //"FullTime"
      return "Toàn thời gian";
    case 1: //"PartTime":
      return "Bán thời gian";
    case 2: //"Remote":
      return "Làm việc từ xa";
    case 3: //"SeasonalWork":
      return "Thời vụ";
    case 4: //"Hybrid":
      return "Linh động";
    case 5: //"Other":
      return "Khác";
  }
};

export const OrganizationSize = (item) => {
  switch (item) {
    case 0:
      return "Dưới 10 nhân sự";
    case 1:
      return "10-49 nhân sự";
    case 2:
      return "50-99 nhân sự";
    case 3:
      return "100-499 nhân sự";
    case 4:
      return "500-999 nhân sự";
    case 5:
      return "1000-4999 nhân sự";
    case 6:
      return "5000-9999 nhân sự";
    case 7:
      return "Trên 10000 nhân sự";
    default:
      return "Khác";
  }
};

export const ExamType = (item) => {
  switch (item) {
    case 0:
      return "Đề thi câu hỏi cố định";
    case 1:
      return "Đề thi câu hỏi trắc nghiệm";
  }
};

//RecruitmentProcessStatus
export const BookingCalendarProcessStatus = (item) => {
  switch (item) {
    case 0:
      return "Đã lên lịch";
    case 1:
      return "Đang phỏng vấn";
    case 2:
      return "Kết thúc phỏng vấn";
    case 3:
      return "Đã hủy lịch";
  }
};

export const ApplicantCalendarState = (item) => {
  switch (item) {
    case 0: //"Pending"
      return <span style={{ color: "#455570" }}>Chờ xác nhận phỏng vấn</span>;
    case 1: //"Confirmed":
      return <span style={{ color: "#388E3C" }}>Đã xác nhận phỏng vấn</span>;
    case 2: //"Suspended":
      return <span style={{ color: "#F77A0C" }}>Hoãn lịch phỏng vấn</span>;
    case 3: //"Refuse":
      return <span style={{ color: "#E53935" }}>Từ chối phỏng vấn</span>;
    case 4: //"Interviewing":
      return <span style={{ color: "#388E3C" }}>Đang phỏng vấn</span>;
    case 5: //"NotParted":
      return <span style={{ color: "#E53935" }}>Không tham gia phỏng vấn</span>;
    case 6: //"Completed":
      return <span style={{ color: "#388E3C" }}>Kết thúc phỏng vấn</span>;
  }
};
