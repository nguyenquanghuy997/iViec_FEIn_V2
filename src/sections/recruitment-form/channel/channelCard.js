import { FormProvider } from "@/components/hook-form";
import { ConnectCardStyle } from "@/sections/connect/style";
import { Box, Card, CardContent, CardMedia, Tooltip, Typography, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";
import { useForm } from "react-hook-form";
import { SwitchForm } from "@/sections/connect/ConnectCard";
import InforIcon from "@/assets/InforIcon";

const ChannelCardItem = ({account, color, handleChange}) => {
  const methods = useForm({
    defaultValues: {checked: account.active},
  });
  
  const {
    setValue,
  } = methods;
  const changeToggleConnect = (value) => {
    setValue("checked", value.target.checked);
    handleChange(value.target.checked);
  }
  
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
          <Box sx={{display: "flex", alignItems: "center"}}>
            <CardMedia
              component="img"
              sx={{width: 80, height: 40, justifyContent: "center"}}
              image={account?.img}
              alt="Live from space album cover"
            />
            <Box sx={{display: "flex", flexDirection: "column"}}>
              <CardContent
                sx={{
                  flex: "1 0 auto",
                  "& .MuiTypography-root": {display: "contents"},
                }}
              >
                <Typography component="div" sx={{mt: 3}}>
                  {account?.title}
                </Typography>
              </CardContent>
            </Box>
          </Box>
          <SwitchForm
            name={"checked"}
            handleChange={changeToggleConnect}
          />
        </Box>
        {/*<Divider />*/}
        {/*{type === "outside" ? (*/}
        {/*  <DetailCard*/}
        {/*    checked={checked}*/}
        {/*    accounts={accounts}*/}
        {/*    sx={{ display: "block" }}*/}
        {/*  />*/}
        {/*) : (*/}
        {/*  <DetailSocial checked={checked} accounts={accounts} />*/}
        {/*)}*/}
      </Card>
    </FormProvider>
  );
};
const ChannelCard = ({accounts, color, title, handleChange}) => {
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
      
      <Tooltip title="Question">
        <IconButton>
          <InforIcon/>
        </IconButton>
      </Tooltip>
      
      <ConnectCardStyle>
        {accounts?.map((account, id) => (
          <ChannelCardItem
            account={account}
            color={color}
            key={id}
            handleChange={handleChange}
          />
        ))}
      </ConnectCardStyle>
    </Box>
  );
};

ChannelCard.propTypes = {
  accounts: PropTypes.array,
};

ChannelCard.defaultProps = {
  accounts: [],
};

export default ChannelCard;
