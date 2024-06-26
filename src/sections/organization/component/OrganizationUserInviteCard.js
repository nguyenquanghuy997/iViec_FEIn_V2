import { DeleteIcon } from "@/assets/ActionIcon";
import {
  CheckboxIconChecked,
  CheckboxIconDefault,
} from "@/assets/CheckboxIcon";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { AvatarDS } from "@/components/DesignSystem";
import Iconify from "@/components/Iconify";
import { DOMAIN_SERVER_API } from "@/config";
import { BoxFlex } from "@/sections/emailform/style";
import { ReloadIcon } from "@/sections/organization/component/Icon";
import {
  CardUserFormItemTitleStyle,
  CardUserStyle,
} from "@/sections/organizationdetail/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { fDate } from "@/utils/formatTime";
import {
  Box,
  CardContent,
  Checkbox,
  Collapse,
  Divider,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import React, { useState } from "react";

const OrganizationUserInviteCard = ({
  item,
  onOpenConfirmForm,
  onOpenConfirmResend,
  checked,
  onChangeSelected,
}) => {
  const theme = useTheme();
  const [showAll, setShowAll] = useState(false);

  const toggleShow = () => {
    setShowAll(!showAll);
  };

  return (
    <CardUserStyle className="card-user-item">
      <BoxFlex alignItems={"flex-start"}>
        <CardUserFormItemTitleStyle className="card-user-item-title">
          <Checkbox
            value={item}
            checked={checked}
            onChange={onChangeSelected}
            icon={<CheckboxIconDefault />}
            checkedIcon={<CheckboxIconChecked />}
          />
          <AvatarDS
            sx={{
              height: "40px",
              width: "40px",
              borderRadius: "10px",
              fontSize: "10px",
            }}
            name={`${item?.fullName ? item?.fullName : ""}`}
          />
          <Stack>
            <Typography
              sx={{
                color: style.COLOR_TEXT_BLACK,
                fontSize: style.FONT_SM,
                fontWeight: style.FONT_SEMI_BOLD,
              }}
            >
              {`${item?.fullName ? item?.fullName : ""}`}
            </Typography>
            <Typography className="card-user-item-subtitle" component="span">
              {`${item.email ? item.email : ""} ${
                item.phoneNumber ? item.phone : ""
              }`}
            </Typography>
          </Stack>
        </CardUserFormItemTitleStyle>
        <MuiButton
          title={"Gửi lại yêu cầu active tài khoản"}
          color={"basic"}
          onClick={onOpenConfirmResend}
          startIcon={<ReloadIcon />}
          sx={{
            color: theme.palette.common.blue700,
            fontSize: 12,
            fontWeight: 600,
            fontFamily: "Inter",
            lineHeight: "18px",
            pr: 0,
            pt: 0,
            "&:hover": {
              backgroundColor: "transparent",
              boxShadow: "none",
            },
          }}
        />
      </BoxFlex>

      <Divider
        style={{
          opacity: showAll ? "1" : "0",
          marginBottom: showAll ? "16px" : "0",
          transition: "all .6s ease",
        }}
      />

      <BoxFlex>
        <BoxFlex>
          {item?.roleGroupName && (
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 600,
                color: theme.palette.common.neutral800,
                mr: 1,
              }}
            >
              {item?.roleGroupName}
            </Typography>
          )}
          {item?.organizations?.length == 1 ? (
            <Box
              sx={{
                padding: "5px 8px",
                backgroundColor: theme.palette.common.bgrObject,
                borderRadius: "100px",
                cursor: "pointer",
                display: showAll ? "none" : "block",
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
                {item?.organizations[0].name}
              </Typography>
            </Box>
          ) : (
            <Box
              sx={{
                padding: "5px 8px",
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
        {!showAll && (
          <BoxFlex>
            <Tooltip title={"Xóa"}>
              <IconButton
                size="small"
                sx={{ color: theme.palette.common.borderObject, ml: 2 }}
                onClick={onOpenConfirmForm}
              >
                <DeleteIcon width={13} height={13} fill={"#5C6A82"} />
              </IconButton>
            </Tooltip>
          </BoxFlex>
        )}
      </BoxFlex>

      <Collapse in={showAll} timeout={600} unmountOnExit>
        <CardContent style={{ padding: 0 }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              flexWrap: "wrap",
              my: 1.5,
            }}
          >
            {item?.organizations?.map((organization) => (
              <Box
                key={organization?.id}
                sx={{
                  padding: "12px 16px",
                  backgroundColor: theme.palette.common.white,
                  minHeight: "70px",
                  minWidth: "230px",
                  border: "1px solid #A2AAB7",
                  borderRadius: "6px",
                  display: "flex",
                  alignItems: "center",
                  mr: 2,
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
                    {organization?.code || "ABCDEF"}
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
                Ngày tham gia: {fDate(item?.createdTime)}
              </Typography>
              <Box
                sx={{
                  padding: "5px 8px",
                  backgroundColor: theme.palette.common.bgrObject,
                  borderRadius: "100px",
                  display: "block",
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
              <Tooltip title={"Xóa"}>
                <IconButton
                  size="small"
                  sx={{ color: theme.palette.common.borderObject, ml: 2 }}
                  onClick={onOpenConfirmForm}
                >
                  <DeleteIcon width={13} height={13} fill={"#5C6A82"} />
                </IconButton>
              </Tooltip>
            </BoxFlex>
          </Box>
        </CardContent>
      </Collapse>
    </CardUserStyle>
  );
};

export default React.memo(OrganizationUserInviteCard);
