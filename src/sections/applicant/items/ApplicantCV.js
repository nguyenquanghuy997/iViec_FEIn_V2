import NoCV from "@/assets/NoCV";
import { getFileUrl } from "@/utils/helper";
import { Box, Divider, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import {useTheme} from "@mui/material/styles";

const defaultValues = {
  cvFile: undefined,
  cvFileName: undefined,
};

export const ApplicantCV = ({ dataLog }) => {
  const [cv] = useState(undefined);
  const theme = useTheme();
  const methods = useForm({
    defaultValues,
  });

  const { watch, setValue } = methods;

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
      <Grid item sx={{ padding: "24px 0 0 0" }}>
        {/* <Grid mb={3}>
          <UploadFileDragAndDrop
            multiple={false}
            fileList={cv}
            setFileList={setCV}
            maxFile={1}
            showUploadList={false}
            height={120}
            autoUpload={false}
          />
        </Grid> */}
        <Box sx={{ backgroundColor: theme.palette.common.bgrMaster, borderRadius: "4px", p: 2 }}>
          <Divider orientation={"vertical"} />
          <Grid
            sx={{
              minWidth: "580px",
              minHeight: watch("cvFile") ? "1040px" : "unset",
            }}
          >
            {watch("cvFile") ? (
              <div style={{ width: "100%", height: "1040px" }}>
                <iframe
                  src={getFileUrl(watch("cvFile")) + "#toolbar=0"}
                  style={{ width: "100%", height: "100%" }}
                ></iframe>
              </div>
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
