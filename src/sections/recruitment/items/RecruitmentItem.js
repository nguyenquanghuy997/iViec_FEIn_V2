// import RecruitmentFilterModal from "../modals/RecruitmentFilterModal";
import { useLazyGetRecruitmentsQuery } from "../RecruitmentSlice";
import RecruitmentFilterModal from "../modals/RecruitmentFilterModal";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import RecruitmentHeader from "@/sections/recruitment/RecruitmentHeader";
import {
  YearOfExperience,
  RecruitmentWorkingForm,
  RecruitmentProcessStatus,
  Currency,
} from "@/utils/enum";
import { fCurrency } from "@/utils/formatNumber";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { get } from "lodash";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  searchKey: "",
};

export const RecruitmentItem = () => {
  const router = useRouter();
  const { query, isReady } = router;
  // api get list

  const [getAllFilter, { data: Data = {}, isLoading }] =
    useLazyGetRecruitmentsQuery();
  // api get list Column
  const { data: ColumnData } = [];
  // api update list Column
  const [UpdateListColumnApplicants] = [];
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const columns = useMemo(() => {
    return [
      {
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
        title: "Tin tuyển dụng",
        fixed: "left",
        width: "300px",
      },
      {
        dataIndex: "jobPosition",
        title: "Vị trí công việc",
        width: "214px",

      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
      },
      {
        dataIndex: "processStatus",
        title: "Trạng thái",
        width: "180px",
        render: (item) => RecruitmentProcessStatus(item),
      },
      {
        dataIndex: "startDate",
        title: "Ngày bắt đầu",
        width: "180px",
        type: "date",
        label: "Ngày bắt đầu",
        name: "startDate",
        render: (date) => fDate(date),
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
        render: (date) => fDate(date),
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
      {
        dataIndex: "createdTime",
        title: "Ngày tạo tin",
        width: "180px",
        type: "date",
        label: "Ngày tạo tin",
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
        dataIndex: "numberApply",
        title: "SL ứng tuyển",
        width: "160px",
        name: "numberApply",
        label: "SL ứng tuyển",
        type: "number",
        align: "center",
        items: [
          {
            name: "numberApplyFrom",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Từ</span>,
            endIcon: <span>Người</span>,
          },
          {
            name: "numberApplyTo",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Đến</span>,
            endIcon: <span>Người</span>,
          },
        ],
      },
      {
        dataIndex: "numberPosition",
        title: "SL cần tuyển",
        width: "160px",
        name: "numberPosition",
        label: "SL cần tuyển",
        type: "number",
        align: "center",
        items: [
          {
            name: "numberPositionFrom",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Từ</span>,
            endIcon: <span>Người</span>,
          },
          {
            name: "numberPositionTo",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Đến</span>,
            endIcon: <span>Người</span>,
          },
        ],
      },
      {
        dataIndex: "numberApply",
        title: "SL đạt",
        width: "160px",
        name: "numberApply",
        label: "SL đạt",
        type: "number",
        align: "center",
        items: [
          {
            name: "numberApplyFrom",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Từ</span>,
            endIcon: <span>Người</span>,
          },
          {
            name: "numberApplyTo",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Đến</span>,
            endIcon: <span>Người</span>,
          },
        ],
      },
      {
        dataIndex: "numberView",
        title: "SL nhận việc",
        width: "160px",
        name: "numberView",
        label: "SL nhận việc",
        type: "number",
        align: "center",
        items: [
          {
            name: "numberViewFrom",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Từ</span>,
            endIcon: <span>Người</span>,
          },
          {
            name: "numberViewTo",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Đến</span>,
            endIcon: <span>Người</span>,
          },
        ],
      },
      {
        dataIndex: "ownerName",
        title: "Cán bộ phụ trách",
        width: "220px",
        name: "ownerNameIds",
        label: "Cán bộ phụ trách",
        placeholder: "Chọn 1 hoặc nhiều người",
        // type: "select",
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
      {
        dataIndex: "ownerName",
        title: "Đồng phụ trách",
        width: "220px",
        name: "ownerNameIds",
        label: "Đồng phụ trách",
        placeholder: "Chọn 1 hoặc nhiều người",
        // type: "select",
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
      {
        dataIndex: "recruitmentAddresses",
        title: "Khu vực đăng tin",
        width: "300px",
        name: "recruitmentAddresses",
        label: "Khu vực đăng tin",
        placeholder: "Chọn 1 hoặc nhiều khu vực",
        // type: "select",
        multiple: true,
        render: (_, { recruitmentAddresses }) => (
          <>
            {recruitmentAddresses.map((item, index) => {
              if (index < recruitmentAddresses?.length - 1) {
                return (
                  <div key={item}>{item.provinceName?.toUpperCase()},</div>
                );
              } else {
                return <div key={item}>{item.provinceName?.toUpperCase()}</div>;
              }
              // let color = item.length > 5 ? 'geekblue' : 'green';
            })}
          </>
        ),
      },
      {
        dataIndex: "recruitmentWorkingForms",
        title: "Hình thức làm việc",
        width: "216px",
        name: "recruitmentWorkingForms",
        label: "Hình thức làm việc",
        placeholder: "Chọn 1 hoặc nhiều hình thức",
        // type: "select",
        multiple: true,
        render: (_, { recruitmentWorkingForms }) => (
          <>
            {recruitmentWorkingForms.map((item, index) => {
              if (index < recruitmentWorkingForms?.length - 1) {
                return (
                  <span key={item}>
                    {RecruitmentWorkingForm(item.workingForm)},{" "}
                  </span>
                );
              } else {
                return (
                  <span key={item}>
                    {RecruitmentWorkingForm(item.workingForm)}
                  </span>
                );
              }
            })}
          </>
        ),
      },
      {
        dataIndex: ["minSalary", "maxSalary", "currencyUnit"],
        title: "Mức lương",
        width: "216px",
        name: ["minSalary", "maxSalary"],
        label: "Mức lương",
        // type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        render: (text, row) => (
          <>
            {get(row, "minSalary", "") != 0
              ? `${fCurrency(get(row, "minSalary", ""))} - ${fCurrency(
                  get(row, "maxSalary", "")
                )} ${Currency(get(row, "currencyUnit", ""))}`
              : ""}
          </>
        ),
      },
      {
        dataIndex: "candidateLevelName",
        title: "Chức danh",
        width: "216px",
      },
      {
        dataIndex: "workExperience",
        title: "Số năm kinh nghiệm",
        width: "214px",
        render: (item) => YearOfExperience(item),
      },
      {
        dataIndex: "workingLanguageName",
        title: "Ngôn ngữ",
        width: "160px",
      },
    ];
  }, [page, paginationSize]);

  const menuItemText = {
    name: "Họ và tên",
    phoneNumber: "Số điện thoại",
    dateOfBirth: "Ngày sinh",
    email: "Email",
    recruitment: "Tin tuyển dụng",
    recruitmentPipelineState: "Bước tuyển dụng",
    createdTime: "Ngày ứng tuyển",
    organization: "Tổ chức",
    jobSource: "Nguồn",
    council: "Hội đồng",
    creator: "Cán bộ tạo ứng viên",
    education: "Học vấn",
    applicantWorkingExperiences: "Kinh nghiệm làm việc",
    jobCategory: "Ngành nghề",
    yearOfExperience: "Số năm kinh nghiệm",
    applicantSkills: "Kỹ năng",
    identityNumber: "Số CCCD/CMND",
    sex: "Giới tính",
    maritalStatus: "Tình trạng hôn nhâ",
    height: "Chiều cao",
    weight: "Cân nặng",
    expectedWorkingAddress: "Nơi làm việc mong muốn",
    expectedSalary: "Mức lương mong muốn",
    livingAddress: "Nơi ở hiện tại",
    homeTower: "Quê quán",
  };

  // form search
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
    debugger
    const body = { ...data, searchKey: data.searchKey };

    if (query) {
      queryParams = {
        ...queryParams,
        ... body,
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

  return (
    <View>
      <RecruitmentHeader
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
            columns={[...columns]}
            source={Data}
            loading={isLoading}
            ColumnData={ColumnData}
            menuItemText={menuItemText}
            UpdateListColumn={handleUpdateListColumnApplicants}
            settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
            scroll={{ x: 3954 }}
            nodata="Hiện chưa có tin tuyển dụng nào"
          />
        </View>
      </Content>
      {isOpen && (
        <RecruitmentFilterModal
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
