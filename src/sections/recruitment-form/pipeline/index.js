import { Text, View } from "@/components/FlexStyled";
import { RHFCheckbox, RHFSelect } from "@/components/hook-form";
import { LabelStyle } from "@/components/hook-form/style";
import { PIPELINE_TYPE } from "@/config";
import {
  useGetAllPipelineByOrganizationQuery,
  useGetAllStepOfPipelineQuery,
} from "@/sections/pipeline";
import DividerCard from "@/sections/recruitment-form/components/DividerCard";
import PipelineCard from "@/sections/recruitment-form/components/PipelineCard";
import TextNote from "@/sections/recruitment-form/components/TextNote";
import ExaminationForm from "@/sections/recruitment-form/form/ExaminationForm";
import useModal from "@/sections/recruitment-form/hooks/useModal";
import {
  BoxInnerStyle,
  BoxWrapperStyle,
} from "@/sections/recruitment-form/style";
import { STYLE_CONSTANT as style } from "@/theme/palette";
import { Box, CircularProgress, Divider, Typography } from "@mui/material";
import { isEmpty } from "lodash";
import {
  forwardRef,
  memo,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { useFormContext, useWatch } from "react-hook-form";

const RecruitmentPipeline = forwardRef(({ recruitment }, ref) => {
  const { setValue, getValues } = useFormContext();

  const { isOpen, selected, onOpen, onClose } = useModal();

  const [pipelineStateDatas, setPipelineStateDatas] = useState([]);
  const [hasExamination, setHasExamination] = useState({
    hasValue: false,
    size: 0,
  });

  useImperativeHandle(ref, () => {
    return {
      getHasValue: () => hasExamination.hasValue,
      getSize: () => hasExamination.size,
      getPipeLineStateData: () => pipelineStateDatas,
    };
  });

  const organizationId = useWatch({ name: "organizationId" });
  const organizationPipelineId = useWatch({ name: "organizationPipelineId" });

  const { data: { items: ListPipeline = [] } = {}, isLoading } =
    useGetAllPipelineByOrganizationQuery({ OrganizationId: organizationId });
  const { data: ListStepPipeline = {} } = useGetAllStepOfPipelineQuery(
    { Id: organizationPipelineId },
    { skip: !organizationPipelineId }
  );

  useEffect(() => {
    if (!isEmpty(recruitment)) {
      setPipelineStateDatas(
        recruitment?.recruitmentPipeline?.recruitmentPipelineStates?.map(
          (item) => ({
            organizationPipelineId:
              recruitment?.recruitmentPipeline?.organizationPipelineId,
            expiredTime: item?.examinationExpiredDays,
            examinationId: item?.examinationId,
            examinationName: item?.examinationName,
            pipelineStateType: item?.pipelineStateType,
            organizationPipelineStateId: item?.organizationPipelineStateId,
          })
        )
      );
    }
  }, [recruitment]);

  useEffect(() => {
    if (!isEmpty(ListStepPipeline?.organizationPipelineStates)) {
      const listStepPipelineSize =
        ListStepPipeline?.organizationPipelineStates?.filter(
          (item) => item.pipelineStateType === PIPELINE_TYPE.EXAMINATION
        )?.length;
      setHasExamination({
        hasValue: listStepPipelineSize > 0 ? true : false,
        size: listStepPipelineSize,
      });
    }
  }, [ListStepPipeline, organizationPipelineId]);

  const handleSaveExamination = (data) => {
    if (isEmpty(recruitment)) {
      const findIndex = pipelineStateDatas
        ?.map((item) => item.organizationPipelineStateId)
        .indexOf(data.organizationPipelineStateId);
      if (findIndex !== -1) {
        const newValue = pipelineStateDatas?.map((i) =>
          i.organizationPipelineStateId === data.organizationPipelineStateId
            ? {
                ...data,
                examinationName: data?.examinationName,
              }
            : { ...i }
        );
        setPipelineStateDatas(newValue);
      } else {
        const newValue = [
          ...pipelineStateDatas,
          { ...data, examinationName: data?.examinationName },
        ];
        setPipelineStateDatas(newValue);
      }
    } else {
      const findIndex = data?.index || 1;
      const pipelineStateData = pipelineStateDatas[findIndex];
      const newValue = pipelineStateDatas?.map((i, index) =>
        index === findIndex
          ? {
              ...pipelineStateData,
              ...data,
            }
          : { ...i }
      );
      setPipelineStateDatas(newValue);
    }
  };

  const organizationPipelineDes = ListPipeline?.find(
    (i) => i.id === organizationPipelineId
  )?.description;

  useEffect(() => {
    if (isEmpty(ListPipeline) || getValues().organizationPipelineId) return;
    setValue(
      "organizationPipelineId",
      ListPipeline.find((i) => i.isDefault)?.id || null
    );
  }, [ListPipeline]);

  if (isLoading)
    return (
      <Box textAlign="center" my={1}>
        <CircularProgress size={24} />
      </Box>
    );

  return (
    <>
      <BoxWrapperStyle className="wrapper">
        <Box
          className="box-item"
          sx={{
            // width: style.WIDTH_FULL,
            // To do fix scrollbar
            minHeight: "999px",
            backgroundColor: "transparent",
            display: "flex",
          }}
        >
          <BoxInnerStyle
            sx={{
              height: "100%",
              borderBottomRightRadius: "6px",
              borderBottomLeftRadius: "6px",
            }}
          >
            <DividerCard
              title="QUY TRÌNH TUYỂN DỤNG"
              sx={{ borderTopRightRadius: "6px", borderTopLeftRadius: "6px" }}
            />
            <Box sx={{ px: 4, py: 3 }}>
              <LabelStyle required>Quy trình tuyển dụng có sẵn</LabelStyle>
              <RHFSelect
                name="organizationPipelineId"
                placeholder="Chọn 1 quy trình tuyển dụng"
                fullWidth
                options={ListPipeline?.filter(
                  (item) => item.isActivated === true
                )?.map((item) => ({
                  id: item.id,
                  value: item.id,
                  name: item.name,
                  label: item.name,
                }))}
                onChange={(e) => {
                  setValue("organizationPipelineId", e);
                  setPipelineStateDatas(
                    ListStepPipeline?.organizationPipelineStates?.map(
                      (pipeline) => ({
                        organizationPipelineId: pipeline.id,
                        pipelineStateType: pipeline.pipelineStateType,
                        examinationId: null,
                        expiredTime: null,
                        examinationName: null,
                      })
                    )
                  );
                }}
              />

              {!!organizationPipelineDes && (
                <View flexRow mt={16}>
                  <Text>{"Mô tả:"}</Text>

                  <Text ml={24}>{organizationPipelineDes}</Text>
                </View>
              )}

              <Divider sx={{ my: "24px" }} />

              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Typography
                  sx={{
                    color: style.COLOR_TEXT_PRIMARY,
                    fontSize: style.FONT_BASE,
                    fontWeight: style.FONT_SEMI_BOLD,
                  }}
                >
                  Bước tuyển dụng
                </Typography>
                <RHFCheckbox
                  name="isAutomaticStepChange"
                  label="Tự động chuyển bước"
                  style={{ marginRight: 0 }}
                />
              </Box>
              <Box sx={{ mt: 1 }}>
                {ListStepPipeline?.organizationPipelineStates?.map(
                  (item, index) => {
                    const examination = pipelineStateDatas?.find(
                      (pipeline) =>
                        pipeline?.organizationPipelineStateId === item?.id
                    );
                    return item.pipelineStateType ===
                      PIPELINE_TYPE.OFFER ? null : (
                      <PipelineCard
                        key={index}
                        index={index}
                        item={item}
                        isDefault={ListStepPipeline?.isDefault}
                        examination={
                          isEmpty(recruitment)
                            ? {
                                examinationName: examination?.examinationName,
                                examinationId: examination?.examinationId,
                                expiredTime: examination?.expiredTime,
                                organizationPipelineId: organizationPipelineId,
                              }
                            : {
                                examinationName:
                                  pipelineStateDatas[index]?.examinationName,
                                examinationId:
                                  pipelineStateDatas[index]?.examinationId,
                                expiredTime:
                                  pipelineStateDatas[index]?.expiredTime,
                                organizationPipelineId: organizationPipelineId,
                              }
                        }
                        onOpenFormExamination={onOpen}
                      />
                    );
                  }
                )}
              </Box>
            </Box>
          </BoxInnerStyle>
          <View>
            <TextNote
              title="Lưu ý:"
              texts={[
                "Vui lòng chọn quy trình tuyển dụng đã được tạo sẵn trong phần thiết lập. Ứng viên sẽ được trải qua các bước trong quy trình đã chọn.",
                "Nếu chưa có quy trình tuyển dụng phù hợp, Hãy liên hệ Quản trị viên doanh nghiệp của bạn để thêm quy trình mới.",
              ]}
            />

            <TextNote
              title="Tự động chuyển bước sẽ thực hiện như sau:"
              texts={[
                "- Ứng viên được chuyển sang bước tiếp theo ngay sau khi ứng tuyển, khi có kết quả thi Đạt, Phỏng vấn Đạt",
                "- Ứng viên được chuyển sang bước Kết quả - Loại ngay sau khi thi trượt, phỏng vấn trượt",
              ]}
            />
          </View>
        </Box>
      </BoxWrapperStyle>
      {isOpen && (
        <ExaminationForm
          open={isOpen}
          onClose={onClose}
          data={selected}
          onSaveExamination={handleSaveExamination}
        />
      )}
    </>
  );
});

export default memo(RecruitmentPipeline);
