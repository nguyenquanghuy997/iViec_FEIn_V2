import {
  useGetRoleListQuery,
} from "./PipelineFormSlice";
import { TYPE } from "./config";
import { RHFCheckbox } from "@/components/hook-form";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import React from "react";

export default function PipelineTable() {
  const { data } = useGetRoleListQuery();
  const dataRole = data?.items?.map((item) => item?.name);
  // const [checked, setChecked] = useState(true);
  // console.log(checked)
  // const handleChange = (event) => {
  //   setChecked(event.target.checked);
  // };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ width: 560 }} aria-label="spanning table">
        <TableHead>
          <TableRow
            sx={{ borderBottom: "2px solid rgba(145, 158, 171, 0.24)" }}
          >
            <TableCell
              align="start"
              sx={{ background: "white", color: "#172B4D" }}
            >
              Nhóm chức năng
            </TableCell>
            <TableCell
              align="start"
              sx={{
                background: "white",
                color: "#172B4D",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              Chức năng
              <FormControlLabel
                value="start"
                control={<Checkbox />}
                labelPlacement="start"
              />
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {TYPE.map((role) => (
            <>
              <TableRow
                sx={{ borderTop: "0.5px solid rgba(145, 158, 171, 0.24)" }}
              >
                <TableCell rowSpan={2}>{role?.name}</TableCell>
              </TableRow>
              <TableRow>
                {dataRole
                  ?.map((item) => role?.actions[item]?.name)
                  .filter((item) => item != undefined)
                  .map((item) => (
                    <TableRow
                      sx={{
                        borderTop: "0.5px solid rgba(145, 158, 171, 0.24)",
                      }}
                    >
                      <RHFCheckbox
                        name={item}
                        value="start"
                        label={item}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          width: "345px",
                        }}
                      />
                    </TableRow>
                  ))}
              </TableRow>
            </>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
