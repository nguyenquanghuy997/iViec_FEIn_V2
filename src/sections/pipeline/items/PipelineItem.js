import { useGetAllPipelineQuery } from "../PipelineFormSlice";
import PipelineHeader from "../PipelineHeader";
import PipelineFilterModal from "../modals/PipelineFilterModal";
import PipelineBottomNav from "./PipelineBottomNav";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { filterSlice } from "@/redux/common/filterSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { PipelineStateType, Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { cleanObject } from "@/utils/function";
import { Tag } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";
import { useForm } from "react-hook-form";

const defaultValues = {
  searchKey: "",
};

export const PipelineItem = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { query, isReady } = router;
  const toggleFormFilter = useSelector((state) => state.filterReducer.openForm);
  const dataFilter = useSelector((state) => state.filterReducer.data);
  const handleOpenFilterForm = () =>
    dispatch(filterSlice.actions.openFilterModal());
  const handleCloseFilterForm = () =>
    dispatch(filterSlice.actions.closeModal());
  const handleSetDataFilter = (data) =>
    dispatch(filterSlice.actions.setAllDataFilter(data));
  const handleClearDataFilter = () =>
    dispatch(filterSlice.actions.clearDataFilter());

  useEffect(() => {
    if (!isReady) return;
    handleClearDataFilter();
  }, [isReady, query]);

  const { data: Data, isLoading } = useGetAllPipelineQuery(
    JSON.stringify(cleanObject(dataFilter))
  );
  // api get list Column
  // const { data: { items: ColumnData = [] } = {} } = useGetListColumnApplicantsQuery();
  // api update list Column
  const [UpdateListColumnApplicants] = [];
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);

  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    handleSetDataFilter({
      ...dataFilter,
      pageSize: pageSize,
      pageIndex: pageIndex,
    });
  };

  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        key: "index",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
        fixed: "left",
      },
      {
        dataIndex: "name",
        title: "Quy trình tuyển dụng",
        width: "240px",
        fixed: "left",
        render: (item,record) => (
          <>{record.isDefault == true ? 'Quy trình mặc định iVIEC':item}</>
        ),
      },
      {
        dataIndex: "organizationPipelineStates",
        title: "Bước tuyển dụng",
        width: "440px",
        name: "organizationPipelineStates",
        type: "select",
        label: "Bước tuyển dụng",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều bước",
        render: (_, { organizationPipelineStates }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {organizationPipelineStates?.map((p, index) => {
              if (index < 6) {
                if (index < 5) {
                  return (
                    <span
                      key={index}
                      style={{
                        color: "#172B4D",
                        fontWeight: 400,
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {PipelineStateType(p?.pipelineStateType)}

                      {index < organizationPipelineStates.length - 1 &&
                        index < 4 && (
                          <Iconify
                            width={16}
                            height={16}
                            icon="ic:round-keyboard-arrow-right"
                          />
                        )}
                    </span>
                  );
                } else {
                  var indexplus = organizationPipelineStates.length - 5;
                  return (
                    <Tag
                      key={p}
                      style={{
                        background: "#EFF3F7",
                        borderRadius: "100px",
                        color: "#172B4D",
                        border: "none",
                        marginLeft: "8px",
                        fontWeight:500
                      }}
                    >
                      +{indexplus}
                    </Tag>
                  );
                }
              }
            })}
          </div>
        ),
      },
      {
        dataIndex: "recruitmentAppliedCount",
        title: "Số tin áp dụng",
        width: "160px",
        align: "center",
      },
      {
        dataIndex: "isActivated",
        title: "Trạng thái",
        width: "180px",
        name: "isActivated",
        type: "select",
        label: "Trạng thái",
        render: (item) => (
          <span style={{ color: item ? "#388E3C" : "#455570" }}>
            {Status(item)}
          </span>
        ),
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo",
        width: "180px",
        type: "date",
        label: "Ngày tạo",
        name: "createdTime",
        render: (date) => fDate(date),
        items: [
          {
            name: "createdTimeFrom",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Từ</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
          {
            name: "createdTimeTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
        ],
      },
      {
        dataIndex: "creatorName",
        title: "Người tạo",
        width: "300px",
        name: "creatorIds",
        label: "Người tạo",
        placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
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
  }, [page, paginationSize]);

  const handleUpdateListColumnApplicants = async () => {
    var body = {
      recruitment: false,
    };
    var data = { id: "01000000-ac12-0242-981f-08db10c9413d", body: body };

    await UpdateListColumnApplicants(data);
  };

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });
  const { handleSubmit } = methods;

  const onSubmit = async (data) => {
    const body = {
      ...data,
      createdTimeFrom: data.createdTimeFrom
        ? new Date(data.createdTimeFrom).toISOString()
        : null,
      createdTimeTo: data.createdTimeTo
        ? new Date(data.createdTimeTo).toISOString()
        : null,
    };
    handleSetDataFilter(body);
    handleCloseFilterForm();
  };

  const onSubmitSearch = async (data) => {
    handleSetDataFilter({ searchKey: data.searchKey });
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [columnsTable, setColumnsTable] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setItemSelected([]);
    event.currentTarget.getElementsByClassName(
      "css-28xiqa"
    )[0].style.paddingBottom = null;
  };
  return (
    <View>
      <Content sx={{ padding: "0 !important" }}>
        <DynamicColumnsTable
          page={page}
          paginationSize={paginationSize}
          handleChangePagination={handleChangePagination}
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          columns={columns}
          source={Data}
          loading={isLoading}
          columnsTable={columnsTable}
          setColumnsTable={setColumnsTable}
          UpdateListColumn={handleUpdateListColumnApplicants}
          settingName={"DANH SÁCH QUY TRÌNH TUYỂN DỤNG"}
          isSetting={true}
          nodata="Hiện chưa có quy trình tuyển dụng nào"
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          filter={
            <PipelineHeader
              methods={methods}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
            />
          }
        />
        <PipelineBottomNav
          open={itemSelected?.length > 0}
          onClose={toggleDrawer(false)}
          onOpenForm={toggleDrawer(true)}
          itemSelected={itemSelected || []}
          setItemSelected={setItemSelected}
          setselectedList={setSelectedRowKeys}
        />
      </Content>
      {toggleFormFilter && (
        <PipelineFilterModal
          columns={columns}
          isOpen={toggleFormFilter}
          onClose={handleCloseFilterForm}
          onSubmit={onSubmit}
        />
      )}
    </View>
  );
};
