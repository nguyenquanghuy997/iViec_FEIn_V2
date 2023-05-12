import {
  AppleStoreIcon,
  GooglePlayIcon,
  LogoTitleIcon,
} from "@/assets/ActionIcon";
import { Text, View } from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import { EmailFormHeadStyle } from "@/sections/emailform/style";
import { Image } from "antd";
import {
  Box,
  Divider,
  Drawer,
  IconButton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import moment from "moment";
import React from "react";

const PreviewEmail = ({isOpen, onClose, content, signature, logo}) => {
  const theme = useTheme();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      sx={{zIndex: 1301}}
      PaperProps={{
        sx: {
          width: {xs: 1, sm: 560, md: 800},
          boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
        },
      }}
    >
      <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
        <EmailFormHeadStyle className="email-form-head">
          <Box display={"flex"} alignItems={"center"}>
            <IconButton onClick={onClose} sx={{mr: 1}}>
              <Iconify icon="material-symbols:arrow-back"/>
            </IconButton>
            <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
              Xem trước
            </Typography>
          </Box>
          <IconButton size="small" onClick={onClose}><Iconify icon="ic:baseline-close"/></IconButton>
        </EmailFormHeadStyle>
        <Divider/>
        <Box sx={{py: 2, px: 3, mt: 8, minWidth: '800px'}}>
          {/* Title */}
          <Box sx={{mb: 2}}>
            <Typography sx={{color: '#172B4D', fontSize: 16, fontWeight: 600}}>
              Tiêu đề email
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between'}}>
            <Box sx={{display: 'flex', alignItems: 'center'}}>
              <Image
                width={24}
                height={24}
                src={"/favicon/android-chrome-512x512.png"}
                preview={false}
              />
              <Stack sx={{ml: 1}}>
                <Typography
                  sx={{color: '#172B4D', fontSize: 14, fontWeight: 500, display: 'flex', alignItems: 'center'}}>
                  Nhà tuyển dụng
                  <Typography sx={{
                    color: '#455570',
                    fontSize: 14,
                    fontWeight: 400,
                    ml: 0.5
                  }}>{'<Example@email.com>'}</Typography>
                </Typography>
                <Typography sx={{color: '#455570', fontSize: 13, fontWeight: 400, ml: 0.5}}>
                  Tới tôi, CC: example@email.com, BCC: xample@email.com
                </Typography>
              </Stack>
            </Box>
            <Box>
              <Typography sx={{color: '#455570', fontSize: 13, fontWeight: 400}}>
                15:00 17/02/2023
              </Typography>
            </Box>
          </Box>
          <Box sx={{mx: -3}}>
            <View
              contentCenter
              mt={28}
              mb={36}
              pv={24}
              bgColor={theme.palette.text.bgGray}
            >
              <LogoTitleIcon/>
            </View>
          </Box>
          <Box sx={{mt: 6, mx: 4}}>
            <div dangerouslySetInnerHTML={{__html: content}}/>
            <Box sx={{display: 'flex', alignItems: 'center', mt: 3}}>
              <Image
                width={80}
                height={80}
                src={logo}
                preview={false}
              />
              <div style={{marginLeft: 24}} dangerouslySetInnerHTML={{__html: signature}}/>
            </Box>
          </Box>
          <Box sx={{mx: -3}}>
            <View
              flexRow
              contentCenter
              mt={36}
              pv={24}
              ph={56}
              bgColor={theme.palette.text.bgGray}
            >
              <View flex1>
                <Text italic fontSize={13}>
                  {`@ ${moment().format("YYYY")} iVIEC`}
                </Text>
                
                <Text mt={4} fontSize={13} fontWeight={"600"}>
                  {"Giải pháp Tuyển dụng và Phát triển nguồn nhân lực"}
                </Text>
                
                <Text mt={4} fontSize={13}>
                  {`Điện thoại: 0987 183 803 | Email: Contact@iviec.com | Website: https://iviec.vn`}
                </Text>
              </View>
              
              <View>
                <GooglePlayIcon/>
                
                <View height={8}/>
                
                <AppleStoreIcon/>
              </View>
            </View>
          </Box>
        </Box>
      </Scrollbar>
    </Drawer>
  )
}

export default React.memo(PreviewEmail);