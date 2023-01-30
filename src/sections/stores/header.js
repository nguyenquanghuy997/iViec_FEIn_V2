import SvgIcon from "@/components/SvgIcon";
import {
  FormProvider,
  RHFBasicSelect,
  RHFSearchTextField,
} from "@/components/hook-form";
import { Box } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";

const REPORT_TYPE_FULL = [
  { label: "Tất cả", value: "all" },
  { label: "Ngày ứng tuyển", value: "applyDate" },
];

const defaultValuesFull = {
  sort: REPORT_TYPE_FULL[0].value,
  search: "",
};

export const StoreHeader = React.memo(() => {
  const methods = useForm({
    defaultValues: defaultValuesFull,
  });

  const renderButton = (child, child2, onPress) => {
    return (
      <div style={{ position: "relative" }}>
        <div
          style={{
            height: 42,
            minWidth: 42,
            borderRadius: 8,
            paddingLeft: 18,
            paddingRight: 18,
            marginRight: 10,
            border: "1px solid #EBECF4",
            "box-shadow": "0px 2px 3px rgba(208, 213, 217, 0.2)",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
          }}
          onClick={onPress}
        >
          {child}
        </div>

        {child2}
      </div>
    );
  };

  const renderText = (title) => {
    return (
      <span
        style={{
          fontSize: 15,
          marginLeft: 10,
          userSelect: "none",
        }}
      >
        {title}
      </span>
    );
  };

  return (
    <FormProvider methods={methods}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          paddingBottom: "15px",
        }}
      >
        <div style={{ width: 200 }}>
          <RHFBasicSelect
            name="sort"
            label="Nghành nghề"
            options={REPORT_TYPE_FULL}
            style={{ background: "#fff" }}
          />
        </div>
        <div style={{ flex: 1 }} />

        {renderButton(
          <>
            <SvgIcon>
              {`<svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7.66667 4.66667H11L7 8.66667L3 4.66667H6.33334V0H7.66667V4.66667ZM1.66667 10.6667H12.3333V6H13.6667V11.3333C13.6667 11.5101 13.5964 11.6797 13.4714 11.8047C13.3464 11.9298 13.1768 12 13 12H1C0.823192 12 0.653622 11.9298 0.528598 11.8047C0.403574 11.6797 0.333336 11.5101 0.333336 11.3333V6H1.66667V10.6667Z" fill="#09121F"/></svg>`}
            </SvgIcon>

            {renderText("Tải mẫu Excel")}
          </>
        )}

        {renderButton(
          <>
            <SvgIcon>
              {`<svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3.36101 2V3.33333H1.33333V10.6667H8.66667V7.33333H10V11.3333C10 11.5101 9.92976 11.6797 9.80474 11.8047C9.67971 11.9298 9.51014 12 9.33333 12H0.666667C0.489856 12 0.320286 11.9298 0.195262 11.8047C0.0702379 11.6797 0 11.5101 0 11.3333V2.66667C0 2.48986 0.0702379 2.32029 0.195262 2.19526C0.320286 2.07024 0.489856 2 0.666667 2H3.36101Z" fill="#09121F"/><path d="M3.58339 5.47731L2.89023 6.17048L5.3168 8.59705L7.74337 6.17048L7.0502 5.47731L5.80701 6.7205C5.80701 4.22539 7.60718 1.77487 10.415 1.35929L10.415 0.112585C7.9631 0.647451 4.82658 1.86508 4.82658 6.7205L3.58339 5.47731Z" fill="#09121F"/></svg>`}
            </SvgIcon>

            {renderText("Import")}
          </>
        )}

        {renderButton(
          <>
            <SvgIcon>
              {`<svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1.33332 13.6667C1.15651 13.6667 0.986943 13.5965 0.861919 13.4714C0.736895 13.3464 0.666656 13.1769 0.666656 13V1.00004C0.666656 0.82323 0.736895 0.65366 0.861919 0.528636C0.986943 0.403612 1.15651 0.333374 1.33332 0.333374H10.6667C10.8435 0.333374 11.013 0.403612 11.1381 0.528636C11.2631 0.65366 11.3333 0.82323 11.3333 1.00004V3.00004H9.99999V1.66671H1.99999V12.3334H9.99999V11H11.3333V13C11.3333 13.1769 11.2631 13.3464 11.1381 13.4714C11.013 13.5965 10.8435 13.6667 10.6667 13.6667H1.33332ZM9.99999 9.66671V7.66671H5.33332V6.33337H9.99999V4.33337L13.3333 7.00004L9.99999 9.66671Z" fill="#09121F"/></svg>`}
            </SvgIcon>

            {renderText("Export")}
          </>
        )}

        <div style={{ width: 360 }}>
          <RHFSearchTextField
            name="search"
            label="Tìm kiếm nhanh trong danh sách"
            style={{ background: "#fff" }}
          />
        </div>
      </Box>
    </FormProvider>
  );
});
