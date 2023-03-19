import {ButtonDS, TextAreaDS} from "@/components/DesignSystem";
import {Text, View} from "@/components/DesignSystem/FlexStyled";
import Iconify from "@/components/Iconify";
import {RHFTextField} from "@/components/hook-form";
import {Label} from "@/components/hook-form/style";
import {
  useAddApproveProcessMutation,
  useGetPreviewApproveProcessQuery,
  useUpdateApproveProcessMutation
} from "@/sections/approve-process/ApproveProcessSlice";
import {ViewModel} from "@/utils/cssStyles";
import {yupResolver} from "@hookform/resolvers/yup";
import {CircularProgress, Divider, Modal} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect} from "react";
import {FormProvider, useForm} from "react-hook-form";
import * as Yup from "yup";
import {ButtonCancelStyle} from "@/sections/applicant/style";
import {formatDataGet} from "@/sections/approve-process/config";
import {phoneRegExp} from "@/utils/function";

const defaultValues = {
  RecruitmentId: undefined,
  FullName: undefined,
  PortraitImage: undefined,
  DateOfBirth: undefined,
  Email: undefined,
  PhoneNumber: undefined,
  Weight: undefined,
  Height: undefined,
  CvFile: undefined,
  YearOfExperience: false,
  ApplicantSkillIds: [],
  Experience: undefined,
  IdentityNumber: undefined,
  Education: undefined,
  Sex: undefined,
  MaritalStatus: undefined,
};

export const RecruitmentApplicantCreate = ({data, setData, show, setShow}) => {
    const isEditMode = !!data?.id;
    // api
    const [addForm] = useAddApproveProcessMutation();
    const [updateForm] = useUpdateApproveProcessMutation();
    let {data: preview = {}} = useGetPreviewApproveProcessQuery({Id: data?.id}, {skip: !data?.id});
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
      setValue,
      handleSubmit,
      formState: {isSubmitting},
    } = methods;

// action
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

    // render
    const renderTitle = (title, required) => {
      return <Label required={required}>{title}</Label>;
    };

    // effect
    useEffect(() => {
      if (!show) {
        reset();
        setValue("name", "");
        setValue("description", "");
        setValue("isAvailable", false);
      }
    }, [show]);

    useEffect(() => {
      if (!data?.id) return;
      let body = preview;
      body = formatDataGet(body);
      setValue("name", body.name);
      setValue("description", body.description);
      setValue("isAvailable", body.isAvailable);
      setValue("approvalProcessLevels", body.approvalProcessLevels);
    }, [isEditMode, data, preview]);

    return (
      <FormProvider {...methods}>
        <Modal
          open={show}
          onClose={pressHide}
          sx={{display: "flex", justifyContent: "flex-end"}}
        >
          <ViewModel>
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
              <Text>{JSON.stringify(data)}</Text>
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
            {isLoading ? (
              <View flex="true" contentcenter="true">
                <CircularProgress/>
              </View>
            ) : (
              <View flex="true" p={24} pb={28} style={{overflowY: "scroll"}}>
                {/* code & name */}
                <View mb={24}>
                  {renderTitle("Tên quy trình phê duyệt", true)}
                  <RHFTextField
                    name={"name"}
                    placeholder="Nhập tên quy trình phê duyệt"
                  />
                </View>
                <View mb={24}>
                  {renderTitle("Mô tả")}
                  <TextAreaDS
                    maxLength={255}
                    placeholder="Nhập nội dung mô tả..."
                    name={"description"}
                  />
                </View>
                <Divider sx={{mt: 1, mb: 3}}/>
              </View>
            )}
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
