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
        path: "/settings/jobs",
        roles: ROLES[PAGES.Applicant],
      },
    ],
  },
  {
    subheader: "Thiết lập tuyển dụng",
    items: [
      {
        title: "Quy trình tuyển dụng",
        path: "/settings/pipeline",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Quy trình phê duyệt",
        path: "/settings/approve",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Vị trí công việc",
        path: "/settings/jobtype",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Kết nối",
        path: "/board",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Quản lý đề thi",
        path: "/settings",
        roles: ROLES[PAGES.Applicant],
        children: [
          {
            title: "Kho đề thi doanh nghiệp",
            path: "/settings/exam/exambusiness",
            roles: ROLES[PAGES.Applicant],
          },
          {
            title: "Kho đề thi iVIEC",
            path: "/settings/exam/iviecexam",
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
        path: "/settings/evaluationform",
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Mẫu thư mời nhận việc",
        path: "/settings/offerform",
        roles: ROLES[PAGES.Applicant],
      },
      // {
      //   title: "Mẫu email tự động",
      //   path: "/interview",
      //   roles: ROLES[PAGES.Applicant],
      //   children: [
      //     {
      //       title: "Email thông báo tài khoản",
      //       path: "/interview",
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //     {
      //       title: "Email lịch thi tuyển",
      //       path: "/interview",
      //       icon: ICONS.notification,
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //     {
      //       title: "Email lịch phỏng vấn trực tuyến",
      //       path: "/interview",
      //       icon: ICONS.notification,
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //     {
      //       title: "Email lịch phỏng vấn trực tiếp",
      //       path: "/interview",
      //       icon: ICONS.notification,
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //     {
      //       title: "Email thông báo Kết quả - Đạt",
      //       path: "/interview",
      //       icon: ICONS.notification,
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //     {
      //       title: "Email thông báo Kết quả - Loại",
      //       path: "/interview",
      //       icon: ICONS.notification,
      //       roles: ROLES[PAGES.Applicant],
      //     },
      //   ],
      // },
    ],
  },

];
