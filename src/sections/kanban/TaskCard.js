import { AvatarDS, ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { srcImage } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { Box, Paper, Stack, Typography, Grid, Button, ButtonGroup } from "@mui/material";
import PropTypes from "prop-types";
import React, { memo, useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import ApplicantSendOfferModal from "@/sections/applicant/modals/ApplicantSendOfferModal";
import { Divider } from "antd";
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

function Baseitem(props) {
  const { item } = props;
  return (
    <Grid
      display="flex"
      alignItems="center"
      sx={{
        margin: '0 12px',
        "& .MuiBadge-dot": {
          width: "6px",
          minWidth: "6px",
          height: "6px",
          top: 3,
          right: 3,
        }
      }}
    >
      <AvatarDS
        sx={{ height: "32px", width: "32px", borderRadius: "14px", }}
        src={srcImage(item?.portraitImage)}
      />

      <Box pl={1}>
        <Typography fontSize="12px" display="flex" fontWeight="600" alignItems="center">
          {item?.fullName}
        </Typography>
        <Stack direction="row" spacing={2} color="#172B4D">
          <Typography fontSize="12px">
            {item.phoneNumber}
          </Typography>
        </Stack>
      </Box>
    </Grid>
  );
}

function ExaminationItem(props) {
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      <Box
        sx={{
          backgroundColor: item?.processStatus == 4 ? "#E8F5E9" : "#FFEBEE", display: "flex",
          flexDirection: "column-reverse",
          alignItems: "flex-start",
        }}
      >
        <Stack
          direction="row"
          spacing={0.5}
          p={0.5}
          color={item?.processStatus == 4 ? "##388E3C" : "#D32F2F"}
        >
          <Typography fontSize="14px" fontWeight="600">{"Điểm:"}</Typography>
          <Typography fontSize="14px" fontWeight="600" >{item?.processStatus == 4 ? "15/16" : "3/16"}</Typography>
        </Stack>
        <Stack
          direction="row"
          spacing={0.5}
          p={0.5}
          color={item?.processStatus == 4 ? "##388E3C" : "#D32F2F"}
        >
          <Typography fontSize="14px" fontWeight="600">{"Kết quả :"}</Typography>
          <Typography fontSize="14px" fontWeight="600" >{item?.processStatus == 4 ? "Đạt" : "Không Đạt"}</Typography>
        </Stack>
      </Box>
    </div>
  );
}

function InterviewItem(props) {
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      <Divider style={{ margin: '12px 0px' }} />
      <div style={{
        padding: '0 12px'
      }}>
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
            fontSize: "12px",
            fontWeight: 600,
            padding: "6px 12px",
            textTransform: "none",
          }}
        />
      </div>


    </div>
  );
}

function ResultItem(props) {
  const [isOpenSendOffer, setIsOpenSendOffer] = useState(false);
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      <Divider style={{ margin: '12px 0px' }} />
      <div style={{ padding: '0 12px' }}>
        <Box>
          <Box
            sx={{
              // display: "flex",
              // justifyContent: "space-between",
              bgcolor: "background.paper",
              borderRadius: 1,
            }}
          >
            <ButtonGroup fullWidth={true} style={{border:'1px solid #E7E9ED'}}>
              <Button
                type="submit"
                sx={{
                  border: 'none',
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
                    backgroundColor: "#4CAF50",
                    color: '#FDFDFD',
                    border: 'none',
                  },
                  fontSize: "12px",
                  padding: "6px 10px",
                }}>
                  Đạt
              </Button>
              <Button
                type="submit"
                sx={{
                  border: 'none',
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
                    backgroundColor: "#FF9800",
                    color: '#FDFDFD',
                    border: 'none',
                  },
                  fontSize: "12px",
                  padding: "6px 10px",
                  textTransform: "none",
                }}
              >Cân nhắc</Button>
              <Button
                type="submit"
                sx={{
                  border: 'none',
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
                    backgroundColor: "#F44336",
                    color: '#FDFDFD',
                    border: 'none',
                  },
                  marginLeft: "2px",
                  fontSize: "12px",
                  padding: "6px 10px",
                  textTransform: "none",
                }}
              >Loại</Button>
            </ButtonGroup>

          </Box>

          {item.pipelineStateResultType == 2 && (
            <ButtonDS
              tittle={"Tái Khai Thác"}
              type="submit"
              sx={{
                ":hover": {
                  backgroundColor: "#F3F4F6",
                },
                marginTop: '12px',
                pt: "2px",
                color: "#455570",
                backgroundColor: "#FFFFFF",
                borderRadius: 1,
                border: '1px solid #455570',
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 10px",
                textTransform: "none",
              }}
            />
          )}
          {item.pipelineStateResultType == 0 && (
            <ButtonDS
              onClick={() => { setIsOpenSendOffer(true) }}
              tittle={"Gửi thư mời nhận việc"}
              type="submit"
              sx={{
                ":hover": {
                  backgroundColor: "#F3F4F6",
                },
                marginTop: '12px',
                pt: "2px",
                color: "#455570",
                backgroundColor: "#FFFFFF",
                borderRadius: 1,
                border: '1px solid #455570',
                fontSize: "12px",
                fontWeight: 600,
                padding: "6px 10px",
                textTransform: "none",
              }}
            />
          )}
        </Box>
        {
          isOpenSendOffer && <ApplicantSendOfferModal
            isOpen={isOpenSendOffer}
            onClose={() => setIsOpenSendOffer(false)}
            showUploadFile={true}
            title="Tạo thư mời nhận việc"
          />
        }
      </div>
    </div>
  );
}
function OfferItem(props) {
  const { item } = props;
  return (
    <div>
      <Baseitem item={item} />
      {item.offerStateResultType == 0 && (
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
      {item.offerStateResultType == 1 && (
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
      {item.offerStateResultType == 2 && (
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
      {item.offerStateResultType == 3 && (
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


    </div>
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
                border: 'none',
                borderRadius: '4px',
                boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                mb: 2,
                // boxShadow: (theme) => theme.customShadows.z1,
                "&:hover": {
                  // border: '0.5px solid #5C6A82',
                  // boxShadow: (theme) => theme.customShadows.z16,
                  boxShadow: '0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
                },
              }}
            >
              <Box
                sx={{
                  justifyContent: "space-between",
                  display: "flex",
                  flexDirection: "row",
                  p: '16px 12px 4px 12px',
                }}
              >
                <Typography
                  display="flex"
                  fontSize="11px"
                  lineHeight={18}
                  fontWeight="600"
                  alignItems="center"
                >
                  <Iconify
                    icon={"carbon:dot-mark"}
                    width={12}
                    height={12}
                    color="#4CAF50"
                    mr={1}
                  />
                  <Typography fontSize="12px">
                    {fDate(item.createdTime)}
                  </Typography>
                </Typography>
                <Iconify
                  icon={"ph:dots-three-bold"}
                  width={20}
                  height={20}
                  color="#455570"
                />
              </Box>

              <Box sx={{ cursor: 'pointer' }}>
                <Stack
                  spacing={1}
                  sx={{ borderRadius: '8px', padding: '0 0px 16px', background: "#FDFDFD" }}
                >
                  {pipelineStateType == 0 && <Baseitem item={item} />}
                  {pipelineStateType == 1 && <ExaminationItem item={item} />}
                  {pipelineStateType == 2 && <InterviewItem item={item} />}
                  {pipelineStateType == 3 && <ResultItem item={item} />}
                  {pipelineStateType == 4 && <OfferItem item={item} />}

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
