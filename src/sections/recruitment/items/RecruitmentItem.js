import {
  useCloseRecruitmentMutation,
  useDeleteRecruitmentMutation,
  useLazyGetRecruitmentsQuery
} from "../RecruitmentSlice";
import RecruitmentFilterModal from "../modals/RecruitmentFilterModal";
import Content from "@/components/BaseComponents/Content";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import {AvatarDS} from "@/components/DesignSystem";
import {View} from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import RecruitmentHeader from "@/sections/recruitment/RecruitmentHeader";
import {Currency, DivProcessStatus, RecruitmentWorkingForm, YearOfExperience,} from "@/utils/enum";
import {fCurrency} from "@/utils/formatNumber";
import {fDate} from "@/utils/formatTime";
import {yupResolver} from "@hookform/resolvers/yup";
import {Tooltip, Typography} from "@mui/material";
import {Tag} from "antd";
import {get} from "lodash";
import {useRouter} from "next/router";
import React, {useEffect, useMemo, useState} from "react";
import {useForm} from "react-hook-form";
import * as Yup from "yup";
import {modalSlice} from "@/redux/common/modalSlice";
import {useDispatch, useSelector} from "@/redux/store";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import BottomNavModal from "@/components/BaseComponents/BottomNavModal";
import {CopyIcon, ExpandPreviewIcon, ForwardLightIcon, SquareDarkIcon} from "@/sections/recruitment/others/Icon";
import {PATH_DASHBOARD} from "@/routes/paths";
import {DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import {ExcelIcon} from "@/sections/offerform/component/editor/Icon";
import {handleExportExcel} from "@/sections/recruitment/helper/excel";
import {AlertIcon, UnCheckedSwitchIcon} from "@/sections/organization/component/Icon";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {useSnackbar} from "notistack";

const defaultValues = {
  searchKey: "",
};

export const RecruitmentItem = () => {
  const router = useRouter();
  const {query, isReady} = router;
  const {enqueueSnackbar} = useSnackbar();

  // modal redux
  const dispatch = useDispatch();
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const {openClose, openDelete} = toggleModalState;

  const handleOpenModalState = (data) => dispatch(modalSlice.actions.openStateModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  // delete & close recruitment
  const [closeRecruitments] = useCloseRecruitmentMutation();
  const [deleteRecruitments] = useDeleteRecruitmentMutation();

  // api get list
  const [getAllFilter, {data: Data = {}, isLoading}] = useLazyGetRecruitmentsQuery();
  // api get list Column
  const {data: ColumnData} = [];
  // api update list Column
  const [UpdateListColumnApplicants] = [];
  const [page, setPage] = useState(1);
  const [paginationSize, setPaginationSize] = useState(10);
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
        fixed: "left",
      },
      {
        dataIndex: "name",
        title: "Tin tuyển dụng",
        fixed: "left",
        width: "300px",
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
        dataIndex: ["processStatus", "rejectReason"],
        title: "Trạng thái",
        width: "180px",
        render: (text, row) => (
            <div style={{display: "flex", alignItems: "center"}}>
              {DivProcessStatus(get(row, "processStatus", ""))}
              {get(row, "rejectReason", "") && (
                  <Tooltip title={get(row, "rejectReason", "")} placement="top" followCursor>
                    <div>
                      <Iconify
                          icon={"mdi:question-mark-circle-outline"}
                          width={20}
                          height={20}
                          color="#E53935"
                          ml={1}
                          style={{marginTop: '4px'}}
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
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
          },
          {
            name: "startDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
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
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
          },
          {
            name: "endDateTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
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
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
          },
          {
            name: "createdTimeTo",
            type: "date",
            placeholder: "Chọn ngày",
            startIcon: <span>Đến</span>,
            endIcon: <Iconify icon="material-symbols:calendar-today"/>,
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
        dataIndex: ["ownerName", "ownerEmail"],
        title: "Cán bộ phụ trách",
        width: "220px",
        name: "ownerIds",
        label: "Cán bộ phụ trách",
        placeholder: "Chọn 1 hoặc nhiều người",
        // type: "select",
        multiple: true,
        render: (text, row) => (
            <>
              {get(row, "ownerEmail", "") && (
                  <div style={{display: "flex", alignItems: "center"}}>
                    <AvatarDS
                        sx={{
                          height: "20px",
                          width: "20px",
                          borderRadius: "100px",
                          fontSize: "10px",
                        }}
                        name={get(row, "ownerName", "")}
                    ></AvatarDS>
                    <span fontSize="14px" fontWeight="600" color="#172B4D">
                  {get(row, "ownerEmail", "")}
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
        render: (_, {coOwners}) => (
            <>
              {coOwners?.map((p, index) => {
                if (index < 3) {
                  return (
                      <Tag
                          key={p}
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
                          key={p}
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
        render: (_, {recruitmentAddresses}) => (
            <>
              {recruitmentAddresses.map((item, index) => {
                if (index < recruitmentAddresses?.length - 1) {
                  return <span key={item}>{item.provinceName}, </span>;
                } else {
                  return <span key={item}>{item.provinceName}</span>;
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
        render: (_, {recruitmentWorkingForms}) => (
            <>
              {recruitmentWorkingForms.map((item, index) => {
                if (index < recruitmentWorkingForms?.length - 1) {
                  return (
                      <span key={item}>
                    {RecruitmentWorkingForm(item.workingForm)},{" "}
                  </span>
                  );
                } else {
                  return (
                      <span key={item}>
                    {RecruitmentWorkingForm(item.workingForm)}
                  </span>
                  );
                }
              })}
            </>
        ),
      },
      {
        dataIndex: ["minSalary", "maxSalary", "currencyUnit"],
        title: "Mức lương",
        width: "216px",
        name: ["minSalary", "maxSalary"],
        label: "Mức lương",
        // type: "select",
        multiple: false,
        placeholder: "Chọn số năm kinh nghiệm",
        render: (text, row) => (
            <>
              {get(row, "minSalary", "") != 0
                  ? `${fCurrency(get(row, "minSalary", ""))} - ${fCurrency(
                      get(row, "maxSalary", "")
                  )} ${Currency(get(row, "currencyUnit", ""))}`
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
  }, [page, paginationSize]);

  const menuItemText = {
    name: "Họ và tên",
    phoneNumber: "Số điện thoại",
    dateOfBirth: "Ngày sinh",
    email: "Email",
    recruitment: "Tin tuyển dụng",
    recruitmentPipelineState: "Bước tuyển dụng",
    createdTime: "Ngày ứng tuyển",
    organization: "Tổ chức",
    jobSource: "Nguồn",
    council: "Hội đồng",
    creator: "Cán bộ tạo ứng viên",
    education: "Học vấn",
    applicantWorkingExperiences: "Kinh nghiệm làm việc",
    jobCategory: "Ngành nghề",
    yearOfExperience: "Số năm kinh nghiệm",
    applicantSkills: "Kỹ năng",
    identityNumber: "Số CCCD/CMND",
    sex: "Giới tính",
    maritalStatus: "Tình trạng hôn nhâ",
    height: "Chiều cao",
    weight: "Cân nặng",
    expectedWorkingAddress: "Nơi làm việc mong muốn",
    expectedSalary: "Mức lương mong muốn",
    livingAddress: "Nơi ở hiện tại",
    homeTower: "Quê quán",
  };

  // form search
  const handleUpdateListColumnApplicants = async () => {
    var body = {
      recruitment: false,
    };
    var data = {id: "01000000-ac12-0242-981f-08db10c9413d", body: body};

    await UpdateListColumnApplicants(data);
  };

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: useMemo(
        () =>
            query.searchKey
                ? {...defaultValues, searchKey: query.searchKey}
                : {...defaultValues},
        [query.searchKey]
    ),
    // defaultValues: {...defaultValues, searchKey: query.searchKey},
    resolver: yupResolver(Schema),
  });

  const {handleSubmit} = methods;
  let queryParams = {
    ...query,
    applicantSkillIds:
        query.applicantSkillIds && typeof query.applicantSkillIds === "string"
            ? [query.applicantSkillIds]
            : query.applicantSkillIds && query.applicantSkillIds,
    expectSalaryFrom: query.expectSalaryFrom
        ? Number(query.expectSalaryFrom)
        : null,
    expectSalaryTo: query.expectSalaryTo ? Number(query.expectSalaryTo) : null,
    yearsOfExperience: query.yearsOfExperience
        ? [Number(query.yearsOfExperience)]
        : null,
    sexs: query.sexs ? [Number(query.sexs)] : null,
    weightFrom: query.weightFrom ? Number(query.weightFrom) : null,
    weightTo: query.weightTo ? Number(query.weightTo) : null,
    heightFrom: query.heightFrom ? Number(query.heightFrom) : null,
    heightTo: query.heightTo ? Number(query.heightTo) : null,
    maritalStatuses: query.maritalStatuses
        ? [Number(query.maritalStatuses)]
        : null,
    education: query.education ? query.education : null,
    homeTowerProvinceIds: query.homeTowerProvinceIds
        ? [query.homeTowerProvinceIds]
        : null,
    homeTowerDistrictIds: query.homeTowerDistrictIds
        ? [query.homeTowerDistrictIds]
        : null,
    livingAddressProvinceIds: query.livingAddressProvinceIds
        ? [query.livingAddressProvinceIds]
        : null,
    livingAddressDistrictIds: query.livingAddressDistrictIds
        ? [query.livingAddressDistrictIds]
        : null,
    expectWorkingAddressProvinceIds:
        query.expectWorkingAddressProvinceIds &&
        typeof query.expectWorkingAddressProvinceIds === "string"
            ? [query.expectWorkingAddressProvinceIds]
            : query.expectWorkingAddressProvinceIds &&
            query.expectWorkingAddressProvinceIds,
    organizationIds:
        query.organizationIds && typeof query.organizationIds === "string"
            ? [query.organizationIds]
            : query.organizationIds && query.organizationIds,
    recruitmentIds:
        query.recruitmentIds && typeof query.recruitmentIds === "string"
            ? [query.recruitmentIds]
            : query.recruitmentIds && query.recruitmentIds,
    ownerIds:
        query.ownerIds && typeof query.ownerIds === "string"
            ? [query.ownerIds]
            : query.ownerIds && query.ownerIds,
    councilIds:
        query.councilIds && typeof query.councilIds === "string"
            ? [query.councilIds]
            : query.councilIds && query.councilIds,
    creatorIds:
        query.creatorIds && typeof query.creatorIds === "string"
            ? [query.creatorIds]
            : query.creatorIds && query.creatorIds,
    createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
    createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
    recruitmentPipelineStates:
        query.recruitmentPipelineStates &&
        typeof query.recruitmentPipelineStates === "string"
            ? [Number(query.recruitmentPipelineStates)]
            : query.recruitmentPipelineStates &&
            query.recruitmentPipelineStates?.map((pipe) => Number(pipe)),
    jobCategoryIds:
        query.jobCategoryIds && typeof query.jobCategoryIds === "string"
            ? [query.jobCategoryIds]
            : query.jobCategoryIds && query.jobCategoryIds,
    jobSourceIds:
        query.jobSourceIds && typeof query.jobSourceIds === "string"
            ? [query.jobSourceIds]
            : query.jobSourceIds && query.jobSourceIds,
    pageSize: paginationSize,
    pageIndex: page,
  };
  useEffect(() => {
    if (!isReady) return;
    if (query) {
      getAllFilter(
          JSON.stringify(
              Object.entries(queryParams).reduce(
                  (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
                  {}
              )
          )
      ).unwrap();
    } else {
      getAllFilter({pageSize: paginationSize, pageIndex: page}).unwrap();
    }
  }, [isReady, query]);

  const handleChangePagination = (pageIndex, pageSize) => {
    setPaginationSize(pageSize);
    setPage(pageIndex);
    if (query) {
      getAllFilter(
          JSON.stringify(
              Object.entries({
                ...queryParams,
                pageSize: pageSize,
                pageIndex: pageIndex,
              }).reduce(
                  (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
                  {}
              )
          )
      ).unwrap();
    } else {
      getAllFilter({pageSize: pageSize, pageIndex: pageIndex}).unwrap();
    }
  };
  // open filter form
  const [isOpen, setIsOpen] = useState(false);

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

  const onSubmitSearch = async (data) => {
    await router.push(
        {
          pathname: router.pathname,
          query: {...query, searchKey: data.searchKey},
        },
        undefined,
        {shallow: true}
    );
  };

  const onSubmit = async (data) => {
    const body = {...data, searchKey: data.searchKey};

    if (query) {
      queryParams = {
        ...queryParams,
        ...body,
        pageSize: page,
        pageIndex: paginationSize,
      };
      getAllFilter(
          JSON.stringify(
              Object.entries(queryParams).reduce(
                  (a, [k, v]) => (v == null ? a : ((a[k] = v), a)),
                  {}
              )
          )
      ).unwrap();
    } else {
      getAllFilter({pageSize: page, pageIndex: paginationSize}).unwrap();
    }
    await router.push(
        {
          pathname: router.pathname,
          query: {
            ...body,
            startDateFrom: data.startDateFrom
                ? new Date(data.startDateFrom).toISOString()
                : null,
            startDateTo: data.startDateTo
                ? new Date(data.startDateTo).toISOString()
                : null,
            endDateFrom: data.endDateFrom
                ? new Date(data.endDateFrom).toISOString()
                : null,
            endDateTo: data.endDateTo
                ? new Date(data.endDateTo).toISOString()
                : null,
            createdTimeFrom: data.createdTimeFrom
                ? new Date(data.createdTimeFrom).toISOString()
                : null,
            createdTimeTo: data.createdTimeTo
                ? new Date(data.createdTimeTo).toISOString()
                : null,
          },
        },
        undefined,
        {shallow: true}
    );
    handleCloseFilterForm();
  };
  const refreshData = () => {
    getAllFilter().unwrap();
  };

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [itemSelected, setItemSelected] = useState([]);

  const [, setIsOpenBottomNav] = useState(false);
  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
    setSelectedRowKeys([]);
    event.currentTarget.getElementsByClassName('css-6pqpl8')[0].style.paddingBottom = null;
  };

  const handleCloseRecruitmentSubmit = async (data) => {
    try {
      await closeRecruitments({ ids: data }).unwrap();
      enqueueSnackbar("Đóng tin tuyển dụng thành công!", {
        autoHideDuration: 1000
      });
      handleCloseModal();
    } catch (e) {
      enqueueSnackbar("Đóng tin tuyển dụng không thành công. Vui lòng kiểm tra và thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
      throw e;
    }
  }

  const handleDeleteRecruitmentSubmit = async (data) => {
    try {
      await deleteRecruitments({ ids: data }).unwrap();
      enqueueSnackbar("Xóa tin tuyển dụng thành công!", {
        autoHideDuration: 1000
      });
      handleCloseModal();
    } catch (e) {
      enqueueSnackbar("Xóa tin tuyển dụng không thành công. Vui lòng kiểm tra và thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
      throw e;
    }
  }

  const listKeyActions = useMemo(() => {
    const getKeysByStatus = (data) => {
      if (data.length === 1) {
        switch (data[0]?.processStatus) {
          case 0:
            return ['name', 'preview', 'edit', 'copy', 'delete'];
          case 1:
            return ['name', 'preview', 'edit', 'copy', 'delete'];
          case 2:
            return ['name', 'detail', 'preview', 'edit', 'copy', 'delete'];
          case 3:
            return ['name', 'preview', 'edit', 'copy', 'delete'];
          case 4:
            return ['name', 'detail', 'preview', 'excel', 'copy', 'delete'];
          case 5:
            return ['name', 'detail', 'preview', 'close', 'edit', 'excel', 'copy'];
          case 6:
            return ['name', 'detail', 'preview', 'close', 'edit', 'copy'];
          case 7:
            return ['name', 'detail', 'preview', 'close', 'copy'];
          case 8:
            return ['name', 'detail', 'preview', 'copy'];
          default:
            return ['name', 'detail'];
        }
      } else {
        return ['close', 'excel', 'delete']
      }
    }
    return getKeysByStatus(itemSelected)
  }, [itemSelected])

  return (
      <View>
        <RecruitmentHeader
            data={Data.items}
            methods={methods}
            isOpen={isOpen}
            onSubmit={onSubmitSearch}
            handleSubmit={handleSubmit}
            onOpenFilterForm={handleOpenFilterForm}
            onCloseFilterForm={handleCloseFilterForm}
        />
        <Content>
          <View mt={96}>
            <DynamicColumnsTable
                page={page}
                paginationSize={paginationSize}
                handleChangePagination={handleChangePagination}
                columns={[...columns]}
                source={Data}
                loading={isLoading}
                ColumnData={ColumnData}
                menuItemText={menuItemText}
                UpdateListColumn={handleUpdateListColumnApplicants}
                settingName={"DANH SÁCH TIN TUYỂN DỤNG"}
                scroll={{x: 3954}}
                nodata="Hiện chưa có tin tuyển dụng nào"
                selectedRowKeys={selectedRowKeys}
                setSelectedRowKeys={setSelectedRowKeys}
                itemSelected={itemSelected}
                setItemSelected={setItemSelected}
            />
          </View>
        </Content>
        {isOpen && (
            <RecruitmentFilterModal
                columns={columns}
                isOpen={isOpen}
                onClose={handleCloseFilterForm}
                onSubmit={onSubmit}
                onRefreshData={refreshData}
            />
        )}
        {
            openClose && <ConfirmModal
                open={openClose}
                onClose={handleCloseModal}
                title={<Typography sx={{textAlign: 'center', width: '100%', fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD, color: style.COLOR_PRIMARY, marginTop: 2,}}>Xác nhận đóng tin tuyển dụng</Typography>}
                icon={<UnCheckedSwitchIcon />}
                subtitle={selectedRowKeys.length > 1 ? <>Bạn có chắc chắn muốn đóng {selectedRowKeys.length} tin tuyển dụng?</> : <>Bạn có chắc chắn muốn đóng tin tuyển dụng<span className="subtitle-confirm-name">{itemSelected[0]?.name}</span> ?</>}
                data={selectedRowKeys}
                onSubmit={handleCloseRecruitmentSubmit}
                btnCancelProps={{
                  title: 'Hủy',
                }}
                btnConfirmProps={{
                  title: 'Xác nhận'
                }}
            />
        }
        {
            openDelete && <ConfirmModal
                open={openDelete}
                onClose={handleCloseModal}
                icon={<AlertIcon />}
                title={<Typography sx={{textAlign: 'center', width: '100%', fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD, color: style.COLOR_TEXT_DANGER, marginTop: 2,}}>Xác nhận xóa tin tuyển dụng</Typography>}
                subtitle={selectedRowKeys.length > 1 ? <>Bạn có chắc chắn muốn xóa {selectedRowKeys.length} tin tuyển dụng?</> : <>Bạn có chắc chắn muốn xóa tin tuyển dụng<span className="subtitle-confirm-name">{itemSelected[0]?.name}</span> ?</>}
                data={selectedRowKeys}
                onSubmit={handleDeleteRecruitmentSubmit}
                btnCancelProps={{
                  title: 'Hủy',
                }}
                btnConfirmProps={{
                  title: 'Xác nhận'
                }}
            />
        }
        <BottomNavModal
            data={itemSelected}
            onClose={toggleDrawer(false)}
            open={selectedRowKeys?.length > 0}
            actions={[
              {
                key: 'name',
                type: 'text',
                title: (
                    <Typography sx={{ fontWeight: style.FONT_MEDIUM, fontSize: style.FONT_SM, marginRight: 2 }}>
                      {DivProcessStatus(itemSelected[0]?.processStatus)}
                    </Typography>
                ),
              },
              {
                key: 'detail',
                title: 'Chi tiết',
                onClick: () => router.push(PATH_DASHBOARD.recruitment.view(itemSelected[0]?.id)),
                startIcon: <ForwardLightIcon />,
                sx: { padding: '8px 12px' }
              },
              {
                key: 'preview',
                title: 'Xem tin tuyển dụng',
                onClick: () => alert('Xem tin tuyển dụng'),
                color: 'default',
                startIcon: <ExpandPreviewIcon />,
                sx: { padding: '8px 12px' }
              },
              {
                key: 'close',
                title: 'Đóng tin',
                onClick: () => handleOpenModalState({ openClose: true }),
                color: 'default',
                startIcon: <SquareDarkIcon />,
                sx: {
                  padding: '8px 12px'
                }
              },
              {
                key: 'edit',
                onClick: () => router.push(PATH_DASHBOARD.recruitment.update(itemSelected[0]?.id)),
                color: 'basic',
                icon: <EditIcon />,
              },
              {
                key: 'excel',
                onClick: () => handleExportExcel(itemSelected),
                color: 'basic',
                icon: <ExcelIcon />,
              },
              {
                key: 'copy',
                onClick: () => handleOpenModalState({ openClose: true }),
                color: 'basic',
                icon: <CopyIcon />,
              },
              {
                key: 'delete',
                onClick: () => handleOpenModalState({ openDelete: true }),
                color: 'basic',
                icon: <DeleteIcon />,
              },
            ].filter(item => listKeyActions?.includes(item.key))}
        />
      </View>
  );
};
