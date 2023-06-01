import CloseIcon from "@/assets/CloseIcon";
import Content from "@/components/BaseComponents/Content";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { BoxFlex } from "@/sections/emailform/style";
import { BottomNavStyle, ButtonIcon } from "@/utils/cssStyles";
import { Box, Divider, IconButton, Typography } from "@mui/material";
import PropTypes from "prop-types";

const ActionItem = ({ title, icon, onClick, sx, component, ...other }) => {
  const sxProps = {
    mr: 2,
    "&:hover": {
      boxShadow: "none",
    },
    ...sx,
  };
  if (component) {
    return component;
  }
  if (icon) {
    return (
      <ButtonIcon
        onClick={onClick}
        tooltip={title}
        icon={icon}
        sx={{ ...sxProps }}
      />
    );
  }
  return (
    <Box sx={{ mr: 0.75 }}>
      <MuiButton
        title={title}
        onClick={onClick}
        sx={{ ...sxProps }}
        {...other}
      />
    </Box>
  );
};

const BottomNavModal = ({ data, open, onClose, actions, ...props }) => {
  return (
    <BottomNavStyle
      anchor={"bottom"}
      open={open}
      variant="persistent"
      onClose={onClose}
      {...props}
    >
      <Content  className="block-bottom" sx={{ "&.MuiBox-root": { py: "20px" } }}>
        <BoxFlex>
          <BoxFlex justifyContent="flex-start">
            {actions.map((action, index) => {
              const { type, title, icon, onClick, ...other } = action;
              if (type === "text") {
                return <Box {...other}>{title}</Box>;
              }
              return (
                <ActionItem
                  key={index}
                  icon={icon}
                  title={title}
                  onClick={onClick}
                  {...other}
                />
              );
            })}
          </BoxFlex>
          <BoxFlex justifyContent="flex-end">
            <Typography variant="textSize14500" color="#091E42">
              Đã chọn: {Array.isArray(data) ? data.length : 1}
            </Typography>
            <Divider
              orientation="vertical"
              flexItem
              sx={{ mx: 2, width: "2px", backgroundColor: "#E7E9ED" }}
            />
            <IconButton
              size="medium"
              onClick={onClose}
              sx={{ backgroundColor: "#F3F4F6", borderRadius: "6px" }}
            >
              <CloseIcon />
            </IconButton>
          </BoxFlex>
        </BoxFlex>
      </Content>
    </BottomNavStyle>
  );
};

BottomNavModal.propTypes = {
  data: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  actions: PropTypes.array,
};

BottomNavModal.defaultProps = {
  open: false,
  onClose: null,
  actions: [],
};

export default BottomNavModal;
