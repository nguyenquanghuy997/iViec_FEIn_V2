import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import { View } from "@/components/FlexStyled";
import NextLink from 'next/link'
import { Table, Tag, Dropdown, Menu, Checkbox} from "antd";
import ReactDragListView from "react-drag-listview";
import {useLazyGetListApplicantsQuery} from "@/sections/applicant";
import { fDate } from "@/utils/formatTime";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
import Iconify from "@/components/Iconify";
import TextMaxLine from '@/components/TextMaxLine'
import ApplicantHeader from "@/sections/applicant/ApplicantHeader";
// import { calculateColumnsWidth } from "./DynamicColumnsHelper";

import { columns as columnsTest } from '@/sections/applicant/others/columns'
import Content from "@/components/BaseComponents/Content";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {useDebounce} from "@/hooks/useDebounce";
import ApplicantFilterModal from "@/sections/applicant/filter/ApplicantFilterModal";

const defaultValues = {
    search: "",
};

export const ApplicantItem = () => {
    const [getListApplicants, { data: Data, isLoading }] = useLazyGetListApplicantsQuery();

  const [columns, setColumns] = useState([
    {
      title: 'STT',
      key: 'index',
      // eslint-disable-next-line
      render: (item, record, index) => (<>{index + 1}</>),
      width: "60px",
      fixed: "left",
    },
    { 
    dataIndex: "fullName", 
    title: "Họ và tên", 
    fixed: "left", 
    width: "200px",
    render: ((text,record) => (
      <NextLink href={`applicant/${record.id}`} passHref>
         <TextMaxLine line={1}sx={{ width: 160, fontWeight: 'normal', fontSize: 14 }}>
            {text}
          </TextMaxLine>
    </NextLink>
    )),
   },
    { dataIndex: "phoneNumber", title: "Số điện thoại", fixed: "left", width: "120px" },
    {
      dataIndex: "dateOfBirth",
      title: "Ngày sinh",
      render: ((date) => fDate(date)),
      width: "120px"
    },
    { dataIndex: "email", title: "Email", width: "240px" },
    { dataIndex: "fullName", title: "Tin tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Bước tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Ngày ứng tuyển", width: "200px" },
    { dataIndex: "fullName", title: "Đơn vị", width: "200px" },
    { dataIndex: "fullName", title: "Nguồn", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tuyển dụng", width: "200px" },
    { dataIndex: "fullName", title: "Cán bộ tạo ứng viên", width: "200px" },
    {
      title: 'Học vấn',
      dataIndex: ['academicLevel', 'name'], // antd v4
      key: 'name',
      width: "120px",
      render: (text) => <Tag>
        {text}
      </Tag>
    },
    { dataIndex: "fullName", title: "Kinh nghiệm làm việc", width: "200px" },
    { dataIndex: "fullName", title: "Ngành nghề", width: "200px" },
    { dataIndex: "yearOfExperience", title: "KN", width: "60px" },
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
      width: "200px"
    },
    { dataIndex: "identityNumber", title: "CCCD/CMND", width: "200px" },
    {
      dataIndex: "sex",
      title: "Giới tính",
      render: ((sex) => (sex == 0 ? 'Nam' : 'Nữ')),
      width: "80px",
    },
    { dataIndex: "maritalStatus", title: "TTHN", width: "120px" },
    { dataIndex: "height", title: "Chiều cao", width: "120px" },
    { dataIndex: "weight", title: "Cân nặng", width: "120px" },
    { dataIndex: "fullName", title: "Nơi làm việc mong muốn", width: "200px" },
    { dataIndex: "expectedSalaryTo", title: "Mức lương mong muốn", width: "120px" },
    { dataIndex: "provinceName", title: "Nơi ở hiện tại", width: "160px" },
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
    nodeSelector: "th"
  };
  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef < HTMLDivElement > (null);
  useLayoutEffect(() => {
    // const node = ref.current;
    // const { top } = node.getBoundingClientRect();

    // normally TABLE_HEADER_HEIGHT would be 55.
    setTableHeight(window.innerHeight - 400);
  }, [ref]);

  const rowKey = "id";

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const onSelectChange = (newSelectedRowKeys) => {
    console.log('selectedRowKeys changed: ', newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

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
    var checkedColumnsNew = checkedColumns
    if (e.target.checked) {
      checkedColumnsNew = checkedColumns.filter(id => { return id !== e.target.id })

    }
    else if (!e.target.checked) {
      checkedColumnsNew.push(e.target.id)

    }

    var filtered = initialColumns;
    for (var i = 0; i < checkedColumnsNew.length; i++)
      filtered = filtered.filter(el => { return el.dataIndex !== checkedColumns[i] })
    setCheckedColumns(checkedColumnsNew)
    setColumns(filtered)

  }
  const menu = (
    <Menu>
      <Menu.ItemGroup title="Columns" >
        <Menu.Item key="1" ><Checkbox id="dateOfBirth" onChange={onChange} defaultChecked>Ngày sinh</Checkbox></Menu.Item>
        <Menu.Item key="2"><Checkbox id="email" onChange={onChange} defaultChecked>Email</Checkbox></Menu.Item>

        <Menu.Item key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Tin tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Bước tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Ngày ứng tuyển</Checkbox></Menu.Item>
        <Menu.Item key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Đơn vị</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Nguồn</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Cán bộ tuyển dụng</Checkbox></Menu.Item>
        <Menu.Item key="3"><Checkbox id="fullName" onChange={onChange} defaultChecked>Mức lương mong muốn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Cán bộ tạo ứng viên</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="academicLevel" onChange={onChange} defaultChecked>Học vấn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="fullName" onChange={onChange} defaultChecked>Kinh nghiệm làm việc</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Ngành nghề</Checkbox></Menu.Item>
        <Menu.Item key="3"><Checkbox id="yearOfExperience" onChange={onChange} defaultChecked>Số năm kinh nghiệm</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="applicantSkills" onChange={onChange} defaultChecked>Kỹ năng</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="identityNumber" onChange={onChange} defaultChecked>Số CCCD/CMND</Checkbox></Menu.Item>
        <Menu.Item key="3"><Checkbox id="sex" onChange={onChange} defaultChecked>Giới tính</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="maritalStatus" onChange={onChange} defaultChecked>Tình trạng hôn nhân</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="height" onChange={onChange} defaultChecked>Chiều cao</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="weight" onChange={onChange} defaultChecked>Cân nặng</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="fullName" onChange={onChange} defaultChecked>Nơi làm việc mong muố</Checkbox></Menu.Item>
        <Menu.Item key="3"><Checkbox id="expectedSalaryTo" onChange={onChange} defaultChecked>Mức lương mong muốn</Checkbox></Menu.Item>
        <Menu.Item key="4"><Checkbox id="provinceName" onChange={onChange} defaultChecked>Nơi ở hiện tại</Checkbox></Menu.Item>
        <Menu.Item key="5"><Checkbox id="homeTower" onChange={onChange} defaultChecked>Quê quán</Checkbox></Menu.Item>


      </Menu.ItemGroup>
    </Menu>
  );

  // form search
    const Schema = Yup.object().shape({
        search: Yup.string(),
    });
    const methods = useForm({
        mode: 'onChange',
        defaultValues,
        resolver: yupResolver(Schema)
    });

    const {watch} = methods;

    const searchValue = useDebounce(watch('search'), 1000);

    useEffect(() => {
        getListApplicants({SearchKey: searchValue})
    }, [searchValue])

    // open filter form
    const [isOpen, setIsOpen] = useState(true);

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
            <NavItemContent icon={<Iconify icon='material-symbols:settings' />} title="" />
          </ListItemStyle>
        </Dropdown>

        <View >
          <TextMaxLine line={1}sx={{ width: 160, fontWeight: 'normal', fontSize: 14 }}>
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
          size='large'
          loading={isLoading}
          //to set pageSize == height tableHeight/40
          pagination={{ defaultPageSize: Math.floor(tableHeight / 40), showSizeChanger: true, pageSizeOptions: ['10', '20', '30'] }}
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


