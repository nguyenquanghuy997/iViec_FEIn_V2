import SvgIconStyle from "@/components/SvgIconStyle";
import {useTheme} from "@mui/material/styles";
const theme = useTheme();
const getIcon = (name, color) => (
  <SvgIconStyle
    src={`/assets/icons/candidate/${name}.svg`}
    sx={{ minWidth: "20px", height: "20px", color: color || theme.palette.common.neutral400 }}
  />
);

const ICONS = {
  fail: getIcon("ic_delete", '#E53935'),
  success: getIcon("ic_success", '#43A047'),
  consider: getIcon("ic_consider",'#FB8906'),
  assessment: getIcon("ic_assessment"),
  interview: getIcon("ic_interview"),
  review: getIcon("ic_review"),
  // aiInterview: getIcon("ic_ai"),
  apply: getIcon("ic_apply"),
  ownerApply: getIcon("icon_owner_apply"),
};

export const iconLogPipe = (type, stage, result ) => {
  switch (stage) {
    case 0:
      switch (type) {
        case 'add':
          return ICONS.ownerApply;
        case 'create':
          return ICONS.apply;
      }
    case 1:
      return ICONS.assessment;
    case 2:
      switch (type) {
        case 'review':
          return ICONS.review;
          default:
            return ICONS.interview;
      }
    case 3:
      switch (type) {
        case 'result':
          switch (result) {
            case 0:
              return ICONS.success;
            case 1:
              return ICONS.consider;
              case 2:
              return ICONS.fail;
          }
        case 'create':
          return ICONS.apply;
      }
    case 4:
      return ICONS.apply;
  }
};
export const ACTION_FAIL = "Tái khai thác ứng viên";
export const ACTION_PREVIEW_EVALUATION = "Xem chi tiết đánh giá";
export const ACTION_QUESTION = "Xem bộ câu hỏi";
export const ACTION_EXEM = "Xem đề thi";
export const ACTION_PREVIEW_EXEM = "Xem chi tiết bài thi";
export const ACTION_OFFER = "Xem thư mời nhận việc";