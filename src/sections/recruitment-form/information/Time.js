import MuiDatePicker from "@/components/form/MuiDatePicker";
import { LabelStyle } from "@/components/hook-form/style";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import { BoxInnerStyle } from "@/sections/recruitment-form/style";
import { Box } from "@mui/material";
import { isEmpty } from "lodash";
import { useWatch } from "react-hook-form";

const Time = ({ recruitment }) => {
  const startDate = useWatch({ name: "startDate" });

  return (
    <BoxInnerStyle>
      <DividerCard title="THỜI GIAN TUYỂN DỤNG" />
      <Box sx={{ px: 4, py: 3 }}>
        {/* Đơn vị & Chức danh */}
        <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
          <div style={{ flex: 1, marginRight: 8 }}>
            <LabelStyle required={true}>Ngày bắt đầu</LabelStyle>
            <MuiDatePicker
              name="startDate"
              placeholder="Chọn ngày"
              DatePickerProps={{
                minDate: !isEmpty(recruitment) ? startDate : new Date(),
              }}
            />
          </div>
          <div style={{ flex: 1, marginLeft: 8 }}>
            <LabelStyle required={true}>Ngày kết thúc</LabelStyle>
            <MuiDatePicker
              name="endDate"
              placeholder="Chọn ngày"
              DatePickerProps={{
                minDate: startDate,
              }}
            />
          </div>
        </Box>
      </Box>
    </BoxInnerStyle>
  );
};

export default Time;
