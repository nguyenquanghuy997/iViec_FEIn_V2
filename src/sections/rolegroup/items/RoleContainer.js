import FilterModalRole from "../FilterModalRole";
import RolegroupHeader from "../RolegroupHeader";
import RoleDrawer from '../modals/RoleDrawer';
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import TextMaxLine from "@/components/TextMaxLine";
import { filterSlice } from "@/redux/common/filterSlice";
import { useDispatch, useSelector } from "@/redux/store";
import {
  useGetListColumnsQuery,
  useGetRoleGroupListQuery,
  useUpdateListColumnsMutation,
  useRemoveRoleGroupMutation,
  useUpdateRolegroupMutation,
} from "@/sections/rolegroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, useTheme } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import BottomNavModal from '@/components/BaseComponents/BottomNavModal';
import Switch from "@/components/form/Switch";
import { useConfirmModal } from '@/components/modal';
import {
  RiEdit2Fill,
  RiDeleteBin6Line,
  RiToggleFill,
  RiToggleLine,
} from 'react-icons/ri';
import { useSnackbar } from "notistack";
import { getErrorMessage } from "@/utils/helper";

import { RoleGroupStyle } from "../styles";

const defaultValues = {
  searchKey: "",
};

export const RoleContainer = () => {
  const { palette } = useTheme();
  const { confirmModal } = useConfirmModal();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { query, isReady } = router;
  const { data, isLoading } = useGetRoleGroupListQuery();
  const dispatch = useDispatch();
  // const { data: Data, isLoading } = useGetAllFilterPipelineMutation();
  const { data: {items: ColumnData =[]}={} } = useGetListColumnsQuery();
  const dataFilter = useSelector((state) => state.filterReducer.data);
  const [updateListColumn] = useUpdateListColumnsMutation();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const [editItem, setEditItem] = useState(null);

  const [removeRoleGroup] = useRemoveRoleGroupMutation();
  const [updateRoleGroup] = useUpdateRolegroupMutation();

  const handleSetDataFilter = (data) =>
    dispatch(filterSlice.actions.setAllDataFilter(data));
  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    handleSetDataFilter({
      ...dataFilter,
      pageSize: pageSize,
      pageIndex: pageIndex,
    });
  };
  const columns = [
    {
      dataIndex: "id",
      title: "STT",
      key: "index",
      align: "center",
      render: (item, record, index, page, paginationSize) => (
        <>{(page - 1) * paginationSize + index + 1}</>
      ),
      width: "8%",
      fixed: "left",
    },
    {
      dataIndex: "name",
      title: "Vai trò",
      width: "220px",
      fixed: "left",
      render: (item, record) => (
        <TextMaxLine
          sx={{ width: 220, fontWeight: "normal", fontSize: 14, cursor: 'pointer' }}
          onClick={(e) => {
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
      key: "number",
      render: () => <>20</>,
      width: "140px",
    },

    {
      title: "Trạng thái",
      key: "isActivated",
      render: (item) => (
        <Typography
          sx={{
            color: item?.isActivated ? "#388E3C" : "red",
            fontSize: "12px",
          }}
        >
          {item?.isActivated ? "Đang hoạt động" : "Ngừng hoạt động"}
        </Typography>
      ),
      width: "160px",
    },
    {
      title: "Ngày tạo",
      key: "registerTime",
      width: "120px",
      render: (record) => (
        <>{moment(record?.registerTime).format("DD/MM/YYYY")}</>
      ),
    },
    {
      dataIndex: "creatorName",
      title: "Người tạo",
      width: "300px",
      multiple: true,
      render: (item) => (
        <div style={{ display: "flex", alignItems: "center" }}>
          <AvatarDS
            sx={{
              height: "20px",
              width: "20px",
              borderRadius: "100px",
              fontSize: "12px",
            }}
            name={item}
          ></AvatarDS>
          <span fontSize="14px" fontWeight="600" color="#172B4D">
            {item}
          </span>
        </div>
      ),
    },
  ];

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: useMemo(
      () =>
        query.searchKey
          ? { ...defaultValues, searchKey: query.searchKey }
          : { ...defaultValues },
      [query.searchKey]
    ),
    // defaultValues: {...defaultValues, searchKey: query.searchKey},
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;

  useEffect(() => {
    if (!isReady) return;
    // const queryParams = {
    //   searchKey: query.searchKey,
    //   isActive: query.isActive ? query.isActive : null,
    //   createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
    //   createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
    //   creatorIds:
    //     query.creatorIds && typeof query.creatorIds === "string"
    //       ? query.creatorIds
    //       : query.creatorIds && query.creatorIds,
    // };
    // if (query) {
    //   getAllFilter(queryParams).unwrap();
    // } else {
    //   getAllFilter().unwrap();
    // }
  }, [isReady, query]);

  // open filter form
  const [isOpen, setIsOpen] = useState(false);
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  const onSubmitSearch = async (data) => {
    await router.push(
      {
        pathname: router.pathname,
        query: { ...query, searchKey: data.searchKey },
      },
      undefined,
      { shallow: true }
    );
  };

  // const onSubmit = async (data) => {
  //   const body = { ...data, searchKey: data.searchKey };
  //   await router.push(
  //     {
  //       pathname: router.pathname,
  //       query: {
  //         ...body,
  //         createdTimeFrom: data.createdTimeFrom
  //           ? new Date(data.createdTimeFrom).toISOString()
  //           : null,
  //         createdTimeTo: data.createdTimeTo
  //           ? new Date(data.createdTimeTo).toISOString()
  //           : null,
  //       },
  //     },
  //     undefined,
  //     { shallow: true }
  //   );
  //   handleCloseFilterForm();
  // };
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [columnsTable, setColumnsTable] = useState([]);

  const handleConfirmDelete = () => {
    if (itemSelected.length < 1) {
      return;
    }

    confirmModal({
      title: 'Xác nhận xóa vai trò',
      confirmType: 'warning',
      content: (
        <Typography variant="body2" color={palette.text.sub}>
          Bạn có chắc chắn muốn xóa {' '}
          <strong>{getDeleteTitle()}</strong>?
        </Typography>
      ),
      okText: 'Xóa',
      onOk: async (close) => {
        try {
          await removeRoleGroup(itemSelected.map(it => it.id)).unwrap();
          setItemSelected([]);
          close();
          enqueueSnackbar('Xóa vai trò thành công!');
        } catch (err) {
          enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
        }
      },
    });
  }

  const getDeleteTitle = () => {
    if (itemSelected.length < 1) {
      return null;
    }
    if (itemSelected.length === 1) {
      return itemSelected[0].name;
    }
    return itemSelected.length + ' vai trò đã chọn';
  }

  const handleChangeStatus = (isChecked) => {
    if (itemSelected.length !== 1) { // TODO
      return;
    }

    confirmModal({
      title: isChecked ? 'Bật trạng thái hoạt động cho vai trò' : 'Tắt trạng thái hoạt động cho vai trò',
      confirmType: 'info',
      confirmIcon: isChecked ? <RiToggleFill size={55} color="#1976D2" />
        : <RiToggleLine size={55} color="#455570" />,
      content: (
        <Typography variant="body2" color={palette.text.sub}>
          Bạn chắc chắn muốn { isChecked ? 'bật' : 'tắt' } {' '}
          trạng thái hoạt động cho vai trò <strong>{itemSelected[0].name}</strong>
        </Typography>
      ),
      okText: isChecked ? 'Bật' : 'Tắt',
      onOk: async (close) => {
        try {
          await updateRoleGroup({
            id: itemSelected[0].id,
            isActivated: isChecked,
          }).unwrap();
          close();
          enqueueSnackbar((isChecked ? 'Bật' : 'Tắt') + ' trạng thái thành công!');
        } catch (err) {
          enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
        }
      },
      onCancel: () => {
        
      },
    });
  }

  return (
    <RoleGroupStyle>
      <Content sx={{ padding: "0 !important" }}>
        <DynamicColumnsTable
          page={page}
          paginationSize={paginationSize}
          handleChangePagination={handleChangePagination}
          columns={columns}
          source={data}
          loading={isLoading}
          ColumnData={ColumnData[0]}
          settingName={"DANH SÁCH VAI TRÒ"}
          isSetting={true}
          nodata="Hiện chưa có vai trò"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          UpdateListColumn={updateListColumn}
          columnsTable={columnsTable}
          setColumnsTable={setColumnsTable}
          filter={
            <RolegroupHeader
              methods={methods}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
              onOpenAddForm={() => setOpen(true)}
            />
          }
        />
      </Content>

      <BottomNavModal
        open={selectedRowKeys.length > 0}
        onClose={() => {
          setSelectedRowKeys([]);
        }}
        data={selectedRowKeys}
        actions={[
          {
            component: (
              <Switch
                label="Đang hoạt động"
                onClick={e => {
                  handleChangeStatus(e.target.checked);
                }}
                disabled={selectedRowKeys.length > 1}
              />
            ),
          },
          {
            icon: <RiEdit2Fill size={18} color={palette.text.secondary} />,
            onClick: () => {
              if (itemSelected.length > 1) {
                return;
              }
              setEditItem(itemSelected[0]);
              setOpen(true);
            },
            disabled: selectedRowKeys.length > 1,
          },
          {
            icon: <RiDeleteBin6Line size={18} color={palette.text.warning} />,
            onClick: () => {
              handleConfirmDelete();
            },
          },
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
        }}
        selectedItem={editItem}
      />
    </RoleGroupStyle>
  );
};
