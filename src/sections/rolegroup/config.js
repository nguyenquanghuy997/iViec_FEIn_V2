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
      'AddCandidate',
      'EditCandidate',
      'RemoveCandidate',
      'ShareCandidate',
      'EvaluateCandidate',
      'ChangeCandidateStage',
    ],
  },
  {
    name: EMPLOY_NEWS,
    actions: [
      'ViewJob',
      'EditJob',
      'RemoveJob',
      'ExportJob',
      'ApproveRejectJob',
      'ChangeStatus',
      'CopyJob',
    ],
  },
  {
    name: INTERVIEW_SCHEDULE,
    actions: [
      'ViewInterviewSchedule',
      'ScheduleInterview',
      'EditInterviewSchedule',
      'CancelInterviewSchedule',
    ],
  },
  // {
  //   name: CANDIDATE_STORE,
  //   actions: [
  //     { ExportCandidate: "Export ứng viên" },
  //     { ImportCandidate: "Import ứng viên vào tin tuyển dụng" },
  //   ],
  // },
  // {
  //   name: REPORT,
  //   actions: [
  //     { ReportIViecExam: "Báo cáo đề thi IVIEC" },
  //     { ReportIViecQuestion: "Báo cáo câu hỏi IVIEC" },
  //   ],
  // },
  // {
  //   name: COMPANY_INFO,
  //   actions: [
  //     { Administrator: "Quản trị" },
  //     { Organization: "Tổ chức" },
  //     { InviteInterviewCommittee: "Mời hội đồng phỏng vấn" },
  //     { ParticipateInterviewSchedule: "Tham gia phỏng vấn" },
  //     { RemoveAccount: "Xóa tài khoản" },
  //     { ViewUser: "Sửa người dùng" },
  //     { RemoveUser: "Xóa người dùng" },
  //   ],
  // },
  // {
  //   name: OGANIZE_USER,
  //   actions: [{ ViewUnit: "Xem đơn vị" }, { RemoveUnit: "Xóa đơn vị" }],
  // },
  // {
  //   name: ROLE,
  //   actions: [
  //     { ViewRole: "Xem vai trò" },
  //     { RemoveRole: "Xóa vai trò" },
  //     { AddEditRole: "Thêm/Sửa vai trò" },
  //   ],
  // },
  // {
  //   name: POSITION,
  //   actions: [
  //     { ViewJobPosition: "Xem vị trí công việc" },
  //     { AddEditJobPosition: "Thêm/sửa vị trí công việc " },
  //     { RemoveJobPosition: "Xóa vị trí công việc " },
  //   ],
  // },
  // {
  //   name: TEMPLATE,
  //   actions: [
  //     { ViewEvaluationTemplate: "Xem mẫu đánh giá" },
  //     { AddEditEvaluationTemplate: "Thêm/Sửa mẫu đánh giá" },
  //     { RemoveEvaluationTemplate: "Xóa mẫu đánh giá" },
  //   ],
  // },
  // {
  //   name: OFFER_TEMPLATE,
  //   actions: [
  //     { ViewOfferTemplate: "Xem mẫu mời làm việc" },
  //     { AddEditOfferTemplate: "Thêm/Sửa mẫu mời làm việc" },
  //     { RemoveOfferTemplate: "Xóa mẫu mời làm việc" },
  //     { CancelInvitation: "Hủy lời mời" },
  //     { SendOfferMail: "Gửi thư mời làm việc" },
  //   ],
  // },
  // {
  //   name: RECRUIT_PROCESS,
  //   actions: [
  //     { AddEditRecruitmentProcess: "Thêm/Sửa Quy trình tuyển dụng" },
  //     { ViewRecruitmentProcess: "Xem Quy trình tuyển dụng" },
  //     { RemoveRecruitmentProcess: "Xóa Quy trình tuyển dụng" },
  //   ],
  // },
  // {
  //   name: APPROVE_PROCESS,
  //   actions: [
  //     { ViewApprovalProcess: "Xem Quy trình phê duyệt" },
  //     { AddEditApprovalProcess: "Thêm/Sửa Quy trình phê duyệt" },
  //     { RemoveApprovalProcess: "Xóa Quy trình phê duyệt" },
  //   ],
  // },
  // {
  //   name: COMPETITION,
  //   actions: [
  //     { ViewExam: "Xem đề thi " },
  //     { ViewQuestion: "Xem câu hỏi" },
  //     { AddCompanyExam: "Thêm đề thi của DN" },
  //     { AddCompanyQuestion: "Thêm câu hỏi DN" },
  //     { CopyExam: "Sao chép đề thi" },
  //     { CopyQuestion: "Sao chép câu hỏi" },
  //     { EditCompanyQuestion: "Sửa câu hỏi DN" },
  //     { RemoveCompanyExam: "Xóa đề thi DN" },
  //     { RemoveCompanyQuestion: "Xóa câu hỏi DN" },
  //     { ViewCompanyExam: "Xem đề thi của DN" },
  //   ],
  // },
  // {
  //   name: AUTOMAIL,
  //   actions: [
  //     { ViewEmail: "Xem email" },
  //     { AddEditEmail: "Thêm/Sửa email" },
  //     { RemoveEmail: "Xóa email" },
  //   ],
  // },
  // {
  //   name: CONNECT,
  //   actions: [
  //     { AddConnect: "Thêm Kết nối" },
  //     { ViewConnect: "Xem Kết nối" },
  //     { Disconnect: "Ngắt kết nối" },
  //   ],
  // },
];
