import { useDeleteApplicantsMutation } from "../ApplicantFormSlice";
import { handleExportExcel } from "../helper/excel";
import ApplicantTransferPipelineModal from "../modals/ApplicantTransferPipelineModal";
import ApplicantTransferRecruitmentModal from "../modals/ApplicantTransferRecruitmentModal";
import { RejectApplicantModal } from "../modals/RejectApplicantModal";
import { DeleteIcon } from "@/assets/ActionIcon";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import Content from "@/components/BaseComponents/Content";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import { AlertIcon } from "@/sections/organization/component/Icon";
import { RecruitmentApplicantCreate } from "@/sections/recruitment/modals/RecruitmentApplicantCreate";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import {
  Address,
  MaritalStatus,
  PipelineStateType,
  Sex,
  YearOfExperience,
} from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import {
  Box,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { useMemo } from "react";

const ApplicantBottomNav = ({
  selectedList,
  open,
  onClose,
  setSelectedList,
  itemSelected,
}) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [showModelCreate, setShowModelCreate] = useState(false);
  const [modelApplication, setModelApplication] = useState(undefined);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");
  const theme = useTheme();
  const { canAccess } = useRole();
  const canView = useMemo(() => canAccess(PERMISSIONS.VIEW_CDD), []);
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_CDD), []);

  const dispatch = useDispatch();
  const toggleModalState = useSelector((state) => state.modalReducer.openState);
  const { openDelete } = toggleModalState;
  const handleOpenModalState = (data) =>
    dispatch(modalSlice.actions.openStateModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());
  const [deleteApplicants] = useDeleteApplicantsMutation();

  const handleDeleteApplicantsSubmit = async (data) => {
    try {
      await deleteApplicants({ applicationIds: data }).unwrap();
      enqueueSnackbar("Xóa ứng viên thành công!", {
        autoHideDuration: 1000,
      });
      setSelectedList([]);
      handleCloseModal();
    } catch (e) {
      enqueueSnackbar(
        "Xóa ứng viên không thành công. Vui lòng kiểm tra và thử lại!",
        {
          autoHideDuration: 1000,
          variant: "error",
        }
      );
      throw e;
    }
  };
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };
  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setActionShow(false);
    setSelectedList([]);
  };

  useEffect(() => {
    if (!showModelCreate) {
      onCloseModel();
    }
  }, [showModelCreate]);

  const handleOpenEditForm = () => {
    setModelApplication({
      ...modelApplication,
      id: itemSelected[0].applicantId,
      recruitmentId: itemSelected[0].recruitmentId,
      recruitmentTitle: itemSelected[0].recruitmentName,
    });
    setShowModelCreate(true);
  };

  const exportExcel = (data) => {
    const dataFormat = data?.map((applicant, index) => {
      return {
        index: index + 1,
        fullName: applicant.fullName || "",
        dateOfBirth: fDate(applicant.dateOfBirth) || "",
        sex: Sex(applicant.sex) || "",
        email: applicant.email || "",
        phoneNumber: applicant.phoneNumber || "",
        creatorName: applicant.creatorName || "",
        createdTime: fDate(applicant.createdTime) || "",
        jobSourceName: applicant.jobSourceName || "",
        jobCategories: applicant.jobCategories[0]?.name || "",
        identityNumber: `${applicant.identityNumber}` || "",
        maritalStatus: MaritalStatus(applicant.maritalStatus) || "",
        height: applicant.height || "",
        weight: applicant.weight || "",
        livingAddress: Address(applicant.livingAddress) || "",
        skills: applicant.applicantSkills[0]?.name || "",
        expectedSalary:
          `${applicant?.expectedSalaryFrom} - ${applicant?.expectedSalaryTo}` ||
          "",
        expectedWorkingAddress: Address(applicant.expectedWorkingAddress) || "",
        yearOfExperience: YearOfExperience(applicant.yearOfExperience) || "",
        homeTower: Address(applicant.homeTower) || "",
        education: applicant.education || "",
        experience: applicant.experience || "",
        applyTime: fDate(applicant.createdTime) || "",
        ownerName: applicant.ownerName || "",
        recruitmentName: applicant.recruitmentName || "",
        organizationName: applicant.organizationName || "",
        jobPosition: "No data",
        recruitmentPipelineState:
          PipelineStateType(applicant.recruitmentPipelineState, 1) || "",
        averageScore: "No data",
        testDay: "No data",
        point: "No data",
        interviewDate1: "No data",
        interviewResult1: "No data",
        interviewDate2: "No data",
        interviewResult2: "No data",
        interviewDate3: "No data",
        interviewResult3: "No data",
        interviewDate4: "No data",
        interviewResult4: "No data",
        interviewDate5: "No data",
        interviewResult5: "No data",
      };
    });
    handleExportExcel(dataFormat);
  };

  const [actionId, setActionId] = useState();
  const [actionType, setActionType] = useState();
  const [actionShow, setActionShow] = useState(false);

  return (
    <BottomNavStyle
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content className="block-bottom">
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {selectedList.length === 1 && canEdit && (
              <>
                <ButtonDS
                  tittle="Chuyển bước tuyển dụng"
                  sx={{
                    marginRight: "16px",
                    padding: "6px 11px",
                  }}
                  onClick={() => handleShowConfirmMultiple("tranferPipeline")}
                  icon={
                    <Iconify
                      icon={"ci:transfer"}
                      width={20}
                      height={20}
                      color={theme.palette.common.white}
                      mr={1}
                    />
                  }
                />
                {canEdit && (
                  <ButtonIcon
                    onClick={() =>
                      router.push(
                        {
                          pathname: PATH_DASHBOARD.applicant.view(
                            itemSelected[0]?.applicantId
                          ),
                          query: {
                            recruitmentId: itemSelected[0]?.recruitmentId,
                            applicantId: itemSelected[0]?.applicantId,
                          },
                        },
                        undefined,
                        { shallow: true }
                      )
                    }
                    tooltip="Xem"
                    icon={
                      <Iconify
                        icon={"ri:eye-2-line"}
                        width={20}
                        height={20}
                        color={theme.palette.common.neutral600}
                      />
                    }
                    sx={{
                      marginRight: "16px",
                    }}
                  />
                )}

                {canEdit && (
                  <ButtonIcon
                    onClick={() => handleOpenEditForm()}
                    tooltip="Chỉnh sửa"
                    icon={
                      <Iconify
                        icon={"ri:edit-2-fill"}
                        width={20}
                        height={20}
                        color={theme.palette.common.borderObject}
                      />
                    }
                    sx={{
                      marginRight: "16px",
                    }}
                  />
                )}

                {canEdit && (
                  <ButtonIcon
                    onClick={() => handleShowConfirmMultiple("tranferRe")}
                    tooltip="Thêm vào tin tuyển dụng"
                    icon={
                      <Iconify
                        icon={"ri:share-forward-2-fill"}
                        width={20}
                        height={20}
                        color={theme.palette.common.borderObject}
                      />
                    }
                    sx={{
                      marginRight: "16px",
                    }}
                  />
                )}
              </>
            )}
            {canEdit && canView && (
              <ButtonIcon
                onClick={() => exportExcel(itemSelected)}
                tooltip="Excel"
                icon={
                  <Iconify
                    icon={"vscode-icons:file-type-excel"}
                    width={20}
                    height={20}
                  />
                }
                sx={{
                  marginRight: "16px",
                }}
              />
            )}

            {canEdit && (
              <ButtonIcon
                onClick={() => handleOpenModalState({ openDelete: true })}
                tooltip="Xóa"
                icon={<DeleteIcon />}
                sx={{
                  marginRight: "16px",
                }}
              />
            )}
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 2,
                width: "2px",
                backgroundColor: theme.palette.common.neutral100,
              }}
            />
            <ButtonIcon
              sx={{
                textTransform: "none",
              }}
              onClick={onClose}
              icon={
                <Iconify
                  icon={"ic:baseline-close"}
                  width={20}
                  height={20}
                  color={theme.palette.common.borderObject}
                />
              }
            />
          </Box>
        </Box>
      </Content>

      {showConfirmMultiple &&
        typeConfirmMultiple.includes("tranferPipeline") && (
          <ApplicantTransferPipelineModal
            showConfirmMultiple={showConfirmMultiple}
            setShowConfirmMultiple={setShowConfirmMultiple}
            onClose={onCloseModel}
            itemSelected={itemSelected[0]}
            setActionId={setActionId}
            setActionType={setActionType}
            setActionShow={setActionShow}
          />
        )}
      {showConfirmMultiple && typeConfirmMultiple.includes("tranferRe") && (
        <ApplicantTransferRecruitmentModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          onClose={onCloseModel}
          applicantIds={[itemSelected[0]?.applicantId]}
          itemSelected={itemSelected[0]}
        />
      )}
      {actionShow && (
        <RejectApplicantModal
          applicantId={itemSelected[0]?.applicantId}
          recruimentId={itemSelected[0]?.recruitmentId}
          actionId={actionId}
          actionType={actionType}
          show={actionShow}
          setShow={setActionShow}
          onClose={onCloseModel}
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
              Xác nhận xóa ứng viên
            </Typography>
          }
          subtitle={
            selectedList.length > 1 ? (
              <>Bạn có chắc chắn muốn xóa {selectedList.length} ứng viên?</>
            ) : (
              <>
                Bạn có chắc chắn muốn xóa ứng viên
                <span className="subtitle-confirm-name">
                  {itemSelected[0]?.name}
                </span>{" "}
                ?
              </>
            )
          }
          data={selectedList}
          onSubmit={handleDeleteApplicantsSubmit}
          btnCancelProps={{
            title: "Hủy",
          }}
          btnConfirmProps={{
            title: "Xác nhận",
          }}
        />
      )}

      <RecruitmentApplicantCreate
        show={showModelCreate}
        setShow={setShowModelCreate}
        data={modelApplication}
        setData={setModelApplication}
      />
      {/* {showConfirmMultiple && typeConfirmMultiple.includes("reject") && (
        <RecruitmentAdRejectModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentId={selectedList[0]}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("preview") && (
        <RecruitmentAdPreviewModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentId={selectedList[0]}
          onClose={onCloseModel}
          handleShowConfirmMultiple={() => handleShowConfirmMultiple("reject")}
        />
      )} */}
    </BottomNavStyle>
  );
};

export default React.memo(ApplicantBottomNav);
