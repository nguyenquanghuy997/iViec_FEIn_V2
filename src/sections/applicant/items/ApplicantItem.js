import React, { useState } from "react";
import { View } from "@/components/FlexStyled";
import { Table ,Tag} from "antd";
import ReactDragListView from "react-drag-listview";
import { useGetListApplicantsQuery } from "@/sections/applicant";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";

export const ApplicantItem = () => {
  const { data: Data} = useGetListApplicantsQuery();
  const [columns, setColumns] = useState([
  {
    title: 'STT',
    key: 'index',
    render : (index) => index+1,
    fixed: "left"
  },
  { dataIndex: "fullName", title: "Họ và tên" ,fixed: "left",width: "6%"},
  { dataIndex: "phoneNumber", title: "Số điện thoại",fixed: "left" ,width: "6%"},
  { dataIndex: "dateOfBirth", title: "Ngày sinh",width: "8%" },
  { dataIndex: "email", title: "Email",width: "8%" },
  { dataIndex: "fullName", title: "Tin tuyển dụng" },
  { dataIndex: "fullName", title: "Bước tuyển dụng" },
  { dataIndex: "fullName", title: "Ngày ứng tuyển" },
  { dataIndex: "fullName", title: "Đơn vị"},
  { dataIndex: "fullName", title: "Nguồn"},
  { dataIndex: "fullName", title: "Cán bộ tuyển dụng" },
  { dataIndex: "fullName", title: "Cán bộ tạo ứng viên"},
  {
    title: 'Học vấn',
    dataIndex: ['academicLevel', 'name'], // antd v4
    key: 'name',
    render: (text) =>  <Tag>
    {text}
  </Tag>
  
  },
  { dataIndex: "fullName", title: "Kinh nghiệm làm việc" },
  { dataIndex: "fullName", title: "Ngành nghề" },
  { dataIndex: "yearOfExperience", title: "Số năm kinh nghiệm" },
  {
    title: 'Kỹ năng',
    key: 'applicantSkills',
    dataIndex: 'applicantSkills',
    render: (_, { applicantSkills }) => (
      <>
        {applicantSkills.map((item) => {
       let color = item.length > 5 ? 'geekblue' : 'green';
          return (
            <Tag color={color} key={item}>
              {item.name.toUpperCase()}
            </Tag>
          );
        })}
      </>
    ),
    width: "8%"
  },
  { dataIndex: "identityNumber", title: "Số CCCD/CMND" },
  { dataIndex: "sex", title: "Giới tính" },
  { dataIndex: "maritalStatus", title: "Tình trạng hôn nhân" },
  { dataIndex: "height", title: "Chiều cao" },
  { dataIndex: "weight", title: "Cân nặng" },
  { dataIndex: "fullName", title: "Nơi làm việc mong muốn" },
  { dataIndex: "expectedSalaryTo", title: "Mức lương mong muốn" },
  { dataIndex: "provinceName", title: "Nơi ở hiện tại" },
  { dataIndex: "homeTower", title: "Quê quán" },
  ]);

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
      if(fromIndex>3){
        console.log(`dragged from ${fromIndex} to ${toIndex}`);
        const newColumns = [...columns];
        const item = newColumns.splice(fromIndex, 1)[0];
        newColumns.splice(toIndex, 0, item);
        setColumns(newColumns);
      }

    },
    nodeSelector: "th"
  };
  // const maxWidthPerCell = 2000;
  const tableHeight = 1800;
  const rowKey = "id";
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const start = () => {
  //   setLoading(true);
  //   // ajax request after empty completing
  //   setTimeout(() => {
  //     setSelectedRowKeys([]);
  //     setLoading(false);
  //   }, 1000);
  // };
  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  // const hasSelected = selectedRowKeys.length > 0;
  // const dataTable = calculateColumnsWidth(columns, data, maxWidthPerCell);
  return (
    <View pv={20} ph={24}>
    <ReactDragListView.DragColumn {...dragProps}>
    <Table 
        rowSelection={rowSelection}
        columns={columns} 
        dataSource={Data?.items}
        rowKey={rowKey}
        scroll={{ x: 3000, y: tableHeight }}
    />
    </ReactDragListView.DragColumn>
    </View>
  );
};
