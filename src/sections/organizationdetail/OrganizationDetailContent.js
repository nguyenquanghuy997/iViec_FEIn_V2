import React, {useEffect, useMemo, useState} from 'react'
import {Box, IconButton, Link, Stack, Typography} from "@mui/material";
import {get, isEmpty as _isEmpty} from 'lodash';
import NextLink from "next/link";
import { OrganizationNameStyle } from "@/sections/organizationdetail/style";
import Iconify from "@/components/Iconify";
import { EmailIcon, MapIcon, PhoneIcon } from "@/sections/organizationdetail/component/Icon";
import { PATH_DASHBOARD } from "@/routes/paths";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import OrganizationCard from "@/sections/organizationdetail/component/OrganizationCard";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {
  AlertIcon,
  CheckedSwitchIcon,
  UnCheckedSwitchIcon
} from "@/sections/organization/component/Icon";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import {AddIcon, DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import OrganizationDetailUserForm from "@/sections/organizationdetail/component/OrganizationDetailUserForm";
import {API_GET_ORGANIZATION_USERS} from "@/routes/api";
import { useRouter } from "next/router";
import {
  useDeleteUserMutation,
  useActiveUsersMutation,
  useGetOrganizationByIdQuery, useGetAllApplicantUserOrganizationByIdQuery, useGetListOrganizationWithChildQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";
import { useSnackbar } from "notistack";
import Switch from "@/components/form/Switch";
import {TBL_FILTER_TYPE} from "@/config";
import {LIST_STATUS} from "@/utils/formatString";
import TableHeader from "@/components/BaseComponents/table/TableHeader";
import MuiButton from "@/components/BaseComponents/MuiButton";
import LoadingScreen from "@/components/LoadingScreen";

const columns = [
  {
    dataIndex: "createdTime",
    title: "Ngày tham gia",
    colFilters: {
      type: TBL_FILTER_TYPE.RANGE_DATE,
      name: ['StartTime', 'EndTime'],
      placeholder: 'Chọn ngày',
    },
  },
  {
    dataIndex: "IsActivated",
    title: "Trạng thái",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT,
      placeholder: 'Tất cả',
      options: LIST_STATUS.map(item => ({ value: item.value, label: item.name }),)
    }
  },
  {
    dataIndex: "creatorName",
    title: "Người tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "CreatorIds",
      placeholder: "Chọn 1 hoặc nhiều người",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    },
  },
]

const OrganizationDetailContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { query = { PageIndex: 1 }, isReady } = router;

  const {data: organization = {}} = useGetOrganizationByIdQuery({
    OrganizationId: query?.id
  }, {skip: !query?.id});

  const {data: {items: ListUser = []} = {}, isLoading: loadingUser} = useGetAllApplicantUserOrganizationByIdQuery({
    OrganizationId: query?.id
  }, {skip: !query?.id});

  const {data: {items: ListOrganization = []} = {}} = useGetListOrganizationWithChildQuery();

  const [deleteUserMulti] = useDeleteUserMutation();
  const [activeUserMulti] = useActiveUsersMutation();

  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isReady) return;
  }, [isReady])

  if (loadingUser) return <LoadingScreen />;

  // modal redux
  const toggleFormUser = useSelector((state) => state.modalReducer.openForm);
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const { openDelete, openActive } = toggleModalState;
  const item = useSelector((state) => state.modalReducer.data);

  const handleOpenModalState = (data) => dispatch(modalSlice.actions.openStateModal(data));

  const handleOpenConfirm = (data) => dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) => dispatch(modalSlice.actions.activeModal(data));
  const handleOpenFormUser = (data) => dispatch(modalSlice.actions.openModal(data));

  const handleOpenBottomNav = (data) => dispatch(modalSlice.actions.onBottomNavModal(data));

  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  const handleCloseForm = () => {
    setIsOpen(false);
  }

  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);
  const [valueTabInviteForm, setValueTabInviteForm] = useState(0);

  const handleOpenListInvite = () => {
    setValueTabInviteForm(1)
    setIsOpenInviteForm(true)
  }

  const handleOpenInviteForm = () => {
    setValueTabInviteForm(0)
    setIsOpenInviteForm(true)
  }

  const handleSelected = (data) => {
    let findIndex = selected.map(i => i.id).indexOf(data.id);
    if (findIndex !== -1) {
      const selectedNext = [...selected].filter(i => i.id !== data.id)
      setSelected(selectedNext);
    } else {
      const selectedNext = [...selected, { ...data }]
      setSelected(selectedNext);
    }
  }

  // handle bottom nav
  const handleCloseBottomNav = () => {
    handleOpenBottomNav({
      data: {},
      selectedData: []
    });
    setSelected([]);
  };

  const handleDelete = async (data) => {
    if (selected?.length >= 1) {
      try {
        await deleteUserMulti({ userIds: selected?.map(item => item.id) }).unwrap();
        handleCloseModal();
        handleCloseBottomNav();
        enqueueSnackbar("Xóa người dùng thành công!", {
          autoHideDuration: 1000
        });
      } catch (e) {
        enqueueSnackbar("Xóa người dùng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        throw e;
      }
    } else {
      try {
        await deleteUserMulti({ userIds: [data?.id] }).unwrap();
        handleCloseModal();
        enqueueSnackbar("Xóa người dùng thành công!", {
          autoHideDuration: 1000
        });
      } catch (e) {
        enqueueSnackbar("Xóa người dùng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
          autoHideDuration: 1000,
          variant: 'error',
        });
        throw e;
      }
    }
  }

  const handleActive = async (data) => {
    try {
      await activeUserMulti({
        userIds: data.map(user => user.id),
        isActive: !data[0].isActive
      }).unwrap();
      handleCloseModal();
      handleCloseBottomNav();
      enqueueSnackbar("Thay đổi trạng thái người dùng thành công!", {
        autoHideDuration: 1000
      });
    } catch (e) {
      enqueueSnackbar("Thay đổi trạng thái không thành công. Vui lòng kiểm tra dữ liệu và thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
      throw e;
    }
  }

  const listKeyActions = useMemo(() => {
    const getKeysByStatus = (data) => {
      if (data.length === 1) {
        return ['active', 'edit', 'delete'];
      } else {
        const isActiveAll = selected.map((item) => item.isActive).every(item => item === true);
        const isInActiveAll = selected.map((item) => item.isActive).every(item => item === false);
        if (isActiveAll || isInActiveAll) return ['active', 'delete']
        else return ['delete']
      }
    }
    return getKeysByStatus(selected)
  }, [selected])

  const selectedStatus = useMemo(() => {
    if (selected.length < 1) {
      return true;
    }
    return selected[0].isActive;
  }, [selected]);

  const onSubmitFilter = (values = {}, reset = false, timeout = 1) => {
    if (reset && _isEmpty(router.query)) {
      return;
    }

    setTimeout(() => {
      router.push({
        query: reset ? {} : { ...router.query, ...values },
      }, undefined, { shallow: false });
    }, timeout);
  }
  
  return (
    <Box>
      {/* Name */}
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <NextLink href={PATH_DASHBOARD.organization.root} passHref>
          <Link>
            <IconButton size='small' sx={{ color: '#172B4D', mr: 1 }}>
              <Iconify icon="material-symbols:arrow-back" />
            </IconButton>
          </Link>
        </NextLink>
        <OrganizationNameStyle className="organization-title">
          {get(organization, 'name') && `${get(organization, 'name')}`}
          {
            get(organization, 'code') &&
            <Typography sx={{
              color: '#1565C0',
              background: '#E3F2FD',
              fontSize: '12px',
              fontWeight: 500,
              padding: '2px 8px',
              borderRadius: '100px',
              marginLeft: '8px'
            }}>
              {get(organization, 'code')}
            </Typography>
          }
        </OrganizationNameStyle>

        {/* <IconButton onClick={handleOpenForm} size='small' sx={{ color: '#8A94A5', ml: 1 }}>
          <Iconify icon="ri:edit-2-fill" />
        </IconButton> */}
      </Box>
      {/* End Name */}
      {/* Sub info */}
      <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
          <EmailIcon />
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#455570', ml: 1 }}>
            {get(organization, 'email') && `${get(organization, 'email')}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
          <PhoneIcon />
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#455570', ml: 1 }}>
            {get(organization, 'phoneNumber') && `${get(organization, 'phoneNumber')}`}
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mr: 3.5 }}>
          <MapIcon />
          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#455570', ml: 1 }}>
            {get(organization, 'address') && `${get(organization, 'address')}, `}
            {get(organization, 'districtName') && `${get(organization, 'districtName')}, `}
            {get(organization, 'provinceName') && `${get(organization, 'provinceName')}`}
          </Typography>
        </Box>
      </Box>
      {/* End Sub info */}
      {/* Table */}
      <Box sx={{ mt: 2 }}>
        <TableHeader
            columns={columns}
            onSubmitFilter={onSubmitFilter}
            // onClickCreate={(e) => handleOpenModel(e,null,"form")}
            // createText={canEdit && "Thêm quy trình tuyển dụng"}
            createText={'Thêm mẫu đánh giá'}
            isInside={true}
            actions={
              <>
                <Stack flexDirection="row" alignItems="center">
                  <MuiButton
                      title={"Danh sách mời"}
                      color={"default"}
                      onClick={handleOpenListInvite}
                      startIcon={<Iconify icon="mdi:folder-upload-outline" />}
                      sx={{ fontWeight: 550, marginRight: 1, "&:hover": { boxShadow: 'none' } }}
                  />
                  <MuiButton
                      title={"Mời người dùng"}
                      color={"primary"}
                      onClick={handleOpenInviteForm}
                      startIcon={<AddIcon />}
                      sx={{ fontWeight: 550 }}
                  />
                </Stack>
              </>
            }
        />
        {ListUser.map((column, index) => {
          return <OrganizationCard
            isCheckbox
            key={index}
            item={column}
            checked={selected.map(i => i.id).includes(column.id)}
            onChangeSelected={() => handleSelected(column)}
            onOpenConfirmDelete={() => handleOpenConfirm([column])}
            onOpenFormModal={() => handleOpenFormUser(column)}
            handleOpenActive={handleOpenActive}
            selected={selected}
          />
        })}
      </Box>
      {/*  Modal Edit Organization */}
      <OrganizationForm
        actionType={1}
        isOpen={isOpen}
        onClose={handleCloseForm}
        parentNode={organization}
      />
      {
        isOpenInviteForm && <OrganizationInviteForm
          ListOrganization={ListOrganization}
          isOpenInviteForm={isOpenInviteForm}
          setIsOpenInviteForm={setIsOpenInviteForm}
          valueTabDefault={valueTabInviteForm}
          organizationId={organization.id}
        />
      }
      {toggleFormUser && <OrganizationDetailUserForm
        onClose={handleCloseModal}
        isOpen={toggleFormUser}
        data={item}
      />}
      {/*  Confirm Modal  */}
      {(openDelete || toggleConfirm) && <ConfirmModal
        open={openDelete || toggleConfirm}
        onClose={handleCloseModal}
        icon={<AlertIcon />}
        data={selected}
        onSubmit={handleDelete}
        title={'Xác nhận xóa người dùng'}
        titleProps={{
          sx: {
            color: style.COLOR_TEXT_DANGER,
            fontWeight: 600,
            marginBottom: 1
          }
        }}
        subtitle={
          selected.length > 1 ?
            (
              <>Bạn có chắc chắn muốn xóa {selected.length} người dùng?</>
            ) : (
              <>Bạn có chắc chắn muốn xóa người dùng<span>{item.lastName || selected[0]?.lastName}</span>?</>
            )
        }
        btnCancelProps={{
          title: 'Huỷ',
          sx: {
            "&:hover": {
              boxShadow: 'none',
              backgroundColor: 'transparent'
            }
          }
        }}
        btnConfirmProps={{
          title: 'Xoá',
          color: 'error'
        }}
      />}
      {/* Active Modal */}
      {(openActive || toggleActive) && <ConfirmModal
        open={openActive || toggleActive}
        onClose={handleCloseModal}
        icon={selectedStatus ? <UnCheckedSwitchIcon /> : <CheckedSwitchIcon />}
        data={selected}
        onSubmit={handleActive}
        title={selected.every(item => item.isActive === true) ? "Tắt trạng thái hoạt động cho người dùng" : "Bật trạng thái hoạt động cho người dùng"}
        titleProps={{
          sx: {
            color: selectedStatus ? style.COLOR_TEXT_DANGER : style.COLOR_PRIMARY,
            fontWeight: 600,
            marginBottom: 1
          }
        }}
        subtitle={
          selected.length > 1 ?
            (
              <>Bạn có chắc chắn muốn {selected.every(item => item.isActive === true) ? ' tắt hoạt động' : ' bật hoạt động'} {selected.length} người dùng?</>
            ) : (
              <>{selected[0]?.isActive ? <>Bạn có chắc chắn muốn tắt hoạt động cho người dùng<span>{item.lastName || selected[0]?.lastName}</span></> : <>Bạn có chắc chắn muốn bật hoạt động cho người dùng<span>{item.lastName || selected[0]?.lastName}</span></>}</>
            )
        }
        btnCancelProps={{
          title: 'Huỷ',
          sx: {
            "&:hover": {
              boxShadow: 'none',
              backgroundColor: 'transparent'
            }
          }
        }}
        btnConfirmProps={{
          title: selectedStatus ? 'Tắt' : 'Bật',
          color: selectedStatus ? 'error' : 'primary'
        }}

      />}
      {
        selected.length > 0 && (
          <BottomNavModal
            data={selected}
            onClose={handleCloseBottomNav}
            open={selected.length > 0}
            actions={[
              {
                key: 'active',
                color: 'basic',
                // icon: <ActionSwitchCheckedIcon/>,
                // onClick: () => handleOpenActive(selected[0])
                component: (
                  <Switch
                    label={selectedStatus ? 'Đang hoạt động' : 'Không hoạt động'}
                    checked={selectedStatus}
                    onClick={e => {
                      handleOpenActive(e.target.checked);
                    }}
                  />
                ),
              },
              {
                key: 'edit',
                color: 'basic',
                icon: <EditIcon />,
                onClick: () => handleOpenFormUser(selected[0])
              },
              {
                key: 'delete',
                icon: <DeleteIcon />,
                onClick: () => handleOpenModalState({ openDelete: true }),
              }
            ].filter(item => listKeyActions?.includes(item.key))}

          />
        )
      }
    </Box>
  )
}

export default OrganizationDetailContent;