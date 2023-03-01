import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";
import { useGetAllJobTypeMutation } from "@/sections/jobtype";
import JobTypeHeader from "@/sections/jobtype/JobTypeHeader";
import { Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  searchKey: "",
};

export const JobTypeItem = () => {
  const router = useRouter();
  const { query, isReady } = router;
  // api get list
  const [getAllFilter, { data: Data, isLoading }] =
    useGetAllJobTypeMutation();
  // api get list Column
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  // api update list Column
  const [UpdateListColumnApplicants] = useUpdateListColumnApplicantsMutation();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (item, record, index) => <>{index + 1}</>,
      width: "60px",
      fixed: "left",
    },
    { dataIndex: "name", title: "Vị trí công việc", width: "240px" },
    {
      dataIndex: "numberOfRecruitmentApplied",
      title: "Số tin áp dụng",
      width: "160px",
      align: "center",
    },
    {
      dataIndex: "isActivated",
      title: "Trạng thái",
      width: "180px",
      name: "isActive",
      type: "select",
      label: "Trạng thái",
      render: (item) => (
        <span style={{ color: item ? "#388E3C" : "#E53935" }}>
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

  const menuItemText = {
    name: "Vị trí công việc",
    organizationName: "Đơn vị",
    numberOfRecruitmentApplied: "Số tin áp dụng",
    isActivated: "Trạng thái",
    createdTime: "Ngày tạo",
    creatorName: "Người tạo",
  };

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

  useEffect(() => {
    if (!isReady) return;
    const queryParams = {
      searchKey: query.searchKey,
      isActive: query.isActive ? [Number(query.isActive)] : null,
      createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
      createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
      creatorIds:
        query.creatorIds && typeof query.creatorIds === "string"
          ? [query.creatorIds]
          : query.creatorIds && query.creatorIds,
    };
    if (query) {
      getAllFilter(JSON.stringify(queryParams)).unwrap();
    } else {
      getAllFilter({}).unwrap();
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

  return (
    <View>
      <Content sx={{ padding: "0 !important" }}>
        <DynamicColumnsTable
          columns={columns}
          source={Data?.items}
          loading={isLoading}
          ColumnData={ColumnData}
          menuItemText={menuItemText}
          UpdateListColumn={handleUpdateListColumnApplicants}
          settingName={"DANH SÁCH VỊ TRÍ CÔNG VIỆC"}
        //   scroll={x:}
          filter={
            <JobTypeHeader
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
      {isOpen && (
        <ApplicantFilterModal
          columns={columns}
          isOpen={isOpen}
          onClose={handleCloseFilterForm}
          onSubmit={onSubmit}
        />
      )}
    </View>
  );
};
