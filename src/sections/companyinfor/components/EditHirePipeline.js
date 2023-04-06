import {useUpdateCompanyPipelineMutation} from "../companyInforSlice";
import {View} from "@/components/DesignSystem/FlexStyled";
import {LabelStyle} from "@/components/hook-form/style";
import {PipelineStateType} from "@/utils/enum";
import {Box, Stack, Typography} from "@mui/material";
import {useSnackbar} from "notistack";
import {useEffect, useState} from "react";
import {RiDeleteBin6Line, RiLock2Line,} from "react-icons/ri";
import MuiButton from "@/components/BaseComponents/MuiButton";
import {renderIconByPipelineType} from "@/sections/companyinfor/components/HireProcess";
import {STYLE_CONSTANT as style} from "@/theme/palette";
import {get, isEmpty} from "lodash";
import AntdTextArea from "@/components/form/AntdTextArea";
import {AddIcon} from "@/assets/ActionIcon";

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

  const [updatePipeline] = useUpdateCompanyPipelineMutation();

  const onSubmit = async (e) => {
    e.preventDefault();
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

  const handleChange = (index, event) => {
    let newPipeLineState = [...pipeLineState];
    newPipeLineState[index][event.target.name] = event.target.value;
    setPipeLineState(newPipeLineState);
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
            isOpen: true
          });
        } else {
          acc.push(curr);
        }
        return acc;
      }, []));
    }


  }, [JSON.stringify(data)]);

  return (
      <form onSubmit={onSubmit}>
        <Box sx={{padding: 3, mb: 8}}>
          {pipeLineState?.map((pipeline, index) => {
            if (pipeline.organizationProfilePipelineType !== 1 && pipeline.organizationProfilePipelineType !== 2) {
              return (
                  <View key={index} mb={24} p={24} style={{background: style.BG_GRAY}}>
                    <div style={{display: "flex", justifyContent: "space-between"}}>
                      <div style={{display: "flex", alignItems: "center", flex: 1}}>
                        <Box>
                          {renderIconByPipelineType(pipeline?.organizationProfilePipelineType)}
                        </Box>
                        <Typography sx={{fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD}}>
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
                  </View>
              )
            } else if (pipeline.organizationProfilePipelineType === 1 || pipeline.organizationProfilePipelineType === 2) {
              if (pipeline.isOpen) {
                return (
                    <View key={index} mb={24} p={24} style={{background: style.BG_GRAY}}>
                      <div style={{display: "flex", justifyContent: "space-between"}}>
                        <div style={{display: "flex", alignItems: "center", flex: 1}}>
                          <Box>
                            {renderIconByPipelineType(pipeline?.organizationProfilePipelineType)}
                          </Box>
                          <Typography sx={{fontSize: style.FONT_BASE, fontWeight: style.FONT_SEMIBOLD}}>
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
                        <Typography sx={{fontSize: 14, fontWeight: 600, color: '#172B4D'}}>Thi tuyển</Typography>
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
          })}
        </Box>
        <div
            style={{
              display: "flex",
              flexDirection: "row",
              position: "fixed",
              bottom: 0,
              background: "#FDFDFD",
              width: "100%",
              padding: "16px 24px",
              border: "1px solid #EFF3F6",
              zIndex: 1001,
            }}
        >
          <MuiButton
              title={"Lưu"}
              type="submit"
              // loading={isSubmitting}
          />
          <MuiButton
              title={"Hủy"}
              color={"basic"}
              onClick={onClose}
          />
        </div>
      </form>
  );
};
export default EditHirePipeline;
