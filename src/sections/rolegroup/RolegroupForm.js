import { useEffect, useMemo, useRef } from 'react';
import PipelineTable from "./RolegroupTable";
import { TextAreaDS } from "@/components/DesignSystem";
import { View } from "@/components/DesignSystem/FlexStyled";
import { RHFTextField } from "@/components/hook-form";
import { Label } from "@/components/hook-form/style";
import {
  Typography,
  Stack,
  Divider,
  Box,
  FormHelperText,
} from "@mui/material";
import { pick as _pick } from 'lodash';

const InputStyle = { width: "100%", minHeight: 44 };

const RolegroupForm = ({ role, selectedItem, ...methods }) => {
  const { setValue, formState: { errors } } = methods;
  const _timeoutInit = useRef();

  const actions = useMemo(() => {
    if (!selectedItem || !role || !role.identityRoles || role.identityRoles.length < 1) {
      return [];
    }
    return role.identityRoles.map(r => r.name)
  }, [role, selectedItem]);

  useEffect(() => {
    if (!role || !selectedItem) {
      return;
    }

    clearTimeout(_timeoutInit.current);
    _timeoutInit.current = setTimeout(() => {
      let fieldValues = _pick(role, ['id', 'name', 'description', 'isActivated']);
      for (let f in fieldValues) {
        setValue(f, fieldValues[f]);
      }
      setValue('identityRoles', role.identityRoles?.map(ac => ac.name));
    }, 200);
  }, [role, selectedItem]);

  return (
    <Box>
      <Stack sx={{ pb: 2 }}>
        <RHFTextField
          name="name"
          title="Tên vai trò"
          placeholder="Nhập tên vai trò"
          isRequired
          sx={{ ...InputStyle }}
        />
      </Stack>

      <Stack justifyContent="space-between" sx={{ mb: 3 }}>
        <View mb={24}>
          <Label>Mô tả</Label>
          <TextAreaDS
            maxLength={255}
            height={90}
            placeholder="Nhập nội dung mô tả..."
            name="description"
          />
        </View>
      </Stack>
      <Divider />

      <Typography sx={{ py: 2, fontSize: "16px", fontWeight: 600 }}>
        Thiết lập chức năng
      </Typography>

      {!!errors.identityRoles && (
        <FormHelperText error={true}>{errors.identityRoles.message}</FormHelperText>
      )}

      <PipelineTable
        actions={actions}
        {...methods}
      />
    </Box>
  );
};

export default RolegroupForm;
