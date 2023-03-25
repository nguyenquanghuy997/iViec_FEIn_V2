import FilterModalRole from "../FilterModalRole";
import RolegroupHeader from "../RolegroupHeader";
import DetailDrawer from "../modals/DetailDrawer";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import TextMaxLine from "@/components/TextMaxLine";
import {
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import {
  // useGetAllFilterPipelineMutation,
  useGetRoleGroupListQuery,
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
  // const { data: Data, isLoading } = useGetAllFilterPipelineMutation();
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  const [UpdateListColumnApplicants] = useUpdateListColumnApplicantsMutation();
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
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
      key: "status",
      render: () => (
        <Typography sx={{ color: "#388E3C", fontSize: "12px" }}>
          Đang hoạt động
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
      <Content sx={{ padding: "0 !important" }}>
        <DynamicColumnsTable
          columns={columns}
          source={data}
          loading={isLoading}
          ColumnData={ColumnData}
          menuItemText={menuItemText}
          UpdateListColumn={handleUpdateListColumnApplicants}
          settingName={"DANH SÁCH VAI TRÒ"}
          isSetting={true}
          nodata="Hiện chưa có quy trình tuyển dụng nào"
          setPaginationSize={setPaginationSize}
          setPage={setPage}
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
