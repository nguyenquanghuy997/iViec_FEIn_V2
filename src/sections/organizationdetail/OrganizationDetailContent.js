import React, {useMemo, useState} from 'react'
import {Box, IconButton, Link, Typography} from "@mui/material";
import {get} from 'lodash';
import NextLink from "next/link";
import {useForm} from "react-hook-form";
import {OrganizationNameStyle} from "@/sections/organizationdetail/style";
import Iconify from "@/components/Iconify";
import {EmailIcon, MapIcon, PhoneIcon} from "@/sections/organizationdetail/component/Icon";
import {PATH_DASHBOARD} from "@/routes/paths";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import OrganizationUserFilterModal from "@/sections/organizationdetail/component/OrganizationUserFilterModal";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import OrganizationDetailTableHeader from "@/sections/organizationdetail/component/OrganizationDetailTableHeader";
import OrganizationCard from "@/sections/organizationdetail/component/OrganizationCard";
import {modalSlice} from "@/redux/common/modalSlice";
import {useDispatch, useSelector} from "@/redux/store";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import {
  AlertIcon,
  CheckedSwitchIcon,
  UnCheckedSwitchIcon
} from "@/sections/organization/component/Icon";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import {DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import OrganizationDetailUserForm from "@/sections/organizationdetail/component/OrganizationDetailUserForm";
import {API_GET_RECRUITMENT_BY_ORGANIZATION} from "@/routes/api";
import {useRouter} from "next/router";
import {useDeleteUserMutation, useActiveUsersMutation} from "@/sections/organization/override/OverrideOrganizationSlice";
import {useSnackbar} from "notistack";
import Switch from "@/components/form/Switch";

const defaultValues = {
  searchKey: "",
};

const columns = [
  {
    dataIndex: "registrationTime",
    title: "Ngày tham gia",
    type: "date",
    label: "Ngày tham gia",
    name: "createdTime",
    items: [
      {
        name: "createdTimeFrom",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Từ</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
      {
        name: "createdTimeTo",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Đến</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
    ],
  },
  {
    dataIndex: "isActive",
    title: "Trạng thái",
    name: "isActive",
    type: "select",
    label: "Trạng thái",
  },
  {
    dataIndex: "creatorName",
    title: "Người mời tham gia",
    name: "creatorIds",
    label: "Người mời",
    placeholder: "Chọn 1 hoặc nhiều người",
    type: "select",
    multiple: true,
  },
  {
    dataIndex: "applicationUserRoleGroups",
    title: "Vai trò",
    name: "applicationUserRoleGroups",
    label: "Vai trò",
    placeholder: "Chọn 1 hoặc nhiều vai trò",
    remoteUrl: API_GET_RECRUITMENT_BY_ORGANIZATION,
    type: "select",
    multiple: true,
  },
];

const OrganizationDetailContent = ({organization, ListUser, ListOrganization}) => {
  const router = useRouter();
  const { asPath } = router;
  const dispatch = useDispatch();
  const {enqueueSnackbar} = useSnackbar();

  const [deleteUserMulti] = useDeleteUserMutation();
  const [activeUserMulti] = useActiveUsersMutation();

  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  // modal redux
  const toggleFormUser = useSelector((state) => state.modalReducer.openForm);
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const {openDelete, openActive} = toggleModalState;
  const item = useSelector((state) => state.modalReducer.data);

  const handleOpenModalState = (data) => dispatch(modalSlice.actions.openStateModal(data));

  const handleOpenConfirm = (data) => dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) => dispatch(modalSlice.actions.activeModal(data));
  const handleOpenFormUser = (data) => dispatch(modalSlice.actions.openModal(data));

  const handleOpenBottomNav = (data) => dispatch(modalSlice.actions.onBottomNavModal(data));

  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  const handleOpenForm = () => {
    setIsOpen(true);
  }

  const handleCloseForm = () => {
    setIsOpen(false);
  }

  const methods = useForm({
    mode: "all",
    defaultValues,
  });

  const {handleSubmit} = methods;

  // open filter form
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpenFilter(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpenFilter(false);
  };

  const onSubmitSearch = async (data) => {
    return data;
  };

  const onSubmit = (data) => {
    return router.push({
      pathname: router.pathname,
      query: {
        isActive: data.isActive
      },
    }, asPath, { shallow: true })
  };

  const handleSelected = (data) => {
    let findIndex = selected.map(i => i.id).indexOf(data.id);
    if (findIndex !== -1) {
      const selectedNext = [...selected].filter(i => i.id !== data.id)
      setSelected(selectedNext);
    } else {
      const selectedNext = [...selected, {...data}]
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
    if(selected?.length >= 1) {
      try {
        await deleteUserMulti({ userIds: selected?.map(item => item.id)}).unwrap();
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
          await deleteUserMulti({ userIds: [data?.id]}).unwrap();
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

  return (
      <Box>
        {/* Name */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <NextLink href={PATH_DASHBOARD.organization.root} passHref>
            <Link>
              <IconButton size='small' sx={{color: '#172B4D', mr: 1}}>
                <Iconify icon="material-symbols:arrow-back"/>
              </IconButton>
            </Link>
          </NextLink>
          <OrganizationNameStyle className="organization-title">
            {get(organization, 'name') && `${get(organization, 'name')}`}
          </OrganizationNameStyle>
          <IconButton onClick={handleOpenForm} size='small' sx={{color: '#8A94A5', ml: 1}}>
            <Iconify icon="ri:edit-2-fill"/>
          </IconButton>
        </Box>
        {/* End Name */}
        {/* Sub info */}
        <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <EmailIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'email') && `${get(organization, 'email')}`}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <PhoneIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'phoneNumber') && `${get(organization, 'phoneNumber')}`}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <MapIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'address') && `${get(organization, 'address')}, `}
              {get(organization, 'districtName') && `${get(organization, 'districtName')}, `}
              {get(organization, 'provinceName') && `${get(organization, 'provinceName')}`}
            </Typography>
          </Box>
        </Box>
        {/* End Sub info */}
        {/* Table */}
        <Box sx={{mt: 2}}>
          <OrganizationDetailTableHeader
              methods={methods}
              isOpen={isOpenFilter}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
              setIsOpenInviteForm={setIsOpenInviteForm}
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
        {/* Filer */}
        {isOpenFilter &&
            <OrganizationUserFilterModal
                columns={columns}
                isOpen={isOpenFilter}
                onClose={handleCloseFilterForm}
                onSubmit={onSubmit}
            />
        }
        {
            isOpenInviteForm && <OrganizationInviteForm
                ListOrganization={ListOrganization}
                isOpenInviteForm={isOpenInviteForm}
                setIsOpenInviteForm={setIsOpenInviteForm}
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
            icon={<AlertIcon/>}
            data={selected}
            onSubmit={handleDelete}
            title={<Typography sx={{
              textAlign: 'center',
              width: '100%',
              fontSize: style.FONT_BASE,
              fontWeight: style.FONT_SEMIBOLD,
              mb: 2,
            }}>Xác nhận xóa người dùng</Typography>}
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
            icon={selectedStatus ? <UnCheckedSwitchIcon/> : <CheckedSwitchIcon/>}
            data={selected}
            onSubmit={handleActive}
            title={
              <Typography
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    fontSize: style.FONT_BASE,
                    fontWeight: style.FONT_SEMIBOLD,
                    color: selected.every(item => item.isActive === true) ? style.COLOR_TEXT_DANGER : style.COLOR_PRIMARY,
                    mb: 2
                  }}>
                {selected.every(item => item.isActive === true) ? "Tắt trạng thái hoạt động cho người dùng" : "Bật trạng thái hoạt động cho người dùng"}
              </Typography>
            }
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
                        icon: <EditIcon/>,
                        onClick: () => handleOpenFormUser(selected[0])
                      },
                      {
                        key: 'delete',
                        icon: <DeleteIcon/>,
                        onClick: () => handleOpenModalState({openDelete: true}),
                      }
                    ].filter(item => listKeyActions?.includes(item.key))}

                />
            )
        }
      </Box>
  )
}

export default OrganizationDetailContent;