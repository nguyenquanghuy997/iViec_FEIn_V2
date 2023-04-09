import {
  useGetAllPipelineQuery,
  // useGetListColumnsQuery,
  // useUpdateListColumnApplicantsMutation,
} from "../PipelineFormSlice";
import PipelineBottomNav from "./PipelineBottomNav";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { PipelineFormModal } from "../modals";
import { PipelineStateType, Status } from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { Tag } from "antd";
import { useRouter } from "next/router";
import { useState, useMemo } from "react";
import useAuth from "@/hooks/useAuth";
import { API_GET_USER_FROM_ORGANIZATION } from "@/routes/api";
import { PERMISSIONS, TBL_FILTER_TYPE } from "@/config";
import { LIST_STATUS, LIST_STEP_RECRUITMENT } from "@/utils/formatString";
import useRole from "@/hooks/useRole";

export const PipelineItem = () => {
  const { user } = useAuth();
  const router = useRouter();

  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data = {}, isLoading } = useGetAllPipelineQuery(query, { skip: !isReady });

  const [showForm, setShowForm] = useState(false);

  const { canAccess } = useRole();
  // const canView = useMemo(() => canAccess(PERMISSIONS.VIEW_RECRUIT_PROCESS), []);
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_RECRUIT_PROCESS), []);

  const columns = useMemo(() => {
    return [
      {
        dataIndex: 'id',
        title: "STT",
        key: "index",
        align: 'center',
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
        render: (item, record) => (
          <span style={{ fontWeight: 500 }}>{record.isDefault == true ? 'Quy trình mặc định iVIEC' : item}</span>
        ),
      },
      {
        dataIndex: "organizationPipelineStates",
        title: "Bước tuyển dụng",
        width: "440px",
        render: (_, { organizationPipelineStates }) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {organizationPipelineStates?.map((p, index) => {
              if (index < 6) {
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

                      {index < organizationPipelineStates.length - 1 &&
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
                        fontWeight: 500
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
          options: LIST_STEP_RECRUITMENT.map(item => ({ value: item.value, label: item.name })),
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
          placeholder: 'Tất cả',
          options: LIST_STATUS.map(item => ({ value: item.value, label: item.name }),)
        }
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
        dataIndex: "creatorName",
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
          remoteUrl: API_GET_USER_FROM_ORGANIZATION + '?OrganizationId=' + user.organizations?.id,
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
      <Content sx={{ padding: "0 !important" }}>
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
          // useGetColumnsFunc={useGetListColumnsQuery}
          // useUpdateColumnsFunc={useUpdateListColumnApplicantsMutation}
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

      <PipelineFormModal
        show={showForm}
        onClose={() => setShowForm(false)}
      />
    </View>
  );
};
