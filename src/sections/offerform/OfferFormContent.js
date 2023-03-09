import React, {useState} from 'react'
import {Box} from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import OfferFormBottomNav from "@/sections/offerform/component/OfferFormBottomNav";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import OfferFormFilterHeader from "@/sections/offerform/component/OfferFormFilterHeader";
import OfferFormFilterModal from "@/sections/offerform/component/OfferFormFilterModal";
import OfferFormModal from "@/sections/offerform/component/OfferFormModal";

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
    title: 'Mẫu email mời nhận việc 1',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: true,
    createdDate: '17/02/2023',
  },
  {
    id: 3,
    title: 'Mẫu email mời nhận việc 2',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 4,
    title: 'Mẫu email mời nhận việc 3',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  },
  {
    id: 5,
    title: 'Mẫu email mời nhận việc 4',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: true,
    createdDate: '17/02/2023',
  },
  {
    id: 5,
    title: 'Mẫu email mời nhận việc 5',
    subtitle: '(Đã gửi 12)',
    user: 'Đinh Tiến Thành',
    isActive: false,
    createdDate: '17/02/2023',
  }
]

const defaultValues = {
  searchKey: "",
};
const OfferFormContent = () => {

  const [offerFormLIst] = useState([...data])

  const [expands, setExpands] = useState(Array(offerFormLIst.length).fill(false));
  const [selected, setSelected] = useState(Array(offerFormLIst.length).fill(false));
  const [selectedValue, setSelectedValue] = useState(Array(offerFormLIst.length).fill({checked: false}));

  // modal
  const [item, setItem] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);

  // bottom nav modal
  const [, setIsOpenBottomNav] = React.useState(false);
  const [, setShowDelete] = useState(false);
  const [, setShowMultipleDelete] = useState(false);
  const [, setActionType] = useState(0)    // 0 add, 1 update
  const [, setActionTypeActive] = useState(0)    // 1 active 0 inactive

  const [isOpenFilter, setIsOpenFilter] = useState(false)
  const handleOpenFilterForm = () => {
    setIsOpenFilter(true);
  }

  const handleCloseFilterForm = () => {
    setIsOpenFilter(false);
  }

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: {...defaultValues},
    resolver: yupResolver(Schema),
  });

  const {handleSubmit} = methods;

  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) => idx === index ? !item : item)
    setExpands(expandsNext);
  };

  const handleSelected = (data, index) => {
    const selectedNext = [...selected].map((i, idx) => idx === index ? !i : i)
    const selectedValueNext = [...selectedValue].map((i, idx) => idx === index ? {...i, checked: !i.checked} : {
      ...i,
      checked: i.checked
    })
    setSelected(selectedNext);
    setSelectedValue(selectedValueNext);
  }

  // handle delete
  const handleOpenConfirm = (data) => {
    setConfirmDelete(true);
    setItem(data);
  }

  const handleCloseConfirm = () => {
    setConfirmDelete(false);
    setItem(null);
  }

  const handleDelete = (data) => {
    console.log(data)
  }

  // handle active
  const handleOpenActiveModal = (data) => {
    setIsOpenActive(true);
    setItem(data);
  }

  const handleCloseActiveModal = () => {
    setIsOpenActive(false);
    setItem(null);
  }

  const handleActive = (data) => {
    console.log(data)
  }

  // handle form (add & update)
  const handleOpenForm = (data) => {
    setItem(data)
    setIsOpenForm(true);
  }

  const handleCloseForm = () => {
    setIsOpenForm(false);
    setItem(null)
  }

  // handle bottom nav
  const handleCloseBottomNav = () => {
    setIsOpenBottomNav(false);
    setSelected([]);
  };

  return (
      <>
        <Box>
          <FormHeader
              title="Mẫu email mời nhận việc"
              subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
              buttonTitle="Thêm mẫu email"
              showButton={false}
              onOpenForm={handleOpenForm}
          />
          <OfferFormFilterHeader
              methods={methods}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
              onOpenForm={handleOpenForm}
          />
          {data.map((column, index) => {
            return <CardEmailFormItem
                isCheckbox
                key={index}
                index={index}
                item={column}
                expanded={expands[index]}
                checked={selectedValue[index].checked}
                onChangeSelected={() => handleSelected(column, index)}
                onChangeExpand={() => handleChangeExpand(index)}
                onOpenConfirmDelete={handleOpenConfirm}
                onOpenActiveModal={handleOpenActiveModal}
                onOpenFormModal={handleOpenForm}
            />
          })}
        </Box>
        {confirmDelete && <ConfirmModal
            confirmDelete={confirmDelete}
            onCloseConfirmDelete={handleCloseConfirm}
            onSubmit={handleDelete}
            title="Xác nhận xóa mẫu email mời nhận việc"
            subtitle="Bạn có chắc chắn muốn xóa mẫu email"
            item={item}
        />}
        {isOpenActive && <ActiveModal
            isOpenActive={isOpenActive}
            onCloseActiveModal={handleCloseActiveModal}
            onSubmit={handleActive}
            title={item.isActive ? "Tắt trạng thái hoạt động cho mẫu email mời nhận việc" : "Xác nhận xóa mẫu email mời nhận việc"}
            subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt hoạt động cho mẫu email mời nhận việc" : "Bạn có chắc chắn muốn bật hoạt động cho mẫu email mời nhận việc"}
            item={item}
        />}
        {isOpenForm && <OfferFormModal
            isOpen={isOpenForm}
            onClose={handleCloseForm}
            item={item}
            showUploadFile
            title={item?.id ? 'Chỉnh sửa mẫu email mời nhận việc' : 'Thêm mới mẫu email mời nhận việc'}
        />}
        {
            selected.some((i => i === true)) && <OfferFormBottomNav
                item={data.find(i => i)}
                open={selected?.length > 0}
                onClose={handleCloseBottomNav}
                setShowDelete={setShowDelete}
                setShowMultipleDelete={setShowMultipleDelete}
                setIsOpenActive={setIsOpenActive}
                selectedList={selected.filter(i => i === true) || []}
                onGetParentNode={setItem}
                setActionType={setActionType}
                setActionTypeActive={setActionTypeActive}
                status={offerFormLIst?.filter(i => selectedValue.includes(i.id)).every(i => i.isActive === true)}
                onOpenForm={handleOpenForm}
            />
        }
        {isOpenFilter && <OfferFormFilterModal
            isOpen={isOpenFilter}
            onClose={handleCloseFilterForm}
            onSubmit={handleCloseFilterForm}
        />}
      </>
  )
}

export default OfferFormContent;