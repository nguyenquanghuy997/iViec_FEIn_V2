import { ButtonDS, TextAreaDS } from "@/components/DesignSystem";
import { Text, View } from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import { RHFTextField } from "@/components/hook-form";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import { Label } from "@/components/hook-form/style";
import UploadAvatarApplicant from "@/components/upload/UploadAvatarApplicant";
import UploadFileDragAndDrop from "@/components/upload/UploadFileDragAndDrop";
import { dispatch } from "@/redux/store";
import { API_SCAN_FILE_APPLICANTS } from "@/routes/api";
import {
  ApplicantFormSlice, useGetAllJobSourcesQuery,
  useGetApplicantByIdQuery,
  useUpdateApplicantMutation,
} from "@/sections/applicant";
import { ButtonCancelStyle } from "@/sections/applicant/style";
import {
  useCreateApplicantRecruitmentMutation,
  useGetApplicantRecruitmentQuery,
  useUploadFileApplicantMutation,
  useUploadFileApplicantRecruitmentMutation,
} from "@/sections/recruitment";
import { setValueFieldScan } from "@/sections/recruitment/helper";
import { ViewModel } from "@/utils/cssStyles";
import {
  LIST_EXPERIENCE_NUMBER,
  LIST_GENDER,
  LIST_MARITAL_STATUSES,
} from "@/utils/formatString";
import { phoneRegExp } from "@/utils/function";
import { getFileUrl } from "@/utils/helper";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Avatar,
  CircularProgress,
  Divider,
  Grid,
  Modal,
  Typography,
} from "@mui/material";
import { useSnackbar } from "notistack";
import React, { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import * as Yup from "yup";
import { useGetJobCategoriesQuery } from "@/sections/companyinfor/companyInforSlice";
import RHFMuiAutocomplete from "@/components/hook-form/RHFMuiAutocomplete";

const defaultValues = {
  id: undefined,
  recruitmentId: undefined,
  recruitmentPipelineStageId: undefined,
  pipelineStateResultType: undefined,
  fullName: undefined,
  jobSourceId: undefined,
  jobCategoryIds: undefined,
  portraitImage: undefined,
  cvFile: undefined,
  cvFileName: undefined,
  dateOfBirth: undefined,
  email: undefined,
  phoneNumber: undefined,
  identityNumber: undefined,
  weight: undefined,
  height: undefined,
  experience: undefined,
  education: undefined,
  expectedSalaryFrom: undefined,
  expectedSalaryTo: undefined,
  maritalStatus: undefined,
  yearOfExperience: undefined,
  sex: undefined,
  academicLevelId: undefined,
  rawApplicantSkills: undefined,
  homeTower: {
    address: undefined,
  },
  livingAddress: {
    address: undefined,
  },
};

export const RecruitmentApplicantCreate = ({
  data,
  setData,
  show,
  setShow,
}) => {
  const isEditMode = !!data?.id;
  const [avatar, setAvatar] = useState(undefined);
  const [cv, setCV] = useState(undefined);
  const [isEdit, setIsEdit] = useState(true);
  // api
  const [addForm] = useCreateApplicantRecruitmentMutation();
  const [updateForm] = useUpdateApplicantMutation();
  const [uploadFile] = useUploadFileApplicantMutation();
  const [uploadFileApplicantRecruitment] = useUploadFileApplicantRecruitmentMutation();
  const {data: {items: listJobSources = []} = {}} = useGetAllJobSourcesQuery();
  const {data: {items: listCategory = []} = {}} = useGetJobCategoriesQuery();
  let {data: preview = {}} = useGetApplicantByIdQuery(
    {applicantId: data?.id},
    {skip: !data?.id}
  );
  let {data: extendData = null} = useGetApplicantRecruitmentQuery(
    {
      applicantId: data?.id,
      recruitmentId: data?.recruitmentId,
    }, {skip: !(data?.id && data?.recruitmentId)}
  );
  const isLoading = isEditMode && !preview?.id && !extendData?.id;
  const [isUpload, setIsUpload] = useState(false);
  // form
  const Schema = Yup.object().shape({
    id: Yup.string().nullable(),
    recruitmentId: Yup.string(),
    recruitmentTitle: Yup.string().required("Chưa có dữ liệu tin tuyển dụng"),
    recruitmentPipelineStageId: Yup.string().nullable(),
    pipelineStateResultType: Yup.string().nullable(),
    jobCategoryIds: Yup.array().required("Chưa chọn ngành nghề"),
    jobSourceId: Yup.string().required("Chưa chọn nguồn"),
    fullName: Yup.string().max(50, "Họ tên không quá 50 ký tự").required("Chưa nhập họ tên"),
    portraitImage: Yup.string(),
    email: Yup.string().email("Email cần nhập đúng định dạng").required("Chưa nhập email"),
    phoneNumber: Yup.string().required("Chưa nhập số điện thoại").matches(phoneRegExp, "Số điện thoại không đúng định dạng"),
    weight: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    height: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    cvFile: Yup.string().nullable(),
    cvFileName: Yup.string().nullable(),
    yearOfExperience: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    experience: Yup.string(),
    identityNumber: Yup.string(),
    education: Yup.string(),
    sex: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    maritalStatus: Yup.number().transform((value) => (isNaN(value) ? undefined : value)).nullable(),
    homeTower: Yup.object().shape({
      address: Yup.string(),
    }),
    livingAddress: Yup.object().shape({
      address: Yup.string(),
    }),
    rawApplicantSkills: Yup.string(),
  });
  
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });
  
  const {
    reset,
    watch,
    setValue,
    handleSubmit,
    formState: {isSubmitting},
  } = methods;
  const pressHide = () => {
    reset();
    setAvatar(undefined);
    setIsUpload(false);
    setCV(undefined);
    setData((data) => ({
      ...data,
      id: undefined,
      stage: undefined,
      stageResult: undefined,
    }));
    setShow(false);
  };
  const {enqueueSnackbar} = useSnackbar();
  
  const pressSave = handleSubmit(async (body) => {
    let pathFile = "";
    body.jobCategoryIds = body.jobCategoryIds?.map(item => item?.value);
    if (isEditMode) {
      if (cv && cv.length > 0) {
        const file = new FormData();
        file.append("CvFile", cv[0].originFileObj);
        file.append("ApplicantRecruitmentId", extendData.id);
        pathFile = await uploadFileApplicantRecruitment(file).unwrap();
      }
      await updateForm({...body, cvFile: pathFile}).unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        dispatch(ApplicantFormSlice.util.invalidateTags([
          {type: 'GetListApplicantPipeline'},
          {type: 'GetListsApplicants'}
        ]));
        pressHide();
      }).catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 1000,
          variant: "error",
        });
      });
    } else {
      if (cv && cv.length > 0) {
        const file = new FormData();
        file.append("File", cv[0].originFileObj)
        pathFile = await uploadFile(file).unwrap();
      }
      await addForm({...body, cvFile: pathFile}).unwrap()
      .then(() => {
        enqueueSnackbar("Thực hiện thành công!", {
          autoHideDuration: 2000,
        });
        dispatch(
          ApplicantFormSlice.util.invalidateTags([
            { type: "APPLICANT", id: 'LIST_APPLICANT_PIPELINE'},
          ])
        );
        pressHide();
      }).catch(() => {
        enqueueSnackbar("Thực hiện thất bại!", {
          autoHideDuration: 2000,
          variant: "error",
        });
      });
    }
  });
  
  // effect
  useEffect(() => {
    if (!show) return;
    setValue("id", data.id);
    setValue("recruitmentId", data.recruitmentId);
    setValue("recruitmentTitle", data.recruitmentTitle);
    setValue("recruitmentPipelineStateId", data.stage);
    setValue("pipelineStateResultType", data.stageResult);
  }, [show]);
  
  useEffect(() => {
    if (!preview?.id) return;
    setValue("fullName", preview.fullName ?? undefined);
    setValue(
      "portraitImage",
      preview.portraitImage?.includes("base64")
        ? preview.portraitImage
        : getFileUrl(preview.portraitImage) ?? undefined
    );
    setValue("phoneNumber", preview.phoneNumber ?? undefined);
    setValue("email", preview.email ?? undefined);
    setValue("weight", preview.weight ?? undefined);
    setValue("height", preview.height ?? undefined);
    setValue("yearOfExperience", preview.yearOfExperience ?? undefined);
    setValue("experience", preview.experience ?? undefined);
    setValue("identityNumber", preview.identityNumber ?? undefined);
    setValue("education", preview.education ?? undefined);
    setValue("sex", preview.sex ?? undefined);
    setValue("maritalStatus", preview.maritalStatus ?? undefined);
    setValue("homeTower.address", preview.homeTower?.address ?? undefined);
    setValue(
      "livingAddress.address",
      preview.livingAddress?.address ?? undefined
    );
    setValue("rawApplicantSkills", preview.rawApplicantSkills ?? undefined);
    setValue("jobCategoryIds", preview.jobCategories?.map((item) => ({
      value: item.jobCategoryId,
      name: item.jobCategoryName,
      label: item.jobCategoryName
    })) ?? undefined);
    setValue("jobSourceId", preview.jobSourceId ?? undefined);
  }, [preview]);
  
  useEffect(() => {
    if (!extendData?.id) return;
    setValue("cvFile", extendData?.applicantCvPath);
    setValue("cvFileName", extendData?.applicantCvPath);
  }, [extendData]);
  
  useEffect(() => {
    if (avatar && avatar.length > 0) {
      setValue("portraitImage", getFileUrl(avatar[0].response));
    }
  }, [avatar]);
  
  useEffect(() => {
    if (cv && cv.length > 0) {
      setIsEdit(false);
      setIsUpload(true);
      setValue("cvFile", URL.createObjectURL(cv[0].originFileObj));
      setValue("cvFileName", cv[0].name);
      if (cv[0].status === "done" && cv[0].response) {
        setValueFieldScan(setValue, cv[0].response.profileScan);
      }
    }
  }, [cv]);
  
  return (
    <FormProvider {...methods}>
      <Modal
        open={show}
        onClose={pressHide}
        sx={{display: "flex", justifyContent: "flex-end"}}
      >
        <ViewModel
          sx={{
            width: "unset",
            height: "100%",
            justifyContent: "space-between",
          }}
        >
          {/* header */}
          <View>
            <View
              flexrow="true"
              atcenter="center"
              pv={12}
              ph={24}
              bgcolor={"#FDFDFD"}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                {isEditMode ? `Chỉnh sửa ứng viên` : `Thêm mới ứng viên`}
              </Text>
              <ButtonDS
                type="submit"
                sx={{
                  backgroundColor: "#fff",
                  boxShadow: "none",
                  ":hover": {
                    backgroundColor: "#EFF3F7",
                  },
                  textTransform: "none",
                  padding: "12px",
                  minWidth: "unset",
                }}
                onClick={pressHide}
                icon={
                  <Iconify
                    icon={"mi:close"}
                    width={20}
                    height={20}
                    color="#5C6A82"
                  />
                }
              />
            </View>
            <Divider/>
          </View>
          {/* body */}
          <View
            style={{
              minWidth: "600px",
              // maxWidth: "1200px",
              overflow: "hidden",
            }}
          >
            {isLoading ? (
              <View flex="true" contentcenter="true">
                <CircularProgress/>
              </View>
            ) : (
              <Grid
                container
                flexDirection={"row"}
                height={"100%"}
                flexWrap={"nowrap"}
                overflow={"hidden"}
              >
                <Grid
                  container
                  sx={{width: "600px", overflowY: "auto"}}
                  height={"100%"}
                  flexWrap={"nowrap"}
                  flexDirection={"column"}
                >
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <RHFTextField
                        title={"Tin tuyển dụng"}
                        isRequired={true}
                        name={"recruitmentTitle"}
                        disabled
                        placeholder="Nhập tên tin tuyển dụng"
                      />
                    </Grid>
                    <Grid mb={3}>
                      <UploadFileDragAndDrop
                        multiple={false}
                        fileList={cv}
                        setFileList={setCV}
                        maxFile={1}
                        url={API_SCAN_FILE_APPLICANTS}
                        showUploadList={false}
                        height={120}
                        autoUpload={true}
                        accept={"image/*,.pdf"}
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Grid flexDirection={"row"} mb={3}>
                        <Typography
                          variant={"textSize14500"}
                          color={"#172B4D"}
                          mr={"3px"}
                        >
                          {"Ảnh đại diện"}
                        </Typography>
                        <Typography variant={"textSize14500"} color={"#5C6A82"}>
                          (142x142px)
                        </Typography>
                      </Grid>
                      <Grid container alignItems={"center"}>
                        <Grid item mr={3}>
                          <Avatar
                            sx={{width: 120, height: 120}}
                            src={watch("portraitImage")}
                          />
                        </Grid>
                        <UploadAvatarApplicant
                          multiple={false}
                          fileList={avatar}
                          setFileList={setAvatar}
                          maxFile={1}
                          showUploadList={false}
                          accept={"image/png, image/gif, image/jpeg"}
                        />
                      </Grid>
                    </Grid>
                    <Grid mb={3}>
                      <Label required={true}>{"Họ và tên"}</Label>
                      <RHFTextField
                        name={"fullName"}
                        placeholder="Nhập họ và tên ứng viên"
                      />
                    </Grid>
                    <Grid mb={3} container flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Số điện thoại"}
                          isRequired={true}
                          name={"phoneNumber"}
                          placeholder="Nhập số điện thoại ứng viên"
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFTextField
                          title={"Email"}
                          isRequired={true}
                          name={"email"}
                          placeholder="Nhập email ứng viên"
                        />
                      </Grid>
                    </Grid>
                    <Grid container flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFMuiAutocomplete
                          options={listCategory?.map((i) => ({
                            value: i.id,
                            label: i.name,
                            name: i.name,
                          }))}
                          disabledOption={3}
                          name="jobCategoryIds"
                          title="Ngành nghề"
                          isRequired
                          placeholder="Chọn tối đa 3 ngành nghề (bắt buộc)"
                          multiple
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFDropdown
                          title={"Nguồn"}
                          isRequired={true}
                          options={listJobSources.map((item) => ({
                            value: item.id,
                            name: item.name
                          }))}
                          name={"jobSourceId"}
                          placeholder="Chọn nguồn"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>
                      KINH NGHIỆM LÀM VIỆC VÀ HỌC VẤN
                    </Typography>
                  </Grid>
                  <Grid item p={3}>
                    <Grid item mb={3} xs={6} pr={"12px"}>
                      <RHFDropdown
                        title={"Số năm kinh nghiệm"}
                        options={LIST_EXPERIENCE_NUMBER}
                        name={"yearOfExperience"}
                        placeholder="Chọn số năm kinh nghiệm"
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Label>Kỹ năng</Label>
                      <TextAreaDS
                        name={"rawApplicantSkills"}
                        placeholder="Nhập kỹ năng ứng viên"
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Label>Kinh nghiệm làm việc</Label>
                      <TextAreaDS
                        name={"experience"}
                        placeholder="VD: Thời gian - Công ty - Vị trí công việc - Mô tả cụ thể..."
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Label>Học vấn</Label>
                      <TextAreaDS
                        name={"education"}
                        placeholder="VD: Thời gian - Trình độ - Nơi đào tạo - Chuyên ngành..."
                      />
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>
                      ĐỊA CHỈ
                    </Typography>
                  </Grid>
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <Label>Nơi ở hiện tại</Label>
                      <TextAreaDS
                        name={"livingAddress.address"}
                        placeholder="VD: Số nhà, Tên đường, Xã/Phường, Quận/Huyện, Tỉnh/Thành..."
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Label>Quê quán</Label>
                      <TextAreaDS
                        name={"homeTower.address"}
                        placeholder="VD: Số nhà, Tên đường, Xã/Phường, Quận/Huyện, Tỉnh/Thành..."
                      />
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>
                      THÔNG TIN BỔ SUNG
                    </Typography>
                  </Grid>
                  <Grid item p={3}>
                    <Grid container mb={3} flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFDropdown
                          title={"Giới tính"}
                          options={LIST_GENDER}
                          name={"sex"}
                          placeholder="Chọn giới tính"
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFDropdown
                          title={"Tình trạng hôn nhân"}
                          options={LIST_MARITAL_STATUSES}
                          name={"maritalStatus"}
                          placeholder="Chọn tình trạng hồn nhân"
                        />
                      </Grid>
                    </Grid>
                    <Grid
                      container
                      mb={3}
                      flexDirection={"row"}
                      alignItems={"center"}
                    >
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Căn cước công dân"}
                          name={"identityNumber"}
                          placeholder="Nhập CCCD/CMTND"
                        />
                      </Grid>
                      <Typography
                        variant={"textSize12"}
                        color={"#5C6A82"}
                        sx={{
                          fontStyle: "italic",
                          paddingLeft: "12px",
                          paddingTop: "20px",
                        }}
                      >
                        Có thể thay thế bằng số CMTND
                      </Typography>
                    </Grid>
                    <Grid container mb={3} flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Chiều cao"}
                          type={"number"}
                          name={"height"}
                          placeholder="Nhập chiều cao"
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFTextField
                          title={"Cân nặng"}
                          type={"number"}
                          name={"weight"}
                          placeholder="Nhập cân nặng"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                {(isUpload || watch("cvFile")) && (
                  <>
                    <Divider orientation={"vertical"}/>
                    <Grid
                      sx={{
                        minWidth: "750px",
                        "& .pg-viewer-wrapper": {
                          overflowY: "auto",
                        },
                      }}
                    >
                      {isEdit ||
                      (watch("cvFile") && cv[0].status === "done") ? (
                        <div style={{width: "100%", height: "100%"}}>
                          <iframe
                            src={getFileUrl(watch("cvFile")) + "#toolbar=0"}
                            style={{width: "100%", height: "100%"}}
                          ></iframe>
                        </div>
                      ) : (
                        <View flex="true" contentcenter="true" height={"100%"}>
                          <CircularProgress/>
                        </View>
                      )}
                    </Grid>
                  </>
                )}
              </Grid>
            )}
          </View>
          <View
            flexrow="true"
            jcbetween="true"
            pv={12}
            ph={16}
            boxshadow={"inset 0px 1px 0px #EBECF4"}
          >
            <View flexrow="true">
              <ButtonDS
                type="submit"
                loading={isSubmitting}
                variant="contained"
                tittle={"Lưu"}
                onClick={pressSave}
              />
              <ButtonCancelStyle onClick={pressHide}>Hủy</ButtonCancelStyle>
            </View>
          </View>
        </ViewModel>
      </Modal>
    </FormProvider>
  )
};
