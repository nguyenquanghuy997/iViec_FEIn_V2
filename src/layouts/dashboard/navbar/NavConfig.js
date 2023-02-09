// components
import Iconify from "@/components/Iconify";
import SvgIconStyle from "@/components/SvgIconStyle";
// config
import { PAGES } from "@/config";
// utils
import { getListRoles } from "@/utils/role";

const getIcon = (name) => (
  <SvgIconStyle
    src={`/assets/icons/navbar/${name}.svg`}
    sx={{ width: 1, height: 1 }}
  />
);

const getIconByIconify = (icon) => (
  <Iconify icon={icon} width="100%" height="100%" />
);

const ICONS = {
  blog: getIcon("ic_blog"),
  user: getIcon("ic_user"),
  kanban: getIcon("ic_kanban"),
  calendar: getIcon("ic_calendar"),
  dashboard: getIcon("ic_dashboard"),
  notification: getIconByIconify("eva:bell-fill"),
  job: getIconByIconify("eva:list-outline"),
  client: getIconByIconify("eva:people-fill"),
  invoice: getIcon("ic_invoice"),
  calculator: getIconByIconify("eva:swap-fill"),
  recruiter: getIconByIconify("eva:external-link-outline"),
  interview: getIconByIconify("eva:video-fill"),
  report: getIconByIconify("eva:video-fill"),
  // Create router step 2
  products: getIconByIconify("eva:list-outline"),
  hashtag: getIconByIconify("eva:list-outline"),
  industry: getIconByIconify("eva:list-outline"),
  companyinfor: getIconByIconify("eva:list-outline"),
  report1: getIconByIconify("eva:list-outline"),
  report2: getIconByIconify("eva:list-outline"),
  report3: getIconByIconify("eva:list-outline"),
  report4: getIconByIconify("eva:list-outline"),
};

const ROLES = getListRoles();

const sidebarConfig = [
  {
    subheader: "Quản Lý",
    items: [
      {
        title: "Ứng Viên",
        path: "/applicant",
        icon: ICONS.invoice,
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Tin Tuyển Dụng",
        path: "/jobs",
        icon: ICONS.job,
        roles: ROLES[PAGES.Jobs],
      },
      {
        title: "Lịch",
        path: "/interview",
        icon: ICONS.interview,
        roles: ROLES[PAGES.Interview],
      },
      {
        title: "nav.board",
        path: "/board",
        icon: ICONS.kanban,
        roles: ROLES[PAGES.Board],
      },

      {
        title: "Kho Ứng Viên",
        path: "/stores",
        icon: ICONS.client,
        roles: ROLES[PAGES.Jobs],
        children: [
          {
            title: "Kho nội bộ",
            path: "/stores/internal",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Kho iVIEC",
            path: "/stores/iviec",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
        ],
      },
      {
        title: "Báo Cáo",
        path: "/report",
        icon: ICONS.report,
        children: [
          {
            title: "Tuyển dụng",
            path: "/report/result",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Tỷ lệ chuyển đổi",
            path: "/report/conversion",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Ứng Viên",
            path: "/report/overtime",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Tin tuyển dụng",
            path: "/report/tracking",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
        ],
      },
    ],
  },
  // Create router step 3
  {
    subheader: "Cài Đặt",
    items: [
      {
        title: "Cơ bản",
        path: "/settings/basic",
        icon: ICONS.companyinfor,
        roles: ROLES[PAGES.CompanyInfor],
        children: [
          {
            title: "Thông tin công ty",
            path: "/settings/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Đổi mật khẩu",
            path: "/settings/changepassword",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Vị trí công việc",
            path: "/settings/jobtype",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Mẫu đánh giá",
            path: "/settings/evaluationform",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
        ],
      },
      {
        title: "Nâng cao",
        path: "/settings/advanced",
        icon: ICONS.companyinfor,
        roles: ROLES[PAGES.CompanyInfor],
        children: [
          {
            title: "Cơ cấu tổ chức",
            path: "/settings/basic/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Quy trình tuyển dụng",
            path: "/settings/pipeline",
            roles: ROLES[PAGES.Pipeline],
          },
          {
            title: "Quy trình phê duyệt",
            path: "/settings/basic/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Đề thi",
            path: "/settings/basic/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Câu hỏi video",
            path: "/settings/basic/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
          {
            title: "Mẫu mời làm việc",
            path: "/settings/basic/companyinfor",
            icon: ICONS.job,
            roles: ROLES[PAGES.Jobs],
          },
        ],
      },
    ],
  },
];

export const headerMenuConfig = [
  {
    subheader: "Quản Lý",
    items: [
      {
        title: "Tin tuyển dụng",
        path: "/jobs",
        // icon: ICONS.job,
        roles: ROLES[PAGES.Jobs],
      },
      {
        title: "Ứng viên",
        path: "/applicant",
        // icon: ICONS.invoice,
        roles: ROLES[PAGES.Applicant],
      },
      {
        title: "Lịch phỏng vấn",
        path: "/interview",
        // icon: ICONS.interview,
        roles: ROLES[PAGES.Interview],
      },
      {
        title: "Kho ứng viên",
        path: "/stores",
        // icon: ICONS.client,
        roles: ROLES[PAGES.Jobs],
      },
      {
        title: "Báo cáo",
        path: "/report",
        // icon: ICONS.report,
        roles: ROLES[PAGES.Report1],
      },
    ],
  },
]

export default sidebarConfig;
