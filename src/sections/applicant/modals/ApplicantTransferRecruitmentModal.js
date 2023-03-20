import {
  useAddApplicantRecruitmentMutation,
  useGetRecruitmentPipelineStatesByRecruitmentQuery,
  useGetRecruitmentsQuery,
} from "../ApplicantFormSlice";
import {
  ButtonDS,
  SelectAutoCompleteDS,
} from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { FormProvider } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import {
  ButtonCancel,
  ButtonIcon,
  DialogModelStyle,
} from "@/utils/cssStyles";
import { PipelineStateType } from "@/utils/enum";
import {
  DialogActions,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, {  useState } from "react";
import { useForm } from "react-hook-form";

const ApplicantTransferRecruitmentModal = ({
  showConfirmMultiple,
  setShowConfirmMultiple,
  applicantIds,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  // const [rejectRecruitment] = useRejectRecruitmentMutation();

  // const handleApproveRecruitment = async () => {
  //   try {
  //     await internalApprovalRecruitments({ ids: recruitmentIds }).unwrap();
  //     enqueueSnackbar("Duyệt tin thành công!");
  //     onClose();
  //   } catch (err) {
  //     enqueueSnackbar(errorMessagesRe[`${err}`], {
  //       autoHideDuration: 1000,
  //       variant: "error",
  //     });
  //   }
  // };

  const methods = useForm({

  });
  const { handleSubmit } = methods;

  // render
  const renderTitle = (title, required) => {
    return <Label required={required}>{title}</Label>;
  };
  const [selectedOption, setSelectedOption] = useState("");

  const { data: { items: options = [] } = {} } = useGetRecruitmentsQuery({});
  const onChangeRecruiment = (e) => {
    setSelectedOption(e.target.value);
  };
  const [valueChecked, setValueChecked] = useState("");
  const handleChange = (event) => {
    setValueChecked(event.target.value);
  };

  const { data: { items = [] } = {} } =
    useGetRecruitmentPipelineStatesByRecruitmentQuery({
      RecruitmentId: selectedOption?.id,
    });
  const [tranfer] = useAddApplicantRecruitmentMutation();
  const handleTranfer = handleSubmit(async () => {
    debugger
    var resultId = items.filter((p) => p.pipelineStateType == 3)[0]?.id;
    if (valueChecked == 2) {
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
          applicantIds: applicantIds,
          recruitmentId: selectedOption?.id,
          recruitmentPipelineStateId: recruitmentPipelineStateId,
          pipelineStateResultType: resultType,
        };
        await tranfer(body).unwrap();
        enqueueSnackbar("Thêm vào tin tuyển dụng thành công");
        onClose();
      } catch (err) {
        enqueueSnackbar("Thêm vào tin tuyển dụng thất bại", {
          autoHideDuration: 1000,
          variant: "error",
        });
      }
    }
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
          <div style={{ color: "#172B4D", fontWeight: 600 }}>
            Thêm vào tin tuyển dụng khác
          </div>
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
          <View mb={24}>
            <Label style={{ fontWeight: "600" }}>1. Chọn tin tuyển dụng</Label>
            {renderTitle("Tin tuyển dụng", true)}
            <SelectAutoCompleteDS
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              onChange={onChangeRecruiment}
              data={options}
              placeholder="Chọn loại bước"
              name={"stageType"}
            />
          </View>
          <Divider />
          <View>
            <Label style={{ fontWeight: "600", marginTop: 24 }}>
              2. Chọn bước tuyển dụng
            </Label>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              // defaultValue={itemSelected?.recruitmentPipelineStateId}
              name="radio-buttons-group"
              onChange={handleChange}
            >
              {items &&
                items?.map((p) => {
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

          <ButtonDS tittle="Duyệt" onClick={handleTranfer} />
        </DialogActions>
      </FormProvider>
    </DialogModelStyle>
  );
};

export default React.memo(ApplicantTransferRecruitmentModal);
