import { Box } from "@mui/material";

const Candidate = ({ data }) => {
    console.log('data', data)
  return (
    <>
      <Box>{data?.name || ''}</Box>
    </>
  );
};
export default Candidate;
