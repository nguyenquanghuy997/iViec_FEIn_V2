import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import RecruitmentAdFilterModal from "../modals/RecruitmentAdFilterModal";
import RecruitmentAdHeader from "../RecruitmentAdHeader";
import { useLazyGetRecruitmentAdQuery } from "../RecruitmentAdSlice";
import RecruitmentAdBottomNav from "./RecruitmentAdBottomNav";

const defaultValues = {
  searchKey: "",
};

export const RecruitmentAdItem = () => {
  const router = useRouter();
  const { query, isReady } = router;
  // api get list

  const [getAllFilter, { data: Data = {}, isLoading }] =
  useLazyGetRecruitmentAdQuery();
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        key: "id",
        align: "center",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
        name: "organizationIds",
        type: "tree",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
      },
      {
        dataIndex: "name",
        title: "Tin tuyển dụng",
        width: "300px",
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo tin",
        width: "180px",
        type: "date",
        label: "Ngày tạo tin",
        name: "createdTime",
        render: (date) =>  date ? fDate(date): '',
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
        dataIndex: "startDate",
        title: "Ngày bắt đầu",
        width: "180px",
        type: "date",
        label: "Ngày bắt đầu",
        name: "startDate",
        render: (date) => date ? fDate(date): '',
        items: [
          {
            name: "startDateFrom",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Từ</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
          {
            name: "startDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
        ],
      },
      {
        dataIndex: "endDate",
        title: "Ngày hết hạn",
        width: "180px",
        type: "date",
        label: "Ngày hết hạn",
        name: "endDate",
        render: (date) =>  date ? fDate(date): '',
        items: [
          {
            name: "endDateFrom",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Từ</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
          {
            name: "endDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
        ],
      },
    ];
  }, [page, paginationSize]);
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
  let queryParams = {
    ...query,
    applicantSkillIds:
      query.applicantSkillIds && typeof query.applicantSkillIds === "string"
        ? [query.applicantSkillIds]
        : query.applicantSkillIds && query.applicantSkillIds,
    expectSalaryFrom: query.expectSalaryFrom
      ? Number(query.expectSalaryFrom)
      : null,
    expectSalaryTo: query.expectSalaryTo ? Number(query.expectSalaryTo) : null,
    yearsOfExperience: query.yearsOfExperience
      ? [Number(query.yearsOfExperience)]
      : null,
    sexs: query.sexs ? [Number(query.sexs)] : null,
    weightFrom: query.weightFrom ? Number(query.weightFrom) : null,
    weightTo: query.weightTo ? Number(query.weightTo) : null,
    heightFrom: query.heightFrom ? Number(query.heightFrom) : null,
    heightTo: query.heightTo ? Number(query.heightTo) : null,
    maritalStatuses: query.maritalStatuses
      ? [Number(query.maritalStatuses)]
      : null,
    education: query.education ? query.education : null,
    homeTowerProvinceIds: query.homeTowerProvinceIds
      ? [query.homeTowerProvinceIds]
      : null,
    homeTowerDistrictIds: query.homeTowerDistrictIds
      ? [query.homeTowerDistrictIds]
      : null,
    livingAddressProvinceIds: query.livingAddressProvinceIds
      ? [query.livingAddressProvinceIds]
      : null,
    livingAddressDistrictIds: query.livingAddressDistrictIds
      ? [query.livingAddressDistrictIds]
      : null,
    expectWorkingAddressProvinceIds:
      query.expectWorkingAddressProvinceIds &&
      typeof query.expectWorkingAddressProvinceIds === "string"
        ? [query.expectWorkingAddressProvinceIds]
        : query.expectWorkingAddressProvinceIds &&
          query.expectWorkingAddressProvinceIds,
    organizationIds:
      query.organizationIds && typeof query.organizationIds === "string"
        ? [query.organizationIds]
        : query.organizationIds && query.organizationIds,
    recruitmentIds:
      query.recruitmentIds && typeof query.recruitmentIds === "string"
        ? [query.recruitmentIds]
        : query.recruitmentIds && query.recruitmentIds,
    ownerIds:
      query.ownerIds && typeof query.ownerIds === "string"
        ? [query.ownerIds]
        : query.ownerIds && query.ownerIds,
    councilIds:
      query.councilIds && typeof query.councilIds === "string"
        ? [query.councilIds]
        : query.councilIds && query.councilIds,
    creatorIds:
      query.creatorIds && typeof query.creatorIds === "string"
        ? [query.creatorIds]
        : query.creatorIds && query.creatorIds,
    createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
    createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
    recruitmentPipelineStates:
      query.recruitmentPipelineStates &&
      typeof query.recruitmentPipelineStates === "string"
        ? [Number(query.recruitmentPipelineStates)]
        : query.recruitmentPipelineStates &&
          query.recruitmentPipelineStates?.map((pipe) => Number(pipe)),
    jobCategoryIds:
      query.jobCategoryIds && typeof query.jobCategoryIds === "string"
        ? [query.jobCategoryIds]
        : query.jobCategoryIds && query.jobCategoryIds,
    jobSourceIds:
      query.jobSourceIds && typeof query.jobSourceIds === "string"
        ? [query.jobSourceIds]
        : query.jobSourceIds && query.jobSourceIds,
    pageSize: paginationSize,
    pageIndex: page,
  };
  useEffect(() => {
    if (!isReady) return;
    if (query) {
      getAllFilter(
        JSON.stringify(
          Object.entries(queryParams).reduce(
            (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
            {}
          )
        )
      ).unwrap();
    } else {
      getAllFilter({ pageSize: paginationSize, pageIndex: page }).unwrap();
    }
  }, [isReady, query]);

  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    if (query) {
      queryParams = {
        ...queryParams,
        pageSize: pageSize,
        pageIndex: pageIndex,
      };
      getAllFilter(
        JSON.stringify(
          Object.entries(queryParams).reduce(
            (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
            {}
          )
        )
      ).unwrap();
    } else {
      getAllFilter({ pageSize: pageSize, pageIndex: pageIndex }).unwrap();
    }
  };
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

    if (query) {
      queryParams = {
        ...queryParams,
        ...body,
        pageSize: page,
        pageIndex: paginationSize,
      };
      getAllFilter(
        JSON.stringify(
          Object.entries(queryParams).reduce(
            (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
            {}
          )
        )
      ).unwrap();
    } else {
      getAllFilter({ pageSize: page, pageIndex: paginationSize }).unwrap();
    }
    await router.push(
      {
        pathname: router.pathname,
        query: {
          ...body,
          startDateFrom: data.startDateFrom
            ? new Date(data.startDateFrom).toISOString()
            : null,
          startDateTo: data.startDateTo
            ? new Date(data.startDateTo).toISOString()
            : null,
          endDateFrom: data.endDateFrom
            ? new Date(data.endDateFrom).toISOString()
            : null,
          endDateTo: data.endDateTo
            ? new Date(data.endDateTo).toISOString()
            : null,
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
  const [columnsTable, setColumnsTable] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName('css-6pqpl8')[0].style.paddingBottom = null;
  };

  return (
    <View>
      <RecruitmentAdHeader
        data={Data.items}
        methods={methods}
        isOpen={isOpen}
        onSubmit={onSubmitSearch}
        handleSubmit={handleSubmit}
        onOpenFilterForm={handleOpenFilterForm}
        onCloseFilterForm={handleCloseFilterForm}
      />
      <Content>
        <View mt={96}>
          <DynamicColumnsTable
            page={page}
            paginationSize={paginationSize}
            handleChangePagination={handleChangePagination}
            columns={columns}
            source={Data}
            loading={isLoading}
            settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
            setSelectedRowKeys={setSelectedRowKeys}
            nodata="Hiện chưa có tin tuyển dụng nào"
            selectedRowKeys={selectedRowKeys}
            columnsTable={columnsTable}
            setColumnsTable={setColumnsTable}
          />
        </View>
        <RecruitmentAdBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
        />
      </Content>
      {isOpen && (
        <RecruitmentAdFilterModal
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
