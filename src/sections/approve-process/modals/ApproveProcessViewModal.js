import { ButtonDS, SwitchStatusDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { useGetPreviewApproveProcessQuery } from "@/sections/approve-process/ApproveProcessSlice";
import { ViewModel } from "@/utils/cssStyles";
import { CircularProgress, Divider, Grid, Modal, Typography } from "@mui/material";
import React from "react";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import AvatarDS from "../../../components/DesignSystem/AvatarDS";
import { LightTooltip } from "@/components/DesignSystem/TooltipHtml";
import { useTheme } from "@mui/material/styles";
import { getNumberUserDetail } from "@/sections/approve-process/config";

export const ApproveProcessViewModal = ({title, data, show, setShow, handleEdit}) => {
  const {data: preview = {}} = useGetPreviewApproveProcessQuery({Id: data?.id}, {skip: !data?.id || !show});
  const isLoading = !preview.id;
  const theme = useTheme();
  // action
  const pressHide = () => {
    setShow(false);
  };
  
  const moveToEdit = () => {
    pressHide();
    handleEdit();
  };
  return (
    <Modal
      open={show}
      onClose={pressHide}
      sx={{display: "flex", justifyContent: "flex-end", ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"}}}
    >
      <ViewModel>
        {/* header */}
        <View
          flexrow="true"
          atcenter="center"
          pv={12}
          ph={24}
          bgcolor={theme.palette.common.white}
        >
          <Text flex="true" fontsize={16} fontweight={"600"}>
            Xem {title.toLowerCase()}
          </Text>
          <ButtonDS
            type="submit"
            sx={{
              backgroundColor: theme.palette.background.paper,
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#EFF3F7",
              },
              textTransform: "none",
              padding: "12px",
              minWidth: "unset",
            }}
            onClick={pressHide}
            icon={
              <Iconify
                icon={"mi:close"}
                width={20}
                height={20}
                color={theme.palette.common.borderObject}
              />
            }
          />
        </View>
        <Divider/>
        {/* body */}
        {isLoading ? (
          <View flex="true" contentcenter="true">
            <CircularProgress/>
          </View>
        ) : (
          (
            <View flex="true" p={24} pb={28} style={{overflowY: "scroll"}}>
              <Typography variant={"h3"} color={theme.palette.common.neutral800}>
                {preview.name}
              </Typography>
              <Grid mt={3} container direction="row" justifyContent="flex-start"
                    alignItems="stretch">
                <Grid item xs={1}>Mô tả:</Grid>
                <Grid item xs={11}>
                  {preview.description}
                </Grid>
              </Grid>
              <Divider sx={{my: 3}}/>
              <Typography variant={"subtitle1"} color={theme.palette.common.neutral700} mb={2}>
                Cán bộ phê duyệt
              </Typography>
              {preview.approvalProcessLevels.map((item, index) => {
                return (<View
                  style={{
                    padding: 16,
                    marginBottom: 24,
                    borderRadius: 6,
                    backgroundColor: theme.palette.common.bgrMaster
                  }}
                  key={item.id}>
                  <Grid container direction="row" justifyContent="space-between" alignItems="center">
                    <Grid item>
                      <Typography variant={"subtitle1"} color={theme.palette.common.neutral700}>
                        Cấp {index + 1}
                      </Typography>
                    </Grid>
                    <Grid item>
                      <Typography variant={"textSize13500"} color={theme.palette.common.neutral700}>
                        Đã
                        chọn {getNumberUserDetail(item?.approvalProcessLevelDetails)}
                      </Typography>
                    </Grid>
                    <Grid mb={"10px"} mt={"10px"} container direction="row" justifyContent="flex-start"
                          alignItems="baseline">
                      <Grid item pr={1}>
                        <Typography variant={"textSize13500"} color={theme.palette.common.neutral700}>
                          Vai trò:
                        </Typography>
                      </Grid>
                      <Grid item>
                        {item?.approvalProcessLevelDetails.map((itemRole, index) => {
                          if (itemRole.processLevelDetailType === 0)
                            return (<Typography key={itemRole.id} variant={"subtitle2"}
                                                mb={1} color={theme.palette.common.neutral700}>
                              {itemRole.roleGroupName} ({itemRole.processLevelDetailPersonInCharges.length}) {(index + 1) < item?.approvalProcessLevelDetails.length ? "," : ""}
                            </Typography>)
                        })}
                      </Grid>
                    </Grid>
                    <Grid mb={1} container direction="column" justifyContent="flex-start"
                          alignItems="baseline">
                      <Grid item pr={1} mb={"10px"}>
                        <Typography variant={"textSize13500"} color={theme.palette.common.neutral700}>
                          Cán bộ:
                        </Typography>
                      </Grid>
                      <Grid item container direction="row">
                        {item?.approvalProcessLevelDetails.filter(x => x && x.processLevelDetailPersonInCharges).map((itemRole) => {
                          return itemRole?.processLevelDetailPersonInCharges.map((itemUser) => {
                            return (
                              <LightTooltip
                                placement="top-start"
                                key={itemUser.id}
                                title={
                                  <Grid container wrap="nowrap" p={2}
                                        direction={"row"} alignItems={"center"}>
                                    <Grid item>
                                      <AvatarDS
                                        name={itemUser?.personInChargeName}
                                        sx={{
                                          width: "40px",
                                          height: "40px",
                                          mr: "4px"
                                        }}/>
                                    </Grid>
                                    <Grid item container direction={"column"} sx={{overflowWrap: "anywhere"}}>
                                      <Grid item>
                                        <Typography variant={"subtitle2"}
                                                    color={theme.palette.common.neutral800}>
                                          {itemUser?.personInChargeName}
                                        </Typography>
                                      </Grid>
                                      <Grid item>
                                        <Typography variant={"caption"}
                                                    color={theme.palette.common.neutral800}>
                                          {itemUser?.personInChargeEmail}
                                        </Typography>
                                      </Grid>
                                    </Grid>
                                  </Grid>
                                }
                              >
                                <Grid item xs={3} mb={"10px"} wrap="nowrap" container
                                      direction="row"
                                      alignItems={"center"}>
                                  <AvatarDS
                                    name={itemUser?.personInChargeName}
                                    sx={{
                                      width: "28px",
                                      height: "28px",
                                      fontSize: "11px"
                                    }}/>
                                  <Typography
                                    variant={"textSize13500"}
                                    color={theme.palette.common.neutral700}>
                                    {itemUser?.personInChargeName}
                                  </Typography>
                                </Grid>
                              </LightTooltip>
                            )
                          })
                        })}
                      </Grid>
                    </Grid>
                  </Grid>
                </View>)
              })}
            </View>
          )
        )}
        {/* footer */}
        <View
          flexrow="true"
          jcbetween="true"
          pv={12}
          ph={16}
          boxshadow={"inset 0px 1px 0px #EBECF4"}
        >
          <View flexrow="true">
            <ButtonDS
              type="submit"
              variant="contained"
              tittle={"Chỉnh sửa"}
              onClick={moveToEdit}
            />
            <ButtonCancelStyle onClick={pressHide}>Đóng</ButtonCancelStyle>
          </View>
          <SwitchStatusDS
            checked={preview?.isAvailable}
            name={"isAvailable"}
            label={preview?.isAvailable ? "Đang áp dụng" : "Không áp dụng"}
          />
        </View>
      </ViewModel>
    </Modal>
  );
};
