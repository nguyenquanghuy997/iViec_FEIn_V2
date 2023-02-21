import Stack from "@mui/material/Stack";
import Step from "@mui/material/Step";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import * as React from "react";

const ColorlibConnector = styled(StepConnector)(({}) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
    left: "calc(-50% + 25px)",
    right: "calc(50% + 25px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      backgroundColor: "#43A047",
      border: "1px solid #43A047",
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      border: "1px solid #43A047",
      backgroundColor: "#43A047",
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    border: "1px dashed #8A94A5",
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
  const {steps} = props;
const activeStep = steps.findIndex((i) => i.isActive);

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
            marginTop: "6px",
          },
          ".MuiSvgIcon-root:not(.Mui-completed)": {
            color: "#F3F4F6",
          },
          ".MuiStepIcon-text": {
            fill: "#8A94A5",
            fontWeight: 600,
            fontSize: "12px",
          },
          ".MuiStepIcon-text": {
            fill: "#8A94A5",
            fontWeight: 600,
          },
          ".Mui-active .MuiStepIcon-text": {
            fill: "white",
            fontSize: "11px",
          },
        }}
      >
        {steps.map((label, index) => {
          if (activeStep > index) {
            return (
              <Step key={index}>
                <StepLabel StepIconComponent={ColorlibStepIcon}>
                  {label.name}
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
                      label.type === 1
                        ? "#388E3C !important"
                        : label.type === 2
                        ? "#FF9800 !important"
                        : label.type === 3
                        ? "#D32F2F !important"
                        : "#1976D2 !important",
                    borderRadius: "50%",
                    width: 32,
                    height: 32,
                    marginTop: "6px",
                  },
                }}
              >
                <StepLabel>{label.name}</StepLabel>
              </Step>
            );
          }
        })}
      </Stepper>
    </Stack>
  );
};
PipelineApplicant.prototype = {
  steps: PropTypes.object,
};