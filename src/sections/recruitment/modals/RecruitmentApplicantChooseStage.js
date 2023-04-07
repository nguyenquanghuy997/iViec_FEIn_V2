import React, { Fragment, useState } from 'react';
import {
  Dialog,
  DialogActions,
  DialogContent,
  FormControlLabel,
  Grid,
  Radio,
  RadioGroup,
  Typography
} from "@mui/material";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {PipelineStateType} from "@/utils/enum";

export const RecruitmentApplicantChooseStage = ({data, setStage, show, setShow}) => {
  const onClose = () => {
    setValueChecked(undefined);
    setShow(false);
  }
  const [valueChecked, setValueChecked] = useState(undefined);
  
  const handleChange = (event) => {
    setValueChecked(event.target.value);
  };
  
  const handleAccept = () => {
    if (valueChecked.indexOf(",")) {
      let valueSplit = valueChecked.split(",");
      setStage(model => ({...model, stage: valueSplit[0], stageResult: valueSplit[1]}))
    } else {
      setStage(model => ({...model, stage: valueChecked}));
    }
    onClose();
  };
  
  return (
    <Dialog
      open={show}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      maxWidth={"xs"}
      fullWidth={true}
    >
      <Grid px={"24px"} py={"12px"} container alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
        <Grid item>
          <Typography variant={"subtitle1"} color={"#172B4D"}>Thêm ứng viên</Typography>
        </Grid>
        <Grid item>
          <ButtonDS
            type="submit"
            sx={{
              backgroundColor: "#fff",
              boxShadow: "none",
              ":hover": {
                backgroundColor: "#EFF3F7",
              },
              textTransform: "none",
              padding: "12px",
              minWidth: "unset",
            }}
            onClick={onClose}
            icon={
              <Iconify
                icon={"mi:close"}
                width={20}
                height={20}
                color="#5C6A82"
              />
            }
          />
        </Grid>
      </Grid>
      <DialogContent dividers sx={{paddingLeft: "30%"}}>
        <Typography variant={"subtitle1"} color={"#172B4D"}>Chọn bước tuyển dụng</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          onChange={handleChange}
        >
          {data?.filter(item => item.pipelineStateType !== 4).map(item => (
            item.pipelineStateType === 3 ? <Fragment key={item.id}>
                <FormControlLabel value={item.id+ ",0"}
                                  sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                                  control={<Radio/>}
                                  label={PipelineStateType(item.pipelineStateType, 0)}/>
                <FormControlLabel value={item.id + ",1"}
                                  sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                                  control={<Radio/>}
                                  label={PipelineStateType(item.pipelineStateType, 1)}/>
                <FormControlLabel value={item.id + ",2"}
                                  sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                                  control={<Radio/>}
                                  label={PipelineStateType(item.pipelineStateType, 2)}/>
              </Fragment> :
              <FormControlLabel key={item.id} value={item.id}
                                sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                                control={<Radio/>}
                                label={PipelineStateType(item.pipelineStateType)}/>
          ))}
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <ButtonCancelStyle onClick={onClose} sx={{marginRight: "8px", marginLeft: "unset"}}>Hủy</ButtonCancelStyle>
        <ButtonDS
          type="submit"
          variant="contained"
          tittle={"Tiếp tục"}
          isDisabled={!valueChecked}
          onClick={handleAccept}
        />
      </DialogActions>
    </Dialog>
  )
}