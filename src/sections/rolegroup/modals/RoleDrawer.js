import {
  useGetRoleDetailQuery,
  useGetRoleListQuery,
  useSaveRoleGroupMutation,
} from "../RoleGroupSlice";
import RolegroupForm from "../RolegroupForm";
import DrawerEditForm from "@/components/drawer-edit-form";
import { getErrorMessage } from "@/utils/helper";
import { pick as _pick, uniq as _uniq } from "lodash";
import { useSnackbar } from "notistack";
import { useMemo } from "react";
import * as Yup from "yup";

export default function DrawerEdit({ selectedItem, onClose, ...props }) {
  const { open } = props;

  const {
    data: { items: actions } = { items: [] },
    isLoading: isLoadingActions,
  } = useGetRoleListQuery({ PageSize: 1000 }, { skip: !open });

  const actionIds = useMemo(() => {
    let objIds = {};
    actions.map((ac) => {
      objIds[ac.name] = ac.id;
    });
    return objIds;
  }, [actions]);

  const { data: role = null } = useGetRoleDetailQuery(selectedItem?.id, {
    skip: !selectedItem?.id,
  });
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
    const identityRoleIds = _uniq(
      identityRoles.filter((ac) => !!actionIds[ac]).map((ac) => actionIds[ac])
    );

    const requestData = {
      ..._pick(data, ["id", "name", "description", "isActivated"]),
      identityRoleIds,
    };

    try {
      await saveRoleGroup(requestData).unwrap();
      close();
      enqueueSnackbar("Lưu vai trò thành công!");
    } catch (err) {
      enqueueSnackbar(getErrorMessage(err), { variant: "error" });
    }
  };

  return (
    <DrawerEditForm
      key="role_edit"
      title={editRole ? "Sửa vai trò" : "Thêm mới vai trò"}
      onSubmit={onSubmit}
      onClose={onClose}
      initing={isLoadingActions}
      validateFields={{
        name: Yup.string()
          .required("Tên vai trò không được bỏ trống")
          .max(50, "Tên vai trò không được quá 50 ký tự"),
        description: Yup.string().max(255, "Mô tả không được quá 255 ký tự"),
        identityRoles: Yup.array().min(
          1,
          "Vui lòng chọn ít nhất một chức năng"
        ),
      }}
      defaultValues={{
        name: "",
        description: "",
        isActivated: editRole ? editRole?.isActivated : true,
        identityRoles: [],
      }}
      {...props}
    >
      <RolegroupForm
        selectedItem={selectedItem}
        role={editRole}
        onClose={onClose}
      />
    </DrawerEditForm>
  );
}
