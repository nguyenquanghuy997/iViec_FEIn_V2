import { useMemo } from "react";
import RolegroupForm from '../RolegroupForm'
import DrawerEditForm from "@/components/drawer-edit-form";
import { useSnackbar } from "notistack";
import * as Yup from "yup";
import { pick as _pick } from 'lodash';
import { getErrorMessage } from "@/utils/helper";

import {
  useGetRoleListQuery,
  useSaveRoleGroupMutation,
  useGetRoleDetailQuery,
} from "../RoleGroupSlice";

export default function DrawerEdit({ selectedItem, onClose, ...props }) {
  const { open } = props;

  const {
    data: { items: actions } = { items: [] },
    isLoading: isLoadingActions,
  } = useGetRoleListQuery({ PageSize: 1000 }, { skip: !open });

  const actionIds = useMemo(() => {
    let objIds = {};
    actions.map(ac => {
      objIds[ac.name] = ac.id;
    });
    return objIds;
  }, [actions]);

  const { data: role = null } = useGetRoleDetailQuery(selectedItem?.id, { skip: !selectedItem?.id });
  const editRole = useMemo(() => {
    if (!selectedItem) {
      return null;
    }
    return role;
  }, [selectedItem, role]);

  const [saveRoleGroup] = useSaveRoleGroupMutation();
  const { enqueueSnackbar } = useSnackbar();

  const onSubmit = async (data, close) => {
    const { identityRoles = [] } = data;
    const identityRoleIds = identityRoles.filter(ac => !!actionIds[ac])
      .map(ac => actionIds[ac]);

    const requestData = {
      ..._pick(data, ['id', 'name', 'description', 'isActivated']),
      identityRoleIds,
    };

    try {
      await saveRoleGroup(requestData).unwrap();
      close();
      enqueueSnackbar('Lưu vai trò thành công!');
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: 'error' });
    }
  };

  return (
    <DrawerEditForm
      title={editRole ? 'Sửa vai trò' : 'Thêm mới vai trò'}
      onSubmit={onSubmit}
      onClose={onClose}
      initing={isLoadingActions}
      validateFields={{
        name: Yup.string()
          .required('Tên vai trò không được bỏ trống')
          .max(50, 'Tên vai trò không được quá 50 ký tự'),
        description: Yup.string()
          .required('Mô tả không được bỏ trống')
          .max(255, 'Mô tả không được quá 255 ký tự'),
        identityRoles: Yup.array()
          .min(1, 'Vui lòng chọn ít nhất một chức năng'),
      }}
      defaultValues={{
        name: '',
        description: '',
        isActivated: true,
        identityRoles: [],
      }}
      {...props}
    >
      <RolegroupForm
        role={editRole}
        onClose={onClose}
      />
    </DrawerEditForm>
  );
}
