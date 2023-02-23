import EmptyIcon from "../../../../assets/EmptyIcon";
import NotificationBoard from "./NotificationBoard";
import SvgIconStyle from "@/components/SvgIconStyle";
import { Box, Grid } from "@mui/material";
import { FormProvider } from "@/components/hook-form";
import List from "@mui/material/List";
import React from "react";
import { SwitchDS } from "@/components/DesignSystem";
import { useForm } from "react-hook-form";

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

  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const isActive = methods.watch("isActive");
  return (
    <Grid item sx={{ padding: "12px 0 0 0" }}>
       <FormProvider methods={methods}>
        <SwitchDS name={"isActive"} label={"Hiển thị hoạt động"}/>
      </FormProvider>

      {isActive ? (
        <Box>
          <List
            sx={{ width: "100%", pt:'16px' }}
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
