import {useUpdateCompanyPipelineMutation} from "../companyInforSlice";
import {View} from "@/components/DesignSystem/FlexStyled";
import {LabelStyle} from "@/components/hook-form/style";
import {PipelineStateType} from "@/utils/enum";
import {Box, Stack, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import React, {useEffect, useState} from "react";
import {RiDeleteBin6Line, RiLock2Line,} from "react-icons/ri";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {renderIconByPipelineType} from "@/sections/companyinfor/components/HireProcess";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {get, isEmpty} from "lodash";
import AntdTextArea from "@/components/form/AntdTextArea";
import {AddIcon} from "@/assets/ActionIcon";
import HelperText from "@/components/BaseComponents/HelperText";
import FormModalHead from "@/components/BaseComponents/form-modal/FormModalHead";
import FormModalBottom from "@/components/BaseComponents/form-modal/FormModalBottom";

const LIST_PIPELINE = [
  {description: "", organizationProfilePipelineType: 0, type: 0, isFixed: true, isOpen: true},
  {description: "", organizationProfilePipelineType: 1, type: 1, isFixed: false, isOpen: false},
  {description: "", organizationProfilePipelineType: 2, type: 2, isFixed: false, isOpen: false},
  {description: "", organizationProfilePipelineType: 3, type: 3, isFixed: true, isOpen: true},
  {description: "", organizationProfilePipelineType: 4, type: 4, isFixed: true, isOpen: true},
]

const EditHirePipeline = ({data, onClose}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [pipeLineState, setPipeLineState] = useState(LIST_PIPELINE);

  const [updatePipeline, { isLoading: isSubmitting }] = useUpdateCompanyPipelineMutation();

  useEffect(() => {
    if (!data) return;
    const organizationProfilePipelines = get(data, 'organizationProfilePipelines');
    if (isEmpty(organizationProfilePipelines)) {
      setPipeLineState(LIST_PIPELINE);
    } else {
      setPipeLineState(LIST_PIPELINE.reduce((acc, curr) => {
        const match = organizationProfilePipelines?.find((item) => item.type === curr.organizationProfilePipelineType);
        if (match) {
          acc.push({
            ...match,
            organizationProfilePipelineType: match.type,
            isOpen: true,
            error: { description: '' }
          });
        } else {
          acc.push({
            ...curr,
            error: { description: '' }
          });
        }
        return acc;
      }, []));
    }
  }, [JSON.stringify(data)]);

  const handleChange = (index, event) => {
    // let newPipeLineState = [...pipeLineState];
    // newPipeLineState[index][event.target.name] = event.target.value;
    // setPipeLineState(newPipeLineState);
    setPipeLineState((prev) => {
      return prev.map((key, i) => {
        if (i !== index) return key;
        return {
          ...key,
          [event.target.name]: event.target.value,
          error: {
            ...key.error,
            [event.target.name]: event.target.value.length > 0 ? null : 'Mô tả không được bỏ trống',
          },
        };
      });
    });
  }

  const addPipeline = (type) => {
    let pipeLine = {type: type, description: ''};
    const newPipeLine = pipeLineState.map((item) => item.organizationProfilePipelineType === type ? {
      ...item, ...pipeLine,
      isOpen: true
    } : item);
    setPipeLineState(newPipeLine)
  }

  const handleRemovePipeLine = (index) => {
    const newPipeLine = pipeLineState.map((item) => item.organizationProfilePipelineType === index ? {
      ...item,
      isOpen: false
    } : item);
    setPipeLineState(newPipeLine);
  };

  const prevIsValid = () => {
    const someEmpty = pipeLineState.filter(item => item.isFixed || item.isOpen).some((pipeLine) => pipeLine.description === '');
    if (someEmpty) {
      pipeLineState.map((key, index) => {
        const allPrev = [...pipeLineState];
        if (pipeLineState[index].description === '') {
          allPrev[index].error.description = 'Mô tả không được bỏ trống';
        }
        setPipeLineState(allPrev);
      });
    }
    return !someEmpty;
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!prevIsValid()) return;
    const dataVisiblePipeLine = pipeLineState.filter(item => item.isFixed || item.isOpen);
    const res = {
      organizationId: data?.id,
      organizationProfilePipelines: dataVisiblePipeLine
    };
    try {
      await updatePipeline(res).unwrap();
      enqueueSnackbar("Chỉnh sửa thông tin Quy trình tuyển dụng thành công!", {
        autoHideDuration: 2000,
      });
      onClose();
    } catch (err) {
      enqueueSnackbar('Chỉnh sửa thông tin Quy trình tuyển dụng không thành công!', {
        autoHideDuration: 1000,
        variant: "error",
      });
      throw err;
    }
  };

  return (
      <form onSubmit={onSubmit}>
        <FormModalHead title={'Chỉnh sửa Quy trình tuyển dụng'} onClose={onClose}/>
        <div className="edit-container">
        <Box>
          {pipeLineState?.map((pipeline, index) => {
            if (pipeline.organizationProfilePipelineType === 1) {
              return null;
            }
            if (pipeline.organizationProfilePipelineType !== 2) {
              return (
                  <View key={index} mb={24} p={24} style={{background: style.BG_GRAY}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div style={{display: "flex", alignItems: "center", flex: 1}}>
                        <Box>
                          {renderIconByPipelineType(pipeline?.organizationProfilePipelineType)}
                        </Box>
                        <Typography sx={{fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMI_BOLD}}>
                          {PipelineStateType(pipeline?.organizationProfilePipelineType || pipeline?.type)}
                        </Typography>
                      </div>
                      <RiLock2Line/>
                    </div>
                    <LabelStyle required>Mô tả</LabelStyle>
                    <AntdTextArea
                        maxLength={150}
                        placeholder="Nhập nội dung mô tả bước tuyển dụng..."
                        value={pipeline.description}
                        onChange={(e) => handleChange(index, e)}
                        name={'description'}
                    />
                    {pipeline.error?.description && <HelperText errorText={pipeline.error?.description} />}
                  </View>
              )
            } else {
              if (pipeline.isOpen) {
                return (
                    <View key={index} mb={24} p={24} style={{background: style.BG_GRAY}}>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center", flex: 1}}>
                          <Box>
                            {renderIconByPipelineType(pipeline?.organizationProfilePipelineType)}
                          </Box>
                          <Typography sx={{fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMI_BOLD}}>
                            {PipelineStateType(pipeline?.organizationProfilePipelineType)}
                          </Typography>
                        </div>
                        <RiDeleteBin6Line color="#E53935" onClick={() => handleRemovePipeLine(index)} cursor="pointer"/>
                      </div>
                      <LabelStyle required>Mô tả</LabelStyle>
                      <AntdTextArea
                          maxLength={150}
                          placeholder="Nhập nội dung mô tả bước tuyển dụng..."
                          value={pipeline.description}
                          onChange={(e) => handleChange(index, e)}
                          name={'description'}
                      />
                      {pipeline.error?.description && <HelperText errorText={pipeline.error?.description} />}
                    </View>
                )
              } else {
                return (
                    <View key={index} mb={24} p={24} style={{background: style.BG_GRAY}}>
                      <Box key={index} sx={{
                        border: '1px dashed #A2AAB7',
                        padding: '12px 24px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                      }}>
                        <Stack>
                          <Typography sx={{
                            fontSize: 14,
                            fontWeight: 600,
                            color: '#172B4D'
                          }}>{PipelineStateType(pipeline?.organizationProfilePipelineType)}</Typography>
                          <Typography sx={{fontSize: 13, fontWeight: 400, color: '#5C6A82'}}>Không hiển thị</Typography>
                        </Stack>
                        <Box>
                          <MuiButton
                              title={"Thêm"}
                              onClick={() => addPipeline(index)}
                              startIcon={<AddIcon/>}
                              sx={{height: 30}}
                          />
                        </Box>
                      </Box>
                    </View>
                )
              }
            }
          })}
        </Box>
        </div>
        <FormModalBottom
            onClose={onClose}
            loading={isSubmitting}
            btnConfirm={{
              title: 'Lưu',
              type: "submit",
            }}
        />
      </form>
  );
};
export default EditHirePipeline;
