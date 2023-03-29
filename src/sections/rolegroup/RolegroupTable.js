import { useGetRoleListQuery } from "../rolegroup/RoleGroupSlice";
import { TYPES } from "./config";
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

//  console.log( options.filter( item => dataFilter.includes(item?.name)))
  return (
    <>
      {options?.map((option, index) => (
        <div
          className="box-check"
          style={{
            justifyContent: "space-between",
            // borderTop: "0.5px solid rgba(145, 158, 171, 0.24)",
            display: !dataFilter
              .map((item) => item[option?.name])
              .filter((item) => item != undefined).length
              ? "none"
              : "flex",
          }}
        >
          <TableCell sx={{ width: "200px" }}>
            {/* {filter
              .map((item) => item[option?.name])
              .filter((item) => item != undefined)} */}


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
            <TableCell align="left">Nhóm chức năng</TableCell>
            <TableCell align="left">Chức năng</TableCell>
            <TableCell align="right">Checked</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TYPES.map((item) => (
            <div style={{ borderTop: "0.5px solid rgba(145, 158, 171, 0.24)" }}>
              <TableRow>
                <TableCell rowSpan={3} sx={{ width: "60%" }}>
                  {item?.name}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableRow>
                  <Checkboxes
                    dataFilter={item?.actions}
                    options={options}
                    control={control}
                    register={register}
                    name="identityRoleIds"
                  />
                </TableRow>
              </TableRow>
            </div>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
