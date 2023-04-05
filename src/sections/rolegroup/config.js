export const CANDIDATE = "Quản lý ứng viên";
export const EMPLOY_NEWS = "Quản lý tin tuyển dụng";
export const CAMPAIGN = "Quản lý tin tuyển dụng";
export const INTERVIEW_SCHEDULE = "Quản lý  lịch phỏng vấn";
export const CANDIDATE_STORE = "Kho ứng viên";
export const REPORT = "Thiết lập báo cáo";
export const COMPANY_INFO = "Thiết lập công ty";
export const OGANIZE_USER = "Thiết lập tổ chức và người dùng";
export const POSITION = "Thiết lập vị trí công việc";
export const ROLE = "Thiết lập vai trò";
export const TEMPLATE = "Thiết lập mẫu đánh giá";
export const RECRUIT_PROCESS = "Thiết lập quy trình tuyển dụng";
export const APPROVE_PROCESS = "Thiết lập quy trình phê duyệt";
export const COMPETITION = "Thiết lập đề thi";
export const OFFER_TEMPLATE = "Thiết lập mẫu thư mời nhận việc";
export const AUTOMAIL = "Thiết lập email tự động";
export const CONNECT = "Thiết lập kết nối nguồn tuyển dụng";
export const NOTIFICATION = "Thiết lập thông báo (Tạm ẩn)";

export const TYPES = [
  {
    name: CANDIDATE,
    actions: [
      "ViewCandidate",
      "AddCandidate",
      "EditCandidate",
      "RemoveCandidate",
      "ShareCandidate",
      "EvaluateCandidate",
      "ChangeCandidateStage",
    ],
  },
  {
    name: EMPLOY_NEWS,
    actions: [
      "ViewJob",
      "EditJob",
      "RemoveJob",
      "ExportJob",
      "ApproveRejectJob",
      "ChangeStatus",
      "CopyJob",
    ],
  },
  {
    name: INTERVIEW_SCHEDULE,
    actions: [
      "ViewInterviewSchedule",
      "ScheduleInterview",
      "EditInterviewSchedule",
      "CancelInterviewSchedule",
    ],
  },
  {
    name: CANDIDATE_STORE,
    actions: ["ExportCandidate", "ImportCandidate"],
  },
  {
    name: REPORT,
    actions: ["ReportIViecExam", "ReportIViecQuestion"],
  },
  {
    name: COMPANY_INFO,
    actions: [
      "Administrator",
      "InviteInterviewCommittee",
      "ParticipateInterviewSchedule",
      "RemoveAccount",
      "ViewUser",
      "RemoveUser",
    ],
  },
  {
    name: OGANIZE_USER,
    actions: ["ViewUnit", "RemoveUnit"],
  },
  {
    name: ROLE,
    actions: ["ViewRole", "RemoveRole", "AddEditRole"],
  },
  {
    name: POSITION,
    actions: ["ViewJobPosition", "AddEditJobPosition", "RemoveJobPosition"],
  },
  {
    name: TEMPLATE,
    actions: [
      "ViewEvaluationTemplate",
      "AddEditEvaluationTemplate",
      "RemoveEvaluationTemplate",
    ],
  },
  {
    name: OFFER_TEMPLATE,
    actions: [
      "ViewOfferTemplate",
      "AddEditOfferTemplate",
      "RemoveOfferTemplate",
      "CancelInvitation",
      "SendOfferMail",
    ],
  },
  // {
  //   name: RECRUIT_PROCESS,
  //   actions: [
  //     "AddEditRecruitmentProcess",
  //     "ViewRecruitmentProcess",
  //     "RemoveRecruitmentProcess",
  //   ],
  // },
  // {
  //   name: APPROVE_PROCESS,
  //   actions: [
  //     "ViewApprovalProcess",
  //     "AddEditApprovalProcess",
  //     "RemoveApprovalProcess",
  //   ],
  // },
  // {
  //   name: COMPETITION,
  //   actions: [
  //     "ViewExam",
  //     "ViewQuestion",
  //     "AddCompanyExam",
  //     "AddCompanyQuestion",
  //     "CopyExam",
  //     "CopyQuestion",
  //     "EditCompanyQuestion",
  //     "RemoveCompanyExam",
  //     "RemoveCompanyQuestion",
  //     "ViewCompanyExam",
  //   ],
  // },
  // {
  //   name: AUTOMAIL,
  //   actions: ["ViewEmail", "AddEditEmail", "RemoveEmail"],
  // },
  // {
  //   name: CONNECT,
  //   actions: ["AddConnect", "ViewConnect", "Disconnect"],
  // },
];

export const getActionName = (action) => {
  switch (action) {
    case "AddCandidate":
      return "Thêm ứng viên";
    case "AddCompanyExam":
      return "Thêm đề thi công ty";
    case "AddCompanyQuestion":
      return "Thêm câu hỏi công ty";
    case "AddConnect":
      return "Thêm kết nối";
    case "AddEditApprovalProcess":
      return "Thêm/Sửa quy trình phê duyệt";
    case "AddEditEmail":
      return "Thêm/Sửa email";
    case "AddEditEvaluationTemplate":
      return "Thêm/Sửa mẫu đánh giá";
    case "AddEditJobPosition":
      return "Thêm/Sửa vị trí công việc";
    case "AddEditOfferTemplate":
      return "Thêm/Sửa mẫu Offer";
    case "AddEditRecruitmentProcess":
      return "Thêm/Sửa quy trình tuyển dụng";
    case "AddEditRole":
      return "Thêm/Sửa vai trò";
    case "Administrator":
      return "Quản trị viên";
    case "ApproveRejectJob":
      return "Từ chối phê duyệt tin tuyển dụng";
    case "CancelInterviewSchedule":
      return "Hủy lịch phỏng vấn";
    case "CancelInvitation":
      return "Hủy thư mời";
    case "ChangeCandidateStage":
      return "Chuyển bước ứng viên";
    case "ChangeStatus":
      return "Chuyển trạng thái ứng viên";
    case "CopyExam":
      return "Nhân bản đề thi";
    case "CopyJob":
      return "Nhân bản tin tuyển dụng";
    case "CopyQuestion":
      return "Nhân bản câu hỏi";
    case "Disconnect":
      return "Hủy kết nối";
    case "EditCandidate":
      return "Sửa ứng viên";
    case "EditCompanyQuestion":
      return "Sửa câu hỏi công ty";
    case "EditInterviewSchedule":
      return "Sửa lịch phỏng vấn";
    case "EditJob":
      return "Sửa tin tuyển dụng";
    case "EditUser":
      return "Sửa người dùng";
    case "EvaluateCandidate":
      return "Đánh giá ứng viên";
    case "ExportCandidate":
      return "Export ứng viên";
    case "ExportJob":
      return "Export tin tuyển dụng";
    case "ImportCandidate":
      return "Import ứng viên";
    case "InviteInterviewCommittee":
      return "Xác nhận lịch phỏng vấn";
    case "ParticipateInterviewSchedule":
      return "Tham gia phỏng vấn";
    case "RemoveAccount":
      return "Xóa tài khoản";
    case "RemoveApprovalProcess":
      return "Xóa quy trình phê duyệt";
    case "RemoveCandidate":
      return "Xóa ứng viên";
    case "RemoveCompanyExam":
      return "Xóa đề thi công ty";
    case "RemoveCompanyQuestion":
      return "Xóa câu hỏi công ty";
    case "RemoveEmail":
      return "Xóa email";
    case "RemoveEvaluationTemplate":
      return "Xóa mẫu đánh giá";
    case "RemoveJob":
      return "Xóa tin tuyển dụng";
    case "RemoveJobPosition":
      return "Xóa vị trí công việc";
    case "RemoveOfferTemplate":
      return "Xóa mẫu Offer";
    case "RemoveRecruitmentProcess":
      return "Xóa quy trình tuyển dụng";
    case "RemoveRole":
      return "Xóa vai trò";
    case "RemoveUnit":
      return "Xóa đơn vị tiền tệ";
    case "RemoveUser":
      return "Xóa người dùng";
    case "ReportIViecExam":
      return "Báo cáo đề thi";
    case "ReportIViecQuestion":
      return "Báo cáo câu hỏi";
    case "ScheduleInterview":
      return "Đặt lịch phỏng vấn";
    case "SendOfferMail":
      return "Gửi mail Offer";
    case "ShareCandidate":
      return "Chia sẻ ứng viên";
    case "ViewApprovalProcess":
      return "Xem quy trình phê duyệt";
    case "ViewCandidate":
      return "Xem ứng viên";
    case "ViewCompanyExam":
      return "Xem đề thi công ty";
    case "ViewConnect":
      return "Xem kết nối";
    case "ViewEmail":
      return "Xem email";
    case "ViewEvaluationTemplate":
      return "Xem mẫu đánh giá";
    case "ViewExam":
      return "Xem đề thi";
    case "ViewInterviewSchedule":
      return "Xem lịch phỏng vấn";
    case "ViewJob":
      return "Xem tin tuyển dụng";
    case "ViewJobPosition":
      return "Xem vị trí công việc";
    case "ViewOfferTemplate":
      return "Xem mẫu Offer";
    case "ViewQuestion":
      return "Xem câu hỏi";
    case "ViewRecruitmentProcess":
      return "Xem quy trình tuyển dụng";
    case "ViewRole":
      return "Xem vai trò";
    case "ViewUnit":
      return "Xem đơn vị tiền tệ";
    case "ViewUser":
      return "Xem người dùng";
    default:
      return action;
  }
}