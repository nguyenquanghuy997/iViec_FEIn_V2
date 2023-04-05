import { useEffect, useMemo } from 'react';
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
} from "@mui/material";
import { pick as _pick } from 'lodash';

const InputStyle = { width: "100%", minHeight: 44 };

const RolegroupForm = ({ role, ...methods }) => {
  const { setValue } = methods;
  const actions = useMemo(() => {
    if (!role || !role.identityRoles || role.identityRoles.length < 1) {
      return [];
    }
    return role.identityRoles.map(r => r.name)
  }, [role]);

  useEffect(() => {
    if (!role) {
      return;
    }

    let fieldValues = _pick(role, ['id', 'name', 'description', 'isActivated']);
    for (let f in fieldValues) {
      setValue(f, fieldValues[f]);
    }
  }, [role]);

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
          <Label required={true}>Mô tả</Label>
          <TextAreaDS
            maxLength={255}
            placeholder="Nhập nội dung mô tả..."
            name="description"
          />
        </View>
      </Stack>
      <Divider />

      <Typography sx={{ py: 2, fontSize: "16px", fontWeight: 600 }}>
        Thiết lập chức năng
      </Typography>

      <PipelineTable
        actions={actions}
        {...methods}
      />
    </Box>
  );
};

export default RolegroupForm;
