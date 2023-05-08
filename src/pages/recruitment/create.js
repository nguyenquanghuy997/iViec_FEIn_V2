import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import Content from "@/components/BaseComponents/Content";
import { View } from "@/components/FlexStyled";
import Page from "@/components/Page";
import { FormProvider } from "@/components/hook-form";
import {
  PERMISSION_PAGES,
  RECRUITMENT_CREATE_TYPE,
  SALARY_TYPE,
  SEX_TYPE,
  PIPELINE_TYPE,
} from "@/config";
import Layout from "@/layouts";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useGetOrganizationInfoQuery } from "@/sections/organizationdetail/OrganizationDetailSlice";
import { useCreateRecruitmentMutation } from "@/sections/recruitment";
import Header from "@/sections/recruitment-form/components/Header";
import TabList from "@/sections/recruitment-form/components/TabList";
import TabPanel from "@/sections/recruitment-form/components/TabPanel";
import { FormValidate } from "@/sections/recruitment-form/form/Validate";
import {
  DraftIcon,
  OrangeAlertIcon,
  SendIcon,
} from "@/sections/recruitment-form/icon/HeaderIcon";
import Information from "@/sections/recruitment-form/information";
import Pipeline from "@/sections/recruitment-form/pipeline";
import Preview from "@/sections/recruitment-form/preview/Preview";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { yupResolver } from "@hookform/resolvers/yup";
import { TabContext } from "@mui/lab";
import { Grid } from "@mui/material";
import { isEmpty } from "lodash";
import moment from "moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

CreateRecruitment.getLayout = function getLayout(pageProps, page) {
  return (
    <Layout permissions={PERMISSION_PAGES.createRecruitment} {...pageProps}>
      {page}
    </Layout>
  );
};

export default function CreateRecruitment() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const stateOpenForm = useSelector((state) => state.modalReducer.openState);
  const { openSaveDraft, openPreview, openSaveApprove } = stateOpenForm;

  const [valueTab, setValueTab] = useState("1");
  const [showAlert, setShowAlert] = useState(false);
  const [hState, sethState] = useState("top");
  const examinationDataRef = useRef(null);

  const goBackButtonHandler = () => {
    setShowAlert(true);
  };

  const onBackButtonEvent = (e) => {
    e.preventDefault();
    goBackButtonHandler();
  };

  useEffect(() => {
    window.history.pushState(null, null, window.location.pathname);
    window.addEventListener("popstate", onBackButtonEvent);
    return () => window.removeEventListener("popstate", onBackButtonEvent);
  }, []);

  useEffect(() => {
    const unloadCallback = (event) => {
      event.preventDefault();
      setShowAlert(true);
      if (event) {
        event.returnValue = "";
      }
      return "";
    };
    window.addEventListener("popstate", unloadCallback);
    return () => window.removeEventListener("popstate", unloadCallback);
  }, []);

  useEffect(() => {
    let lastVal = 0;
    window.onscroll = function () {
      let y = window.scrollY;
      if (y > lastVal) {
        sethState("down");
      }
      if (y < lastVal) {
        sethState("up");
      }
      if (y === 0) {
        sethState("top");
      }
      lastVal = y;
    };
  }, []);

  const handleChangeTab = (event, newValue) => {
    setValueTab(newValue);
  };

  const handleOpenConfirm = (data) => {
    dispatch(modalSlice.actions.openStateModal(data));
  };
  const handleCloseConfirm = () => dispatch(modalSlice.actions.closeModal());

  const [createRecruitment] = useCreateRecruitmentMutation();
  const { data: defaultOrganization = {} } = useGetOrganizationInfoQuery();

  const defaultValues = {
    name: "",
    organizationId: defaultOrganization?.id || null,
    description: "",
    benefit: "",
    requirement: "",
    numberPosition: 1,
    minSalary: null,
    maxSalary: null,
    salaryDisplayType: 0,
    sex: null,
    startDate: null,
    endDate: null,
    address: "",
    recruitmentLanguageIds: [],
    coOwnerIds: [],
    tags: [],
    jobPositionId: null,
    ownerId: null,
    workExperience: 0,
    currencyUnit: 0,
    candidateLevelId: null,
    recruitmentCouncilIds: [],
    recruitmentJobCategoryIds: [],
    recruitmentAddressIds: [],
    recruitmentWorkingForms: [],
    organizationPipelineId: null,
    isAutomaticStepChange: false,
  };

  const methods = useForm({
    resolver: yupResolver(FormValidate),
    mode: "onChange",
    defaultValues: React.useMemo(() => {
      return defaultValues;
    }, [defaultValues]),
    shouldUnregister: false,
  });

  const {
    handleSubmit,
    getValues,
    setValue,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    if (!isEmpty(defaultOrganization)) {
      setValue("organizationId", defaultOrganization.id);
    }
  }, [defaultOrganization]);

  const onSubmit = async (data) => {
    const hasExaminationValue = examinationDataRef.current.getHasValue();
    const examinationSize = examinationDataRef.current?.getSize();
    const pipelineStateDatas = examinationDataRef.current
      ?.getPipeLineStateData()
      ?.filter(
        (item) =>
          item.pipelineStateType === PIPELINE_TYPE.EXAMINATION &&
          !isEmpty(item.examinationId)
      );
    const pipelineStateDatasSize = pipelineStateDatas?.length;

    if (hasExaminationValue && examinationSize !== pipelineStateDatasSize) {
      enqueueSnackbar(
        "Thêm tin tuyển dụng không thành công. Vui lòng chọn đề thi!",
        {
          variant: "error",
        }
      );
      setValueTab("2");
      return;
    }

    const body = {
      ...data,
      startDate: moment(data?.startDate).toISOString(),
      endDate: moment(data?.endDate).toISOString(),
      recruitmentWorkingForms: data?.recruitmentWorkingForms.map((item) =>
        Number(item)
      ),
      minSalary:
        data.salaryDisplayType === SALARY_TYPE.NO_SALARY ||
        data.salaryDisplayType === SALARY_TYPE.NEGOTIABLE_SALARY
          ? null
          : Number(data.minSalary) || null,
      maxSalary:
        data.salaryDisplayType === SALARY_TYPE.NO_SALARY ||
        data.salaryDisplayType === SALARY_TYPE.NEGOTIABLE_SALARY
          ? null
          : Number(data.maxSalary) || null,
      sex:
        data.sex || data.sex === SEX_TYPE.MALE
          ? data.sex
          : SEX_TYPE.NOT_REQUIRED,
      recruitmentCreationType: openSaveDraft
        ? RECRUITMENT_CREATE_TYPE.DRAFT
        : RECRUITMENT_CREATE_TYPE.OFFICIAL,
      jobPositionId: data?.jobPositionId ? data?.jobPositionId : null,
      organizationPipelineStateDatas: !hasExaminationValue
        ? []
        : pipelineStateDatas
            ?.filter((item) => item?.examinationId !== null)
            ?.map((item) => ({
              organizationPipelineStateId: item.organizationPipelineStateId,
              examinationId: item.examinationId,
              examinationExpiredDays: Number(item.expiredTime),
            })),
    };
    try {
      await createRecruitment({
        ...body,
        recruitmentCreationType: openSaveDraft
          ? RECRUITMENT_CREATE_TYPE.DRAFT
          : RECRUITMENT_CREATE_TYPE.OFFICIAL,
      }).unwrap();
      handleCloseConfirm();
      enqueueSnackbar("Thêm tin tuyển dụng thành công!");
      await router.push(PATH_DASHBOARD.recruitment.root);
    } catch (e) {
      enqueueSnackbar(
        "Thêm tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
        {
          variant: "error",
        }
      );
      handleCloseConfirm();
      throw e;
    }
  };

  return (
    <Page title="Đăng tin tuyển dụng">
      <View mt={200} mb={36}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TabContext value={valueTab}>
            <Grid container>
              <Header
                title={"Đăng tin tuyển dụng"}
                onOpenConfirm={handleOpenConfirm}
                errors={isValid}
                onSubmit={onSubmit}
                setShowAlert={setShowAlert}
              />
              <TabList
                onChange={handleChangeTab}
                className={hState}
                isValid={isValid}
              />
            </Grid>
            <Content style={{ marginBottom: 64 }}>
              <Grid container columnSpacing={3}>
                <Grid item md={12} className="profile-content">
                  <TabPanel value="1">
                    <Information />
                  </TabPanel>
                  <TabPanel value="2">
                    <Pipeline ref={examinationDataRef} />
                  </TabPanel>
                </Grid>
              </Grid>
            </Content>
          </TabContext>
        </FormProvider>
      </View>
      {showAlert && (
        <ConfirmModal
          open={showAlert}
          onClose={() => setShowAlert(false)}
          icon={<OrangeAlertIcon />}
          title={"Trở về danh sách tin tuyển dụng"}
          titleProps={{
            sx: {
              color: style.COLOR_MAIN,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={
            "Các thao tác trước đó sẽ không được lưu, Bạn có chắc chắn muốn trở lại?"
          }
          data={getValues()}
          onSubmit={() => router.push(PATH_DASHBOARD.recruitment.root)}
          btnCancelProps={{ title: "Hủy" }}
          btnConfirmProps={{
            title: "Trở lại",
            color: "dark",
          }}
        />
      )}
      {openSaveDraft && (
        <ConfirmModal
          open={openSaveDraft}
          onClose={handleCloseConfirm}
          icon={<DraftIcon height={45} width={50} />}
          title={"Lưu nháp tin tuyển dụng"}
          titleProps={{
            sx: {
              color: style.COLOR_TEXT_PRIMARY,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={"Bạn có chắc chắn muốn lưu nháp tin tuyển dụng này?"}
          data={getValues()}
          onSubmit={onSubmit}
          btnCancelProps={{ title: "Hủy" }}
          btnConfirmProps={{ title: "Xác nhận" }}
        />
      )}
      {openSaveApprove && (
        <ConfirmModal
          open={openSaveApprove}
          onClose={handleCloseConfirm}
          icon={<SendIcon />}
          title={"Gửi phê duyệt tin tuyển dụng"}
          titleProps={{
            sx: {
              color: style.COLOR_PRIMARY,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={"Bạn có chắc chắn muốn gửi phê duyệt tin tuyển dụng này?"}
          data={getValues()}
          onSubmit={onSubmit}
          btnCancelProps={{ title: "Hủy" }}
          btnConfirmProps={{ title: "Gửi phê duyệt" }}
        />
      )}
      {openPreview && (
        <Preview
          open={openPreview}
          onClose={handleCloseConfirm}
          data={{
            name: getValues("name"),
            organizationId: getValues("organizationId"),
            numberPosition: getValues("numberPosition"),
            address: getValues("address"),
            recruitmentJobCategories: getValues(
              "recruitmentJobCategoryIds"
            )?.map((item) => ({
              jobCategoryId: item,
            })),
            recruitmentWorkingForms: getValues("recruitmentWorkingForms")?.map(
              (item) => ({
                workingForm: item,
              })
            ),
            salaryDisplayType: getValues("salaryDisplayType"),
            minSalary: getValues("minSalary"),
            maxSalary: getValues("maxSalary"),
            currencyUnit: getValues("currencyUnit"),
            description: getValues("description"),
            requirement: getValues("requirement"),
            benefit: getValues("benefit"),
          }}
        />
      )}
    </Page>
  );
}
