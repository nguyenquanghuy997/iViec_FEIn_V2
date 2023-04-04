import { FormProvider } from "../hook-form";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import { ButtonCancel, ButtonIcon, DialogModel } from "@/utils/cssStyles";
import { DialogActions, Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { Checkbox, Menu, Table } from "antd";
import React, { useState, useEffect } from "react";
import ReactDragListView from "react-drag-listview";

const DynamicColumnsTable = (props) => {
  const {
    columns = [],
    source,
    loading,
    ColumnData,
    menuItemText,
    UpdateListColumn,
    settingName,
    filter,
    scroll,
    // style,
    nodata,
    page,
    paginationSize,
    handleChangePagination,
    selectedRowKeys,
    setSelectedRowKeys,
    itemSelected,
    setItemSelected
  } = props;

  const [columnsTable, setColumnsTable] = useState([]);

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

  const [checkedColumns, setCheckedColumns] = useState([]);
  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);

  useEffect(() => {
    setColumnsTable(
      columns.map((col) => {
        const renderFunc = col.render;
        if (renderFunc) {
          col.render = (text, record, index) => {
            return renderFunc(text, record, index, page, paginationSize);
          };
        }
        return col;
      })
    );
  }, [columns]);

  const menu = (
    <>
      <DialogModel
        open={visibleMenuSettings}
        onClose={() => setVisibleMenuSettings(false)}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <FormProvider methods={{}}>
          <View
            style={{
              display: "flex",
              flexDirection: "unset",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "22px 24px",
            }}
          >
            <div style={{ color: "#172B4D", fontWeight: 600 }}>Quản lý cột</div>
            <div>
              <ButtonIcon
                onClick={() => setVisibleMenuSettings(false)}
                icon={
                  <Iconify
                    width={20}
                    height={20}
                    icon="ic:baseline-close"
                    color="#455570"
                  />
                }
              ></ButtonIcon>
            </div>
          </View>
          <Divider />
          <Menu style={{ overflowY: "auto", maxHeight: "600px" }}>
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
          <DialogActions
            sx={{
              borderTop: "1px solid #E7E9ED",
              padding: "16px 24px !important",
            }}
          >
            <ButtonCancel
              tittle="Hủy"
              onClick={() => setVisibleMenuSettings(false)}
            />

            <ButtonDS
              tittle="Áp dụng"
              onClick={() => {
                UpdateListColumn();
                setVisibleMenuSettings(false);
              }}
            />
          </DialogActions>
        </FormProvider>
      </DialogModel>
    </>
  );
  const showSetting = () => {
    setVisibleMenuSettings(true);
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

    var filtered = columnsTable;
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
      "& .ant-table-content": {
        minHeight: "500px",
        borderRadius: "8px",
      },
      "& .ant-table-thead >tr>th": {
        background: "#FDFDFD",
        height: "72px",
        padding: "13px 8px",
        borderBottom: "2px solid #CCD4DC",
      },
      "& .ant-table-tbody >tr >td": {
        padding: "13px 8px",
        color: '#172B4D',
        fontWeight: 400
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
      "& .ant-pagination .ant-pagination-item a:hover, .ant-pagination .ant-pagination-next:hover .ant-pagination-item-link":
        {
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

  let locale = {
    emptyText: (
      <div style={{ margin: "40px 0", minHeight: "250px" }}>
        <img
          src={`/assets/icons/candidate/notfound.png`}
          style={{ margin: "0 auto" }}
        />
        <p>{nodata}</p>
      </div>
    ),
  };

  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
    itemSelected ? setItemSelected(source?.items.filter(item => newSelectedRowKeys.includes(item.id))):""
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const onTableRowClick = (record) => {
    const selectedKey = record.id;
    const selectedKeys = [...selectedRowKeys];
    const selectedList = itemSelected ? [...itemSelected]:[];

    const index = selectedKeys.indexOf(selectedKey);
    if (index === -1) {
      selectedKeys.push(selectedKey);
      selectedList.push(record);
    } else {
      selectedKeys.splice(index, 1);
      selectedList.splice(index, 1);
    }
    if (filter) {
      if (selectedKeys?.length > 0) {
        event.currentTarget.getElementsByClassName(
          "css-28xiqa"
        )[0].style.paddingBottom = "89px";
      } else {
        event.currentTarget.getElementsByClassName(
          "css-28xiqa"
        )[0].style.paddingBottom = null;
      }
    } else {
      if (selectedKeys?.length > 0) {
        event.currentTarget.getElementsByClassName(
          "css-6pqpl8"
        )[0].style.paddingBottom = "89px";
      } else {
        event.currentTarget.getElementsByClassName(
          "css-6pqpl8"
        )[0].style.paddingBottom = null;
      }
    }
    setSelectedRowKeys(selectedKeys);
    itemSelected ? setItemSelected(selectedList) : ""
    
  };

  const onRow = (record) => {
    return {
      onClick: () => onTableRowClick(record),
    };
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
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <ButtonIcon
            onClick={showSetting}
            sx={{ backgroundColor: "unset" }}
            icon={
              <Iconify
                icon={"material-symbols:settings"}
                width={20}
                height={20}
                color="#5C6A82"
                background="#5C6A82"
                mr={1}
              />
            }
          />
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
            onRow={onRow}
            rowKey={(record) => record.id}
            rowClassName={(record) =>
              selectedRowKeys?.includes(record.id)
                ? "ant-table-row-selected"
                : ""
            }
            columns={[...columnsTable]}
            dataSource={source?.items}
            scroll={scroll}
            size="large"
            loading={loading}
            className={classes.table}
            pagination={{
              onChange: handleChangePagination,
              total: `${source?.totalRecord}`,
              defaultPageSize: paginationSize,
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: { items_per_page: "bản ghi trên trang" },
              showTotal: (total, range) =>
                `${range[1]} / ${source?.totalRecord} kết quả phù hợp`,
            }}
          />
        </ReactDragListView.DragColumn>
      </div>
      {visibleMenuSettings && <>{menu}</>}
    </View>
  );
};

export default DynamicColumnsTable;
