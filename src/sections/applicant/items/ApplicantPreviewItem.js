import { ApplicantPreviewCV } from "./ApplicantPreviewCV";
import { ApplicantPreviewLog } from "./ApplicantPreviewLog";
import {
  Avatar,
  Badge,
  Box,
  Card,
  CardContent,
  Grid,
  styled,
  Typography,
} from "@mui/material";
import React from "react";
import SvgIcon from "@/components/SvgIcon";

// const JobDesTitleStyled = styled(Grid)(
//   ({ theme, ownerState: { smDown } = {} }) => ({
//     display: 'flex',
//     flexDirection: smDown ? 'column' : 'row',
//     justifyContent: 'space-between',
//     marginBottom: theme.spacing(1),
//   })
// )
const avatarStyles = styled({
  height: 56,
  width: 64,
  radius: 8,
});
function ApplicantPreviewItem({}) {
  return (
    <Card
      sx={{
        borderRadius: "6px",
        filter:
          "drop-shadow(0px 3px 5px rgba(9, 30, 66, 0.2)) drop-shadow(0px 0px 1px rgba(9, 30, 66, 0.3))",
        height: "fit-content",
        "& .MuiCardContent-root": {
          padding: 0,
          paddingBottom: "0 !important",
        },
      }}
    >
      <CardContent>
        <Grid
          xs={12}
          md={7}
          padding="32px 24px"
          borderBottom="1px solid #D0D4DB"
        >
          <Grid
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Grid display="flex">
              <Badge
                badgeContent=""
                variant="dot"
                color="success"
              >
                <Avatar
                  variant={"rounded"}
                  classes={avatarStyles}
                  src={
                    "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg"
                  }
                />
              </Badge>

              <Box pl={2}>
                <Typography>
                  Đinh Tiến Thành 
                  <SvgIcon>
              {
                '<svg width="17" height="18" viewBox="0 0 17 18" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4.54325 11.8334L11.7272 4.64948L10.7256 3.6479L3.54167 10.8318V11.8334H4.54325ZM5.13046 13.2501H2.125V10.2446L10.2248 2.14481C10.3576 2.01202 10.5378 1.93742 10.7256 1.93742C10.9134 1.93742 11.0935 2.01202 11.2264 2.14481L13.2302 4.14869C13.363 4.28152 13.4376 4.46166 13.4376 4.64948C13.4376 4.83731 13.363 5.01744 13.2302 5.15027L5.13046 13.2501ZM2.125 14.6667H14.875V16.0834H2.125V14.6667Z" fill="#09121F"/></svg>'
              }
            </SvgIcon>
                </Typography>
                <Typography>Most Awaited - Figma Launches Plugin</Typography>
              </Box>
            </Grid>
            <Grid>
              <Avatar
                variant={"rounded"}
                classes={avatarStyles}
                src={
                  "https://freedesignfile.com/upload/2016/03/Abstract-geometric-petals-vector-graphic-03.jpg"
                }
              />
              <Box>
                <Typography>Design</Typography>
                <Typography>Most Awaited - Figma Launches Plugin</Typography>
              </Box>
            </Grid>
          </Grid>
          <Grid
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Grid gap={3}>
              <Box direction="row">
                <Box>
                  <Typography>Pipeline</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Grid>
        <Grid container>
          <Grid xs={12} md={7} borderRight="1px solid #D0D4DB">
            <ApplicantPreviewCV />
          </Grid>
          <Grid xs={5} md={5}>
            <ApplicantPreviewLog />
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default ApplicantPreviewItem;
