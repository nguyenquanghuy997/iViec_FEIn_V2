import Iconify from "@/components/Iconify";
import { PERMISSIONS as PERS } from "@/config";

const getIconByIconify = (icon) => (
    <Iconify icon={icon} width="100%" height="100%" />
);

const ICONS = {
  notification: getIconByIconify("eva:bell-fill"),
};

export const SIDEBAR_CONSTANTS = {
  // WIDTH
  SIDEBAR_WIDTH: 310,
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
        path: "/settings/pipeline",
        permissions: [PERS.VIEW_RECRUIT_PROCESS],
      },
      {
        title: "Quy trình phê duyệt",
        path: "/settings/approve-process",
        permissions: [PERS.VIEW_APPR_PROCESS],
      },
      {
        title: "Vị trí công việc",
        path: "/settings/jobtype",
        permissions: [PERS.VIEW_JOB_POS],
      },
      {
        title: "Kết nối",
        path: "/settings/connect",
        permissions: [PERS.VIEW_CONNECT],
      },
      {
        title: "Quản lý đề thi",
        path: "/settings/exam",
        permissions: [PERS.VIEW_EXAM],
        children: [
          {
            title: "Kho đề thi doanh nghiệp",
            path: "/settings/exam/exambusiness",
          },
          {
            title: "Kho đề thi iVIEC",
            path: "/settings/exam/iviecexam",
            icon: ICONS.notification,
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
        permissions: [PERS.VIEW_EVA_TPL],
      },
      {
        title: "Mẫu thư mời nhận việc",
        path: "/settings/offerform",
        permissions: [PERS.VIEW_OFFER_TPL],
      },
      {
        title: "Mẫu email tự động",
        path: "/settings/emailform",
        permissions: [PERS.VIEW_EMAIL],
        children: [
          {
            title: "Email thông báo tài khoản",
            path: "/settings/emailform/account",
          },
          {
            title: "Email lịch thi tuyển",
            path: "/settings/emailform/schedule-exam",
            icon: ICONS.notification,
          },
          {
            title: "Email lịch phỏng vấn trực tuyến",
            path: "/settings/emailform/schedule-online",
            icon: ICONS.notification,
          },
          {
            title: "Email lịch phỏng vấn trực tiếp",
            path: "/settings/emailform/schedule-live",
            icon: ICONS.notification,
          },
          {
            title: "Email thông báo Kết quả - Đạt",
            path: "/settings/emailform/approve",
            icon: ICONS.notification,
          },
          {
            title: "Email thông báo Kết quả - Loại",
            path: "/settings/emailform/reject",
            icon: ICONS.notification,
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
        permissions: [PERS.VIEW_COMPANY],
      },
      {
        title: "Người dùng và Cơ cấu tổ chức",
        path: "/settings/organization",
        permissions: [PERS.VIEW_USER],
      },
      {
        title: "Vai trò",
        path: "/settings/roleGroup",
        permissions: [PERS.VIEW_ROLE],
      },
    ],
  },
];
