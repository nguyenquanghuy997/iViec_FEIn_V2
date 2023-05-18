import ReloadIcon from "../../../../assets/ReloadIcon";
import { Radio } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import IconButton from "@mui/material/IconButton";
import RadioGroup from "@mui/material/RadioGroup";
// import CloseIcon from '@mui/icons-material/Close';
import Typography from "@mui/material/Typography";
import {styled, useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          {/* <CloseIcon /> */}
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ModalReload() {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant="outlined"
        onClick={handleClickOpen}
        sx={{ width: "100%", mt: 2 }}
      >
        <ReloadIcon />
        <Typography ml={1}>Tái khai thác</Typography>
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
        sx={{
          "& .MuiPaper-rounded": {
            borderRadius: "6px!important",
            maxWidth: "600px",
            height: "58%",
            width: "100%",
          },
          "& .MuiDialogContent-root": {
            display: "flex",
            justifyContent: "center",
          },
          "& h2": {
            paddingTop: "60px",
          },
          // "& h2 >:first-child": {
          //   margin: "0 auto",
          //   width: "50px",
          //   height: "50px",
          //   display: "flex",
          //   justifyContent: "center",
          // },
          "& .MuiDialogActions-root": {
            padding: "16px 24px!important",
          },
        }}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          <ReloadIcon />
          <p
            style={{
              display: "flex",
              justifyContent: "center",
              color: theme.palette.common.blue700,
              marginTop: "17px",
            }}
          >
            Tái khai thác ứng viên
          </p>
        </BootstrapDialogTitle>
        <Divider />
        <DialogContent dividers>
          <FormControl>
            <FormLabel
              id="demo-radio-buttons-group-label"
              sx={{ color: theme.palette.common.neutral800, fontWeight: 600, fontSize: "14px",my:2 }}
            >
              Chọn bước tuyển dụng
            </FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="apply"
                control={<Radio />}
                label="Ứng tuyển"
              />
              <FormControlLabel
                value="competition"
                control={<Radio />}
                label="Thi tuyển"
              />
              <FormControlLabel
                value="result"
                control={<Radio />}
                label="Kết quả"
              />
              <FormControlLabel
                value="result"
                control={<Radio />}
                label="Kết quả"
              />
              <FormControlLabel
                value="result"
                control={<Radio color="default" />}
                label="Kết quả"
              />
              <FormControlLabel
                value="result"
                control={<Radio />}
                label="Kết quả"
              />
              <FormControlLabel
                value="result"
                control={<Radio />}
                label="Kết quả"
              />
            </RadioGroup>
          </FormControl>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button onClick={handleClose} sx={{color: theme.palette.common.neutral700}}>Hủy</Button>
          <Button variant="contained" onClick={handleClose} sx={{backgroundColor:theme.palette.common.blue700}}>
            Tái khai thác
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
}
