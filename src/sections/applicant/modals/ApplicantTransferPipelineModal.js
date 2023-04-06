import {
  useGetRecruitmentPipelineStatesByRecruitment1Query,
  useUpdateApplicantRecruitmentToNextStateMutation,
} from "../ApplicantFormSlice";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import { ButtonCancel, ButtonIcon, DialogModelStyle } from "@/utils/cssStyles";
import { PipelineStateType } from "@/utils/enum";
import {
  DialogActions,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const ApplicantTransferPipelineModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  itemSelected,
  onClose,
  setActionId,
  setActionType,
  setActionShow,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({});
  const { handleSubmit } = methods;
  const [valueChecked, setValueChecked] = useState("");
  const handleChange = (event) => {
    setValueChecked(event.target.value);
  };
  const [tranfer] = useUpdateApplicantRecruitmentToNextStateMutation();
  const handleTranfer = handleSubmit(async () => {
    var resultId = items.filter((p) => p.pipelineStateType == 3)[0]?.id;
    if (valueChecked == 0 || valueChecked == 1 || valueChecked == 2) {
      setActionId(resultId);
      setActionType(valueChecked);
      setActionShow(true);

      setShowConfirmMultiple(false);
    } else {
      let recruitmentPipelineStateId = valueChecked;
      let resultType = null;
      if (valueChecked == 0 || valueChecked == 1) {
        resultType = valueChecked;
        recruitmentPipelineStateId = resultId;
      }
      try {
        const body = {
          applicantId: itemSelected?.applicantId,
          recruitmentId: itemSelected?.recruitmentId,
          recruitmentPipelineStateId: recruitmentPipelineStateId,
          pipelineStateResultType: resultType,
        };
        await tranfer(body).unwrap();
        enqueueSnackbar("Chuyển bước tuyển dụng thành công");
        onClose();
      } catch (err) {
        enqueueSnackbar("Chuyển bước tuyển dụng thất bại", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    }
  });
  // render
  const renderTitle = (title, required) => {
    return (
      <Label
        style={{ fontWeight: 600, fontSize: 16, textAlign: "center" }}
        required={required}
      >
        {title}
      </Label>
    );
  };

  const { data: { items: items = [] } = {} } =
    useGetRecruitmentPipelineStatesByRecruitment1Query({
      RecruitmentId: itemSelected?.recruitmentId,
    });

  return (
    <DialogModelStyle
      open={showConfirmMultiple}
      onClose={() => setShowConfirmMultiple(false)}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
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
          <div style={{ color: "#172B4D", fontWeight: 600 }}>Chuyển bước</div>
          <div>
            <ButtonIcon
              onClick={() => setShowConfirmMultiple(false)}
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
        <View p={24}>
          <View style={{ margin: "0 auto" }}>
            {renderTitle("Chọn bước tuyển dụng", true)}

            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={itemSelected?.recruitmentPipelineStateId}
              name="radio-buttons-group"
              onChange={handleChange}
            >
              {items?.map((p) => {
                if (p?.pipelineStateType == 3) {
                  return (
                    <>
                      <FormControlLabel
                        value={0}
                        control={<Radio />}
                        label={PipelineStateType(p?.pipelineStateType, 0)}
                      />
                      <FormControlLabel
                        value={1}
                        control={<Radio />}
                        label={PipelineStateType(p?.pipelineStateType, 1)}
                      />
                      <FormControlLabel
                        value={2}
                        control={<Radio />}
                        label={PipelineStateType(p?.pipelineStateType, 2)}
                      />
                    </>
                  );
                } else if (p?.pipelineStateType != 4) {
                  return (
                    <FormControlLabel
                      value={p?.id}
                      control={<Radio />}
                      label={PipelineStateType(p?.pipelineStateType)}
                    />
                  );
                }
              })}
            </RadioGroup>
          </View>
        </View>
        <DialogActions sx={{ borderTop: "1px solid #E7E9ED" }}>
          <ButtonCancel tittle="Hủy" onClick={onClose} />
          <ButtonDS tittle="Tiếp tục" onClick={handleTranfer} />
        </DialogActions>
      </FormProvider>
    </DialogModelStyle>
  );
};

export default React.memo(ApplicantTransferPipelineModal);
