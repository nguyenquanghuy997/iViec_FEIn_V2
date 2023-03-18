import React from 'react';
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
import {View} from "@/components/DesignSystem/FlexStyled";
import {ButtonCancelStyle} from "@/sections/applicant/style";

export const RecruitmentApplicationChooseStage = ({setStage, show, setShow}) => {
  const onClose = () => {
    setShow(false);
  }

  const handleAccept = () => {
    setStage();
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
      <DialogContent dividers>
        <Typography variant={"subtitle1"} color={"#172B4D"}>Chọn bước tuyển dụng</Typography>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue="0"
          name="radio-buttons-group"
        >
          <FormControlLabel value="0" control={<Radio/>} label="Ứng tuyển"/>
          <FormControlLabel value="1" control={<Radio/>} label="Thi tuyển"/>
          <FormControlLabel value="2" control={<Radio/>} label="Phỏng vấn máy"/>
          <FormControlLabel value="3" control={<Radio/>} label="Phỏng vấn"/>
          <FormControlLabel value="4" control={<Radio/>} label="Kết quả - Đạt"/>
          <FormControlLabel value="5" control={<Radio/>} label="Kết quả - Cân nhắc"/>
          <FormControlLabel value="6" control={<Radio/>} label="Kết quả - Loại"/>
        </RadioGroup>
      </DialogContent>
      <DialogActions>
        <ButtonDS
          type="submit"
          variant="contained"
          tittle={"Tiếp tục"}
          onClick={handleAccept}
        />
        <View width={8}/>
        <ButtonCancelStyle onClick={onClose}>Hủy</ButtonCancelStyle>
      </DialogActions>
    </Dialog>
  )
}