import Content from "@/components/BaseComponents/Content";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetListColumnApplicantsQuery } from "@/sections/applicant";
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";
import { columns as columnsTest } from "@/sections/applicant/others/columns";
import { fDate } from "@/utils/formatTime";
import { yupResolver } from "@hookform/resolvers/yup";
import { Table, Tag, Dropdown, Menu, Checkbox } from "antd";
import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import ReactDragListView from "react-drag-listview";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Link from "next/link";

const defaultValues = {
  search: "",
};

export const ApplicantItem = () => {
  // const [getListApplicants, { data: Data, isLoading }] =
  //   useLazyGetListApplicantsQuery();
  const Data ={
    "items": [
        {
            "applicantId": "01000000-ac12-0242-0a9a-08db14828f27",
            "recruitmentPipelineStateId": "01000000-ac12-0242-1c19-08db12ec3b47",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "e5149f0b-640c-4df2-abd4-57554ab896ec",
            "jobSourceName": "Facebook",
            "fullName": "Nguyễn Ngọc Thắng",
            "slug": "nguyen-ngoc-thang-",
            "portraitImage": "string",
            "dateOfBirth": "1997-02-19T04:13:32.609Z",
            "email": "nt@gmail.com",
            "phoneNumber": "0386193342",
            "identityNumber": null,
            "weight": null,
            "height": null,
            "homeTower": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8589-08db14828f2a"
            },
            "livingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8aae-08db14828f2a"
            },
            "expectedWorkingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8d04-08db14828f2a"
            },
            "experience": "Không làm sao có",
            "education": "Đại học đường đời",
            "expectedSalaryFrom": null,
            "expectedSalaryTo": null,
            "maritalStatus": null,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": null,
            "rawApplicantSkills": null,
            "createdTime": "2023-02-22T03:11:58.320734Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Tốt nhất",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Nguyễn Thị Thanh Thủy",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": true,
            "id": "01000000-ac12-0242-4fc1-08db14860143"
        },
        {
            "applicantId": "01000000-ac12-0242-0a9a-08db14828f27",
            "recruitmentPipelineStateId": "01000000-ac12-0242-e7b6-08db12ec4d6d",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": 1,
            "applicationUserId": null,
            "jobSourceId": "e5149f0b-640c-4df2-abd4-57554ab896ec",
            "jobSourceName": "Facebook",
            "fullName": "Nguyễn Ngọc Thắng",
            "slug": "nguyen-ngoc-thang-",
            "portraitImage": "string",
            "dateOfBirth": "1997-02-19T04:13:32.609Z",
            "email": "nt@gmail.com",
            "phoneNumber": "0386193342",
            "identityNumber": null,
            "weight": null,
            "height": null,
            "homeTower": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8589-08db14828f2a"
            },
            "livingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8aae-08db14828f2a"
            },
            "expectedWorkingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8d04-08db14828f2a"
            },
            "experience": "Không làm sao có",
            "education": "Đại học đường đời",
            "expectedSalaryFrom": null,
            "expectedSalaryTo": null,
            "maritalStatus": null,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": null,
            "rawApplicantSkills": null,
            "createdTime": "2023-02-22T03:11:58.320734Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng phổ biến",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Nguyễn Thị Thanh Thủy",
            "ownerId": null,
            "ownerName": "Nguyễn Thị Phương ",
            "isAvailable": true,
            "id": "01000000-ac12-0242-e741-08db14854a7c"
        },
        {
            "applicantId": "01000000-ac12-0242-0a9a-08db14828f27",
            "recruitmentPipelineStateId": "01000000-ac12-0242-0454-08db10c9a5dc",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": 2,
            "applicationUserId": null,
            "jobSourceId": "e5149f0b-640c-4df2-abd4-57554ab896ec",
            "jobSourceName": "Facebook",
            "fullName": "Nguyễn Ngọc Thắng",
            "slug": "nguyen-ngoc-thang-",
            "portraitImage": "string",
            "dateOfBirth": "1997-02-19T04:13:32.609Z",
            "email": "nt@gmail.com",
            "phoneNumber": "0386193342",
            "identityNumber": null,
            "weight": null,
            "height": null,
            "homeTower": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8589-08db14828f2a"
            },
            "livingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8aae-08db14828f2a"
            },
            "expectedWorkingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8d04-08db14828f2a"
            },
            "experience": "Không làm sao có",
            "education": "Đại học đường đời",
            "expectedSalaryFrom": null,
            "expectedSalaryTo": null,
            "maritalStatus": null,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": null,
            "rawApplicantSkills": null,
            "createdTime": "2023-02-22T03:11:58.320734Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng làm người thương",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Nguyễn Thị Thanh Thủy",
            "ownerId": null,
            "ownerName": " ",
            "isAvailable": true,
            "id": "01000000-ac12-0242-36ee-08db14864fa5"
        },
        {
            "applicantId": "01000000-ac12-0242-0a9a-08db14828f27",
            "recruitmentPipelineStateId": "01000000-ac12-0242-6730-08db12ec2c25",
            "recruitmentPipelineState": 0,
            "pipelineStateResultType": null,
            "applicationUserId": null,
            "jobSourceId": "e5149f0b-640c-4df2-abd4-57554ab896ec",
            "jobSourceName": "Facebook",
            "fullName": "Nguyễn Ngọc Thắng",
            "slug": "nguyen-ngoc-thang-",
            "portraitImage": "string",
            "dateOfBirth": "1997-02-19T04:13:32.609Z",
            "email": "nt@gmail.com",
            "phoneNumber": "0386193342",
            "identityNumber": null,
            "weight": null,
            "height": null,
            "homeTower": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8589-08db14828f2a"
            },
            "livingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8aae-08db14828f2a"
            },
            "expectedWorkingAddress": {
                "provinceId": "01000000-ac12-0242-daf3-08db10c3ab39",
                "provinceName": "Hải Phòng",
                "districtId": "01000000-ac12-0242-4391-08db10c3ab3a",
                "districtName": "Thuỷ Nguyên",
                "villageId": null,
                "villageName": null,
                "id": "01000000-ac12-0242-8d04-08db14828f2a"
            },
            "experience": "Không làm sao có",
            "education": "Đại học đường đời",
            "expectedSalaryFrom": null,
            "expectedSalaryTo": null,
            "maritalStatus": null,
            "yearOfExperience": 1,
            "sex": 1,
            "applicantSkills": [],
            "jobCategories": [
                {
                    "name": null,
                    "id": "23900294-5af3-4c96-b0da-b5887e011363"
                }
            ],
            "academicLevel": null,
            "rawApplicantSkills": null,
            "createdTime": "2023-02-22T03:11:58.320734Z",
            "recruitmentId": null,
            "recruitmentName": "Tin tuyển dụng Parttime",
            "organizationId": "01000000-ac12-0242-b3cd-08db10c50f70",
            "organizationName": "Ban công nghệ tập đoàn FPT",
            "creatorId": null,
            "creatorName": "Thủy Nguyễn Thị Thanh Thủy",
            "ownerId": null,
            "ownerName": "Thủy Nguyễn Thị Thanh Thủy",
            "isAvailable": true,
            "id": "01000000-ac12-0242-6ffb-08db14828f21"
        }
    ],
    "totalRecord": 4,
    "currentPageIndex": 1,
    "totalPage": 1
}
  const { data: ColumnData } = useGetListColumnApplicantsQuery();
  const [columns, setColumns] = useState([
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
      title: "Họ và tên",
      fixed: "left",
      width: "200px",
      render: (text, record) => (
        // <Link href={`applicant/${record.id} && `} passHref>
        //   <TextMaxLine
        //     line={1}
        //     sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
        //   >
        //     {text}
        //   </TextMaxLine>
        // </Link>
        <Link passHref href={{ pathname: `applicant/${record.applicantId}`, query: { or: `${record.organizationId}`} }}>
          <TextMaxLine
        line={1}
        sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
      >
        {text}
      </TextMaxLine></Link>
      ),
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
    { dataIndex: "email", title: "Email", width: "240px" },
    { dataIndex: "recruitmentName", title: "Tin tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Bước tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Ngày ứng tuyển", width: "200px" },
    { dataIndex: "fullName", title: "Đơn vị", width: "200px" },
    { dataIndex: "fullName", title: "Nguồn", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tạo ứng viên", width: "200px" },
    {
      title: "Học vấn",
      dataIndex: ["academicLevel", "name"], // antd v4
      key: "name",
      width: "120px",
      render: (text) => <Tag>{text}</Tag>,
    },
    { dataIndex: "experience", title: "Kinh nghiệm làm việc", width: "200px" },
    { dataIndex: "fullName", title: "Ngành nghề", width: "200px" },
    { dataIndex: "yearOfExperience", title: "KN", width: "60px" },
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
    },
    { dataIndex: "identityNumber", title: "CCCD/CMND", width: "200px" },
    {
      dataIndex: "sex",
      title: "Giới tính",
      render: (sex) => (sex == 0 ? "Nam" : "Nữ"),
      width: "80px",
    },
    { dataIndex: "maritalStatus", title: "TTHN", width: "120px" },
    { dataIndex: "height", title: "Chiều cao", width: "120px" },
    { dataIndex: "weight", title: "Cân nặng", width: "120px" },
    { dataIndex: "fullName", title: "Nơi làm việc mong muốn", width: "200px" },
    {
      dataIndex: "expectedSalaryTo",
      title: "Mức lương mong muốn",
      width: "120px",
    },
    { dataIndex: "livingAddress", title: "Nơi ở hiện tại", width: "160px" },
    { dataIndex: "homeTower", title: "Quê quán", width: "160px" },
  ]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      if (fromIndex > 3) {
        console.log(`dragged from ${fromIndex} to ${toIndex}`);
        const newColumns = [...columns];
        const item = newColumns.splice(fromIndex, 1)[0];
        newColumns.splice(toIndex, 0, item);
        setColumns(newColumns);
      }
    },
    nodeSelector: "th",
  };
  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef < HTMLDivElement > null;
  useLayoutEffect(() => {
    setTableHeight(window.innerHeight - 400);
  }, [ref]);

  const rowKey = "id";

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const [initialColumns, setInitialColumns] = useState([]);
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);
  useEffect(() => {
    setInitialColumns(columns);
  }, []);
  const handleVisibleChange = (flag) => {
    setVisibleMenuSettings(flag);
  };
  const onChange = (e) => {
    var checkedColumnsNew = checkedColumns;
    if (e.target.checked) {
      checkedColumnsNew = checkedColumns.filter((id) => {
        return id !== e.target.id;
      });
    } else if (!e.target.checked) {
      checkedColumnsNew.push(e.target.id);
    }

    var filtered = initialColumns;
    for (var i = 0; i < checkedColumnsNew.length; i++)
      filtered = filtered.filter((el) => {
        return el.dataIndex !== checkedColumns[i];
      });
    setCheckedColumns(checkedColumnsNew);
    setColumns(filtered);
  };
  // let items=[]
  // ColumnData&&Object.keys(ColumnData).map((key,index) => items.push({"key":index+1, "label":key,"defaultChecked":ColumnData[key]}))
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
  const menu = (
    <Menu>
      {ColumnData &&
        Object.keys(ColumnData).map((key, index) => {
          if (key == "id") {
            return;
          }
          if (key == "name" || key == "id" || key == "phoneNumber") {
            return (
              <Menu.Item key={index + 1}>
                <Checkbox
                  id={key}
                  onChange={onChange}
                  defaultChecked={ColumnData[key]}
                  disabled
                >
                  {menuItemText[key]}
                </Checkbox>
              </Menu.Item>
            );
          } else {
            return (
              <Menu.Item key={index + 1}>
                <Checkbox
                  id={key}
                  onChange={onChange}
                  defaultChecked={ColumnData[key]}
                >
                  {menuItemText[key]}
                </Checkbox>
              </Menu.Item>
            );
          }
        })}
    </Menu>
  );

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(Schema),
  });

  const { watch } = methods;

  const searchValue = useDebounce(watch("search"), 1000);

  useEffect(() => {
    // getListApplicants({ SearchKey: searchValue });
  }, [searchValue]);

  // open filter form
  const [isOpen, setIsOpen] = useState(false);

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  return (
    <View>
      <ApplicantHeader
        methods={methods}
        columns={columnsTest}
        isOpen={isOpen}
        onOpenFilterForm={handleOpenFilterForm}
        onCloseFilterForm={handleCloseFilterForm}
      />
      <Content>
        <View flexRow atCenter mb={24}>
          <Dropdown
            overlay={menu}
            onVisibleChange={handleVisibleChange}
            visible={visibleMenuSettings}
          >
            <ListItemStyle>
              <NavItemContent
                icon={<Iconify icon="material-symbols:settings" />}
                title=""
              />
            </ListItemStyle>
          </Dropdown>

          <View>
            <TextMaxLine
              line={1}
              sx={{ width: 160, fontWeight: "normal", fontSize: 14 }}
            >
              {"DANH SÁCH ỨNG VIÊN"}
            </TextMaxLine>
          </View>
        </View>
        <ReactDragListView.DragColumn {...dragProps}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={Data?.items}
            rowKey={rowKey}
            scroll={{ x: 3000, y: tableHeight }}
            size="large"
            // loading={isLoading}
            //to set pageSize == height tableHeight/40
            pagination={{
              defaultPageSize: Math.floor(tableHeight / 40),
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
            }}
          />
        </ReactDragListView.DragColumn>
      </Content>
      <ApplicantFilterModal
        columns={columnsTest}
        isOpen={isOpen}
        onClose={handleCloseFilterForm}
      />
    </View>
  );
};
