import {Controller, useFormContext} from "react-hook-form";
import UploadImage from "@/assets/UploadImage";
import MuiButton from "@/components/BaseComponents/MuiButton";

function RHFUploadImage({name, title = 'Tải lên ảnh', ...other}) {
  const {control} = useFormContext();

  return (
      <Controller
          name={name}
          control={control}
          render={({field}) => {
            return (
                <>
                  <MuiButton
                      title={<>
                        {title}
                        <input
                            hidden
                            accept="image/*"
                            type="file"
                            onChange={(e) => {
                              field.onChange(e.target.files);
                            }}
                        />
                      </>
                      }
                      onChange={(e) => {
                        field.onChange(e.target.files);
                      }}
                      variant={"outlined"}
                      startIcon={<UploadImage/>}
                      sx={{border: "1px dashed #1976D2", height: 36}}
                      component="label"
                      {...other}
                  />
                </>
            );
          }}
      />
  );
}

export default RHFUploadImage;