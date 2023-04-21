import NoCV from "@/assets/NoCV";
import { View } from "@/components/FlexStyled";
import { getExtension } from "@/utils/function";
import { getFileUrl } from "@/utils/helper";
import {
  Box,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import React, { Suspense, useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";

const defaultValues = {
  cvFile: undefined,
  cvFileName: undefined,
};
const FileViewer = React.lazy(() => import("react-file-viewer"));

export const ApplicantCV = ({ dataLog }) => {
  const [cv] = useState(undefined);

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
        <Box sx={{ backgroundColor: "#F2F4F5", borderRadius: "4px", p: 2 }}>
          <Divider orientation={"vertical"} />
          <Grid
            sx={{
              minWidth: "580px",
              "& .pg-viewer-wrapper": {
                overflowY: "auto",
              },
              "& .photo-viewer-container, & img": {
                width: "100% !important",
                height: "100% !important",
              },
            }}
          >
            {watch("cvFile") ? (
              <Suspense
                fallback={
                  <View flex="true" contentcenter="true">
                    <CircularProgress />
                  </View>
                }
              >
                <FileViewer
                  fileType={getExtension(watch("cvFileName"))}
                  filePath={getFileUrl(watch("cvFile"))}
                />
              </Suspense>
            ) : (
              <Box sx={{ minHeight: "1040px" }}>
                <Box sx={{ textAlign: "center", marginTop:13 }}>
                  <NoCV />
                </Box>
                <Typography
                  sx={{
                    mt: 2,
                    textAlign: "center",
                    fontSize: 14,
                    fontWeight: 400,
                    color: "#A2AAB7",
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
