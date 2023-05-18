import {get, isEmpty} from 'lodash'
import {Box, CircularProgress, Drawer, IconButton, Typography} from "@mui/material";
import {useGetOrganizationByIdQuery} from "@/sections/organization/OrganizationSlice";
import {useRouter} from "next/router";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";
import {FaRegTrashAlt} from "react-icons/fa";
import {RiArrowRightLine} from "react-icons/ri";
import {useTheme} from "@mui/material/styles";
import palette from "@/theme/palette";


const renderInfoOrganization = (key, value) => {
  return (
      <Box sx={{display: 'flex', alignItems: 'flex-start', my: 3}}>
        <Typography sx={{fontSize: 14, fontWeight: 400, color: palette.light.common.neutral700, minWidth: '150px'}}>{key}:</Typography>
        <Typography sx={{fontSize: 14, fontWeight: 400, color: palette.light.common.neutral700, minWidth: '120px'}}>{value}</Typography>
      </Box>
  )
}

const OrganizationPreview = ({isOpen, onClose, nodes, setShowDelete, onGetParentNode, onOpenForm, setActionType}) => {
  const router = useRouter();

  const {data: organization, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: nodes?.id
  }, {skip: !nodes?.id});

  const handleRedirectViewDetail = (id) => {
    return router.push({ pathname: `${router.pathname}/${id}` }, undefined, { shallow: true })
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
        <Drawer
            open={isOpen}
            onClose={onClose}
            anchor="right"
            PaperProps={{
              sx: drawerPaperStyle({...theme, width: 600}),
            }}
            componentsProps={{
              backdrop: {
                sx: {
                  background: 'transparent !important',
                  boxShadow: 'none !important'
                }
              }
            }}
        >
            <FormModalHead
                title={'Xem chi tiết đơn vị'}
                onClose={onClose}
            />
          {
            isLoading ? (
                <>
                  <Box textAlign="center" my={1}>
                    <CircularProgress size={18} />
                  </Box>
                </>
            ) : (
                <div className="edit-container">
                    <Box>
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
                    </Box>
                </div>
            )
          }
            <FormModalBottom
                onClose={onClose}
                onSubmit={() => handleOpenFormWithCurrentNode(organization)}
                btnConfirm={{
                    title: 'Chỉnh sửa'
                }}
                otherAction={<>
                    <IconButton onClick={() => handleShowDelete(organization)}>
                        <FaRegTrashAlt />
                    </IconButton>
                </>}
            />
        </Drawer>
      </>
  )
}

export default OrganizationPreview;