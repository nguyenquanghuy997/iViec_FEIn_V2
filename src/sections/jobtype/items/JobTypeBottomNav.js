import { useGetJobPositionByIdQuery } from "../jobTypeSlice";
import { JobTypeFormModal } from "../modals";
import JobTypeActiveModal from "../modals/JobTypeActiveModal";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import { ButtonIcon } from "@/utils/cssStyles";
import { Box, Divider, Drawer, Stack, Typography } from "@mui/material";
import React, { useState } from "react";
import JobTypeDeleteModal from "../modals/JobTypeDeleteModal";

const JobTypeBottomNav = ({ selectedList, open, onClose, setselectedList, itemSelected }) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");

  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setselectedList([]);
  };

  const { data: jobType } = useGetJobPositionByIdQuery(
    {
      Id: selectedList[0],
    },
    { skip: selectedList.length !== 1 }
  );

  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };

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
                {jobType?.isActivated &&
                itemSelected[0]?.numberOfRecruitmentApplied == 0 ? (
                  <>
                    <ButtonIcon
                      onClick={() => handleShowConfirmMultiple("status")}
                      sx={{
                        backgroundColor: "unset !important",
                      }}
                      icon={<ActionSwitchCheckedIcon />}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#388E3C", fontSize: 13 }}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    <ButtonIcon
                      onClick={() => handleShowConfirmMultiple("status")}
                      sx={{
                        backgroundColor: "unset !important",
                      }}
                      icon={<ActionSwitchUnCheckedIcon />}
                    />
                    <Typography
                      variant="body2"
                      sx={{ color: "#5C6A82", fontSize: 13 }}
                    >
                      Dừng hoạt động
                    </Typography>
                  </>
                )}
                {itemSelected[0]?.numberOfRecruitmentApplied == 0 && (
                  <>
                    <ButtonIcon
                      sx={{
                        marginLeft: "16px",
                      }}
                      onClick={() => handleShowConfirmMultiple("edit")}
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
                        marginLeft: "16px",
                      }}
                      onClick={() => handleShowConfirmMultiple("delete")}
                      icon={
                        <Iconify
                          icon={"material-symbols:delete-outline-rounded"}
                          width={20}
                          height={20}
                          color="#D32F2F"
                        />
                      }
                    />
                  </>
                )}
              </>
            )}
          </Stack>
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <Typography sx={{ fontSize: 14, fontWeight: 600 }}>
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
      {showConfirmMultiple && typeConfirmMultiple.includes("status") && (
        <JobTypeActiveModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          ids={selectedList}
          onClose={onCloseModel}
          isActivated={jobType?.isActivated}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("edit") && (
        <JobTypeFormModal
          show={showConfirmMultiple}
          setShow={setShowConfirmMultiple}
          onClose={onCloseModel}
          data={jobType}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("delete") && (
        <JobTypeDeleteModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          jobTypeIds={selectedList}
          onClose={onCloseModel}
          isActivated={jobType?.isActivated}
        />
      )}
      {/* {showConfirmMultiple && typeConfirmMultiple.includes("approve") && (
        <RecruitmentAdConfirmMultipleModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentIds={selectedList}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("reject") && (
        <RecruitmentAdRejectModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          recruitmentId={selectedList[0]}
          onClose={onCloseModel}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("preview") && (
        // <RecruitmentAdRejectModal
        //   showConfirmMultiple={showConfirmMultiple}
        //   setShowConfirmMultiple={setShowConfirmMultiple}
        //   recruitmentId={selectedList[0]}
        //   setselectedList={setselectedList}
        // />
        <RecruitmentAdPreviewModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          onClose={onCloseModel}
        />
      )} */}
    </Drawer>
  );
};

export default React.memo(JobTypeBottomNav);
