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
import CardEmailFormItem from "@/sections/emailform/component/CardEmailFormItem";

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
  const router = useRouter();
  const {query} = router;
  const {id} = router.query;

  const {data: organization = {}, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: id
  }, {skip: !id});

  const {data: { items: ListUser = [] } = {}, isLoading: loadingUser} = useGetAllApplicantUserOrganizationByIdQuery({
    Id: '01000000-ac12-0242-0a6d-08db2759c10a'
  }, {skip: !id});

  const {data: {items: ListOrganization = []} = {}, isLoading: loadingOrganization} = useGetListOrganizationWithChildQuery();

  const [expands, setExpands] = useState(Array(ListUser.length).fill(false));
  const [selected, setSelected] = useState(Array(ListUser.length).fill(false));
  const [selectedValue, setSelectedValue] = useState(Array(ListUser.length).fill({checked: false}));
  // const [, setIsOpenBottomNav] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
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
    console.log(data)
  };

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
            return <CardEmailFormItem
                isCheckbox
                key={index}
                index={index}
                item={column}
                expanded={expands[index]}
                checked={selectedValue[index]?.checked}
                onChangeSelected={() => handleSelected(column, index)}
                onChangeExpand={() => handleChangeExpand(index)}
                // onOpenConfirmDelete={handleOpenConfirm}
                // onOpenActiveModal={handleOpenActiveModal}
                onOpenFormModal={handleOpenForm}
            />
          })}
        </Box>
        {/*  Modal Edit */}
        <OrganizationForm
            actionType={1}
            isOpen={isOpen}
            onClose={handleCloseForm}
            parentNode={organization}
        />
        {/* Filer */}
        {isOpenFilter && (
            <OrganizationUserFilterModal
                columns={columns}
                isOpen={isOpenFilter}
                onClose={handleCloseFilterForm}
                onSubmit={onSubmit}
            />
        )}
        {
          isOpenInviteForm && <OrganizationInviteForm
                ListOrganization={ListOrganization}
                isOpenInviteForm={isOpenInviteForm}
                setIsOpenInviteForm={setIsOpenInviteForm}/>
        }
      </Box>
  )
}

export default OrganizationDetailContent;