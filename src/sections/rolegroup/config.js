export const CANDIDATE = "Quản lý ứng viên";
export const EMPLOY_NEWS = "Quản lý tin tuyển dụng";
export const CAMPAIGN = "Quản lý tin tuyển dụng";
export const INTERVIEW_SCHEDULE = "Lịch phỏng vấn";
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
    actions: {
      ViewCandidate: { name: "Xem ứng viên" },
      AddCandidate: { name: "Thêm ứng viên" },
      EditCandidate: { name: "Sửa ứng viên" },
      RemoveCandidate: { name: "Xóa ứng viên" },
      ShareCandidate: { name: "Chia sẻ ứng viên" },
      EvaluateCandidate: { name: "Đánh giá ứng viên" },
      ChangeCandidateStage: { name: "Chuyển bước ứng viên" },
    },
  },
  {
    name: EMPLOY_NEWS,
    actions: {
      ViewJob: { name: "Xem tin tuyển dụng" },
      EditJob: { name: "Sửa tin tuyển dụng" },
      RemoveJob: { name: "Xóa tin tuyển dụng" },
      ExportJob: { name: "Export tin tuyển dụng" },
      ApproveRejectJob: { name: "Phê duyệt/ Từ chối tin tuyển dụng" },
      ChangeStatus: { name: "Thay đổi trạng thái tin tuyển dụng" },
      CopyJob: { name: "Sao chép tin tuyển dụng" },
    },
  },
  {
    name: INTERVIEW_SCHEDULE,
    actions: {
      ViewInterviewSchedule: { name: "Xem lịch phỏng vấn" },
      ScheduleInterview: { name: "Thêm/sửa/hủy lịch phỏng vấn" },
      EditInterviewSchedule: { name: "Sửa lịch phỏng vấn" },
      CancelInterviewSchedule: { name: "Hủy lịch phỏng vấn" },
    },
  },
  {
    name: CANDIDATE_STORE,
    actions: {
      ExportCandidate: { name: "Export ứng viên" },
      ImportCandidate: { name: "Import ứng viên vào tin tuyển dụng" },
    },
  },
  {
    name: REPORT,
    actions: {
      ReportIViecExam: { name: "Báo cáo đề thi IVIEC" },
      ReportIViecQuestion: { name: "Báo cáo câu hỏi IVIEC" },
    },
  },
  {
    name: COMPANY_INFO,
    actions: {
      Administrator: { name: "Quản trị" },
      Organization: { name: "Tổ chức" },
      InviteInterviewCommittee: { name: "Mời hội đồng phỏng vấn" },
      ParticipateInterviewSchedule: { name: "Tham gia phỏng vấn" },
      RemoveAccount: { name: "Xóa tài khoản" },
      ViewUser: { name: "Xem người dùng" },
      EditUser: { name: "Sửa người dùng" },
      RemoveUser: { name: "Xóa người dùng" },
    },
  },
  {
    name: OGANIZE_USER,
    actions: {
      ViewUnit: { name: "Xem đơn vị" },
      RemoveUnit: { name: "Xóa đơn vị" },
    },
  },
  {
    name: ROLE,
    actions: {
      ViewRole: { name: "Xem vai trò" },
      RemoveRole: { name: "Xóa vai trò" },
      AddEditRole: { name: "Thêm/Sửa vai trò" },
    },
  },
  {
    name: POSITION,
    actions: {
      ViewJobPosition: { name: "Xem vị trí công việc" },
      AddEditJobPosition: { name: "Thêm/sửa vị trí công việc " },
      RemoveJobPosition: { name: "Xóa vị trí công việc " },
    },
  },
  {
    name: TEMPLATE,
    actions: {
      ViewEvaluationTemplate: { name: "Xem mẫu đánh giá" },
      AddEditEvaluationTemplate: { name: "Thêm/Sửa mẫu đánh giá" },
      RemoveEvaluationTemplate: { name: "Xóa mẫu đánh giá" },
    },
  },
  {
    name: OFFER_TEMPLATE,
    actions: {
      ViewOfferTemplate: { name: "Xem mẫu mời làm việc" },
      AddEditOfferTemplate: { name: "Thêm/Sửa mẫu mời làm việc" },
      RemoveOfferTemplate: { name: "Xóa mẫu mời làm việc" },
      CancelInvitation: { name: "Hủy lời mời" },
      SendOfferMail: { name: "Gửi thư mời làm việc" },
    },
  },
  {
    name: RECRUIT_PROCESS,
    actions: {
      AddEditRecruitmentProcess: { name: "Thêm/Sửa Quy trình tuyển dụng" },
      ViewRecruitmentProcess: { name: "Xem Quy trình tuyển dụng" },
      RemoveRecruitmentProcess: { name: "Xóa Quy trình tuyển dụng" },
    },
  },
  {
    name: APPROVE_PROCESS,
    actions: {
      ViewApprovalProcess: { name: "Xem Quy trình phê duyệt" },
      AddEditApprovalProcess: { name: "Thêm/Sửa Quy trình phê duyệt" },
      RemoveApprovalProcess: { name: "Xóa Quy trình phê duyệt" },
    },
  },
  {
    name: COMPETITION,
    actions: {
      ViewExam: { name: "Xem đề thi " },
      ViewQuestion: { name: "Xem câu hỏi" },
      AddCompanyExam: { name: "Thêm đề thi của DN" },
      AddCompanyQuestion: { name: "Thêm câu hỏi DN" },
      CopyExam: { name: "Sao chép đề thi" },
      CopyQuestion: { name: "Sao chép câu hỏi" },
      EditCompanyQuestion: { name: "Sửa câu hỏi DN" },
      RemoveCompanyExam: { name: "Xóa đề thi DN" },
      RemoveCompanyQuestion: { name: "Xóa câu hỏi DN" },
      ViewCompanyExam: { name: "Xem đề thi của DN" },
    },
  },
  {
    name: AUTOMAIL,
    actions: {
      ViewEmail: { name: "Xem email" },
      AddEditEmail: { name: "Thêm/Sửa email" },
      RemoveEmail: { name: "Xóa email" },
    },
  },
  {
    name: CONNECT,
    actions: {
      AddConnect: { name: "Thêm Kết nối" },
      ViewConnect: { name: "Xem Kết nối" },
      Disconnect: { name: "Ngắt kết nối" },
    },
  },
];
