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
  Avatar,
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

const SwitchForm = ({ name, handleChange, style, ...other }) => {
  const { control } = useFormContext();

  return (
    <FormControlLabel
      sx={{ ...style }}
      control={
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <GreenSwitch
                {...field}
                checked={field.value}
                onChange={handleChange || field.onChange}
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
const ConnectCardItem = ({ account, color, type }) => {
  const [checked, setChecked] = useState(false);
  const methods = useForm({
    defaultValues: { isChecked: true },
  });
  const accounts = [
    { id: 1, mail: "Hóng Biến Siêu Tốc" },
    { id: 2, mail: "Ký sự đường phố" },
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
        {type === "outside" ? (
          <DetailCard
            checked={checked}
            accounts={accounts}
            sx={{ display: "block" }}
          />
        ) : (
          <DetailSocial checked={checked} accounts={accounts} />
        )}
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
              <span style={{ color: "#388E3C" }}> Đã hoạt động</span>
            ) : (
              <span style={{ color: "#8A94A5" }}>Không hoạt động"</span>
            )}
          </Typography>
          <Typography component="div" fontSize={"14px"} sx={{ mb: 3 }}>
            {item.mail}
          </Typography>
          <FormProvider methods={methods}>
            <Box
              style={{
                display: "flex",
                justifyContent: "space-between",
                transform: "translateY(-14px)",
              }}
            >
              <CardActionArea onClick={handleOpen} sx={{ p: 0 }}>
                <DeleteIcon />
              </CardActionArea>
              <ConnectDialog open={open} onClose={handleClose} type="account" />
              <SwitchForm
                name={item.mail}
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
        <ConnectForm open={openForm} onClose={handleCloseForm} />
      </CardContent>
    </Box>
  ) : (
    ""
  );
};

const DetailSocial = ({ checked, accounts }) => {
  const methods = useForm({
    // defaultValues: { isActive: true },
  });
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return checked ? (
    <Card sx={{ display: "block", boxShadow: "none", borderTop: "none" }}>
      {accounts.map((item) => (
        <>
          <Divider />
          <Box
            sx={{
              width: "100%",
              display: "flex",
              borderRadius: 0,
              py: 2,
              justifyContent: "space-between",
            }}
          >
            <div
              className="left"
              style={{ display: "flex", justifyContent: "center" }}
            >
              <Avatar
                alt="Remy Sharp"
                src="https://i.pinimg.com/474x/ba/f0/e2/baf0e2a3bc09f1920d5df655a5f40828.jpg"
                sx={{ mr: 2 }}
              />
              <Typography>{item.mail}</Typography>
            </div>
            <FormProvider methods={methods}>
              <span onClick={handleOpen}>
                <DeleteIcon />
              </span>
              <ConnectDialog
                open={open}
                onClose={handleClose}
                type="unconnect"
              />
              <SwitchForm
                name={"active"}
                // handleChange={() =>
                //   setIsActive(!isActive)
                // }
                style={{
                  marginLeft: "10px",
                }}
              />
            </FormProvider>
          </Box>
        </>
      ))}
    </Card>
  ) : (
    ""
  );
};
const ConnectCard = ({ accounts, color, title, type }) => {
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
          <ConnectCardItem
            account={account}
            color={color}
            key={id}
            type={type}
          />
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
