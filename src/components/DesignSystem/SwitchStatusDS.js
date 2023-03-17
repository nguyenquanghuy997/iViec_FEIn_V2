// @mui
import {Switch} from "@mui/material";
import {styled} from "@mui/material/styles";
// form
import {Controller, useFormContext} from "react-hook-form";

const SwitchItem = styled(Switch)(() => ({
    "& .MuiSwitch-track": {
        backgroundColor: "#E7E9ED",
        borderRadius: "10px",
    },
    "& .MuiSwitch-thumb": {
        boxShadow: "0px 3px 5px rgb(9 30 66 / 20%), 0px 0px 1px rgb(9 30 66 / 30%)",
        background: "#F3F4F6",
    },

    "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#A5D6A7",
    },
    "& .MuiSwitch-switchBase.Mui-checked .MuiSwitch-thumb": {
        backgroundColor: "#388E3C",

    },
    "& .MuiSwitch-switchBase.Mui-checked:hover": {
        backgroundColor: "rgba(231, 233, 237, 0.4);",
    },
}));

export default function SwitchStatusDS({name, label, disabled}) {
    const {control} = useFormContext();
    return (
        <Controller
            name={name}
            control={control}
            render={({field}) => (
                <div style={{display: "flex", alignItems: "center"}}>
                    <SwitchItem {...field} checked={field.value} disabled={disabled}/>
                    <label
                        style={{
                            fontWeight: 600,
                            fontSize: 14,
                            color: field.value == true ? "#388E3C" : "#455570",
                        }}
                    >
                        {label}
                    </label>
                </div>
            )}
        />
    );
}
