import { DialogActions, Divider } from "@mui/material";
import React, { useState } from "react";
import { useGetQuestionGroupQuery, useTransferQuestionGroupMutation } from "../ExamSlice";
import { View } from "@/components/FlexStyled";
import { Label } from "@/components/hook-form/style";
import { ButtonDS, SelectAutoCompleteDS } from "@/components/DesignSystem";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonCancel, DialogModelStyle, ButtonIcon } from "@/utils/cssStyles";
import Iconify from "@/components/Iconify";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useTheme } from "@mui/material/styles";
import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import { OrangeAlertIcon } from "@/sections/recruitment-form/icon/HeaderIcon";

const QuestionTransferModal = ({ questionGroupId, data, getData, isShowTransferQuestionGroup, onCloseTransfer }) => {
  const { enqueueSnackbar } = useSnackbar();
  const theme = useTheme();

  const { data: { items: options = [] } = {} } = useGetQuestionGroupQuery({ isActive: true });
  const [transferQuestion] = useTransferQuestionGroupMutation();

  const [selectedOption, setSelectedOption] = useState("");
  const [showDuplicateAlert, setShowDuplicateAlert] = useState(false);


  const methods = useForm({});

  const { handleSubmit } = methods;

  const onChangeQuestionGroup = (e) => {
    setSelectedOption(e.target.value);
  }

  const handleTranfer = handleSubmit(async () => {
    if (!selectedOption) {
      enqueueSnackbar("Chưa chọn nhóm câu hỏi", {
        autoHideDuration: 1000,
        variant: "error",
      });
      return;
    }
    try {
      await transferQuestion({
        questionIds: data,
        sourceQuestionGroupId: questionGroupId,
        destinationQuestionGroupId: selectedOption.id,
      }).unwrap()
      enqueueSnackbar("Chuyển câu hỏi thành công");
      getData();
    } catch {
      setShowDuplicateAlert(true)
      // enqueueSnackbar("Chuyển câu hỏi thất bại", {
      //   autoHideDuration: 1000,
      //   variant: "error",
      // });
    }
  })

  useEffect(() => {
    setSelectedOption("");
  }, [isShowTransferQuestionGroup])

  return <>
    <DialogModelStyle
      open={isShowTransferQuestionGroup}
      onClose={onCloseTransfer}
      sx={{
        "& .MuiPaper-root": {
          top: "0 !important",
        },
      }}
    >
      <FormProvider methods={methods}>
        <View
          style={{
            display: "flex",
            flexDirection: "unset",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "22px 24px",
          }}
        >
          <div style={{ color: theme.palette.common.neutral800, fontWeight: 600 }}>
            Chuyển nhóm câu hỏi
          </div>
          <div>
            <ButtonIcon
              onClick={onCloseTransfer}
              icon={
                <Iconify
                  width={20}
                  height={20}
                  icon="ic:baseline-close"
                  color={theme.palette.common.neutral700}
                />
              }
            ></ButtonIcon>
          </div>
        </View>

        <Divider />

        <View style={{ padding: 24 }}>
          <View mb={24}>
            <Label required={true}>{'Tên nhóm câu hỏi'}</Label>
            <SelectAutoCompleteDS
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onChange={onChangeQuestionGroup}
              data={options.filter(x => x.isActive && x.id != questionGroupId)}
              placeholder="Chọn nhóm câu hỏi"
              name={"questionGroup"}
            />
          </View>
        </View>

        <Divider />

        <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
          <ButtonCancel tittle="Hủy" onClick={onCloseTransfer} />
          <ButtonDS tittle="Chuyển" onClick={handleTranfer} />
        </DialogActions>
      </FormProvider>
    </DialogModelStyle>
    {showDuplicateAlert && (
      <ConfirmModal
        open={showDuplicateAlert}
        onClose={() => setShowDuplicateAlert(false)}
        icon={<OrangeAlertIcon />}
        title={"Câu hỏi đã tồn tại, không thể lưu"}
        titleProps={{
          sx: {
            color: theme.palette.common.orange800,
            fontWeight: 600,
            marginBottom: 1,
          },
        }}
        subtitle={
          "Trong nhóm này đã tồn tại câu hỏi khác có cùng nội dung trùng khớp với câu hỏi vừa tạo. Vui lòng kiểm tra lại hoặc thay đổi nội dung."
        }
        onSubmit={() => setShowDuplicateAlert(false)}
        btnCancelProps={{ title: "" }}
        btnConfirmProps={{
          title: "Tôi đã hiểu",
          color: "dark",
        }}
      />
    )}
  </>
}

export default React.memo(QuestionTransferModal);