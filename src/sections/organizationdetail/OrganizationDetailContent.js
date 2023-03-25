import React, {useMemo, useState} from 'react'
import {Box, IconButton, Link, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {get} from 'lodash';
import NextLink from "next/link";
import {useForm} from "react-hook-form";
import {OrganizationNameStyle} from "@/sections/organizationdetail/style";
import Iconify from "@/components/Iconify";
import {EmailIcon, MapIcon, PhoneIcon} from "@/sections/organizationdetail/component/Icon";
import {PATH_DASHBOARD} from "@/routes/paths";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import {
  useGetAllApplicantUserOrganizationByIdQuery,
  useGetListOrganizationWithChildQuery,
  useGetOrganizationByIdQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";
import OrganizationUserFilterModal from "@/sections/organizationdetail/component/OrganizationUserFilterModal";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import OrganizationDetailTableHeader from "@/sections/organizationdetail/component/OrganizationDetailTableHeader";
import OrganizationCard from "@/sections/organizationdetail/component/OrganizationCard";
import {modalSlice} from "@/redux/common/modalSlice";
import {useDispatch, useSelector} from "@/redux/store";
import ConfirmModal from "@/sections/emailform/component/ConfirmModal";
import OrganizationBottomNav from "@/sections/organizationdetail/component/OrganizationDetailBottomNav";
import ActiveModal from "@/sections/emailform/component/ActiveModal";

const defaultValues = {
  searchKey: "",
};

const columns = [
  {
    dataIndex: "applicationUserRoleGroups",
    title: "Vai trò",
    name: "applicationUserRoleGroups",
    label: "Vai trò",
    placeholder: "Chọn 1 hoặc nhiều vai trò",
    type: "select",
    multiple: true,
  },
  {
    dataIndex: "isActive",
    title: "Trạng thái",
    name: "isActive",
    type: "select",
    label: "Trạng thái",
  },
  {
    dataIndex: "registrationTime",
    title: "Ngày tham gia",
    type: "date",
    label: "Ngày tham gia",
    name: "createdTime",
    items: [
      {
        name: "createdTimeFrom",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Từ</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
      {
        name: "createdTimeTo",
        type: "date",
        placeholder: "Chọn ngày",
        startIcon: <span>Đến</span>,
        endIcon: <Iconify icon="material-symbols:calendar-today"/>,
      },
    ],
  },
  {
    dataIndex: "creatorName",
    title: "Người mời tham gia",
    name: "creatorIds",
    label: "Người mời",
    placeholder: "Chọn 1 hoặc nhiều người",
    type: "select",
    multiple: true,
  },
];


const OrganizationDetailContent = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const {query} = router;
  const {id} = router.query;

  const {data: organization = {}, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: id
  }, {skip: !id});

  const {data: { items: ListUser = [] } = {}, isLoading: loadingUser} = useGetAllApplicantUserOrganizationByIdQuery({
    Id: id
  }, {skip: !id});

  const {data: {items: ListOrganization = []} = {}, isLoading: loadingOrganization} = useGetListOrganizationWithChildQuery();

  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(Array(ListUser?.length).fill(false));
  const [isOpen, setIsOpen] = useState(false);

  // modal redux
  const toggleConfirm = useSelector((state) => state.modalReducer.openConfirm);
  const toggleActive = useSelector((state) => state.modalReducer.openActive);
  const item = useSelector((state) => state.modalReducer.data);
  // const selectedData = useSelector((state) => state.modalReducer.selectedData);

  const handleOpenConfirm = (data) => dispatch(modalSlice.actions.confirmModal(data));
  const handleOpenActive = (data) => dispatch(modalSlice.actions.activeModal(data));

  const handleOpenBottomNav = (data) => dispatch(modalSlice.actions.onBottomNavModal(data));

  const handleCloseModal = () => dispatch(modalSlice.actions.closeModal());

  const handleOpenForm = () => {
    setIsOpen(true);
  }

  const handleCloseForm = () => {
    setIsOpen(false);
  }

  const methods = useForm({
    mode: "onChange",
    defaultValues: useMemo(
        () => query.searchKey ? {...defaultValues, searchKey: query.searchKey} : {...defaultValues},
        [query.searchKey]
    ),
  });

  const {handleSubmit} = methods;

  // open filter form
  const [isOpenFilter, setIsOpenFilter] = useState(false);
  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpenFilter(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpenFilter(false);
  };

  const onSubmitSearch = async (data) => {
    await router.push(
        {
          pathname: router.pathname,
          query: {...query, searchKey: data.searchKey},
        },
        undefined,
        {shallow: true}
    );
  };

  const onSubmit = async (data) => {
    return data;
  };

  const handleSelected = (data, index) => {
    let findIndex = selected.indexOf(data.id);
    if (findIndex !== -1) {
      const selectedNext = [...selected].filter(i => i !== data.id)
      setSelected(selectedNext);
    } else {
      const selectedNext = [...selected, data.id]
      setSelected(selectedNext);
    }
    const checkedNext = [...checked].map((i, idx) => idx === index ? !i : i)
    setChecked(checkedNext);
  }

  // handle bottom nav
  const handleCloseBottomNav = () => {
    handleOpenBottomNav(null);
    setSelected([]);
  };

  const handleDelete = (data) => {
    return data;
  }

  const handleActive = (data) => {
    return data;
  }

  if (isLoading || loadingUser || loadingOrganization) return null;

  return (
      <Box>
        {/* Name */}
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <NextLink href={PATH_DASHBOARD.organization.root} passHref>
            <Link>
              <IconButton size='small' sx={{color: '#172B4D', mr: 1}}>
                <Iconify icon="material-symbols:arrow-back"/></IconButton>
            </Link>
          </NextLink>
          <OrganizationNameStyle className="organization-title">
            {get(organization, 'name') && `${get(organization, 'name')}`}
          </OrganizationNameStyle>
          <IconButton onClick={handleOpenForm} size='small' sx={{color: '#8A94A5', ml: 1}}><Iconify
              icon="ri:edit-2-fill"/></IconButton>
        </Box>
        {/* End Name */}
        {/* Sub info */}
        <Box sx={{display: 'flex', alignItems: 'center', mt: 2}}>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <EmailIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'email') && `${get(organization, 'email')}`}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <PhoneIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'phoneNumber') && `${get(organization, 'phoneNumber')}`}
            </Typography>
          </Box>
          <Box sx={{display: 'flex', alignItems: 'center', mr: 3.5}}>
            <MapIcon/>
            <Typography sx={{fontSize: 13, fontWeight: 500, color: '#455570', ml: 1}}>
              {get(organization, 'address') && `${get(organization, 'address')}, `}
              {get(organization, 'districtName') && `${get(organization, 'districtName')}, `}
              {get(organization, 'provinceName') && `${get(organization, 'provinceName')}`}
            </Typography>
          </Box>
        </Box>
        {/* End Sub info */}
        {/* Table */}
        <Box sx={{mt: 2}}>
          <OrganizationDetailTableHeader
              methods={methods}
              isOpen={isOpenFilter}
              onSubmit={onSubmitSearch}
              handleSubmit={handleSubmit}
              onOpenFilterForm={handleOpenFilterForm}
              onCloseFilterForm={handleCloseFilterForm}
              setIsOpenInviteForm={setIsOpenInviteForm}
          />
          {ListUser.map((column, index) => {
            return <OrganizationCard
                isCheckbox
                key={index}
                item={column}
                checked={checked[index]}
                onChangeSelected={() => handleSelected(column)}
                onOpenConfirmDelete={() => handleOpenConfirm(column)}
                onOpenFormModal={handleOpenForm}
            />
          })}
        </Box>
        {/*  Modal Edit Organization */}
        <OrganizationForm
            actionType={1}
            isOpen={isOpen}
            onClose={handleCloseForm}
            parentNode={organization}
        />
        {/* Filer */}
        {isOpenFilter &&
            <OrganizationUserFilterModal
                columns={columns}
                isOpen={isOpenFilter}
                onClose={handleCloseFilterForm}
                onSubmit={onSubmit}
            />
        }
        {
          isOpenInviteForm && <OrganizationInviteForm
                ListOrganization={ListOrganization}
                isOpenInviteForm={isOpenInviteForm}
                setIsOpenInviteForm={setIsOpenInviteForm}
            />
        }
      {/*  Confirm Modal  */}
        {toggleConfirm && <ConfirmModal
            confirmDelete={toggleConfirm}
            onCloseConfirmDelete={handleCloseModal}
            onSubmit={handleDelete}
            title="Xác nhận xóa người dùng"
            subtitle="Bạn có chắc chắn muốn xóa người dùng"
            strongSubtitle={`${item.lastName ? item.lastName : ''} ${item.firstName ? item.firstName : ''}`}
            item={item}
        />}
      {/* Active Modal */}
        {toggleActive && <ActiveModal
            isOpenActive={toggleActive}
            onCloseActiveModal={handleCloseModal}
            onSubmit={handleActive}
            title={item.isActive ? "Tắt trạng thái áp dụng cho mẫu email" : "Bật trạng thái áp dụng cho mẫu email"}
            subtitle={item.isActive ? "Bạn có chắc chắn muốn tắt trạng thái áp dụng cho mẫu email" : "Bạn có chắc chắn muốn bật trạng thái áp dụng cho mẫu email"}
            item={item}
        />}
      {/* Bottom Nav */}
        {
            selected?.length > 0 && <OrganizationBottomNav
                item={ListUser.find(i => selected.includes(i.id))}
                open={selected?.length > 0}
                onClose={handleCloseBottomNav}
                // setShowDelete={setShowDelete}
                // setShowMultipleDelete={setShowMultipleDelete}
                onOpenActive={handleOpenActive}
                onCloseActive={handleCloseModal}
                selectedList={selected?.length || 0}
                // setActionType={setActionType}
                // setActionTypeActive={setActionTypeActive}
                status={ListUser?.filter(i => selected.includes(i.id)).every(i => i.isActive === true)}
                onOpenForm={handleOpenForm}
            />
        }
      </Box>
  )
}

export default OrganizationDetailContent;