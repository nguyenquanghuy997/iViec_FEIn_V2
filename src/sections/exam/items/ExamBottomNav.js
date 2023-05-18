import {PERMISSIONS} from "@/config";
import {useGetExaminationByIdQuery} from "../ExamSlice";
import Content from "@/components/BaseComponents/Content";
import Iconify from "@/components/Iconify";
import useRole from "@/hooks/useRole";
import {
  ActionSwitchCheckedIcon,
  ActionSwitchUnCheckedIcon,
} from "@/sections/organization/component/Icon";
import {ButtonIcon} from "@/utils/cssStyles";
import {checkSameValue} from "@/utils/formatString";
import {Box, Divider, Drawer, Stack, Typography} from "@mui/material";
import React, {useState} from "react";
import {useMemo} from "react";
import ExamActiveModal from "@/sections/exam/modals/ExamActiveModal";
import ExamDeleteModal from "@/sections/exam/modals/ExamDeleteModal";
import {useTheme} from "@mui/material/styles";

const ExamBottumonNav = ({
                           selectedList,
                           open,
                           onClose,
                           setSelectedList,
                           itemSelected,
                           setItemSelected
                         }) => {
  const [showConfirmMultiple, setShowConfirmMultiple] = useState(false);
  const [typeConfirmMultiple, setTypeConfirmMultiple] = useState("");

  const onCloseModel = () => {
    setShowConfirmMultiple(false);
    setSelectedList([]);
    setItemSelected([]);
  };
  const theme = useTheme();
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_JOB_POS), []);

  const {data: exam} = useGetExaminationByIdQuery(
    {
      Id: selectedList[0],
    },
    {skip: selectedList.length !== 1}
  );
  const handleShowConfirmMultiple = (type) => {
    setTypeConfirmMultiple(type);
    setShowConfirmMultiple(true);
  };

  let item = itemSelected.map((p) => p.isActive);
  let itemApply = itemSelected.map((p) => p.numberOfRecruitmentApplied);

  function checkSameApply(arr) {
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] > 0) {
        return false;
      }
    }
    return true;
  }

  return (
    <Drawer
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
    >
      <Content sx={{padding: "20px 24px"}}>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Stack flexDirection="row" alignItems="center">
            {checkSameValue(item) && (
              <>
                {item.includes(true) ? (
                  <>
                    {
                      canEdit && <ButtonIcon
                        onClick={() => handleShowConfirmMultiple("status")}
                        sx={{
                          backgroundColor: "unset !important",
                        }}
                        icon={<ActionSwitchCheckedIcon/>}
                      />
                    }

                    <Typography
                      variant="body2"
                      sx={{color: "#388E3C", fontSize: 13}}
                    >
                      Đang hoạt động
                    </Typography>
                  </>
                ) : (
                  <>
                    {
                      canEdit && <ButtonIcon
                        onClick={() => handleShowConfirmMultiple("status")}
                        sx={{
                          backgroundColor: "unset !important",
                        }}
                        icon={<ActionSwitchUnCheckedIcon/>}
                      />
                    }

                    <Typography
                      variant="body2"
                      sx={{color: theme.palette.common.borderObject, fontSize: 13}}
                    >
                      Không hoạt động
                    </Typography>
                  </>
                )}
              </>
            )}
            {/*{itemSelected.length === 1 && itemSelected[0]?.recruitmentCount == 0 && canEdit && (*/}
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
                  color={theme.palette.common.borderObject}
                />
              }
            />
            {/*)}*/}
            {checkSameApply(itemApply) && canEdit && (
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
            )}
          </Stack>
          <Box sx={{display: "flex", alignItems: "center"}}>
            <Typography sx={{fontSize: 14, fontWeight: 600}}>
              Đã chọn: {selectedList.length}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{mx: 2, width: "2px", backgroundColor: theme.palette.common.neutral100}}
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
      {showConfirmMultiple && typeConfirmMultiple.includes("status") && (
        <ExamActiveModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          ids={selectedList}
          onClose={onCloseModel}
          isActivated={item[0]}
        />
      )}
      {showConfirmMultiple && typeConfirmMultiple.includes("delete") && (
        <ExamDeleteModal
          showConfirmMultiple={showConfirmMultiple}
          setShowConfirmMultiple={setShowConfirmMultiple}
          examIds={selectedList}
          onClose={onCloseModel}
          isActivated={exam?.isActivated}
        />
      )}
    </Drawer>
  );
};

export default React.memo(ExamBottumonNav);
