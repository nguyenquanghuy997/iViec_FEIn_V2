// API master data
export const API_GET_LIST_CANDIDATELEVEL = "/masterData/CandidateLevel/GetCandidateLevels"
export const API_GET_LIST_LANGUAGE = "/masterData/Language/GetLanguages"
export const API_GET_LIST_JOB_SOURCE = "/masterData/JobSource/GetJobSources"
export const API_GET_PROVINCE = "/masterData/Province/GetProvinces";
export const API_GET_DISTRICT = "/masterData/District/GetDistricts";
export const API_GET_JOB_CATEGORIES = "/masterData/JobCategory/GetJobCategories";

// Ko rõ
export const API_ADMIN_USER_LIST = "/api/admin/user/list";
export const API_LIST_CARD = "/api/v1/cards";
export const API_ADD_CARD = "/api/cards";
export const API_V1_CARD = "/api/v1/card";
export const API_V1_CARD_LABEL = "/api/v1/card/label";
export const API_ADMIN_SEARCH_LIST_JOB = "/api/admin/search/jobs";
export const API_REMOVE_ASSIGNMENT = "/api/cards/remove/assignment";
export const API_ASSIGNMENT = "/api/cards/assignment";
export const API_ADMIN_CARDS = "/api/admin/cards";
export const API_ADMIN_CALENDAR_INTERVIEW = "/api/admin/calendar/interview";
export const API_ALL_SKILL = "/api/all/skill";

//auth
export const API_REFRESH_TOKEN = "/api/refreshToken";
export const API_REGISTER = "/organization/Organization/CreateOrganizationWithUser";
export const API_LOGIN = "/identity/Identity/Login";
export const API_USER_INFO = "/identity/Identity/GetApplicationUserByOwner";
export const API_CONFIRM_EMAIL = "/identity/Identity/ConfirmEmail";
export const API_FORGET_PASSWORD = "/identity/Identity/ApplicationUserForgetPassword";
export const API_USER_INVITE_SET_PASSWORD = "/identity/Identity/UserInvitedSetPassword";
export const API_CHANGE_PASSWORD = "/identity/Identity/ChangePassword";
export const API_CHANGE_PASSWORD_WITH_TOKEN = "/identity/Identity/ChangePasswordWithToken";
export const API_GET_APPLICATION_BY_ROLE_GROUP = "/identity/Identity/GetApplicationUsersByRoleGroup";


//Ứng viên
export const API_GET_ALL_APPLICANTS = "/applicant/Applicant/GetApplicants";
export const API_GET_FILTER_ALL_APPLICANTS = "/applicant/ApplicantRecruitment/FilterApplicantRecruitments";
export const API_UPLOAD_FILE_APPLICANTS = "/applicant/ApplicantRecruitment/UploadApplicantFile";
export const API_GET_COLUMN_APPLICANTS = "/aggregator/ApplicantRecruitmentVisible/GetApplicantRecruitmentVisible";
export const API_UPDATE_COLUMN_APPLICANTS = "/aggregator/ApplicantRecruitmentVisible/UpdateApplicantRecruitmentVisible";
export const API_GET_APPLICANTS_BY_ID = "/applicant/Applicant/GetApplicant";
export const API_GET_RECRUITMENTS_BY_APPLICANT = "/recruitment/Recruitment/GetRecruitmentsByApplicant";
export const API_GET_APPLICANT_RECRUITMENT = "/applicant/ApplicantRecruitment/GetApplicantRecruitment";
export const API_GET_RECRUITMENT_PIPELINE_STATES_BY_RECRUITMENT = "/recruitment/Recruitment/GetRecruitmentPipelineStatesByRecruitment";
export const API_GET_APPLICANT_CURRENT_STAGE_WITH_RECRUITMENT_STATES = "/applicant/ApplicantRecruitment/GetApplicantCurrentStateWithRecruitmentStates";
export const API_UPDATE_APPLICANT_RECRUITMENT_TO_NEXT_STATE = "/applicant/ApplicantRecruitment/UpdateApplicantRecruitmentToNextState";
export const API_GET_APPLICANT_BY_PIPELINESTETEID ="/applicant/ApplicantRecruitment/GetApplicantByPipelineStateId"
export const API_UPDATE_APPLICANT = "/applicant/Applicant/UpdateApplicant";
export const API_GET_APPLICANT_SKILLS = "/applicant/ApplicantSkill/GetApplicantSkills";

// Lấy danh sách đơn vị/tổ chức
export const API_GET_ORGANIZATION = "/organization/Organization/GetOrganization";
export const API_GET_ORGANIZATION_WITH_CHILD = "/organization/Organization/GetOrganizationsLessDataWithChild";
export const API_GET_ORGANIZATION_DETAIL_BY_ID = "/organization/Organization/GetOrganizationDetailById";
export const API_GET_ORGANIZATION_DETAIL_BY_SLUG = "/organization/Organization/GetOrganizationBySlug";
export const API_GET_ORGANIZATION_PREVIEW = "/organization/Organization/GetOrganizationPreview";
export const API_CREATE_CHILD_ORGANIZATION = "/organization/Organization/CreateChildOrganization";
export const API_UPDATE_ORGANIZATION = "/organization/Organization/UpdateOrganizationData";
export const API_DELETE_ORGANIZATION = "/organization/Organization/RemoveOrganizationById";
export const API_DELETE_MULTIPLE_ORGANIZATION = "/organization/Organization/RemoveOrganizations";
export const API_SET_ACTIVE_ORGANIZATION = "/organization/Organization/SetOrganizationsActive";
export const API_GET_ALL_ADMIN_ORGANIZATION = "/organization/Organization/GetApplicantUsersAdmin";

// mời người dùng
export const API_INVITE_USER = "/organization/OrganizationUserInvite/CreateOrganizationUserInvites";
export const API_USER_CONFIRM_INVITE = "/identity/Identity/UserInvitedActive";
export const API_GET_LIST_USER_INVITE = "/organization/OrganizationUserInvite/GetOrganizationUserInvites";
export const API_DELETE_INVITE_USER = "/organization/OrganizationUserInvite/RemoveOrganizationUserInvite";
export const API_RESEND_INVITE_USER = "/organization/OrganizationUserInvite/ResendOrganizationUserInvite";

// Pipeline
export const API_GET_ALL_PIPELINE = "/organization/OrganizationPipeline/GetOrganizationPipelineFilter";
export const API_GET_PIPELINE_BY_ID = "/organization/OrganizationPipeline/GetOrganizationPipeline";
export const API_GET_ALL_RECRUITMENT_STEP_PIPELINE = "/organization/OrganizationPipeline/GetOrganizationPipeline";
export const API_GET_ALL_PIPELINE_BY_ORGANIZATION = "/organization/OrganizationPipeline/GetOrganizationPipelineByOrganization";
export const API_SET_ORGANIZATION_PIPELINE_ACTIVE = "/organization/OrganizationPipeline/SetOrganizationPipelinesActive";
export const API_ADD_PIPELINE = "organization/OrganizationPipeline/CreateOrganizationPipeline";
export const API_UPDATE_PIPELINE = "organization/OrganizationPipeline/UpdateOrganizationPipeline";
export const API_DELETE_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipelines";
export const API_GET_COLUMN_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipelines";
export const API_UPDATE_COLUMN_PIPELINE = "organization/OrganizationPipeline/RemoveOrganizationPipelines";

//Role
export const API_GET_ROLE = '/identity/Role/GetRoles'
// Role Group
export const API_GET_LIST_ROLE_GROUP = "/identity/RoleGroup/GetRoleGroups";
export const API_ADD_ROLE_GROUP = "/identity/RoleGroup/CreateRoleGroup"
export const API_UPDATE_ROLE_GROUP = '/identity/RoleGroup/UpdateRoleGroup'
export const API_REMOVE_ROLE_GROUP ='/Identity/RoleGroup/RemoveRoleGroups'
export const API_GET_COLUMN_ROLE = "/aggregator/OrganizationRoleVisible/GetOrganizationsRoleVisible";
export const API_UPDATE_COLUMN_ROLE = "/aggregator/OrganizationPositionVisible/UpdateOrganizationRoleVisible";


// Thông tin công ty
export const API_GET_COMPANY_INFOR = 'organization/Organization/GetOrganization';
export const API_GET_COMPANY_INFOR_BY_IDS = 'organization/Organization/GetOrganizationIds'
export const API_UPDATE_COMPANY_INFOR = 'organization/OrganizationInformation/UpdateOrganizationInformation'
export const API_UPLOAD_IMAGE ='organization/Organization/OrganizationUploadImage'
export const API_UPDATE_ORGANIZATION_HUMAN = '/organization/OrganizationHuman/UpdateOrganizationHuman'
export const API_UPDATE_ORGANIZATION_BUSINESS = 'organization/OrganizationBusiness/UpdateOrganizationBusiness'
export const API_UPDATE_ORGANIZATION_PIPELINE ='organization/OrganizationProfilePipeline/UpdateOrganizationProfilePipelines'
export const API_UPDATE_ORGANIZATION_ENDING = 'organization/Organization/UpdateOrganization'
export const API_ADD_ORGANIZATION_BUSINESS='organization/OrganizationBusiness/CreateOrganizationBusiness'
export const API_GET_USER_FROM_ORGANIZATION = "/organization/Organization/GetApplicationUserByOrganizationId";


// Vị trí công việc
export const API_GET_PAGING_JOBTYPE = "recruitment/JobPosition/GetJobPositions";
export const API_GET_DETAIL_JOB_POSITION = "/recruitment/JobPosition/GetJobPosition";
export const API_UPDATE_STATUS_JOBTYPE = "/recruitment/JobPosition/SetJobPositionsActivated";
export const API_GET_PREVIEW_JOBTYPE = "JobType/GetJobTypeById";
export const API_DELETE_JOBTYPE = "/recruitment/JobPosition/RemoveJobPositions";
export const API_ADD_JOBTYPE = "/recruitment/JobPosition/CreateJobPosition";
export const API_UPDATE_JOBTYPE = "/recruitment/JobPosition/UpdateJobPosition";
export const API_GET_APPLICANT_USERS_ON_JOBTYPE = "/recruitment/JobPosition/GetApplicationUsersOnJobPosition";
export const API_GET_COLUMN_JOBTYPE = "/aggregator/OrganizationPositionVisible/GetOrganizationPositionsVisible";
export const API_UPDATE_COLUMN_JOBTYPE = "/aggregator/OrganizationPositionVisible/UpdateOrganizationPositionVisible";


// Tin tuyển dụng
export const API_GET_RECRUITMENT_BY_ID = "/recruitment/Recruitment/GetRecruitment";
export const API_GET_RECRUITMENT_BY_SLUG = "/recruitment/Recruitment/GetRecruitmentBySlug";
export const API_GET_LIST_RECRUITMENT = "/recruitment/Recruitment/GetRecruitments";
export const API_GET_RECRUITMENT_BY_ORGANIZATION = "/recruitment/Recruitment/GetRecruitmentByOrganizationId";
export const API_CREATE_RECRUITMENT = "/recruitment/Recruitment/CreateRecruitment";
export const API_UPDATE_RECRUITMENT_OFFICIAL = "/recruitment/Recruitment/UpdateRecruitment";
export const API_UPDATE_RECRUITMENT_DRAFT = "/recruitment/Recruitment/SetRecruitmentDraftOrOfficial";
export const API_CREATE_APPLICANT_RECRUITMENT = "/applicant/ApplicantRecruitment/CreateApplicantRecruitment"
export const API_GET_COLUMN_RECRUITMENT = "/aggregator/RecruitmentVisible/GetRecruitmentsVisible";
export const API_UPDATE_COLUMN_RECRUITMENT = "/aggregator/RecruitmentVisible/UpdateARecruitmentVisible";

// duyệt tin
export const API_GET_INTERNAL_GET_WAITING_APPROVAL_RECRUITMANT = "/recruitment/Recruitment/InternalGetWaitingApprovalRecruitments";
export const API_INTERNAL_APPROVAL_RECRUITMANT = "/recruitment/Recruitment/InternalApprovalRecruitments";
export const API_REJECT_RECRUITMENT = "/recruitment/Recruitment/RejectRecruitment";
export const API_CLOSE_RECRUITMENT = "/recruitment/Recruitment/CloseRecruitments";
export const API_REMOVE_RECRUITMENT = "/recruitment/Recruitment/RemoveRecruitments";
export const API_GET_ADD_APPLICANT_TO_RECRUITMENT = "/applicant/ApplicantRecruitment/AddApplicantsToRecruitment";

// Mẫu đánh giá
export const API_GET_ALL_REVIEW_FORM = "ReviewForm/GetAllReviewForm";
export const API_GET_ALL_REVIEW_FORM_OWNER = "api/Users/GetUsersCreatedReviewForm";
export const API_SET_DEFAULT_REVIEW_FORM = "ReviewForm/SetDefaultReviewForm";
export const API_ADD_REVIEW_FORM = "ReviewForm/InsertReviewForm";
export const API_UPDATE_REVIEW_FORM = "ReviewForm/UpdateReviewForm";
export const API_DELETE_REVIEW_FORM = "ReviewForm/DeleteReviewForm";

// API ApproveProcess
export const API_CREATE_APPROVE_PROCESS = "/organization/ApprovalProcess/CreateApprovalProcess";
export const API_UPDATE_APPROVE_PROCESS = "/organization/ApprovalProcess/UpdateApprovalProcess";
export const API_DELETE_APPROVE_PROCESS = "/organization/ApprovalProcess/RemoveApprovalProcess";
export const API_GET_APPROVE_PROCESSES = "/organization/ApprovalProcess/GetApprovalProcesses";
export const API_GET_APPROVE_PROCESS = "/organization/ApprovalProcess/GetApprovalProcess";


//ĐẶT LỊCH
export const API_POST_BOOK_CALENDAR = 'applicant/BookingCalendar/CreateBookingCalendar'
export const API_GET_REVIEW_FORM = '/recruitment/ReviewForm/GetReviewForms'
export const API_GET_APPLICANT = 'applicant/ApplicantRecruitment/GetApplicantByPipelineStateId'
export const API_GET_CALENDAR ='applicant/BookingCalendar/GetBookingCalendars'
export const API_GET_CALENDAR_DETAIL = 'applicant/BookingCalendar/GetBookingCalendar'
// Thi tuyển
export const API_GET_EXAMINATION = "/examination/Examination/GetExaminations";
export const API_GET_EXAMINATION_BY_ID = "/examination/Examination/GetExamination";
