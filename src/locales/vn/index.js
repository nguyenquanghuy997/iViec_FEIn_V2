import blogs from "./ blogs";
import board from "./board";
import calculator from "./calculator";
import candidates from "./candidates";
import clients from "./clients";
import dashboard from "./dashboard";
import hashtag from "./hashtag";
import industry from "./industry";
import interview from "./interview";
import jobs from "./jobs";
import login from "./login";
import notification from "./notification";
// New code from here
import products from "./products";
import recruiter from "./recruiter";
import task from "./task";
import users from "./users";

const vn = {
  login: "Login",
  home: "Home",
  setting: "Settings",
  logout: "Logout",
  add_assignee: "Add assignee",
  contacts: "Contacts",
  nav: {
    dashboard: "Dashboard",
    notification: "Notification",
    task: "Task",
    jobs: "Jobs",
    jobDetail: "Job detail",
    clients: "Clients",
    candidates: "Candidates",
    users: "Users",
    interview: "Interview",
    board: "Board",
    calculator: "Calculator",
    recruiter: "External recruiter",
    blogs: "Blogs",
    // Create router step 5.2
    products: "Products",
    hashtag: "Hashtag",
    industry: "Industry",
    CompanyInfor: "Company Infor",
  },
  pages: {
    dashboard,
    blogs,
    calculator,
    board,
    candidates,
    clients,
    interview,
    notification,
    recruiter,
    task,
    users,
    login,
    jobs,
    // New code from here
    products,
    hashtag,
    industry,
  },
  common: {
    add: "Add",
    edit: "Edit",
    delete: "Delete",
    save: "Save",
    cancel: "Cancel",
    close: "Close",
    back: "Back",
    next: "Next",
    search: "Search",
  },
};

export default vn;
