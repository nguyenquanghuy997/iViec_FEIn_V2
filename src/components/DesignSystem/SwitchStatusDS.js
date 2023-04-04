// form
import {Controller, useFormContext} from "react-hook-form";
import SwitchItem from '../form/Switch';

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
