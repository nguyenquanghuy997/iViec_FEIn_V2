import FilterModalRole from "../FilterModalRole";
import RoleDrawer from "../modals/RoleDrawer";
import { RoleGroupStyle } from "../styles";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import TextMaxLine from "@/components/TextMaxLine";
import Switch from "@/components/form/Switch";
import { useConfirmModal } from "@/components/modal";
import { PERMISSIONS, TBL_FILTER_TYPE } from "@/config";
import useRole from "@/hooks/useRole";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";
import {
  useGetListRoleColumnsQuery,
  useGetRoleGroupListQuery,
  useRemoveRoleGroupMutation,
  useSetStatusRoleGroupMutation,
  useUpdateListRoleColumnsMutation,
} from "@/sections/rolegroup";
import { LIST_STATUS } from "@/utils/formatString";
import { getErrorMessage } from "@/utils/helper";
import { Typography, useTheme } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import {
  RiDeleteBin6Line,
  RiEdit2Fill,
  RiToggleFill,
  RiToggleLine,
} from "react-icons/ri";

const formatBody = (query) => {
  return {
    ...query,
    isActivated:
      query.isActivated === "2"
        ? false
        : query.isActivated === "1"
          ? true
          : null,
  };
};

export const RoleContainer = () => {
  const { palette } = useTheme();
  const { confirmModal } = useConfirmModal();
  const { canAccess } = useRole();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const theme = useTheme();
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data = {}, isLoading } = useGetRoleGroupListQuery(formatBody(query), {
    skip: !isReady,
  });

  const [removeRoleGroup] = useRemoveRoleGroupMutation();
  const [setStatusRoleGroup] = useSetStatusRoleGroupMutation();

  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_ROLE), []);

  const columns = [
    {
      dataIndex: "id",
      title: "STT",
      key: "index",
      align: "center",
      render: (item, record, index, page, paginationSize) => (
        <>{(page - 1) * paginationSize + index + 1}</>
      ),
      width: "60px",
      fixed: "left",
    },
    {
      dataIndex: "name",
      title: "Vai trò",
      width: "220px",
      fixed: "left",
      render: (item, record) => (
        <TextMaxLine
          sx={{
            width: 220,
            fontWeight: 500,
            fontSize: 13,
            ...(canEdit && { cursor: "pointer" }),
          }}
          onClick={(e) => {
            if (!canEdit || record?.isDefault == true) {
              return;
            }
            setEditItem(record);
            setOpen(true);
            e.stopPropagation();
          }}
        >
          {item}
        </TextMaxLine>
      ),
    },
    {
      title: "Số nhân viên",
      key: "numOfPerson",
      dataIndex: "number",
      width: "140px",
      render: (item, record) => record?.numOfPerson,
    },

    {
      dataIndex: "isActivated",
      title: "Trạng thái",
      key: "isActivated",
      render: (isActivated) => (
        <Typography
          sx={{
            color: isActivated ? "#388E3C" : "red",
            fontSize: "12px",
          }}
        >
          {isActivated ? "Đang hoạt động" : "Không hoạt động"}
        </Typography>
      ),
      width: "160px",
      filters: {
        name: 'isActivated',
        type: TBL_FILTER_TYPE.SELECT,
        placeholder: "Tất cả",
        options: LIST_STATUS.map((item) => ({
          value: item.value,
          label: item.name,
        })),
      },
    },
    {
      title: "Ngày tạo",
      key: "createdTime",
      dataIndex: "registerTime",
      width: "120px",
      render: (item, record) =>
        record?.createdTime
          ? moment(record?.createdTime).format("DD/MM/YYYY")
          : null,
      filters: {
        type: TBL_FILTER_TYPE.RANGE_DATE,
        name: ["createdTimeFrom", "createdTimeTo"],
        placeholder: "Chọn ngày",
      },
    },
    {
      dataIndex: "creatorName",
      title: "Người tạo",
      width: "300px",
      multiple: true,
      render: (item, record) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <AvatarDS
            sx={{
              height: "20px",
              width: "20px",
              borderRadius: "100px",
              fontSize: "12px",
            }}
            name={record?.isDefault == true ? "iVIEC" : record?.creatorEmail}
          ></AvatarDS>
          <span
            fontSize="14px"
            fontWeight="600"
            color={theme.palette.common.neutral800}
          >
            {record?.isDefault == true ? "iVIEC" : record?.creatorEmail}
          </span>
        </div>
      ),
      filters: {
        type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
        name: "creatorIds",
        placeholder: "Chọn 1 hoặc nhiều người",
        remoteUrl: API_GET_ORGANIZATION_USERS,
        showAvatar: true,
      },
    },
  ];

  // open filter form
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);

  const showActionStatus = useMemo(() => {
    if (!canEdit) {
      return false;
    }
    if (itemSelected.length < 1) {
      return false;
    }
    if (itemSelected.length < 2) {
      return true;
    }
    let isShow = true;
    let isActive = itemSelected[0].isActivated;
    for (let i = 1; i < itemSelected.length; i++) {
      if (itemSelected[i].isActivated !== isActive) {
        isShow = false;
        break;
      }
    }
    return isShow;
  }, [itemSelected]);

  const showDeleteBtn = useMemo(() => {
    if (!canEdit) {
      return false;
    }
    if (itemSelected.length < 1) {
      return false;
    }
    return !itemSelected.some((x) => x.isDefault || x.numOfPerson > 0);
  }, [itemSelected]);

  const selectedStatus = useMemo(() => {
    if (itemSelected.length < 1) {
      return true;
    }
    return itemSelected[0].isActivated;
  }, [itemSelected]);

  const handleConfirmDelete = () => {
    confirmModal({
      title: "Xác nhận xóa vai trò",
      confirmType: "warning",
      content: (
        <Typography variant="body2" color={palette.text.sub}>
          Bạn có chắc chắn muốn xóa <strong>{getConfirmItemTitle()}</strong>?
        </Typography>
      ),
      okText: "Xóa",
      onOk: async (close) => {
        try {
          close();
          // router.push({
          //   query: { },
          // });
          await removeRoleGroup(itemSelected.map((it) => it.id)).unwrap();
          setItemSelected([]);
          setSelectedRowKeys([]);
          enqueueSnackbar("Xóa vai trò thành công!");
        } catch (err) {
          if (err.code == 'RGE_06') {
            enqueueSnackbar('Vai trò đang sử dụng', { variant: "error" });
          }
          else {
            enqueueSnackbar(getErrorMessage(err), { variant: "error" });
          }
        }
      },
    });
  };

  const getConfirmItemTitle = () => {
    if (itemSelected.length < 1) {
      return null;
    }
    if (itemSelected.length === 1) {
      return itemSelected[0].name;
    }
    return itemSelected.length + " vai trò đã chọn";
  };

  const handleChangeStatus = (isChecked) => {
    confirmModal({
      title: isChecked
        ? "Bật trạng thái hoạt động cho vai trò"
        : "Tắt trạng thái hoạt động cho vai trò",
      confirmType: "info",
      confirmIcon: isChecked ? (
        <RiToggleFill size={55} color={theme.palette.common.blue700} />
      ) : (
        <RiToggleLine size={55} color={theme.palette.common.neutral700} />
      ),
      content: (
        <Typography variant="body2" color={palette.text.sub}>
          Bạn chắc chắn muốn {isChecked ? "bật" : "tắt"} trạng thái hoạt động
          cho <strong>{getConfirmItemTitle()}</strong>?
        </Typography>
      ),
      okText: isChecked ? "Bật" : "Tắt",
      onOk: async (close) => {
        try {
          await setStatusRoleGroup({
            Ids: itemSelected.map((it) => it.id),
            IsActive: isChecked,
          }).unwrap();

          setItemSelected(
            itemSelected.map((it) => ({ ...it, isActivated: isChecked }))
          );
          close();
          enqueueSnackbar(
            (isChecked ? "Bật" : "Tắt") + " trạng thái thành công!"
          );
        } catch (err) {
          enqueueSnackbar(getErrorMessage(err), { variant: "error" });
        }
      },
    });
  };

  return (
    <RoleGroupStyle>
      <Content
        sx={{
          padding: "0 !important",
          "& .MuiBox-root": {
            padding: 0,
          },
        }}
      >
        <DynamicColumnsTable
          columns={columns}
          source={data}
          loading={isLoading}
          settingName={"DANH SÁCH VAI TRÒ"}
          isSetting={true}
          nodata="Hiện chưa có vai trò"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListRoleColumnsQuery}
          useUpdateColumnsFunc={useUpdateListRoleColumnsMutation}
          createText={canEdit && "Thêm vai trò"}
          onClickCreate={() => {
            setOpen(true);
          }}
          tableProps={!canEdit && { rowSelection: false }}
        />
      </Content>

      <BottomNavModal
        open={selectedRowKeys.length > 0}
        onClose={() => {
          setSelectedRowKeys([]);
        }}
        data={selectedRowKeys}
        actions={[
          ...(showActionStatus
            ? [
              {
                component: (
                  <Switch
                    label={
                      selectedStatus ? "Đang hoạt động" : "Không hoạt động"
                    }
                    checked={selectedStatus}
                    onClick={(e) => {
                      handleChangeStatus(e.target.checked);
                    }}
                  />
                ),
              },
            ]
            : []),
          ...(canEdit &&
            itemSelected.length === 1 &&
            itemSelected[0]?.isDefault != true
            ? [
              {
                icon: (
                  <RiEdit2Fill size={18} color={palette.text.secondary} />
                ),
                title: "Sửa",
                onClick: () => {
                  if (itemSelected.length > 1) {
                    return;
                  }
                  setEditItem(itemSelected[0]);
                  setOpen(true);
                },
                disabled: selectedRowKeys.length > 1,
              },
            ]
            : []),
          ...(showDeleteBtn
            ? [
              {
                icon: (
                  <RiDeleteBin6Line size={18} color={palette.text.warning} />
                ),
                title: "Xóa",
                onClick: () => {
                  handleConfirmDelete();
                },
              },
            ]
            : []),
        ]}
      />

      {isOpen && (
        <FilterModalRole
          open={isOpen}
          onClose={handleCloseFilterForm}
          onOpen={handleOpenFilterForm}
        />
      )}

      <RoleDrawer
        open={open}
        onClose={() => {
          setEditItem(null);
          setOpen(false);
          setSelectedRowKeys([]);
        }}
        selectedItem={editItem}
        setSelectedRowKeys={setSelectedRowKeys}
      />
    </RoleGroupStyle>
  );
};
