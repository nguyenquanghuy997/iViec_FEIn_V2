import HeaderCard from "../HeaderCard";
import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import EditHirePipeline from "./EditHirePipeline";
import CloseIcon from "@/assets/CloseIcon";
import {PipelineStateType} from "@/utils/enum";
import {Box, Button, Divider, Drawer, List, Typography} from "@mui/material";
import {useState} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import LoadingScreen from "@/components/LoadingScreen";
import {useSnackbar} from "notistack";
import {isEmpty} from "lodash";
import {ApplyIcon, ExmainationIcon, InterviewIcon, OfferIcon, ResultIcon} from "@/sections/companyinfor/icon";

export const renderIconByPipelineType = (type) => {
  switch (type) {
    case 0:
      return <ApplyIcon/>
    case 1:
      return <ExmainationIcon/>
    case 2:
      return <InterviewIcon/>
    case 3:
      return <ResultIcon/>
    case 4:
      return <OfferIcon/>
    default:
      return <ApplyIcon/>
  }
}

const HireProcess = ({data}) => {
  const {enqueueSnackbar} = useSnackbar();
  const [open, setOpen] = useState();
  const [checked, setChecked] = useState(data?.isProfilePipelineVisible);
  const [loading, setLoading] = useState(false);

  const [updateVisibleHuman] = useUpdateCompanyEndingMutation();

  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleChangeChecked = async () => {
    setLoading(true);
    try {
      await updateVisibleHuman({
        organizationId: data?.id,
        isProfilePipelineVisible: !checked
      }).unwrap();
      enqueueSnackbar("Chỉnh sửa hiển thị thành công!", {
        autoHideDuration: 1000
      });
      setChecked(!checked);
      setLoading(false);
    } catch (e) {
      enqueueSnackbar("Chỉnh sửa hiển thị không thành công, vui lòng thử lại!", {
        autoHideDuration: 1000,
        variant: 'error',
      });
      setLoading(false);
      return e;
    }
  }

  if (loading) {
    return (
        <LoadingScreen/>
    )
  }

  return (
      <>
        <Box sx={{minHeight: '296px'}}>
          <HeaderCard
              text="Quy trình tuyển dụng"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              handleChange={handleChangeChecked}
              checked={checked}
          />
          {!isEmpty(data) ? (
              <Box
                  sx={{
                    background: "#FDFDFD",
                    py: 2,
                    display: "flex",
                    px: 5,
                    "& .pipeline-box:first-child": {
                      pl: 0
                    },
                    "& .pipeline-divider:last-child": {
                      display: 'none'
                    }
                  }}>
                {data?.organizationProfilePipelines.map((item, index) => (
                    <>
                      <Box className={"pipeline-box"} sx={{minWidth: "200px", px: 1}} key={index}>
                        <Box sx={{
                          minHeight: '112px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}>
                          {renderIconByPipelineType(item?.type)}
                        </Box>
                        <Typography sx={{fontSize: 28, color: "#F77A0C", display: "flex", justifyContent: "center"}}
                                    color="text.secondary" gutterBottom>
                          {index + 1}
                        </Typography>
                        <Typography
                            sx={{mb: 1.5, fontSize: 16, fontWeight: 600, display: "flex", justifyContent: "center"}}
                            color="#172B4D">
                          {PipelineStateType(item?.type)}
                        </Typography>
                        <Typography variant="body2" sx={{
                          fontSize: 12,
                          fontWeight: 400,
                          display: "flex",
                          justifyContent: "center",
                          textAlign: "center"
                        }}>
                          {item?.description}
                        </Typography>
                      </Box>
                      <Divider className={"pipeline-divider"} orientation="vertical" variant="end" flexItem
                               sx={{height: '96px', mt: 10}}/>
                    </>
                ))}
              </Box>
          ) : <EmptyValue text={"Hiện chưa có nội dung Con người công ty"}/>}
        </Box>
        {open && (
            <Drawer anchor="right" open={open} onClose={handleClose} onOpen={handleOpen}>
              <Box sx={{width: 700}}>
                <List sx={{display: "flex", justifyContent: "space-between", p: 0}}>
                  <Typography sx={{p: "22px 24px", fontSize: 16, fontWeight: 600}}>
                    Chỉnh sửa Quy trình tuyển dụng
                  </Typography>
                  <Button onClick={handleClose} sx={{"&:hover": {background: "#FDFDFD"}}}>
                    <CloseIcon/>
                  </Button>
                </List>
                <Divider/>
                <EditHirePipeline data={data} onClose={handleClose}/>
              </Box>
            </Drawer>
        )}
      </>
  );
};
export default HireProcess;
