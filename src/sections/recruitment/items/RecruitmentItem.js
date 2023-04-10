import {
  useCloseRecruitmentMutation,
  useDeleteRecruitmentMutation,
  useGetListColumnsQuery,
  useGetRecruitmentsQuery,
  useUpdateListColumnsMutation,
} from "../RecruitmentSlice";
import { useGetOrganizationQuery } from "@/sections/report/reportSlice";
import { DeleteIcon, EditIcon } from "@/assets/ActionIcon";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import OrganizationSettingModal from "../modals/OrganizationSettingModal";
import DynamicColumnsTable from "@/components/BaseComponents/table";
import { AvatarDS } from "@/components/DesignSystem";
import { View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import { ExcelIcon } from "@/sections/offerform/component/editor/Icon";
import {
  AlertIcon,
  UnCheckedSwitchIcon,
} from "@/sections/organization/component/Icon";
import { handleExportExcel } from "@/sections/recruitment/helper/excel";
import RecruitmentPreview from "@/sections/recruitment/modals/preview/RecruitmentPreview";
import {
  CopyIcon,
  ExpandPreviewIcon,
  ForwardLightIcon,
  SquareDarkIcon,
} from "@/sections/recruitment/others/Icon";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import {
  Currency,
  DivProcessStatus,
  RecruitmentWorkingForm,
  YearOfExperience,
} from "@/utils/enum";
import { fCurrency } from "@/utils/formatNumber";
import { fDate } from "@/utils/formatTime";
import { Tooltip, Typography } from "@mui/material";
import { Tag } from "antd";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useMemo, useState } from "react";
import { get } from "lodash";
import useRole from "@/hooks/useRole";
import { PERMISSIONS } from "@/config";

export const RecruitmentItem = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  // modal redux
  const dispatch = useDispatch();
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const { openClose, openDelete, openPreview } = toggleModalState;

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
  const { query = { PageIndex: 1, PageSize: 10 }, isReady } = router;
  const { data: Data = {}, isLoading } = useGetRecruitmentsQuery(query, { skip: !isReady });

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
        render: (text) => <span style={{ fontWeight: 500 }}>{text}</span>,
      },
      {
        dataIndex: "jobPosition",
        title: "Vị trí công việc",
        width: "214px",
        render: (item) => item?.name,
      },
      {
        dataIndex: "organizationName",
        title: "Đơn vị",
        width: "200px",
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
                    color="#E53935"
                    ml={1}
                    style={{ marginTop: "4px" }}
                  />
                </div>
              </Tooltip>
            )}
          </div>
        ),
      },
      {
        dataIndex: "startDate",
        title: "Ngày bắt đầu",
        width: "180px",
        type: "date",
        label: "Ngày bắt đầu",
        name: "startDate",
        render: (date) => fDate(date),
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
        render: (date) => fDate(date),
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
      {
        dataIndex: "createdTime",
        title: "Ngày tạo tin",
        width: "180px",
        type: "date",
        label: "Ngày tạo tin",
        name: "createdTime",
        render: (date) => fDate(date),
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
        dataIndex: "numOfApplied",
        title: "SL ứng tuyển",
        width: "160px",
        name: "numOfApplied",
        label: "Số lượng ứng tuyển",
        type: "number",
        align: "center",
        items: [
          {
            name: "numberApplyFrom",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Từ</span>,
            endIcon: <span>Người</span>,
          },
          {
            name: "numberApplyTo",
            type: "number",
            placeholder: "Nhập số",
            startIcon: <span>Đến</span>,
            endIcon: <span>Người</span>,
          },
        ],
      },
      {
        dataIndex: "numberPosition",
        title: "SL cần tuyển",
        width: "160px",
        align: "center",
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
        name: "ownerIds",
        label: "Cán bộ phụ trách",
        placeholder: "Chọn 1 hoặc nhiều người",
        // type: "select",
        multiple: true,
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
                <span fontSize="14px" fontWeight="600" color="#172B4D">
                  {record?.ownerEmail}
                </span>
              </div>
            )}
          </>
        ),
      },
      {
        dataIndex: "coOwners",
        title: "Đồng phụ trách",
        width: "340px",
        name: "coOwnerIds",
        label: "Đồng phụ trách",
        placeholder: "Chọn 1 hoặc nhiều người",
        // type: "select",
        multiple: true,
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
                      color: "#5C6A82",
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
                      color: "#5C6A82",
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
      },
      {
        dataIndex: "recruitmentAddresses",
        title: "Khu vực đăng tin",
        width: "300px",
        name: "recruitmentAddresses",
        label: "Khu vực đăng tin",
        placeholder: "Chọn 1 hoặc nhiều khu vực",
        // type: "select",
        multiple: true,
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
      },
      {
        dataIndex: "recruitmentWorkingForms",
        title: "Hình thức làm việc",
        width: "216px",
        name: "recruitmentWorkingForms",
        label: "Hình thức làm việc",
        placeholder: "Chọn 1 hoặc nhiều hình thức",
        // type: "select",
        multiple: true,
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
      },
      {
        dataIndex: "salary",
        title: "Mức lương",
        width: "216px",
        name: ["minSalary", "maxSalary"],
        label: "Mức lương",
        // type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        render: (text, record) => (
          <>
            {record?.minSalary != 0
              ? `${fCurrency(record?.minSalary)} - ${fCurrency(record?.maxSalary)} ${Currency(record?.currencyUnit)}`
              : ""}
          </>
        ),
      },
      {
        dataIndex: "candidateLevelName",
        title: "Chức danh",
        width: "216px",
      },
      {
        dataIndex: "workExperience",
        title: "Số năm kinh nghiệm",
        width: "214px",
        render: (item) => YearOfExperience(item),
      },
      {
        dataIndex: "workingLanguageName",
        title: "Ngôn ngữ",
        width: "160px",
      },
    ];
  }, [query.PageIndex, query.PageSize]);

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [itemSelected, setItemSelected] = useState([]);
  const [isOpenSettingOrganization, setIsOpenSettingOrganization] = useState(false);

  const { data: Organization = {} } = useGetOrganizationQuery();

  const handleCheckNavigate = () => {
    if (get(Organization, 'isActivated')) {
      return router.push(PATH_DASHBOARD.recruitment.create);
    } else {
      setIsOpenSettingOrganization(true)
    }
  }

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
            return ["name", "preview", "edit", "copy", "delete"];
          case 1:
            return ["name", "preview", "edit", "copy", "delete"];
          case 2:
            return ["name", "detail", "preview", "edit", "copy", "delete"];
          case 3:
            return ["name", "preview", "edit", "copy", "delete"];
          case 4:
            return ["name", "detail", "preview", "excel", "copy", "delete"];
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
            return ["name", "detail", "preview", "close", "edit", "copy"];
          case 7:
            return ["name", "detail", "preview", "close", "copy"];
          case 8:
            return ["name", "detail", "preview", "copy"];
          default:
            return ["name", "detail"];
        }
      } else {
        return ["close", "excel", "delete"];
      }
    };
    return getKeysByStatus(itemSelected);
  }, [itemSelected]);

  return (
    <View>
      {/* <RecruitmentHeader
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
          scroll={{ x: 3954 }}
          nodata="Hiện chưa có tin tuyển dụng nào"
          selectedRowKeys={selectedRowKeys}
          setSelectedRowKeys={setSelectedRowKeys}
          itemSelected={itemSelected}
          setItemSelected={setItemSelected}
          useGetColumnsFunc={useGetListColumnsQuery}
          useUpdateColumnsFunc={useUpdateListColumnsMutation}
          searchInside={false}
          createText={canEdit && "Đăng tin tuyển dụng"}
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
                fontWeight: style.FONT_SEMIBOLD,
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
                fontWeight: style.FONT_SEMIBOLD,
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
      {openPreview && (
        <RecruitmentPreview
          data={itemSelected[0]}
          open={openPreview}
          onClose={handleCloseModal}
        />
      )}
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
            sx: { padding: "8px 12px" },
          },
          canView && {
            key: "preview",
            title: "Xem tin tuyển dụng",
            onClick: () => handleOpenModalState({ openPreview: true }),
            color: "default",
            startIcon: <ExpandPreviewIcon />,
            sx: { padding: "8px 12px" },
          },
          canEdit && {
            key: "close",
            title: "Đóng tin",
            onClick: () => handleOpenModalState({ openClose: true }),
            color: "default",
            startIcon: <SquareDarkIcon />,
            sx: {
              padding: "8px 12px",
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
          },
          (canView || canEdit) && {
            key: "excel",
            onClick: () => handleExportExcel(itemSelected),
            color: "basic",
            icon: <ExcelIcon />,
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
          },
          canEdit && {
            key: "delete",
            onClick: () => handleOpenModalState({ openDelete: true }),
            color: "basic",
            icon: <DeleteIcon />,
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
