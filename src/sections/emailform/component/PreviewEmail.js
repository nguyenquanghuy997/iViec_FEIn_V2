import React from 'react'
import {Box, Divider, Drawer, IconButton, Stack, Typography} from "@mui/material";
import Scrollbar from "@/components/Scrollbar";
import {EmailFormHeadStyle} from "@/sections/emailform/style";
import Iconify from "@/components/Iconify";
import {Image} from "antd";

const PreviewEmail = ({isOpen, onClose, content, signature, logo}) => {
  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          PaperProps={{
            sx: {
              width: {xs: 1, sm: 560, md: 800},
              boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
            },
          }}
      >
        <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
          <EmailFormHeadStyle className="email-form-head">
            <IconButton onClick={onClose}>
              <Iconify icon="material-symbols:arrow-back"/>
            </IconButton>
            <Typography variant="body1" sx={{fontSize: '16px', fontWeight: 600, color: "#455570"}}>
              Xem trước
            </Typography>
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
                    src={logo}
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
            <Box sx={{ mt: 6 }}>
              <div dangerouslySetInnerHTML={{__html: content}}/>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 3 }}>
                <Image
                    width={80}
                    height={80}
                    src={logo}
                    preview={false}
                />
                <div style={{ marginLeft: 24 }} dangerouslySetInnerHTML={{__html: signature}}/>
              </Box>
            </Box>
          </Box>
        </Scrollbar>
      </Drawer>
  )
}

export default React.memo(PreviewEmail);