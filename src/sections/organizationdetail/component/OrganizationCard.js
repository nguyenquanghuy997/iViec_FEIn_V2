import React, {useState} from 'react'
import {Box, Checkbox, IconButton, Stack, Typography} from "@mui/material";
import Iconify from "@/components/Iconify";
import {BoxFlex} from "@/sections/emailform/style";
import {AvatarDS} from "@/components/DesignSystem";
import {EditIcon} from "@/assets/ActionIcon";
import {CheckboxIconChecked, CheckboxIconDefault} from "@/assets/CheckboxIcon";
import {
  CardUserFormItemContentStyle,
  CardUserFormItemTitleStyle,
  CardUserStyle
} from "@/sections/organizationdetail/style";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {DOMAIN_SERVER_API} from "@/config";
import {fDate} from "@/utils/formatTime";

const OrganizationCard = (
    {
      isCheckbox,
      expanded,
      checked,
      onChangeSelected,
      item, selected,
      onOpenConfirmDelete,
      onOpenFormModal
    }) => {

    const [showAll, setShowAll] = useState(false);

    const toggleShow = () => {
        setShowAll(!showAll);
    }

  return (
      <CardUserStyle
          className="card-user-item"
          expanded={expanded}
      >
        <BoxFlex alignItems={"flex-start"}>
          <CardUserFormItemTitleStyle className="card-user-item-title">
            {isCheckbox && <Checkbox
                value={item}
                checked={checked}
                onChange={onChangeSelected}
                icon={<CheckboxIconDefault/>}
                checkedIcon={<CheckboxIconChecked/>}
            />}
            <AvatarDS
                sx={{height: "40px", width: "40px", borderRadius: "10px", fontSize: "10px"}}
                name={`${item?.lastName ? item?.lastName : ''} ${item.firstName ? item.firstName : ''}`}
            />
            <Stack>
              <Typography sx={{
                color: style.COLOR_TEXT_BLACK,
                fontSize: style.FONT_SM,
                fontWeight: style.FONT_SEMIBOLD
              }}>
                {`${item?.lastName ? item?.lastName : ''} ${item.firstName ? item.firstName : ''}`}
              </Typography>
              <Typography
                  className="card-user-item-subtitle"
                  component="span">
                {`${item.email ? item.email : ''} ${item.phoneNumber ? item.phone : ''}`}
              </Typography>
            </Stack>
          </CardUserFormItemTitleStyle>
          <Typography sx={{color: style.COLOR_SUCCESS, fontSize: style.FONT_XS, fontWeight: style.FONT_MEDIUM}}>
            {item.isActive ? 'Đang hoạt động' : <span style={{ color: style.COLOR_TEXT_BLACK }}>Không hoạt động</span>}
          </Typography>
        </BoxFlex>
        <BoxFlex>
          <BoxFlex>
            <CardUserFormItemContentStyle className="card-user-item-content-text">
                {item?.applicationUserRoleGroups[0]?.name}
            </CardUserFormItemContentStyle>
              <Box
                  sx={{padding: '5px 8px', ml: 1, backgroundColor: '#EFF3F6', borderRadius: '100px', cursor: 'pointer', display: showAll ?'none' : 'block'}}
                  onClick={toggleShow}
              >
                  {!showAll && <Typography sx={{
                      fontSize: 12,
                      fontWeight: 500,
                      color: '#172B4D',
                      display: 'flex',
                      alignItems: 'center'
                  }}>
                      Thuộc {item?.organizations?.length} đơn vị
                      <Iconify icon={"material-symbols:arrow-drop-down"} height={16} width={16} sx={{ ml: 1 }} />
                  </Typography>}
              </Box>
          </BoxFlex>
          <BoxFlex>
              {selected?.length > 1 ? null : (
                  <>
                      <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenFormModal}>
                          <EditIcon/>
                      </IconButton>
                      <IconButton size='small' sx={{color: '#5C6A82', ml: 2}} onClick={onOpenConfirmDelete}>
                          <Iconify icon='ci:trash-full' sx={{width: 18, height: 18}}/>
                      </IconButton>
                  </>
              )}
          </BoxFlex>
        </BoxFlex>
          {
              showAll && (
                  <>
                      <Box sx={{display: 'flex', alignItems: 'center', flexWrap: 'wrap', my: 1.5, "& .organization-card:last-child": {mr: 0} }}>
                          {
                              item?.organizations?.map(organization => (
                                  <Box
                                      key={organization?.id}
                                      className={"organization-card"}
                                      sx={{
                                          padding: '12px 16px',
                                          backgroundColor: '#FDFDFD',
                                          minHeight: '70px',
                                          minWidth: '230px',
                                          border: '1px solid #A2AAB7',
                                          borderRadius: '6px',
                                          display: 'flex', alignItems: 'center',
                                          mr: 1.5, mb: 1.5
                                      }}
                                  >
                                      <Box sx={{width: '48px', height: '48px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginRight: '24px'}}>
                                          {
                                              organization?.avatar ?
                                                  <img src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${organization?.avatar}`} alt="Logo"/> :
                                                  <img src={`/assets/placeholder.png`} alt="Logo"/>
                                          }
                                      </Box>
                                      <Stack>
                                          <Typography sx={{ fontSize: 13, fontWeight: 500, color: '#172B4D' }}>{organization?.name}</Typography>
                                          <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#455570' }}>{organization?.code}</Typography>
                                      </Stack>
                                  </Box>
                              ))
                          }
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Typography sx={{ fontSize: 12, fontWeight: 400, color: '#5C6A82', mr: 1 }}>
                              Ngày tham gia: {fDate(item?.registrationTime)}
                          </Typography>
                          <Box
                              sx={{
                                  padding: '5px 8px',
                                  backgroundColor: '#EFF3F6',
                                  borderRadius: '100px',
                                  display: !showAll ? 'none' : 'block',
                                  cursor: 'pointer',
                              }}
                              onClick={toggleShow}
                          >
                              <Typography sx={{ fontSize: 12, fontWeight: 500, color: '#172B4D', display: 'flex', alignItems: 'center' }}>
                                  Thu gọn
                                  <Iconify icon={"material-symbols:arrow-drop-up"} height={16} width={16} sx={{ ml: 1 }} />
                              </Typography>
                          </Box>
                      </Box>
                  </>
              )
          }
      </CardUserStyle>
  )
}

export default React.memo(OrganizationCard);