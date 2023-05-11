import React, { useState } from 'react'
import { Box } from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import OfferFormBottomNav from "@/sections/offer-form/component/OfferFormBottomNav";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import OfferFormFilterHeader from "@/sections/offer-form/component/OfferFormFilterHeader";
import OfferFormFilterModal from "@/sections/offer-form/component/OfferFormFilterModal";
import OfferFormModal from "@/sections/offer-form/component/OfferFormModal";
import useRole from '@/hooks/useRole';
import { useMemo } from 'react';
import { PERMISSIONS } from '@/config';
import { useGetAllOfferTemplateQuery } from "@/sections/offer-form/OfferFormSlice";

const defaultValues = {
  searchKey: "",
};
const OfferFormContent = () => {
  const {data: {items: data = []} = {}} = useGetAllOfferTemplateQuery();
  
  const [expands, setExpands] = useState(Array(data.length).fill(false));
  const [selected, setSelected] = useState(Array(data.length).fill(false));
  const [selectedValue, setSelectedValue] = useState(Array(data.length).fill({checked: false}));
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
    setItem(data);
    setConfirmDelete(true);
  }
  
  const handleCloseConfirm = () => {
    setItem(null);
    setConfirmDelete(false);
  }
  
  const handleDelete = (data) => {
    return data;
  }
  
  // handle active
  const handleOpenActiveModal = (data) => {
    setItem(data);
    setIsOpenActive(true);
  }
  
  const handleCloseActiveModal = () => {
    setItem(null);
    setIsOpenActive(false);
  }
  
  const handleActive = (data) => {
    return data;
  }
  
  // handle form (add & update)
  const handleOpenForm = (data) => {
    setItem(data)
    setIsOpenForm(true);
  }
  
  const handleCloseForm = () => {
    setItem(null);
    setIsOpenForm(false);
  }
  
  // handle bottom nav
  const handleCloseBottomNav = () => {
    setIsOpenBottomNav(false);
    setSelected([]);
  };
  
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_OFFER_TPL), []);
  
  return (
    <>
      <Box>
        <FormHeader
          title="Mẫu mời nhận việc"
          subtitle="Gửi tới Ứng viên khi Nhà tuyển dụng chuyển Ứng viên vào tin và thực hiện thao tác tuyển dụng đầu tiên."
          buttonTitle="Thêm mẫu mời nhận việc"
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
            checked={selectedValue[index]?.checked}
            onChangeSelected={() => handleSelected(column, index)}
            onChangeExpand={() => handleChangeExpand(index)}
            onOpenConfirmDelete={handleOpenConfirm}
            onOpenActiveModal={handleOpenActiveModal}
            onOpenFormModal={handleOpenForm}
            canEdit={canEdit}
          />
        })}
      </Box>
      {confirmDelete && <ConfirmModal
        confirmDelete={confirmDelete}
        onCloseConfirmDelete={handleCloseConfirm}
        onSubmit={handleDelete}
        title="Xác nhận xóa mẫu mời nhận việc"
        subtitle="Bạn có chắc chắn muốn xóa mẫu mời nhận việc"
        strongSubtitle={item.name}
        item={item}
      />}
      {isOpenActive && <ActiveModal
        isOpenActive={isOpenActive}
        onCloseActiveModal={handleCloseActiveModal}
        onSubmit={handleActive}
        title={item.isActive ? "Tắt trạng thái hoạt động cho mẫu mời nhận việc" : "Bật trạng thái hoạt động cho mẫu email mời nhận việc"}
        subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt hoạt động cho mẫu mời nhận việc" : "Bạn có chắc chắn muốn bật hoạt động cho mẫu mời nhận việc"}
        item={item}
      />}
      {isOpenForm && <OfferFormModal
        isOpen={isOpenForm}
        onClose={handleCloseForm}
        item={item}
        title={item?.id ? 'Chỉnh sửa mẫu mời nhận việc' : 'Thêm mới mẫu mời nhận việc'}
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
          status={data?.filter(i => selectedValue.includes(i.id)).every(i => i.isActive === true)}
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