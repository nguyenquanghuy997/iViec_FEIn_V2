import React, {useState} from 'react';
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

export const RecruitmentApplicantChooseStage = ({setStage, show, setShow}) => {
  const onClose = () => {
    setShow(false);
  }
  const [valueChecked, setValueChecked] = useState("0");

  const handleChange = (event) => {
    setValueChecked(event.target.value);
  };

  const handleAccept = () => {
    setStage(model => ({...model, stage: valueChecked}));
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
          <FormControlLabel value="0" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>} label="Ứng tuyển"/>
          <FormControlLabel value="1" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>} label="Thi tuyển"/>
          <FormControlLabel value="2" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>}
                            label="Phỏng vấn máy"/>
          <FormControlLabel value="3" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>} label="Phỏng vấn"/>
          <FormControlLabel value="4" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>}
                            label="Kết quả - Đạt"/>
          <FormControlLabel value="5" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>}
                            label="Kết quả - Cân nhắc"/>
          <FormControlLabel value="6" sx={{'& .MuiFormControlLabel-label': {fontSize: "14px", fontWeight: 500}}}
                            control={<Radio/>}
                            label="Kết quả - Loại"/>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <ButtonCancelStyle onClick={onClose} sx={{marginRight: "8px", marginLeft: "unset"}}>Hủy</ButtonCancelStyle>
        <ButtonDS
          type="submit"
          variant="contained"
          tittle={"Tiếp tục"}
          onClick={handleAccept}
        />
      </DialogActions>
    </Dialog>
  )
}