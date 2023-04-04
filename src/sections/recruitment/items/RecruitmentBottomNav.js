import {useGetRecruitmentByIdQuery} from "../RecruitmentSlice";
import RecruitmentConfirmMultipleModal from "../modals/RecruitmentConfirmMultipleModal";
import {DeleteIcon, EditIcon} from "@/assets/ActionIcon";
import Content from "@/components/BaseComponents/Content";
import {ButtonDS} from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {DivProcessStatus, RecruitmentProcessStatus, RecruitmentWorkingForm} from "@/utils/enum";
import {Box, Divider, Drawer, IconButton, Link, Stack, Typography,} from "@mui/material";
import {useState, memo} from "react";
import {PATH_DASHBOARD} from "@/routes/paths";
import NextLink from "next/link";
import {handleExportExcel} from "@/sections/recruitment/helper/excel";
import {fDate} from "@/utils/formatTime";
import {LIST_EXPERIENCE_NUMBER} from "@/utils/formatString";

const RecruitmentBottomNav = ({selectedList, itemSelected, open, onClose, onOpenForm}) => {

  const {data: organization} = useGetRecruitmentByIdQuery(
      {
        Id: selectedList[0],
      },
      {skip: selectedList.length !== 1}
  );
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [, setTypeConfirmMultiple] = useState("");
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };

  const handleOpenFormWithCurrentNode = () => {
    onOpenForm();
  };

  const exportExcel = (data) => {
    const dataFormat = data?.map((recruitment, index) => {
      const minSalary = recruitment.minSalary ? recruitment.minSalary : '';
      const maxSalary = recruitment.maxSalary ? recruitment.maxSalary : '';
      return {
        index: index + 1,
        name: recruitment.name || "",
        jobPosition: recruitment?.jobPosition?.name || "",
        organizationName: recruitment.organizationName || "",
        processStatus: RecruitmentProcessStatus(recruitment.processStatus) || "",
        startDate: fDate(recruitment?.startDate) || "",
        endDate: fDate(recruitment?.endDate) || "",
        createdTime: fDate(recruitment?.createdTime) || "",

        numOfApplied: recruitment?.numOfApplied || 0,
        numberPosition: recruitment?.numberPosition || 0,
        numOfPass: recruitment?.numOfPass || 0,
        numOfAcceptOffer: recruitment?.numOfAcceptOffer || 0,

        ownerName: recruitment?.ownerName || "",
        coOwnerName: recruitment?.coOwners?.map(item => item?.name).join(', ') || "",

        recruitmentAddresses: recruitment.recruitmentAddresses.map(item => item?.provinceName).join(', ') || "",
        recruitmentWorkingForms: recruitment.recruitmentWorkingForms.map(i => RecruitmentWorkingForm(i?.workingForm)).join(', ') || "",

        salary: `${minSalary ? minSalary + '-' : minSalary}` + maxSalary,
        candidateLevelName: recruitment.candidateLevelName || "",
        workExperience: LIST_EXPERIENCE_NUMBER.find(item => item.value === recruitment.workExperience)?.name || "",
        language: recruitment.workingLanguageName || "Tiếng Việt",
      }
    });
    handleExportExcel(dataFormat)
  }

  return (
      <Drawer
          anchor={"bottom"}
          open={open}
          variant="persistent"
          onClose={onClose}
      >
        <Content>
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
                    <div style={{fontWeight: 500, fontSize: 14, marginRight: 16}}>
                      {DivProcessStatus(organization?.processStatus)}
                    </div>
                    <ButtonDS
                        type="submit"
                        variant="contained"
                        tittle="Chi tiết"
                        sx={{
                          fontWeight: '500',
                          marginRight: "16px",
                          textTransform: "none",
                          padding: "6px 11px",
                        }}
                        href={"recruitment/" + organization?.id}
                        icon={
                          <Iconify
                              icon={
                                "material-symbols:arrow-circle-right-outline-rounded"
                              }
                              width={20}
                              height={20}
                              color="#FDFDFD"
                              mr={1}
                          />
                        }
                    />
                    <ButtonDS
                        type="submit"
                        variant="contained"
                        tittle="Xem tin tuyển dụng"
                        sx={{
                          fontWeight: '500',
                          color: "#455570",
                          backgroundColor: "#F3F4F6",
                          boxShadow: "none",
                          ":hover": {
                            backgroundColor: "#E7E9ED",
                          },
                          marginRight: "12px",
                          textTransform: "none",
                          padding: "6px 11px",
                        }}
                        onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                        icon={
                          <Iconify
                              icon={"ri:share-box-line"}
                              width={20}
                              height={20}
                              color="#5C6A82"
                              mr={1}
                          />
                        }
                    />
                  </>
              )}
              <ButtonDS
                  type="submit"
                  variant="contained"
                  tittle="Đóng tin"
                  sx={{
                    fontWeight: '500',
                    color: "#455570",
                    backgroundColor: "#F3F4F6",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#E7E9ED",
                    },
                    marginRight: "12px",
                    textTransform: "none",
                    padding: "6px 11px",
                  }}
                  onClick={() => handleShowConfirmMultiple("CloseRecruitment")}
                  icon={
                    <Iconify
                        icon={"fluent-emoji-high-contrast:black-medium-small-square"}
                        width={20}
                        height={20}
                        color="#455570"
                        mr={1}
                    />
                  }
              />
              {selectedList.length === 1 && (
                  <NextLink href={PATH_DASHBOARD.recruitment.update(selectedList[0])} passHref>
                    <Link>
                      <IconButton size='small' sx={{color: '#8A94A5', mx: 1}}>
                        <EditIcon/>
                      </IconButton>
                    </Link>
                  </NextLink>
              )}
              <ButtonDS
                  type="submit"
                  sx={{
                    padding: "8px",
                    minWidth: "unset",
                    backgroundColor: "#fff",
                    boxShadow: "none",
                    ":hover": {
                      backgroundColor: "#EFF3F7",
                    },
                    textTransform: "none",
                    marginLeft: "12px",
                  }}
                  onClick={() => exportExcel(itemSelected)}
                  icon={
                    <Iconify
                        icon={"vscode-icons:file-type-excel"}
                        width={20}
                        height={20}
                    />
                  }
              />
              {selectedList.length === 1 && (
                  <>
                    <ButtonDS
                        type="submit"
                        sx={{
                          padding: "8px",
                          minWidth: "unset",
                          backgroundColor: "#fff",
                          boxShadow: "none",
                          ":hover": {
                            backgroundColor: "#EFF3F7",
                          },
                          textTransform: "none",
                          marginLeft: "12px",
                        }}
                        onClick={() => handleOpenFormWithCurrentNode(organization)}
                        icon={
                          <Iconify
                              icon={"ri:file-copy-fill"}
                              width={20}
                              height={20}
                              color="#5C6A82"
                          />
                        }
                    />
                    <IconButton
                        size="small"
                        sx={{color: "#1976D2", mx: 1}}
                        onClick={() => handleShowConfirmMultiple(organization)}
                    >
                      <DeleteIcon/>
                    </IconButton>
                  </>
              )}
            </Stack>
            <Box sx={{display: "flex", alignItems: "center"}}>
              <Typography style={{fontSize: '0.875rem', color: '#091E42', fontWeight: 500}}>Đã chọn: {selectedList.length}</Typography>
              <Divider
                  orientation="vertical"
                  flexItem
                  sx={{mx: 2, width: "2px", backgroundColor: "#E7E9ED"}}
              />
              <IconButton size="medium" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </Box>
          </Box>
        </Content>
        {showConfirmMultiple && (
            <RecruitmentConfirmMultipleModal
                showConfirmMultiple={showConfirmMultiple}
                setShowConfirmMultiple={setShowConfirmMultiple}
                organizationIds={selectedList}
                setSelected={selectedList}
            />
        )}
      </Drawer>
  );
};

export default memo(RecruitmentBottomNav);
