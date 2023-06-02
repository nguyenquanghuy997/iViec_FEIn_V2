import { RHFSelect, RHFTextField } from "@/components/hook-form";
import { InputLabel } from "@mui/material";
import { memo, useEffect, useState } from "react";

const LIST_CURRENCY = [
  {
    value: 0,
    label: "VNĐ",
  },
  {
    value: 1,
    label: "USD",
  },
];

const RangeMoneyField = ({ label, name, watch, setValue, ...props }) => {
  const [fromName, toName, currencyName] = name;

  const [currency, setCurrency] = useState(
    watch(currencyName) || LIST_CURRENCY[0].value
  );

  useEffect(() => {
    if (!currencyName) return;
    setValue(currencyName, currency);
  }, [currencyName, currency]);

  return (
    <div className="range-money-fields">
      {label && <InputLabel>{label}</InputLabel>}

      {!!currencyName && (
        <RHFSelect
          name={currencyName}
          value={currency}
          options={LIST_CURRENCY}
          placeholder="Chọn đơn vị tiền tệ"
          height={44}
          sx={{ mb: 2 }}
          onChange={setCurrency}
        />
      )}

      <RHFTextField
        name={fromName}
        startIcon={<span>Từ</span>}
        endIcon={
          <span>{LIST_CURRENCY.find((i) => i.value === currency)?.label}</span>
        }
        type="number"
        {...props}
        sx={{ mb: 2 }}
      />

      <RHFTextField
        name={toName}
        startIcon={<span>Đến</span>}
        endIcon={
          <span>{LIST_CURRENCY.find((i) => i.value === currency)?.label}</span>
        }
        type="number"
        {...props}
      />
    </div>
  );
};

export default memo(RangeMoneyField);
