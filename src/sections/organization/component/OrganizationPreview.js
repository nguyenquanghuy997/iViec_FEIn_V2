import { get, isEmpty } from 'lodash'
import { Box, CircularProgress, Divider, Grid, Modal, Typography } from "@mui/material";
import { useGetOrganizationByIdQuery } from "@/sections/organization/OrganizationSlice";
import { useRouter } from "next/router";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { RiArrowRightLine } from "react-icons/ri";
import { useTheme } from "@mui/material/styles";
import palette from "@/theme/palette";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import React from "react";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import { ButtonIcon, ViewModel } from "@/utils/cssStyles";


const renderInfoOrganization = (key, value) => {
  return (
    <Box sx={{display: 'flex', alignItems: 'flex-start', my: 3}}>
      <Typography sx={{
        fontSize: 14,
        fontWeight: 400,
        color: palette.light.common.neutral700,
        minWidth: '150px'
      }}>{key}:</Typography>
      <Typography sx={{
        fontSize: 14,
        fontWeight: 400,
        color: palette.light.common.neutral700,
        minWidth: '120px'
      }}>{value}</Typography>
    </Box>
  )
}

const OrganizationPreview = ({isOpen, onClose, nodes, setShowDelete, onGetParentNode, onOpenForm, setActionType}) => {
  const router = useRouter();
  
  const {data: organization, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: nodes?.id
  }, {skip: !nodes?.id});
  
  const handleRedirectViewDetail = (id) => {
    return router.push({pathname: `${router.pathname}/${id}`}, undefined, {shallow: true})
  }
  
  const handleShowDelete = (node) => {
    setShowDelete(true);
    onGetParentNode(node);
    onClose();
  }
  
  const handleOpenFormWithCurrentNode = (node) => {
    onClose();
    onOpenForm();
    setActionType(1);
    onGetParentNode(node);
  }
  const theme = useTheme();
  return (
    <>
      <Modal
        open={isOpen}
        onClose={onClose}
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          ".MuiModal-backdrop": {background: "rgba(9, 30, 66, 0.25)"},
        }}
      >
        <ViewModel
          sx={{
            width: "unset",
            justifyContent: "space-between",
          }}
        >
          <View style={{height: "calc(100% - 64px)"}}>
            <View
              flexrow
              atcenter
              pv={12}
              ph={24}
              bgcolor={theme.palette.common.white}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                Xem chi tiết đơn vị
              </Text>
              <ButtonDS
                type="submit"
                sx={{
                  backgroundColor: "#fff",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#EFF3F7",
                  },
                  textTransform: "none",
                  padding: "12px",
                  minWidth: "unset",
                }}
                onClick={onClose}
                icon={
                  <Iconify
                    icon={"mi:close"}
                    width={20}
                    height={20}
                    color="#5C6A82"
                  />
                }
              />
            </View>
            <Divider/>
            <View
              style={{
                minWidth: "600px",
                overflow: "hidden",
              }}
            >
              {
                isLoading ? (
                  <>
                    <View flex="true" contentcenter="true">
                      <CircularProgress/>
                    </View>
                  </>
                ) : (
                  <Grid
                    container
                    flexDirection={"row"}
                    height={"100%"}
                    flexWrap={"nowrap"}
                    overflow={"hidden"}
                  >
                    <Grid
                      container
                      sx={{width: "600px", overflowY: "auto", padding: "24px"}}
                      height={"100%"}
                      flexWrap={"nowrap"}
                      flexDirection={"column"}
                    >
                      <Typography sx={{fontSize: 24, fontWeight: 700, color: theme.palette.common.neutral700}}>
                        {get(organization, 'name') && get(organization, 'name')}
                      </Typography>
                      {renderInfoOrganization('Mã đơn vị', get(organization, 'code') && get(organization, 'code'))}
                      {renderInfoOrganization('Email', get(organization, 'email') && get(organization, 'email'))}
                      {renderInfoOrganization('Số điện thoại', get(organization, 'phoneNumber') && get(organization, 'phoneNumber'))}
                      {renderInfoOrganization('Địa chỉ',
                        `${!isEmpty(get(organization, 'address')) ? `${get(organization, 'address')}, ` : ''}` +
                        `${!isEmpty(get(organization, 'districtName')) ? `${get(organization, 'districtName')}, ` : ''}` +
                        `${!isEmpty(get(organization, 'provinceName')) ? `${get(organization, 'provinceName')}` : ''}`
                      )}
                      {renderInfoOrganization('Trực thuộc', get(organization, 'parentOrganizationName') && get(organization, 'parentOrganizationName'))}
                      {renderInfoOrganization('Đơn vị trực thuộc', get(organization, 'subsidiaryNames')?.map((sub, index, arr) => index < arr.length - 1 ? `${sub}, ` : `${sub}`))}
                      <Box sx={{pt: 1}}>
                        <MuiButton
                          title={"Danh sách người dùng"}
                          onClick={() => handleRedirectViewDetail(get(organization, 'id'))}
                          endIcon={<RiArrowRightLine color={theme.palette.background.paper}/>}
                          sx={{width: '100%', fontWeight: 600, justifyContent: 'center'}}
                        />
                      </Box>
                    </Grid>
                  </Grid>
                )
              }
            </View>
          </View>
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
                onSubmit={() => handleOpenFormWithCurrentNode(organization)}
              />
              <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
            </View>
            <ButtonIcon
              onClick={() => handleShowDelete(organization)}
              tooltip={"Delete"}
              icon={<img alt={""} src={"/assets/icons/delete-bin-6-line.svg"} />}
            />
          </View>
        </ViewModel>
      </Modal>
    </>
  )
}

export default OrganizationPreview;