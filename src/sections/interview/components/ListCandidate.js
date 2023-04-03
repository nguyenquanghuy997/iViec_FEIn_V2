// import DragCandidate from "./DragCandidate";
import RHFSelectMultiple from "./RHFSelectMultiple";
import { useSelector } from "@/redux/store";
import { useGetAllFilterApplicantQuery } from "@/sections/applicant";
// import Popover from "@mui/material/Popover";
// import _without from "lodash/without";
// import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
// import { useState } from "react";
// import { Controller, useFormContext } from "react-hook-form";
import {
  // Button,
  // MenuItem,
  // FormControlLabel,
  Box,
  Typography,
} from "@mui/material";

const ListCandidate = ({ watchStep }) => {
  const dataFilter = useSelector((state) => state.filterReducer.data);
  const { data: Data } = useGetAllFilterApplicantQuery(
    JSON.stringify(
      Object.entries(dataFilter).reduce(
        (a, [k, v]) =>
          v === null || v === undefined || !v || v?.length === 0
            ? a
            : ((a[k] = v), a),
        {}
      )
    )
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography sx={{ fontSize: "14px", fontWeight: "600", mb: 3 }}>
        Danh sách ứng viên
      </Typography>
      {watchStep && <RHFSelectMultiple
        options={Data?.items?.map((i) => ({
          id: i.id,
          value: i.id,
          label: i.fullName,
          phone: i.phoneNumber,
          name: i.fullName,
        }))}
        name="bookingCalendarGroups"
        fullWidth
        multiple
        isRequired
      />}
      
    </Box>
  );
};

export default ListCandidate;
