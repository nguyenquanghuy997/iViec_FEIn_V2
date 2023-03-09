import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import NavItemContent from "@/components/nav-section/horizontal/NavItem";
import { ListItemStyle } from "@/components/nav-section/horizontal/style";
import BottomNavPipeline from "@/sections/pipeline/BottomNavPipeline";
import { makeStyles } from "@mui/styles";
import { Checkbox, Dropdown, Menu, Table } from "antd";
import React, { useState, useEffect } from "react";
import ReactDragListView from "react-drag-listview";

const DynamicColumnsTable = (props) => {
  const {
    columns,
    source,
    loading,
    ColumnData,
    menuItemText,
    UpdateListColumn,
    settingName,
    filter,
    scroll,
    style,
    nodata,
    // setPage,
    // setPaginationSize
  } = props;
  const rowKey = "id";
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const [columnsTable, setColumnsTable] = useState(columns);

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
  const [ isOpenBottomNav, setIsOpenBottomNav] = useState(false)
  console.log(isOpenBottomNav)
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
        onClick={() => {
          UpdateListColumn();
          setVisibleMenuSettings(false);
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
  const useStyles = makeStyles(() => ({
    table: {
      "& .ant-table": {
        minHeight: "500px",
        borderRadius: "8px",
      },
      "& .ant-table-thead >tr>th": {
        background: "#FDFDFD",
        height: "72px",
        borderBottom: "2px solid #CCD4DC",
      },
      "& .ant-pagination": {
        padding: "0 16px",
      },
      "& .ant-pagination .ant-pagination-total-text": {
        position: "absolute",
        left: 16,
        color: "#455570",
        fontWeight: 600,
        fontSize: 12,
      },

      "& .ant-pagination .ant-pagination-item a": {
        color: "#8A94A5",
        fontWeight: 600,
        fontSize: 12,
      },
      "& .ant-pagination .ant-pagination-item-active ": {
        background: "#EFF3F7",
        borderRadius: 6,
        border: "none",
      },
      "& .ant-pagination .ant-pagination-item-active a": {
        color: "#455570",
        fontWeight: 700,
      },
      "& .ant-pagination .ant-select-selection-item": {
        color: "#455570",
        fontWeight: 600,
        fontSize: 12,
      },
      "& .ant-select .ant-select-arrow": {
        marginTop: "-5px",
        fontSize: 10,
        color: "#455570",
      },
      "& .ant-pagination .ant-pagination-next button": {
        color: "#455570",
      },
      "& .ant-pagination .ant-pagination-item a:hover, .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link": {
        backgroundColor: "#EFF3F7",
        color: "#455570",
        fontWeight: 700,
      },
    },
    setting: {
      background: "#FDFDFD",
      boxShadow:
        "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
      borderRadius: "4px",
    },
  }));

  const classes = useStyles();
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
  };
  let locale = {
    emptyText: (
      <div style={{margin:'40px 0', minHeight:'250px'}}>
        <img src={`/assets/icons/candidate/notfound.png`} style={{margin:'0 auto'}}/>
        <p>{nodata}</p>
      </div>
    )
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
        mb={16}
      >
        <View style={{ flexDirection: "row", alignItems: "center", ...style }}>
          <Dropdown
            menu={menu}
            onOpenChange={handleVisibleChange}
            open={visibleMenuSettings}
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
              sx={{
                fontSize: 14,
                color: "#172B4D",
                fontWeight: 600,
              }}
            >
              {settingName}
            </TextMaxLine>
          </View>
          <View ml={8}>
            <TextMaxLine
              line={1}
              sx={{
                fontSize: 10,
                color: "#172B4D",
                background: "#F2F4F5",
                border: "1px solid #172B4D",
                borderRadius: "100px",
                textAlign: "center",
                padding: "2px 8px",
              }}
            >
              {source?.totalRecord || 0}
            </TextMaxLine>
          </View>
        </View>
      </View>
      <div className={classes.setting}>
        <ReactDragListView.DragColumn {...dragProps}>
          {filter}
          <Table
            locale={locale}
            rowSelection={rowSelection}
            columns={columnsTable}
            dataSource={source?.items}
            rowKey={rowKey}
            scroll={scroll}
            size="large"
            loading={loading}
            className={classes.table}
            pagination={{
              
              defaultPageSize: 10,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: { items_per_page: "bản ghi trên trang" },
              showTotal: (total, range) =>
                `${range[1]} / ${total} kết quả phù hợp`,
            }}
          />
        </ReactDragListView.DragColumn>
      </div>
      <BottomNavPipeline
        open={selectedRowKeys?.length > 0}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        selecedLength={selectedRowKeys?.length || 0}
      />
    </View>
  );
};

export default DynamicColumnsTable;
