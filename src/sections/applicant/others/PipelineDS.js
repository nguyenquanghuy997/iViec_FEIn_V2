import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import {styled, useTheme} from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";



const ColorlibConnector = styled(StepConnector)(({theme}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 30px)",
    right: "calc(50% + 30px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: theme.palette.common.green600,
      border: "1px solid " + theme.palette.common.green600,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: "1px solid " + theme.palette.common.green600,
      backgroundColor: theme.palette.common.green600,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    border: "1px dashed " + theme.palette.common.neutral500,
  },
}));

const ColorlibStepIconRoot = styled("div")(({ ownerState }) => ({
  width: 32,
  height: 32,
  ...(ownerState.completed && {
    backgroundImage: "url('../assets/icons/icon_pipeline_check.svg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    marginTop: "6px",
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, className } = props;

  return (
    <ColorlibStepIconRoot
      ownerState={{ completed, active }}
      className={className}
    >
      {completed}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
  index: PropTypes.any,
};

export const PipelineApplicant = (props) => {
  const { steps } = props;
  const theme = useTheme();
  const activeStep = steps?.recruitmentPipelineStates.findIndex(
    (i) => i.id === steps.currentApplicantPipelineState
  );
  const renderName = (item) => {
    switch (item) {
      case 0:
        return "Ứng tuyển";
      case 1:
        return "Thi tuyển";
      case 2:
        return "Phỏng Vấn";
      case 3:
        switch (steps.pipelineStateResultType) {
          case 0:
            return "Kết quả - Đạt";
          case 1:
            return "Kết quả - Cân nhắc";
          case 2:
            return "Kết quả - Loại";
          default:
            return "Kết quả";
        }
      case 4:
        return "Mời nhận việc";
    }
  };

  return (
    <Stack sx={{ width: "100%" }}>
      <Stepper
        alternativeLabel
        activeStep={activeStep}
        connector={<ColorlibConnector />}
        sx={{
          ".MuiSvgIcon-root:not(.Mui-active)": {
            borderRadius: "50%",
            border: "1.5px solid #8A94A5",
            width: 31,
            height: 31,
            marginTop: "7px",
          },
          ".MuiSvgIcon-root:not(.Mui-completed)": {
            color: theme.palette.common.neutral50 ,
          },
          ".MuiStepIcon-text": {
            fill: theme.palette.common.neutral500,
            fontWeight: 600,
            fontSize: "12px",
          },
          ".MuiStepLabel-label": {
            color: theme.palette.common.neutral500,
          },
          ".MuiStepLabel-label.Mui-completed": {
            color: theme.palette.common.neutral700,
          },
          ".Mui-active .MuiStepIcon-text": {
            fill: "white",
            fontSize: "11px",
          },
        }}
      >
        {steps?.recruitmentPipelineStates.map((label, index) => {
          if (activeStep > index) {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {renderName(label?.pipelineStateType)}
                </StepLabel>
              </Step>
            );
          } else {
            return (
              <Step
                key={index}
                sx={{
                  "& .MuiSvgIcon-root.Mui-active": {
                    color:
                      steps.pipelineStateResultType === 0
                        ? "#388E3C !important"
                        : steps.pipelineStateResultType === 1
                        ? theme.palette.common.orange500 +  " !important"
                        : steps.pipelineStateResultType === 2
                        ? "#D32F2F !important"
                        : theme.palette.common.blue700 +  "!important",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    marginTop: "6px",
                  },
                  ".MuiStepLabel-label.Mui-active": {
                    color:
                      steps.pipelineStateResultType === 0
                        ? "#2E7D32"
                        : steps.pipelineStateResultType === 1
                        ? theme.palette.common.orange500
                        : steps.pipelineStateResultType === 2
                        ? "#D32F2F"
                        : theme.palette.common.blue700 ,
                  },
                }}
              >
                <StepLabel>{renderName(label?.pipelineStateType)}</StepLabel>
              </Step>
            );
          }
        })}
      </Stepper>
    </Stack>
  );
};
