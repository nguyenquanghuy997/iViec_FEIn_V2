import EmptyValue from "./components/EmptyValue";
import EditInformation from "./edit/EditInformation";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { PERMISSIONS } from "@/config";
import useRole from "@/hooks/useRole";
import useModal from "@/sections/companyinfor/hooks/useModal";
import { BoxInfoStyle } from "@/sections/companyinfor/style";
import CropImage from "@/sections/companyinfor/upload/CropImage";
import { OrganizationSize } from "@/utils/enum";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import { get } from "lodash";
import { Fragment, useMemo } from "react";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const renderText = (title, content) => {
  return (
    <Box sx={{ mb: 3, "&:first-of-type": { mt: 3 } }}>
      <Typography
        sx={{
          display: "inline-flex",
          fontSize: 13,
          fontWeight: 500,
          color: "#5C6A82",
          minWidth: "160px",
        }}
      >
        {title}
      </Typography>
      <Typography
        sx={{
          display: "inline-flex",
          fontSize: 13,
          fontWeight: 500,
          color: "#172B4D",
        }}
      >
        {content}
      </Typography>
    </Box>
  );
};
const renderItem = (title, content, child) => {
  return (
    <Box sx={{ pt: 3, pb: 1, "&:first-of-type": { mt: 3 } }}>
      {!!(content || child) && (
        <>
          <Typography
            sx={{
              display: "inline-flex",
              fontSize: 16,
              fontWeight: 600,
              lineHeight: "24px",
              color: "#172B4D",
              mb: 1.5,
            }}
          >
            {title}
          </Typography>
          {content ? (
            <Typography
              sx={{
                fontSize: 14,
                fontWeight: 400,
                lineHeight: "24px",
              }}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          ) : (
            child
          )}
        </>
      )}
    </Box>
  );
};

export default function CompanyInfor({ data }) {
  const theme = useTheme();
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.EDIT_COMPANY), []);

  const { onOpen, onClose, isOpen } = useModal();

  return (
    <>
      <CropImage
        defaultImage={get(data, "organizationInformation.coverPhoto")}
        size={"cover"}
        companyInfor={data}
      />

      {/* Avatar & name */}
      <BoxInfoStyle className={"box-info"}>
        <Box className={"box-image"}>
          <CropImage
            defaultImage={get(data, "organizationInformation.avatar")}
            companyInfor={data}
            size={"avatar"}
            className={"avatar-image"}
          />
        </Box>
        <Box sx={{ flex: 1, pl: 3 }}>
          <Box
            sx={{
              mb: 3,
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
            }}
          >
            <Box>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: 700,
                  color: "#172B4D",
                  lineHeight: "26px",
                  mb: 1,
                }}
              >
                {get(data, "name")}
              </Typography>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  "& .circle-icon:last-child": { display: "none" },
                }}
              >
                {get(data, "organizationInformation.jobCategories")?.map(
                  (item, index) => (
                    <Fragment key={index}>
                      <Typography
                        sx={{
                          color: "#455570",
                          fontSize: "12px",
                          fontWeight: 600,
                        }}
                      >
                        {get(item, "name")}
                      </Typography>
                      <Typography
                        className={"circle-icon"}
                        sx={{ mx: 1.5, lineHeight: 0 }}
                      >
                        <RiCheckboxBlankCircleFill size={5} color="#8A94A5" />
                      </Typography>
                    </Fragment>
                  )
                )}
              </Box>
            </Box>
            <Box>
              {canEdit && (
                <MuiButton
                  color={"default"}
                  title={"Chỉnh sửa"}
                  onClick={onOpen}
                  sx={{
                    fontWeight: 500,
                    height: "36px",
                    backgroundColor: theme.palette.common.neutral50,
                  }}
                />
              )}
            </Box>
          </Box>
          <Divider />
          <Box>
            {renderText(
              "Số điện thoại :",
              get(data, "organizationInformation.phoneNumber")
            )}
            {renderText(
              "Email doanh nghiệp :",
              get(data, "organizationInformation.email")
            )}
            {renderText(
              "Ngành nghề :",
              get(data, "organizationInformation.jobCategories")
                ?.map((item) => item?.name)
                ?.join(", ")
            )}
            {renderText(
              "Quy mô :",
              OrganizationSize(
                get(data, "organizationInformation.organizationSize")
              )
            )}
            {renderText(
              "Địa chỉ :",
              <>
                {get(data, "organizationInformation.address") &&
                  `${get(data, "organizationInformation.address")}, `}
                {get(data, "organizationInformation.districtName") &&
                  `${get(data, "organizationInformation.districtName")}, `}
                {get(data, "organizationInformation.provinceName") &&
                  `${get(data, "organizationInformation.provinceName")}`}
              </>
            )}
            {renderItem(
              "Giới thiệu công ty",
              get(data, "organizationInformation.description"),
              <EmptyValue text={"Hiện chưa nội dung giới thiệu công ty"} />
            )}
          </Box>
        </Box>
      </BoxInfoStyle>
      {isOpen && (
        <EditInformation open={isOpen} onClose={onClose} dataForm={data} />
      )}
    </>
  );
}
