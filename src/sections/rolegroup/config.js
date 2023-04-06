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
      'ViewCandidate',
      'AddEditCandidate',
      'EvaluateCandidate',
      'ChangeCandidateStage',
    ],
  },
  {
    name: EMPLOY_NEWS,
    actions: [
      'ViewJobDescription',
      'AddEditDeleteJob',
      'AddEditDeleteInterviewSchedule',
      'SendOfferMail',
      'ApproveJob',
    ],
  },
  {
    name: CAMPAIGN,
    actions: [
      "ViewCampaign",
      "AddEditDeleteCampaign",
      "ApproveCampaign",
    ],
  },
  {
    name: INTERVIEW_SCHEDULE,
    actions: [
      'ViewInterviewSchedule',
      'AddEditDeleteInterviewSchedule',
      'ParticipateInterviewSchedule',
    ],
  },
  {
    name: CANDIDATE_STORE,
    actions: [],
  },
  {
    name: REPORT,
    actions: [
      'ViewReport',
    ],
  },
  {
    name: COMPANY_INFO,
    actions: [
      'ViewCompanyInformation',
      'EditCompanyInformation',
    ],
  },
  {
    name: OGANIZE_USER,
    actions: [
      'ViewUser',
      'ViewUnit',
      'AddEditDeleteUser',
      'AddEditDeleteUnit',
      'ApproveUserInvitation',
    ],
  },
  {
    name: POSITION,
    actions: [
      'ViewJobDescription',
      'AddEditDeleteJobDescription',
    ],
  },
  {
    name: ROLE,
    actions: [
      'ViewRole',
      'AddEditDeleteRole',
    ],
  },
  {
    name: TEMPLATE,
    actions: [
      'ViewEvaluationTemplate',
      'AddEditDeleteEvaluationTemplate',
    ],
  },
  {
    name: RECRUIT_PROCESS,
    actions: [
      'ViewRecruitmentProcess',
      'AddEditDeleteRecruitmentProcess',
    ],
  },
  {
    name: APPROVE_PROCESS,
    actions: [
      'ViewApprovalProcess',
      'AddEditDeleteApprovalProcess',
    ],
  },
  {
    name: COMPETITION,
    actions: [
      'ViewQuestion',
      'AddEditDeleteQuestion',
      'ViewExam',
      'AddEditDeleteExam',
      'ReportiVIECExamQuestion',
    ],
  },
  {
    name: OFFER_TEMPLATE,
    actions: [
      'ViewOfferTemplate',
      'AddEditDeleteOfferTemplate',
      'ApproveOfferTemplate',
    ],
  },
  {
    name: AUTOMAIL,
    actions: [
      'ViewEmail',
      'AddEditDeleteEmail',
    ],
  },
  {
    name: CONNECT,
    actions: [
      'ViewConnect',
      'AddStopConnect',
    ],
  },
];

export const getActionName = (action) => {
  switch (action) {
    case "ViewCandidate":
      return "Xem ứng viên";
    case "AddEditCandidate":
      return "Thêm/Sửa ứng viên";
    case "EvaluateCandidate":
      return "Đánh giá ứng viên";
    case "ChangeCandidateStage":
      return "Chuyển bước ứng viên";
    case "ViewJobDescription":
      return "Xem tin tuyển dụng";
    case "AddEditDeleteJob":
      return "Thêm/Sửa/Xóa tin tuyển dụng";
    case "AddEditDeleteInterviewSchedule":
      return "Thêm/Sửa/Xóa lịch phỏng vấn";
    case "SendOfferMail":
      return "Gửi thư mời làm việc";
    case "ApproveJob":
      return "Phê duyệt tin tuyển dụng";
    case "ViewCampaign":
      return "Xem chiến dịch tuyển dụng";
    case "AddEditDeleteCampaign":
      return "Thêm/Sửa/Xóa chiến dịch tuyển dụng";
    case "ApproveCampaign":
      return "Phê duyệt chiến dịch tuyển dụng";
    case "ViewInterviewSchedule":
      return "Xem lịch phỏng vấn";
    case "ParticipateInterviewSchedule":
      return "Tham gia phỏng vấn";
    case "ViewReport":
      return "Xem báo cáo";
    case "ViewCompanyInformation":
      return "Xem thông tin công ty";
    case "EditCompanyInformation":
      return "Sửa thông tin công ty";
    case "ViewUser":
      return "Xem người dùng";
    case "ViewUnit":
      return "Xem đơn vị";
    case "AddEditDeleteUser":
      return "Thêm/Sửa/xóa người dùng";
    case "AddEditDeleteUnit":
      return "Thêm/sửa/xóa đơn vị";
    case "ApproveUserInvitation":
      return "Phê duyệt lời mời người dùng";
    case "AddEditDeleteJobDescription":
      return "Thêm/sửa/xóa vị trí công việc";
    case "ViewRole":
      return "Xem vai trò";
    case "AddEditDeleteRole":
      return "Thêm/sửa/xóa vai trò";
    case "ViewEvaluationTemplate":
      return "Xem mẫu đánh giá";
    case "AddEditDeleteEvaluationTemplate":
      return "Thêm/sửa/xóa mẫu đánh giá";
    case "ViewRecruitmentProcess":
      return "Xem Quy trình tuyển dụng";
    case "AddEditDeleteRecruitmentProcess":
      return "Thêm/sửa/xóa Quy trình tuyển dụng";
    case "ViewApprovalProcess":
      return "Xem Quy trình phê duyệt";
    case "AddEditDeleteApprovalProcess":
      return "Thêm/sửa/xóa Quy trình phê duyệt";
    case "ViewQuestion ":
      return "Xem câu hỏi";
    case "AddEditDeleteQuestion":
      return "Thêm/sửa/xóa câu hỏi";
    case "ViewExam":
      return "Xem đề thi";
    case "AddEditDeleteExam":
      return "Thêm/sửa/xóa đề thi";
    case "ReportiVIECExamQuestion":
      return "Báo cáo đề thi/câu hỏi iVIEC";
    case "ViewOfferTemplate":
      return "Xem mẫu thư mời làm việc";
    case "AddEditDeleteOfferTemplate":
      return "Thêm/sửa/xóa mẫu mời làm việc";
    case "ApproveOfferTemplate":
      return "Phê duyệt mẫu thư mời làm việc";
    case "ViewEmail":
      return "Xem email tự động";
    case "AddEditDeleteEmail":
      return "Thêm/sửa/xóa email tự động";
    case "ViewConnect":
      return "Xem Kết nối";
    case "AddStopConnect":
      return "Thêm/ngắt/xóa kết nối";
    default:
      return action;
  }
}