import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import FolderIcon from "@/assets/FolderIcon";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import MuiButton from "@/components/BaseComponents/MuiButton";
import TableHeader from "@/components/BaseComponents/table/TableHeader";
import { Text, View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import LoadingScreen from "@/components/LoadingScreen";
import SvgIcon from "@/components/SvgIcon";
import Switch from "@/components/form/Switch";
import { TBL_FILTER_TYPE } from "@/config";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import {
  API_GET_LIST_ROLE_GROUP,
  API_GET_ORGANIZATION_USERS,
} from "@/routes/api";
import { PATH_DASHBOARD } from "@/routes/paths";
import {
  AlertIcon,
  CheckedSwitchIcon,
  UnCheckedSwitchIcon,
} from "@/sections/organization/component/Icon";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import {
  useActiveUsersMutation,
  useDeleteUserMutation,
  useGetAllApplicantUserOrganizationByIdQuery,
  useGetListOrganizationWithChildQuery,
  useGetOrganizationByIdQuery,
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {
  EmailIcon,
  MapIcon,
  PhoneIcon,
} from "@/sections/organizationdetail/component/Icon";
import OrganizationCard from "@/sections/organizationdetail/component/OrganizationCard";
import OrganizationDetailUserForm from "@/sections/organizationdetail/component/OrganizationDetailUserForm";
import { OrganizationNameStyle } from "@/sections/organizationdetail/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import {
  Box,
  CircularProgress,
  IconButton,
  Link,
  Stack,
  Typography,
} from "@mui/material";
import { isEmpty as _isEmpty, get } from "lodash";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";

const columns = [
  {
    dataIndex: "createdTime",
    title: "Ngày tham gia",
    colFilters: {
      type: TBL_FILTER_TYPE.RANGE_DATE,
      name: ["TimeJoinForm", "TimeJoinTo"],
      placeholder: "Chọn ngày",
    },
  },
  {
    dataIndex: "IsActive",
    title: "Trạng thái",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT,
      name: "IsActive",
      placeholder: "Tất cả",
      options: [
        { value: null, label: "Tất cả" },
        { value: 1, label: "Đang hoạt động" },
        { value: 0, label: "Không hoạt động" },
      ],
    },
  },
  {
    dataIndex: "creatorName",
    title: "Người tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "ReferenceUserId",
      placeholder: "Chọn 1 hoặc nhiều người",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true,
    },
  },
  {
    dataIndex: "RoleGroupId",
    title: "Vai trò",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "RoleGroupId",
      placeholder: "Chọn 1 hoặc nhiều vai trò",
      remoteUrl: API_GET_LIST_ROLE_GROUP,
    },
  },
];

const OrganizationDetailContent = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { query = { PageIndex: 1 }, isReady } = router;

  const { data: organization = {} } = useGetOrganizationByIdQuery(
    {
      OrganizationId: query?.id,
    },
    { skip: !query?.id }
  );

  const { data: { items: ListUser = [] } = {}, isLoading: loadingUser } =
    useGetAllApplicantUserOrganizationByIdQuery(
      {
        OrganizationId: query?.id,
        ...router.query,
      },
      { skip: !query?.id }
    );

  const { data: { items: ListOrganization = [] } = {} } =
    useGetListOrganizationWithChildQuery();

  const [deleteUserMulti] = useDeleteUserMutation();
  const [activeUserMulti] = useActiveUsersMutation();

  const [selected, setSelected] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isReady) return;
  }, [isReady]);

  // modal redux
  const toggleFormUser = useSelector((state) => state.modalReducer.openForm);
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const { openDelete, openActive } = toggleModalState;
  const item = useSelector((state) => state.modalReducer.data);

  const handleOpenModalState = (data) =>
    dispatch(modalSlice.actions.openStateModal(data));

  const handleOpenConfirm = (data) =>
    dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) =>
    dispatch(modalSlice.actions.activeModal(data));
  const handleOpenFormUser = (data) =>
    dispatch(modalSlice.actions.openModal(data));

  const handleOpenBottomNav = (data) =>
    dispatch(modalSlice.actions.onBottomNavModal(data));

  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  const handleOpenForm = () => {
    setIsOpen(true);
  };

  const handleCloseForm = () => {
    setIsOpen(false);
  };

  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);
  const [valueTabInviteForm, setValueTabInviteForm] = useState(0);

  const handleOpenListInvite = () => {
    setValueTabInviteForm(1);
    setIsOpenInviteForm(true);
  };

  const handleOpenInviteForm = () => {
    setValueTabInviteForm(0);
    setIsOpenInviteForm(true);
  };

  const handleSelected = (data) => {
    let findIndex = selected.map((i) => i.id).indexOf(data.id);
    if (findIndex !== -1) {
      const selectedNext = [...selected].filter((i) => i.id !== data.id);
      setSelected(selectedNext);
    } else {
      const selectedNext = [...selected, { ...data }];
      setSelected(selectedNext);
    }
  };

  // handle bottom nav
  const handleCloseBottomNav = () => {
    handleOpenBottomNav({
      data: {},
      selectedData: [],
    });
    setSelected([]);
  };

  const handleDelete = async () => {
    if (selected?.length >= 1) {
      try {
        await deleteUserMulti({
          userIds: selected?.map((item) => item.id),
        }).unwrap();
        handleCloseModal();
        handleCloseBottomNav();
        enqueueSnackbar("Xóa người dùng thành công!", {
          autoHideDuration: 1000,
        });
      } catch (e) {
        if (e.status == "AUE_10") {
          enqueueSnackbar(
            "Không thể xóa do người dùng này đang có ít nhất 1 nhiệm vụ trong hệ thống!",
            {
              autoHideDuration: 1000,
              variant: "error",
            }
          );
        } else {
          enqueueSnackbar(
            "Xóa người dùng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
            {
              autoHideDuration: 1000,
              variant: "error",
            }
          );
        }

        throw e;
      }
    } else {
      try {
        await deleteUserMulti({ userIds: [item?.id] }).unwrap();
        handleCloseModal();
        enqueueSnackbar("Xóa người dùng thành công!", {
          autoHideDuration: 1000,
        });
      } catch (e) {
        if (e.status == "AUE_10") {
          enqueueSnackbar(
            "Không thể xóa do người dùng này đang có ít nhất 1 nhiệm vụ trong hệ thống!",
            {
              autoHideDuration: 1000,
              variant: "error",
            }
          );
        } else {
          enqueueSnackbar(
            "Xóa người dùng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
            {
              autoHideDuration: 1000,
              variant: "error",
            }
          );
        }
        throw e;
      }
    }
  };

  const handleActive = async (data) => {
    try {
      await activeUserMulti({
        userIds: data.map((user) => user.id),
        isActive: !data[0].isActive,
      }).unwrap();
      handleCloseModal();
      handleCloseBottomNav();
      enqueueSnackbar("Thay đổi trạng thái người dùng thành công!", {
        autoHideDuration: 1000,
      });
    } catch (e) {
      enqueueSnackbar(
        "Thay đổi trạng thái không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };

  const listKeyActions = useMemo(() => {
    const getKeysByStatus = (data) => {
      if (data.length === 1) {
        return ["active", "edit", "delete"];
      } else {
        const isActiveAll = selected
          .map((item) => item.isActive)
          .every((item) => item === true);
        const isInActiveAll = selected
          .map((item) => item.isActive)
          .every((item) => item === false);
        if (isActiveAll || isInActiveAll) return ["active", "delete"];
        else return ["delete"];
      }
    };
    return getKeysByStatus(selected);
  }, [selected]);

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
      router.push(
        {
          query: reset
            ? { ...getQueryDefault() }
            : { ...router.query, ...values },
        },
        undefined,
        { shallow: false }
      );
    }, timeout);
  };

  const getQueryDefault = () => {
    return Object.fromEntries(
      Object.entries(router.query).filter(
        ([key]) =>
          !columns.some((col) =>
            Array.isArray(col.colFilters?.name)
              ? col.colFilters?.name.some((f) => f == key)
              : key == col.colFilters?.name
          )
      )
    );
  };

  if (loadingUser) return <LoadingScreen />;

  return (
    <Box>
      {/* Name */}
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <NextLink href={PATH_DASHBOARD.organization.root} passHref>
          <Link>
            <IconButton size="small" sx={{ color: "#172B4D", mr: 1 }}>
              <Iconify icon="material-symbols:arrow-back" />
            </IconButton>
          </Link>
        </NextLink>
        <OrganizationNameStyle className="organization-title">
          {get(organization, "name") && `${get(organization, "name")}`}
          {get(organization, "code") && (
            <Typography
              sx={{
                color: "#1565C0",
                background: "#E3F2FD",
                fontSize: "12px",
                fontWeight: 500,
                padding: "2px 8px",
                borderRadius: "100px",
                marginLeft: "8px",
              }}
            >
              {get(organization, "code")}
            </Typography>
          )}
        </OrganizationNameStyle>

        <IconButton
          size="small"
          sx={{ color: "#172B4D", ml: "9px" }}
          onClick={handleOpenForm}
        >
          <SvgIcon>
            {
              '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_152921)"> <path d="M6.93225 14.25H15.75V15.75H2.25V12.5678L9.675 5.14275L12.8565 8.32575L6.9315 14.25H6.93225ZM10.7347 4.083L12.3263 2.4915C12.4669 2.3509 12.6576 2.27191 12.8565 2.27191C13.0554 2.27191 13.2461 2.3509 13.3868 2.4915L15.5085 4.61325C15.6491 4.7539 15.7281 4.94463 15.7281 5.1435C15.7281 5.34237 15.6491 5.53311 15.5085 5.67375L13.917 7.2645L10.7355 4.083H10.7347Z" fill="#8A94A5"/> </g> <defs> <clipPath id="clip0_9022_152921"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>'
            }
          </SvgIcon>
        </IconButton>
      </Box>
      {/* End Name */}
      {/* Sub info */}
      <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3.5 }}>
          <EmailIcon />
          <Typography
            sx={{ fontSize: 13, fontWeight: 500, color: "#455570", ml: 1 }}
          >
            {get(organization, "email") && `${get(organization, "email")}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3.5 }}>
          <PhoneIcon />
          <Typography
            sx={{ fontSize: 13, fontWeight: 500, color: "#455570", ml: 1 }}
          >
            {get(organization, "phoneNumber") &&
              `${get(organization, "phoneNumber")}`}
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center", mr: 3.5 }}>
          <MapIcon />
          <Typography
            sx={{ fontSize: 13, fontWeight: 500, color: "#455570", ml: 1 }}
          >
            {get(organization, "address") &&
              `${get(organization, "address")}, `}
            {get(organization, "districtName") &&
              `${get(organization, "districtName")}, `}
            {get(organization, "provinceName") &&
              `${get(organization, "provinceName")}`}
          </Typography>
        </Box>
      </Box>
      {/* End Sub info */}
      {/* Table */}
      <Box sx={{ mt: 2 }}>
        <TableHeader
          columns={columns}
          onSubmitFilter={onSubmitFilter}
          isInside={true}
          inputProps={{
            placeholder: "Tìm kiếm họ tên, email",
          }}
          actions={
            <>
              <Stack flexDirection="row" alignItems="center">
                <MuiButton
                  title={"Danh sách mời"}
                  color={"default"}
                  onClick={handleOpenListInvite}
                  startIcon={
                    <SvgIcon>
                      {
                        '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8888_127478)"> <path d="M13.333 2L14.6663 4.66667V13.3333C14.6663 13.5101 14.5961 13.6797 14.4711 13.8047C14.3461 13.9298 14.1765 14 13.9997 14H1.99967C1.82286 14 1.65329 13.9298 1.52827 13.8047C1.40325 13.6797 1.33301 13.5101 1.33301 13.3333V4.66933L2.66634 2H13.333ZM13.333 6H2.66634V12.6667H13.333V6ZM7.99967 6.66667L10.6663 9.33333H8.66634V12H7.33301V9.33333H5.33301L7.99967 6.66667ZM12.509 3.33333H3.49034L2.82434 4.66667H13.1757L12.509 3.33333Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_8888_127478"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  }
                  sx={{
                    fontWeight: 550,
                    marginRight: "16px",
                    height: 36,
                    "&:hover": { boxShadow: "none" },
                  }}
                />
                <MuiButton
                  title={"Mời người dùng"}
                  color={"primary"}
                  onClick={handleOpenInviteForm}
                  startIcon={
                    <SvgIcon>
                      {
                        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8888_127485)"> <path d="M9.16699 9.16666V4.16666H10.8337V9.16666H15.8337V10.8333H10.8337V15.8333H9.16699V10.8333H4.16699V9.16666H9.16699Z" fill="#FDFDFD"/> </g> <defs> <clipPath id="clip0_8888_127485"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  }
                  sx={{ fontWeight: 550, height: 36 }}
                />
              </Stack>
            </>
          }
        />

        {ListUser?.length === 0 ? (
          <View contentCenter pt={64}>
            {loadingUser ? (
              <CircularProgress />
            ) : (
              <>
                <FolderIcon />

                <Text mv={12} fontWeight={"500"} color={"#A2AAB7"}>
                  {"Hiện chưa có người dùng nào thuộc đơn vị này"}
                </Text>

                <MuiButton
                  title={"Mời người dùng"}
                  color={"primary"}
                  onClick={handleOpenInviteForm}
                  startIcon={
                    <SvgIcon>
                      {
                        '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8888_127485)"> <path d="M9.16699 9.16666V4.16666H10.8337V9.16666H15.8337V10.8333H10.8337V15.8333H9.16699V10.8333H4.16699V9.16666H9.16699Z" fill="#FDFDFD"/> </g> <defs> <clipPath id="clip0_8888_127485"> <rect width="20" height="20" fill="white"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  }
                  sx={{ fontWeight: 550, height: 36 }}
                />
              </>
            )}
          </View>
        ) : (
          <>
            <Text mt={16} fontSize={13} fontWeight={500}>
              {`${ListUser.length} kết quả phù hợp`}
            </Text>

            {ListUser.map((column, index) => {
              return (
                <OrganizationCard
                  isCheckbox
                  key={index}
                  item={column}
                  checked={selected.map((i) => i.id).includes(column.id)}
                  onChangeSelected={() => handleSelected(column)}
                  onOpenConfirmDelete={() => handleOpenConfirm(column)}
                  onOpenFormModal={() => handleOpenFormUser(column)}
                  handleOpenActive={handleOpenActive}
                  selected={selected}
                />
              );
            })}
          </>
        )}
      </Box>
      {/*  Modal Edit Organization */}
      <OrganizationForm
        actionType={1}
        isOpen={isOpen}
        onClose={handleCloseForm}
        parentNode={organization}
      />
      {isOpenInviteForm && (
        <OrganizationInviteForm
          ListOrganization={ListOrganization}
          isOpenInviteForm={isOpenInviteForm}
          setIsOpenInviteForm={setIsOpenInviteForm}
          valueTabDefault={valueTabInviteForm}
          organizationId={query?.id}
        />
      )}
      {toggleFormUser && (
        <OrganizationDetailUserForm
          onClose={handleCloseModal}
          isOpen={toggleFormUser}
          data={item}
        />
      )}
      {/*  Confirm Modal  */}
      {(openDelete || toggleConfirm) && (
        <ConfirmModal
          open={openDelete || toggleConfirm}
          onClose={handleCloseModal}
          icon={<AlertIcon />}
          data={selected}
          onSubmit={handleDelete}
          title={"Xác nhận xóa người dùng"}
          titleProps={{
            sx: {
              color: style.COLOR_TEXT_DANGER,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={
            selected.length > 1 ? (
              <>Bạn có chắc chắn muốn xóa {selected.length} người dùng?</>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa người dùng
                <span>{item.lastName || selected[0]?.lastName}</span>?
              </>
            )
          }
          btnCancelProps={{
            title: "Huỷ",
            sx: {
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            },
          }}
          btnConfirmProps={{
            title: "Xoá",
            color: "error",
          }}
        />
      )}
      {/* Active Modal */}
      {(openActive || toggleActive) && (
        <ConfirmModal
          open={openActive || toggleActive}
          onClose={handleCloseModal}
          icon={
            selectedStatus ? <UnCheckedSwitchIcon /> : <CheckedSwitchIcon />
          }
          data={selected}
          onSubmit={handleActive}
          title={
            selected.every((item) => item.isActive === true)
              ? "Tắt trạng thái hoạt động cho người dùng"
              : "Bật trạng thái hoạt động cho người dùng"
          }
          titleProps={{
            sx: {
              color: selectedStatus
                ? style.COLOR_TEXT_DANGER
                : style.COLOR_PRIMARY,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={
            selected.length > 1 ? (
              <>
                Bạn có chắc chắn muốn{" "}
                {selected.every((item) => item.isActive === true)
                  ? " tắt hoạt động"
                  : " bật hoạt động"}{" "}
                {selected.length} người dùng?
              </>
            ) : (
              <>
                {selected[0]?.isActive ? (
                  <>
                    Bạn có chắc chắn muốn tắt hoạt động cho người dùng
                    <span>{item.lastName || selected[0]?.lastName}</span>
                  </>
                ) : (
                  <>
                    Bạn có chắc chắn muốn bật hoạt động cho người dùng
                    <span>{item.lastName || selected[0]?.lastName}</span>
                  </>
                )}
              </>
            )
          }
          btnCancelProps={{
            title: "Huỷ",
            sx: {
              "&:hover": {
                boxShadow: "none",
                backgroundColor: "transparent",
              },
            },
          }}
          btnConfirmProps={{
            title: selectedStatus ? "Tắt" : "Bật",
            color: selectedStatus ? "error" : "primary",
          }}
        />
      )}
      {selected.length > 0 && (
        <BottomNavModal
          data={selected}
          onClose={handleCloseBottomNav}
          open={selected.length > 0}
          actions={[
            {
              key: "active",
              color: "basic",
              component: (
                <Switch
                  label={selectedStatus ? "Đang hoạt động" : "Không hoạt động"}
                  checked={selectedStatus}
                  onClick={(e) => {
                    handleOpenActive(e.target.checked);
                  }}
                />
              ),
            },
            {
              key: "edit",
              color: "basic",
              icon: <EditIcon />,
              onClick: () => handleOpenFormUser(selected[0]),
            },
            {
              key: "delete",
              icon: <DeleteIcon />,
              onClick: () => handleOpenModalState({ openDelete: true }),
            },
          ].filter((item) => listKeyActions?.includes(item.key))}
        />
      )}
    </Box>
  );
};

export default OrganizationDetailContent;
