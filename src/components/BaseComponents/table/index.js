import { useState, useMemo } from "react";
import { Table } from "antd";
import { useTheme } from "@mui/material";
import { isEmpty as _isEmpty } from "lodash";
import { RiSettings3Fill } from 'react-icons/ri';
import { useRouter } from "next/router";

import { View } from "@/components/FlexStyled";
import TextMaxLine from "@/components/TextMaxLine";
import { ButtonIcon } from "@/utils/cssStyles";
import ColumnsModal from "./VisibleColumnsModal";
import TableHeader from "./TableHeader";
import Content from "../Content";

import { TableStyle } from "./styles";

const DynamicColumnsTable = (props) => {
  const {
    columns = [],
    source,
    loading,
    settingName,
    nodata,
    handleChangePagination,
    selectedRowKeys,
    setSelectedRowKeys,
    itemSelected,
    setItemSelected,
    useGetColumnsFunc,
    useUpdateColumnsFunc,
    tableProps = {},
  } = props;

  const router = useRouter();
  const { PageIndex = 1, PageSize = 10 } = router.query;
  const { palette } = useTheme();
  const { data: columnsVisible = {} } = useGetColumnsFunc ? useGetColumnsFunc() : { data: {} };

  const columnsDisplay = useMemo(() => {
    return columns.filter(col => {
      return !!columnsVisible[col.dataIndex];
    }).map(col => {
      let renderFunc = col.render;
      if (renderFunc) {
        col.render = (text, record, index) => {
          return renderFunc(text, record, index, parseInt(PageIndex), parseInt(PageSize));
        };
      }
      return col;
    });
  }, [columnsVisible, columns]);

  const [visibleMenuSettings, setVisibleMenuSettings] = useState(false);

  const showSetting = () => {
    setVisibleMenuSettings(true);
  };

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
    setItemSelected(
      source?.items.filter((item) => newSelectedRowKeys.includes(item.id))
    );
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const onTableRowClick = (record) => {
    const selectedKey = record.id;
    const selectedKeys = [...selectedRowKeys];
    const selectedList = itemSelected ? [...itemSelected] : [];

    const index = selectedKeys.indexOf(selectedKey);
    if (index === -1) {
      selectedKeys.push(selectedKey);
      selectedList.push(record);
    } else {
      selectedKeys.splice(index, 1);
      selectedList.splice(index, 1);
    }

    setSelectedRowKeys(selectedKeys);
    itemSelected ? setItemSelected(selectedList) : "";
  };

  const onRow = (record, e) => {
    return {
      onClick: () => onTableRowClick(record, e),
    };
  };

  const onSubmitFilter = (values = {}) => {
    router.push({
      query: { ...router.query, ...values },
    }, undefined, { shallow: false });
  }

  const handleOnChange = ({ current, pageSize }) => {
    onSubmitFilter({
      PageIndex: current,
      PageSize: pageSize,
    });
  }

  return (
    <View>
      <TableHeader
        onSubmitFilter={onSubmitFilter}
      />

      <Content>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
          }}
          mb={16}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            {!_isEmpty(columnsVisible) && (
              <ButtonIcon
                onClick={showSetting}
                sx={{ backgroundColor: "unset" }}
                icon={<RiSettings3Fill size={16} color={palette.text.primary} />}
              />
            )}

            <View>
              <TextMaxLine
                line={1}
                sx={{
                  fontSize: 14,
                  color: palette.text.primary,
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
                  color: palette.text.primary,
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

        <TableStyle>
          <Table
            locale={locale}
            rowSelection={rowSelection}
            onRow={onRow}
            rowKey={(record) => record.id}
            rowClassName={(record) =>
              selectedRowKeys?.includes(record.id) ? "ant-table-row-selected" : ""
            }
            columns={columnsDisplay}
            dataSource={source?.items}
            scroll={{ x: "max-content" }}
            loading={loading}
            pagination={{
              total: `${source?.totalRecord}`,
              defaultPageSize: parseInt(PageSize),
              current: parseInt(PageIndex),
              showSizeChanger: true,
              pageSizeOptions: ["10", "20", "30"],
              locale: { items_per_page: "bản ghi trên trang" },
              showTotal: (total, range) =>
                `${range[1]} / ${source?.totalRecord} kết quả phù hợp`,
            }}
            onChange={(paginate) => {
              const { current, pageSize } = paginate;
              handleOnChange(paginate);
              if (handleChangePagination) {
                handleChangePagination(current, pageSize);
              }
            }}
            {...tableProps}
          />
        </TableStyle>
      </Content>

      <ColumnsModal
        open={visibleMenuSettings}
        onClose={() => setVisibleMenuSettings(false)}
        columns={columns}
        columnsVisible={columnsVisible}
        useUpdateColumnsFunc={useUpdateColumnsFunc}
      />
    </View>
  );
};

export default DynamicColumnsTable;
