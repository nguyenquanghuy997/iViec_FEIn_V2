import ConfirmModal from "@/components/BaseComponents/ConfirmModal";
import Content from "@/components/BaseComponents/Content";
import { View } from "@/components/FlexStyled";
import LoadingScreen from "@/components/LoadingScreen";
import Page from "@/components/Page";
import { FormProvider } from "@/components/hook-form";
import {
  PERMISSION_PAGES,
  PIPELINE_TYPE,
  RECRUITMENT_CREATE_TYPE,
  RECRUITMENT_STATUS,
  SALARY_TYPE,
  SEX_TYPE,
} from "@/config";
import Layout from "@/layouts";
import { modalSlice } from "@/redux/common/modalSlice";
import { useDispatch, useSelector } from "@/redux/store";
import { PATH_DASHBOARD } from "@/routes/paths";
import { useGetOrganizationInfoQuery } from "@/sections/organizationdetail/OrganizationDetailSlice";
import {
  useCreateRecruitmentMutation,
  useDeleteRecruitmentMutation,
  useGetRecruitmentByIdQuery,
  useUpdateRecruitmentDraftMutation,
  useUpdateRecruitmentMutation,
} from "@/sections/recruitment";
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
import { isEmpty, pick } from "lodash";
import moment from "moment/moment";
import { useRouter } from "next/router";
import { useSnackbar } from "notistack";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

UpdateRecruitment.getLayout = function getLayout(pageProps, page) {
  return (
    <Layout permissions={PERMISSION_PAGES.editRecruitment} {...pageProps}>
      {page}
    </Layout>
  );
};

export default function UpdateRecruitment() {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();
  const { query } = router;
  const [valueTab, setValueTab] = useState("1");

  const stateOpenForm = useSelector((state) => state.modalReducer.openState);
  const { openSaveDraft, openPreview, openSaveApprove } = stateOpenForm;
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
  const [deleteRecruitments] = useDeleteRecruitmentMutation();
  const [updateRecruitment] = useUpdateRecruitmentMutation();
  const [updateRecruitmentDraft] = useUpdateRecruitmentDraftMutation();
  const { data: defaultOrganization = {} } = useGetOrganizationInfoQuery();
  const { data: Recruitment = {}, isLoading } = useGetRecruitmentByIdQuery(
    { Id: query.id },
    { skip: !query.id }
  );

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
    mode: "onBlur",
    resolver: openSaveDraft ? null : yupResolver(FormValidate),
    defaultValues: defaultValues,
  });

  const {
    handleSubmit,
    getValues,
    reset,
    formState: { isValid },
  } = methods;

  useEffect(() => {
    reset({
      ...Recruitment,
      minSalary:
        Recruitment.salaryDisplayType === SALARY_TYPE.NO_SALARY ||
        Recruitment.salaryDisplayType === SALARY_TYPE.NEGOTIABLE_SALARY
          ? ""
          : Recruitment.minSalary,
      maxSalary:
        Recruitment.salaryDisplayType === SALARY_TYPE.NO_SALARY ||
        Recruitment.salaryDisplayType === SALARY_TYPE.NEGOTIABLE_SALARY
          ? ""
          : Recruitment.maxSalary,
      organizationId: Recruitment?.organizationId || defaultOrganization?.id,
      recruitmentAddressIds: Recruitment?.recruitmentAddresses?.map(
        (item) => item?.provinceId
      ),
      recruitmentJobCategoryIds: Recruitment?.recruitmentJobCategories?.map(
        (item) => item?.jobCategoryId
      ),
      recruitmentWorkingForms: Recruitment?.recruitmentWorkingForms?.map(
        (item) => item?.workingForm
      ),
      jobPositionId: Recruitment?.jobPosition?.id,
      sex: Recruitment?.sex === SEX_TYPE.NOT_REQUIRED ? "" : Recruitment.sex,
      recruitmentCouncilIds: Recruitment?.recruitmentCouncils?.map(
        (item) => item?.councilUserId
      ),
      coOwnerIds: Recruitment?.coOwners?.map((item) => item?.id),
      recruitmentLanguageIds: Recruitment?.recruitmentLanguages?.map(
        (item) => item?.languageId
      ),
      organizationPipelineId:
        Recruitment?.recruitmentPipeline?.organizationPipelineId,
      isAutomaticStepChange:
        Recruitment?.recruitmentPipeline?.isAutomaticStepChange,
    });
  }, [Recruitment, defaultOrganization]);

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
        "Cập nhật tin tuyển dụng không thành công. Vui lòng chọn đề thi!",
        {
          variant: "error",
        }
      );
      setValueTab("2");
      return;
    }
    const body = {
      ...data,
      startDate: moment(data?.startDate).startOf("date").toISOString(),
      endDate: moment(data?.endDate).endOf("date").toISOString(),
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
    const dataSubmit = pick(body, [
      "id",
      "name",
      "organizationId",
      "description",
      "benefit",
      "requirement",
      "numberPosition",
      "minSalary",
      "maxSalary",
      "salaryDisplayType",
      "sex",
      "startDate",
      "endDate",
      "address",
      "recruitmentLanguageIds",
      "coOwnerIds",
      "tags",
      "jobPositionId",
      "ownerId",
      "workExperience",
      "currencyUnit",
      "candidateLevelId",
      "organizationPipelineId",
      "isAutomaticStepChange",
      "recruitmentCouncilIds",
      "recruitmentJobCategoryIds",
      "recruitmentAddressIds",
      "recruitmentWorkingForms",
      "organizationPipelineStateDatas",
    ]);
    if (Recruitment.processStatus === RECRUITMENT_STATUS.DRAFT) {
      try {
        await updateRecruitmentDraft({
          ...dataSubmit,
          recruitmentCreationType:
            Recruitment.processStatus === RECRUITMENT_STATUS.DRAFT &&
            openSaveDraft
              ? RECRUITMENT_CREATE_TYPE.DRAFT
              : RECRUITMENT_CREATE_TYPE.OFFICIAL,
        }).unwrap();
        handleCloseConfirm();
        enqueueSnackbar("Cập nhật tin tuyển dụng thành công!");
        await router.push(PATH_DASHBOARD.recruitment.root);
      } catch (e) {
        enqueueSnackbar(
          "Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
          {
            variant: "error",
          }
        );
        handleCloseConfirm();
        throw e;
      }
    } else if (
      !openSaveDraft &&
      Recruitment.processStatus != RECRUITMENT_STATUS.DRAFT
    ) {
      try {
        await updateRecruitment(body).unwrap();
        handleCloseConfirm();
        enqueueSnackbar("Cập nhật tin tuyển dụng thành công!");
        await router.push(PATH_DASHBOARD.recruitment.root);
      } catch (e) {
        enqueueSnackbar(
          "Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
          {
            variant: "error",
          }
        );
        handleCloseConfirm();
        throw e;
      }
    } else {
      try {
        await deleteRecruitments({ ids: [body.id] }).unwrap();
        await createRecruitment({
          ...dataSubmit,
          id: null,
          recruitmentCreationType: RECRUITMENT_CREATE_TYPE.DRAFT,
        }).unwrap();
        handleCloseConfirm();
        enqueueSnackbar("Cập nhật tin tuyển dụng thành công!");
        await router.push(PATH_DASHBOARD.recruitment.root);
      } catch (e) {
        enqueueSnackbar(
          "Cập nhật tin tuyển dụng không thành công. Vui lòng kiểm tra dữ liệu và thử lại!",
          {
            variant: "error",
          }
        );
        handleCloseConfirm();
        throw e;
      }
    }
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Page title="Cập nhật tin tuyển dụng">
      <View mt={200} mb={36}>
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
          <TabContext value={valueTab}>
            <Grid container>
              <Header
                recruitment={Recruitment}
                title={"Cập nhật tin tuyển dụng"}
                onOpenConfirm={handleOpenConfirm}
                errors={isValid}
                setShowAlert={setShowAlert}
              />
              <TabList
                onChange={handleChangeTab}
                className={hState}
                isValid={isValid}
              />
            </Grid>
            <Content style={{ marginBottom: 64 }}>
              <TabPanel value={"1"}>
                <Information recruitment={Recruitment} />
              </TabPanel>
              <TabPanel value={"2"}>
                <Pipeline recruitment={Recruitment} ref={examinationDataRef} />
              </TabPanel>
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
          title={"Lưu nháp"}
          titleProps={{
            sx: {
              color: style.COLOR_TEXT_PRIMARY,
              fontWeight: 600,
              marginBottom: 1,
            },
          }}
          subtitle={"Hãy lưu nháp lại tin tuyển dụng này để tiếp tục chỉnh sửa"}
          data={getValues()}
          onSubmit={onSubmit}
          btnCancelProps={{ title: "Không lưu" }}
          btnConfirmProps={{ title: "Lưu nháp" }}
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
          btnCancelProps={{
            title: "Hủy",
            sx: {
              fontWeight: 600,
            },
          }}
          btnConfirmProps={{
            title: "Gửi phê duyệt",
            sx: {
              fontWeight: 600,
            },
          }}
          dialogProps={{
            wrapperSx: {
              "& .MuiDialog-container": {
                paddingTop: "100px",
                alignItems: "flex-start",
                "& .MuiPaper-root": {
                  borderRadius: "6px",
                  width: "100%",
                },
              },
            },
          }}
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
