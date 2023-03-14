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
export const API_ADMIN_PREVIEW_PDF_CANDIDATEJOB = "/api/v1/admin/preview/pdf/candidateJob";
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
export const API_REGISTER = "/organization/Organization/CreateOrganizationWithUser";  // new
export const API_CONFIRM_EMAIL = "/identity/Identity/ConfirmEmail";  // new
export const API_FORGET_PASSWORD = "/identity/Identity/ApplicationUserForgetPassword"; //new
export const API_CHANGE_PASSWORD_WITH_TOKEN = "/identity/Identity/ChangePasswordWithToken"; //new
// Common

//Ứng viên
export const API_GET_ALL_APPLICANTS = "/applicant/Applicant/GetApplicants"; //new lấy danh sách ứng viên
export const API_GET_FILTER_ALL_APPLICANTS = "/applicant/ApplicantRecruitment/FilterApplicantRecruitments"; // new lấy danh sách ứng viên
export const API_GET_COLUMN_APPLICANTS = "/aggregator/ApplicantRecruitmentVisible/GetApplicantRecruitmentVisible"; //new lấy danh sách cột
export const API_UPDATE_COLUMN_APPLICANTS = "/aggregator/ApplicantRecruitmentVisible/UpdateApplicantRecruitmentVisible"; //new sửa danh sách cột
export const API_GET_APPLICANTS_BY_ID = "/applicant/Applicant/GetApplicant"; //lấy thông tin ứng viên theo id
export const API_GET_RECRUITMENTS_BY_APPLICANT = "/recruitment/Recruitment/GetRecruitmentsByApplicant"; //lấy list tin tuyển dụng theo ứng viên và đơn vị
export const API_GET_APPLICANT_RECRUITMENT = "/applicant/ApplicantRecruitment/GetApplicantRecruitment"; //Lịch sử uv
export const API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT = "/recruitment/Recruitment/GetRecruitmentPipelineStatesByRecruitment"; //List bước tuyển dụng
export const API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES = "/applicant/ApplicantRecruitment/GetApplicantCurrentStateWithRecruitmentStates"; //List pipeline và trạng thái UV theo TTD
export const API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE = "/applicant/ApplicantRecruitment/UpdateApplicantRecruitmentToNextState"; //Chuyển bước uv

export const API_GET_APPLICANT_SKILLS = "/applicant/ApplicantSkill/GetApplicantSkills";
//Tin tuyển dụng
export const API_LIST_JOBS = "/api/recruitment/Recruitment/GetRecruitments"; //new  danh sách tin
// Lấy danh sách đơn vị/tổ chức
export const API_GET_ORGANIZATION = "/organization/Organization/GetOrganization";
export const API_GET_ORGANIZATION_WITH_CHILD = "/organization/Organization/GetOrganizationsLessDataWithChild"; // lấy danh sách đơn vị để đổ dữ liệu dạng cây
export const API_GET_ORGANIZATION_DETAIL_BY_ID = "/organization/Organization/GetOrganizationDetailById"; // lấy chi tiết thông tin đơn vị
export const API_CREATE_CHILD_ORGANIZATION = "/organization/Organization/CreateChildOrganization"; // tạo đơn vị
export const API_UPDATE_ORGANIZATION = "/organization/Organization/UpdateOrganization"; // cập nhật thông tin đơn vị
export const API_DELETE_ORGANIZATION = "/organization/Organization/RemoveOrganizationById"; // xóa đơn vị
export const API_DELETE_MULTIPLE_ORGANIZATION = "/organization/Organization/RemoveOrganizations"; // xóa nhiều đơn vị
export const API_SET_ACTIVE_ORGANIZATION = "/organization/Organization/SetOrganizationsActive"; // xóa nhiều đơn vị
export const API_GET_ALL_ADMIN_ORGANIZATION = "/organization/Organization/GetApplicantUsersAdmin"; // lấy danh sách admin
export const API_GET_ALL_USER_BY_ORGANIZATION = "/organization/Organization/GetApplicationUserByOrganizationId"; // lấy danh sách người dùng theo đơn vị



//Role
export const API_GET_ROLE = '/identity/Role/GetRoles'
// Role Group
export const API_GET_LIST_ROLE_GROUP = "/identity/RoleGroup/GetRoleGroups"; // lấy danh sách role
export const API_ADD_ROLE_GROUP = "/identity/RoleGroup/CreateRoleGroup"
export const API_REMOVE_ROLE_GROUP ='/Identity/RoleGroup/RemoveRoleGroups'

// Lấy danh sách tỉnh / thành phố
export const API_GET_PROVINCE = "/masterData/Province/GetProvinces";
// Lấy danh sách quận / huyện
export const API_GET_DISTRICT = "/masterData/District/GetDistricts";

// Lấy danh sách job category
export const API_GET_JOB_CATEGORIES = "/masterData/JobCategory/GetJobCategories";

// Báo cáo

// Báo cáo kết quả tuyển dụng
export const API_REPORT_RECRUITMENT_RESULT = "/api/Report/ReportRecruitmentResult";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT = "/api/Report/ReportRecruitmentResultRecruitment";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT_DETAIL = "/api/Report/ReportRecruitmentResultRecruitmentDetail";
export const API_REPORT_RECRUITMENT_RESULT_RECRUITMENT_APPLICANT = "/api/Report/ReportRecruitmentResultRecruitmentApplicant";

// Báo cáo tỷ lệ chuyển đổi ứng viên
export const API_REPORT_CANDIDATES_CONVENTATION_RATE = "/api/Report/ReportCandidatesConventationRate";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_RECRUITMENT = "/api/Report/ReportCandidatesConventationRateRecruitment";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_DETAIL = "/api/Report/ReportCandidatesConventationRateRecruitmentDetail";
export const API_REPORT_CANDIDATES_CONVENTATION_RATE_RECRUITMENT_APPLICANT = "/api/Report/ReportCandidatesConventationRateRecruitmentApplicant";

// Báo cáo ứng viên theo thời gian
export const API_REPORT_CANDIDATES_OVERTIME = "/api/Report/ReportCandidatesOverTime";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT = "/api/Report/ReportCandidatesOverTimeRecruitment";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT_DETAIL = "/api/Report/ReportCandidatesOverTimeRecruitmentDetail";
export const API_REPORT_CANDIDATES_OVERTIME_RECRUITMENT_APPLICANT = "/api/Report/ReportCandidatesOverTimeRecruitmentApplicant";

// Báo cáo theo dõi tin tuyển dụng
export const API_REPORT_FOLLOW_RECRUITMENT = "/api/Report/ReportFollowRecruitment";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT = "/api/Report/ReportFollowRecruitmentRecruitment";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT_DETAIL = "/api/Report/ReportFollowRecruitmentOrganizationDetail";
export const API_REPORT_FOLLOW_RECRUITMENT_RECRUITMENT_APPLICANT = "/api/Report/ReportFollowRecruitmentOrganization";

// Công ty
export const API_GET_BRANCH_BY_ID = "api/Branch/GetBranch";
export const API_GET_BRANCH_BY_USER = "api/Branch/GetByUserId";
export const API_UPDATE_BRANCH = "api/Branch/UpdateBranch";

// Thông tin công ty
export const API_GET_COMPANY_INFOR = 'organization/Organization/GetOrganization';
export const API_GET_COMPANY_INFOR_BY_IDS = 'organization/Organization/GetOrganizationIds'
export const API_UPDATE_COMPANY_INFOR = 'organization/Organization/UpdateOrganization'
export const API_GET_IMAGE ='Image/GetImage'
// Thông báo
export const API_GET_LIST_NOTIFICATION = "api/UserNotifications/GetPaging";
export const API_MASK_READ_NOTIFICATION = "api/UserNotifications/MaskAsRead?id=";

// Đổi mật khẩu
export const API_CHANGE_PASSWORD = "api/Users/ChangePassword";

// Mẫu đánh giá
export const API_GET_ALL_REVIEW_FORM = "ReviewForm/GetAllReviewForm";
export const API_GET_ALL_REVIEW_FORM_OWNER = "api/Users/GetUsersCreatedReviewForm";
export const API_SET_DEFAULT_REVIEW_FORM = "ReviewForm/SetDefaultReviewForm";
export const API_ADD_REVIEW_FORM = "ReviewForm/InsertReviewForm";
export const API_UPDATE_REVIEW_FORM = "ReviewForm/UpdateReviewForm";
export const API_DELETE_REVIEW_FORM = "ReviewForm/DeleteReviewForm";

// Vị trí công việc
export const API_GET_PAGING_JOBTYPE = "recruitment/JobPosition/GetJobPositions";//new
export const API_UPDATE_STATUS_JOBTYPE = "JobType/UpdateJobTypeStatus";
export const API_GET_PREVIEW_JOBTYPE = "JobType/GetJobTypeById";
export const API_DELETE_JOBTYPE = "JobType/DeleteJobTypeById";
export const API_ADD_JOBTYPE = "/recruitment/JobPosition/CreateJobPosition";
export const API_UPDATE_JOBTYPE = "/recruitment/JobPosition/UpdateJobPosition";
export const API_GET_APPLICANT_USERS_ON_JOBTYPE = "/recruitment/JobPosition/GetApplicationUsersOnJobPosition";

// Pipeline
export const API_GET_ALL_PIPELINE = "/organization/OrganizationPipeline/GetOrganizationPipelineFilter"; //new
export const API_SET_DEFAULT_PIPELINE = "ReviewForm/SetDefaultReviewForm"; // bật tắt trạng thái hoạt động
export const API_ADD_PIPELINE = "organization/OrganizationPipeline/CreateOrganizationPipeline";//new
export const API_UPDATE_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipeline";//new
export const API_DELETE_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipeline";//new

// API Application page
// recruitment tin tuyển dụng
export const API_GET_LIST_RECRUITMENT = "/recruitment/Recruitment/GetRecruitments"; // get all recruitment
export const API_GET_RECRUITMENT_BY_ORGANIZATION = "/recruitment/Recruitment/GetRecruitmentByOrganizationId" // new - get recruitment by organization

// job source nguồn job
export const API_GET_LIST_JOB_SOURCE = "/masterData/JobSource/GetJobSources"

// get user from organization
export const API_GET_USER_FROM_ORGANIZATION = "/organization/Organization/GetApplicationUserByOrganizationId";
export const API_GET_LIST_LANGUAGE = "/masterData/Language/GetLanguages"