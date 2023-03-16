import React, {useMemo, useState} from 'react'
import {Box, IconButton, Link, Typography} from "@mui/material";
import {useRouter} from "next/router";
import {get} from 'lodash';
import NextLink from "next/link";
import * as Yup from "yup";
import {useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
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
import {Status} from "@/utils/enum";
import {fDate} from "@/utils/formatTime";
import {AvatarDS} from "@/components/DesignSystem";
import DynamicColumnsTable from "@/components/BaseComponents/DynamicColumnsTable";
import OrganizationDetailTableHeader from "@/sections/organizationdetail/component/OrganizationDetailTableHeader";
import OrganizationUserFilterModal from "@/sections/organizationdetail/component/OrganizationUserFilterModal";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";

const defaultValues = {
  searchKey: "",
};

const OrganizationDetailContent = () => {
  const router = useRouter();
  const {query} = router;
  const {id} = router.query;
  // 01000000-ac12-0242-b3cd-08db10c50f70

  const {data: organization = {}, isLoading} = useGetOrganizationByIdQuery({
    OrganizationId: id
  }, {skip: !id});

  const {data: ListUser = []} = useGetAllApplicantUserOrganizationByIdQuery({
    Id: '01000000-ac12-0242-b3cd-08db10c50f70'
  }, {skip: !id});

  const {data: {items: ListOrganization} = []} = useGetListOrganizationWithChildQuery();

  const columns = [
    {
      title: "STT",
      key: "index",
      render: (item, record, index) => <>{index + 1}</>,
      width: "60px",
    },
    {
      dataIndex: ['lastName', 'firstName'],
      title: 'Họ và tên',
      render: (text, row) => (
          <div style={{display: "flex", alignItems: "center", minWidth: 220}}>
            <AvatarDS
                sx={{height: "20px", width: "20px", borderRadius: "100px", fontSize: "10px"}}
                name={`${get(row, 'lastName', '')} ${get(row, 'firstName', '')}`}
            />
            <span style={{fontSize: "13px", fontWeight: "500", color: "#172B4D"}}>
              {`${get(row, 'lastName', '')} ${get(row, 'firstName', '')}`}
            </span>
          </div>
      ),
    },
    {
      dataIndex: "email",
      title: "Email",
      width: "220px",
      align: "left",
    },
    {
      dataIndex: "phoneNumber",
      title: "Số điện thoại",
      width: "140px",
      align: "left",
      render: () => <span>0123456789</span>
    },
    {
      dataIndex: "applicationUserRoleGroups",
      title: "Vai trò",
      width: "220px",
      align: "left",
      name: "applicationUserRoleGroups",
      label: "Vai trò",
      placeholder: "Chọn 1 hoặc nhiều vai trò",
      type: "select",
      multiple: true,
      render: () => {
        return <span>No Data</span>
      }
    },
    {
      dataIndex: "isActive",
      title: "Trạng thái",
      width: "180px",
      name: "isActive",
      type: "select",
      label: "Trạng thái",
      render: (item) => (
          <span style={{color: item ? "#388E3C" : "#E53935", minWidth: '120px', display: 'block'}}>
            {Status(item)}
          </span>
      ),
    },
    {
      dataIndex: "registrationTime",
      title: "Ngày tham gia",
      width: "180px",
      type: "date",
      label: "Ngày tham gia",
      name: "createdTime",
      render: (date) => fDate(date),
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
      width: "300px",
      name: "creatorIds",
      label: "Người mời",
      placeholder: "Chọn 1 hoặc nhiều người",
      type: "select",
      multiple: true,
      render: (item) => (
          <div style={{display: "flex", alignItems: "center"}}>
            <AvatarDS
                sx={{
                  height: "20px",
                  width: "20px",
                  borderRadius: "100px",
                  fontSize: "12px",
                }}
                name={item}
            ></AvatarDS>
            <span fontSize="14px" fontWeight="600" color="#172B4D">
            {item}
          </span>
          </div>
      ),
    },
  ];

  const [isOpen, setIsOpen] = useState(false)
  const handleOpenForm = () => {
    setIsOpen(true);
  }

  const handleCloseForm = () => {
    setIsOpen(false);
  }

  // form search
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });

  const methods = useForm({
    mode: "onChange",
    defaultValues: useMemo(
        () => query.searchKey ? {...defaultValues, searchKey: query.searchKey} : {...defaultValues},
        [query.searchKey]
    ),
    resolver: yupResolver(Schema),
  });

  const {handleSubmit} = methods;

  // useEffect(() => {
  //   if (!isReady) return;
  //   const queryParams = {
  //     searchKey: query.searchKey,
  //     isActive: query.isActive ? [Number(query.isActive)] : null,
  //     createdTimeFrom: query.createdTimeFrom ? query.createdTimeFrom : null,
  //     createdTimeTo: query.createdTimeTo ? query.createdTimeTo : null,
  //     creatorIds:
  //         query.creatorIds && typeof query.creatorIds === "string"
  //             ? [query.creatorIds]
  //             : query.creatorIds && query.creatorIds,
  //   };
  //   if (query) {
  //     getAllFilter(JSON.stringify(queryParams)).unwrap();
  //   } else {
  //     getAllFilter({}).unwrap();
  //   }
  // }, [isReady, query]);

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
    const body = {...data, searchKey: data.searchKey};
    await router.push(
        {
          pathname: router.pathname,
          query: {
            ...body,
            createdTimeFrom: data.createdTimeFrom ? new Date(data.createdTimeFrom).toISOString() : null,
            createdTimeTo: data.createdTimeTo ? new Date(data.createdTimeTo).toISOString() : null,
          },
        },
        undefined,
        {shallow: true}
    );
    handleCloseFilterForm();
  };

  if (isLoading) return <div>Loading....</div>

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
          <DynamicColumnsTable
              columns={columns}
              source={ListUser}
              loading={isLoading}
              // ColumnData={ColumnData}
              // menuItemText={menuItemText}
              // UpdateListColumn={handleUpdateListColumnApplicants}
              settingName={"DANH SÁCH VỊ TRÍ CÔNG VIỆC"}
              isSetting={true}
              scroll={{x: 1440}}
              filter={
                <OrganizationDetailTableHeader
                    methods={methods}
                    isOpen={isOpenFilter}
                    onSubmit={onSubmitSearch}
                    handleSubmit={handleSubmit}
                    onOpenFilterForm={handleOpenFilterForm}
                    onCloseFilterForm={handleCloseFilterForm}
                    setIsOpenInviteForm={setIsOpenInviteForm}
                />
              }
          />
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