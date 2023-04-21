import { useState } from "react";
import { PERMISSIONS, PERMISSION_PAGES } from "@/config";
import SettingLayout from "@/layouts/setting";
import { Box } from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import Page from "@/components/Page";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from '@/sections/emailform/component/ConfirmModal';
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import FormModal from "@/sections/emailform/component/FormModal";
import { useDispatch, useSelector } from "@/redux/store";
import { modalSlice } from "@/redux/common/modalSlice";
import useRole from "@/hooks/useRole";
import { useMemo } from "react";

Account.getLayout = function getLayout(pageProps, page) {
  return (
    <SettingLayout permissions={PERMISSION_PAGES.emailTemplate} {...pageProps}>
      {page}
    </SettingLayout>
  );
};

// data
const data = [
  {
    id: 1,
    title: 'Mặc định',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: true,
    createdDate: '17/02/2023',
  },
  {
    id: 2,
    title: 'Mẫu mail thông báo tài khoản 2',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 3,
    title: 'Mẫu mail thông báo tài khoản 3',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 4,
    title: 'Mẫu mail thông báo tài khoản 4',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 5,
    title: 'Mẫu mail thông báo tài khoản 5',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  }
]

function Account() {

  const [expands, setExpands] = useState(Array(data.length).fill(false));
  // modal redux
  const dispatch = useDispatch();
  const toggleFormModal = useSelector((state) => state.modalReducer.openForm);
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const item = useSelector((state) => state.modalReducer.data);
  const handleOpenModal = (data) => dispatch(modalSlice.actions.openModal(data));
  const handleOpenConfirm = (data) => dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) => dispatch(modalSlice.actions.activeModal(data));
  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) => idx === index ? !item : item)
    setExpands(expandsNext);
  };

  const handleDelete = (data) => {
    return data;
  }

  const handleActive = (data) => {
    return data;
  }

  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_EMAIL), []);

  return (
    <Page title="Mẫu email thông báo tài khoản">
      <Box>
        <FormHeader
          title="Email thông báo tài khoản"
          subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
          buttonTitle="Thêm mẫu email"
          onOpenModal={() => handleOpenModal(null)}
        />
        {data.map((column, index) => {
          return <CardEmailFormItem
            key={index}
            index={index}
            item={column}
            expanded={expands[index]}
            onChangeExpand={() => handleChangeExpand(index)}
            onOpenConfirmDelete={() => handleOpenConfirm(column)}
            onOpenActiveModal={() => handleOpenActive(column)}
            onOpenFormModal={() => handleOpenModal(column)}
            canEdit={canEdit}
          />
        })}
      </Box>
      {toggleConfirm && <ConfirmModal
        confirmDelete={toggleConfirm}
        onCloseConfirmDelete={handleCloseModal}
        onSubmit={handleDelete}
        title="Xác nhận xóa mẫu email"
        subtitle="Bạn có chắc chắn muốn xóa mẫu email"
        strongSubtitle={item.title}
        item={item}
      />}
      {toggleActive && <ActiveModal
        isOpenActive={toggleActive}
        onCloseActiveModal={handleCloseModal}
        onSubmit={handleActive}
        title={item.isActive ? "Tắt trạng thái áp dụng cho mẫu email" : "Bật trạng thái áp dụng cho mẫu email"}
        subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt trạng thái áp dụng cho mẫu email" : "Bạn có chắc chắn muốn bật trạng thái áp dụng cho mẫu email"}
        item={item}
      />}
      {toggleFormModal && <FormModal
        isOpen={toggleFormModal}
        onClose={handleCloseModal}
        item={item}
        title={item?.id ? 'Chỉnh sửa mẫu email thông báo tài khoản' : 'Thêm mới mẫu email thông báo tài khoản'}
      />}
    </Page>
  )
}

export default Account;