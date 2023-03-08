import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { View } from "@/components/FlexStyled";
import {
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import { useGetAllFilterPipelineMutation } from "@/sections/pipeline";
import PipelineHeader from "@/sections/pipeline/PipelineHeader";
import { yupResolver } from "@hookform/resolvers/yup";
import { Typography, Stack, Avatar } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect, useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import FilterModalPipeline from '../FilterModalPipeline'

const defaultValues = {
  searchKey: "",
};

export const PipelineItem = () => {
  const router = useRouter();
  const { query, isReady } = router;
  // api get list
  const [getAllFilterApplicant, { data: Data, isLoading }] =
    useGetAllFilterPipelineMutation();
  // api get list Column
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  // api update list Column
  const [UpdateListColumnApplicants] = useUpdateListColumnApplicantsMutation();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (index) => <>{index + 1}</>,
      width: "50px",
      fixed: "left",
      align: "center",
    },
    {
      dataIndex: "role",
      title: "Vai trò",
      width: "220px",
      fixed: "left",
      render: () => <>Nhân viên tuyển dụng</>,
    },
    {
      title: "Số nhân viên",
      key: "number",
      render: ( index) => <>{index + 20}</>,
      width: "140px",
    },

    {
      title: "Trạng thái",
      key: "status",
      render: () => <Typography sx={{color:'#388E3C',fontSize: "12px"}}>Đang hoạt động</Typography>,
      width: "160px",
    },
    {
      title: "Ngày tạo",
      key: "date",
      render: () => <>17/02/2023</>,
      width: "120px",
    },
    {
      title: "Người tạo",
      key: "by",
      render: () => (
        <Stack direction="row" spacing={2}>
          <Avatar src="https://i.pinimg.com/564x/fe/95/6f/fe956fd2b723abb5dbbba3d9f063b377.jpg" />
          <Typography
            sx={{ margin: "auto 0!important", pl: 1, fontSize: "13px" }}
          >
            Đỗ Ánh Tuyết
          </Typography>
        </Stack>
      ),
      width: "220px",
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
      applicantSkillIds:
        query.applicantSkillIds && typeof query.applicantSkillIds === "string"
          ? [query.applicantSkillIds]
          : query.applicantSkillIds && query.applicantSkillIds,
      expectSalaryFrom: query.expectSalaryFrom
        ? Number(query.expectSalaryFrom)
        : null,
      expectSalaryTo: query.expectSalaryTo
        ? Number(query.expectSalaryTo)
        : null,
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
      // educations: query.educations ? [query.educations] : null,
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
    };
    if (query) {
      getAllFilterApplicant(JSON.stringify(queryParams)).unwrap();
    } else {
      getAllFilterApplicant({}).unwrap();
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

  
  return (
    <View>
      <Content>
        <PipelineHeader
          methods={methods}
          isOpen={isOpen}
          onSubmit={onSubmitSearch}
          handleSubmit={handleSubmit}
          onOpenFilterForm={handleOpenFilterForm}
          onCloseFilterForm={handleCloseFilterForm}
        />
        <DynamicColumnsTable
          columns={columns}
          source={Data}
          loading={isLoading}
          ColumnData={ColumnData}
          menuItemText={menuItemText}
          UpdateListColumn={handleUpdateListColumnApplicants}
          settingName={"DANH SÁCH VAI TRÒ"}
          style={{transform:'translateY(-65px)'}}
        />
      </Content>
      {isOpen && (
        // <ApplicantFilterModal
        //   columns={columns}
        //   isOpen={isOpen}
        //   onClose={handleCloseFilterForm}
        //   onSubmit={onSubmit}
        // />
        <FilterModalPipeline open={isOpen} onClose={handleCloseFilterForm} onOpen={handleOpenFilterForm}/>
      )}
          
    </View>
  );
};
