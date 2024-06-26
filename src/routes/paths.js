function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = "/auth";
const ROOTS_DASHBOARD = "/";

export const PATH_PAGE = {
  page403: "/403",
  page404: "/404",
  page500: "/500",
};

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, "/login"),
  register: path(ROOTS_AUTH, "/register"),
  resetPassword: path(ROOTS_AUTH, "/reset-password"),
  newPassword: path(ROOTS_AUTH, "/new-password"),
  userActivate: path(ROOTS_AUTH, "/user-activate"),
  policy: path(ROOTS_AUTH, "/policy"),
  changePassword: path(ROOTS_AUTH, "/change-password"),
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  dashboard: path(ROOTS_DASHBOARD, "settings/company-info"),
  settingNotification: path(ROOTS_DASHBOARD, "settings/notification"),
  applicant: {
    root: path(ROOTS_DASHBOARD, "applicant"),
    view: (id) => path(ROOTS_DASHBOARD, `applicant/${id}`),
  },
  profile: {
    root: path(ROOTS_DASHBOARD, "profile/"),
    view: (id) => path(ROOTS_DASHBOARD, `profile/${id}`),
  },
  notification: path(ROOTS_DASHBOARD, "notification"),
  task: {
    root: path(ROOTS_DASHBOARD, "task"),
  },
  jobs: {
    root: path(ROOTS_DASHBOARD, "jobs"),
    new: path(ROOTS_DASHBOARD, "jobs/new"),
  },
  jobDetail: {
    root: path(ROOTS_DASHBOARD, "job-detail"),
    view: (id) => path(ROOTS_DASHBOARD, `job-detail/${id}`),
  },
  clients: {
    root: path(ROOTS_DASHBOARD, "clients"),
  },
  candidates: path(ROOTS_DASHBOARD, "candidates"),
  users: {
    root: path(ROOTS_DASHBOARD, "users"),
    account: path(ROOTS_DASHBOARD, "users/account"),
  },
  interview: {
    root: path(ROOTS_DASHBOARD, "interview"),
  },
  board: {
    root: path(ROOTS_DASHBOARD, "board"),
    view: (cardId) => path(ROOTS_DASHBOARD, `board?cardId=${cardId}`),
  },
  calculator: path(ROOTS_DASHBOARD, "calculator"),
  recruiter: {
    root: path(ROOTS_DASHBOARD, "recruiter"),
  },
  report: {
    root: path(ROOTS_DASHBOARD, "report"),
    // root: path(ROOTS_DASHBOARD, "report/result"),
    // root: path(ROOTS_DASHBOARD, "report/conversion"),
    // root: path(ROOTS_DASHBOARD, "report/overtime"),
    // root: path(ROOTS_DASHBOARD, "report/tracking"),
  },
  blogs: {
    root: path(ROOTS_DASHBOARD, "blogs"),
  },

  // New code from here
  // Create router step 7
  products: {
    root: path(ROOTS_DASHBOARD, "products"),
  },
  hashtag: {
    root: path(ROOTS_DASHBOARD, "hashtag"),
  },
  industry: {
    root: path(ROOTS_DASHBOARD, "industry"),
  },
  companyInfo: {
    root: path(ROOTS_DASHBOARD, "company-info"),
    edit: path(ROOTS_DASHBOARD, "company-info/edit"),
  },
  report1: {
    root: path(ROOTS_DASHBOARD, "report1"),
  },
  report2: {
    root: path(ROOTS_DASHBOARD, "report2"),
  },
  report3: {
    root: path(ROOTS_DASHBOARD, "report3"),
  },
  report4: {
    root: path(ROOTS_DASHBOARD, "report4"),
  },
  // organization
  organization: {
    root: path(ROOTS_DASHBOARD, "settings/organization"),
    view: (id) => path(ROOTS_DASHBOARD, `settings/organization/${id}`),
  },
  recruitment: {
    root: path(ROOTS_DASHBOARD, "recruitment"),
    create: path(ROOTS_DASHBOARD, "recruitment/create"),
    update: (id) => path(ROOTS_DASHBOARD, `recruitment/update/${id}`),
    copy: path(ROOTS_DASHBOARD, `recruitment/copy`),
    view: (id) => path(ROOTS_DASHBOARD, `recruitment/${id}`),
  },
  company: {
    root: path(ROOTS_DASHBOARD, "settings/company-info"),
  },
  // pipeline
  pipeline: {
    root: path(ROOTS_DASHBOARD, "settings/pipeline"),
  },
  connect: {
    root: path(ROOTS_DASHBOARD, "settings/connect"),
  },
};
