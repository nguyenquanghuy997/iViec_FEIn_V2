import { ConnectCardStyle } from "@/sections/connect/style";
import { Box, Card, CardContent, CardMedia, Divider, Tooltip, Typography, } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";
import React from "react";
import { useFormContext } from "react-hook-form";
import { SwitchForm } from "@/sections/connect/ConnectCard";
import InforIcon from "@/assets/InforIcon";
import { useTheme } from "@mui/material/styles";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { useGetListJobCategoriesInternalQuery } from "@/sections/recruitment";

const ChannelCardItem = ({account, color}) => {
  const {setValue, watch} = useFormContext();
  const changeToggleConnect = (value) => {
    setValue("isActiveFe", value.target.checked);
  }
  return (
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
      <Divider/>
      <DetailChannel checked={watch("isActiveFe")}/>
    </Card>
  );
};

const DetailChannel = ({checked}) => {
  const theme = useTheme();
  const {data: {items: dataJobCategories = []} = {}} = useGetListJobCategoriesInternalQuery();
  return checked ? <Box>
    <Box py={3}>
      <Typography variant={"textSize13500"} color={theme.palette.common.neutral700}>
        Để đăng tin lên Website FPT Education tuyển dụng, vui lòng bổ sung thêm trường thông tin bắt buộc sau:
      </Typography>
    </Box>
    <Box mb={3}>
      <RHFDropdown
        title={"Ngành nghề"}
        isRequired={true}
        options={dataJobCategories.map((item) => ({
          value: item.jobCategoryId,
          name: item.jobCategoryName,
        }))}
        name={"jobCategoryIdFe"}
        placeholder="Chọn ngành nghề"
      />
    </Box>
  </Box> : ""
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
