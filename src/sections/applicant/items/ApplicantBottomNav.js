import { handleExportExcel } from "../helper/excel";
import { RejectApplicantModal } from "../modals";
import ApplicantTransferPipelineModal from "../modals/ApplicantTransferPipelineModal";
import ApplicantTransferRecruitmentModal from "../modals/ApplicantTransferRecruitmentModal";
import Content from "@/components/BaseComponents/Content";
import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  Address,
  MaritalStatus,
  PipelineStateType,
  Sex,
  YearOfExperience,
} from "@/utils/enum";
import { fDate } from "@/utils/formatTime";
import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";

const ApplicantBottomNav = ({
  selectedList,
  open,
  onClose,
  setselectedList,
  itemSelected,
}) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };
  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setselectedList([]);
    setActionShow(false);
  };
  // const handleOpenFormWithCurrentNode = () => {
  //   onOpenForm();
  // };
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
    <Drawer
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content sx={{ padding: "20px 24px" }}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {selectedList.length === 1 && (
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
                      color="#FDFDFD"
                      mr={1}
                    />
                  }
                />
                <ButtonIcon
                  sx={{
                    marginRight: "16px",
                  }}
                  href={
                    "applicant/" +
                    itemSelected[0]?.applicantId +
                    "?co=" +
                    itemSelected[0]?.correlationId +
                    "&&or=" +
                    itemSelected[0]?.organizationId +
                    "&&re=" +
                    itemSelected[0]?.recruitmentId
                  }
                  icon={
                    <Iconify
                      icon={"ri:eye-2-line"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />

                <ButtonIcon
                  sx={{
                    marginRight: "16px",
                  }}
                  // onClick={() => handleOpenFormWithCurrentNode(organization)}
                  icon={
                    <Iconify
                      icon={"ri:edit-2-fill"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />
                <ButtonIcon
                  sx={{
                    marginRight: "16px",
                  }}
                  onClick={() => handleShowConfirmMultiple("tranferRe")}
                  // onClick={() => exportExcel(itemSelected)}
                  icon={
                    <Iconify
                      icon={"ri:share-forward-2-fill"}
                      width={20}
                      height={20}
                      color="#5C6A82"
                    />
                  }
                />
              </>
            )}
            <ButtonIcon
              sx={{
                marginRight: "16px",
              }}
              // onClick={() => handleOpenFormWithCurrentNode(organization)}
              onClick={() => exportExcel(itemSelected)}
              icon={
                <Iconify
                  icon={"vscode-icons:file-type-excel"}
                  width={20}
                  height={20}
                />
              }
            />
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }}
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
                  color="#5C6A82"
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
    </Drawer>
  );
};

export default React.memo(ApplicantBottomNav);
