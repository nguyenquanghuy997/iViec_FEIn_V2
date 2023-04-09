import DynamicColumnsTable from "@/components/BaseComponents/table";
import { View } from "@/components/FlexStyled";
import {
  useGetAllFilterApplicantQuery,
  useGetListColumnApplicantsQuery,
  useUpdateListColumnApplicantsMutation,
} from "@/sections/applicant";
import { Address, MaritalStatus, PipelineStateType, Sex, YearOfExperience, } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { Tag } from "antd";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import ApplicantBottomNav from "./ApplicantBottomNav";
import useAuth from "@/hooks/useAuth";
import { TBL_FILTER_TYPE } from "@/config";
import {
  LIST_GENDER,
  LIST_MARITAL_STATUSES,
  LIST_EXPERIENCE_NUMBER,
  LIST_STEP_RECRUITMENT,
} from "@/utils/formatString";
import {
  API_GET_LIST_RECRUITMENT,
  API_GET_PROVINCE,
  API_GET_LIST_JOB_SOURCE,
  API_GET_USER_FROM_ORGANIZATION,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_GET_JOB_CATEGORIES,
  API_GET_APPLICANT_SKILLS,
} from "@/routes/api";
import { PATH_DASHBOARD } from '@/routes/paths';

export const ApplicantItem = () => {
  const { user } = useAuth();
  const router = useRouter();
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data, isLoading } = useGetAllFilterApplicantQuery(query, { skip: !isReady });

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
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
        render: (fullName) => <span style={{ fontWeight: 500 }}>{fullName}</span>,
        filters: {
          type: TBL_FILTER_TYPE.TEXT,
        },
      },
      {
        dataIndex: "phoneNumber",
        title: "Số điện thoại",
        fixed: "left",
        width: "120px",
        filters: {
          type: TBL_FILTER_TYPE.TEXT,
        },
      },
      {
        dataIndex: "dateOfBirth",
        title: "Ngày sinh",
        render: (date) => fDate(date),
        width: "120px",
      },
      {
        dataIndex: "email",
        title: "Email",
        width: "214px",
        filters: {
          type: TBL_FILTER_TYPE.TEXT,
        },
      },
      {
        dataIndex: "recruitmentName",
        title: "Tin tuyển dụng",
        width: "300px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "recruitmentIds",
          remoteUrl: API_GET_LIST_RECRUITMENT,
          remoteMethod: 'POST',
          placeholder: "Chọn một hoặc nhiều tin tuyển dụng",
        },
      },
      {
        dataIndex: "recruitmentPipelineState",
        title: "Bước tuyển dụng",
        width: "200px",
        render: (item, record) => getStatusPipelineStateType(item, record?.pipelineStateResultType),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "recruitmentPipelineStates",
          placeholder: "Chọn một hoặc nhiều bước tuyển dụng",
          options: LIST_STEP_RECRUITMENT.map(item => ({ value: item.value, label: item.name })),
        },
      },
      {
        dataIndex: "createdTime",
        title: "Ngày ứng tuyển",
        width: "200px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ['createdTimeFrom', 'createdTimeTo'],
          placeholder: 'Chọn ngày',
        },
      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
        label: "Đơn vị",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_TREE,
          name: 'organizationIds',
          placeholder: "Chọn một hoặc nhiều đơn vị",
          remoteUrl: API_GET_ORGANIZATION_WITH_CHILD,
        },
      },
      {
        dataIndex: "jobSourceName",
        title: "Nguồn",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: 'jobSourceIds',
          placeholder: "Chọn 1 hoặc nhiều nguồn",
          remoteUrl: API_GET_LIST_JOB_SOURCE,
        },
      },
      {
        dataIndex: "ownerName",
        title: "Cán bộ tuyển dụng",
        width: "220px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "ownerIds",
          placeholder: "Chọn 1 hoặc nhiều cán bộ",
          remoteUrl: API_GET_USER_FROM_ORGANIZATION + '?OrganizationId=' + user.organizations?.id,
        },
      },
      {
        dataIndex: "creatorName",
        title: "Cán bộ tạo ứng viên",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "creatorIds",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_USER_FROM_ORGANIZATION + '?OrganizationId=' + user.organizations?.id,
        },
      },
      {
        title: "Học vấn",
        dataIndex:'academicLevel', 
        key: "name",
        width: "120px",
        render: (text) => <Tag>{text}</Tag>,
        filters: {
          type: TBL_FILTER_TYPE.TEXT,
          name: "educations",
        },
      },
      {
        dataIndex: "experience",
        title: "Kinh nghiệm làm việc",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.TEXT,
        },
      },
      {
        dataIndex: "jobCategories",
        title: "Ngành nghề",
        width: "200px",
        render: (jobCats = []) => {
          return jobCats.map(cat => cat.name).join(', ');
        },
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "jobCategoryIds",
          placeholder: "Chọn 1 hoặc nhiều ngành nghề",
          remoteUrl: API_GET_JOB_CATEGORIES,
        },
      },
      {
        dataIndex: "yearOfExperience",
        title: "Số năm kinh nghiệm",
        width: "220px",
        render: (item) => YearOfExperience(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          placeholder: 'Chọn số năm kinh nghiệm',
          name: "yearsOfExperience",
          options: LIST_EXPERIENCE_NUMBER,
        },
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
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "applicantSkillIds",
          placeholder: "Chọn 1 hoặc nhiều kỹ năng",
          remoteUrl: API_GET_APPLICANT_SKILLS,
        },
      },
      {
        dataIndex: "identityNumber",
        title: "CCCD/CMND",
        width: "200px",
      },
      {
        dataIndex: "sex",
        title: "Giới tính",
        render: (item) => Sex(item),
        width: "80px",
        filters: {
          type: TBL_FILTER_TYPE.RADIO,
          name: "sexs",
          options: LIST_GENDER,
        },
      },
      {
        dataIndex: "maritalStatus",
        title: "TTHN",
        width: "120px",
        render: (item) => MaritalStatus(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: "maritalStatuses",
          label: "Tình trạng hôn nhân",
          options: [{ value: '', label: 'Tất cả' }].concat(LIST_MARITAL_STATUSES),
          placeholder: 'Tất cả',
        },
      },
      {
        dataIndex: "height",
        title: "Chiều cao",
        width: "120px",
        align: "center",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_NUMBER,
          name: ['heightFrom', 'heightTo'],
          placeholder: 'Nhập chiều cao',
        },
      },
      {
        dataIndex: "weight",
        title: "Cân nặng",
        width: "120px",
        name: "weight",
        label: "Cân nặng",
        type: "number",
        align: "center",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_NUMBER,
          name: ['weightFrom', 'weightTo'],
          placeholder: 'Nhập cân nặng',
        },
      },
      {
        dataIndex: "expectedWorkingAddress",
        title: "Nơi làm việc mong muốn",
        width: "220px",
        render: (item) => Address(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "expectWorkingAddressProvinceIds",
          placeholder: "Chọn 1 hoặc nhiều Tỉnh/Thành phố",
          remoteUrl: API_GET_PROVINCE,
        },
      },
      {
        dataIndex: "expectedSalary",
        title: "Mức lương mong muốn",
        width: "240px",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_MONEY,
          placeholder: 'Nhập số tiền',
          name: ['expectedSalaryFrom', 'expectedSalaryTo'],
        },
      },
      {
        dataIndex: "livingAddress",
        title: "Nơi ở hiện tại",
        width: "220px",
        render: (item) => Address(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_ADDRESS,
          name: ['livingAddressProvinceIds', 'livingAddressDistrictIds'],
        },
      },
      {
        dataIndex: "homeTower",
        title: "Quê quán",
        width: "220px",
        render: (item) => Address(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_ADDRESS,
          name: ['homeTowerProvinceIds', 'homeTowerDistrictIds'],
        },
      },
    ];
  }, [query.PageIndex, query.PageSize]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);

  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName('css-6pqpl8')[0].style.paddingBottom = null;
  };

  const getStatusPipelineStateType = (recruitmentPipelineState, pipelineStateResultType) => {
    switch (recruitmentPipelineState) {
      case 0:
        return PipelineStateType(recruitmentPipelineState, pipelineStateResultType);
      case 1:
        return PipelineStateType(recruitmentPipelineState, pipelineStateResultType);
      case 2:
        return PipelineStateType(recruitmentPipelineState, pipelineStateResultType);
      case 3:
        switch (pipelineStateResultType) {
          case 0:
            return <span style={{ color: '#2E7D32' }}>{PipelineStateType(recruitmentPipelineState, pipelineStateResultType)}</span>;
          case 1:
            return <span style={{ color: '#F77A0C' }}>{PipelineStateType(recruitmentPipelineState, pipelineStateResultType)}</span>;
          case 2:
            return <span style={{ color: '#D32F2F' }}>{PipelineStateType(recruitmentPipelineState, pipelineStateResultType)}</span>;
          default:
            return <span style={{ color: '#2E7D32' }}>{PipelineStateType(recruitmentPipelineState, pipelineStateResultType)}</span>;
        }

    }
  }

  return (
    <View>
        <View>
          <DynamicColumnsTable
            columns={columns}
            source={Data}
            loading={isLoading}
            settingName={"DANH SÁCH ỨNG VIÊN"}
            nodata="Hiện chưa có ứng viên nào"
            selectedRowKeys={selectedRowKeys}
            setSelectedRowKeys={setSelectedRowKeys}
            itemSelected={itemSelected}
            setItemSelected={setItemSelected}
            useGetColumnsFunc={useGetListColumnApplicantsQuery}
            useUpdateColumnsFunc={useUpdateListColumnApplicantsMutation}
            searchInside={false}
            createText="Đăng tin tuyển dụng"
            onClickCreate={() => {
              router.push(PATH_DASHBOARD.recruitment.create);
            }}
          />
        </View>

        <ApplicantBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
          itemSelected={itemSelected}
        />
    </View>
  );
};
