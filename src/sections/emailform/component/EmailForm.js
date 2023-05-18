import Iconify from "@/components/Iconify";
import Page from "@/components/Page";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import FormHeader from "@/sections/emailform/component/FormHeader";
import { findIndex, toRequestFilterData } from "@/utils/helper";
import { Box, Stack } from "@mui/material";
import { isArray } from "lodash";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import {
  useDeleteEmailTemplateMutation,
  useGetAllEmailTemplateQuery,
  useUpdateEmailTemplateMutation,
} from "../EmailFormSlice";
import { ButtonAddStyle } from "../style";
import EmailFormBottomNav from "./EmailFormBottomNav";
import EmailFormModal from "./EmailFormModal";

const defaultValues = {
  searchKey: "",
  createdTimeFrom: "",
  createdTimeTo: "",
  creatorIds: [],
  isActive: undefined,
};

const EmailForm = ({ title = "", subtitle = "", type }) => {
  // props
  const name = String(title).toLowerCase();

  // role
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_EMAIL), []);

  // router
  const router = useRouter();
  const { query, isReady } = router;

  // other
  const { enqueueSnackbar } = useSnackbar();

  // api
  const { data: { items: data = [] } = {} } = useGetAllEmailTemplateQuery(
    { ...query, EmailTemplateOrganizationType: type },
    { skip: !isReady }
  );
  const [updateEmail] = useUpdateEmailTemplateMutation();
  const [deleteEmail] = useDeleteEmailTemplateMutation();

  // state
  const [expands, setExpands] = useState([]);
  const [selected, setSelected] = useState([]);

  // modal
  const [item, setItem] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  // bottom nav modal
  const [, setIsOpenBottomNav] = useState(false);
  const [, setActionType] = useState(0); // 0 add, 1 update
  const [, setActionTypeActive] = useState(0); // 1 active 0 inactive

  // form search
  const methods = useForm({
    mode: "onChange",
    defaultValues: { ...defaultValues },
  });
  const { setValue } = methods;

  // effect
  useEffect(() => {
    let queryValues = toRequestFilterData(query);
    for (let item in query) {
      if (query[item]) {
        if (isArray(defaultValues[item]))
          setValue(
            item,
            isArray(query[item]) ? queryValues[item] : [queryValues[item]]
          );
        else setValue(item, queryValues[item]);
      } else setValue(item, defaultValues[item]);
    }
  }, [query]);

  useEffect(() => {
    if (data.length === 0) return;
    setExpands(Array(data.length).fill(false));
    setSelected(Array(data.length).fill(false));
  }, [data]);

  // handle expand
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) =>
      idx === index ? !item : item
    );
    setExpands(expandsNext);
  };

  const handleSelected = (data, index) => {
    const selectedNext = [...selected].map((i, idx) =>
      idx === index ? !i : i
    );
    setSelected(selectedNext);
  };

  // handle delete
  const handleOpenConfirm = (data) => {
    setConfirmDelete(true);
    setItem(data);
  };

  const handleCloseConfirm = () => {
    setConfirmDelete(false);
    setSelected([]);
    setItem(null);
  };

  const handleDelete = async (data) => {
    await deleteEmail({ ids: data })
      .unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
      })
      .catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
    handleCloseConfirm();
  };

  // handle active
  const handleOpenActiveModal = (data) => {
    setIsOpenActive(true);
    setItem(data);
  };

  const handleCloseActiveModal = () => {
    setIsOpenActive(false);
    setSelected([]);
    setItem(null);
  };

  const handleActive = async (data) => {
    await updateEmail({ ...data, isActive: !data.isActive })
      .unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
      })
      .catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
    handleCloseActiveModal();
  };

  // handle form (add & update)
  const handleOpenForm = (data) => {
    setIsOpenForm(true);
    setItem(data);
  };

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setSelected([]);
    setItem(null);
  };

  // handle bottom nav
  const handleCloseBottomNav = () => {
    setIsOpenBottomNav(false);
    setSelected([]);
  };

  return (
    <Page title={`Mẫu ${name}`}>
      <Box>
        <Stack
          flexDirection={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <FormHeader
            title={title}
            subtitle={subtitle}
            buttonTitle={"Thêm mẫu email"}
            showButton={false}
            onOpenForm={handleOpenForm}
          />

          <ButtonAddStyle
            className="button-add"
            startIcon={<Iconify icon="material-symbols:add" />}
            onClick={() => handleOpenForm(null)}
          >
            Thêm mẫu email
          </ButtonAddStyle>
        </Stack>

        {data.map((column, index) => {
          return (
            <CardEmailFormItem
              isCheckbox
              key={index}
              index={index}
              item={column}
              data={column}
              expanded={expands[index]}
              checked={selected[index]}
              onChangeSelected={() => handleSelected(column, index)}
              onChangeExpand={() => handleChangeExpand(index)}
              onOpenConfirmDelete={handleOpenConfirm}
              onOpenActiveModal={handleOpenActiveModal}
              onOpenFormModal={handleOpenForm}
              canEdit={canEdit}
            />
          );
        })}
      </Box>

      {confirmDelete && (
        <ConfirmModal
          confirmDelete={confirmDelete}
          onCloseConfirmDelete={handleCloseConfirm}
          onSubmit={handleDelete}
          title={`Xác nhận xóa mẫu ${name}`}
          subtitle={`Bạn có chắc chắn muốn xóa mẫu ${name}`}
          strongSubtitle={item.name}
          item={item}
        />
      )}

      {isOpenActive && (
        <ActiveModal
          isOpenActive={isOpenActive}
          onCloseActiveModal={handleCloseActiveModal}
          onSubmit={handleActive}
          title={
            item.isActive
              ? `Tắt trạng thái hoạt động cho mẫu ${name}`
              : `Bật trạng thái hoạt động cho mẫu ${name}`
          }
          subtitle={
            item.isActive
              ? `Bạn có chắc chắn muốn tắt hoạt động cho mẫu ${name}`
              : `Bạn có chắc chắn muốn bật hoạt động cho mẫu ${name}`
          }
          item={item}
        />
      )}

      {isOpenForm && (
        <EmailFormModal
          isOpen={isOpenForm}
          type={type}
          data={item}
          title={item?.id ? `Chỉnh sửa mẫu ${name}` : `Thêm mới mẫu ${name}`}
          onClose={handleCloseForm}
        />
      )}

      <EmailFormBottomNav
        open={selected.some((i) => i)}
        onClose={handleCloseBottomNav}
        onDelete={handleDelete}
        setIsOpenActive={setIsOpenActive}
        selectedList={findIndex(true, selected)?.map((i) => data[i]) || []}
        onGetParentNode={setItem}
        setActionType={setActionType}
        setActionTypeActive={setActionTypeActive}
        status={data?.[selected.indexOf(true)]?.isActive}
        onOpenForm={handleOpenForm}
      />
    </Page>
  );
};

export default EmailForm;
