import {
  useCloseRecruitmentMutation,
  useDeleteRecruitmentMutation,
  useGetListRecruitmentColumnsQuery,
  useGetRecruitmentsQuery,
  useUpdateListRecruitmentColumnsMutation,
} from "../RecruitmentSlice";
import OrganizationSettingModal from "../modals/OrganizationSettingModal";
import { EditIcon, CopyIcon, DeleteIcon, ForwardLightIcon, ExpandPreviewIcon, SquareDarkIcon } from "@/assets/icons-datatable";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import TextMaxLine from "@/components/TextMaxLine";
import { PERMISSIONS, RECRUITMENT_STATUS, TBL_FILTER_TYPE } from "@/config";
import useRole from "@/hooks/useRole";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import {
  API_GET_LIST_CANDIDATELEVEL,
  API_GET_LIST_LANGUAGE,
  API_GET_ORGANIZATION_USERS,
  API_GET_ORGANIZATION_WITH_CHILD,
  API_GET_PAGING_JOBTYPE,
  API_GET_PROVINCE,
} from "@/routes/api";
import { PATH_DASHBOARD } from "@/routes/paths";
// import { ExcelIcon } from "@/sections/offer-form/component/editor/Icon";
import {
  AlertIcon,
  UnCheckedSwitchIcon,
} from "@/sections/organization/component/Icon";
import { handleExportExcel } from "@/sections/recruitment/helper/excel";
import RecruitmentPreview from "@/sections/recruitment/modals/preview/RecruitmentPreview";
import { useGetOrganizationQuery } from "@/sections/report/reportSlice";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import {
  Currency,
  DivProcessStatus,
  RecruitmentWorkingForm,
  YearOfExperience,
} from "@/utils/enum";
import { fCurrency } from "@/utils/formatNumber";
import {
  LIST_EXPERIENCE_NUMBER,
  LIST_RECRUITMENT_PROCESS_STATUS,
  LIST_RECRUITMENT_WORKING_FORM,
} from "@/utils/formatString";
import { fDate } from "@/utils/formatTime";
import { Tooltip, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Tag } from "antd";
import { get } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";

export const RecruitmentItem = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();
  // modal redux
  const dispatch = useDispatch();
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const { openClose, openDelete, openPreview } = toggleModalState;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);

  const handleOpenModalState = (data) =>
    dispatch(modalSlice.actions.openStateModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  // delete & close recruitment
  const [closeRecruitments] = useCloseRecruitmentMutation();
  const [deleteRecruitments] = useDeleteRecruitmentMutation();

  // permisions
  const { canAccess } = useRole();
  const canView = useMemo(() => canAccess(PERMISSIONS.VIEW_JOB), []);
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB), []);

  // api get list
  const listArrayOtherIdsFilter = [
    "processStatuses",
    "workingForms",
    "workExperiences",
    "sexes",
  ];
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  let reqData = {};
  for (let f in query) {
    let val = query[f];
    if (
      (f.includes("Ids") || listArrayOtherIdsFilter.includes(f)) &&
      !Array.isArray(val)
    ) {
      val = [val];
    }
    reqData[f] = val;
  }
  const { data: Data = {}, isLoading } = useGetRecruitmentsQuery(
    { ...reqData, searchKey: reqData.SearchKey },
    { skip: !isReady }
  );

  const columns = useMemo(() => {
    return [
      {
        dataIndex: "id",
        title: "STT",
        key: "id",
        align: "center",
        render: (item, record, index, page, paginationSize) => (
          <>{(page - 1) * paginationSize + index + 1}</>
        ),
        width: "60px",
        fixed: "left",
      },
      {
        dataIndex: "name",
        title: "Tin tuyển dụng",
        fixed: "left",
        width: "300px",
        render: (item, record) => (
          <TextMaxLine
            sx={{
              width: 360,
              fontWeight: 500,
              fontSize: 13,
              ...(canView && { cursor: "pointer" }),
            }}
            onClick={(e) => {
              if (
                !canView ||
                record.processStatus === RECRUITMENT_STATUS.DRAFT
                // record.processStatus ==
                //   RECRUITMENT_STATUS.WAITING_ORGANIZATION_APPROVAL ||
                // record.processStatus ==
                //   RECRUITMENT_STATUS.ORGANIZATION_REJECT ||
                // record.processStatus ==
                //   RECRUITMENT_STATUS.WAITING_IVIEC_APPROVAL ||
                // record.processStatus == RECRUITMENT_STATUS.IVIEC_REJECT
              ) {
                return;
              }
              router.push(PATH_DASHBOARD.recruitment.view(record.id)),
                e.stopPropagation();
            }}
          >
            {item}
          </TextMaxLine>
        ),
      },
      {
        dataIndex: "jobPosition",
        title: "Vị trí công việc",
        width: "214px",
        render: (item) => 
        <TextMaxLine 
          sx={{
            width: 360,
            fontWeight: 500,
            fontSize: 13,
          }}
        >
          {item?.name}
        </TextMaxLine>,
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          placeholder: "Chọn 1 hoặc nhiều vị trí công việc",
          name: "jobPositionIds",
          remoteUrl: API_GET_PAGING_JOBTYPE,
        },
      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_TREE,
          name: "organizationIds",
          placeholder: "Chọn một hoặc nhiều đơn vị",
          remoteUrl: API_GET_ORGANIZATION_WITH_CHILD,
        },
      },
      {
        dataIndex: "processStatus",
        title: "Trạng thái",
        width: "180px",
        render: (text, record) => (
          <div style={{ display: "flex", alignItems: "center" }}>
            {DivProcessStatus(record?.processStatus)}
            {record?.rejectReason && (
              <Tooltip
                title={record?.rejectReason}
                placement="top"
                followCursor
              >
                <div>
                  <Iconify
                    icon={"mdi:question-mark-circle-outline"}
                    width={20}
                    height={20}
                    color={theme.palette.common.red600}
                    ml={1}
                    style={{ marginTop: "4px" }}
                  />
                </div>
              </Tooltip>
            )}
          </div>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "processStatuses",
          placeholder: "Tất cả",
          options: LIST_RECRUITMENT_PROCESS_STATUS.map((item) => ({
            value: item.value,
            label: item.label,
          })),
        },
      },
      {
        dataIndex: "startDate",
        title: "Ngày bắt đầu",
        width: "180px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ["queryStartFrom", "queryStartTo"],
          placeholder: "Chọn ngày",
        },
      },
      {
        dataIndex: "endDate",
        title: "Ngày hết hạn",
        width: "180px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ["queryEndFrom", "queryEndTo"],
          placeholder: "Chọn ngày",
        },
      },
      {
        dataIndex: "createdTime",
        title: "Ngày tạo tin",
        width: "180px",
        render: (date) => fDate(date),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_DATE,
          name: ["createdFrom", "createdTo"],
          placeholder: "Chọn ngày",
        },
      },
      {
        dataIndex: "numOfApplied",
        title: "SL ứng tuyển",
        width: "160px",
        name: "numOfApplied",
        label: "Số lượng ứng tuyển",
        type: "number",
        align: "center",
      },
      {
        dataIndex: "numberPosition",
        title: "SL cần tuyển",
        width: "160px",
        align: "center",
        filters: {
          type: TBL_FILTER_TYPE.RANGE_NUMBER,
          name: ["numOfPositionFrom", "numOfPositionTo"],
          placeholder: "Nhập số",
        },
      },
      {
        dataIndex: "numOfPass",
        title: "SL đạt",
        width: "160px",
        align: "center",
      },
      {
        dataIndex: "numOfAcceptOffer",
        title: "SL nhận việc",
        width: "160px",
        align: "center",
      },
      {
        dataIndex: "ownerEmail",
        title: "Cán bộ phụ trách",
        width: "220px",
        render: (text, record) => (
          <>
            {record?.ownerEmail && (
              <div style={{ display: "flex", alignItems: "center" }}>
                <AvatarDS
                  sx={{
                    height: "20px",
                    width: "20px",
                    borderRadius: "100px",
                    fontSize: "10px",
                  }}
                  name={record?.ownerName}
                ></AvatarDS>
                <span
                  fontSize="14px"
                  fontWeight="600"
                  color={theme.palette.common.neutral800}
                >
                  {record?.ownerEmail}
                </span>
              </div>
            )}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "ownerIds",
          placeholder: "Chọn 1 hoặc nhiều cán bộ",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "coOwners",
        title: "Đồng phụ trách",
        width: "340px",
        render: (_, { coOwners }) => (
          <>
            {coOwners?.map((p, index) => {
              if (index < 3) {
                return (
                  <Tag
                    key={index}
                    style={{
                      background: "#EFF3F7",
                      borderRadius: "4px",
                      color: theme.palette.common.borderObject,
                      border: "none",
                    }}
                  >
                    {p?.email}
                  </Tag>
                );
              } else {
                var indexplus = coOwners.length - 3;
                return (
                  <Tag
                    key={index}
                    style={{
                      background: "#EFF3F7",
                      borderRadius: "4px",
                      color: theme.palette.common.borderObject,
                      border: "none",
                    }}
                  >
                    +{indexplus}
                  </Tag>
                );
              }
            })}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "coOwnerIds",
          placeholder: "Chọn 1 hoặc nhiều cán bộ",
          remoteUrl: API_GET_ORGANIZATION_USERS,
          showAvatar: true,
        },
      },
      {
        dataIndex: "recruitmentAddresses",
        title: "Khu vực đăng tin",
        width: "300px",
        render: (_, { recruitmentAddresses }) => (
          <>
            {recruitmentAddresses.map((item, index) => {
              if (index < recruitmentAddresses?.length - 1) {
                return <span key={index}>{item.provinceName}, </span>;
              } else {
                return <span key={index}>{item.provinceName}</span>;
              }
              // let color = item.length > 5 ? 'geekblue' : 'green';
            })}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "provinceIds",
          placeholder: "Chọn 1 hoặc nhiều khu vực",
          remoteUrl: API_GET_PROVINCE,
        },
      },
      {
        dataIndex: "recruitmentWorkingForms",
        title: "Hình thức làm việc",
        width: "216px",
        render: (_, { recruitmentWorkingForms }) => (
          <>
            {recruitmentWorkingForms.map((item, index) => {
              if (index < recruitmentWorkingForms?.length - 1) {
                return (
                  <span key={index}>
                    {RecruitmentWorkingForm(item.workingForm)},{" "}
                  </span>
                );
              } else {
                return (
                  <span key={index}>
                    {RecruitmentWorkingForm(item.workingForm)}
                  </span>
                );
              }
            })}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "workingForms",
          placeholder: "Chọn 1 hoặc nhiều hình thức",
          options: LIST_RECRUITMENT_WORKING_FORM.map((item) => ({
            value: item.value,
            label: item.label,
          })),
        },
      },
      {
        dataIndex: "salary",
        title: "Mức lương",
        width: "216px",
        render: (text, record) => (
          <>
            {record?.minSalary !== 0
              ? `${fCurrency(record?.minSalary)} - ${fCurrency(
                  record?.maxSalary
                )} ${Currency(record?.currencyUnit)}`
              : record.salaryDisplayType === 0
              ? "Không lương"
              : "Thỏa thuận"}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.RANGE_MONEY,
          name: ["minSalary", "maxSalary"],
          placeholder: "Nhập số",
        },
      },
      {
        dataIndex: "candidateLevelName",
        title: "Chức danh",
        width: "216px",
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          name: "candidateLevelIds",
          placeholder: "Chọn 1 hoặc nhiều chức danh",
          remoteUrl: API_GET_LIST_CANDIDATELEVEL,
        },
      },
      {
        dataIndex: "workExperience",
        title: "Số năm kinh nghiệm",
        width: "214px",
        render: (item) => YearOfExperience(item),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          placeholder: "Chọn số năm kinh nghiệm",
          name: "workExperiences",
          options: LIST_EXPERIENCE_NUMBER.map((item) => ({
            value: item.value,
            label: item.label,
          })),
        },
      },
      {
        dataIndex: "workingLanguageName",
        title: "Ngôn ngữ",
        width: "160px",
        render: (_, { recruitmentLanguages }) => (
          <>
            {recruitmentLanguages?.map((re, index) => {
              if (index < 3) {
                return (
                  <Tag
                    key={index}
                    style={{
                      background: "#EFF3F7",
                      borderRadius: "4px",
                      color: theme.palette.common.borderObject,
                      border: "none",
                    }}
                  >
                    {re?.name}
                  </Tag>
                );
              } else {
                var indexplus = recruitmentLanguages.length - 3;
                return (
                  <Tag
                    key={index}
                    style={{
                      background: "#EFF3F7",
                      borderRadius: "4px",
                      color: theme.palette.common.borderObject,
                      border: "none",
                    }}
                  >
                    +{indexplus}
                  </Tag>
                );
              }
            })}
          </>
        ),
        filters: {
          type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
          placeholder: "Chọn 1 hoặc nhiều ngôn ngữ",
          name: "workingLanguageIds",
          remoteUrl: API_GET_LIST_LANGUAGE,
        },
      },
    ];
  }, [query.PageIndex, query.PageSize]);

  const [isOpenSettingOrganization, setIsOpenSettingOrganization] =
    useState(false);

  const { data: Organization = {} } = useGetOrganizationQuery();

  const handleCheckNavigate = () => {
    if (get(Organization, "isActivated")) {
      return router.push(PATH_DASHBOARD.recruitment.create);
    } else {
      setIsOpenSettingOrganization(true);
    }
  };

  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    setItemSelected([]);
    event.currentTarget.getElementsByClassName(
      "css-6pqpl8"
    )[0].style.paddingBottom = null;
  };

  const handleCloseRecruitmentSubmit = async (data) => {
    try {
      await closeRecruitments({ ids: data }).unwrap();
      enqueueSnackbar("Đóng tin tuyển dụng thành công!", {
        autoHideDuration: 1000,
      });
      setSelectedRowKeys([]);
      setItemSelected([]);
      handleCloseModal();
    } catch (e) {
      enqueueSnackbar(
        "Đóng tin tuyển dụng không thành công. Vui lòng kiểm tra và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };

  const handleDeleteRecruitmentSubmit = async (data) => {
    try {
      await deleteRecruitments({ ids: data }).unwrap();
      enqueueSnackbar("Xóa tin tuyển dụng thành công!", {
        autoHideDuration: 1000,
      });
      setSelectedRowKeys([]);
      setItemSelected([]);
      handleCloseModal();
    } catch (e) {
      enqueueSnackbar(
        "Xóa tin tuyển dụng không thành công. Vui lòng kiểm tra và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };

  const listKeyActions = useMemo(() => {
    const getKeysByStatus = (data) => {
      if (data.length === 1) {
        switch (data[0]?.processStatus) {
          case 0:
            return ["name", "preview", "excel", "edit", "copy", "delete"];
          case 1:
            return ["name", "preview", "excel", "edit", "copy", "delete"];
          case 2:
            return ["name", "preview", "excel", "edit", "copy", "delete"];
          case 3:
            return ["name", "preview", "excel", "edit", "copy", "delete"];
          case 4:
            return ["name", "preview", "excel", "copy", "delete"];
          case 5:
            return [
              "name",
              "detail",
              "preview",
              "close",
              "edit",
              "excel",
              "copy",
            ];
          case 6:
            return ["name", "detail", "preview", "excel", "edit", "copy"];
          case 7:
            return ["name", "detail", "preview", "excel", "close", "copy"];
          case 8:
            return ["name", "detail", "preview", "excel", "copy"];
          default:
            return ["name", "detail", "excel"];
        }
      } else {
        let isShow = true;
        for (let i = 1; i < data.length; i++) {
          if (
            data[i].processStatus === RECRUITMENT_STATUS.RECRUITING ||
            data[i].processStatus === RECRUITMENT_STATUS.CALENDARED ||
            data[i].processStatus === RECRUITMENT_STATUS.EXPIRED ||
            data[i].processStatus === RECRUITMENT_STATUS.CLOSED
          ) {
            isShow = false;
          }
        }
        if (isShow) {
          return ["close", "excel", "delete"];
        }
        return ["close", "excel"];
      }
    };
    return getKeysByStatus(itemSelected);
  }, [itemSelected]);

  return (
    <View>
      <View>
        <DynamicColumnsTable
          columns={columns}
          source={Data}
          loading={isLoading}
          settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
          scroll={{ x: 3954 }}
          nodata="Hiện chưa có tin tuyển dụng nào"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListRecruitmentColumnsQuery}
          useUpdateColumnsFunc={useUpdateListRecruitmentColumnsMutation}
          searchInside={false}
          createText={canEdit && "Đăng tin tuyển dụng"}
          searchTextHint="Tìm kiếm theo tiêu đề tin tuyển dụng..."
          onClickCreate={() => {
            handleCheckNavigate();
          }}
        />
      </View>

      {openClose && (
        <ConfirmModal
          open={openClose}
          onClose={handleCloseModal}
          title={
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: style.FONT_BASE,
                fontWeight: style.FONT_SEMI_BOLD,
                color: style.COLOR_PRIMARY,
                marginTop: 2,
              }}
            >
              Xác nhận đóng tin tuyển dụng
            </Typography>
          }
          icon={<UnCheckedSwitchIcon />}
          subtitle={
            selectedRowKeys.length > 1 ? (
              <>
                Bạn có chắc chắn muốn đóng {selectedRowKeys.length} tin tuyển
                dụng?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn đóng tin tuyển dụng
                <span className="subtitle-confirm-name">
                  {itemSelected[0]?.name}
                </span>{" "}
                ?
              </>
            )
          }
          data={selectedRowKeys}
          onSubmit={handleCloseRecruitmentSubmit}
          btnCancelProps={{
            title: "Hủy",
          }}
          btnConfirmProps={{
            title: "Xác nhận",
          }}
        />
      )}
      {openDelete && (
        <ConfirmModal
          open={openDelete}
          onClose={handleCloseModal}
          icon={<AlertIcon />}
          title={
            <Typography
              sx={{
                textAlign: "center",
                width: "100%",
                fontSize: style.FONT_BASE,
                fontWeight: style.FONT_SEMI_BOLD,
                color: style.COLOR_TEXT_DANGER,
                marginTop: 2,
              }}
            >
              Xác nhận xóa tin tuyển dụng
            </Typography>
          }
          subtitle={
            selectedRowKeys.length > 1 ? (
              <>
                Bạn có chắc chắn muốn xóa {selectedRowKeys.length} tin tuyển
                dụng?
              </>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa tin tuyển dụng
                <span className="subtitle-confirm-name">
                  {itemSelected[0]?.name}
                </span>{" "}
                ?
              </>
            )
          }
          data={selectedRowKeys}
          onSubmit={handleDeleteRecruitmentSubmit}
          btnCancelProps={{
            title: "Hủy",
          }}
          btnConfirmProps={{
            title: "Xác nhận",
          }}
        />
      )}
      <RecruitmentPreview
        data={itemSelected[0]}
        open={openPreview}
        onClose={handleCloseModal}
      />
      <BottomNavModal
        data={itemSelected}
        onClose={toggleDrawer(false)}
        open={selectedRowKeys?.length > 0}
        actions={[
          {
            key: "name",
            type: "text",
            title: (
              <Typography
                sx={{
                  fontFamily: 'Inter',
                  fontWeight: style.FONT_MEDIUM,
                  fontSize: style.FONT_SM,
                  marginRight: 2,
                }}
              >
                {DivProcessStatus(itemSelected[0]?.processStatus)}
              </Typography>
            ),
          },
          canView && {
            key: "detail",
            title: "Chi tiết",
            onClick: () =>
              router.push(PATH_DASHBOARD.recruitment.view(itemSelected[0]?.id)),
            startIcon: <ForwardLightIcon />,
            sx: { padding: "6px 11px", fontFamily: 'Inter', fontWeight: 600, minWidth: '101px' },
          },
          canView && {
            key: "preview",
            title: "Xem tin tuyển dụng",
            onClick: () => handleOpenModalState({ openPreview: true }),
            color: "default",
            startIcon: <ExpandPreviewIcon />,
            sx: { padding: "6px 11px", fontFamily: 'Inter', fontWeight: 500, minWidth: '178px' },
          },
          canEdit && {
            key: "close",
            title: "Đóng tin",
            onClick: () => handleOpenModalState({ openClose: true }),
            color: "default",
            startIcon: <SquareDarkIcon />,
            sx: {
              padding: "6px 11px", fontFamily: 'Inter', fontWeight: 500, minWidth: '105px'
            },
          },
          canEdit && {
            key: "edit",
            onClick: () =>
              router.push(
                PATH_DASHBOARD.recruitment.update(itemSelected[0]?.id)
              ),
            color: "basic",
            icon: <EditIcon />,
            title: "Chỉnh sửa",
          },
          (canView || canEdit) && {
            key: "excel",
            onClick: () => handleExportExcel(itemSelected),
            color: "basic",
            icon: (
              <Iconify
                icon={"vscode-icons:file-type-excel"}
                width={20}
                height={20}
              />
            ),
            title: "Export Excel",
          },
          canEdit && {
            key: "copy",
            onClick: () =>
              router.push({
                pathname: PATH_DASHBOARD.recruitment.copy,
                query: {
                  source: itemSelected[0]?.id,
                  type: "copy",
                },
              }),
            color: "basic",
            icon: <CopyIcon />,
            title: "Sao chép",
          },
          canEdit && {
            key: "delete",
            onClick: () => handleOpenModalState({ openDelete: true }),
            color: "basic",
            icon: <DeleteIcon />,
            title: "Xóa",
          },
        ].filter((item) => listKeyActions?.includes(item.key))}
      />

      <OrganizationSettingModal
        onClose={() => setIsOpenSettingOrganization(false)}
        isOpenSettingOrganization={isOpenSettingOrganization}
      />
    </View>
  );
};
