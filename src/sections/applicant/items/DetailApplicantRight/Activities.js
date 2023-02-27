import EmptyIcon from "../../../../assets/EmptyIcon";
import NotificationBoard from "./NotificationBoard";
import { SwitchDS } from "@/components/DesignSystem";
import SvgIconStyle from "@/components/SvgIconStyle";
import { FormProvider } from "@/components/hook-form";
import { Box, Grid } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { useForm } from "react-hook-form";

export const Activities = ({ dataLog, dataApplicant }) => {
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
    ownerApply: getIcon("icon_owner_apply"),
  };
  console.log("dataApplicant", dataApplicant);
  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const isActive = methods.watch("isActive");

  console.log(dataLog);
  return (
    <Grid item sx={{ padding: "12px 0 0 0" }}>
      <FormProvider methods={methods}>
        <SwitchDS name={"isActive"} label={"Hiển thị hoạt động"} />
      </FormProvider>

      {isActive ? (
        <Box>
          <List
            sx={{ width: "100%", pt: "16px" }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            {dataLog?.events &&
              dataLog?.events.map((p, index) => {
                var stagePrevious = "";
                var stageResultPrevious = "";
                if (index < dataLog?.events?.length) {
                  stagePrevious =
                    dataLog?.events[index + 1]?.recruitmentPipelineStateType;
                  stageResultPrevious =
                    dataLog?.events[index + 1]?.pipelineStateResultType;
                }
                console.log("stagePrevious", stagePrevious);
                console.log("stageResultPrevious", stageResultPrevious);
                return (
                  <div key={index}>
                    {p.eventType.includes("AddApplicantToRecruitmentEvent") && (
                      <NotificationBoard
                        icon={ICONS.apply}
                        title={
                          <div>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {p?.creatorName}
                              </span>
                              {" đã thêm "}
                              <span style={{ fontWeight: 600 }}>
                                {dataApplicant?.fullName}
                              </span>
                              {" vào tin tuyển dụng "}
                              <span style={{ fontWeight: 600 }}>
                                {"Tin tuyển dụng phổ biến"}
                              </span>
                            </p>
                          </div>
                        }
                        action="add"
                        avatarName={p?.creatorName}
                        // stagePrevious={stagePrevious}
                        // stageResultPrevious={stageResultPrevious}
                        // creatorName={p?.creatorName}
                        // applicantName={dataApplicant?.fullName}
                        // recruitmentName={"Tin tuyển dụng phổ biến"}
                      />
                    )}
                    {p.eventType.includes(
                      "UpdateApplicantRecruitmentEvent"
                    ) && <div>update</div>}
                  </div>
                );
              })}
            {/* 
            <NotificationBoard
              icon={ICONS.apply}
              candidate="Ứng viên Đinh Tiến Thành"
              action="apply"
            />
            <NotificationBoard
              icon={ICONS.ownerApply}
              candidate="Phạm Xuân Chung đã thêm ứng viên Đinh Tiến Thành vào bước Ứng tuyển."
              action="ownerApply"
            />
            <NotificationBoard
              icon={ICONS.success}
              competition="Ứng viên Đinh Tiến Thành đã tự động chuyển sang bước Thi tuyển"
              action="competition"
            /> */}

            {/* <NotificationBoard
              icon={ICONS.success}
              manager="Phạm Xuân Chung"
              action="success"
            />
            <NotificationBoard
              icon={ICONS.fail}
              manager="Phạm Xuân Chung"
              action="fail"
            /> */}
            {/* <NotificationBoard
              icon={ICONS.consider}
              manager="Phạm Xuân Chung"
              action="consider"
            /> */}
            {/* <NotificationBoard
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
            /> */}
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
