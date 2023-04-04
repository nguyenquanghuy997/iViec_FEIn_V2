import { useMemo } from "react";
import RolegroupForm from '../RolegroupForm'
import DrawerEditForm from "@/components/drawer-edit-form";
import { useSnackbar } from "notistack";
import { pick as _pick } from 'lodash';
import { getErrorMessage } from "@/utils/helper";

import {
  useGetRoleListQuery,
  useSaveRoleGroupMutation,
  useGetRoleDetailQuery,
} from "../RoleGroupSlice";

export default function DrawerEdit({ selectedItem, onClose, ...props }) {
  const { data: { items: actions } = { items: [] } } = useGetRoleListQuery({ PageSize: 1000 });
  const { data: editRole = null } = useGetRoleDetailQuery(selectedItem?.id, { skip: !selectedItem?.id });

  const actionIds = useMemo(() => {
    let objIds = {};
    actions.map(ac => {
      objIds[ac.name] = ac.id;
    });
    return objIds;
  }, actions);

  const [saveRoleGroup] = useSaveRoleGroupMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data) => {
    const { identityRoles = [] } = data;
    const identityRoleIds = identityRoles.filter(ac => !!actionIds[ac])
      .map(ac => actionIds[ac]);

    const requestData = {
      ..._pick(data, ['id', 'name', 'description', 'isActivated']),
      identityRoleIds,
    };

    try {
      await saveRoleGroup(requestData).unwrap();
      onClose();
      enqueueSnackbar('Lưu vai trò thành công!');
    } catch (err) {
      console.log('Save role group error: ', err);
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
    }
  };

  return (
    <DrawerEditForm
      title={editRole ? 'Sửa vai trò' : 'Thêm mới vai trò'}
      onSubmit={onSubmit}
      onClose={() => {
        onClose(selectedItem);
      }}
      {...props}
    >
      <RolegroupForm
        role={editRole}
      />
    </DrawerEditForm>
  );
}
