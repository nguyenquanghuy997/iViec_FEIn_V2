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

const OrganizationContent = () => {
  // role
  const { canAccess } = useRole();
  const canViewUser = useMemo(() => canAccess(PERMISSIONS.VIEW_USER), []);
  const canEditUser = useMemo(() => canAccess(PERMISSIONS.CRUD_USER), []);
  const canApproveUser = useMemo(() => canAccess(PERMISSIONS.APPR_USER_INVITE), []);

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
      <Box sx={{px: 7.5, py: 5, backgroundColor: "#FDFDFD", minHeight: '100vh'}}>
        {/*  Logo and Info  */}
        <Stack flexDirection="row" alignItems="center" justifyContent='space-between' mb={4}>
          <Stack flexDirection="row" alignItems="center">
            <Avatar
                alt="Logo Company"
                src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${ListOrganization?.find(organization => organization.parentOrganizationId === null)?.avatar}`}
                sx={{width: 60, height: 60}}
            />
            <Stack sx={{ml: 2}}>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: '#172B4D', mb: 0.5}}>
                {ListOrganization?.find(organization => organization.parentOrganizationId === null)?.name}
              </Typography>
              <Typography sx={{fontSize: '12px', fontWeight: '400', color: '#455570'}}>Để chỉnh sửa tên công ty, vui
                lòng
                liên hệ admin qua email Support@iviec.com.vn</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            {
              (canViewUser || canViewUnit || canEditUser || canEditUnit || canApproveUser) && <MuiButton 
              title={"Danh sách mời"}
              color={"default"}
              onClick={() => setIsOpenInviteForm(true)}
              startIcon={<Iconify icon="mdi:folder-upload-outline"/>}
              sx={{ fontWeight: 550, marginRight: 1 }}
            />
            }
            
            {
              (canEditUnit || canEditUser) && <MuiButton 
              title={"Mời người dùng"}
              color={"primary"}
              onClick={() => setIsOpenInviteForm(true)}
              startIcon={<AddIcon />}
              sx={{ fontWeight: 550 }}
            />
            }
            
          </Stack>
        </Stack>
        <Box sx={{mb: 3, mt: 0}}>
          <Typography sx={{color: '#5C6A82', fontSize: 13, fontWeight: 600}}>Quản trị viên</Typography>
          <Box sx={{display: 'flex', alignItems: 'center'}}>
            {
              ListUserAdmin?.map(user => {
                return (
                    <Stack flexDirection="row" sx={{mt: 2, mr: 2}} key={user?.id}>
                      <Box sx={{position: 'relative'}}>
                        <Avatar variant="rounded" sx={{width: 40, height: 40}}/>
                        <span style={{position: 'absolute', top: -12, right: -6}}>
                          <CrownIcon/>
                        </span>
                      </Box>
                      <Stack sx={{ml: 1.5}}>
                        <Typography sx={{color: '#172B4D', fontSize: 14, fontWeight: 600}}>
                          {_.get(user, 'lastName') && _.get(user, 'lastName') || ''}
                          {_.get(user, 'firstName') && _.get(user, 'firstName')}
                        </Typography>
                        <Typography sx={{color: '#455570', fontSize: 12, fontWeight: 400}}>
                          {_.get(user, 'email') && _.get(user, 'email')}
                        </Typography>
                      </Stack>
                    </Stack>
                )
              })
            }
          </Box>
        </Box>
        <Box>
          <InputFilter
              name="search"
              placeholder="Tìm kiếm theo tên đơn vị hoặc mã đơn vị"
              sx={{width: '100%', height: '44px', backgroundColor: '#F2F4F5', marginBottom: 3}}
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
