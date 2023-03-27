// export const API_LOGIN = '/api/login'

export const API_REFRESH_TOKEN = "/api/refreshToken";
// export const API_USER_INFO = '/api/users'
export const API_ADMIN_USER_LIST = "/api/admin/user/list";
export const API_ADMIN_ALL_NOTIFY = "/api/v1/admin/all-notification";
export const API_UPLOAD_AVATAR_PROFILE = "/api/upload/avatar";
export const API_PROFILE = "/api/profile";
// export const API_LIST_JOBS = "/api/admin/jobs";
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

//auth
export const API_REGISTER = "/organization/Organization/CreateOrganizationWithUser";  // new
export const API_LOGIN = "/identity/Identity/Login"; //new
export const API_USER_INFO = "/identity/Identity/GetApplicationUserByOwner"; //new
export const API_CONFIRM_EMAIL = "/identity/Identity/ConfirmEmail";  // new
export const API_FORGET_PASSWORD = "/identity/Identity/ApplicationUserForgetPassword"; //new
export const API_USER_INVITE_SET_PASSWORD = "/identity/Identity/UserInvitedSetPassword"; //new
export const API_CHANGE_PASSWORD_WITH_TOKEN = "/identity/Identity/ChangePasswordWithToken"; //new
export const API_GET_APPLICATION_BY_ROLE_GROUP = "/identity/Identity/GetApplicationUsersByRoleGroup"; // lấy danh sách application theo role groups

// Common

//Ứng viên
export const API_GET_ALL_APPLICANTS = "/applicant/Applicant/GetApplicants"; //new lấy danh sách ứng viên
export const API_GET_FILTER_ALL_APPLICANTS =
  "/applicant/ApplicantRecruitment/FilterApplicantRecruitments";
export const API_UPLOAD_FILE_APPLICANTS =
  "/applicant/ApplicantRecruitment/UploadApplicantFile"; // new lấy danh sách ứng viên
export const API_GET_COLUMN_APPLICANTS =
  "/aggregator/ApplicantRecruitmentVisible/GetApplicantRecruitmentVisible"; //new lấy danh sách cột
export const API_UPDATE_COLUMN_APPLICANTS =
  "/aggregator/ApplicantRecruitmentVisible/UpdateApplicantRecruitmentVisible"; //new sửa danh sách cột
export const API_GET_APPLICANTS_BY_ID = "/applicant/Applicant/GetApplicant"; //lấy thông tin ứng viên theo id
export const API_GET_RECRUITMENTS_BY_APPLICANT = "/recruitment/Recruitment/GetRecruitmentsByApplicant"; //lấy list tin tuyển dụng theo ứng viên và đơn vị
export const API_GET_APPLICANT_RECRUITMENT = "/applicant/ApplicantRecruitment/GetApplicantRecruitment"; //Lịch sử uv
export const API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT = "/recruitment/Recruitment/GetRecruitmentPipelineStatesByRecruitment"; //List bước tuyển dụng
export const API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES = "/applicant/ApplicantRecruitment/GetApplicantCurrentStateWithRecruitmentStates"; //List pipeline và trạng thái UV theo TTD
export const API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE = "/applicant/ApplicantRecruitment/UpdateApplicantRecruitmentToNextState"; //Chuyển bước uv
export const API_GET_APPLICANT_BY_PIPELINESTETEID ="/applicant/ApplicantRecruitment/GetApplicantByPipelineStateId"
export const API_UPDATE_APPLICANT = "/applicant/Applicant/UpdateApplicant";

export const API_GET_APPLICANT_SKILLS = "/applicant/ApplicantSkill/GetApplicantSkills";
//Tin tuyển dụng
export const API_LIST_JOBS = "/api/recruitment/Recruitment/GetRecruitments"; //new  danh sách tin
// Lấy danh sách đơn vị/tổ chức
export const API_GET_ORGANIZATION = "/organization/Organization/GetOrganization";
export const API_GET_ORGANIZATION_WITH_CHILD = "/organization/Organization/GetOrganizationsLessDataWithChild"; // lấy danh sách đơn vị để đổ dữ liệu dạng cây
export const API_GET_ORGANIZATION_DETAIL_BY_ID = "/organization/Organization/GetOrganizationDetailById"; // lấy chi tiết thông tin đơn vị
export const API_GET_ORGANIZATION_DETAIL_BY_SLUG = "/organization/Organization/GetOrganizationBySlug"; // lấy chi tiết thông tin đơn vị
export const API_GET_ORGANIZATION_PREVIEW = "/organization/Organization/GetOrganizationPreview"; // lấy chi tiết thông tin đơn vị
export const API_CREATE_CHILD_ORGANIZATION = "/organization/Organization/CreateChildOrganization"; // tạo đơn vị
export const API_UPDATE_ORGANIZATION = "/organization/Organization/UpdateOrganizationData"; // cập nhật thông tin đơn vị
export const API_DELETE_ORGANIZATION = "/organization/Organization/RemoveOrganizationById"; // xóa đơn vị
export const API_DELETE_MULTIPLE_ORGANIZATION = "/organization/Organization/RemoveOrganizations"; // xóa nhiều đơn vị
export const API_SET_ACTIVE_ORGANIZATION = "/organization/Organization/SetOrganizationsActive"; // xóa nhiều đơn vị
export const API_GET_ALL_ADMIN_ORGANIZATION = "/organization/Organization/GetApplicantUsersAdmin"; // lấy danh sách admin
export const API_GET_ALL_USER_BY_ORGANIZATION = "/organization/Organization/GetApplicationUserByOrganizationId"; // lấy danh sách người dùng theo đơn vị
export const API_INVITE_USER = "/organization/OrganizationUserInvite/CreateOrganizationUserInvites";
export const API_USER_CONFIRM_INVITE = "/identity/Identity/UserInvitedActive";
export const API_GET_LIST_USER_INVITE = "/organization/OrganizationUserInvite/GetOrganizationUserInvites";
export const API_UPDATE_ORGANIZATION_HUMAN = '/organization/OrganizationHuman/UpdateOrganizationHuman'
export const API_UPDATE_ORGANIZATION_BUSINESS = 'organization/OrganizationBusiness/UpdateOrganizationBusiness'
export const API_UPDATE_ORGANIZATION_PIPELINE ='organization/OrganizationProfilePipeline/UpdateOrganizationProfilePipelines'
export const API_UPDATE_ORGANIZATION_ENDING = 'organization/Organization/UpdateOrganization'
export const API_ADD_ORGANIZATION_BUSINESS='organization/OrganizationBusiness/CreateOrganizationBusiness'
//Role
export const API_GET_ROLE = '/identity/Role/GetRoles'
// Role Group
export const API_GET_LIST_ROLE_GROUP = "/identity/RoleGroup/GetRoleGroups"; // lấy danh sách role
export const API_ADD_ROLE_GROUP = "/identity/RoleGroup/CreateRoleGroup"
export const API_REMOVE_ROLE_GROUP ='/Identity/RoleGroup/RemoveRoleGroups'


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

// Thông tin công ty
export const API_GET_COMPANY_INFOR = 'organization/Organization/GetOrganization';
export const API_GET_COMPANY_INFOR_BY_IDS = 'organization/Organization/GetOrganizationIds'
export const API_UPDATE_COMPANY_INFOR = 'organization/OrganizationInformation/UpdateOrganizationInformation'
export const API_UPLOAD_IMAGE ='organization/Organization/OrganizationUploadImage'
// Thông báo
export const API_GET_LIST_NOTIFICATION = "/UserNotifications/GetPaging";
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
export const API_GET_PAGING_JOBTYPE = "recruitment/JobPosition/GetJobPositions";//new
export const API_GET_DETAIL_JOB_POSITION = "/recruitment/JobPosition/GetJobPosition";//new
export const API_UPDATE_STATUS_JOBTYPE = "recruitment/JobPosition/SetJobPositionsActivated";
export const API_GET_PREVIEW_JOBTYPE = "JobType/GetJobTypeById";
export const API_DELETE_JOBTYPE = "JobType/DeleteJobTypeById";
export const API_ADD_JOBTYPE = "/recruitment/JobPosition/CreateJobPosition";
export const API_UPDATE_JOBTYPE = "/recruitment/JobPosition/UpdateJobPosition";
export const API_GET_APPLICANT_USERS_ON_JOBTYPE = "/recruitment/JobPosition/GetApplicationUsersOnJobPosition";

// Pipeline
export const API_GET_ALL_PIPELINE = "/organization/OrganizationPipeline/GetOrganizationPipelineFilter"; //new
export const API_GET_PIPELINE_BY_ID = "/organization/OrganizationPipeline/GetOrganizationPipeline";
export const API_GET_ALL_RECRUITMENT_STEP_PIPELINE = "/organization/OrganizationPipeline/GetOrganizationPipeline";

export const API_GET_ALL_PIPELINE_BY_ORGANIZATION = "/organization/OrganizationPipeline/GetOrganizationPipelineByOrganization"; //new
export const API_SET_ORGANIZATION_PIPELINE_ACTIVE = "/organization/OrganizationPipeline/SetOrganizationPipelinesActive"; // bật tắt trạng thái hoạt động
export const API_ADD_PIPELINE = "organization/OrganizationPipeline/CreateOrganizationPipeline";//new
export const API_UPDATE_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipeline";//new
export const API_DELETE_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipeline";//new

// API Application page
// recruitment tin tuyển dụng
export const API_GET_RECRUITMENT_BY_ID = "/recruitment/Recruitment/GetRecruitment"; // get recruitment by id
export const API_GET_RECRUITMENT_BY_SLUG = "/recruitment/Recruitment/GetRecruitmentBySlug"; // get recruitment by slug
export const API_GET_LIST_RECRUITMENT = "/recruitment/Recruitment/GetRecruitments"; // get all recruitment
export const API_GET_RECRUITMENT_BY_ORGANIZATION = "/recruitment/Recruitment/GetRecruitmentByOrganizationId" // new - get recruitment by organization
export const API_CREATE_RECRUITMENT = "/recruitment/Recruitment/CreateRecruitment" // new - create recruitment
export const API_UPDATE_RECRUITMENT_OFFICIAL = "/recruitment/Recruitment/UpdateRecruitment" // new - update recruitment official
export const API_UPDATE_RECRUITMENT_DRAFT = "/recruitment/Recruitment/SetRecruitmentDraftOrOfficial" // new - update recruitment draft
export const API_CREATE_APPLICANT_RECRUITMENT = "/applicant/ApplicantRecruitment/CreateApplicantRecruitment"
// duyệt tin
export const API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT = "/recruitment/Recruitment/InternalGetWaitingApprovalRecruitments"; // list tin cần iviec duyệt
export const API_INTERNAL_APPROVAL_RECRUITMANT = "/recruitment/Recruitment/InternalApprovalRecruitments"; // phê duyệt nhiều tin
export const API_REJECT_RECRUITMENT = "/recruitment/Recruitment/RejectRecruitment"; // phê duyệt nhiều tin
export const API_CLOSE_RECRUITMENT = "/recruitment/Recruitment/CloseRecruitments"; // đóng nhiều tin tuyển dụng
export const API_REMOVE_RECRUITMENT = "/recruitment/Recruitment/CloseRecruitments"; // xóa nhiều tin tuyển dụng

// job source nguồn job

// get user from organization
export const API_GET_USER_FROM_ORGANIZATION = "/organization/Organization/GetApplicationUserByOrganizationId";
export const API_GET_ADD_APPLICANT_TO_RECRUITMENT = "/applicant/ApplicantRecruitment/AddApplicantsToRecruitment";
// API ApproveProcess
export const API_CREATE_APPROVE_PROCESS = "/organization/ApprovalProcess/CreateApprovalProcess";
export const API_UPDATE_APPROVE_PROCESS = "/organization/ApprovalProcess/UpdateApprovalProcess";
export const API_DELETE_APPROVE_PROCESS = "/organization/ApprovalProcess/RemoveApprovalProcess";
export const API_GET_APPROVE_PROCESSES = "/organization/ApprovalProcess/GetApprovalProcesses";
export const API_GET_APPROVE_PROCESS = "/organization/ApprovalProcess/GetApprovalProcess";

// API master data
export const API_GET_LIST_CANDIDATELEVEL = "/masterData/CandidateLevel/GetCandidateLevels"
export const API_GET_LIST_LANGUAGE = "/masterData/Language/GetLanguages"
export const API_GET_LIST_JOB_SOURCE = "/masterData/JobSource/GetJobSources"
// Lấy danh sách tỉnh / thành phố
export const API_GET_PROVINCE = "/masterData/Province/GetProvinces";
// Lấy danh sách quận / huyện
export const API_GET_DISTRICT = "/masterData/District/GetDistricts";
// Lấy danh sách job category
export const API_GET_JOB_CATEGORIES = "/masterData/JobCategory/GetJobCategories";



//ĐẶT LỊCH
export const API_POST_BOOK_CALENDAR = 'applicant/BookingCalendar/CreateBookingCalendar'
// Thi tuyển
export const API_GET_EXAMINATION = "/examination/Examination/GetExaminations";
