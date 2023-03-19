import {ButtonDS, TextAreaDS} from "@/components/DesignSystem";
import {Text, View} from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import {RHFTextField} from "@/components/hook-form";
import {Label} from "@/components/hook-form/style";
import {ViewModel} from "@/utils/cssStyles";
import {yupResolver} from "@hookform/resolvers/yup";
import {Avatar, CircularProgress, Divider, Grid, Modal, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {FormProvider, useForm} from "react-hook-form";
import * as Yup from "yup";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {phoneRegExp} from "@/utils/function";
import UploadAvatarApplicant from "@/components/upload/UploadAvatarApplicant";
import RHFDropdown from "@/components/hook-form/RHFDropdown";
import {LIST_EXPERIENCE_NUMBER, LIST_GENDER, LIST_MARITAL_STATUSES} from "@/utils/formatString";
import {useCreateApplicantRecruitmentMutation} from "@/sections/recruitment";
import {useGetApplicantByIdQuery, useUpdateApplicantMutation} from "@/sections/applicant";
import {DOMAIN_SERVER_API} from "@/config";
import UploadFileDragAndDrop from "@/components/upload/UploadFileDragAndDrop";

const defaultValues = {
  recruitmentId: undefined,
  fullName: undefined,
  portraitImage: undefined,
  cvFile: undefined,
  dateOfBirth: undefined,
  email: undefined,
  phoneNumber: undefined,
  identityNumber: undefined,
  weight: undefined,
  height: undefined,
  experience: undefined,
  education: undefined,
  jobSourceId: undefined,
  expectedSalaryFrom: undefined,
  expectedSalaryTo: undefined,
  maritalStatus: undefined,
  yearOfExperience: undefined,
  sex: undefined,
  applicantSkillIds: [],
  jobCategoryIds: [],
  academicLevelId: undefined,
  rawApplicantSkills: undefined,
  homeTower: {
    address: undefined
  },
  livingAddress: {
    address: undefined
  }
};

export const RecruitmentApplicantCreate = ({data, setData, show, setShow}) => {
    const isEditMode = !!data?.id;
    const [avatar, setAvatar] = useState(undefined);
    const [cv, setCV] = useState(undefined);
    // api
    const [addForm] = useCreateApplicantRecruitmentMutation();
    const [updateForm] = useUpdateApplicantMutation();
    let {data: preview = {}} = useGetApplicantByIdQuery({applicantId: data?.id}, {skip: !data?.id});
    const isLoading = isEditMode && !preview.id;
    // form
    const Schema = Yup.object().shape({
      RecruitmentId: Yup.string().required("Chưa có dữ liệu tin tuyển dụng"),
      FullName: Yup.string().required("Chưa nhập họ tên").max(50, "Họ tên không quá 50 ký tự"),
      PortraitImage: Yup.string(),
      DateOfBirth: undefined,
      Email: Yup.string().required("Chưa nhập email").email("Email cần nhập đúng định dạng"),
      PhoneNumber: Yup.string().required("Chưa nhập số điện thoại").matches(phoneRegExp, 'Số điện thoại không đúng định dạng'),
      Weight: Yup.number(),
      Height: Yup.number(),
      CvFile: Yup.string(),
      YearOfExperience: Yup.string(),
      ApplicantSkillIds: [],
      Experience: Yup.string(),
      IdentityNumber: Yup.number(),
      Education: Yup.string(),
      Sex: Yup.string(),
      MaritalStatus: Yup.string(),
    });

    const methods = useForm({
      defaultValues,
      resolver: yupResolver(Schema),
    });

    const {
      reset,
      // control,
      watch,
      setValue,
      handleSubmit,
      formState: {isSubmitting},
    } = methods;

    const pressHide = () => {
      setData(obj => ({...obj, stage: undefined}));
      setShow(false);
    };
    const {enqueueSnackbar} = useSnackbar();
    const pressSave = handleSubmit(async (e) => {
      let body = {
        id: isEditMode ? data.id : 0,
        name: e.name,
        description: e.description,
        isAvailable: e.isAvailable,
        approvalProcessLevels: e.approvalProcessLevels
      };

      if (isEditMode) {
        try {
          await updateForm(body).unwrap();
          enqueueSnackbar("Thực hiện thành công!", {
            autoHideDuration: 2000,
          });
          pressHide();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      } else {
        try {
          await addForm(body).unwrap();
          enqueueSnackbar("Thực hiện thành công!", {
            autoHideDuration: 1000,
          });
          pressHide();
        } catch (err) {
          enqueueSnackbar("Thực hiện thất bại!", {
            autoHideDuration: 1000,
            variant: "error",
          });
        }
      }
    });

    // effect
    useEffect(() => {
      if (show) return;
      reset();
      setValue("recruitmentId", data.recruitmentId);
    }, [show]);

    useEffect(() => {
      if (!data?.id) return;
      setValue("name", preview.name);
    }, [isEditMode, data, preview]);

    useEffect(() => {
      if (avatar && avatar.length > 0) {
        setValue("portraitImage", avatar[0]?.response);
      }
    }, [avatar, cv]);

    useEffect(() => {
      if (cv && cv.length > 0) {
        setValue("cvFile", cv[0]?.response);
      }
    }, [cv]);

    console.log(cv)

    return (
      <FormProvider {...methods}>
        <Modal
          open={show}
          onClose={pressHide}
          sx={{display: "flex", justifyContent: "flex-end"}}
        >
          <ViewModel sx={{width: "unset", height: "100%"}}>
            {/* header */}
            <View
              flexrow="true"
              atcenter="center"
              pv={12}
              ph={24}
              bgcolor={"#FDFDFD"}
            >
              <Text flex="true" fontsize={16} fontweight={"600"}>
                {isEditMode
                  ? `Chỉnh sửa ứng viên`
                  : `Thêm mới ứng viên`}
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
            {/* body */}
            <View style={{minWidth: "600px", height: "100%", overflowY: "auto"}}>
              {isLoading ? (
                <View flex="true" contentcenter="true">
                  <CircularProgress/>
                </View>
              ) : (
                <Grid container flexDirection={"column"}>
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <RHFTextField
                        title={"Tin tuyển dụng"}
                        isRequired={true}
                        name={"recruitmentId"}
                        disabled
                        placeholder="Nhập tên tin tuyển dụng"
                      />
                    </Grid>
                    <Grid mb={3}>
                      <UploadFileDragAndDrop multiple={false} fileList={cv} setFileList={setCV}
                                             maxFile={1}
                                             showUploadList={false} height={120}/>

                    </Grid>
                    <Grid mb={3}>
                      <Grid flexDirection={"row"} mb={3}>
                        <Typography variant={"textSize14500"} color={"#172B4D"} mr={"3px"}>{"Ảnh đại diện"}</Typography>
                        <Typography variant={"textSize14500"} color={"#5C6A82"}>(142x142px)</Typography>
                      </Grid>
                      <Grid container alignItems={"center"}>
                        <Grid item mr={3}>
                          <Avatar sx={{width: 120, height: 120}}
                                  src={DOMAIN_SERVER_API + "/File/GetFile?filePath=" + watch('portraitImage')}/>
                        </Grid>
                        <UploadAvatarApplicant multiple={false} fileList={avatar} setFileList={setAvatar} maxFile={1}
                                               showUploadList={false}/>
                      </Grid>
                    </Grid>
                    <Grid mb={3}>
                      <Label required={true}>{"Họ và tên"}</Label>
                      <RHFTextField
                        name={"fullName"}
                        placeholder="Nhập họ và tên ứng viên"
                      />
                    </Grid>
                    <Grid container flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Số điện thoại"}
                          isRequired={true}
                          name={"FullName"}
                          placeholder="Nhập số điện thoại ứng viên"
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFTextField
                          title={"Email"}
                          isRequired={true}
                          name={"Email"}
                          placeholder="Nhập email ứng viên"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>KINH NGHIỆM LÀM VIỆC VÀ HỌC VẤN</Typography>
                  </Grid>
                  <Grid item p={3}>
                    <Grid mb={3} xs={6} pr={"12px"}>
                      <RHFDropdown
                        title={"Số năm kinh nghiệm"}
                        options={LIST_EXPERIENCE_NUMBER}
                        name={"yearOfExperience"}
                        placeholder="Chọn số năm kinh nghiệm"
                      />
                    </Grid>
                    <Grid mb={3}>
                      <RHFTextField
                        title={"Kỹ năng"}
                        name={"rawApplicantSkills"}
                        placeholder="Nhập 1 hoặc nhiều kỹ năng"
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
                      <Label>Họ vấn</Label>
                      <TextAreaDS
                        name={"education"}
                        placeholder="VD: Thời gian - Trình độ - Nơi đào tạo - Chuyên ngành..."
                      />
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>ĐỊA CHỈ</Typography>
                  </Grid>
                  <Grid item p={3}>
                    <Grid mb={3}>
                      <Label>Nơi ở hiện tại</Label>
                      <TextAreaDS
                        name={"education"}
                        placeholder="VD: Số nhà, Tên đường, Xã/Phường, Quận/Huyện, Tỉnh/Thành..."
                      />
                    </Grid>
                    <Grid mb={3}>
                      <Label>Quê quán</Label>
                      <TextAreaDS
                        name={"education"}
                        placeholder="VD: Số nhà, Tên đường, Xã/Phường, Quận/Huyện, Tỉnh/Thành..."
                      />
                    </Grid>
                  </Grid>
                  <Grid item py={"12px"} px={3} bgcolor={"#F2F4F5"}>
                    <Typography variant={"subtitle2"} color={"#5C6A82"}>THÔNG TIN BỔ SUNG</Typography>
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
                    <Grid container mb={3} flexDirection={"row"} alignItems={"center"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Căn cước công dân"}
                          name={"identityNumber"}
                          placeholder="Chọn giới tính"
                        />
                      </Grid>
                      <Typography variant={"textSize12"} color={"#5C6A82"}
                                  sx={{fontStyle: "italic", paddingLeft: "12px", paddingTop: "20px"}}>Có thể thay thế bằng
                        số CMTND</Typography>
                    </Grid>
                    <Grid container mb={3} flexDirection={"row"}>
                      <Grid item xs={6} pr={"12px"}>
                        <RHFTextField
                          title={"Chiều cao"}
                          name={"height"}
                          placeholder="Chọn chiều cao"
                        />
                      </Grid>
                      <Grid item xs={6} pl={"12px"}>
                        <RHFTextField
                          title={"Cân nặng"}
                          name={"weight"}
                          placeholder="Chọn cân nặng"
                        />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              )}
            </View>

            {/* footer */}
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
    );
  }
;
