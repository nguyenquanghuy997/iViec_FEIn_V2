import React from 'react';
import {Box, InputAdornment, Stack, Typography} from "@mui/material";
import {Logo} from "@/sections/organization/Logo";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import OrganizationTree from "@/sections/organization/OrganizationTree";
import Iconify from "@/components/Iconify";

const defaultValues = {
  search: "",
};
const OrganizationContent = () => {
  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues,
    resolver: yupResolver(Schema),
  });

  return (
      <Box sx={{px: 7.5, py: 5, backgroundColor: "#FDFDFD",}}>
        {/*  Logo and Info  */}
        <Stack flexDirection="row" alignItems="center" mb={4}>
          <Logo/>
          <Stack sx={{ml: 2}}>
            <Typography sx={{fontSize: '16px', fontWeight: '600', color: '#172B4D', mb: 0.5}}>NGÂN HÀNG VIỆT NAM
              THỊNH VƯỢNG VPBANK</Typography>
            <Typography sx={{fontSize: '12px', fontWeight: '400', color: '#455570'}}>Để chỉnh sửa tên công ty,
              vui lòng liên hệ admin qua email Support@iviec.com.vn</Typography>
          </Stack>
        </Stack>
        {/*  Search form  */}
        <FormProvider methods={methods}>
          <RHFTextField
              name="search"
              placeholder="Tìm kiếm..."
              sx={{width: '558px', height: '44px', backgroundColor: '#F2F4F5'}}
              InputProps={{
                  startAdornment: (
                      <InputAdornment position='start' sx={{ ml: 1.5 }}>
                          <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }}/>
                      </InputAdornment>
                  ),
              }}
          />
        </FormProvider>
        <Stack mt={3}>
          <OrganizationTree />
        </Stack>
      </Box>
  )
}

export default React.memo(OrganizationContent);
