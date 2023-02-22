import EmptyIcon from "../../../../assets/EmptyIcon";
import NotificationBoard from "./NotificationBoard";
import SvgIconStyle from "@/components/SvgIconStyle";
import { Box, Grid, Switch } from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import List from "@mui/material/List";
import { alpha, styled } from "@mui/material/styles";
import React from "react";

export const Activities = () => {
  const getIcon = (name) => (
    <SvgIconStyle
      src={`/assets/icons/candidate/${name}.svg`}
      sx={{ minWidth: "20px", height: "20px" }}
    />
  );

  const ICONS = {
    fail: getIcon("ic_delete"),
    success: getIcon("ic_success"),
    consider: getIcon("ic_consider"),
    interview: getIcon("ic_interview"),
    aiInterview: getIcon("ic_ai"),
    apply: getIcon("ic_apply"),
  };

  const [checked, setChecked] = React.useState(true);

  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  const NeutralSwitch = styled(Switch)(({ theme }) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
      color: "#455570",
      "&:hover": {
        backgroundColor: alpha("#455570", theme.palette.action.hoverOpacity),
      },
    },
    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
      backgroundColor: "#455570",
    },
  }));

  return (
    <Grid item sx={{ padding: "24px 0 0 0" }}>
      <FormGroup>
        <FormControlLabel
          control={
            <NeutralSwitch
              checked={checked}
              onChange={handleChange}
            />
          }
          label="Hiển thị hoạt động"
        />
      </FormGroup>
      {checked ? (
        <Box>
          <List
            sx={{ width: "100%" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <NotificationBoard
              icon={ICONS.success}
              manager="Phạm Xuân Chung"
              action="success"
            />
            <NotificationBoard
              icon={ICONS.fail}
              manager="Phạm Xuân Chung"
              action="fail"
            />
            <NotificationBoard
              icon={ICONS.consider}
              manager="Phạm Xuân Chung"
              action="consider"
            />
            <NotificationBoard
              icon={ICONS.interview}
              manager="Phạm Xuân Chung"
              action="interview"
            />
            <NotificationBoard
              icon={ICONS.success}
              manager="Phạm Xuân Chung"
              action="success"
            />
            <NotificationBoard
              icon={ICONS.aiInterview}
              manager="Phạm Xuân Chung"
              action="interview"
            />
            <NotificationBoard
              icon={ICONS.apply}
              candidate="Ứng viên Đinh Tiến Thành"
              action="apply"
            />
            <NotificationBoard
              icon={ICONS.apply}
              candidate="Ứng viên Đinh Tiến Thành"
              action="apply"
            />
            <NotificationBoard
              icon={ICONS.apply}
              candidate="Ứng viên Đinh Tiến Thành"
              action="apply"
            />
            <NotificationBoard
              icon={ICONS.apply}
              candidate="Ứng viên Đinh Tiến Thành"
              action="apply"
            />
          </List>
        </Box>
      ) : (
        <div>
          <div
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            <EmptyIcon />
          </div>
          <p
            style={{ display: "flex", width: "100%", justifyContent: "center" }}
          >
            Ứng viên chưa có CV cho tin tuyển dụng này.
          </p>
        </div>
      )}
    </Grid>
  );
};
