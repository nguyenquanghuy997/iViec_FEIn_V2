import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import {View} from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {
  useGetAllFilterApplicantQuery,
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";
import {Address, MaritalStatus, PipelineStateType, Sex, YearOfExperience,} from "@/utils/enum";
import {fDate} from "@/utils/formatTime";
import {Tag} from "antd";
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "@/redux/store";
import {filterSlice} from "@/redux/common/filterSlice";
import {useEffect, useMemo, useState} from "react";
import {cleanObject} from "@/utils/function";
import ApplicantBottomNav from "./ApplicantBottomNav";

const defaultValues = {
  searchKey: "",
};

export const ApplicantItem = () => {
  const router = useRouter();
  const { query } = router;
  const dispatch = useDispatch();
  const toggleFormFilter = useSelector((state) => state.filterReducer.openForm);
  const dataFilter = useSelector((state) => state.filterReducer.data);
  const handleOpenFilterForm = () => dispatch(filterSlice.actions.openFilterModal());
  const handleCloseFilterForm = () => dispatch(filterSlice.actions.closeModal());
  const handleSetDataFilter = (data) => dispatch(filterSlice.actions.setAllDataFilter(data));
  const handleClearDataFilter = () => dispatch(filterSlice.actions.clearDataFilter());

  useEffect(() => {
    handleClearDataFilter();
  }, [])

  const methods = useForm({
    mode: "onChange",
    defaultValues,
  });

  const { handleSubmit } = methods;

  // api get list
  const { data: Data, isLoading } = useGetAllFilterApplicantQuery(JSON.stringify(cleanObject(dataFilter)));

  // api get list Column
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  // api update list Column
  const [UpdateListColumnApplicants] = useUpdateListColumnApplicantsMutation();
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    handleSetDataFilter({...dataFilter,pageSize: pageSize, pageIndex: pageIndex })
  };
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
        dataIndex: "fullName",
        title: "Họ và tên",
        fixed: "left",
        width: "220px",
      },
      {
        dataIndex: "phoneNumber",
        title: "Số điện thoại",
        fixed: "left",
        width: "120px",
      },
      {
        dataIndex: "dateOfBirth",
        title: "Ngày sinh",
        render: (date) => fDate(date),
        width: "120px",
      },
      { dataIndex: "email", title: "Email", width: "214px" },
      {
        dataIndex: "recruitmentName",
        title: "Tin tuyển dụng",
        width: "300px",
        name: "recruitmentIds",
        type: "select",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
        label: "Tin tuyển dụng",
      },
      {
        dataIndex: "recruitmentPipelineState",
        title: "Bước tuyển dụng",
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
        title: "Ngày ứng tuyển",
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
        title: "Đơn vị",
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
        title: "Nguồn",
        width: "200px",
        name: "jobSourceIds",
        label: "Nguồn",
        placeholder: "Chọn 1 hoặc nhiều nguồn",
        type: "select",
        multiple: true,
      },
      {
        dataIndex: "ownerName",
        title: "Cán bộ tuyển dụng",
        width: "220px",
        name: "ownerIds",
        label: "Cán bộ tuyển dụng",
        placeholder: "Chọn 1 hoặc nhiều cán bộ",
        type: "select",
        multiple: true,
      },
      {
        dataIndex: "creatorName",
        title: "Cán bộ tạo ứng viên",
        width: "200px",
        name: "creatorIds",
        label: "Người tạo ứng viên",
        placeholder: "Chọn 1 hoặc nhiều người",
        type: "select",
        multiple: true,
      },
      {
        title: "Học vấn",
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
        title: "Kinh nghiệm làm việc",
        width: "200px",
        name: "experience",
        type: "text",
        placeholder: "Tìm kiếm...",
        label: "Kinh nghiệm làm việc",
      },
      {
        dataIndex: "fullName",
        title: "Ngành nghề",
        width: "200px",
        name: "jobCategoryIds",
        label: "Ngành nghề",
        placeholder: "Chọn 1 hoặc nhiều ngành nghề",
        type: "select",
        multiple: true,
      },
      {
        dataIndex: "yearOfExperience",
        title: "Số năm kinh nghiệm",
        width: "220px",
        name: "yearsOfExperience",
        type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        label: "Số năm kinh nghiệm",
        render: (item) => YearOfExperience(item),
      },
      {
        title: "Kỹ năng",
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
      { dataIndex: "identityNumber", title: "CCCD/CMND", width: "200px" },
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
        title: "TTHN",
        width: "120px",
        name: "maritalStatuses",
        type: "select",
        label: "Tình trạng hôn nhân",
        render: (item) => MaritalStatus(item),
      },
      {
        dataIndex: "height",
        title: "Chiều cao",
        width: "120px",
        name: "height",
        label: "Chiều cao",
        type: "number",
        align: "center",
        items: [
          {
            name: "heightFrom",
            type: "number",
            placeholder: "Nhập chiều cao",
            startIcon: <span>Từ</span>,
            endIcon: <span>Cm</span>,
          },
          {
            name: "heightTo",
            type: "number",
            placeholder: "Nhập chiều cao",
            startIcon: <span>Đến</span>,
            endIcon: <span>Cm</span>,
          },
        ],
      },
      {
        dataIndex: "weight",
        title: "Cân nặng",
        width: "120px",
        name: "weight",
        label: "Cân nặng",
        type: "number",
        align: "center",
        items: [
          {
            name: "weightFrom",
            type: "number",
            placeholder: "Nhập cân nặng",
            startIcon: <span>Từ</span>,
            endIcon: <span>Kg</span>,
          },
          {
            name: "weightTo",
            type: "number",
            placeholder: "Nhập cân nặng",
            startIcon: <span>Đến</span>,
            endIcon: <span>Kg</span>,
          },
        ],
      },
      {
        dataIndex: "expectedWorkingAddress",
        title: "Nơi làm việc mong muốn",
        width: "220px",
        name: "expectWorkingAddressProvinceIds",
        label: "Nơi làm việc mong muốn",
        placeholder: "Chọn 1 hoặc nhiều Tỉnh/Thành phố",
        type: "select",
        multiple: true,
        render: (item) => Address(item),
      },
      {
        dataIndex: "expectedSalaryTo",
        title: "Mức lương mong muốn",
        width: "240px",
        name: "expectSalary",
        placeholder: "",
        label: "Mức lương mong muốn",
        items: [
          {
            name: "expectSalaryFrom",
            type: "number",
            placeholder: "Nhập số tiền",
            startIcon: <span>Từ</span>,
            endIcon: <span>VNĐ</span>,
          },
          {
            name: "expectSalaryTo",
            type: "number",
            placeholder: "Nhập số tiền",
            startIcon: <span>Đến</span>,
            endIcon: <span>VNĐ</span>,
          },
        ],
      },
      {
        dataIndex: "livingAddress",
        title: "Nơi ở hiện tại",
        width: "220px",
        name: "livingAddresses",
        type: "select",
        label: "Nơi ở hiện tại",
        render: (item) => Address(item),
        items: [
          {
            name: "livingAddressProvinceIds",
            type: "select",
            placeholder: "Chọn Tỉnh/Thành phố",
            label: "Tỉnh/Thành phố",
          },
          {
            name: "livingAddressDistrictIds",
            type: "select",
            placeholder: "Chọn Quận/Huyện",
            label: "Quận/Huyện",
          },
        ],
      },
      {
        dataIndex: "homeTower",
        title: "Quê quán",
        width: "220px",
        name: "homeTowers",
        type: "select",
        label: "Quê quán",
        render: (item) => Address(item),
        items: [
          {
            name: "homeTowerProvinceIds",
            type: "select",
            placeholder: "Chọn Tỉnh/Thành phố",
            label: "Chọn Tỉnh/Thành phố",
          },
          {
            name: "homeTowerDistrictIds",
            type: "select",
            placeholder: "Chọn Quận/Huyện",
            label: "Chọn Quận/Huyện",
          },
        ],
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

  const handleUpdateListColumnApplicants = async () => {
    var body = {
      recruitment: false,
    };
    var data = { id: "01000000-ac12-0242-981f-08db10c9413d", body: body };

    await UpdateListColumnApplicants(data);
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
    const body = {
      ...data,
      searchKey: data.searchKey,
      recruitmentPipelineStates: data.recruitmentPipelineStates?.map((pipe) => Number(pipe)),
      yearsOfExperience: typeof data.yearsOfExperience === 'number' ? [data.yearsOfExperience] : null,
      sexs: typeof data.sexs === 'number' ? [data.sexs] : null,
      maritalStatuses: typeof data.maritalStatuses === 'number' ? [data.maritalStatuses] : null,
      livingAddressProvinceIds: data.livingAddressProvinceIds && typeof data.livingAddressProvinceIds === 'string' ? [data.livingAddressProvinceIds] : null,
      livingAddressDistrictIds: data.livingAddressDistrictIds && typeof data.livingAddressDistrictIds === 'string' ? [data.livingAddressDistrictIds] : null,
      homeTowerProvinceIds: data.homeTowerProvinceIds && typeof data.homeTowerProvinceIds === 'string' ? [data.homeTowerProvinceIds] : null,
      homeTowerDistrictIds: data.homeTowerDistrictIds && typeof data.homeTowerDistrictIds === 'string' ? [data.homeTowerDistrictIds] : null,
    };
    handleSetDataFilter(body);
    handleCloseFilterForm();
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);

  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName('css-6pqpl8')[0].style.paddingBottom = null;
  };
  return (
    <View>
      <ApplicantHeader
          methods={methods}
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
            ColumnData={ColumnData}
            menuItemText={menuItemText}
            UpdateListColumn={handleUpdateListColumnApplicants}
            settingName={"DANH SÁCH ỨNG VIÊN"}
            scroll={{ x: 6500 }}
            nodata="Hiện chưa có ứng viên nào"
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
          />
        </View>
        <ApplicantBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          itemSelected={itemSelected}
        />
      </Content>
      {toggleFormFilter && (
        <ApplicantFilterModal
          columns={columns}
          isOpen={toggleFormFilter}
          onClose={handleCloseFilterForm}
          onOpen={handleOpenFilterForm}
          onSubmit={onSubmit}
        />
      )}
    </View>
  );
};
