import FilterModalRole from "../FilterModalRole";
import RoleContainerBottomNav from "../RoleContainerBottomNav";
import RolegroupHeader from "../RolegroupHeader";
import DetailDrawer from "../modals/DetailDrawer";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import TextMaxLine from "@/components/TextMaxLine";
import { filterSlice } from "@/redux/common/filterSlice";
import { useDispatch, useSelector } from "@/redux/store";
import {
  useGetListColumnsQuery,
  useGetRoleGroupListQuery, useUpdateListColumnsMutation,
} from "@/sections/rolegroup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography } from "@mui/material";
import moment from "moment";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  searchKey: "",
};

export const RoleContainer = () => {
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
      render: (item) => (
        <TextMaxLine
          sx={{ width: 220, fontWeight: "normal", fontSize: 14 }}
          onClick={() => setOpen(true)}
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

  // const [showDelete, setShowDelete] = useState(false);
  // const [showMultipleDelete, setShowMultipleDelete] = useState(false);
  // const [actionTypeActive, setActionTypeActive] = useState(0) 
  // const [actionType, setActionType] = useState(0)  
  return (
    <View>
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
              isOpen={isOpen}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
            />
          }
        />
      </Content>
      {selectedRowKeys?.length > 0 && (
        <RoleContainerBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={() => setOpen(false)}
          // setShowDelete={setShowDelete}
          // setShowMultipleDelete={setShowMultipleDelete}
          // setIsOpenActive={setIsOpenActive}
          selectedList={selectedRowKeys || []}
          // setActionType={setActionType}
          // setActionTypeActive={setActionTypeActive}
          // status={ListOrganization?.filter((item) => item.parentOrganizationId)
          //   .filter((item) => selected.includes(item.id))
          //   .every((item) => item.isActivated === true)}
          onOpenForm={() => setOpen(true)}
        />
      )}
      {isOpen && (
        <FilterModalRole
          open={isOpen}
          onClose={handleCloseFilterForm}
          onOpen={handleOpenFilterForm}
        />
      )}

      {open && (
        <DetailDrawer
          open={open}
          onClose={() => setOpen(false)}
          onOpen={() => setOpen(true)}
        />
      )}
    </View>
  );
};
