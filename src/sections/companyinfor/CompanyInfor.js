import TickIcon from "../../assets/TickIcon";
import CropImage from "./CropImage";
import DrawerEdit from "./edit/DrawerEdit";
import {
  useGetCompanyInfoQuery, // useGetJobCategoriesQuery,
} from "@/sections/companyinfor/companyInforSlice";
import { OrganizationSize } from "@/utils/enum";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Typography, Divider } from "@mui/material";
import { useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import * as Yup from "yup";

export default function CompanyInfor() {
  const { data: Data } = useGetCompanyInfoQuery();
  const [seeData, setSeeData] = useState(false);

  const ProfileSchema = Yup.object().shape({
    avatar: Yup.string(),
  });
  const defaultValues = {};
  const methods = useForm({
    mode: "all",
    resolver: yupResolver(ProfileSchema),
    defaultValues,
  });

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
          <p
            dangerouslySetInnerHTML={{ __html: value }}
            style={{
              overflow: !seeData ? "hidden" : "visible",
              lineHeight: "1.2em",
              height: seeData ? "auto" : "3.6em",
            }}
          />
        ) : (
          <span
            style={{
              display: "flex",
              fontSize: 14,
              lineHeight: 24 / 16,
              color: "#172B4D",
            }}
          >
            {value}
          </span>
        )}
        <button
          onClick={() => setSeeData(!seeData)}
          style={{ border: "none", background: "white" }}
        >
          <p style={{ fontSize: 14, fontWeight: 700 }}>
            {seeData ? "Thu ngắn" : "... Xem thêm"}
          </p>
        </button>
      </div>
    );
  };
  // const { data: { items: JobCategoryList = [] } = {} } =
  //   useGetJobCategoriesQuery();

  return (
    <FormProvider {...methods}>
      <CropImage
        data={Data?.organizationInformation?.coverPhoto}
        size="cover"
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 40,
          paddingRight: 40,
          marginTop: "-2%",
          background: "white",
        }}
      >
        <Box sx={{ display: "flex" }}>
          {/* <CropImage data={Data?.organizationInformation?.avatar} /> */}

          <img
            src={`http://103.176.149.158:5001/api/Image/GetImage?imagePath=${Data?.organizationInformation?.avatar}`}
            style={{
              width: "130px",
              height: "130px",
              border: "3px solid white",
              borderRadius: "50%",
              zIndex: 1000,
            }}
          />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
            }}
          >
            <Typography
              sx={{
                fontSize: 18,
                fontWeight: "700",
                color: "#393B3E",
                ml: 2,
                mr: 1,
                mt: Data?.organizationInformation?.coverPhoto ? 5 : 0,
              }}
            >
              {Data?.name}
              <span style={{ marginLeft: "0.6em" }}>
                <TickIcon />
              </span>
              <Box sx={{ mb: 3, mt: 1 }}>
                <span
                  style={{
                    marginRight: "1em",
                    color: "#455570",
                    fontSize: "12px",
                  }}
                >
                  CÔNG NGHỆ THÔNG TIN
                </span>
                <RiCheckboxBlankCircleFill size={5} color="#8A94A5" />
                <span
                  style={{
                    marginLeft: "1em",
                    color: "#455570",
                    fontSize: "12px",
                  }}
                >
                  BẤT ĐỘNG SẢN
                </span>
              </Box>
            </Typography>

            <DrawerEdit dataForm={Data} />
          </Box>
        </Box>

        <Box sx={{ ml: "15%", mb: 3 }}>
          <Divider />
          {renderText(
            "Số điện thoại :",
            `${Data?.organizationInformation?.phoneNumber}` || ""
          )}
          {renderText("Email :", Data?.organizationInformation?.email || "")}
          {renderText(
            "Ngành nghề :",
            ""
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
            OrganizationSize(Data?.organizationInformation?.organizationSize)
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
