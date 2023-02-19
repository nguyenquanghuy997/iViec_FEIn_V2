export const LIST_BRANCH_SIZE = [
  { id: "Less10", value: "[0-9]", name: "Dưới 10" },
  { id: "From10to49", value: "[10-49]", name: "10-49" },
  { id: "From50to99", value: "[50-99]", name: "50-99" },
  { id: "From100to499", value: "[100-499]", name: "100-499" },
  { id: "From500to999", value: "[500-999]", name: "500-999" },
  { id: "From1000to4999", value: "[1000-4999]", name: "1000-4999" },
  { id: "From5000to9999", value: "[5000-9999]", name: "5000-9999" },
  { id: "Greater10000", value: "[10000-00]", name: "Trên 10000" },
];

export const LIST_ORGANIZATION_SIZE = [
  { id: "LessThanTen", value: "0", name: "Dưới 10 nhân sự" },
  { id: "BetweenTenAndFortyNine", value: "1", name: "10-49 nhân sự" },
  { id: "BetweenFiftyAndNinetyNine", value: "2", name: "50-99 nhân sự" },
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
  { id: "LargeTenThousand", value: 7, name: "Trên 10000 nhân sự" },
];

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
