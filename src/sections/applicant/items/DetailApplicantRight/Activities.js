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
import {useTheme} from "@mui/material/styles";

export const Activities = ({ dataLog, dataApplicant }) => {
  const methods = useForm({
    defaultValues: { isActive: !false },
  });
  const  theme = useTheme();
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
                                {dataLog?.recruitmentName}
                              </span>
                            </p>
                          </div>
                        }
                        action="add"
                        avatarName={p?.creatorName}
                        isShow={false}
                        data={p}
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
                          data={p}
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
                                {" đã ứng tuyển"}
                              </p>
                            </div>
                          }
                          action="create"
                          avatarName={dataApplicant?.fullName}
                          avatarSrc={dataApplicant?.portraitImage ? srcImage(dataApplicant?.portraitImage): ''}
                          data={p}
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
                                  style={{ fontWeight: 600, color: theme.palette.common.red600 }}
                                >
                                  {" Loại "}
                                </span>
                                {" ứng viên "}
                                <span style={{ fontWeight: 600 }}>
                                  {dataApplicant?.fullName}
                                </span>
                              </p>
                            </div>
                          }
                          action="add"
                          avatarName={p?.updaterName}
                          isShow={false}
                          data={p}
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
                                    p?.stagePrevious,
                                    p?.stageResultPrevious
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
                                        : theme.palette.common.orange700),
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
                          data={p}
                          
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
                                    p?.stagePrevious,
                                    p?.stageResultPrevious
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
                          data={p}
                        />
                      ))}
                      {p.eventType.includes("CreateApplicantReviewEvent") && (
                      <NotificationBoard
                      isShow={true}
                      icon={iconLogPipe('review',p.recruitmentPipelineStateType)}
                        title={
                          <div>
                            <p>
                              <span style={{ fontWeight: 600 }}>
                                {p?.creatorName}
                              </span>
                              {" đã đánh giá ứng viên "}
                              <span style={{ fontWeight: 600 }}>
                                {dataApplicant?.fullName}
                              </span>
                              {" với kết quả "}
                              <span
                                  style={{
                                    fontWeight: 600,
                                    color:
                                      p?.recruitmentPipelineStateType == 2 &&
                                      (p?.applicantReviewResultType == 0
                                        ? "#388E3C"
                                        : p?.applicantReviewResultType == 1? theme.palette.common.orange700: theme.palette.common.red600),
                                  }}
                                >
                                  {PipelineStateType(
                                    p?.recruitmentPipelineStateType,
                                    p?.applicantReviewResultType
                                  )}
                                </span>
                            </p>
                          </div>
                        }
                        action="add"
                        avatarName={p?.creatorName}
                        data={p}
                      />
                    )}
                  </div>
                );
              })}
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
            Danh sách hoạt động tạm ẩn.
          </p>
        </div>
      )}
    </Grid>
  );
};
