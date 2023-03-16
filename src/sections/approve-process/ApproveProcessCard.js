import InForIcon from "../../assets/InforIcon";
import {FormProvider} from "@/components/hook-form";
import {ConnectCardStyle} from "@/sections/connect/style";
import {Box, Card, Divider, FormControlLabel, Grid, Switch, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {alpha, styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import React, {useEffect, useState} from "react";
import {Controller, useForm, useFormContext} from "react-hook-form";
import {DeleteIconGrey, EditIcon, PreviewIcon} from "@/assets/ActionIcon";
import Iconify from "@/components/Iconify";
import {ButtonDS} from "@/components/DesignSystem";
import ApproveProcessDialog from "@/sections/approve-process/ApproveProcessDialog";
import IconEmpty from "../../../public/assets/icons/approveProcess/ic-empty";
import {ApproveProcessFormModal} from "@/sections/approve-process/modals";

const GreenSwitch = styled(Switch)(({theme}) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#388E3C", "&:hover": {
            backgroundColor: alpha("#A5D6A7", theme.palette.action.hoverOpacity),
        },
    }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#388E3C",
    },
}));

const SwitchForm = ({name, handleChange, style, value, ...other}) => {
    const {control} = useFormContext();

    return (<FormControlLabel
        sx={{...style}}
        control={<Controller
            name={name}
            control={control}
            render={({field}) => {
                return (<GreenSwitch
                    {...field}
                    checked={value}
                    onChange={handleChange || field.onChange}
                    inputProps={{"aria-label": "controlled"}}
                />);
            }}
        />}
        {...other}
    />);
};
const ApproveProcessCardItem = ({approveProcess}) => {
    const [checked, setChecked] = useState(false);
    const [hovered, setHovered] = useState(false);
    const [open, setOpen] = useState(false);
    const handleMouseOver = () => {
        setHovered(true);
    };
    const handleMouseOut = () => {
        setHovered(false);
    };
    const handleClose = () => {
        setOpen(!open);
    }


    useEffect(() => {
        setChecked(approveProcess.isActive);
    }, []);

    return (

        <Box sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            marginBottom: "16px",
            padding: "16px",
            borderRadius: "6px",
            backgroundColor: "#F2F4F5"
        }}
             onMouseOver={handleMouseOver}
             onMouseLeave={handleMouseOut}
        >
            <Grid container direction="row" justifyContent="space-between">
                <Grid item>
                    <Typography>
                        {approveProcess?.title}
                    </Typography>
                    <Grid container>
                        <Typography variant="textSize13" color="#5C6A82" mr={1}>
                            Ngày tạo:
                        </Typography>
                        <Typography variant="textSize13500" color="#455570">
                            {approveProcess?.createdTime}
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem
                                 sx={{margin: "4px 8px 5px 8px", borderColor: "#A2AAB7"}}/>
                        <Typography variant="textSize13" color="#5C6A82" mr={1}>
                            Người tạo:
                        </Typography>
                        <Typography variant="textSize13500" color="#455570">
                            {approveProcess?.creator}
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem
                                 sx={{margin: "4px 8px 5px 8px", borderColor: "#A2AAB7"}}/>
                        <Typography variant="textSize13" color="#5C6A82" mr={1}>
                            Đang áp dụng:
                        </Typography>
                        <Typography variant="textSize13500" color="#455570">
                            {approveProcess?.countApply}
                        </Typography>
                        <Divider orientation="vertical" variant="middle" flexItem
                                 sx={{margin: "4px 8px 5px 8px", borderColor: "#A2AAB7"}}/>
                        <Typography variant="textSize13" color="#5C6A82" mr={1}>
                            Cấp phê duyệt:
                        </Typography>
                        <Typography variant="textSize13500" color="#455570">
                            {approveProcess?.approveLevel}
                        </Typography>
                    </Grid>
                    <Grid mt={2}>
                        <SwitchForm
                            name={approveProcess.title}
                            handleChange={() => setChecked(!checked)}
                            value={checked}
                        />
                        {hovered && <>
                            <Tooltip title="Xem">
                                <IconButton>
                                    <PreviewIcon width={16} height={16}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Chỉnh sửa">
                                <IconButton>
                                    <EditIcon width={16} height={16}/>
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Xóa" onClick={() => setOpen(!open)}>
                                <IconButton>
                                    <DeleteIconGrey width={16} height={16}/>
                                </IconButton>
                            </Tooltip>
                            <ApproveProcessDialog open={open} onClose={handleClose} content={approveProcess.title}
                                                  type='approveProcess'/>
                        </>}
                    </Grid>
                </Grid>
                <Grid item>
                    {checked && (<Typography variant="caption" color="#388E3C" fontWeight={500}>
                        Đang sử dụng
                    </Typography>)}
                </Grid>
            </Grid>
        </Box>)
        ;
};

const ApproveProcessCard = ({type, approveProcesses, color, title}) => {
    const methods = useForm({
        defaultValues: {isChecked: true},
    });

    const [showForm, setShowForm] = useState(false);

    return (<Box>
        <Grid container
              direction="row"
              justifyContent="flex-start"
              alignItems="center">
            <Typography
                sx={{
                    display: "inline",
                    fontWeight: 600
                }}
            >
                {title}
            </Typography>
            <Tooltip title="Delete">
                <IconButton>
                    <InForIcon/>
                </IconButton>
            </Tooltip>
        </Grid>
        <ConnectCardStyle>
            <FormProvider methods={methods}>
                <Card
                    sx={{
                        mb: 2, borderRadius: "6px", borderLeft: `3px solid ${color}`, px: 3, py: 2,
                    }}
                >
                    {approveProcesses ?
                        (
                            approveProcesses.map((approveProcess, id) => (<ApproveProcessCardItem
                                approveProcess={approveProcess}
                                key={id}
                            />))
                        ) : <>
                            <Grid container direction="column" alignItems="center" justifyContent="center"
                                  sx={{marginY: "40px",}}>
                                <Grid sx={{mb: "12px"}}>
                                    <IconEmpty/>
                                </Grid>
                                <Grid>
                                    <Typography variant="textSize14500" color="#A2AAB7">
                                        Hiện chưa có {title.toLowerCase()} nào.
                                    </Typography>
                                </Grid>
                            </Grid>
                        </>
                    }
                    <Grid container>
                        <Grid item>
                            <ButtonDS
                                tittle={"Thêm quy trình"}
                                onClick={() => setShowForm(true)}
                                size="large"
                                sx={{
                                    fontSize: "14px"
                                }}
                                icon={
                                    <Iconify
                                        icon={"material-symbols:add"}
                                        width={20}
                                        height={20}
                                        color="#fff"
                                        mr={1}
                                    />
                                }
                            />
                            <ApproveProcessFormModal type={type} title={title} show={showForm} setShow={setShowForm}/>
                        </Grid>
                    </Grid>
                </Card>
            </FormProvider>
        </ConnectCardStyle>
    </Box>);
};

ApproveProcessCard.propTypes = {
    accounts: PropTypes.array,
};

ApproveProcessCard.defaultProps = {
    accounts: [],
};

export default ApproveProcessCard;
