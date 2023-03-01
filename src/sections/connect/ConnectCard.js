import InforIcon from "../../assets/InforIcon";
import ConnectForm from "./ConnectForm";
import DeleteIcon from "@/assets/DeleteIcon";
import { FormProvider } from "@/components/hook-form";
import ConnectDialog from "@/sections/connect/ConnectDialog";
import { ConnectCardStyle } from "@/sections/connect/style";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActionArea,
  CardContent,
  Divider,
  Tooltip,
} from "@mui/material";
import { FormControlLabel, Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { alpha, styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Controller, useFormContext } from "react-hook-form";

const GreenSwitch = styled(Switch)(({ theme }) => ({
  "& .MuiSwitch-switchBase.Mui-checked": {
    color: "#388E3C",
    "&:hover": {
      backgroundColor: alpha("#A5D6A7", theme.palette.action.hoverOpacity),
    },
  },
  "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
    backgroundColor: "#388E3C",
  },
}));

const SwitchForm = ({ name, handleChange, ...other }) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            console.log(field);
            return (
              <GreenSwitch
                {...field}
                checked={field.value}
                onChange={handleChange}
                inputProps={{ "aria-label": "controlled" }}
              />
            );
          }}
        />
      }
      {...other}
    />
  );
};
const ConnectCardItem = ({ account, color }) => {
  const [checked, setChecked] = useState(false);
  const methods = useForm({
    defaultValues: { isChecked: true },
  });
  const accounts = [
    { id: 1, mail: "Dinhtienthanh1702tt@gmail.com" },
    { id: 2, mail: "Dinfsatyuyert702tt@gmail.com" },
  ];
  // const { setError, handleSubmit, watch } = methods;
  // const disabled = watch("checked");

  return (
    <FormProvider methods={methods}>
      <Card
        sx={{
          mb: 2,
          borderRadius: "6px",
          borderLeft: `3px solid ${color}`,
          px: 3,
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <CardMedia
              component="img"
              sx={{ width: 80, height: 40, justifyContent: "center" }}
              image={account?.img}
              alt="Live from space album cover"
            />
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  "& .MuiTypography-root": { display: "contents" },
                }}
              >
                <Typography component="div" sx={{ mt: 3 }}>
                  {account?.title}
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <SwitchForm
            name={"checked"}
            handleChange={() => setChecked(!checked)}
          />
        </Box>
        <Divider />
        <DetailCard
          checked={checked}
          accounts={accounts}
          sx={{ display: "block" }}
        />
      </Card>
    </FormProvider>
  );
};

const DetailCard = ({ checked, accounts }) => {
  const [isActive, setIsActive] = useState(false);
  const methods = useForm({
    defaultValues: { isActive: true },
  });
  // const { setError, handleSubmit, watch } = methods;
  // const disabled = watch("active");
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [openForm, setOpenForm] = useState(false);
  const handleOpenForm = () => setOpenForm(true);
  const handleCloseForm = () => setOpenForm(false);
  return checked ? (
    <Box sx={{ display: "flex" }}>
      {accounts.map((item, id) => (
        <CardContent
          sx={{
            height: 125,
            width: 250,
            display: "block",
            background: "#F2F4F5",
            my: 2,
            mr: 2,
            borderRadius: "6px",
          }}
          key={id}
        >
          <Typography
            gutterBottom
            variant="body2"
            color="text.secondary"
            sx={{ display: "flex", justifyContent: "space-between" }}
          >
            <span>Tài khoản {item.id}</span>
            {isActive ? (
              <span style={{ color: "#388E3C" }}> Đang kết nối</span>
            ) : (
              ""
            )}
          </Typography>
          <Typography component="div" fontSize={"14px"} sx={{ mb: 3 }}>
            {item.mail}
          </Typography>
          <FormProvider methods={methods}>
            <Box style={{ display: "flex", justifyContent: "space-between" }}>
              <CardActionArea onClick={handleOpen} sx={{ p: 0 }}>
                <DeleteIcon />
              </CardActionArea>
              <ConnectDialog open={open} onClose={handleClose} />
              <SwitchForm
                name={"active"}
                handleChange={() => setIsActive(!isActive)}
              />
            </Box>
          </FormProvider>
        </CardContent>
      ))}

      <CardContent
        sx={{
          border: "2px dashed grey",
          borderRadius: "6px",
          my: 2,
          display: "flex",
        }}
      >
        <CardActionArea>
          <Typography sx={{ color: "#455570" }} onClick={handleOpenForm}>
            + Thêm tài khoản
          </Typography>
        </CardActionArea>
        <ConnectForm open={openForm} handleClose={handleCloseForm} />
      </CardContent>
    </Box>
  ) : (
    ""
  );
};

const ConnectCard = ({ accounts, color, title }) => {
  return (
    <Box>
      <Typography
        sx={{
          display: "inline",
          mr: 1,
        }}
      >
        {title}
      </Typography>

      <Tooltip title="Delete">
        <IconButton>
          <InforIcon />
        </IconButton>
      </Tooltip>

      <ConnectCardStyle>
        {accounts?.map((account, id) => (
          <ConnectCardItem account={account} color={color} key={id} />
        ))}
      </ConnectCardStyle>
    </Box>
  );
};

ConnectCard.propTypes = {
  accounts: PropTypes.array,
};

ConnectCard.defaultProps = {
  accounts: [],
};

export default ConnectCard;
