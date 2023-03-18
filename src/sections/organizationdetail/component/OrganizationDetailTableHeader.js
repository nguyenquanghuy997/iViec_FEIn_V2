import {View} from "@/components/FlexStyled";
import Iconify from "@/components/Iconify";
import {FormProvider, RHFTextField} from "@/components/hook-form";
import {ButtonFilterStyle} from "@/sections/applicant/style";
import {InputAdornment, Stack} from "@mui/material";
import React from "react";
import {ButtonInviteListStyle, ButtonInviteStyle} from "@/sections/organization/style";

const OrganizationDetailTableHeader = ({methods, onOpenFilterForm, onSubmit, handleSubmit, setIsOpenInviteForm}) => {
  return (
      <>
        <Stack
            flexDirection="row"
            alignItems="center"
            justifyContent="space-between"
            padding="16px"
            backgroundColor={"#FDFDFD"}
        >
          <View style={{flexDirection: "row", alignItems: "center"}}>
            <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
              <RHFTextField
                  name="searchKey"
                  placeholder="Tìm kiếm theo tên, email hoặc SĐT..."
                  sx={{minWidth: "360px", height: '36px'}}
                  InputProps={{
                    startAdornment: (
                        <InputAdornment position="start" sx={{ml: 1.5}}>
                          <Iconify
                              icon={"eva:search-fill"}
                              sx={{color: "text.disabled", width: 20, height: 20}}
                          />
                        </InputAdornment>
                    ),
                  }}
              />
            </FormProvider>
            <ButtonFilterStyle
                onClick={onOpenFilterForm}
                startIcon={
                  <Iconify
                      sx={{height: "18px", width: "18px"}}
                      icon="material-symbols:filter-alt-outline"
                  />
                }
                style={{ height: 44 }}
            >
              Bộ lọc
            </ButtonFilterStyle>
          </View>
          <Stack flexDirection="row" alignItems="center">
            <ButtonInviteListStyle
                className='button-invite-list'
                startIcon={<Iconify icon="mdi:folder-upload-outline"/>}
                onClick={() => setIsOpenInviteForm(true)}
            >Danh sách mời</ButtonInviteListStyle>
            <ButtonInviteStyle
                className="button-invite"
                startIcon={<Iconify icon="material-symbols:add"/>}
                onClick={() => setIsOpenInviteForm(true)}
            >Mời người dùng</ButtonInviteStyle>
          </Stack>
        </Stack>
      </>
  );
};

export default OrganizationDetailTableHeader;
