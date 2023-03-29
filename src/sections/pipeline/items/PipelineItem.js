import { useLazyGetAllPipelineQuery } from "../PipelineFormSlice";
import PipelineHeader from "../PipelineHeader";
import PipelineFilterModal from "../modals/PipelineFilterModal";
import PipelineBottomNav from "./PipelineBottomNav";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import { PipelineStateType, Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tag } from "antd";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  searchKey: "",
};

export const PipelineItem = () => {
  const router = useRouter();
  const { query, isReady } = router;
  // api get list

  const [getAllFilter, { data: Data = [], isLoading }] =
    useLazyGetAllPipelineQuery();
  // api get list Column
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  // api update list Column
  const [UpdateListColumnApplicants] = useUpdateListColumnApplicantsMutation();
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    if (query) {
      getAllFilter({
        ...queryParams,
        pageSize: pageSize,
        pageIndex: pageIndex,
      }).unwrap();
    } else {
      getAllFilter({ pageSize: pageSize, pageIndex: pageIndex }).unwrap();
    }
  };
  const columns = [
    {
      title: "STT",
      key: "index",
      render: (item, record, index) => (page - 1) * paginationSize + index + 1,
      width: "60px",
      fixed: "left",
    },
    {
      dataIndex: "name",
      title: "Quy trình tuyển dụng",
      width: "240px",
      fixed: "left",
    },
    {
      dataIndex: "organizationPipelineStates",
      title: "Bước tuyển dụng",
      width: "400px",
      name: "organizationPipelineStates",
      type: "select",
      label: "Bước tuyển dụng",
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

                    {index < organizationPipelineStates.length - 1 && index < 4 && (
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
                      borderRadius: "4px",
                      color: "#5C6A82",
                      border: "none",
                      marginLeft:"8px"
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

  const handleUpdateListColumnApplicants = async () => {
    var body = {
      recruitment: false,
    };
    var data = { id: "01000000-ac12-0242-981f-08db10c9413d", body: body };

    await UpdateListColumnApplicants(data);
  };

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
  const queryParams = {
    searchKey: query.searchKey,
    isActivated: query.isActivated ? query.isActivated : null,
    createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
    createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
    creatorIds:
      query.creatorIds && typeof query.creatorIds === "string"
        ? query.creatorIds
        : query.creatorIds && query.creatorIds,
    pageSize: paginationSize,
    pageIndex: page,
  };
  useEffect(() => {
    if (!isReady) return;

    if (query) {
      getAllFilter(queryParams).unwrap();
    } else {
      getAllFilter({ pageSize: paginationSize, pageIndex: page }).unwrap();
    }
  }, [isReady, query]);

  // open filter form
  const [isOpen, setIsOpen] = useState(false);

  // filter modal
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

  const onSubmit = async (data) => {
    const body = { ...data, searchKey: data.searchKey };
    await router.push(
      {
        pathname: router.pathname,
        query: {
          ...body,
          createdTimeFrom: data.createdTimeFrom
            ? new Date(data.createdTimeFrom).toISOString()
            : null,
          createdTimeTo: data.createdTimeTo
            ? new Date(data.createdTimeTo).toISOString()
            : null,
        },
      },
      undefined,
      { shallow: true }
    );
    handleCloseFilterForm();
  };
  const refreshData = () => {
    getAllFilter().unwrap();
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
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
          ColumnData={ColumnData}
          UpdateListColumn={handleUpdateListColumnApplicants}
          settingName={"DANH SÁCH QUY TRÌNH TUYỂN DỤNG"}
          scroll={{ x: 1618 }}
          isSetting={true}
          nodata="Hiện chưa có quy trình tuyển dụng nào"
          filter={
            <PipelineHeader
              methods={methods}
              isOpen={isOpen}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
              onRefreshData={refreshData}
            />
          }
        />
        <PipelineBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
        />
      </Content>
      {isOpen && (
        <PipelineFilterModal
          columns={columns}
          isOpen={isOpen}
          onClose={handleCloseFilterForm}
          onSubmit={onSubmit}
          onRefreshData={refreshData}
        />
      )}
    </View>
  );
};
