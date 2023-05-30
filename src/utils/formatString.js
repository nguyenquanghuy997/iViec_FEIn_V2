import {
  ApplyJobIcon,
  AssessmentIcon,
  InterviewIcon, OfferIcon,
  ResultIcon
} from "@/sections/recruitment-form/icon/PipelineIcon";

export const LIST_BRANCH_SIZE = [
  { id: "Less10", value: "[0-9]", name: "Dưới 10" },
  { id: "From10to49", value: "[10-49]", name: "10-49" },
  { id: "From50to99", value: "[50-99]", name: "50-99" },
  { id: "From100to499", value: "[100-499]", name: "100-499" },
  { id: "From500to999", value: "[500-999]", name: "500-999" },
  { id: "From1000to4999", value: "[1000-4999]", name: "1000-4999" },
  { id: "From5000to9999", value: "[5000-9999]", name: "5000-9999" },
  { id: "Greater10000", value: "[10000-00]", name: "Trên 10000" },
];


export const LIST_PROCESS_LEVEL_DETAIL_TYPE = [
  { id: 0, name: "Vai trò" },
  { id: 1, name: "Cán bộ" },
];

export const LIST_ORGANIZATION_SIZE = [
  { id: "LessThanTen", value: 0, name: "Dưới 10 nhân sự" },
  { id: "BetweenTenAndFortyNine", value: 1, name: "10-49 nhân sự" },
  { id: "BetweenFiftyAndNinetyNine", value: 2, name: "50-99 nhân sự" },
  { id: "BetweenOneHundredAndFourHundredNinetyNine", value: 3, name: "100-499 nhân sự", },
  { id: "BetweenFiveHundredAndNineHundredNinetyNine", value: 4, name: "500-999 nhân sự", },
  { id: "BetweenOneThousandAndFourThousandNineHundredNinetyNine", value: 5, name: "1000-4999 nhân sự", },
  { id: "BetweenFiveThousandAndNineThousandNineHundredNinetyNine", value: 6, name: "5000-9999 nhân sự", },
  { id: "LargeTenThousand", value: 7, name: "Trên 10000 nhân sự" },
];
export const LIST_STATUS = [
  { id: 0, value: 0, name: "Tất cả" },
  { id: 'true', value: 1, name: "Đang hoạt động" },
  { id: 'false', value: 2, name: "Không hoạt động" },
]
export const LIST_MARITAL_STATUSES = [
  { value: 0, name: "Độc thân", label: "Độc thân" },
  { value: 1, name: "Kết hôn", label: "Kết hôn" },
  { value: 2, name: "Khác", label: "Khác" },
]

export const LIST_GENDER = [
  { value: 0, name: "Nam", label: "Nam" },
  { value: 1, name: "Nữ", label: "Nữ" },
  { value: 2, name: "Khác", label: "Khác" },
]

export const LIST_GENDER_RECRUITMENT = [
  { value: 0, name: "Nam", label: "Nam" },
  { value: 1, name: "Nữ", label: "Nữ" },
  { value: 2, name: "Khác", label: "Khác" },
  // {value: 3, name: "Không yêu cầu", label: "Không yêu cầu"},
]

export const LIST_EXPERIENCE_NUMBER = [
  { value: 0, name: "Chưa có kinh nghiệm", label: "Chưa có kinh nghiệm" },
  { value: 1, name: "Dưới 1 năm", label: "Dưới 1 năm" },
  { value: 2, name: "1 - 2 năm", label: "1 - 2 năm" },
  { value: 3, name: "2 - 3 năm", label: "2 - 3 năm" },
  { value: 4, name: "3 - 5 năm", label: "3 - 5 năm" },
  { value: 5, name: "5 - 7 năm", label: "5 - 7 năm" },
  { value: 6, name: "7 - 10 năm", label: "7 - 10 năm" },
  { value: 7, name: "10 năm trở lên", label: "10 năm trở lên" },
]

export const LIST_STEP_RECRUITMENT = [
  { value: 0, name: "Ứng tuyển" },
  { value: 1, name: "Thi tuyển" },
  { value: 2, name: "Phỏng vấn máy" },
  { value: 3, name: "Phỏng vấn" },
  { value: 4, name: "Kết quả - Đạt" },
  { value: 5, name: "Kết quả - Cân nhắc" },
  { value: 6, name: "Kết quả - Loại" },
  { value: 7, name: "Mời nhận việc" },
]

export const LIST_PIPELINESTATE = [
  { value: 0, name: "Ứng tuyển" },
  { value: 1, name: "Thi tuyển" },
  { value: 2, name: "Phỏng vấn" },
  { value: 3, name: "Kết quả" }
]

export const LIST_RECRUITMENT_WORKING_FORM = [
  { value: 0, name: "Toàn thời gian", label: "Toàn thời gian" },
  { value: 1, name: "Bán thời gian", label: "Bán thời gian" },
  { value: 2, name: "Làm việc từ xa", label: "Làm việc từ xa" },
  { value: 3, name: "Thời vụ", label: "Thời vụ" },
  { value: 4, name: "Linh động", label: "Linh động" },
]

export const LIST_CURRENCY_TYPE = [
  { value: 0, name: "VNĐ", label: "VNĐ" },
  { value: 1, name: "USD", label: "USD" },
]

export const LIST_RECRUITMENT_SALARY_DISPLAY_TYPE = [
  { value: 0, name: "Không lương", label: "Không lương" },
  { value: 1, name: "Lương thỏa thuận", label: "Lương thỏa thuận" },
  { value: 2, name: "Mức lương chi tiết", label: "Mức lương chi tiết" },
]
export const LIST_RECRUITMENT_PROCESS_STATUS = [
  { value: 0, label: "Bản nháp" },
  { value: 1, label: "Chờ nội bộ phê duyệt" },
  { value: 2, label: "Nội bộ từ chối" },
  { value: 3, label: "Chờ iVIEC phê duyệt" },
  { value: 4, label: "iVIEC từ chối" },
  { value: 5, label: "Đang tuyển dụng" },
  { value: 6, label: "Đã lên lịch" },
  { value: 7, label: "Hết hạn" },
  { value: 8, label: "Đóng" },
]
export const LIST_EXAM_TYPE = [
  { id: 2, value: 2, name: "Tất cả" },
  { id: true, value: 1, name: "Đề thi câu hỏi trắc nghiệm" },
  { id: false, value: 0, name: "Đề thi câu hỏi cố định" },
]

export const LIST_OPTIONS_QUESTION_TYPE = [
  { id: 3, value: 3, name: "Tất cả" },
  { id: 2, value: 2, name: "Tự luận" },
  { id: 0, value: 0, name: "Trắc nghiệm - một đáp án đúng" },
  { id: 1, value: 1, name: "Trắc nghiệm - nhiều đáp án đúng" },
]

export const PipelineStateType = (item, description = '', isDefault) => {
  switch (item) {
    case 0:
      return {
        title: "Ứng tuyển",
        subtitle: isDefault ? "Ứng viên ứng tuyển trên Jobsite hoặc được nhà tuyển dụng thêm vào tin" : description,
        icon: <ApplyJobIcon />
      }
    case 1:
      return {
        title: "Thi tuyển",
        subtitle: isDefault ? "Ứng viên tham gia thi tuyển theo đề thi nhà tuyển dụng đã thiết lập" : description,
        icon: <AssessmentIcon />
      }
    case 2:
      return {
        title: "Phỏng vấn",
        subtitle: isDefault ? "Ứng viên tham gia phỏng vấn theo lịch nhà tuyển dụng đã thiết lập" : description,
        icon: <InterviewIcon />
      }
    case 3:
      return {
        title: "Kết quả",
        subtitle: isDefault ? "Ứng viên nhận thông báo kết quả từ nhà tuyển dụng" : description,
        icon: <ResultIcon />
      }
    case 4:
      return {
        title: "Mời nhận việc",
        subtitle: isDefault ? "Ứng viên nhận thông báo mời nhận việc từ nhà tuyển dụng" : description,
        icon: <OfferIcon />
      }
    default:
      return {
        title: "Ứng tuyển",
        subtitle: isDefault ? "Ứng viên ứng tuyển trên Jobsite hoặc nhà tuyển dụng thêm vào tin" : description,
        icon: <ApplyJobIcon />
      }
  }
};

export const LIST_QUESTION_TYPE = [
  { id: 1, name: "Trắc nghiệm", quantity: 20 },
  { id: 2, name: "Tự luận", quantity: 10 },
]

export function joinArrStr(arr, key) {
  return Array.isArray(arr) ? arr.filter((item) => !!item).join(key) : "";
}

export function formatRemoteUrl(str) {
  if (!str) return null;
  return `https://be.iviec.vn${str}`;
}

export function formatBranchSize(data) {
  return LIST_BRANCH_SIZE.find((i) => i.id === data)?.name || "";
}

export function checkSameValue(arr) {
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] !== arr[0]) {
      return false;
    }
  }
  return true;
}

export const INTERVIEW_PROCESS_STATUS = [
  { id: 6, name: "Chờ ứng viên phản hồi" },
  { id: 7, name: "Ứng viên đã xác nhận" },
  { id: 8, name: "Đã hủy" },
  { id: 9, name: "Đang diễn ra" },
  { id: 10, name: "Đã kết thúc" },
  { id: 11, name: "Ứng viên xin đổi lịch" },
]