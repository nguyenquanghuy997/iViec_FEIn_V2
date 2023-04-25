import {
  useGetAllPipelineQuery,
  useGetListPipelineColumnsQuery,
  useUpdateListPipelineColumnsMutation,
} from "../PipelineFormSlice";
import { PipelineFormModal } from "../modals";
import PipelineBottomNav from "./PipelineBottomNav";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { TBL_FILTER_TYPE, PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { API_GET_ORGANIZATION_USERS } from "@/routes/api";
import { PipelineStateType, Status } from "@/utils/enum";
import { LIST_STATUS, LIST_STEP_RECRUITMENT } from "@/utils/formatString";
import { fDate } from "@/utils/formatTime";
import { Tag } from "antd";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";

export const PipelineItem = () => {
  const router = useRouter();

  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data = {}, isLoading } = useGetAllPipelineQuery(query, {
    skip: !isReady,
  });

  const [showForm, setShowForm] = useState(false);

  const { canAccess } = useRole();
  // const canView = useMemo(() => canAccess(PERMISSIONS.VIEW_RECRUIT_PROCESS), []);
  const canEdit = useMemo(
    () => canAccess(PERMISSIONS.CRUD_RECRUIT_PROCESS),
    []
  );

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "STT",
        key: "index",
        align: "center",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
        fixed: "left",
      },
      {
        dataIndex: "name",
        title: "Quy trình tuyển dụng",
        width: "240px",
        fixed: "left",
        render: (item) => (
          <span style={{ fontWeight: 500 }}>
            {item}
          </span>
        ),
      },
      {
        dataIndex: "organizationPipelineStates",
        title: "Bước tuyển dụng",
        width: "440px",
        render: (_, { organizationPipelineStates }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {organizationPipelineStates?.map((p, index) => {
              if (index < 6 && p?.pipelineStateType != 4) {
                if (index < 5) {
                  return (
                    <span
                      key={index}
                      style={{
                        color: "#172B4D",
                        fontWeight: 400,
                        fontSize: 13,
                        display: "flex",
                        alignItems: "center",
                        flexWrap: "wrap",
                      }}
                    >
                      {PipelineStateType(p?.pipelineStateType)}

                      {index < organizationPipelineStates.length - 2 &&
                        index < 4 && (
                          <Iconify
                            width={16}
                            height={16}
                            icon="ic:round-keyboard-arrow-right"
                          />
                        )}
                    </span>
                  );
                } else {
                  var indexplus = organizationPipelineStates.length - 5;
                  return (
                    <Tag
                      key={p}
                      style={{
                        background: "#EFF3F7",
                        borderRadius: "100px",
                        color: "#172B4D",
                        border: "none",
                        marginLeft: "8px",
                        fontWeight: 500,
                      }}
                    >
                      +{indexplus}
                    </Tag>
                  );
                }
              }
            })}
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          placeholder: "Chọn một hoặc nhiều bước",
          options: LIST_STEP_RECRUITMENT.map((item) => ({
            value: item.value,
            label: item.name,
          })),
        },
      },
      {
        dataIndex: "recruitmentAppliedCount",
        title: "Số tin áp dụng",
        width: "160px",
        align: "left",
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
          placeholder: "Tất cả",
          options: LIST_STATUS.map((item) => ({
            value: item.value,
            label: item.name,
          })),
        },
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo",
        width: "180px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ["createdTimeFrom", "createdTimeTo"],
          placeholder: "Chọn ngày",
        },
      },
      {
        dataIndex: "creatorName",
        title: "Người tạo",
        width: "300px",
        render: (item, record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            <AvatarDS
              sx={{
                height: "20px",
                width: "20px",
                borderRadius: "100px",
                fontSize: "12px",
              }}
              name={record?.isDefault == true ? "iVIEC" : item}
            ></AvatarDS>
            <span fontSize="14px" fontWeight="600" color="#172B4D">
              {record?.isDefault == true ? "iVIEC" : item}
            </span>
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "creatorIds",
          placeholder: "Chọn 1 hoặc nhiều người",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
    ];
  }, [query.PageIndex, query.PageSize]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setItemSelected([]);
    event.currentTarget.getElementsByClassName(
      "css-28xiqa"
    )[0].style.paddingBottom = null;
  };
  return (
    <View>
      <Content
        sx={{
          padding: "0 !important",
          "& .MuiBox-root": {
            padding: 0,
          },
        }}
      >
        <DynamicColumnsTable
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          columns={columns}
          source={Data}
          loading={isLoading}
          settingName={"DANH SÁCH QUY TRÌNH TUYỂN DỤNG"}
          isSetting={true}
          nodata="Hiện chưa có quy trình tuyển dụng nào"
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListPipelineColumnsQuery}
          useUpdateColumnsFunc={useUpdateListPipelineColumnsMutation}
          createText={canEdit && "Thêm quy trình tuyển dụng"}
          onClickCreate={() => {
            setShowForm(true);
          }}
        />

        <PipelineBottomNav
          open={itemSelected?.length > 0}
          onClose={toggleDrawer(false)}
          onOpenForm={toggleDrawer(true)}
          itemSelected={itemSelected || []}
          setItemSelected={setItemSelected}
          setselectedList={setSelectedRowKeys}
        />
      </Content>

      <PipelineFormModal show={showForm} onClose={() => setShowForm(false)} />
    </View>
  );
};
