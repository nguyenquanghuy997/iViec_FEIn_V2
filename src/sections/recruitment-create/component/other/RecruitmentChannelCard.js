import {ConnectCardStyle} from "@/sections/connect/style";
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';
import {alpha, styled} from "@mui/material/styles";
import {Controller, useFormContext} from "react-hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {RHFCheckbox} from "@/components/hook-form";
// style
import {BoxFlex} from "@/sections/emailform/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";

const GreenSwitch = styled(Switch)(({theme}) => ({
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

const SwitchForm = ({name, handleChange, style, checked, ...other}) => {
  const {control} = useFormContext();
  return (
      <FormControlLabel
          sx={{...style}}
          control={
            <Controller
                name={name}
                control={control}
                render={({field}) => {
                  return (
                      <GreenSwitch
                          {...field}
                          checked={checked}
                          onChange={handleChange || field.onChange}
                          inputProps={{"aria-label": "controlled"}}
                      />
                  );
                }}
            />
          }
          {...other}
      />
  );
};

const InsideCard = ({checked = false}) => {
  if (!checked) return null;
  return (
      <Box sx={{py: 3}}>
        <Typography sx={{color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_13, fontWeight: style.FONT_MEDIUM, mb: 2}}>
          Để đăng tin lên FPTjobs, vui lòng bổ sung thêm một số trường thông tin bắt buộc sau:
        </Typography>
        <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{flex: 1, marginRight: 8}}>
            <RHFDropdown
                name="organization"
                title="Nơi ở hiện tại"
                placeholder="Chọn 1 đơn vị"
                // isRequired
                fullWidth
            />
          </div>
          <div style={{flex: 1, marginLeft: 8}}>
            <RHFDropdown
                name="role"
                title="Tình trạng hôn nhân"
                placeholder="Chọn 1 chức danh"
                // isRequired
                fullWidth
            />
          </div>
        </Box>
        <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{flex: 1, marginRight: 8}}>
            <RHFDropdown
                name="organization"
                title="Cán bộ phụ trách"
                placeholder="Chọn 1 đơn vị"
                // isRequired
                fullWidth
            />
          </div>
          <div style={{flex: 1, marginLeft: 8}}>
            <RHFDropdown
                name="role"
                title="Cán bộ phỏng vấn"
                placeholder="Chọn 1 chức danh"
                // isRequired
                fullWidth
            />
          </div>
        </Box>
      </Box>
  );
};

const OutsideCard = ({checked = false}) => {
  if (!checked) return null;
  const accounts = [
    {
      id: 1,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
    {
      id: 2,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
    {
      id: 3,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
    {
      id: 4,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
    {
      id: 5,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
    {
      id: 6,
      email: 'Dinhtienthanh1702tt@gmail.com',
    },
  ]
  return (
      <Box sx={{py: 3}}>
        <Typography sx={{color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_13, fontWeight: style.FONT_MEDIUM, mb: 2}}>Chọn tài khoản đăng tin</Typography>
        <BoxFlex flexWrap='wrap'>
          {
            accounts.map((account, index) => {
              return (
                  <Box key={index}
                       sx={{p: 2, backgroundColor: style.BG_GRAY, mb: 2, border: '1px solid #1E88E5', borderRadius: '6px'}}>
                    <BoxFlex>
                      <Typography sx={{color: style.COLOR_TEXT_GRAY, fontSize: style.FONT_XS, fontWeight: style.FONT_NORMAL}}>
                        Tài khoản {index + 1}
                      </Typography>
                      <RHFCheckbox style={{mr: 0}} name={`accounts${index}`}/>
                    </BoxFlex>
                    <Typography sx={{color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_SM, fontWeight: style.FONT_MEDIUM}}>{account.email}</Typography>
                  </Box>
              )
            })
          }
        </BoxFlex>
        <Divider/>
        <Typography sx={{color: style.COLOR_TEXT_PRIMARY, fontSize: style.FONT_13, fontWeight: style.FONT_MEDIUM, my: 2}}>
          Để đăng tin lên TopCV, vui lòng bổ sung thêm một số trường thông tin bắt buộc sau:
        </Typography>
        <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{flex: 1, marginRight: 8}}>
            <RHFDropdown
                name="organization"
                title="Nơi ở hiện tại"
                placeholder="Chọn 1 đơn vị"
                // isRequired
                fullWidth
            />
          </div>
          <div style={{flex: 1, marginLeft: 8}}>
            <RHFDropdown
                name="role"
                title="Tình trạng hôn nhân"
                placeholder="Chọn 1 chức danh"
                // isRequired
                fullWidth
            />
          </div>
        </Box>
        <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
          <div style={{flex: 1, marginRight: 8}}>
            <RHFDropdown
                name="organization"
                title="Cán bộ phụ trách"
                placeholder="Chọn 1 đơn vị"
                // isRequired
                fullWidth
            />
          </div>
          <div style={{flex: 1, marginLeft: 8}}>
            <RHFDropdown
                name="role"
                title="Cán bộ phỏng vấn"
                placeholder="Chọn 1 chức danh"
                // isRequired
                fullWidth
            />
          </div>
        </Box>
      </Box>
  );
};

const SocialCard = ({checked = false}) => {
  const accounts = [
    {id: 1, page: "Hóng Biến Siêu Tốc"},
    {id: 2, page: "Ký sự đường phố"},
    {id: 3, page: "Không sợ chó"},
  ];

  if (!checked) return null;
  return (
      <Card sx={{display: "block", boxShadow: "none", borderTop: "none"}}>
        {accounts.map((item, index) => (
            <div key={index}>
              <Divider/>
              <Stack flexDirection="row" justifyContent='space-between' py={2}>
                <BoxFlex justifyContent="flex-start">
                  <Avatar
                      alt="Remy Sharp"
                      src="https://i.pinimg.com/474x/ba/f0/e2/baf0e2a3bc09f1920d5df655a5f40828.jpg"
                      sx={{mr: 2}}
                  />
                  <Typography>{item.page}</Typography>
                </BoxFlex>
                <Box>
                  <RHFCheckbox name={`page-${index}`}/>
                </Box>
              </Stack>
            </div>
        ))}
      </Card>
  );
};
const RecruitmentChannelCard = ({color, title, type, logo, brand, handleChange, checked, accounts}) => {
  return (
      <Box>
        <Typography sx={{display: "inline", mr: 1}}>
          {title}
        </Typography>
        <ConnectCardStyle>
          <Card sx={{mb: 2, borderRadius: "6px", borderLeft: `3px solid ${color}`, px: 3, width: "100%"}}>
            <BoxFlex>
              <BoxFlex>
                <CardMedia component="img" sx={{width: 80, height: 40, justifyContent: "center"}} image={logo}/>
                <Box sx={{display: "flex", flexDirection: "column"}}>
                  <CardContent sx={{flex: "1 0 auto", "& .MuiTypography-root": {display: "contents"}}}>
                    <Typography component="div" sx={{mt: 3}}>
                      {brand}
                    </Typography>
                  </CardContent>
                </Box>
              </BoxFlex>
              <SwitchForm name={"checked"} checked={checked} handleChange={handleChange}/>
            </BoxFlex>
            <Divider/>
            {type === "inside" && (
                <InsideCard checked={checked}/>
            )}
            {type === "outside" && (
                <OutsideCard checked={checked}/>
            )}
            {type === "social" && (
                <SocialCard checked={checked} accounts={accounts}/>
            )}
          </Card>
        </ConnectCardStyle>
      </Box>
  );
};

export default RecruitmentChannelCard;
