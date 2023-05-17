import { PATH_DASHBOARD } from "@/routes/paths";
import { enUS, viVN } from "@mui/material/locale";

export const DOMAIN_SERVER_API = process.env.NEXT_PUBLIC_DOMAIN_SERVER_API;

export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;
export const DOMAIN_OUTSIDE = process.env.NEXT_PUBLIC_DOMAIN_OUTSIDE;

export const DASHBOARD_TABLE_HEIGHT = 500;

export const DASHBOARD_CONTENT_WIDTH = 1420;

// LAYOUT
export const HEADER = {
  MOBILE_HEIGHT: 64,
  MAIN_DESKTOP_HEIGHT: 88,
  DASHBOARD_DESKTOP_HEIGHT: 64,
  DASHBOARD_DESKTOP_OFFSET_HEIGHT: 92 - 32,
};

export const NAVBAR = {
  // TEXT
  MENU_ITEM_WEIGHT_SEMIBOLD: 700,
  // width
  BASE_WIDTH: 260,
  DASHBOARD_WIDTH: 220,
  DASHBOARD_COLLAPSE_WIDTH: 88,
  // height
  DASHBOARD_ITEM_ROOT_HEIGHT: 48,
  DASHBOARD_ITEM_SUB_HEIGHT: 40,
  DASHBOARD_ITEM_HORIZONTAL_HEIGHT: 32,
  DASHBOARD_ITEM_HORIZONTAL_MENU_HEIGHT: 36,
  // color
  DASHBOARD_MENU_ITEM_COLOR: "#B9BFC9",
  DASHBOARD_MENU_ITEM_ACTIVE_COLOR: "#FDFDFD",
  DASHBOARD_MENU_ITEM_BG_COLOR: "#5C6A82",
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
  NAVBAR_ITEM_COLOR: "#455570",
};

export const cookiesExpires = 3;

export const cookiesKey = {
  themeMode: "themeMode",
  themeLayout: "themeLayout",
  themeStretch: "themeStretch",
  themeContrast: "themeContrast",
  themeDirection: "themeDirection",
  themeColorPresets: "themeColorPresets",
};

export const defaultSettings = {
  themeMode: "light",
  themeDirection: "ltr",
  themeContrast: "default",
  themeLayout: "vertical",
  themeColorPresets: "yellow",
  themeStretch: false,
};

// PAGINATION
export const PAGINATION = [10, 20, 50, 100];

export const defaultPagination = PAGINATION[0]; // 10

// DATETIME FORMAT
export const DATE_FORMAT = "dd/MM/yyyy";
export const TIME_FORMAT = "HH:mm";
export const YEAR_FORMAT = "yyyy";
export const DATE_YEAR_MONTH_DAY_FORMAT = "yyyy-MM-dd";
export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";
export const AMPM_DATETIME_FORMAT = "HH:mm dd/MM/yyyy";
export const DATETIME_FORMAT_AMPM = "dd/MM/yyyy hh:mm a";
export const DATE_FORMAT_DAY_MONTH = "do MMM";
export const CALANDER_DATE_FORMAT = "MM/dd/yyyy";
export const TIMEZONE = "Asia/Ho_Chi_Minh";

// MULTI LANGUAGES
// Please remove `localStorage` when you change settings.

export const allLangs = [
  {
    label: "English",
    value: "en",
    systemValue: enUS,
    icon: "/assets/icons/flags/ic_flag_en.svg",
  },
  {
    label: "Vietnamese",
    value: "vn",
    systemValue: viVN,
    icon: "/assets/icons/flags/ic_flag_vn.svg",
  },
];

export const defaultLang = allLangs[0]; // English
export const MAX_SIZE_FILEIMAGE = 5145728;

export const API_KEY_EDITOR = "4np9fd7la2pq868zg1e875ev3avyqm95riwn0f4d9d8uq7k6";

export const PERMISSIONS = {
  IVIEC_ADMIN: 'IViecAdmin',
  ADMINISTRATOR: "Administrator",
  VIEW_CDD: "ViewCandidate",
  ADD_EDIT_CDD: "AddEditCandidate",
  EVALUATE_CDD: "EvaluateCandidate",
  CHANGE_STAGE_CDD: "ChangeCandidateStage",
  VIEW_JOB: "ViewJob",
  CRUD_JOB: "AddEditDeleteJob",
  VIEW_JOB_POS: "ViewJobDescription",
  CRUD_JOB_POS: "AddEditDeleteJobDescription",
  CRUD_INTV_SCHE: "AddEditDeleteInterviewSchedule",
  SEND_MAIL_OFFER: "SendOfferMail",
  APPR_JOB: "ApproveJob",
  VIEW_CAMPAIN: "ViewCampaign",
  CRUD_CAMPAIN: "AddEditDeleteCampaign",
  APPR_CAMPAIN: "ApproveCampaign",
  VIEW_INTV_SCHE: "ViewInterviewSchedule",
  PARTICIPATE_INTV_SCHE: "ParticipateInterviewSchedule",
  VIEW_REPORT: "ViewReport",
  VIEW_COMPANY: "ViewCompanyInformation",
  EDIT_COMPANY: "EditCompanyInformation",
  VIEW_USER: "ViewUser",
  VIEW_UNIT: "ViewUnit",
  CRUD_USER: "AddEditDeleteUser",
  CRUD_UNIT: "AddEditDeleteUnit",
  APPR_USER_INVITE: "ApproveUserInvitation",
  VIEW_ROLE: "ViewRole",
  CRUD_ROLE: "AddEditDeleteRole",
  VIEW_EVA_TPL: "ViewEvaluationTemplate",
  CRUD_EVA_TPL: "AddEditDeleteEvaluationTemplate",
  VIEW_RECRUIT_PROCESS: "ViewRecruitmentProcess",
  CRUD_RECRUIT_PROCESS: "AddEditDeleteRecruitmentProcess",
  VIEW_APPR_PROCESS: "ViewApprovalProcess",
  CRUD_APPR_PROCESS: "AddEditDeleteApprovalProcess",
  VIEW_QUESTION: "ViewQuestion",
  CRUD_QUESTION: "AddEditDeleteQuestion",
  VIEW_EXAM: "ViewExam",
  CRUD_EXAM: "AddEditDeleteExam",
  REPORT_EXAM_QUESTION: "ReportExamQuestion",
  VIEW_OFFER_TPL: "ViewOfferTemplate",
  CRUD_OFFER_TPL: "AddEditDeleteOfferTemplate",
  APPR_OFFER_TPL: "ApproveOfferTemplate",
  VIEW_EMAIL: "ViewEmail",
  CRUD_EMAIL: "AddEditDeleteEmail",
  VIEW_CONNECT: "ViewConnect",
  ADD_STOP_CONNECT: "AddStopConnect",
};

// group
export const PERMISSION_GROUPS = {
  ACCESS_DASHBOARD: [
    PERMISSIONS.VIEW_CDD,
    PERMISSIONS.VIEW_JOB,
    PERMISSIONS.APPR_JOB,
    PERMISSIONS.VIEW_INTV_SCHE,
    //PERS.VIEW_CDD_STORE,
    PERMISSIONS.VIEW_REPORT,
    PERMISSIONS.VIEW_COMPANY,
  ],
  ACCESS_SETTINGS: [
    PERMISSIONS.VIEW_RECRUIT_PROCESS,
    PERMISSIONS.VIEW_APPR_PROCESS,
    PERMISSIONS.VIEW_JOB_POS,
    PERMISSIONS.VIEW_CONNECT,
    PERMISSIONS.VIEW_EXAM,
    PERMISSIONS.VIEW_EVA_TPL,
    PERMISSIONS.VIEW_OFFER_TPL,
    PERMISSIONS.VIEW_EMAIL,
    PERMISSIONS.VIEW_COMPANY,
    PERMISSIONS.VIEW_ROLE,
  ],
};

export const PERMISSION_PAGES = {
  dashboard: PERMISSION_GROUPS.ACCESS_DASHBOARD,
  approveRecruitment: [PERMISSIONS.APPR_JOB],
  applicant: [PERMISSIONS.VIEW_CDD],
  applicantDetail: [PERMISSIONS.VIEW_CDD],
  interview: [PERMISSIONS.VIEW_INTV_SCHE],
  recruitment: [PERMISSIONS.VIEW_JOB],
  copyRecruitment: [PERMISSIONS.CRUD_JOB],
  editRecruitment: [PERMISSIONS.CRUD_JOB],
  detailRecruitment: [PERMISSIONS.VIEW_JOB],
  createRecruitment: [PERMISSIONS.CRUD_JOB],
  report: [PERMISSIONS.VIEW_REPORT],
  setting: PERMISSION_GROUPS.ACCESS_SETTINGS,
  approveProcess: [PERMISSIONS.VIEW_APPR_PROCESS],
  organization: [
    PERMISSIONS.VIEW_COMPANY,
    PERMISSIONS.VIEW_ROLE,
    PERMISSIONS.VIEW_USER,
  ],
  editOrganization: [PERMISSIONS.EDIT_COMPANY],
  connect: [PERMISSIONS.VIEW_CONNECT],
  emailTemplate: [PERMISSIONS.VIEW_EMAIL],
  evaluationTemplate: [PERMISSIONS.VIEW_EVA_TPL],
  exam: [PERMISSIONS.VIEW_EXAM],
  jobPosition: [PERMISSIONS.VIEW_JOB_POS],
  offerTemplate: [PERMISSIONS.VIEW_OFFER_TPL],
  editOfferTemplate: [PERMISSIONS.CRUD_OFFER_TPL],
  approveOfferTemplate: [PERMISSIONS.APPR_OFFER_TPL],
  recruitmentProcess: [PERMISSIONS.VIEW_RECRUIT_PROCESS],
  role: [PERMISSIONS.VIEW_ROLE],
};

export const TBL_FILTER_TYPE = {
  TEXT: 'text',
  SELECT: 'select',
  SELECT_CHECKBOX: 'select_checkbox',
  SELECT_ADDRESS: 'select_address',
  SELECT_TREE: 'select_tree',
  RANGE_DATE: 'range_date',
  RANGE_MONEY: 'range_money',
  RANGE_NUMBER: 'range_number',
  CHECKBOX: 'checkbox',
  RADIO: 'radio',
  RANGE_POINT: 'range_point',
  RANGE_QUESTION: 'range_question'
};

export const RECRUITMENT_CREATE_TYPE = {
  DRAFT: 0,
  OFFICIAL: 1,
}

export const ApplicantInterviewState = {
  PENDING: 0, // chờ xác nhận pv
  CONFIRMED: 1, // xác nhận pv
  SUSPENDED: 2,// hoãn pv
  REFUSE: 3, // từ chối
  INTERVIEWING: 4, // đang pv
  NOTPERTED: 5,// k tham gia pv
  COMPLETED: 6, // hoàn thành pv
}
export const RECRUITMENT_STATUS = {
  DRAFT: 0,
  WAITING_ORGANIZATION_APPROVAL: 1,
  ORGANIZATION_REJECT: 2,
  WAITING_IVIEC_APPROVAL: 3,
  IVIEC_REJECT: 4,
  RECRUITING: 5,
  CALENDARED: 6,
  EXPIRED: 7,
  CLOSED: 8
}
export const PIPELINE_TYPE = {
  APPLY: 0,
  EXAMINATION: 1,
  INTERVIEW: 2,
  RESULT: 3,
  OFFER: 4,
}

export const SALARY_TYPE = {
  NO_SALARY: 0,
  NEGOTIABLE_SALARY: 1,
  DETAILED_SALARY: 2
}

export const SEX_TYPE = {
  MALE: 0,
  FEMALE: 1,
  OTHER: 2,
  NOT_REQUIRED: 3
}