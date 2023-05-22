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
import {useTheme} from "@mui/material/styles";

const QuestionTransferModal = ({ questionGroupId, data, getData, isShowTransferQuestionGroup, onCloseTransfer }) => {
  const { enqueueSnackbar } = useSnackbar();

  const { data: { items: options = [] } = {} } = useGetQuestionGroupQuery({});
  const [selectedOption, setSelectedOption] = useState("");

  const [transferQuestion] = useTransferQuestionGroupMutation();
  const theme = useTheme();
  const onChangeQuestionGroup = (e) => {
    setSelectedOption(e.target.value);
  }

  const methods = useForm({});

  const { handleSubmit } = methods;

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
      enqueueSnackbar("Chuyển câu hỏi thất bại", {
        autoHideDuration: 1000,
        variant: "error",
      });
    }
  })

  useEffect(() => {
    setSelectedOption("");
  }, [isShowTransferQuestionGroup])

  return <DialogModelStyle
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
            data={options}
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
}

export default React.memo(QuestionTransferModal);