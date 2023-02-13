import React from "react";
import {SelectAutoCompleteDS} from "@/components/DesignSystem";

const SelectFilter = ({options, ...props}) => {
    return (
        <SelectAutoCompleteDS
            data={options}
            {...props}
            sx={{
                background: "#FDFDFD",
                "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#F3F4F6",
                    borderRadius: "6px",
                },
                "&:hover, &.Mui-focused": {
                    background: "#E7E9ED",
                },
                "&:hover .MuiOutlinedInput-notchedOutline, , &.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E7E9ED",
                },
            }}
        />
    );
};

export default SelectFilter;
