import React, {useState,useEffect,useRef,useLayoutEffect} from "react";
import ReactDragListView from "react-drag-listview";
import {View} from "@/components/FlexStyled";
import {Checkbox, Dropdown, Menu, Table} from "antd";
import {ListItemStyle} from "@/components/nav-section/horizontal/style";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import {ButtonDS} from "@/components/DesignSystem";
const DynamicColumnsTable = props => {
  const { columns, source ,loading,ColumnData,menuItemText,UpdateListColumn ,settingName} = props;
  const [tableHeight, setTableHeight] = useState(600);
  const ref = useRef < HTMLDivElement > null;
  useLayoutEffect(() => {
      setTableHeight(window.innerHeight - 400);
  }, [ref]);
  const rowKey = "id";
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
        setSelectedRowKeys(newSelectedRowKeys);
    };
  const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
  const [columnsTable, setColumnsTable] = useState(columns)

  const dragProps = {
    onDragEnd(fromIndex, toIndex) {
        if (fromIndex > 3) {
            console.log(`dragged from ${fromIndex} to ${toIndex}`);
            const newColumns = [...columns];
            const item = newColumns.splice(fromIndex, 1)[0];
            newColumns.splice(toIndex, 0, item);
            setColumnsTable(newColumns);
          
        }
    },
    nodeSelector: "th",
  }; 

  const [initialColumns, setInitialColumns] = useState([]);
  const [checkedColumns, setCheckedColumns] = useState([]);
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);
  useEffect(() => {
      setInitialColumns(columns);
  }, []);
  const menu = (
    <>
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
        <ButtonDS
            tittle="Áp dụng"
            onClick={()=> {
              UpdateListColumn()
              setVisibleMenuSettings(false)
            }}
        />
    </>
  ); 
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
  setColumnsTable(filtered);
};
  return (
    <View >
           <View flexRow atCenter mb={24}>
                    <Dropdown
                        overlay={menu}
                        onVisibleChange={handleVisibleChange}
                        visible={visibleMenuSettings}
                    >
                        <ListItemStyle>
                            <NavItemContent
                                icon={<Iconify icon="material-symbols:settings"/>}
                                title=""
                            />
                        </ListItemStyle>

                    </Dropdown>

                    <View>
                        <TextMaxLine
                            line={1}
                            sx={{width: 160, fontWeight: "normal", fontSize: 14}}
                        >
                            {settingName}
                        </TextMaxLine>
                    </View>
                </View>
    <ReactDragListView.DragColumn {...dragProps}>
    <Table
        rowSelection={rowSelection}
        columns={columnsTable}
        dataSource={source}
        rowKey={rowKey}
        scroll={{x: 300, y: tableHeight}}
        size="large"
        loading={loading}
        pagination={{
            defaultPageSize: Math.floor(tableHeight / 40),
            showSizeChanger: true,
            pageSizeOptions: ["10", "20", "30"],
        }}
    />
   </ReactDragListView.DragColumn> 
   </View>
  );
};

export default DynamicColumnsTable;
