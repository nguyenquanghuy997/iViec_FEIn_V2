import PropTypes from "prop-types";
import {Box, Divider, Drawer, IconButton, Typography} from "@mui/material";
import {BoxFlex} from "@/sections/emailform/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import Content from "@/components/BaseComponents/Content";
import CloseIcon from "@/assets/CloseIcon";

const ActionItem = ({title, icon, onClick, sx, component, ...other}) => {
  const sxProps = {
    mr: 2,
    "&:hover": {
      boxShadow: 'none',
    },
    ...sx
  }
  if (component) {
    return component;
  }
  if (icon) {
    return (
        <IconButton onClick={onClick} sx={{...sxProps}} {...other}>
          {icon}
        </IconButton>
    )
  }
  return (
      <Box sx={{ mr: 0.75 }}><MuiButton title={title} onClick={onClick} sx={{...sxProps}} {...other} /></Box>
  )
}

const BottomNavModal = ({data, open, onClose, actions, ...props}) => {
  return (
      <Drawer anchor={"bottom"} open={open} variant="persistent" onClose={onClose} {...props}>
        <Content sx={{ '&.MuiBox-root': { py: '20px' } }}>
          <BoxFlex>
            <BoxFlex justifyContent="flex-start">
              {
                actions.map((action, index) => {
                  const {type, title, icon, onClick, ...other} = action;
                  if (type === 'text') {
                    return <Box {...other}>{title}</Box>
                  }
                  return (
                      <ActionItem key={index} icon={icon} title={title} onClick={onClick} {...other} />
                  )
                })
              }
            </BoxFlex>
            <BoxFlex justifyContent="flex-end">
              <Typography variant="textSize14500" color="#091E42">Đã chọn: {Array.isArray(data) ? data.length : 1}</Typography>
              <Divider orientation="vertical" flexItem sx={{mx: 2, width: "2px", backgroundColor: "#E7E9ED"}}/>
              <IconButton size="medium" onClick={onClose} sx={{backgroundColor: '#F3F4F6', borderRadius: '6px',}}>
                 <CloseIcon />
              </IconButton>
            </BoxFlex>
          </BoxFlex>
        </Content>
      </Drawer>
  )
}

BottomNavModal.propTypes = {
  data: PropTypes.any,
  open: PropTypes.bool,
  onClose: PropTypes.func,
  actions: PropTypes.array,
};

BottomNavModal.defaultProps = {
  open: false,
  onClose: null,
  actions: []
};


export default BottomNavModal;