import { ButtonDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import Scrollbar from "@/components/Scrollbar";
import { FormProvider } from "@/components/hook-form";
import { filterSlice } from "@/redux/common/filterSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { useLazyGetAllUserFromOrganizationQuery } from "@/sections/applicant";
import {
  FilterModalFooterStyle,
  FilterModalHeadStyle,
  ButtonCancelStyle,
  HelperTextTypography,
} from "@/sections/applicant/style";
import DynamicFilterForm from "@/components/dynamic-filter/DynamicFilterForm";
import { GreenSwitch } from "@/utils/cssStyles";
import { LIST_PIPELINESTATE, LIST_STATUS } from "@/utils/formatString";
import {
  Box,
  Divider,
  Drawer,
  FormControlLabel,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { isArray, isEmpty } from "lodash";
import { useRouter } from "next/router";
import PropTypes from "prop-types";
import { memo, useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";

PipelineFilterModal.propTypes = {
  columns: PropTypes.array,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSubmit: PropTypes.func,
};

function PipelineFilterModal({ columns, isOpen, onClose, onSubmit }) {
  const router = useRouter();
  const { query } = router;
  const defaultValues = {
    isActivated: "",
    createdTimeFrom: null,
    createdTimeTo: null,
    creatorIds: [],
    organizationPipelineStates: [],
  };
  const [checked, setChecked] = useState(false);
  const [, setIsScrolled] = useState(false);
  const dispatch = useDispatch();
  const dataFilter = useSelector((state) => state.filterReducer.data);
  const handleSetDataFilter = (data) =>
    dispatch(filterSlice.actions.setDataFilter(data));

  const methods = useForm({
    mode: "all",
    defaultValues: useMemo(
      () => ({ ...defaultValues, ...dataFilter }),
      [dataFilter]
    ),
  });
  const {
    watch,
    handleSubmit,
    setValue,
    formState: { isSubmitting },
  } = methods;

  useEffect(() => {
    for (let item in query) {
      if (query[item]) {
        if (isArray(defaultValues[item]))
          setValue(item, isArray(query[item]) ? query[item] : [query[item]]);
        else setValue(item, query[item]);
      } else setValue(item, defaultValues[item]);
    }
  }, [query]);
  const watchOrganizationPipelineStates = watch("organizationPipelineStates");
  const watchIsActivated = watch("isActivated");
  const watchCreatorIds = watch("creatorIds");
  const watchCreatedTimeFrom = watch("createdTimeFrom");
  const watchCreatedTimeTo = watch("createdTimeTo");
  useEffect(() => {
    if (checked) {
      // select
      !isEmpty(watchOrganizationPipelineStates)
        ? handleSetDataFilter({
            key: "organizationPipelineStates",
            value: watchOrganizationPipelineStates?.map((pipe) => Number(pipe)),
          })
        : handleSetDataFilter({ key: "organizationPipelineStates", value: [] });
      !isEmpty(watchIsActivated)
        ? handleSetDataFilter({
            key: "isActivated",
            value: watchIsActivated,
          })
        : handleSetDataFilter({ key: "isActivated", value: [] });
      !isEmpty(watchCreatorIds)
        ? handleSetDataFilter({
            key: "creatorIds",
            value: watchCreatorIds,
          })
        : handleSetDataFilter({ key: "creatorIds", value: [] });
      // date
      watchCreatedTimeFrom
        ? handleSetDataFilter({
            key: "createdTimeFrom",
            value: new Date(watchCreatedTimeFrom).toISOString(),
          })
        : handleSetDataFilter({ key: "createdTimeFrom", value: null });
      watchCreatedTimeTo
        ? handleSetDataFilter({
            key: "createdTimeTo",
            value: new Date(watchCreatedTimeTo).toISOString(),
          })
        : handleSetDataFilter({ key: "createdTimeTo", value: null });
    }
  }, [
    checked,
    watchOrganizationPipelineStates,
    watchIsActivated,
    watchCreatedTimeFrom,
    watchCreatedTimeTo,
    watchCreatorIds,
  ]);

  const handleCloseModal = async () => {
    onClose();
    await router.push(
      {
        pathname: router.pathname,
        query: {},
      },
      undefined,
      { shallow: true }
    );
  };

  const handleScroll = (e) => {
    setIsScrolled(e.target.scrollTop > 10);
  };
  const {data: {items: ListUserFromOrganization} = []}= useLazyGetAllUserFromOrganizationQuery();
  return (
    <Drawer
      open={isOpen}
      onClose={onClose}
      anchor="right"
      variant="persistent"
      PaperProps={{
        sx: {
          width: { xs: 1, sm: 560, md: 384 },
          boxShadow:
            "-3px 0px 5px rgba(9, 30, 66, 0.2), 0px 0px 1px rgba(9, 30, 66, 0.3)",
          zIndex: 999,
          position: "fixed",
          height: "calc(100% - 64px)",
          top: "64px",
          right: 0,
        },
        onScroll: handleScroll,
      }}
    >
      <Scrollbar sx={{ zIndex: 9999, "& label": { zIndex: 0 } }}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <FilterModalHeadStyle>
            <Typography
              variant="body1"
              sx={{ fontSize: "20px", fontWeight: 600, color: "#455570" }}
            >
              Bộ lọc
            </Typography>
            <IconButton size="small" onClick={onClose}>
              <Iconify icon="ic:baseline-close" />
            </IconButton>
          </FilterModalHeadStyle>
          <Divider />
          <Box sx={{ py: 2, mt: 0 }}>
            <HelperTextTypography variant="body2">
              Để thêm/bớt bộ lọc, vui lòng chọn cài đặt quản lý cột ở bảng dữ
              liệu
            </HelperTextTypography>
            <Stack sx={{ pb: 3, px: 2 }}>
              <DynamicFilterForm
                columns={columns}
                options={{
                  creatorIds: ListUserFromOrganization && [
                    ...ListUserFromOrganization?.map((i) => ({
                      ...i,
                      value: i?.id,
                      name: `${i?.email}`,
                      item: `${i?.lastName} ${i?.firstName}`,
                    })),
                    { id: "", value: "", name: "", item: "" },
                  ],
                  isActivated: LIST_STATUS,
                  organizationPipelineStates: LIST_PIPELINESTATE,
                }}
              />
            </Stack>
          </Box>

          <Divider />
          <FilterModalFooterStyle>
            <Stack flexDirection="row">
              <ButtonDS
                type="submit"
                loading={isSubmitting}
                variant="contained"
                tittle="Áp dụng"
                onClick={handleSubmit(onSubmit)}
              />
              <ButtonCancelStyle onClick={handleCloseModal}>
                Bỏ lọc
              </ButtonCancelStyle>
            </Stack>
            <FormControlLabel
              label="Tự động"
              control={
                <GreenSwitch
                  checked={checked}
                  onChange={(e) => setChecked(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
              }
            />
          </FilterModalFooterStyle>
        </FormProvider>
      </Scrollbar>
    </Drawer>
  );
}

export default memo(PipelineFilterModal);
