export const LIST_BRANCH_SIZE = [
  {id: "Less10", value: "[0-9]", name: "Dưới 10"},
  {id: "From10to49", value: "[10-49]", name: "10-49"},
  {id: "From50to99", value: "[50-99]", name: "50-99"},
  {id: "From100to499", value: "[100-499]", name: "100-499"},
  {id: "From500to999", value: "[500-999]", name: "500-999"},
  {id: "From1000to4999", value: "[1000-4999]", name: "1000-4999"},
  {id: "From5000to9999", value: "[5000-9999]", name: "5000-9999"},
  {id: "Greater10000", value: "[10000-00]", name: "Trên 10000"},
];

export const LIST_ORGANIZATION_SIZE = [
  {id: "LessThanTen", value: "0", name: "Dưới 10 nhân sự"},
  {id: "BetweenTenAndFortyNine", value: "1", name: "10-49 nhân sự"},
  {id: "BetweenFiftyAndNinetyNine", value: "2", name: "50-99 nhân sự"},
  {
    id: "BetweenOneHundredAndFourHundredNinetyNine",
    value: "3",
    name: "100-499 nhân sự",
  },
  {
    id: "BetweenFiveHundredAndNineHundredNinetyNine",
    value: "4",
    name: "500-999 nhân sự",
  },
  {
    id: "BetweenOneThousandAndFourThousandNineHundredNinetyNine",
    value: "5",
    name: "1000-4999 nhân sự",
  },
  {
    id: "BetweenFiveThousandAndNineThousandNineHundredNinetyNine",
    value: "6",
    name: "5000-9999 nhân sự",
  },
  {id: "LargeTenThousand", value: 7, name: "Trên 10000 nhân sự"},
];

export const LIST_MARITAL_STATUSES = [
  {id: "", value: "", name: ""},
  {id: "0", value: "0", name: "Độc thân"},
  {id: "1", value: "1", name: "Kết hôn"},
  {id: "2", value: "2", name: "Khác"},
]

export const LIST_GENDER = [
  {id: "0", value: "0", label: "Nam"},
  {id: "1", value: "1", label: "Nữ"},
  {id: "2", value: "2", label: "Khác"},
]

export const LIST_EXPERIENCE_NUMBER = [
  { id: "", value: "", name: "" },
  { id: "0", value: "0", name: "0 - 1 năm" },
  { id: "1", value: "1", name: "1 - 2 năm" },
  { id: "2", value: "2", name: "2 - 3 năm" },
  { id: "3", value: "3", name: "3 - 5 năm" },
  { id: "4", value: "4", name: "5 - 10 năm" },
  { id: "5", value: "5", name: "10 năm trở lên" },
]

export const LIST_STEP_RECRUITMENT = [
  { id: "", value: "", name: "" },
  { id: "0", value: "0", name: "Ứng tuyển" },
  { id: "1", value: "1", name: "Thi tuyển" },
  { id: "2", value: "2", name: "Phỏng vấn máy" },
  { id: "3", value: "3", name: "Phỏng vấn" },
  { id: "4", value: "4", name: "Kết quả - Đạt" },
  { id: "5", value: "5", name: "Kết quả - Cân nhắc" },
  { id: "6", value: "6", name: "Kết quả - Loại" },
  { id: "7", value: "7", name: "Mời nhận việc" },
]

export function joinArrStr(arr, key) {
  return Array.isArray(arr) ? arr.filter((item) => !!item).join(key) : "";
}

export function formatRemoteUrl(str) {
  if (!str) return null;
  return `https://be.iviec.vn${str}`;
}

export function formatBranchSize(data) {
  return LIST_BRANCH_SIZE.find((i) => i.id === data)?.name || "";
}
