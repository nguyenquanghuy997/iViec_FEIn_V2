import EmptyIcon from "../../../../assets/EmptyIcon";
import NotificationBoard from "./NotificationBoard";
import { SwitchDS } from "@/components/DesignSystem";
import { FormProvider } from "@/components/hook-form";
import { PipelineStateType, srcImage } from "@/utils/enum";
import { Box, Grid } from "@mui/material";
import List from "@mui/material/List";
import React from "react";
import { useForm } from "react-hook-form";
import { iconLogPipe } from "./config";

export const Activities = ({ dataLog, dataApplicant }) => {
  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const isActive = methods.watch("isActive");
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
                return (
                  <div key={index}>
                    {p.eventType.includes("AddApplicantToRecruitmentEvent") && (
                      <NotificationBoard
                        icon={iconLogPipe('add',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                        title={
                          <div>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {p?.creatorName}
                              </span>
                              {" đã chuyển "}
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
                        isShow={false}
                      />
                    )}
                    {p.eventType.includes("CreateApplicantRecruitmentEvent") &&
                      (p.creatorId ? (
                        <NotificationBoard
                          icon={iconLogPipe('add',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.creatorName}
                                </span>
                                {" đã thêm ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" vào bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.creatorName}
                          isShow={false}
                        />
                      ) : (
                        <NotificationBoard
                          icon={iconLogPipe('create',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                          title={
                            <div>
                              <p>
                                {"Ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" đã ứng tuyển."}
                              </p>
                            </div>
                          }
                          action="create"
                          avatarName={dataApplicant?.fullName}
                          avatarSrc={dataApplicant?.portraitImage ? srcImage(dataApplicant?.portraitImage): ''}
                          isShow={false}
                        />
                      ))}
                    {p.eventType.includes("UpdateApplicantRecruitmentEvent") &&
                      (p?.recruitmentPipelineStateType == 3 &&
                      p?.pipelineStateResultType == 2 &&
                      p.updaterId ? (
                        <NotificationBoard
                          icon={iconLogPipe('result',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã "}
                                <span
                                  style={{ fontWeight: 600, color: "#E53935" }}
                                >
                                  {" Loại "}
                                </span>
                                {" ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}.
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                        />
                      ) : 
                      
                      p.updaterId ? (
                        <NotificationBoard
                        icon={iconLogPipe('result',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                          title={
                            <div>
                              <p>
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã chuyển ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                                {" từ bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    stagePrevious,
                                    stageResultPrevious
                                  )}
                                </span>
                                {" sang bước "}
                                <span
                                  style={{
                                    fontWeight: 600,
                                    color:
                                      p?.recruitmentPipelineStateType == 3 &&
                                      (p?.pipelineStateResultType == 0
                                        ? "#388E3C"
                                        : "#F77A0C"),
                                  }}
                                >
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                        />
                      ) : (
                        <NotificationBoard
                          icon={iconLogPipe('result',p.recruitmentPipelineStateType, p.pipelineStateResultType)}
                          title={
                            <div>
                              <p>
                                {"Ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {p?.updaterName}
                                </span>
                                {" đã tự động chuyển từ bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    stagePrevious,
                                    stageResultPrevious
                                  )}
                                </span>
                                {" sang bước "}
                                <span style={{ fontWeight: 600 }}>
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.pipelineStateResultType
                                  )}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                        />
                      ))}
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
