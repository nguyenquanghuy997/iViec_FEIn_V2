import { CheckboxIconChecked, CheckboxIconDefault, } from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import {
  BoxFlex, CardFormItemContentStyle, CardFormItemStyle, CardFormItemTitleStyle,
} from "@/sections/emailform/style";
import { ActionSwitchCheckedIcon, ActionSwitchUnCheckedIcon, } from "@/sections/organization/component/Icon";
import { ButtonIcon } from "@/utils/cssStyles";
import {
  AccordionDetails, AccordionSummary, Box, Checkbox, CircularProgress, Divider, IconButton, Tooltip, Typography,
} from "@mui/material";
import React from "react";
import moment from "moment/moment";
import { Image } from "antd";
import { getFileUrl } from "@/utils/helper";
import { useTheme } from "@mui/material/styles";
import { useLazyGetPreviewOfferTemplateQuery } from "@/sections/offer-form/OfferFormSlice";
import { renderFileUploadItem } from "@/sections/offer-form/component/OfferFormModal";

const CardEmailFormItem = ({
  isCheckbox,
  expanded,
  checked,
  onChangeSelected,
  onChangeExpand,
  index,
  item,
  onOpenConfirmDelete,
  onOpenActiveModal,
  onOpenFormModal,
  canEdit
}) => {
  const theme = useTheme();
  const [getPreviewOffer, {data: Data}] = useLazyGetPreviewOfferTemplateQuery();
  const handleExpandCallDataExtend = async () => {
    if (!Data) {
      await getPreviewOffer({id: item.id}).unwrap();
    }
    onChangeExpand();
  };
  
  return (<CardFormItemStyle className="card-item" expanded={expanded} onChange={handleExpandCallDataExtend}>
      <AccordionSummary
        expandIcon={<ButtonIcon
          icon={<Iconify
            icon="material-symbols:keyboard-arrow-down-sharp"
            width={18}
            height={18}
            color="#455570"
          />}
        />}
        aria-controls={`panel${index}a-content`}
        id={`panel${index}a-header`}
      >
        <BoxFlex style={{marginBottom: 12}}>
          <CardFormItemTitleStyle className="card-item-title">
            {isCheckbox && (<Checkbox
                value={item}
                checked={checked}
                onChange={onChangeSelected}
                icon={<CheckboxIconDefault/>}
                checkedIcon={<CheckboxIconChecked/>}
              />)}
            {item.name}
            <Typography className="card-item-subtitle" component="span">
              (Đã gửi 0)
            </Typography>
          </CardFormItemTitleStyle>
          {item.isActive && (<Typography
              sx={{color: "#388E3C", fontSize: 12, fontWeight: 500, mr: 6}}
            >
              Đang hoạt động
            </Typography>)}
        </BoxFlex>
        <BoxFlex>
          <BoxFlex>
            <AvatarDS
              sx={{
                height: "20px", width: "20px", borderRadius: "100px", fontSize: "8px",
              }}
              name={item.creatorName}
            />
            <CardFormItemContentStyle className="card-item-content-text">
              {item.creatorName}
              <Typography
                component="span"
                className="card-item-content-subtext"
              >
                đã tạo ngày {moment(item.createdTime).format("DD/MM/YYYY")}
              </Typography>
            </CardFormItemContentStyle>
          </BoxFlex>
          <BoxFlex>
            {canEdit && <>
              <ButtonIcon
                onClick={() => onOpenActiveModal(item)}
                sx={{
                  backgroundColor: "unset !important", cursor: "pointer", padding: 0,
                }}
                icon={item.isActive ? (<ActionSwitchCheckedIcon/>) : (<ActionSwitchUnCheckedIcon/>)}
              />
              
              <Tooltip title="Sửa">
                <IconButton
                  style={{
                    margin: '0 8px'
                  }}
                  onClick={() => onOpenFormModal(item)}>
                  <Iconify
                    icon={"ri:edit-2-fill"}
                    width={16}
                    height={16}
                    color="#5C6A82"
                  />
                </IconButton>
              </Tooltip>
              
              <Tooltip title="Xóa">
                <IconButton
                  onClick={() => onOpenConfirmDelete(item)}
                >
                  <Iconify
                    icon={"material-symbols:delete-outline-rounded"}
                    width={16}
                    height={16}
                    color="#5C6A82"
                  />
                </IconButton>
              </Tooltip>
            </>}
          </BoxFlex>
        </BoxFlex>
      </AccordionSummary>
      <AccordionDetails sx={{mt: '12px !important'}}>
        {!Data ? <Box my={3} textAlign={"center"}>
          <CircularProgress/>
        </Box> : <>
          <Divider/>
          <Box sx={{m: 3}}>
            <Box sx={{mb: "12px"}}>
              <Typography variant={"subtitle1"} sx={theme.palette.text.primary}>
                Tiêu đề email
              </Typography>
            </Box>
            <Box sx={{mb: "36px"}}>
              <Typography variant={"body2"} color={theme.palette.text.sub}>
                {Data?.title}
              </Typography>
            </Box>
            <Box sx={{mb: "12px"}}>
              <Typography variant={"subtitle1"} sx={theme.palette.text.primary}>
                Nội dung email
              </Typography>
            </Box>
            <Box display={"flex"} sx={{overflowX: 'auto', my: "12px"}}>
              {Data?.templateAttachFiles.length > 0 && Data?.templateAttachFiles.map((file, index) => renderFileUploadItem(file, index, undefined, true))}
            </Box>
            <Box sx={{mb: "36px"}}>
              <div dangerouslySetInnerHTML={{__html: Data?.content}}/>
            </Box>
            <Box sx={{mb: "12px"}}>
              <Typography variant={"subtitle1"} sx={theme.palette.text.primary}>
                Chữ ký email
              </Typography>
            </Box>
            <Box sx={{display: 'flex', mt: 3}}>
              <Image
                width={124}
                height={124}
                src={getFileUrl(Data?.signatureLogo)}
                preview={false}
              />
              <div style={{marginLeft: 24}} dangerouslySetInnerHTML={{__html: Data?.signatureContent}}/>
            </Box>
          </Box>
        </>}
      </AccordionDetails>
    </CardFormItemStyle>);
};

export default React.memo(CardEmailFormItem);
