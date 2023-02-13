import React, { useState ,useEffect} from "react";
import { View } from "@/components/FlexStyled";
import { Table ,Tag,Dropdown, Menu,Checkbox,Button} from "antd";
import ReactDragListView from "react-drag-listview";
import { useGetListApplicantsQuery } from "@/sections/applicant";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";

export const ApplicantItem = () => {
  const { data: Data} = useGetListApplicantsQuery();
  // const initialColumns =[];

  const [columns, setColumns] = useState([
  {
    title: 'STT',
    key: 'index',
    // eslint-disable-next-line
    render:(item, record, index)=>(<>{index+1}</>),
    width: "3%",
    fixed: "left",
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

  //
  // const [value, setValue] = useState(false)


  const [initialColumns, setInitialColumns] = useState([])
  const [checkedColumns, setCheckedColumns] = useState([])
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false)
  useEffect(() => {
    setInitialColumns(columns)
  }, [])
  const handleVisibleChange = flag => {
    setVisibleMenuSettings(flag)
  };
  const onChange = (e) => {
    var checkedColumnsNew= checkedColumns
    if(e.target.checked){
      checkedColumnsNew = checkedColumns.filter(id => {return id !== e.target.id})
    
    }
    else if(!e.target.checked){
    checkedColumnsNew.push(e.target.id)
  
    }

  var filtered = initialColumns;
    for(var i =0;i< checkedColumnsNew.length; i++)
    filtered = filtered.filter(el => {return el.dataIndex !== checkedColumns[i]})
    setCheckedColumns(checkedColumnsNew)
    setColumns(filtered)

  }
  const menu = (
    <Menu>  
      <Menu.ItemGroup title="Columns" >
      <Menu.Item key="1" ><Checkbox id="dateOfBirth" onChange={onChange} defaultChecked>Ngày sinh</Checkbox></Menu.Item>
        <Menu.Item key="2"><Checkbox id="email" onChange={onChange} defaultChecked>Email</Checkbox></Menu.Item>

        <Menu.Item  key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Tin tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Bước tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Ngày ứng tuyển</Checkbox></Menu.Item>
        <Menu.Item  key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Đơn vị</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Nguồn</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Cán bộ tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item  key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Mức lương mong muốn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Cán bộ tạo ứng viên</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="academicLevel" onChange={onChange} defaultChecked>Học vấn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Kinh nghiệm làm việc</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Ngành nghề</Checkbox></Menu.Item>
        <Menu.Item  key="3"><Checkbox id="yearOfExperience" onChange={onChange} defaultChecked>Số năm kinh nghiệm</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="applicantSkills" onChange={onChange} defaultChecked>Kỹ năng</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="identityNumber" onChange={onChange} defaultChecked>Số CCCD/CMND</Checkbox></Menu.Item>
        <Menu.Item  key="3"><Checkbox id="sex" onChange={onChange} defaultChecked>Giới tính</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="maritalStatus" onChange={onChange} defaultChecked>Tình trạng hôn nhân</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="height" onChange={onChange} defaultChecked>Chiều cao</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="weight" onChange={onChange} defaultChecked>Cân nặng</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Nơi làm việc mong muố</Checkbox></Menu.Item>
        <Menu.Item  key="3"><Checkbox id="expectedSalaryTo" onChange={onChange} defaultChecked>Mức lương mong muốn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="provinceName" onChange={onChange} defaultChecked>Nơi ở hiện tại</Checkbox></Menu.Item>
        <Menu.Item  key="5"><Checkbox id="homeTower" onChange={onChange} defaultChecked>Quê quán</Checkbox></Menu.Item>
       
        
      </Menu.ItemGroup>
    </Menu>
);
  return (
    <View pv={20} ph={24}>
        <Dropdown
        overlay={menu}
        onVisibleChange={handleVisibleChange}
        visible={visibleMenuSettings}
      >
        <Button>Cài đặt cột</Button>
      </Dropdown>
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


