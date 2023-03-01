// @mui
// routes
import { PATH_DASHBOARD } from "@/routes/paths";
import { enUS, viVN } from "@mui/material/locale";

// export const DOMAIN_SERVER_API = process?.env?.NEXT_PUBLIC_HOST_API_KEY || "";
// export const DOMAIN_SERVER_API = "https://api.iviec.vn/api";
export const DOMAIN_SERVER_API = "http://103.176.149.158:5001/api"
// ROOT PATH AFTER LOGIN SUCCESSFUL
export const PATH_AFTER_LOGIN = PATH_DASHBOARD.dashboard;

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
  DASHBOARD_MENU_ITEM_COLOR: '#B9BFC9',
  DASHBOARD_MENU_ITEM_ACTIVE_COLOR: '#FDFDFD',
  DASHBOARD_MENU_ITEM_BG_COLOR: '#5C6A82',
  // DASHBOARD_: '',
  // DASHBOARD_: '',
  // DASHBOARD_: '',
  // DASHBOARD_: '',
  // DASHBOARD_: '',
  // DASHBOARD_: '',
};

export const ICON = {
  NAVBAR_ITEM: 22,
  NAVBAR_ITEM_HORIZONTAL: 20,
  NAVBAR_ITEM_COLOR: '#455570',

};

// SETTINGS
// Please remove `localStorage` when you change settings.

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
export const YEAR_FORMAT = "yyyy";
export const DATE_YEAR_MONTH_DAY_FORMAT = "yyyy-MM-dd";
export const DATETIME_FORMAT = "dd/MM/yyyy HH:mm";
export const AMPM_DATETIME_FORMAT = "hh:mma dd/MM/yyyy";
export const DATETIME_FORMAT_AMPM = "dd/MM/yyyy hh:mm a";
export const DATE_FORMAT_DAY_MONTH = "do MMM";
export const CALANDER_DATE_FORMAT = "MM/dd/yyyy";
export const TIMEZONE = "Asia/Ho_Chi_Minh";

// User setting
export const PAGES = {
  Dashboard: "Dashboard",
  Notification: "Notification",
  Candidates: "Candidates",
  Applicant: "Applicant",
  Interview: "Interview",
  Board: "Board",
  Calculator: "Calculator",
  Recruiter: "External recruiter",
  Jobs: "Jobs",
  Clients: "Clients",
  Users: "Users",
  Task: "Task",
  Blogs: "Blogs",
  Reports: "Reports",
  Pipeline: "Pipeline",

  // Create Router step 1.1
  Products: "Products",
  Hashtag: "Hashtag",
  Industry: "Industry",
  CompanyInfor: "CompanyInfor",

  Report1: "Report1",
  Report2: "Report2",
  Report3: "Report3",
  Report4: "Report4",

  // Account: 'Account',
};

// ROLE AND PERMISSION
export const ROLE = {
  // DIRECTOR: 'Director',
  // LEADER: 'Leader',
  // MEMBER: 'Member',
  ADMIN: "Admin",
  // BLOGER: 'Bloger',
};

export const ROLE_BY_PAGES = [
  // New admin configure
  {
    pageNames: [
      PAGES.Dashboard,
      PAGES.Notification,
      PAGES.Interview,
      PAGES.Candidates,
      PAGES.Applicant,
      PAGES.Board,
      PAGES.Calculator,
      PAGES.Recruiter,
      PAGES.Jobs,
      PAGES.Clients,
      PAGES.Clients,
      PAGES.Users,
      PAGES.Task,
      PAGES.Blogs,
      PAGES.Reports,
      PAGES.Pipeline,
      // PAGES.Account,
      // Create Router step 1.2
      PAGES.Products,
      PAGES.Hashtag,
      PAGES.Industry,
      PAGES.CompanyInfor,

      PAGES.Report1,
      PAGES.Report2,
      PAGES.Report3,
      PAGES.Report4,
    ],
    roles: [ROLE.ADMIN],
  },

  // {
  //   pageNames: [
  //     PAGES.Dashboard,
  //     PAGES.Notification,
  //     PAGES.Jobs,
  //     PAGES.Candidates,
  //     PAGES.Interview,
  //     PAGES.Board,
  //     PAGES.Calculator,
  //     // PAGES.Recruiter,
  //   ],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER],
  // },
  // {
  //   pageNames: [PAGES.Task],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.ADMIN],
  // },
  // {
  //   pageNames: [PAGES.Jobs, PAGES.Clients],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER],
  // },
  // {
  //   pageNames: [PAGES.Task],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.ADMIN],
  // },
  // {
  //   pageNames: [PAGES.Blogs],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER, ROLE.MEMBER, ROLE.BLOGER],
  // },
  // {
  //   pageNames: [PAGES.Users],
  //   roles: [ROLE.DIRECTOR, ROLE.LEADER],
  // },
];

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
