import { IconActiveSort, IconSort } from "@/assets/icons";
import { styled } from "@mui/material/styles";
import React, { useState } from "react";

const HeaderTitle = styled("span")(() => ({
  display: "flex",
  width: "28px",
  height: "28px",
  background: "#EFF3F7",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "6px",

  svg: {
    cursor: "pointer",
  },

  ".sorts": {
    border: "0.5px solid #E7E9ED",
    width: "140px",
    position: "absolute",
    zIndex: "1",
    top: "80%",
    background: "#FDFDFD",
    filter:
      "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
    borderRadius: "6px",

    ".__sort_item": {
      padding: "10px 16px",
      borderBottom: "1px solid #ccc",
      cursor: "pointer",
      color: "#455570",
      fontSize: "12px",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      lineHeight: "1.5714285714285714",

      svg: {
        width: "18px",
        height: "18px",
      },

      "&:last-child": {
        borderBottom: "none",
      },
    },
  },
}));

export default function TableHeaderSort({
  sortValueList,
  sortList,
  setSortList,
  sortKey,
  sortDefaultValue,
}) {
  const [isSort, setIsSort] = useState(false);

  const openSort = () => {
    setIsSort(true);
  };
  const handleSort = (sortValue) => {
    sortList[sortKey] = sortValue;
    setSortList({ ...sortList });
    setIsSort(false);
  };

  if (!sortValueList || sortValueList.length === 0) return;

  return (
    <HeaderTitle>
      <IconSort onClick={openSort} />
      {isSort && (
        <div className="sorts">
          {sortValueList.map((sortItem) => (
            <div
              className="__sort_item"
              onClick={() => handleSort(sortItem.value)}
            >
              <span>{sortItem.label}</span>
              {sortDefaultValue === sortItem.value && <IconActiveSort />}
            </div>
          ))}
        </div>
      )}
    </HeaderTitle>
  );
}
