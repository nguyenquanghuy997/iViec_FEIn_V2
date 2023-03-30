import React, {memo, useEffect, useState} from "react";
import Scrollbar from "@/components/Scrollbar";
import {Box, CircularProgress, Divider, Drawer, IconButton, Stack, Switch, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {isArray} from 'lodash';
import {useForm} from "react-hook-form";
import {FormProvider} from "@/components/hook-form";
import {LIST_STATUS} from "@/utils/formatString";
import {useRouter} from "next/router";
import {ApplicantModalFooterStyle, ApplicantModalHeadStyle} from "@/sections/applicant/style";
import MuiButton from "@/components/BaseComponents/MuiButton";
import FormControlLabel from "@mui/material/FormControlLabel";
import OrganizationUserFilterForm from "@/sections/organizationdetail/component/OrganizationUserFilterForm";
import {useGetAllUserFromOrganizationQuery} from "@/sections/applicant";

function OrganizationUserFilterModal({columns, isOpen, onClose, onSubmit}) {
  const router = useRouter();
  const { query, asPath, isReady } = router;
  const defaultValues = {
    isActive: "",
    createdTimeFrom: null,
    createdTimeTo: null,
    creatorIds: [],
    applicationUserRoleGroups: [],
  };

  const [checked, setChecked] = useState(false);

  const methods = useForm({
    mode: 'all',
    defaultValues,
  });

  const { handleSubmit, setValue, formState: {isSubmitting} } = methods;

  useEffect(() => {
    for (let item in query) {
      if (query[item]) {
        if (isArray(defaultValues[item]))
          setValue(item, isArray(query[item]) ? query[item] : [query[item]])
        else setValue(item, query[item])
      } else setValue(item, defaultValues[item])
    }
  }, [query])

  const handleCloseModal = () => {
    onClose();
    isReady && router.push({
      pathname: router.pathname,
      query: {},
    }, asPath, { shallow: true })
  }

  const {data: ListUserFromOrganization = [], isLoading: isLoadingUser} = useGetAllUserFromOrganizationQuery();

  if (isLoadingUser) return (
      <Box textAlign="center" my={1}>
        <CircularProgress size={100} />
      </Box>
  )

  return (
      <Drawer
          open={isOpen}
          onClose={onClose}
          anchor="right"
          PaperProps={{
            sx: {
              width: {xs: 1, sm: 560, md: 400},
              boxShadow: '-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)',
              zIndex: 999,
              position: 'fixed',
              height: 'calc(100% - 64px)',
              top: '64px',
              right: 0,
            }
          }}
          componentsProps={{
            backdrop: {
              sx: {
                background: 'transparent !important',
                boxShadow: 'none !important'
              }
            }
          }}
      >
        <Scrollbar sx={{zIndex: 9999, "& label": {zIndex: 0}}}>
          <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <ApplicantModalHeadStyle>
              <Typography variant="body1" sx={{fontSize: '20px', fontWeight: 600, color: "#455570"}}>
                Bộ lọc
              </Typography>
              <IconButton size="small" onClick={onClose}>
                <Iconify icon="ic:baseline-close"/>
              </IconButton>
            </ApplicantModalHeadStyle>
            <Divider/>
            <Box sx={{py: 2, mt: 0}}>
              <Stack sx={{pb: 6, px: 2}}>
                <OrganizationUserFilterForm
                  columns={columns}
                  options={{
                    isActive: LIST_STATUS,
                    creatorIds: ListUserFromOrganization
                  }}
                />
              </Stack>
            </Box>
            <ApplicantModalFooterStyle>
              <Stack flexDirection="row">
                <MuiButton
                  type="submit"
                  loading={isSubmitting}
                  title="Áp dụng"
                  onClick={handleSubmit(onSubmit)}
                />
                <MuiButton
                    type="submit"
                    color={"basic"}
                    title="Hủy"
                    onClick={handleCloseModal}
                    sx={{
                        "&:hover": {
                            backgroundColor: 'transparent',
                            boxShadow: 'none'
                        }
                    }}
                />
              </Stack>
              <FormControlLabel
                  label="Tự động"
                  control={
                    <Switch
                        checked={checked}
                        onChange={(e) => setChecked(e.target.checked)}
                        inputProps={{"aria-label": "controlled"}}
                    />
                  }
              />
            </ApplicantModalFooterStyle>
          </FormProvider>
        </Scrollbar>
      </Drawer>
  );
}

export default memo(OrganizationUserFilterModal);

