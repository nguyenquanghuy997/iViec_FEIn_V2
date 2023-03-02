import React, {memo} from "react";
import {InputAdornment, Stack, Toolbar} from "@mui/material";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonAddStyle, ButtonFilterStyle} from "@/sections/job-position/table/style";
import {FilterIcon} from "@/assets/FilterIcon";
import {SearchIcon} from "@/assets/SearchIcon";
import {styled} from "@mui/styles";
import {AddIcon} from "@/assets/ActionIcon";
import Iconify from "@/components/Iconify";
import {ButtonInviteListStyle} from "@/sections/organization/style";

const ToolbarStyle = styled(Toolbar)(({}) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const OrganizationTableToolbar = ({methods, onOpenFilterForm}) => {
  return (
      <ToolbarStyle>
        <Stack flexDirection="row" alignItems="center">
          <FormProvider methods={methods}>
            <RHFTextField
                name="search"
                placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
                sx={{width: '360px', height: '36px', backgroundColor: '#F2F4F5', border: 0}}
                InputProps={{
                  startAdornment: (
                      <InputAdornment position='start' sx={{ml: 1.5}}>
                        <SearchIcon/>
                      </InputAdornment>
                  ),
                }}
            />
          </FormProvider>
          <ButtonFilterStyle onClick={onOpenFilterForm} startIcon={<FilterIcon/>}>
            Bộ lọc
          </ButtonFilterStyle>
        </Stack>
        <Stack flexDirection="row" alignItems="center">
          <ButtonInviteListStyle
              className='button-invite-list'
              startIcon={<Iconify icon="mdi:folder-upload-outline" />}
          >Danh sách mời</ButtonInviteListStyle>
          <ButtonAddStyle onClick={onOpenFilterForm} startIcon={<AddIcon />}>
            Mời người dùng
          </ButtonAddStyle>
        </Stack>
      </ToolbarStyle>
  )
}

export default memo(OrganizationTableToolbar);