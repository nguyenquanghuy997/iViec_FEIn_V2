import {
  useGetRecruitmentPipelineStatesByRecruitmentsQuery,
  useUpdateApplicantRecruitmentToNextStateMutation,
} from "../ApplicantFormSlice";
import { ButtonDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { Text } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
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
  useTheme,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { Fragment, useState } from "react";
import { useForm } from "react-hook-form";

const ApplicantTransferPipelineModal = ({
  isReExploiting,
  showConfirmMultiple,
  setShowConfirmMultiple,
  itemSelected,
  onClose,
  setActionId,
  setActionType,
  setActionShow,
}) => {
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({});
  const { handleSubmit } = methods;
  const [valueChecked, setValueChecked] = useState("");
  const handleChange = (event) => {
    setValueChecked(event.target.value);
  };
  const [tranfer] = useUpdateApplicantRecruitmentToNextStateMutation();
  const handleTranfer = handleSubmit(async () => {
    var resultId = items.filter((p) => p.pipelineStateType === 3)[0]?.id;
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
    useGetRecruitmentPipelineStatesByRecruitmentsQuery({
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
          <View opacity={0}>
            <ButtonIcon
              icon={
                <Iconify
                  width={20}
                  height={20}
                  icon="ic:baseline-close"
                  color="#455570"
                />
              }
            />
          </View>

          {isReExploiting ? (
            <View contentcenter>
              <SvgIcon>
                {
                  '<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30 5C43.8075 5 55 16.1925 55 30C55 43.8075 43.8075 55 30 55C16.1925 55 5 43.8075 5 30H10C10 41.045 18.955 50 30 50C41.045 50 50 41.045 50 30C50 18.955 41.045 10 30 10C23.125 10 17.06 13.4675 13.4625 18.75H20V23.75H5V8.75H10V15C14.56 8.925 21.8225 5 30 5Z" fill="#1976D2"/></svg>'
                }
              </SvgIcon>

              <Text
                mt={12}
                fontSize={16}
                color={theme.palette.common.blue700}
                fontWeight={"600"}
              >
                {"Tái khai thác ứng viên"}
              </Text>
            </View>
          ) : (
            <div style={{ color: "#172B4D", fontWeight: 600 }}>Chuyển bước</div>
          )}

          <div
            style={{ color: theme.palette.common.neutral800, fontWeight: 600 }}
          >
            Chuyển bước
          </div>
          <div>
            <ButtonIcon
              onClick={() => setShowConfirmMultiple(false)}
              icon={
                <Iconify
                  width={20}
                  height={20}
                  icon="ic:baseline-close"
                  color={theme.palette.common.neutral700}
                />
              }
            />
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
              {items?.map((p, index) => {
                if (p?.pipelineStateType == 3) {
                  return (
                    <Fragment key={index}>
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
                    </Fragment>
                  );
                } else if (p?.pipelineStateType != 4) {
                  return (
                    <FormControlLabel
                      key={index}
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
          <ButtonDS
            tittle={isReExploiting ? "Tái khai thác" : "Tiếp tục"}
            onClick={handleTranfer}
          />
        </DialogActions>
      </FormProvider>
    </DialogModelStyle>
  );
};

export default React.memo(ApplicantTransferPipelineModal);
