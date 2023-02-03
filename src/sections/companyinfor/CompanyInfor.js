// import Image from "@/components/Image";
// import SvgIcon from "@/components/SvgIcon";
import { useGetBranchByUserQuery } from "@/sections/companyinfor/companyInforSlice";
// import {
//   formatBranchSize,
//   formatRemoteUrl,
//   joinArrStr,
// } from "@/utils/formatString";
// import NextLink from "next/link";

export default function CompanyInfor() {
  // api
  // const { data: { DataList: [Data = {}] = [] } = {} } =
  //   useGetBranchByUserQuery();
    const { data: Data} = useGetBranchByUserQuery();
    console.log('DataDataData',Data)
  // const renderRow = (child1, child2) => {
  //   return (
  //     <div style={{ display: "flex", flexDirection: "row" }}>
  //       {child1}
  //       {child2}
  //     </div>
  //   );
  // };

  // const renderItem = (title, value, main) => {
  //   return (
  //     <div style={{ flex: main ? undefined : 1 }}>
  //       <span
  //         style={{
  //           display: "flex",
  //           fontSize: 15,
  //           lineHeight: 24 / 15,
  //           marginTop: 36,
  //           marginBottom: 8,
  //           color: "#7D8386",
  //         }}
  //       >
  //         {title}
  //       </span>

  //       {String(value).startsWith("<") ? (
  //         <p dangerouslySetInnerHTML={{ __html: value }} />
  //       ) : (
  //         <span
  //           style={{
  //             display: "flex",
  //             fontSize: 16,
  //             lineHeight: 24 / 16,
  //             color: "#181819",
  //           }}
  //         >
  //           {value}
  //         </span>
  //       )}
  //     </div>
  //   );
  // };

  // const renderButton = () => {
  //   return (
  //     <NextLink passHref href="companyinfor/edit">
  //       <a
  //         href="#"
  //         style={{
  //           paddingTop: 10,
  //           paddingBottom: 10,
  //           paddingLeft: 24,
  //           paddingRight: 24,
  //           borderRadius: 4,
  //           marginTop: 36,
  //           display: "flex",
  //           alignItems: "center",
  //           flexDirection: "row",
  //           background: "#01B6A7",
  //           textDecoration: "none",
  //           alignSelf: "flex-end",
  //         }}
  //       >
  //         <SvgIcon>
  //           {`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M9.41632 14.5818H14.7305" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path fill-rule="evenodd" clip-rule="evenodd" d="M8.71241 2.12975C9.32657 1.34725 10.3191 1.38809 11.1024 2.00225L12.2607 2.91059C13.0441 3.52475 13.3216 4.47725 12.7074 5.26142L5.79991 14.0739C5.56907 14.3689 5.21657 14.5431 4.84157 14.5473L2.17741 14.5814L1.57407 11.9856C1.48907 11.6214 1.57407 11.2381 1.80491 10.9423L8.71241 2.12975Z" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M7.41882 3.78009L11.4138 6.91176" stroke="white" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`}
  //         </SvgIcon>

  //         <span
  //           style={{
  //             fontSize: 15,
  //             fontWeight: "600",
  //             lineHeight: 20 / 15,
  //             marginLeft: 8,
  //             color: "#fff",
  //           }}
  //         >
  //           {"Chỉnh sửa thông tin doanh nghiệp"}
  //         </span>
  //       </a>
  //     </NextLink>
  //   );
  // };

  return (
    <>
    <div></div>
      {/* <Image
        disabledEffect
        visibleByDefault
        src={formatRemoteUrl(Data.CoverPhoto || "/public/img/coverDefault.png")}
        sx={{ height: 283, width: "100%" }}
      />

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          paddingLeft: 24,
          paddingRight: 24,
          marginTop: -24,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-end",
          }}
        >
          <Image
            disabledEffect
            visibleByDefault
            src={formatRemoteUrl(Data.Logo || "/public/img/logoDefault.png")}
            sx={{
              width: 120,
              height: 120,
              borderRadius: 120,
              border: "3px solid #fff",
            }}
          />

          <span
            style={{
              flex: 1,
              fontSize: 21,
              lineHeight: 28 / 21,
              marginLeft: 16,
              marginBottom: 16,
              fontWeight: "600",
              color: "#393B3E",
            }}
          >
            {Data.BranchName}
          </span>
        </div>

        {renderItem(
          "Địa chỉ công ty",
          joinArrStr([Data.BranchAddress, Data.ProvinceName], ", "),
          true
        )}

        {renderRow(
          renderItem("Email", Data.BranchEmail),
          renderItem("Số điện thoại", Data.BranchPhone)
        )}

        {renderRow(
          renderItem("Ngành nghề", Data.JobCategoryName),
          renderItem("Quy mô nhân sự", formatBranchSize(Data.BranchSize))
        )}

        {renderItem("Giới thiệu", Data.Description, true)}
        {renderButton()}
      </div> */}
    </>
  );
}
