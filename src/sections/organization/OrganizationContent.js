import React, {useMemo, useState} from 'react';
import {Avatar, Box, InputAdornment, Stack, Typography} from "@mui/material";
import _ from 'lodash';
import OrganizationTree from "@/sections/organization/component/OrganizationTree";
import Iconify from "@/components/Iconify";
import OrganizationEmptyChildren from "@/sections/organization/component/OrganizationEmptyChildren";
import OrganizationForm from "@/sections/organization/component/OrganizationForm";
import {DOMAIN_SERVER_API} from "@/config";
import {convertFlatDataToTree, convertViToEn} from "@/utils/function";
import OrganizationPreview from "@/sections/organization/component/OrganizationPreview";
import OrganizationConfirmModal from "@/sections/organization/component/OrganizationConfirmModal";
import OrganizationBottomNav from "@/sections/organization/component/OrganizationBottomNav";
import {ButtonInviteListStyle, ButtonInviteStyle} from "@/sections/organization/style";
import OrganizationInviteForm from "@/sections/organization/component/OrganizationInviteForm";
import InputFilter from "@/sections/dynamic-filter/InputFilter";
import {filterBy} from "@/sections/organization/helper/DFSSearchTree";
import {useGetListOrganizationWithChildQuery} from "@/sections/organization/override/OverrideOrganizationSlice";

const OrganizationContent = () => {
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
  const [isOpenInviteForm, setIsOpenInviteForm] = useState(false);

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

  // const {data: {items: ListOrganization} = [], isLoading,} = useGetOrganizationsDataWithChildQuery();
  const {data: {items: ListOrganization} = [], isLoading,} = useGetListOrganizationWithChildQuery();

  const toggleDrawer = (newOpen) => () => {
    setIsOpenBottomNav(newOpen);
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
    const { value } = event.target;
    setSelected([]);
    setValueSearch(value);
  }

  if (isLoading) return <div>Loading...</div>

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
            <Stack sx={{ ml: 2}}>
              <Typography sx={{fontSize: '16px', fontWeight: '600', color: '#172B4D', mb: 0.5}}>
                {ListOrganization?.find(organization => organization.parentOrganizationId === null)?.name}
              </Typography>
              <Typography sx={{fontSize: '12px', fontWeight: '400', color: '#455570'}}>Để chỉnh sửa tên công ty, vui lòng
                liên hệ admin qua email Support@iviec.com.vn</Typography>
            </Stack>
          </Stack>
          <Stack flexDirection="row" alignItems="center">
            <ButtonInviteListStyle
                className='button-invite-list'
                startIcon={<Iconify icon="mdi:folder-upload-outline" />}
                onClick={() => setIsOpenInviteForm(true)}
            >Danh sách mời</ButtonInviteListStyle>
            <ButtonInviteStyle
                className="button-invite"
                startIcon={<Iconify icon="material-symbols:add" />}
                onClick={() => setIsOpenInviteForm(true)}
            >Mời người dùng</ButtonInviteStyle>
          </Stack>
        </Stack>
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
                  // preview modal
                  onOpenPreview={handleOpenPreview}
                  setShowDelete={setShowDelete}
                  setActionType={setActionType}
                  selected={selected}
                  setSelected={setSelected}
              /> : <OrganizationEmptyChildren onOpenForm={handleOpenForm}/>}
        </Box>
        <OrganizationForm isOpen={isOpen} onClose={handleCloseForm} parentNode={parentNode} actionType={actionType} />
        <OrganizationPreview isOpen={isOpenPreview} onClose={handleClosePreview} nodes={parentNode} />
        <OrganizationConfirmModal showDelete={showDelete} setShowDelete={setShowDelete} node={parentNode} />
        <OrganizationBottomNav
            open={selected?.length > 0}
            onClose={toggleDrawer(false)}
            setShowDelete={setShowDelete}
            selecedLength={selected?.length || 0}
        />
        <OrganizationInviteForm
          isOpenInviteForm={isOpenInviteForm}
          setIsOpenInviteForm={setIsOpenInviteForm}
          ListOrganization={ListOrganization}
        />
      </Box>
  )
}

export default React.memo(OrganizationContent);
