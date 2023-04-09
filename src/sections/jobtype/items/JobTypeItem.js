import JobTypeBottomNav from "./JobTypeBottomNav";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import { PERMISSIONS, TBL_FILTER_TYPE } from "@/config";
import {
  useGetListColumnsQuery,
  useGetAllJobTypeQuery,
  useUpdateListColumnsMutation,
} from "@/sections/jobtype";
import { Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import { LIST_STATUS } from "@/utils/formatString";
import { API_GET_APPLICANT_USERS_FILTER } from "@/routes/api";
import { JobTypeFormModal } from "@/sections/jobtype";
import useRole from "@/hooks/useRole";

export const JobTypeItem = () => {
  const router = useRouter();

  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data = {}, isLoading } = useGetAllJobTypeQuery(query, { skip: !isReady });

  const [openEdit, setOpenEdit] = useState(false);

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB_POS), []);

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
        dataIndex: "name",
        title: "Vị trí công việc",
        width: "240px",
        fixed: "left",
        render: (name) => <span style={{ fontWeight: 500 }}>{name}</span>
      },
      {
        dataIndex: "numberOfRecruitmentApplied",
        title: "Số tin áp dụng",
        width: "160px",
        align: "center",
      },
      {
        dataIndex: "isActivated",
        title: "Trạng thái",
        width: "180px",
        render: (item) => (
          <span style={{ color: item ? "#388E3C" : "#455570" }}>
            {Status(item)}
          </span>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT,
          name: 'isActive',
          options: LIST_STATUS.map(item => ({ value: item.id, label: item.name })),
        },
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo",
        width: "180px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ['createdTimeFrom', 'createdTimeTo'],
          placeholder: 'Chọn ngày',
        },
      },
      {
        dataIndex: "creatorEmail",
        title: "Người tạo",
        width: "300px",
        render: (item) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <AvatarDS
              sx={{
                height: "20px",
                width: "20px",
                borderRadius: "100px",
                fontSize: "12px",
              }}
              name={item}
            ></AvatarDS>
            <span fontSize="14px" fontWeight="600" color="#172B4D">
              {item}
            </span>
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "creatorIds",
          placeholder: "Chọn 1 hoặc nhiều người",         
          remoteUrl: API_GET_APPLICANT_USERS_FILTER,
        },
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
          settingName={"DANH SÁCH VỊ TRÍ CÔNG VIỆC"}
          nodata="Hiện chưa có vị trí công việc nào"
          isSetting={true}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListColumnsQuery}
          useUpdateColumnsFunc={useUpdateListColumnsMutation}
          createText={canEdit && "Thêm vị trí công việc"}
          onClickCreate={() => {
            setOpenEdit(true);
          }}
        />

        <JobTypeBottomNav
          open={selectedRowKeys?.length > 0}
          onClose={toggleDrawer(false)}
          selectedList={selectedRowKeys || []}
          onOpenForm={toggleDrawer(true)}
          setselectedList={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
        />
      </Content>

      <JobTypeFormModal
        show={openEdit}
        onClose={() => setOpenEdit(false)}
        setShow={setOpenEdit}
      />
    </View>
  );
};
