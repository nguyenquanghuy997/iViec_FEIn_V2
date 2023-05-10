import { DialogActions, Divider } from "@mui/material";
import React, { useState } from "react";
import { useGetQuestionGroupQuery } from "../ExamSlice";
import { View } from "@/components/FlexStyled";
import { Label } from "@/components/hook-form/style";
import { ButtonDS, SelectAutoCompleteDS } from "@/components/DesignSystem";
import { FormProvider, useForm } from "react-hook-form";
import { ButtonCancel, DialogModelStyle, ButtonIcon } from "@/utils/cssStyles";
import Iconify from "@/components/Iconify";


const QuestionTransferModal = ({ isShowTransferQuestionGroup, onCloseTransfer }) => {
  const { data: { items: options = [] } = {} } = useGetQuestionGroupQuery({});
  const [selectedOption, setSelectedOption] = useState("");

  const onChangeQuestionGroup = (e) => {
    setSelectedOption(e.target.value);
  }

  const methods = useForm({

  });

  const { handleSubmit } = methods;

  const handleTranfer = handleSubmit(async () => {
      // update data in here
  })

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
        <div style={{ color: "#172B4D", fontWeight: 600 }}>
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
                color="#455570"
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
        <ButtonDS tittle="Duyệt" onClick={handleTranfer} />
      </DialogActions>
    </FormProvider>
  </DialogModelStyle>
}

export default React.memo(QuestionTransferModal);