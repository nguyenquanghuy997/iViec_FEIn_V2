import InForIcon from "../../assets/InforIcon";
import {FormProvider} from "@/components/hook-form";
import {ConnectCardStyle} from "@/sections/connect/style";
import {Box, Card, Divider, FormControlLabel, Grid, Switch, Tooltip, Typography} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {alpha, styled} from "@mui/material/styles";
import PropTypes from "prop-types";
import React, {useState} from "react";
import {Controller, useForm, useFormContext} from "react-hook-form";

const GreenSwitch = styled(Switch)(({theme}) => ({
    "& .MuiSwitch-switchBase.Mui-checked": {
        color: "#388E3C", "&:hover": {
            backgroundColor: alpha("#A5D6A7", theme.palette.action.hoverOpacity),
        },
    }, "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
        backgroundColor: "#388E3C",
    },
}));

const SwitchForm = ({name, handleChange, style, ...other}) => {
    const {control} = useFormContext();

    return (<FormControlLabel
        sx={{...style}}
        control={<Controller
            name={name}
            control={control}
            render={({field}) => {
                return (<GreenSwitch
                    {...field}
                    checked={field.value}
                    onChange={handleChange || field.onChange}
                    inputProps={{"aria-label": "controlled"}}
                />);
            }}
        />}
        {...other}
    />);
};
const ApproveProcessCardItem = ({approveProcess, color}) => {
    const [checked, setChecked] = useState(false);
    const methods = useForm({
        defaultValues: {isChecked: true},
    });

    return (<FormProvider methods={methods}>
        <Card
            sx={{
                mb: 2, borderRadius: "6px", borderLeft: `3px solid ${color}`, px: 3, width: "100%",
            }}
        >
            <Box
                sx={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                }}
            >
                <Box sx={{
                    display: "flex",
                    width: "100%",
                    alignItems: "center",
                    marginY: "16px",
                    padding: "16px",
                    borderRadius: "6px",
                    backgroundColor: "#F2F4F5"
                }} x>
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
                                    name={"hhel"}
                                    handleChange={() => setChecked(!checked)}
                                />
                            </Grid>
                        </Grid>
                        <Grid item>
                            {checked ? (<Typography variant="caption" color="#388E3C" fontWeight={500}>
                                Đang sử dụng
                            </Typography>) : ("")}
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Card>
    </FormProvider>);
};

const ApproveProcessCard = ({approveProcesses, color, title}) => {
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
            {approveProcesses?.map((approveProcess, id) => (<ApproveProcessCardItem
                approveProcess={approveProcess}
                color={color}
                key={id}
            />))}
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
