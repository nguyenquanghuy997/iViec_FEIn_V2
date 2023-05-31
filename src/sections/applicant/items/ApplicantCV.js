import NoCV from "@/assets/NoCV";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { getFileUrl } from "@/utils/helper";
import { Box, Button, Divider, Grid, Typography } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  cvFile: undefined,
  cvFileName: undefined,
};

export const ApplicantCV = ({ dataLog, pressUpload }) => {
  const theme = useTheme();
  const [cv] = useState(undefined);

  const methods = useForm({ defaultValues });
  const { watch, setValue } = methods;

  const pressDownload = () => {
    window.open(getFileUrl(watch("cvFile")));
  };

  useEffect(() => {
    if (!dataLog?.id) return;
    setValue("cvFile", dataLog?.applicantCvPath);
    setValue("cvFileName", dataLog?.applicantCvPath);
  }, [dataLog]);

  useEffect(() => {
    if (cv && cv.length > 0) {
      setValue("cvFile", URL.createObjectURL(cv[0].originFileObj));
      setValue("cvFileName", cv[0].name);
    }
  }, [cv]);

  return (
    <FormProvider {...methods}>
      <Grid item sx={{ padding: "12px 0 0 0" }}>
        <Box
          sx={{
            backgroundColor: theme.palette.common.bgrMaster,
            borderRadius: "4px",
            p: "16px",
          }}
        >
          <Divider orientation={"vertical"} />
          <Grid>
            {watch("cvFile") ? (
              <>
                <View
                  flexRow
                  atCenter
                  p={16}
                  bgColor={theme.palette.common.neutral100}
                >
                  <Text>{String(watch("cvFile")).split("/").pop()}</Text>

                  <View ml={8} onPress={pressUpload}>
                    <SvgIcon>
                      {
                        '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8552_20776)"> <path d="M9 20.25H21V15H22.5V21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H8.25C8.05109 21.75 7.86032 21.671 7.71967 21.5303C7.57902 21.3897 7.5 21.1989 7.5 21V15H9V20.25ZM16.5 12.75V17.25H13.5V12.75H9.75L15 7.5L20.25 12.75H16.5Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_8552_20776"> <rect width="18" height="18" fill="white" transform="translate(6 6)"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  </View>
                  <View flex1 />

                  <View onPress={pressDownload}>
                    <SvgIcon>
                      {
                        '<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8552_20781)"> <path d="M9 20.25H21V15H22.5V21C22.5 21.1989 22.421 21.3897 22.2803 21.5303C22.1397 21.671 21.9489 21.75 21.75 21.75H8.25C8.05109 21.75 7.86032 21.671 7.71967 21.5303C7.57902 21.3897 7.5 21.1989 7.5 21V15H9V20.25ZM16.5 12.75H20.25L15 18L9.75 12.75H13.5V8.25H16.5V12.75Z" fill="#455570"/> </g> <defs> <clipPath id="clip0_8552_20781"> <rect width="18" height="18" fill="white" transform="translate(6 6)"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  </View>
                </View>
                <div style={{ height: "1040px" }}>
                  <iframe
                    src={getFileUrl(watch("cvFile")) + "#toolbar=0&view=FitH"}
                    style={{ width: "100%", height: "100%", border: "none" }}
                  />
                </div>
              </>
            ) : (
              <View atCenter pt={92} style={{ minHeight: "1040px" }}>
                <NoCV />

                <Typography
                  sx={{
                    mt: "12px",
                    fontSize: 14,
                    fontWeight: 500,
                    color: theme.palette.common.neutral400,
                  }}
                >
                  {"Ứng viên chưa có CV cho tin tuyển dụng này."}
                </Typography>

                <Button
                  sx={{
                    mt: "24px",
                    border: "1px solid " + theme.palette.common.blue700,
                    color: theme.palette.common.blue700,
                    fontWeight: 600,
                    padding: "5px 12px",
                    textTransform: "inherit",
                  }}
                  startIcon={
                    <SvgIcon>
                      {
                        '<svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg"> <g clip-path="url(#clip0_8688_60886)"> <path d="M3 14.25H15V9H16.5V15C16.5 15.1989 16.421 15.3897 16.2803 15.5303C16.1397 15.671 15.9489 15.75 15.75 15.75H2.25C2.05109 15.75 1.86032 15.671 1.71967 15.5303C1.57902 15.3897 1.5 15.1989 1.5 15V9H3V14.25ZM10.5 6.75V11.25H7.5V6.75H3.75L9 1.5L14.25 6.75H10.5Z" fill="#1976D2"/> </g> <defs> <clipPath id="clip0_8688_60886"> <rect width="18" height="18" fill="white"/> </clipPath> </defs> </svg>'
                      }
                    </SvgIcon>
                  }
                  onClick={pressUpload}
                >
                  Tải lên CV
                </Button>
              </View>
            )}
          </Grid>
        </Box>
      </Grid>
    </FormProvider>
  );
};
