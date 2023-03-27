import TickIcon from "../../assets/TickIcon";
import CropImageAva from "./CropImageAva";
import CropImageBG from "./CropImageBG";
import { SIZE } from "./config";
import DrawerEdit from "./edit/DrawerEdit";
import HeaderBreadcrumbs from "@/components/HeaderBreadcrumbs";
import { useGetCompanyInfoQuery } from "@/sections/companyinfor/companyInforSlice";
// import { useGetJobCategoriesQuery } from "@/sections/companyinfor/companyInforSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Divider } from "@mui/material";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";

export default function CompanyInfor() {
  const { data: Data } = useGetCompanyInfoQuery();
  const ProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
  });
  const defaultValues = {
    avatar: Data?.avatar,
  };
  // const { data: { items: JobCategoryList = [] } = {} } =
  //   useGetJobCategoriesQuery();
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });
  const {
    // setValue,
    // setError,
    handleSubmit,
    // // watch,
    // formState: { errors, isSubmitting },
  } = methods;

  const renderText = (title, content) => {
    return (
      <div>
        <span
          style={{
            display: "inline-flex",
            fontSize: 14,
            fontWeight: 400,
            margin: "24px 16px 0 0",
            color: "#5C6A82",
            width: "160px",
          }}
        >
          {title}
        </span>

        <span
          style={{
            display: "inline-flex",
            fontSize: 14,
            fontWeight: 500,
            color: "#172B4D",
          }}
        >
          {content}
        </span>
      </div>
    );
  };

  const renderItem = (title, value, main) => {
    return (
      <div style={{ flex: main ? undefined : 1 }}>
        <span
          style={{
            display: "flex",
            fontSize: 16,
            fontWeight: 600,
            lineHeight: 24 / 15,
            marginTop: 36,
            marginBottom: 12,
            color: "#172B4D",
          }}
        >
          {title}
        </span>

        {String(value).startsWith("<") ? (
          <p dangerouslySetInnerHTML={{ __html: value }} />
        ) : (
          <span
            style={{
              display: "flex",
              fontSize: 14,
              lineHeight: 24 / 16,
              color: "#172B4D",
              overflow: "hidden",
              whiteSpace: "nowrap" /* Don't forget this one */,
              textOverflow: "ellipsis",
            }}
          >
            {value}
          </span>
        )}
      </div>
    );
  };

  return (
    <FormProvider {...methods}>
      <CropImageBG data={Data?.organizationInformation?.coverPhoto} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: "-4%",
          background: "white",
        }}
      >
        <Box
          sx={{
            display: "flex",
            // flexDirection: "row",
            // alignItems: "flex-end",
            // mb: "28px",
          }}
        >
          <CropImageAva
            data={Data?.organizationInformation?.avatar}
            handleSubmit={handleSubmit}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Box sx={{ mt: 5 }}>
              <Typography
                sx={{
                  fontSize: 18,
                  fontWeight: "700",
                  color: "#393B3E",
                  ml: 2,
                  mr: 1,
                  mt: "18px",
                }}
              >
                {Data?.name}
                <span style={{ marginLeft: "0.6em" }}>
                  <TickIcon />
                </span>
                <HeaderBreadcrumbs
                  links={[
                    {
                      name: "CÔNG NGHỆ THÔNG TIN",
                      href: '#'
                    },
                    { name: "BẤT ĐỘNG SẢN",  href: '#' },
                  ]}
                />
              </Typography>
            </Box>

            <DrawerEdit dataForm={Data} />
          </Box>
        </Box>

        <Box sx={{ ml: "135px", mb: 3 }}>
          <Divider />
          {renderText(
            "Số điện thoại :",
            `${Data?.organizationInformation?.phoneNumber}` || ""
          )}
          {renderText("Email :", Data?.organizationInformation?.email || "")}
          {renderText(
            "Ngành nghề :",''
            // JobCategoryList.filter((item) =>
            //   item.id.includes(
            //     Data?.organizationInformation?.jobCategories.map(
            //       (item) => item.jobCategoryId
            //     )
            //   )
            // )
          )}
          {renderText(
            "Quy mô :",
            SIZE.filter(
              (item) =>
                item.id == Data?.organizationInformation?.organizationSize
            ).map((item) => item?.text)
          )}
          {renderText(
            "Địa chỉ :",
            `${Data?.organizationInformation?.address},${Data?.organizationInformation?.districtName}, ${Data?.organizationInformation?.provinceName}`
          )}
          {renderItem(
            "Giới thiệu công ty",
            Data?.organizationInformation?.description,
            true
          )}
        </Box>
      </div>
    </FormProvider>
  );
}
