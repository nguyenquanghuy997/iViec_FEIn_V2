import { useGetRoleListQuery } from "../rolegroup/RoleGroupSlice";
import { TYPES } from "./config";
import { VietnameseField } from "./config";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React, { useState } from "react";
import { useController } from "react-hook-form";

const Checkboxes = ({ options, control, name, dataFilter }) => {
  const { field } = useController({
    control,
    name,
  });
  const [value, setValue] = useState(field.value || []);
  const displayField = options?.filter((item) =>
    dataFilter.includes(item?.name)
  );
  return (
    <>
      {displayField?.map((option, index) => (
        <div
          className="box-check"
          style={{
            justifyContent: "space-between",
            // borderTop: "0.5px solid rgba(145, 158, 171, 0.24)",
          }}
        >
          <TableCell sx={{ width: "200px" }}>
            {VietnameseField(option?.name)}
          </TableCell>
          <TableCell>
            <input
              onChange={(e) => {
                const valueCopy = [...value];
                valueCopy[index] = e.target.checked ? e.target.value : null;
                field.onChange(valueCopy);
                setValue(valueCopy);
              }}
              key={option.id}
              type="checkbox"
              // {...register("identityRoleIds")}
              checked={value.includes(option.id)}
              value={option.id}
              style={{ width: "18px" }}
            />
          </TableCell>
        </div>
      ))}
    </>
  );
};

export default function PipelineTable({ control, register }) {
  const { data } = useGetRoleListQuery();
  const options = data?.items;

  return (
    <div>
      <Table sx={{ minWidth: 550 }} aria-label="spanning table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{display:'flex', justifyContent:'space-between'}}>
              <span>Nhóm chức năng</span>
              <span>Chức năng</span>
              <span>checkbox</span>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TYPES.map((item) => (
            <div>
              <TableRow
                style={{ borderTop: "0.5px solid rgba(145, 158, 171, 0.24)" }}
              >
                <TableCell rowSpan={5} sx={{ width: "250px" }}>
                  {item?.name}
                </TableCell>
                <TableCell>
                  <Checkboxes
                    dataFilter={item?.actions}
                    options={options}
                    control={control}
                    register={register}
                    name="identityRoleIds"
                  />
                </TableCell>
              </TableRow>
            </div>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
