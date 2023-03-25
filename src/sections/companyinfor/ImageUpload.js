import ImageIcon from "../../assets/ImageIcon";
import { Box, CardActionArea, CardContent, Grid } from "@mui/material";
import React, { useState } from "react";
import { Controller, useFormContext } from "react-hook-form";

const ImageUploadCard = ({ name }) => {
  const { control } = useFormContext();

  const [mainState, setMainState] = useState("initial");
  const [, setImageUploaded] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const handleUploadClick = (event) => {
    // var file = event.target.files[0];
    const reader = new FileReader();
    // var url = reader.readAsDataURL(file);
    reader.onloadend = () => setSelectedFile([reader.result]);

    setMainState("uploaded");
    setSelectedFile(event.target.files[0]);
    setImageUploaded(1);
  };

  const renderInitialState = () => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <CardContent
            sx={{
              background: "#EFF3F6",
              borderRadius: "4px",
              "& .ImageUpload": {
                backgroundColor: "EFF3F6",
              },
            }}
          >
            <Grid container justify="center" alignItems="center">
              <input
                {...field}
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                onChange={handleUploadClick}
                style={{
                  display: "none",
                }}
              />
              <label htmlFor="contained-button-file">
                <ImageIcon />
              </label>
            </Grid>
          </CardContent>
        )}
      />
    );
  };

  const renderUploadedState = () => {
    return (
      <React.Fragment>
        <CardActionArea onClick={imageResetHandler}>
          <img
            width={80}
            height={80}
            // className={classes.media}
            src={selectedFile}
            style={{
              borderRadius: "4px",
            }}
          />
        </CardActionArea>
      </React.Fragment>
    );
  };

  const imageResetHandler = () => {
    setMainState("initial");
    setSelectedFile(null);
    setImageUploaded(0);
  };

  return (
    <Box
      sx={{
        cursor: "pointer",
        "& .MuiCardContent-root": {
          padding: "35% 24px",
          width: 80,
          height: 80,
        },
        "& .MuiCard-root": {
          borderRadius: " 4px!important",
        },
        "& .MuiGrid-root": {
          justifyContent: "center",
        },
        "& svg": {
          cursor: "pointer",
        },
      }}
    >
      {(mainState == "initial" && renderInitialState()) ||
        (mainState == "uploaded" && renderUploadedState())}
    </Box>
  );
};

export default ImageUploadCard;
