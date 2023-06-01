import React from 'react';
import GuestGuard from "@/guards/GuestGuard";
import Page from "@/components/Page";
import {LogoHeader} from "@/components/BaseComponents";
import {Box, Typography} from "@mui/material";
import { STYLE_CONSTANT } from '@/sections/auth/register/constants';
import { BoxPolicyWrapperStyle, BoxPolicyInnerStyle } from '@/sections/auth/style';
const Policy = () => {
  return (
      <GuestGuard>
        <Page title="Chính sách">
          <LogoHeader />
          <Box sx={{
            ...BoxPolicyWrapperStyle
          }}>
            <Box sx={{
              ...BoxPolicyInnerStyle
            }}>
              <Box sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                gap: '8px',
              }}>
                <Typography
                  sx={{
                    fontFamily: 'Inter',
                    fontSize: STYLE_CONSTANT.FONT_3XL,
                    fontWeight: STYLE_CONSTANT.FONT_BOLD,
                    color: STYLE_CONSTANT.COLOR_TEXT_BLACK
                  }}
                >
                  Chính sách bảo mật
                </Typography>
                {/* <Typography sx={{
                  fontFamily: 'Inter',
                  fontSize: STYLE_CONSTANT.FONT_SM,
                  fontWeight: STYLE_CONSTANT.FONT_MEDIUM,
                  color: STYLE_CONSTANT.COLOR_TEXT_BLACK
                }}>
                Lorem ipsum dolor sit amet consectetur. Vitae pellentesque nunc lacus non sollicitudin sit nisi. Euismod interdum iaculis urna sagittis massa id cras non ipsum. Ut lacus facilisi quis sed tellus. Parturient vestibulum ac interdum ut quis semper. Ut elit aliquet arcu nibh egestas lorem purus. Porta praesent ante lorem felis risus aliquet id vitae. Etiam purus vitae mi integer. Nec turpis nisi dignissim vivamus amet. Sodales vitae pulvinar augue interdum amet in dolor. Gravida orci eu integer tristique elementum morbi integer nunc. Nec sed diam a eleifend odio neque proin hac. Augue fringilla elementum bibendum velit libero. Arcu ultrices imperdiet tortor maecenas proin purus fermentum enim. Justo in sed ornare nunc. Varius sed cras odio in cursus non massa eget. Mauris sit gravida felis iaculis. Lacus pellentesque eu lacus mattis lorem porta morbi vel gravida. Et egestas vel turpis dictum mauris tempus feugiat nunc id. Pretium amet lectus viverra tincidunt ultrices suscipit pharetra nec tellus. Scelerisque non consectetur risus sollicitudin. Hendrerit id nullam magna lectus eu auctor amet. Nunc amet ut lectus nunc in tellus vel. Et lacus turpis neque ut. Tempus sapien nisl laoreet consectetur. Porta tincidunt arcu sit lectus interdum augue. Dis ut faucibus ut est fames etiam magna viverra. Ut urna et ac blandit urna. Enim odio nunc elit cum cras. Amet vulputate vitae facilisi tempus orci fermentum. Purus bibendum dignissim sollicitudin at rutrum nunc. Tortor tortor tellus interdum viverra. Egestas vitae massa dictum placerat orci scelerisque. Elementum feugiat odio sed ac. Et.
                </Typography> */}
              </Box>
            </Box>
          </Box>
        </Page>
      </GuestGuard>
  );
}

export default Policy;