import { useGetRoleListQuery } from "../rolegroup/RoleGroupSlice";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const Checkboxes = ({ options, control, name }) => {
  
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);
  return (
    <>
      {options?.map((option, index) => (
        <div className="box-check" style={{display:'flex', justifyContent:'space-between' ,borderTop: "0.5px solid rgba(145, 158, 171, 0.24)"}}>
          {/* {TYPE.map((role)=>(role?.actions[option?.name]?.name)).filter((item) => item != undefined)} */}
          {option?.name}
          <input
            onChange={(e) => {
              const valueCopy = [...value];
              valueCopy[index] = e.target.checked ? e.target.value : null;
              field.onChange(valueCopy);
              setValue(valueCopy);
            }}
            key={option.id}
            type="checkbox"
            checked={value.includes(option.id)}
            value={option.id}
            style={{width:'18px'}}
          />
        </div>
      ))}
    </>
  );
};

export default function PipelineTable({ control }) {
  const { data } = useGetRoleListQuery();
  const options = data?.items;

  return (
    <div>
      <section>
        <Checkboxes
          options={options}
          control={control}
          name="identityRoleIds"
        />
      </section>
    </div>
  );
}
