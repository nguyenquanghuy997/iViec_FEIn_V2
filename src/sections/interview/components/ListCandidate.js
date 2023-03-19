// import PlusIcon from "../../../assets/interview/PlusIcon";
// import DragCandidate from "./DragCandidate";
import RHFSelectMultiple from "./RHFSelectMultiple";
import {
  // Button,
  // MenuItem,
  // FormControlLabel,
  Box,
  Typography,
} from "@mui/material";
// import Popover from "@mui/material/Popover";
// import _without from "lodash/without";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";

const names = [
  {
    id: "gary",
    name: "Đinh Tiến Thành",
    phone: "0987655345",
  },
  {
    id: "cato",
    name: "Đỗ Ánh Tuyết",
    phone: "0987655345",
  },
  {
    id: "kvn",
    name: "Trần Văn Linh",
    phone: "0987655345",
  },
  {
    id: "mooncake",
    name: "Đào Duy Tùng",
    phone: "0987655345",
  },
  {
    id: "quinn",
    name: "Doãn Trung Kiên",
    phone: "0987655345",
  },
];

const ListCandidate = ({ value, 
  // defaultValues, 
  action }) => {
  // const [checked, setChecked] = useState([]);

  return value == 1 ? (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>

        <RHFSelectMultiple
          options={names.map((i) => ({
            id: i.id,
            value: i.id,
            label: i.name,
            phone: i.phone,
            name: i.name,
          }))}
          name="bookingCalendarGroups"
          action={action}
          fullWidth
          multiple
          isRequired
        />;

    </Box>
  ) : (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>
    </Box>
  );
};

export default ListCandidate;
