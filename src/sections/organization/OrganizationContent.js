import React, {useMemo, useState} from 'react';
import {Avatar, Box, InputAdornment, Stack, Typography} from "@mui/material";
import _ from 'lodash';
import OrganizationTree from "@/sections/organization/component/OrganizationTree";
import Iconify from "@/components/Iconify";
import OrganizationEmptyChildren from "@/sections/organization/component/OrganizationEmptyChildren";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import {DOMAIN_SERVER_API, PERMISSIONS} from "@/config";
import {convertFlatDataToTree, convertViToEn} from "@/utils/function";
import OrganizationPreview from "@/sections/organization/component/OrganizationPreview";
import OrganizationConfirmModal from "@/sections/organization/component/OrganizationConfirmModal";
import OrganizationBottomNav from "@/sections/organization/component/OrganizationBottomNav";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import InputFilter from "@/components/dynamic-filter/InputFilter";
import {filterBy} from "@/sections/organization/helper/DFSSearchTree";
import {
  useGetAllAdminByOrganizationIdQuery,
  useGetListOrganizationWithChildQuery
} from "@/sections/organization/override/OverrideOrganizationSlice";
import {CrownIcon} from "@/sections/organization/component/Icon";
import OrganizationConfirmMultipleModal from "@/sections/organization/component/OrganizationConfirmMultipleModal";
import OrganizationActiveModal from "@/sections/organization/component/OrganizationActiveModal";
import MuiButton from '@/components/BaseComponents/MuiButton';
import { AddIcon } from '@/assets/ActionIcon';
import LoadingScreen from "@/components/LoadingScreen";
import useRole from '@/hooks/useRole';
import {useTheme} from "@mui/material/styles";
import { useRouter } from 'next/router';

const UserIcon = () => {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_8061_22556)">
        <path d="M9 8.25C9.99456 8.25 10.9484 8.64509 11.6517 9.34835C12.3549 10.0516 12.75 11.0054 12.75 12V16.5H5.25V12C5.25 11.0054 5.64509 10.0516 6.34835 9.34835C7.05161 8.64509 8.00544 8.25 9 8.25ZM3.966 10.5045C3.84664 10.9071 3.77614 11.3226 3.756 11.742L3.75 12V16.5H1.5V13.125C1.49985 12.4782 1.73852 11.8541 2.17023 11.3724C2.60193 10.8907 3.19627 10.5854 3.83925 10.515L3.96675 10.5045H3.966ZM14.034 10.5045C14.7014 10.5452 15.3282 10.839 15.7864 11.3259C16.2447 11.8129 16.4999 12.4563 16.5 13.125V16.5H14.25V12C14.25 11.4803 14.175 10.9785 14.034 10.5045ZM4.125 6C4.62228 6 5.09919 6.19754 5.45083 6.54917C5.80246 6.90081 6 7.37772 6 7.875C6 8.37228 5.80246 8.84919 5.45083 9.20083C5.09919 9.55246 4.62228 9.75 4.125 9.75C3.62772 9.75 3.15081 9.55246 2.79917 9.20083C2.44754 8.84919 2.25 8.37228 2.25 7.875C2.25 7.37772 2.44754 6.90081 2.79917 6.54917C3.15081 6.19754 3.62772 6 4.125 6ZM13.875 6C14.3723 6 14.8492 6.19754 15.2008 6.54917C15.5525 6.90081 15.75 7.37772 15.75 7.875C15.75 8.37228 15.5525 8.84919 15.2008 9.20083C14.8492 9.55246 14.3723 9.75 13.875 9.75C13.3777 9.75 12.9008 9.55246 12.5492 9.20083C12.1975 8.84919 12 8.37228 12 7.875C12 7.37772 12.1975 6.90081 12.5492 6.54917C12.9008 6.19754 13.3777 6 13.875 6ZM9 1.5C9.79565 1.5 10.5587 1.81607 11.1213 2.37868C11.6839 2.94129 12 3.70435 12 4.5C12 5.29565 11.6839 6.05871 11.1213 6.62132C10.5587 7.18393 9.79565 7.5 9 7.5C8.20435 7.5 7.44129 7.18393 6.87868 6.62132C6.31607 6.05871 6 5.29565 6 4.5C6 3.70435 6.31607 2.94129 6.87868 2.37868C7.44129 1.81607 8.20435 1.5 9 1.5Z" fill="#1976D2"/>
      </g>
      <defs>
        <clipPath id="clip0_8061_22556">
          <rect width="18" height="18" fill="white"/>
        </clipPath>
      </defs>
    </svg>
  )
}

const OrganizationContent = () => {
  // init use next router
  const router = useRouter();

  // role
  const { canAccess } = useRole();
  const canViewUser = useMemo(() => canAccess(PERMISSIONS.VIEW_USER), []);
  const canEditUser = useMemo(() => canAccess(PERMISSIONS.CRUD_USER), []);
  const canApproveUser = useMemo(() => canAccess(PERMISSIONS.APPR_USER_INVITE), []);
  const theme = useTheme();
  const canViewUnit = useMemo(() => canAccess(PERMISSIONS.VIEW_UNIT), []);
  const canEditUnit = useMemo(() => canAccess(PERMISSIONS.CRUD_UNIT), []);

  // selected
  const [selected, setSelected] = React.useState([]);
  // modal
  const [, setIsOpenBottomNav] = React.useState(false);

  // state
  const [actionType, setActionType] = useState(0)    // 0 add, 1 update
  const [isOpen, setIsOpen] = useState(false)
  const [parentNode, setParentNode] = useState(null);
  // state open modal
  const [isOpenPreview, setIsOpenPreview] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showMultipleDelete, setShowMultipleDelete] = useState(false);
  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);
  const [isOpenActive, setIsOpenActive] = useState(false);
  const [actionTypeActive, setActionTypeActive] = useState(0)    // 1 active 0 inactive
  const [valueTabInviteForm, setValueTabInviteForm] = useState(0);

  const handleRedirectViewAllMember = (id) => {
    return router.push({ pathname: `${router.pathname}/${id}` }, undefined, { shallow: true })
  }

  const getOrganizationAdmin = () => {
    return ListOrganization?.find(item => item.parentOrganizationId === null)?.id;
  }

  const handleOpenListInvite = () => {
    setValueTabInviteForm(1)
    setIsOpenInviteForm(true)
  }

  const handleOpenInviteForm = () => {
    setValueTabInviteForm(0)
    setIsOpenInviteForm(true)
  }

  // create form
  const handleOpenForm = () => {
    setIsOpen(true);
    setParentNode(null)
  }

  const handleCloseForm = () => {
    setIsOpen(false);
    setParentNode(null)
  }

  // preview form
  const handleOpenPreview = () => {
    setIsOpenPreview(true);
  }

  const handleClosePreview = () => {
    setIsOpenPreview(false);
  }

  const handleGetParentNode = (node) => {
    setParentNode(node);
  }

  const {data: {items: ListOrganization} = [], isLoading,} = useGetListOrganizationWithChildQuery();
  const {data: {items: ListUserAdmin} = []} = useGetAllAdminByOrganizationIdQuery({
    organizationId: ListOrganization?.find(item => item.parentOrganizationId === null)?.id
  });

  const handleCloseBottomNav = () => {
    setIsOpenBottomNav(false);
    setSelected([]);
  };

  const [valueSearch, setValueSearch] = useState('');

  const treeData = useMemo(() => {
    const loopFilterTree = (tree = [], query = '') => {
      return tree.filter(node => {
        const isLeaf = !node.children || !node.children.length;
        let valueNameToEng = convertViToEn(node?.name)?.toLowerCase();
        let valueCodeToEng = convertViToEn(node?.code)?.toLowerCase();
        let valueQueryToEng = convertViToEn(query)?.toLowerCase();
        let isMatching = valueNameToEng?.indexOf(valueQueryToEng) > -1 || valueCodeToEng?.indexOf(valueQueryToEng) > -1;
        if (isMatching) return true;
        if (isLeaf) return false;
        const subtree = filterBy(node.children, query);
        node.children = subtree;
        return Boolean(subtree.length);
      })
    }
    return loopFilterTree(convertFlatDataToTree(ListOrganization)?.[0]?.children, valueSearch);
  }, [ListOrganization, valueSearch])

  const onChangeSearch = (event) => {
    const {value} = event.target;
    setSelected([]);
    setValueSearch(value);
  }

  if (isLoading) return <LoadingScreen />

  return (
      <Box sx={{px: 7.5, py: 5, backgroundColor: theme.palette.common.white, minHeight: '100vh'}}>
        {/*  Logo and Info  */}
        <Stack flexDirection="row" alignItems="center" justifyContent='space-between' mb={4}>
          <Stack flexDirection="row" alignItems="center">
            <Avatar
                alt="Logo Company"
                src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${ListOrganization?.find(organization => organization.parentOrganizationId === null)?.avatar}`}
                sx={{width: 60, height: 60}}
            />
            <Stack sx={{ml: 2}}>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: theme.palette.common.neutral800, mb: 0.5}}>
                {ListOrganization?.find(organization => organization.parentOrganizationId === null)?.name}
              </Typography>
              <Typography sx={{fontSize: '12px', fontWeight: '400', color: theme.palette.common.neutral700}}>Để chỉnh sửa tên công ty, vui
                lòng
                liên hệ admin qua email Support@iviec.com.vn</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            {
              (canViewUser || canViewUnit || canEditUser || canEditUnit || canApproveUser) && <MuiButton 
              title={"Danh sách mời"}
              color={"default"}
              onClick={() => handleOpenListInvite()}
              startIcon={<Iconify icon="mdi:folder-upload-outline"/>}
              sx={{ fontWeight: 550, marginRight: 1 }}
            />
            }
            
            {
              (canEditUnit || canEditUser) && <MuiButton 
              title={"Mời người dùng"}
              color={"primary"}
              onClick={() => handleOpenInviteForm()}
              startIcon={<AddIcon />}
              sx={{ fontWeight: 550 }}
            />
            }
            
          </Stack>
        </Stack>
        <Box sx={{mb: 3, mt: 0}}>
          <Typography sx={{color: theme.palette.common.borderObject, fontSize: 13, fontWeight: 600}}>Quản trị viên</Typography>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {
              ListUserAdmin?.map(user => {
                return (
                    <Stack flexDirection="row" sx={{mt: 2, mr: 2, mb: 2}} key={user?.id}>
                      <Box sx={{position: 'relative'}}>
                        <Avatar variant="rounded" sx={{width: 40, height: 40}}/>
                        <span style={{position: 'absolute', top: -12, right: -6}}>
                          <CrownIcon/>
                        </span>
                      </Box>
                      <Stack sx={{ml: 1.5}}>
                        <Typography sx={{color: theme.palette.common.neutral800, fontSize: 14, fontWeight: 600}}>
                          {_.get(user, 'lastName') && _.get(user, 'lastName') || ''}
                          {_.get(user, 'firstName') && _.get(user, 'firstName')}
                        </Typography>
                        <Typography sx={{color: theme.palette.common.neutral700, fontSize: 12, fontWeight: 400}}>
                          {_.get(user, 'email') && _.get(user, 'email')}
                        </Typography>
                      </Stack>
                    </Stack>
                )
              })
            }
          </Box>
          <Box>
            <MuiButton 
              title={"Xem danh sách toàn bộ nhân viên"}
              color={"default"}
              onClick={() => handleRedirectViewAllMember(getOrganizationAdmin())}
              startIcon={<UserIcon />}
              sx={{ fontWeight: 550, marginRight: 1, padding: '0px 6px', backgroundColor: 'transparent' }}
            />
          </Box>
        </Box>
        <Box>
          <InputFilter
              name="search"
              placeholder="Tìm kiếm theo tên đơn vị hoặc mã đơn vị"
              sx={{width: '100%', height: '44px', backgroundColor: theme.palette.common.bgrMaster, marginBottom: 3}}
              // ref={searchInputRef}
              onChange={onChangeSearch}
              value={valueSearch}
              InputProps={{
                startAdornment: (
                    <InputAdornment position='start' sx={{ml: 1.5}}>
                      <Iconify icon={'eva:search-fill'} sx={{color: 'text.disabled', width: 20, height: 20}}/>
                    </InputAdornment>
                ),
              }}
          />
        </Box>
        <Box>
          {ListOrganization?.length > 0 ?
              <OrganizationTree
                  data={convertFlatDataToTree(ListOrganization)}
                  treeData={treeData}
                  dataRoot={_.pick(convertFlatDataToTree(ListOrganization)[0], ['id', 'name'])}
                  onOpenForm={handleOpenForm}
                  onGetParentNode={handleGetParentNode}
                  onOpenPreview={handleOpenPreview}
                  setShowDelete={setShowDelete}
                  setActionType={setActionType}
                  selected={selected}
                  setSelected={setSelected}
              /> : <OrganizationEmptyChildren onOpenForm={handleOpenForm}/>}
        </Box>
        {isOpen && <OrganizationForm
            isOpen={isOpen}
            onClose={handleCloseForm}
            parentNode={parentNode}
            actionType={actionType}
        />}
        {isOpenPreview && <OrganizationPreview
            isOpen={isOpenPreview}
            onClose={handleClosePreview}
            nodes={parentNode}
            setShowDelete={setShowDelete}
            onGetParentNode={handleGetParentNode}
            setActionType={setActionType}
            onOpenForm={handleOpenForm}
        />}
        {showDelete && <OrganizationConfirmModal
            showDelete={showDelete}
            setShowDelete={setShowDelete}
            node={parentNode}
        />}
        {showMultipleDelete && <OrganizationConfirmMultipleModal
            showMultipleDelete={showMultipleDelete}
            setShowMultipleDelete={setShowMultipleDelete}
            organizationIds={selected}
            setSelected={setSelected}
        />}
        {selected?.length > 0 && <OrganizationBottomNav
            open={selected?.length > 0}
            onClose={handleCloseBottomNav}
            setShowDelete={setShowDelete}
            setShowMultipleDelete={setShowMultipleDelete}
            setIsOpenActive={setIsOpenActive}
            selectedList={selected || []}
            onGetParentNode={handleGetParentNode}
            setActionType={setActionType}
            setActionTypeActive={setActionTypeActive}
            status={ListOrganization?.filter(item => item.parentOrganizationId).filter(item => selected.includes(item.id)).every(item => item.isActivated === true)}
            onOpenForm={handleOpenForm}
        />}
        {isOpenInviteForm && <OrganizationInviteForm
            isOpenInviteForm={isOpenInviteForm}
            setIsOpenInviteForm={setIsOpenInviteForm}
            ListOrganization={ListOrganization}
            valueTabDefault={valueTabInviteForm}
        />}
        {isOpenActive && <OrganizationActiveModal
            actionTypeActive={actionTypeActive}
            setIsOpenActive={setIsOpenActive}
            isOpenActive={isOpenActive}
            node={parentNode}
            selectedList={selected || []}
            onCloseBottomNav={handleCloseBottomNav}
        />}
      </Box>
  )
}

export default React.memo(OrganizationContent);
