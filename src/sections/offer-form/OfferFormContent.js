import React, { useEffect, useMemo, useState } from 'react'
import { Box } from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import ActiveModal from "@/sections/emailform/component/ActiveModal";
import OfferFormBottomNav from "@/sections/offer-form/component/OfferFormBottomNav";
import { useForm } from "react-hook-form";
import OfferFormFilterHeader from "@/sections/offer-form/component/OfferFormFilterHeader";
import OfferFormFilterModal from "@/sections/offer-form/component/OfferFormFilterModal";
import OfferFormModal from "@/sections/offer-form/component/OfferFormModal";
import useRole from '@/hooks/useRole';
import { PERMISSIONS } from '@/config';
import {
  useDeleteOfferTemplateMutation,
  useGetAllOfferTemplateQuery,
  useUpdateActiveOfferTemplateMutation
} from "@/sections/offer-form/OfferFormSlice";
import { useRouter } from "next/router";
import { isArray } from "lodash";
import { findIndex, toRequestFilterData } from "@/utils/helper";
import { useSnackbar } from "notistack";

const defaultValues = {
  searchKey: "",
  createdTimeFrom: "",
  createdTimeTo: "",
  creatorIds: [],
  isActive: undefined,
};

const OfferFormContent = () => {
  const router = useRouter();
  const {query, isReady} = router;
  const {data: {items: data = []} = {}} = useGetAllOfferTemplateQuery(query, {skip: !isReady});
  const [activeOffer] = useUpdateActiveOfferTemplateMutation();
  const [deleteOffer] = useDeleteOfferTemplateMutation();
  
  const [expands, setExpands] = useState([]);
  const [selected, setSelected] = useState([]);
  
  // modal
  const [item, setItem] = useState(null);
  const [isOpenForm, setIsOpenForm] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [isOpenFilter, setIsOpenFilter] = useState(false)
  
  // bottom nav modal
  const [, setIsOpenBottomNav] = React.useState(false);
  const [, setActionType] = useState(0)    // 0 add, 1 update
  const [, setActionTypeActive] = useState(0)    // 1 active 0 inactive
  
  const {enqueueSnackbar} = useSnackbar();
  // form search
  const methods = useForm({
    mode: "onChange",
    defaultValues: {...defaultValues},
  });
  
  const {
    setValue,
  } = methods;
  
  useEffect(() => {
    let queryValues = toRequestFilterData(query);
    for (let item in query) {
      if (query[item]) {
        if (isArray(defaultValues[item]))
          setValue(item, isArray(query[item]) ? queryValues[item] : [queryValues[item]])
        else setValue(item, queryValues[item])
      } else setValue(item, defaultValues[item])
    }
  }, [query]);
  
  useEffect(() => {
    if(data.length === 0) return
    setExpands(Array(data.length).fill(false));
    setSelected(Array(data.length).fill(false));
  }, [data])
  
  // expand card item
  const handleChangeExpand = (index) => {
    const expandsNext = [...expands].map((item, idx) => idx === index ? !item : item)
    setExpands(expandsNext);
  };
  
  const handleSelected = (data, index) => {
    const selectedNext = [...selected].map((i, idx) => idx === index ? !i : i)
    setSelected(selectedNext);
  }
  
  // handle delete
  const handleOpenConfirm = (data) => {
    setItem(data);
    setConfirmDelete(true);
  }
  
  const handleCloseConfirm = () => {
    setConfirmDelete(false);
    setItem(null);
  }
  
  const handleDelete = async (data) => {
    await deleteOffer({ids: data}).unwrap().then(() => {
      enqueueSnackbar("Thực hiện thành công!", {
        autoHideDuration: 2000,
      });
    }).catch(() => {
      enqueueSnackbar("Thực hiện thất bại!", {
        autoHideDuration: 1000,
        variant: "error",
      });
    });
    handleCloseConfirm();
  }
  
  // handle active
  const handleOpenActiveModal = (data) => {
    setItem(data);
    setIsOpenActive(true);
  }
  
  const handleCloseActiveModal = () => {
    setIsOpenActive(false);
    setItem(null);
  }
  
  const handleActive = async (data) => {
    await activeOffer({isActive: !data.isActive, id: data.id}).unwrap().then(() => {
      enqueueSnackbar("Thực hiện thành công!", {
        autoHideDuration: 2000,
      });
    }).catch(() => {
      enqueueSnackbar("Thực hiện thất bại!", {
        autoHideDuration: 1000,
        variant: "error",
      });
    });
    handleCloseActiveModal();
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
  
  const onSubmitFilter = (values = {}, timeout = 1) => {
    setTimeout(() => {
      router.push({
        query: {...router.query, ...values},
      }, undefined, {shallow: false});
      setIsOpenFilter(false);
    }, timeout);
  }
  
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
          onSubmitFilter={onSubmitFilter}
          handleFilterForm={setIsOpenFilter}
          onOpenForm={handleOpenForm}
        />
        {data.map((column, index) => {
          return <CardEmailFormItem
            isCheckbox
            key={index}
            index={index}
            item={column}
            expanded={expands[index]}
            checked={selected[index]}
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
          open={selected?.length > 0}
          onClose={handleCloseBottomNav}
          onDelete={handleDelete}
          setIsOpenActive={setIsOpenActive}
          selectedList={findIndex(true, selected)?.map(i => data[i]) || []}
          onGetParentNode={setItem}
          setActionType={setActionType}
          setActionTypeActive={setActionTypeActive}
          status={data?.[selected.indexOf(true)].isActive}
          onOpenForm={handleOpenForm}
        />
      }
      {isOpenFilter && <OfferFormFilterModal
        methods={methods}
        isOpen={isOpenFilter}
        handleOpen={setIsOpenFilter}
        onSubmit={onSubmitFilter}
      />}
    </>
  )
}

export default OfferFormContent;