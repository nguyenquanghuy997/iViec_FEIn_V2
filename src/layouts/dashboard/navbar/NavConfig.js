import { PERMISSIONS as PERS } from "@/config";

export const headerMenuConfig = [
  {
    subheader: "Quản Lý",
    items: [
      {
        title: "Duyệt tin",
        path: "/adrecruitment",
        // icon: ICONS.job,
        permissions: [PERS.IVIEC_ADMIN],
      },
      {
        title: "Tin tuyển dụng",
        path: "/recruitment",
        // icon: ICONS.job,
        permissions: [PERS.VIEW_JOB],
      },
      {
        title: "Ứng viên",
        path: "/applicant",
        // icon: ICONS.invoice,
        permissions: [PERS.VIEW_CDD],
      },
      {
        title: "Lịch phỏng vấn",
        path: "/interview",
        // icon: ICONS.interview,
        permissions: [PERS.VIEW_INTV_SCHE],
      },
      // {
      //   title: "Kho ứng viên",
      //   path: "/stores",
      //   // icon: ICONS.client,
      //   permissions: [],
      // },
      // {
      //   title: "Báo cáo",
      //   path: "/report",
      //   // icon: ICONS.report,
      //   permissions: [PERS.VIEW_REPORT],
      // },
    ],
  },
]

