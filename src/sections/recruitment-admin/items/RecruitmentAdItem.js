import DynamicColumnsTable from "@/components/BaseComponents/table";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { fDate } from "@/utils/formatTime";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { useGetRecruitmentAdQuery } from "../RecruitmentAdSlice";
import RecruitmentAdBottomNav from "./RecruitmentAdBottomNav";

export const RecruitmentAdItem = () => {
  const router = useRouter();

  // api get list
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data = {}, isLoading } = useGetRecruitmentAdQuery(query, { skip: !isReady });

  const columns = useMemo(() => {
    return [
      {
        title: "STT",
        key: "id",
        align: "center",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
        name: "organizationIds",
        type: "tree",
        multiple: true,
        placeholder: "Chọn một hoặc nhiều đơn vị",
        label: "Đơn vị",
      },
      {
        dataIndex: "name",
        title: "Tin tuyển dụng",
        width: "300px",
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo tin",
        width: "180px",
        type: "date",
        label: "Ngày tạo tin",
        name: "createdTime",
        render: (date) =>  date ? fDate(date): '',
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
        dataIndex: "startDate",
        title: "Ngày bắt đầu",
        width: "180px",
        type: "date",
        label: "Ngày bắt đầu",
        name: "startDate",
        render: (date) => date ? fDate(date): '',
        items: [
          {
            name: "startDateFrom",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Từ</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
          {
            name: "startDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
        ],
      },
      {
        dataIndex: "endDate",
        title: "Ngày hết hạn",
        width: "180px",
        type: "date",
        label: "Ngày hết hạn",
        name: "endDate",
        render: (date) =>  date ? fDate(date): '',
        items: [
          {
            name: "endDateFrom",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Từ</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
          {
            name: "endDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today" />,
          },
        ],
      },
    ];
  }, [query.PageSize, query.PageIndex]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [columnsTable, setColumnsTable] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName('css-6pqpl8')[0].style.paddingBottom = null;
  };

  return (
    <View>
      {/* <RecruitmentAdHeader
        data={Data.items}
        methods={methods}
        isOpen={isOpen}
        onSubmit={onSubmitSearch}
        handleSubmit={handleSubmit}
        onOpenFilterForm={handleOpenFilterForm}
        onCloseFilterForm={handleCloseFilterForm}
      /> */}

      <View>
        <DynamicColumnsTable
          columns={columns}
          source={Data}
          loading={isLoading}
          settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
          setSelectedRowKeys={setSelectedRowKeys}
          nodata="Hiện chưa có tin tuyển dụng nào"
          selectedRowKeys={selectedRowKeys}
          columnsTable={columnsTable}
          setColumnsTable={setColumnsTable}
          searchInside={false}
        />
      </View>

      <RecruitmentAdBottomNav
        open={selectedRowKeys?.length > 0}
        onClose={toggleDrawer(false)}
        selectedList={selectedRowKeys || []}
        onOpenForm={toggleDrawer(true)}
        setselectedList={setSelectedRowKeys}
      />
    </View>
  );
};
