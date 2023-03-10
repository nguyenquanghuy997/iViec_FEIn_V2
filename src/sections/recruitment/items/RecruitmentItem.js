// import RecruitmentFilterModal from "../modals/RecruitmentFilterModal";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import RecruitmentHeader from "@/sections/recruitment/RecruitmentHeader";
import {
  // Address,
  MaritalStatus,
  Sex,
  YearOfExperience,
  PipelineStateType,
} from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { Tag } from "antd";
import Link from "next/link";
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

  // const [getAllFilter, { data: Data = [], isLoading }] =
  //   {};
  // api get list Column
  const { data: ColumnData } = [];
  // api update list Column
  const [UpdateListColumnApplicants] = [];

  const columns = [
    {
      title: "STT",
      key: "index",
      // eslint-disable-next-line
      render: (item, record, index) => <>{index + 1}</>,
      width: "60px",
      fixed: "left",
    },
    {
      dataIndex: "fullName",
      title: "Tin tuyển dụng",
      fixed: "left",
      width: "200px",
      render: (text, record) => (
        <Link
          passHref
          href={{
            pathname: `applicant/${record.applicantId}`,
            query: { or: `${record.organizationId}` },
          }}
        >
          <TextMaxLine
            line={1}
            sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
          >
            {text}
          </TextMaxLine>
        </Link>
      ),
    },
    {
      dataIndex: "phoneNumber",
      title: "Vị trí công việc",
      fixed: "left",
      width: "120px",
    },
    {
      dataIndex: "dateOfBirth",
      title: "Ngày sinh",
      render: (date) => fDate(date),
      width: "120px",
    },
    { dataIndex: "email", title: "Đơn vị", width: "240px" },
    {
      dataIndex: "recruitmentName",
      title: "Ngày bắt đầu",
      width: "200px",
      name: "recruitmentIds",
      type: "select",
      multiple: true,
      placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
      label: "Tin tuyển dụng",
    },
    {
      dataIndex: "recruitmentPipelineState",
      title: "Ngày hết hạn",
      width: "200px",
      name: "recruitmentPipelineStates",
      label: "Bước tuyển dụng",
      placeholder: "Chọn một hoặc nhiều bước tuyển dụng",
      type: "select",
      multiple: true,
      render: (item) => PipelineStateType(item, 1),
    },
    {
      dataIndex: "createdTime",
      title: "Ngày tạo tin",
      width: "200px",
      type: "date",
      label: "Ngày ứng tuyển",
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
      dataIndex: "organizationName",
      title: "Trạng thái",
      width: "200px",
      name: "organizationIds",
      type: "tree",
      isTree: true,
      multiple: true,
      placeholder: "Chọn một hoặc nhiều đơn vị",
      label: "Đơn vị",
    },
    {
      dataIndex: "jobSourceName",
      title: "SL ứng tuyển",
      width: "200px",
      name: "jobSourceIds",
      label: "Nguồn",
      placeholder: "Chọn 1 hoặc nhiều nguồn",
      type: "select",
      multiple: true,
    },
    {
      dataIndex: "ownerName",
      title: "SL Đạt",
      width: "200px",
      name: "ownerIds",
      label: "Cán bộ tuyển dụng",
      placeholder: "Chọn 1 hoặc nhiều cán bộ",
      type: "select",
      multiple: true,
    },
    {
      dataIndex: "creatorName",
      title: "Cán bộ phụ trách",
      width: "200px",
      name: "creatorIds",
      label: "Người tạo ứng viên",
      placeholder: "Chọn 1 hoặc nhiều người",
      type: "select",
      multiple: true,
    },
    {
      title: "Đồng phụ trách",
      dataIndex: ["academicLevel", "name"], // antd v4
      key: "name",
      width: "120px",
      render: (text) => <Tag>{text}</Tag>,
      name: "educations",
      type: "text",
      placeholder: "Tìm kiếm...",
      label: "Học vấn",
    },
    {
      dataIndex: "experience",
      title: "Khu vực đăng tin",
      width: "200px",
      name: "experience",
      type: "text",
      placeholder: "Tìm kiếm...",
      label: "Kinh nghiệm làm việc",
    },
    {
      dataIndex: "fullName",
      title: "Hình thức làm việc",
      width: "200px",
      name: "jobCategoryIds",
      label: "Ngành nghề",
      placeholder: "Chọn 1 hoặc nhiều ngành nghề",
      type: "select",
      multiple: true,
    },
    {
      dataIndex: "yearOfExperience",
      title: "Mức lương",
      width: "60px",
      name: "yearsOfExperience",
      type: "select",
      multiple: false,
      placeholder: "Chọn số năm kinh nghiệm",
      label: "Số năm kinh nghiệm",
      render: (item) => YearOfExperience(item),
    },
    {
      title: "Chức danh",
      key: "applicantSkills",
      dataIndex: "applicantSkills",
      render: (_, { applicantSkills }) => (
        <>
          {applicantSkills.map((item) => {
            // let color = item.length > 5 ? 'geekblue' : 'green';
            return <Tag key={item}>{item.name.toUpperCase()}</Tag>;
          })}
        </>
      ),
      width: "200px",
      name: "applicantSkillIds",
      label: "Kỹ năng",
      placeholder: "Chọn 1 hoặc nhiều kỹ năng",
      type: "select",
      multiple: true,
    },
    {
      dataIndex: "identityNumber",
      title: "Số năm kinh nghiệm",
      width: "200px",
    },
    {
      dataIndex: "sex",
      title: "Giới tính",
      render: (item) => Sex(item),
      width: "80px",
      name: "sexs",
      type: "radio",
      label: "Giới tính",
    },
    {
      dataIndex: "maritalStatus",
      title: "Ngôn ngữ",
      width: "120px",
      name: "maritalStatuses",
      type: "select",
      label: "Tình trạng hôn nhân",
      render: (item) => MaritalStatus(item),
    },
  ];

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

  useEffect(() => {
    if (!isReady) return;
    // const queryParams = {
    //   searchKey: query.searchKey,
    //   applicantSkillIds:
    //     query.applicantSkillIds && typeof query.applicantSkillIds === "string"
    //       ? [query.applicantSkillIds]
    //       : query.applicantSkillIds && query.applicantSkillIds,
    //   expectSalaryFrom: query.expectSalaryFrom
    //     ? Number(query.expectSalaryFrom)
    //     : null,
    //   expectSalaryTo: query.expectSalaryTo
    //     ? Number(query.expectSalaryTo)
    //     : null,
    //   yearsOfExperience: query.yearsOfExperience
    //     ? [Number(query.yearsOfExperience)]
    //     : null,
    //   sexs: query.sexs ? [Number(query.sexs)] : null,
    //   weightFrom: query.weightFrom ? Number(query.weightFrom) : null,
    //   weightTo: query.weightTo ? Number(query.weightTo) : null,
    //   heightFrom: query.heightFrom ? Number(query.heightFrom) : null,
    //   heightTo: query.heightTo ? Number(query.heightTo) : null,
    //   maritalStatuses: query.maritalStatuses
    //     ? [Number(query.maritalStatuses)]
    //     : null,
    //   education: query.education ? query.education : null,
    //   homeTowerProvinceIds: query.homeTowerProvinceIds
    //     ? [query.homeTowerProvinceIds]
    //     : null,
    //   homeTowerDistrictIds: query.homeTowerDistrictIds
    //     ? [query.homeTowerDistrictIds]
    //     : null,
    //   livingAddressProvinceIds: query.livingAddressProvinceIds
    //     ? [query.livingAddressProvinceIds]
    //     : null,
    //   livingAddressDistrictIds: query.livingAddressDistrictIds
    //     ? [query.livingAddressDistrictIds]
    //     : null,
    //   expectWorkingAddressProvinceIds:
    //     query.expectWorkingAddressProvinceIds &&
    //     typeof query.expectWorkingAddressProvinceIds === "string"
    //       ? [query.expectWorkingAddressProvinceIds]
    //       : query.expectWorkingAddressProvinceIds &&
    //         query.expectWorkingAddressProvinceIds,
    //   organizationIds:
    //     query.organizationIds && typeof query.organizationIds === "string"
    //       ? [query.organizationIds]
    //       : query.organizationIds && query.organizationIds,
    //   recruitmentIds:
    //     query.recruitmentIds && typeof query.recruitmentIds === "string"
    //       ? [query.recruitmentIds]
    //       : query.recruitmentIds && query.recruitmentIds,
    //   ownerIds:
    //     query.ownerIds && typeof query.ownerIds === "string"
    //       ? [query.ownerIds]
    //       : query.ownerIds && query.ownerIds,
    //   councilIds:
    //     query.councilIds && typeof query.councilIds === "string"
    //       ? [query.councilIds]
    //       : query.councilIds && query.councilIds,
    //   creatorIds:
    //     query.creatorIds && typeof query.creatorIds === "string"
    //       ? [query.creatorIds]
    //       : query.creatorIds && query.creatorIds,
    //   createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
    //   createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
    //   recruitmentPipelineStates:
    //     query.recruitmentPipelineStates &&
    //     typeof query.recruitmentPipelineStates === "string"
    //       ? [Number(query.recruitmentPipelineStates)]
    //       : query.recruitmentPipelineStates &&
    //         query.recruitmentPipelineStates?.map((pipe) => Number(pipe)),
    //   jobCategoryIds:
    //     query.jobCategoryIds && typeof query.jobCategoryIds === "string"
    //       ? [query.jobCategoryIds]
    //       : query.jobCategoryIds && query.jobCategoryIds,
    //   jobSourceIds:
    //     query.jobSourceIds && typeof query.jobSourceIds === "string"
    //       ? [query.jobSourceIds]
    //       : query.jobSourceIds && query.jobSourceIds,
    // };
    // if (query) {
    //   getAllFilter(
    //     JSON.stringify(
    //       Object.entries(queryParams).reduce(
    //         (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
    //         {}
    //       )
    //     )
    //   ).unwrap();
    // } else {
    //   getAllFilter({}).unwrap();
    // }
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
  // const refreshData = () => {
  //   // getAllFilter().unwrap();
  // };
  return (
    <View>
      <RecruitmentHeader
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
            columns={columns}
            // source={Data}
            // loading={isLoading}
            ColumnData={ColumnData}
            menuItemText={menuItemText}
            UpdateListColumn={handleUpdateListColumnApplicants}
            settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
            scroll={{ x: 6500 }}
          />
        </View>
      </Content>
      {/* {isOpen && (
        <RecruitmentFilterModal
          columns={columns}
          isOpen={isOpen}
          onClose={handleCloseFilterForm}
          onSubmit={onSubmit}
          onRefreshData={refreshData}
        />
      )} */}
    </View>
  );
};
