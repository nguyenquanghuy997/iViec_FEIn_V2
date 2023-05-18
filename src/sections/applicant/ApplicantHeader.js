import { isEmpty } from 'lodash';
import InputAdornment from "@mui/material/InputAdornment";
import Stack from "@mui/material/Stack";
import HeadingBar from "../../components/heading-bar/HeadingBar";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFTextField } from "@/components/hook-form";
import { ButtonFilterStyle } from "@/sections/applicant/style";
import { BoxFlex } from "@/sections/emailform/style";
import ChipDS from "@/components/DesignSystem/ChipDS";
import { CloseIcon } from "@/theme/overrides/CustomIcons";
import { useEffect } from "react";
import { filterSlice } from "@/redux/common/filterSlice";
import { useDispatch } from "@/redux/store";
import { Box, Button, Divider } from "@mui/material";
import { fDate } from "@/utils/formatTime";
import { cleanObject } from "@/utils/function";
import { MaritalStatus, PipelineStateType, Sex, YearOfExperience } from "@/utils/enum";
import {useTheme} from "@mui/material/styles";

const theme =useTheme();
const chipSx = {
  backgroundColor: theme.palette.common.bgrObject,
  color: theme.palette.common.neutral700,
  fontSize: 12,
  fontWeight: 500,
  mr: 1
}

const ApplicantHeader = ({ methods, onOpenFilterForm, onSubmit, handleSubmit, dataFilter }) => {
  const dispatch = useDispatch();

  const { watch } = methods;

  const handleSetDataFilter = (data) => dispatch(filterSlice.actions.setDataFilter(data));
  const handleClearDataFilter = () => dispatch(filterSlice.actions.clearDataFilter());

  useEffect(() => {
    if (!watch('searchKey')) {
      handleSetDataFilter({ key: 'searchKey', value: '' })
    }
  }, [watch('searchKey')])

  return (<HeadingBar sx={{ mb: '28px', top: 0 }} style={{ position: 'absolute', top: 0 }}>
    <Stack flexDirection="row" alignItems="center" padding="0">
      <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          name="searchKey"
          placeholder="Tìm kiếm theo họ tên, email, SĐT ứng viên..."
          sx={{
            minWidth: '510px',
            background: theme.palette.common.bgrMaster,
            borderRadius: '6px',
            '.MuiInput-root':{
               border: 'none'
            }
          }}
          defaultValue={dataFilter?.searchKey}
          InputProps={{
            startAdornment: (
              <InputAdornment position='start' sx={{ ml: 1.5 }}>
                <Iconify icon={'eva:search-fill'} sx={{ color: 'text.disabled', width: 20, height: 20 }} />
              </InputAdornment>
            ),
          }}
        />
      </FormProvider>
      <ButtonFilterStyle
        onClick={onOpenFilterForm}
        startIcon={<Iconify sx={{ height: '18px', width: '18px' }} icon="material-symbols:filter-alt-outline" />}>
        Bộ lọc
      </ButtonFilterStyle>
    </Stack>
    <Box>
      {
        !isEmpty(cleanObject(dataFilter)) &&
        <BoxFlex justifyContent='flex-start' style={{ marginTop: 20 }}>
          {
            dataFilter.searchKey && <ChipDS
              label={`Từ khóa: ${dataFilter?.searchKey}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'searchKey', value: '' })}
            />
          }
          {
            !isEmpty(dataFilter.organizationIds) && <ChipDS
              label={`Đơn vị: ${dataFilter?.organizationIds?.map(item => item).join(', ')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'organizationIds', value: [] })}
            />
          }
          {
            !isEmpty(dataFilter.recruitmentIds) && <ChipDS
              label={`Tin tuyển dụng: ${dataFilter?.recruitmentIds?.map(item => item).join(', ')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'recruitmentIds', value: [] })}
            />
          }
          {
            !isEmpty(dataFilter.recruitmentPipelineStates) && <ChipDS
              label={`Bước tuyển dụng: ${dataFilter?.recruitmentPipelineStates.map(item => PipelineStateType(item, 1)).join(', ')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'recruitmentPipelineStates', value: [] })}
            />
          }
          {
            (dataFilter.createdTimeFrom || dataFilter.createdTimeTo) && <ChipDS
              label={`Ngày ứng tuyển: ${dataFilter.createdTimeFrom ? fDate(dataFilter.createdTimeFrom) : ''} ${dataFilter.createdTimeTo ? fDate(dataFilter.createdTimeTo) : ''}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => {
                handleSetDataFilter({ key: 'createdTimeFrom', value: null });
                handleSetDataFilter({ key: 'createdTimeTo', value: null })
              }
              }
            />
          }
          {
            dataFilter.educations && <ChipDS
              label={`Học vấn: ${dataFilter?.educations}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'educations', value: '' })}
            />
          }
          {
            dataFilter.experience && <ChipDS
              label={`Kinh nghiệm: ${dataFilter?.experience}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'experience', value: '' })}
            />
          }
          {
            !isEmpty(dataFilter.yearsOfExperience) && <ChipDS
              label={`Số năm kinh nghiệm: ${dataFilter.yearsOfExperience.map(item => YearOfExperience(item)).join('')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'yearsOfExperience', value: '' })}
            />
          }
          {
            !isEmpty(dataFilter.sexs) && <ChipDS
              label={`Giới tính: ${dataFilter.sexs.map(item => Sex(item)).join('')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'sexs', value: '' })}
            />
          }
          {
            !isEmpty(dataFilter.maritalStatuses) && <ChipDS
              label={`Tình trạng hôn nhân: ${dataFilter.maritalStatuses.map(item => MaritalStatus(item)).join('')}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => handleSetDataFilter({ key: 'maritalStatuses', value: '' })}
            />
          }
          {
            (dataFilter.heightFrom || dataFilter.heightTo) && <ChipDS
              label={`Chiều cao: ${dataFilter.heightFrom} ${dataFilter.heightTo}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => {
                handleSetDataFilter({ key: 'heightFrom', value: '' });
                handleSetDataFilter({ key: 'heightTo', value: '' });
              }}
            />
          }
          {
            (dataFilter.weightFrom || dataFilter.weightTo) && <ChipDS
              label={`Cân nặng: ${dataFilter.weightFrom} ${dataFilter.weightTo}`}
              variant="filled"
              size="small"
              sx={{ ...chipSx }}
              deleteIcon={<CloseIcon />}
              onDelete={() => {
                handleSetDataFilter({ key: 'weightFrom', value: '' });
                handleSetDataFilter({ key: 'weightTo', value: '' });
              }}
            />
          }
          <Divider orientation="vertical" variant="middle" flexItem sx={{ mx: 2 }} />
          <Button
            onClick={handleClearDataFilter}
            sx={{
              color: theme.palette.common.neutral800,
              fontSize: 14,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: 'transparent'
              }
            }}>
            Bỏ lọc
          </Button>
        </BoxFlex>
      }
    </Box>
  </HeadingBar>);
};

export default ApplicantHeader;
