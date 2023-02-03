// export const API_LOGIN = '/api/login'

export const API_REFRESH_TOKEN = "/api/refreshToken";
// export const API_USER_INFO = '/api/users'
export const API_ADMIN_USER_LIST = "/api/admin/user/list";
export const API_ADMIN_ALL_NOTIFY = "/api/v1/admin/all-notification";
export const API_UPLOAD_AVATAR_PROFILE = "/api/upload/avatar";
export const API_PROFILE = "/api/profile";
export const API_LIST_JOBS = "/api/admin/jobs";
export const API_LIST_JOBS_PROFILE = "/api/job/user/profile";
export const API_ADMIN_READ_ALL_NOTIFY = "/api/read/all/notification";
export const API_LIST_CARD = "/api/v1/cards";
export const API_ADD_CARD = "/api/cards";
export const API_SEARCH_CARD = "/api/v1/search/card";
export const API_LIST_LABEL = "/api/v1/label";
export const API_V1_CARD = "/api/v1/card";
export const API_V1_CARD_LABEL = "/api/v1/card/label";
export const API_LIST_CLIENT = "/api/all/client";
export const API_ADMIN_SEARCH_LIST_JOB = "/api/admin/search/jobs";
export const API_LIST_ACTIVE_JOB = "/api/trello/job/active";
export const API_LIST_USER = "/api/trello/user";
export const API_LIST_PROFILE = "/api/profile";
export const API_LIST_MEMBER = "/api/search/board/members?search=";
export const API_SEARCH_PHONE = "/api/admin/search/phone/candidate";
export const API_SEARCH_EMAIL = "/api/admin/candidate/user";
export const API_REMOVE_ASSIGNMENT = "/api/cards/remove/assignment";
export const API_ASSIGNMENT = "/api/cards/assignment";
export const API_LIST_UPDATE_HISTORY = "/api/history/card";
export const API_LIST_COMMENT = "/api/v1/comment";
export const API_UPLOAD_LINK = "/api/cards/upload/cv";
export const API_ADMIN_CARDS = "/api/admin/cards";
export const API_ADMIN_CLIENTS_LIST = "/api/admin/client";
export const API_SHORT_LINK = "/api/v1/short-link";
export const API_SALARY = "/api/v1/caculator/salary";
export const API_DASHBOARD_JOBS_BY_STATUS = "/api/dashboard/jobs";
export const API_PERFORMANCE = "/api/dashboard/cv";
export const API_WEEKLY_TASKS = "/api/task/team";
export const API_WEEKLY_TASKS_LIST_USER = "/api/task/user";
export const API_WEEKLY_TASKS_UPDATE = "/api/task";
export const API_MEMBER_ACTIVITIES_LAST_LOGIN = "/api/user/lastlogin";
export const API_MEMBER_ACTIVITIES_USER_INFO = "/api/user";
export const API_ADMIN_RECRUITMENT_PROGRESS = "/api/admin/card/recruitment";
export const API_ADMIN_CALENDAR_INTERVIEW = "/api/admin/calendar/interview";
export const API_ALL_SKILL = "/api/all/skill";
export const API_ADMIN_SEARCH_CANDIDATE = "/api/admin/search/candidate";
export const API_ADMIN_DETAIL_CANDIDATE = "/api/admin/candidate/detail";
export const API_ADMIN_DOWNLOAD_CV_PDF = "/api/v1/download/pdf/private";
export const API_ADMIN_PREVIEW_PDF_CANDIDATEJOB =
  "/api/v1/admin/preview/pdf/candidateJob";
export const API_ADMIN_LIST_NEW_APPLICANTS = "/api/admin/applicants/candidate";
export const API_ASSIGNMENT_JOB = "/api/assignment/job";
export const API_ASSIGN_LIST_USER = "/api/assign/list/user";
export const API_CANDIDATE_JOB = "/api/candidate/job";
export const API_LANES = "/api/lanes";
export const API_SEARCH_SKILL = "/api/skill/admin/search";
export const API_ADD_SKILL = "/api/skill";
export const API_LOCATIONS = "/api/location";
export const API_DOWNLOAD_JOB = "/api/download/job";
export const API_HISTORY_JOB = "/api/history/job";
export const API_CREATE_JOB = "/api/jobs";
export const API_LIST_TAGS = "/api/v1/tags";
export const API_JOB_REMOVE_ASSIGNMENT = "/api/remove/assignment";

// New API
export const API_LOGIN = "/identity/Identity/Login"; //new

export const API_USER_INFO = "/identity/Identity/GetApplicationUserByOwner"; //new
//auth
export const API_FORGET_PASSWORD = "/api/Users/ForgetPassword";
export const API_REGISTER = "api/Users/Register";
// Common

// Lấy danh sách phòng ban
export const API_GET_ORGANIZATION = "/api/organization/GetOrganization";

// Lấy danh sách tỉnh / thành phố
export const API_GET_PROVINCE = "/masterData/Province/GetProvinces";
// Lấy danh sách quận / huyện
export const API_GET_DISTRICT = "/masterData/District/GetDistricts";

// Lấy danh sách job category
export const API_GET_JOB_CATEGORIES = "/masterData/JobCategory/GetJobCategories";

// Báo cáo

// Báo cáo kết quả tuyển dụng
export const API_REPORT_RECRUITMENT_RESULT =
  "/api/Report/ReportRecruitmentResult";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT =
  "/api/Report/ReportRecruitmentResultRecruitment";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT_DETAIL =
  "/api/Report/ReportRecruitmentResultRecruitmentDetail";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT_APPLICANT =
  "/api/Report/ReportRecruitmentResultRecruitmentApplicant";

// Báo cáo tỷ lệ chuyển đổi ứng viên
export const API_REPORT_CANDIDATES_CONVENTATION_RATE =
  "/api/Report/ReportCandidatesConventationRate";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_RECRUITMENT =
  "/api/Report/ReportCandidatesConventationRateRecruitment";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_DETAIL =
  "/api/Report/ReportCandidatesConventationRateRecruitmentDetail";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_RECRUITMENT_APPLICANT =
  "/api/Report/ReportCandidatesConventationRateRecruitmentApplicant";

// Báo cáo ứng viên theo thời gian
export const API_REPORT_CANDIDATES_OVERTIME =
  "/api/Report/ReportCandidatesOverTime";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT =
  "/api/Report/ReportCandidatesOverTimeRecruitment";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT_DETAIL =
  "/api/Report/ReportCandidatesOverTimeRecruitmentDetail";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT_APPLICANT =
  "/api/Report/ReportCandidatesOverTimeRecruitmentApplicant";

// Báo cáo theo dõi tin tuyển dụng
export const API_REPORT_FOLLOW_RECRUITMENT =
  "/api/Report/ReportFollowRecruitment";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT =
  "/api/Report/ReportFollowRecruitmentRecruitment";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT_DETAIL =
  "/api/Report/ReportFollowRecruitmentOrganizationDetail";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT_APPLICANT =
  "/api/Report/ReportFollowRecruitmentOrganization";

// Công ty
export const API_GET_BRANCH_BY_ID = "api/Branch/GetBranch";
export const API_GET_BRANCH_BY_USER = "api/Branch/GetByUserId";
export const API_UPDATE_BRANCH = "api/Branch/UpdateBranch";

// Thông báo
export const API_GET_LIST_NOTIFICATION = "api/UserNotifications/GetPaging";
export const API_MASK_READ_NOTIFICATION =
  "api/UserNotifications/MaskAsRead?id=";

// Đổi mật khẩu
export const API_CHANGE_PASSWORD = "api/Users/ChangePassword";

// Mẫu đánh giá
export const API_GET_ALL_REVIEW_FORM = "ReviewForm/GetAllReviewForm";
export const API_GET_ALL_REVIEW_FORM_OWNER =
  "api/Users/GetUsersCreatedReviewForm";
export const API_SET_DEFAULT_REVIEW_FORM = "ReviewForm/SetDefaultReviewForm";
export const API_ADD_REVIEW_FORM = "ReviewForm/InsertReviewForm";
export const API_UPDATE_REVIEW_FORM = "ReviewForm/UpdateReviewForm";
export const API_DELETE_REVIEW_FORM = "ReviewForm/DeleteReviewForm";

// Vị trí công việc
export const API_GET_PAGING_JOBTYPE = "JobType/GetAllSearch";
export const API_UPDATE_STATUS_JOBTYPE = "JobType/UpdateJobTypeStatus";
export const API_GET_PREVIEW_JOBTYPE = "JobType/GetJobTypeById";
export const API_DELETE_JOBTYPE = "JobType/DeleteJobTypeById";
export const API_ADD_JOBTYPE = "JobType/CreateNewJobType";
export const API_UPDATE_JOBTYPE = "JobType/UpdateJobType";

