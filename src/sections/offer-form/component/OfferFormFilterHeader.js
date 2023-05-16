import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { Badge, Box, InputAdornment, Stack } from "@mui/material";
import React, { useMemo, useRef } from "react";
import { ButtonAddStyle } from "@/sections/emailform/style";
import useRole from "@/hooks/useRole";
import { PERMISSIONS } from "@/config";
import { useRouter } from "next/router";
import { Button } from "@/components/DesignSystem";
import { RiFilterLine } from "react-icons/ri";
import { useTheme } from "@mui/material/styles";

const OfferFormFilterHeader = ({methods, handleFilterForm, onSubmitFilter, onOpenForm}) => {
  const {query = {}} = useRouter();
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_OFFER_TPL), []);
  const _timeoutSearch = useRef();
  const {palette} = useTheme();
  const onSubmit = (value, timeout = 0) => {
    clearTimeout(_timeoutSearch.current);
    _timeoutSearch.current = setTimeout(() => {
      onSubmitFilter({searchKey: value});
    }, timeout);
  }
  
  const countFilter = () => {
    /* eslint-disable */
    let {PageSize, PageIndex, SearchKey, ...restQuery} = query;
    /* eslint-enable */
    return Object.keys(restQuery).length;
  }
  
  return (
    <>
      <Box sx={{
        display: 'flex',
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: '#FDFDFD',
        padding: '16px',
        marginBottom: 3
      }}>
        <Box sx={{display: 'flex', alignItems: "center"}}>
          <FormProvider methods={methods} onSubmit={onSubmit}>
            <RHFTextField
              name="searchKey"
              placeholder="Tìm kiếm quy trình tuyển dụng"
              sx={{
                minWidth: "360px",
                height: '36px',
                background: 'rgb(243, 244, 246)',
                borderRadius: '6px',
                '.MuiInput-root': {
                  height: '36px',
                  minHeight: "36px",
                  border: 'none'
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" sx={{ml: 0.5, mr: 0}}>
                    <Iconify
                      icon={"eva:search-fill"}
                      sx={{color: "#5C6A82", width: 20, height: 20}}
                    />
                  </InputAdornment>
                ),
              }}
              onKeyDown={e => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  onSubmit(e.target.value);
                }
              }}
              onKeyUp={e => {
                onSubmit(e.target.value, 500);
              }}
            />
          </FormProvider>
          <Badge badgeContent={countFilter()} color="secondary" sx={{ml: 2}}>
            <Button
              variant="contained"
              color="default"
              startIcon={<RiFilterLine size={18} color={palette.text.sub}/>}
              onClick={() => {
                handleFilterForm(true);
              }}
              height={36}
            >
              Bộ lọc
            </Button>
          </Badge>
        </Box>
        {
          canEdit && <Stack flexDirection="row" alignItems="center">
            <ButtonAddStyle
              className="button-add"
              startIcon={<Iconify icon="material-symbols:add"/>}
              onClick={() => onOpenForm(null)}
            >Thêm mẫu mời nhận việc</ButtonAddStyle>
          </Stack>
        }
      </Box>
    </>
  );
};

export default OfferFormFilterHeader;
