import Iconify from "@/components/Iconify";
import { PAGES } from "@/config";
import { getListRoles } from "@/utils/role";

const getIconByIconify = (icon) => (
  <Iconify icon={icon} width="100%" height="100%" />
);

const ICONS = {
  notification: getIconByIconify("eva:bell-fill"),
};

const ROLES = getListRoles();

export const SIDEBAR_CONSTANTS = {
  // WIDTH
  SIDEBAR_WIDTH: 316,
  // TEXT
  MENU_TITLE_SIZE: 13,
  MENU_ITEM_SIZE: 14,
  MENU_TITLE_WEIGHT: 700,
  MENU_ITEM_WEIGHT: 400,
  MENU_ITEM_ACTIVE_WEIGHT: 600,
  // COLOR
  MENU_TITLE_COLOR: "#455570",
  MENU_ITEM_COLOR: "#455570",
  MENU_ITEM_ACTIVE_COLOR: "#1976D2",
  MENU_ITEM_ACTIVE_BG_COLOR: "#E7E9ED",
  // MENU_ITEM_COLOR: "",
  // HEIGHT
}

export const sidebarConfig = [
  {
    subheader: "Thiết lập tuyển dụng",
    items: [
      {
        title: "Quy trình tuyển dụng",
        path: "/settings/recruitment-process",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Quy trình phê duyệt",
        path: "/settings/approval-process",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Vị trí công việc",
        path: "/settings/job-position",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Kết nối",
        path: "/settings/connect",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Quản lý đề thi",
        path: "/settings/exam",
        roles: ROLES[PAGES.Applicant],
        children: [
          {
            title: "Kho đề thi doanh nghiệp",
            path: "/settings/exam/organization",
            roles: ROLES[PAGES.Applicant],
          },
          {
            title: "Kho đề thi iVIEC",
            path: "/settings/exam/iviec",
            icon: ICONS.notification,
            roles: ROLES[PAGES.Applicant],
          },
        ],
      },
    ],
  },
  {
    subheader: "Thiết lập mẫu",
    items: [
      {
        title: "Mẫu đánh giá",
        path: "/applicant",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Mẫu thư mời nhận việc",
        path: "/jobs",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Mẫu email tự động",
        path: "/interview",
        roles: ROLES[PAGES.Applicant],
        children: [
          {
            title: "Mẫu email 1",
            path: "/interview",
            roles: ROLES[PAGES.Applicant],
          },
          {
            title: "Mẫu email 2",
            path: "/interview",
            icon: ICONS.notification,
            roles: ROLES[PAGES.Applicant],
          },
        ],
      },
    ],
  },
  {
    subheader: "Công ty",
    items: [
      {
        title: "Thông tin công ty",
        path: "/settings/companyinfor",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Người dùng và Cơ cấu tổ chức",
        path: "/settings/organization",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Vai trò",
        path: "/settings/pipeline",
        roles: ROLES[PAGES.Applicant],
      },
    ],
  },
];
