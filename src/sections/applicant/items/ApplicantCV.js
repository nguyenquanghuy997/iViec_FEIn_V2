import NoCV from "@/assets/NoCV";
import { Text, View } from "@/components/FlexStyled";
import SvgIcon from "@/components/SvgIcon";
import { getFileUrl } from "@/utils/helper";
import { Box, Divider, Grid, Typography } from "@mui/material";
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
              <Box sx={{ minHeight: "1040px" }}>
                <Box sx={{ textAlign: "center", marginTop: 13 }}>
                  <NoCV />
                </Box>
                <Typography
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 400,
                    color: theme.palette.common.neutral400,
                  }}
                >
                  {"Ứng viên chưa có CV cho tin tuyển dụng này."}
                </Typography>
              </Box>
            )}
          </Grid>
        </Box>
      </Grid>
    </FormProvider>
  );
};
