import { useMemo } from 'react';
import {
  Grid,
  InputLabel,
} from '@mui/material';
import RHFSelect from './RHFSelect';

import {
  useGetProvincesQuery,
  useGetDistrictQuery,
} from '@/redux/api/masterDataSlice';
import { API_GET_DISTRICT } from '@/routes/api';

export default function RHFAddress({
  watch,
  provinceField = 'provinceId',
  districtField = 'districtId',
  setValue,
  defaultValues = {},
  grid = { md: 6 },
}) {
  const { data: { items: provinces } = { items: [] } } = useGetProvincesQuery({ PageSize: 1000 });
  const currentProvince = watch(provinceField, defaultValues[provinceField]);

  const { data: selectedDistrict = null } = useGetDistrictQuery(
    defaultValues[districtField],
    { skip: !defaultValues[districtField] }
  );

  const selectedDistricts = useMemo(() => {
    if (!selectedDistrict) {
      return [];
    }
    return selectedDistrict;
  }, [selectedDistrict]);

  return (
    <Grid container columnSpacing={3}>
      <Grid item {...grid}>
        <div className='form-group'>
          <InputLabel>Tỉnh/Thành phố</InputLabel>
          <RHFSelect
            name={provinceField}
            onChange={() => setValue('districtId', null)}
            options={provinces.map(p => ({ value: p.id, label: p.name }))}
            placeholder="Chọn tỉnh/thành phố"
            height={44}
          />
        </div>
      </Grid>

      <Grid item {...grid}>
        <div className='form-group'>
          <InputLabel>Quận/Huyện</InputLabel>
          <RHFSelect
            name={districtField}
            height={44}
            placeholder="Chọn quận/huyện"
            remoteUrl={API_GET_DISTRICT + '?ProvinceId=' + currentProvince}
            selectedOptions={selectedDistricts}
            resetOnClose={true}
            disable={!currentProvince}
          />
        </div>
      </Grid>
    </Grid>
  )
}