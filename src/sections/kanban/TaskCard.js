import { AvatarDS, ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { srcImage } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { Box, Paper, Stack, Typography, Grid } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo } from "react";
import { Draggable } from "react-beautiful-dnd";

function Item(props) {
  const { sx, ...other } = props;
  return (
    <Box
      sx={{
        display: "flex",
        fontSize: "0.875rem",
        fontWeight: "700",
        ...sx,
      }}
      {...other}
    />
  );
}

function TaskCard({ item, index, pipelineStateType }) {
  return (
    <Draggable key={item.id} draggableId={item.id} index={index}>
      {(provided) => {
        return (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Paper
              sx={{
                width: 1,
                position: "relative",
                boxShadow: (theme) => theme.customShadows.z1,
                "&:hover": {
                  boxShadow: (theme) => theme.customShadows.z16,
                },
              }}
            >
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  p: 1,
                }}
              >
                <Typography
                  display="flex"
                  fontSize="20px"
                  fontWeight="600"
                  alignItems="center"
                >
                  <Iconify
                    icon={"carbon:dot-mark"}
                    width={20}
                    height={20}
                    color="#4CAF50"
                    ml={1}
                  />
                  <Typography fontSize="12px">
                    {fDate(item.createdTime)}
                  </Typography>
                </Typography>
                <Iconify
                  icon={"ph:dots-three"}
                  width={20}
                  height={20}
                  color="#4CAF50"
                  ml={1}
                />
              </Box>

              <Box
              sx={{ cursor: 'pointer',  mb:2}}
              // onClick={onOpenUpdateTask.bind(null, card)}
              >
                <Stack
                  spacing={1}
                  sx={{
                    borderRadius: '8px' ,
                    p: 2,
                    background: "#FDFDFD",
                    // boxShadow: '0 0 0 0 rgb(9 30 66 / 25%)',
                  }}
                >
                  <Grid
                    display="flex"
                    alignItems="center"
                    sx={{
                      "& .MuiBadge-dot": {
                        width: "6px",
                        minWidth: "6px",
                        height: "6px",
                        top: 3,
                        right: 3,
                      },
                    }}
                  >
                    <AvatarDS
                      sx={{
                        height: "32px",
                        width: "32px",
                        borderRadius: "14px",
                      }}
                      src={srcImage(item?.portraitImage)}
                    ></AvatarDS>
                    <Box pl={1}>
                      <Typography
                        display="flex"
                        fontSize="13px"
                        fontWeight="600"
                        alignItems="center"
                      >
                        {item?.fullName}
                      </Typography>
                      <Stack direction="row" spacing={2} color="#172B4D">
                        <Typography fontSize="12px">
                          {item.phoneNumber}
                        </Typography>
                      </Stack>
                    </Box>
                  </Grid>
                  {/* Thi tuyển */}
                  {pipelineStateType == 1 && (
                    <Box
                      sx={{
                        backgroundColor:
                          item?.processStatus == 4 ? "#E8F5E9" : "#FFEBEE",
                        display: "flex",
                        flexDirection: "column-reverse",
                        alignItems: "flex-start",
                      }}
                    >
                      {/* <Stack
              direction="row"
              
              spacing={0.5}
              p={0.5}
              color={item?.processStatus==4?"##388E3C":"#D32F2F"}
            >
              <Typography fontSize="14px" fontWeight="600">{"Điểm:"}</Typography>
              <Typography fontSize="14px" fontWeight="600" >{item?.processStatus==4?"15/16":"3/16"}</Typography>
            </Stack>
            <Stack
              direction="row"
              spacing={0.5}
              p={0.5}
              color={item?.processStatus==4?"##388E3C":"#D32F2F"}
            >
              <Typography fontSize="14px" fontWeight="600">{"Kết quả :"}</Typography>
              <Typography fontSize="14px" fontWeight="600" >{item?.processStatus==4?"Đạt":"Không Đạt"}</Typography>
            </Stack> */}
                    </Box>
                  )}
                  {/* Phỏng vấn */}
                  {pipelineStateType == 2 && (
                    <ButtonDS
                      tittle={"Đặt lịch phỏng vấn"}
                      type="submit"
                      sx={{
                        ":hover": {
                          backgroundColor: "#F3F4F6",
                        },
                        pt: "2px",
                        color: "#455570",
                        backgroundColor: "#FFFFFF",
                        borderRadius: 1,
                        border: 1,
                        borderColor: "#455570",
                        marginRight: "2px",
                        fontSize: "14px",
                        padding: "6px 12px",
                        textTransform: "none",
                      }}
                    />
                  )}

                  {/* Kết quả */}
                  {pipelineStateType == 3 && (
                    <Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-around",
                          p: 1,
                          m: 1,
                          bgcolor: "background.paper",
                          borderRadius: 1,
                        }}
                      >
                        <ButtonDS
                          tittle={"Đạt"}
                          type="submit"
                          sx={{
                            color:
                              item.pipelineStateResultType == 0
                                ? "#FDFDFD"
                                : "#455570",
                            backgroundColor:
                              item.pipelineStateResultType == 0
                                ? "#4CAF50"
                                : "#FDFDFD",
                            boxShadow: "none",
                            ":hover": {
                              backgroundColor: "#E7E9ED",
                            },
                            marginRight: "2px",
                            fontSize: "12px",
                            padding: "6px 12px",
                          }}
                        />
                        <ButtonDS
                          tittle={"Cân Nhắc"}
                          type="submit"
                          sx={{
                            color:
                              item.pipelineStateResultType == 1
                                ? "#FDFDFD"
                                : "#455570",
                            backgroundColor:
                              item.pipelineStateResultType == 1
                                ? "#FF9800"
                                : "#FDFDFD",
                            boxShadow: "none",
                            ":hover": {
                              backgroundColor: "#1565C0",
                            },
                            marginRight: "2px",
                            fontSize: "12px",
                            padding: "6px 12px",
                            textTransform: "none",
                          }}
                        />
                        <ButtonDS
                          tittle={"Loại"}
                          type="submit"
                          mr={2}
                          sx={{
                            color:
                              item.pipelineStateResultType == 2
                                ? "#FDFDFD"
                                : "#455570",
                            backgroundColor:
                              item.pipelineStateResultType == 2
                                ? "#F44336"
                                : "#FDFDFD",
                            boxShadow: "none",
                            ":hover": {
                              backgroundColor: "#01B6A7",
                            },
                            marginLeft: "2px",
                            fontSize: "12px",
                            padding: "6px 12px",
                            textTransform: "none",
                          }}
                        />
                      </Box>

                      {item.pipelineStateResultType == 2 && (
                        <ButtonDS
                          tittle={"Tái Khai Thác"}
                          type="submit"
                          sx={{
                            ":hover": {
                              backgroundColor: "#F3F4F6",
                            },
                            pt: "2px",
                            color: "#455570",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 1,
                            border: 1,
                            borderColor: "#455570",
                            marginRight: "2px",
                            fontSize: "14px",
                            padding: "6px 12px",
                            textTransform: "none",
                          }}
                        />
                      )}
                      {item.pipelineStateResultType == 0 && (
                        <ButtonDS
                          tittle={"Gửi thư mời nhận việc"}
                          type="submit"
                          sx={{
                            ":hover": {
                              backgroundColor: "#F3F4F6",
                            },
                            pt: "2px",
                            color: "#455570",
                            backgroundColor: "#FFFFFF",
                            borderRadius: 1,
                            border: 1,
                            borderColor: "#455570",
                            marginRight: "2px",
                            fontSize: "14px",
                            padding: "6px 12px",
                            textTransform: "none",
                          }}
                        />
                      )}
                    </Box>
                  )}
                  {/* Mời nhận việc */}
                  {pipelineStateType == 4 && item.offerStateResultType == 0 && (
                    <Box sx={{ display: "flex", pt: 1 }}>
                      <Item sx={{ flexShrink: 1 }}>
                        <Iconify
                          icon={"ri:mail-check-fill"}
                          width={20}
                          height={20}
                          color="#172B4D"
                        />
                      </Item>
                      <Item sx={{ width: "100%", color: "#172B4D" }}>
                        Đã tạo thư mời nhận việc
                      </Item>
                      <Item sx={{ flexShrink: 0 }}>
                        <Iconify
                          icon={"fluent-mdl2:circle-half-full"}
                          width={20}
                          height={20}
                          color="#172B4D"
                        />
                      </Item>
                    </Box>
                  )}
                  {pipelineStateType == 4 && item.offerStateResultType == 1 && (
                    <Box sx={{ display: "flex", pt: 1 }}>
                      <Item sx={{ flexShrink: 1 }}>
                        <Iconify
                          icon={"ic:round-mark-email-unread"}
                          width={20}
                          height={20}
                          color="#F77A0C"
                        />
                      </Item>
                      <Item sx={{ width: "100%", color: "#F77A0C" }}>
                        Đã gửi, chờ phản hồi
                      </Item>
                      <Item sx={{ flexShrink: 0 }}>
                        <Iconify
                          icon={"fluent-mdl2:circle-half-full"}
                          width={20}
                          height={20}
                          color="#F77A0C"
                        />
                      </Item>
                    </Box>
                  )}
                  {pipelineStateType == 4 && item.offerStateResultType == 2 && (
                    <Box sx={{ display: "flex", pt: 1 }}>
                      <Item sx={{ flexShrink: 1 }}>
                        <Iconify
                          icon={"material-symbols:check-circle"}
                          width={20}
                          height={20}
                          color="#388E3C"
                        />
                      </Item>
                      <Item sx={{ width: "100%", color: "#388E3C" }}>
                        Đồng ý nhận việc
                      </Item>
                      <Item sx={{ flexShrink: 0 }}>
                        <Iconify
                          icon={"fluent-mdl2:circle-half-full"}
                          width={20}
                          height={20}
                          color="#388E3C"
                        />
                      </Item>
                    </Box>
                  )}
                  {pipelineStateType == 4 && item.offerStateResultType == 3 && (
                    <Box sx={{ display: "flex", pt: 1 }}>
                      <Item sx={{ flexShrink: 1 }}>
                        <Iconify
                          icon={"mdi:alpha-x-circle"}
                          width={20}
                          height={20}
                          color="#D32F2F"
                        />
                      </Item>
                      <Item sx={{ width: "100%", color: "#D32F2F" }}>
                        Từ chối nhận việc
                      </Item>
                      <Item sx={{ flexShrink: 0 }}>
                        <Iconify
                          icon={"fluent-mdl2:circle-half-full"}
                          width={20}
                          height={20}
                          color="#D32F2F"
                        />
                      </Item>
                    </Box>
                  )}

                  <Box
                    display="Grid"
                    alignItems="center"
                    gridTemplateColumns="60px 1fr"
                  ></Box>
                </Stack>
              </Box>
            </Paper>
          </div>
        );
      }}
    </Draggable>
  );
}

TaskCard.propTypes = {
  index: PropTypes.number,
  item: PropTypes.object,
};

export default memo(TaskCard);
