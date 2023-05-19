import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { View } from "@/components/FlexStyled";
import { TBL_FILTER_TYPE } from "@/config";
import { Status } from "@/utils/enum";
import { useRouter } from "next/router";
import { useMemo, useState } from "react";
import { LIST_STATUS } from "@/utils/formatString";
import { useTheme } from "@mui/material/styles";
import NotificationBottomNav from "@/sections/notification/NotificationBottom";
import {
  useGetAllNotifcationsQuery,
  useGetListNotificationColumnsQuery,
  useUpdateListNotificationColumnsMutation
} from "@/sections/notification/NotificationManagementSlice";
import { convertNotificationType, LIST_TYPE_NOTIFICATION } from "@/sections/notification/helper";

export const NotificationContent = () => {
  const router = useRouter();
  
  const {query = {PageIndex: 1, PageSize: 10}, isReady} = router;
  const {data: Data = {}, isLoading} = useGetAllNotifcationsQuery(query, {skip: !isReady});
  const theme = useTheme();
  const [, setOpenEdit] = useState(false);
  
  // const {canAccess} = useRole();
  // const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB_POS), []);
  
  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "STT",
        key: "index",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
        fixed: "left",
      },
      {
        dataIndex: "title",
        title: "Hành động dẫn đến thông báo",
        width: "240px",
        fixed: "left",
        render: (name) => <span style={{fontWeight: 500}}>{name}</span>
      },
      {
        dataIndex: "notificationType",
        title: "Kiểu thông báo",
        width: "160px",
        align: "center",
        render: (name) => <span style={{fontWeight: 500}}>{convertNotificationType(name)}</span>,
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'NotificationType',
          options: LIST_TYPE_NOTIFICATION.map(item => ({value: item.id, label: item.name})),
          placeholder: 'Tất cả'
        },
      },
      {
        dataIndex: "isActive",
        title: "Trạng thái",
        width: "180px",
        render: (item) => (
          <span style={{color: item ? "#388E3C" : theme.palette.common.neutral700}}>
            {Status(item)}
          </span>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'isActive',
          options: LIST_STATUS.map(item => ({value: item.id, label: item.name})),
          placeholder: 'Tất cả'
        },
      },
      {
        dataIndex: "content",
        title: "Tiêu đề thông báo",
        width: "180px",
        render: (name) => <span style={{fontWeight: 500}}>{name}</span>
      },
    ];
  }, [query.PageIndex, query.PageSize]);
  
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName(
      "css-28xiqa"
    )[0].style.paddingBottom = null;
  };
  
  return (
    <View>
      <Content sx={{
        padding: "0 !important",
        "& .MuiBox-root": {
          padding: 0,
        }
      }}
      >
        <DynamicColumnsTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          columns={columns}
          source={Data}
          loading={isLoading}
          settingName={"DANH SÁCH THÔNG BÁO TỰ ĐỘNG"}
          nodata="Hiện chưa có thông báo tự động nào"
          isSetting={true}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListNotificationColumnsQuery}
          useUpdateColumnsFunc={useUpdateListNotificationColumnsMutation}
          createText={false}
          onClickCreate={() => {
            setOpenEdit(true);
          }}
        />
        
        <NotificationBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />
      </Content>
    </View>
  );
};
