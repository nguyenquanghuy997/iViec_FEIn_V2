import {Box, Drawer, IconButton, Typography} from "@mui/material";
import Content from "@/components/BaseComponents/Content";
import {BoxFlex} from "@/sections/emailform/style";
import CloseIcon from "@/assets/CloseIcon";

const RecruitmentPreview = ({ open, onClose }) => {
  return (
      <Drawer
          open={open}
          onClose={onClose}
          anchor="right"
          variant="persistent"
          PaperProps={{
            sx: {
              width: { lg: '100%' },
              zIndex: 9999,
              position: 'fixed',
              height: 'calc(100% - 64px)',
              top: '64px',
              right: 0,
            }
          }}
      >
        <Box sx={{ boxShadow: "0px 3px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)", }}>
          <Content style={{ paddingTop: '20px', paddingBottom: '20px' }}>
            <BoxFlex>
              <Typography
                  sx={{
                    color: '#172B4D',
                    fontSize: 16,
                    fontWeight: 600
                  }}
              >
                Xem trước tin tuyển dụng
              </Typography>
              <IconButton onClick={onClose}>
                <CloseIcon />
              </IconButton>
            </BoxFlex>
          </Content>
        </Box>
      </Drawer>
  )
}

export default RecruitmentPreview;