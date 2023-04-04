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
      "Organization",
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

export const VietnameseField = (item) => {
  switch (item) {
    case "ViewCandidate":
      return "Xem ứng viên";
    case "AddCandidate":
      return "Chờ nội bộ phê duyệt";
    case "EditCandidate":
      return "Nội bộ từ chối";
    case "RemoveCandidate":
      return "Chờ iVIEC phê duyệt";
    case "ShareCandidate":
      return "iVIEC từ chối";
    case "EvaluateCandidate":
      return "Đang tuyển dụng";
    case "ChangeCandidateStage":
      return "Đã lên lịch";
    case "ViewJob":
      return "Hết hạn";
    case "EditJob":
      return "Đóng";
    case "RemoveJob":
      return "Xem ứng viên";
    case "ExportJob":
      return "Chờ nội bộ phê duyệt";
    case "ApproveRejectJob":
      return "Nội bộ từ chối";
    case "ChangeStatus":
      return "Chờ iVIEC phê duyệt";
    case "CopyJob":
      return "iVIEC từ chối";
    case "ViewInterviewSchedule":
      return "Đang tuyển dụng";
    case "ScheduleInterview":
      return "Đã lên lịch";
    case "EditInterviewSchedule":
      return "Hết hạn";
    case "CancelInterviewSchedule":
      return "Hủy lịch phỏng vấn";
    case "ExportCandidate":
      return "Nội bộ từ chối";
    case "ImportCandidate":
      return "Chờ iVIEC phê duyệt";
    case "ReportIViecExam":
      return "iVIEC từ chối";
    case "ReportIViecQuestion":
      return "Đang tuyển dụng";
    case "Administrator":
      return "Đã lên lịch";
    case "Organization":
      return "Hết hạn";
    case "InviteInterviewCommittee":
      return "Hủy lịch phỏng vấn";
    case "ParticipateInterviewSchedule":
      return "Đang tuyển dụng";
    case "RemoveAccount":
      return "Đã lên lịch";
    case "ViewUser":
      return "Hết hạn";
    case "RemoveUser":
      return "Hủy lịch phỏng vấn";
    case "ViewUnit":
      return "Nội bộ từ chối";
    case "RemoveUnit":
      return "Chờ iVIEC phê duyệt";
    case "ViewRole":
      return "iVIEC từ chối";
    case "RemoveRole":
      return "Đang tuyển dụng";
    case "AddEditRole":
      return "Đã lên lịch";
    case "ViewJobPosition":
      return "Hủy lịch phỏng vấn";
    case "AddEditJobPosition":
      return "Đang tuyển dụng";
    case "RemoveJobPosition":
      return "Đã lên lịch";
    case "ViewEvaluationTemplate":
      return "Hết hạn";
    case "AddEditEvaluationTemplate":
      return "Hủy lịch phỏng vấn";
    case "RemoveEvaluationTemplate":
      return "Nội bộ từ chối";
    case "ViewOfferTemplate":
      return "Chờ iVIEC phê duyệt";
    case "AddEditOfferTemplate":
      return "iVIEC từ chối";
    case "RemoveOfferTemplate":
      return "Đang tuyển dụng";
    case "CancelInvitation":
      return "Đã lên lịch";
    case "SendOfferMail":
      return "Gửi mail yêu cầu ";
  }
};
