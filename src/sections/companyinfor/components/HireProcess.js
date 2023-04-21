import HeaderCard from "../HeaderCard";
import {useUpdateCompanyEndingMutation} from "../companyInforSlice";
import EditHirePipeline from "../edit/EditHirePipeline";
import {PipelineStateType} from "@/utils/enum";
import {Box, Divider, Drawer, Typography, useTheme} from "@mui/material";
import {useState, Fragment} from "react";
import EmptyValue from "@/sections/companyinfor/components/EmptyValue";
import LoadingScreen from "@/components/LoadingScreen";
import {useSnackbar} from "notistack";
import {ApplyIcon, ExmainationIcon, InterviewIcon, OfferIcon, ResultIcon} from "@/sections/companyinfor/icon";
import {drawerPaperStyle} from "@/components/drawer-edit-form/styles";

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
  const theme = useTheme();
  const [open, setOpen] = useState(false);
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
          {data?.organizationProfilePipelines.length > 0 ? (
              <Box
                  sx={{
                    background: "#FDFDFD",
                    py: 2,
                    display: "flex",
                    px: 5,
                    justifyContent: 'space-between',
                    "& .pipeline-box:first-of-type": {
                      pl: 0
                    },
                    "& .pipeline-divider:last-of-type": {
                      display: 'none'
                    }
                  }}>
                {data?.organizationProfilePipelines.map((item, index) => (
                    <Fragment key={index}>
                      <Box className={"pipeline-box"} sx={{minWidth: "200px", px: 1}}>
                        <Box sx={{
                          minHeight: '112px',
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          justifyContent: 'flex-start'
                        }}>
                          {renderIconByPipelineType(item?.type)}
                        </Box>
                        <Typography sx={{fontSize: 28, color: "#F77A0C", display: "flex", justifyContent: "center"}} color="text.secondary" gutterBottom>
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
                      <Divider className={"pipeline-divider"} orientation="vertical" variant="end" flexItem sx={{height: '96px', mt: 10}}/>
                    </Fragment>
                ))}
              </Box>
          ) : <EmptyValue text={"Hiện chưa có nội dung Quy trình tuyển dụng"}/>}
        </Box>
        {open && (
            <Drawer
                anchor="right"
                open={open}
                onClose={handleClose}
                PaperProps={{
                  sx: drawerPaperStyle({...theme, width: 800}),
                }}
                componentsProps={{
                  backdrop: {
                    sx: {background: 'rgba(9, 30, 66, 0.25) !important', boxShadow: 'none !important'}
                  }
                }}
            >
              <EditHirePipeline data={data} onClose={handleClose}/>
            </Drawer>
        )}
      </>
  );
};
export default HireProcess;
