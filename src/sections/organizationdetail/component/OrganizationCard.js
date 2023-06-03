import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import SvgIcon from "@/components/SvgIcon";
import Switch from "@/components/form/Switch";
import { DOMAIN_SERVER_API } from "@/config";
import useAuth from "@/hooks/useAuth";
import { BoxFlex } from "@/sections/emailform/style";
import {
  CardUserFormItemContentStyle,
  CardUserFormItemTitleStyle,
  CardUserStyle,
} from "@/sections/organizationdetail/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { fDate } from "@/utils/formatTime";
import {
  Box,
  Checkbox,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const OrganizationCard = ({
  isCheckbox,
  expanded,
  checked,
  onChangeSelected,
  item,
  selected,
  onOpenConfirmDelete,
  onOpenFormModal,
  handleOpenActive,
}) => {
  const { user } = useAuth();
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <CardUserStyle className="card-user-item" expanded={expanded}>
      <BoxFlex alignItems={"flex-start"}>
        <CardUserFormItemTitleStyle className="card-user-item-title">
          {isCheckbox && user.email !== item.email && (
            <Checkbox
              value={item}
              checked={checked}
              onChange={onChangeSelected}
              icon={<CheckboxIconDefault />}
              checkedIcon={<CheckboxIconChecked />}
            />
          )}
          <AvatarDS
            sx={{
              height: "40px",
              width: "40px",
              borderRadius: "10px",
              fontSize: "10px",
            }}
            name={`${item?.lastName ? item?.lastName : ""} ${
              item.firstName ? item.firstName : ""
            }`}
          />
          <Stack>
            <Typography
              sx={{
                color: style.COLOR_TEXT_BLACK,
                fontSize: style.FONT_SM,
                fontWeight: style.FONT_SEMI_BOLD,
              }}
            >
              {`${item?.lastName ? item?.lastName : ""} ${
                item.firstName ? item.firstName : ""
              }`}
            </Typography>
            <Typography className="card-user-item-subtitle" component="span">
              {`${item.email ? item.email : ""} ${
                item.phoneNumber ? item.phone : ""
              }`}
            </Typography>
          </Stack>
        </CardUserFormItemTitleStyle>
        <Typography
          sx={{
            color: style.COLOR_SUCCESS,
            fontSize: style.FONT_XS,
            fontWeight: style.FONT_MEDIUM,
          }}
        >
          {item.isActive ? (
            "Đang hoạt động"
          ) : (
            <span style={{ color: style.COLOR_TEXT_BLACK }}>
              Không hoạt động
            </span>
          )}
        </Typography>
      </BoxFlex>
      {showAll && <Divider style={{ marginBottom: "16px" }} />}
      <BoxFlex>
        <BoxFlex>
          <CardUserFormItemContentStyle className="card-user-item-content-text">
            {item?.applicationUserRoleGroups[0]?.name}
          </CardUserFormItemContentStyle>
          {item?.organizations?.length == 1 ? (
            <Box
              sx={{
                padding: "5px 8px",
                ml: 1,
                backgroundColor: theme.palette.common.bgrObject,
                borderRadius: "100px",
                cursor: "pointer",
                display: showAll ? "none" : "block",
              }}
            >
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 500,
                  color: theme.palette.common.neutral800,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                {item?.organizations[0].name}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                padding: "5px 8px",
                ml: 1,
                backgroundColor: theme.palette.common.bgrObject,
                borderRadius: "100px",
                cursor: "pointer",
                display: showAll ? "none" : "block",
              }}
              onClick={toggleShow}
            >
              {!showAll && (
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: theme.palette.common.neutral800,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Thuộc {item?.organizations?.length} đơn vị
                  <Iconify
                    icon={"material-symbols:arrow-drop-down"}
                    height={16}
                    width={16}
                    sx={{ ml: 1 }}
                  />
                </Typography>
              )}
            </Box>
          )}
        </BoxFlex>
        <BoxFlex>
          {showAll || selected?.length > 1
            ? null
            : user.email !== item.email && (
                <>
                  <Tooltip title={"Chỉnh sửa"}>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.common.borderObject, ml: 2 }}
                      onClick={onOpenFormModal}
                    >
                      <SvgIcon>
                        {
                          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_153006)"> <path d="M6.162 12.6667H14V14H2V11.1713L8.6 4.57133L11.428 7.40066L6.16133 12.6667H6.162ZM9.542 3.62933L10.9567 2.21466C11.0817 2.08968 11.2512 2.01947 11.428 2.01947C11.6048 2.01947 11.7743 2.08968 11.8993 2.21466L13.7853 4.10066C13.9103 4.22568 13.9805 4.39522 13.9805 4.57199C13.9805 4.74877 13.9103 4.91831 13.7853 5.04333L12.3707 6.45733L9.54267 3.62933H9.542Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_9022_153006"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                        }
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Xóa"}>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.common.borderObject, ml: 2 }}
                      onClick={onOpenConfirmDelete}
                    >
                      <SvgIcon>
                        {
                          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_153079)"> <path d="M4.66634 2.66665V1.33331H11.333V2.66665H14.6663V3.99998H13.333V14C13.333 14.1768 13.2628 14.3464 13.1377 14.4714C13.0127 14.5964 12.8432 14.6666 12.6663 14.6666H3.33301C3.1562 14.6666 2.98663 14.5964 2.8616 14.4714C2.73658 14.3464 2.66634 14.1768 2.66634 14V3.99998H1.33301V2.66665H4.66634ZM3.99967 3.99998V13.3333H11.9997V3.99998H3.99967ZM5.99967 5.99998H7.33301V11.3333H5.99967V5.99998ZM8.66634 5.99998H9.99967V11.3333H8.66634V5.99998Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_9022_153079"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                        }
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </>
              )}
        </BoxFlex>
      </BoxFlex>
      {showAll && (
        <>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              my: 1.5,
              "& .organization-card:last-child": { mr: 0 },
            }}
          >
            {item?.organizations?.map((organization) => (
              <Box
                key={organization?.id}
                className={"organization-card"}
                sx={{
                  padding: "12px 16px",
                  backgroundColor: theme.palette.common.white,
                  minHeight: "70px",
                  minWidth: "230px",
                  border: "1px solid " + theme.palette.common.neutral400,
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  mr: 1.5,
                  mb: 1.5,
                }}
              >
                <Box
                  sx={{
                    width: "48px",
                    height: "48px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "0px",
                  }}
                >
                  {organization?.avatar ? (
                    <AvatarDS
                      src={`${DOMAIN_SERVER_API}/Image/GetImage?imagePath=${organization?.avatar}`}
                      sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "10px",
                        fontSize: "10px",
                      }}
                      name={`${organization?.name ? organization?.name : ""}`}
                    />
                  ) : (
                    <AvatarDS
                      sx={{
                        height: "40px",
                        width: "40px",
                        borderRadius: "10px",
                        fontSize: "10px",
                      }}
                      name={`${organization?.name ? organization?.name : ""}`}
                    />
                  )}
                </Box>
                <Stack>
                  <Typography
                    sx={{
                      fontSize: 13,
                      fontWeight: 500,
                      color: theme.palette.common.neutral800,
                    }}
                  >
                    {organization?.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      fontWeight: 400,
                      color: theme.palette.common.neutral700,
                    }}
                  >
                    {organization?.code}
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Typography
                sx={{
                  fontSize: 12,
                  fontWeight: 400,
                  color: theme.palette.common.borderObject,
                  mr: 1,
                }}
              >
                Ngày tham gia: {fDate(item?.registrationTime)}
              </Typography>
              <Box
                sx={{
                  padding: "5px 8px",
                  backgroundColor: theme.palette.common.bgrObject,
                  borderRadius: "100px",
                  display: !showAll ? "none" : "block",
                  cursor: "pointer",
                }}
                onClick={toggleShow}
              >
                <Typography
                  sx={{
                    fontSize: 12,
                    fontWeight: 500,
                    color: theme.palette.common.neutral800,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  Thu gọn
                  <Iconify
                    icon={"material-symbols:arrow-drop-up"}
                    height={16}
                    width={16}
                    sx={{ ml: 1 }}
                  />
                </Typography>
              </Box>
            </Box>
            <BoxFlex>
              {showAll && selected?.length > 1 ? null : (
                <>
                  <Switch
                    checked={item.isActive}
                    onClick={(e) => {
                      handleOpenActive(e.target.checked);
                    }}
                  />
                  <Tooltip title={"Chỉnh sửa"}>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.common.borderObject }}
                      onClick={onOpenFormModal}
                    >
                      <SvgIcon>
                        {
                          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_153006)"> <path d="M6.162 12.6667H14V14H2V11.1713L8.6 4.57133L11.428 7.40066L6.16133 12.6667H6.162ZM9.542 3.62933L10.9567 2.21466C11.0817 2.08968 11.2512 2.01947 11.428 2.01947C11.6048 2.01947 11.7743 2.08968 11.8993 2.21466L13.7853 4.10066C13.9103 4.22568 13.9805 4.39522 13.9805 4.57199C13.9805 4.74877 13.9103 4.91831 13.7853 5.04333L12.3707 6.45733L9.54267 3.62933H9.542Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_9022_153006"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                        }
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                  <Tooltip title={"Xóa"}>
                    <IconButton
                      size="small"
                      sx={{ color: theme.palette.common.borderObject, ml: 2 }}
                      onClick={onOpenConfirmDelete}
                    >
                      <SvgIcon>
                        {
                          '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_9022_153079)"> <path d="M4.66634 2.66665V1.33331H11.333V2.66665H14.6663V3.99998H13.333V14C13.333 14.1768 13.2628 14.3464 13.1377 14.4714C13.0127 14.5964 12.8432 14.6666 12.6663 14.6666H3.33301C3.1562 14.6666 2.98663 14.5964 2.8616 14.4714C2.73658 14.3464 2.66634 14.1768 2.66634 14V3.99998H1.33301V2.66665H4.66634ZM3.99967 3.99998V13.3333H11.9997V3.99998H3.99967ZM5.99967 5.99998H7.33301V11.3333H5.99967V5.99998ZM8.66634 5.99998H9.99967V11.3333H8.66634V5.99998Z" fill="#5C6A82"/> </g> <defs> <clipPath id="clip0_9022_153079"> <rect width="16" height="16" fill="white"/> </clipPath> </defs> </svg>'
                        }
                      </SvgIcon>
                    </IconButton>
                  </Tooltip>
                </>
              )}
            </BoxFlex>
          </Box>
        </>
      )}
    </CardUserStyle>
  );
};

export default React.memo(OrganizationCard);
