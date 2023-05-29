import UploadImage from "@/assets/UploadImage";
import MuiButton from "@/components/BaseComponents/MuiButton";
import { Controller, useFormContext } from "react-hook-form";

function RHFUploadImage({
  name,
  title = "Tải lên ảnh",
  key = "imagePreview",
  ...other
}) {
  const { control, setValue } = useFormContext();

  function readFileAsync(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        resolve({
          url: reader.result,
          type: "image",
        });
      };
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  const handleChange = async (e) => {
    const files = e.target.files;
    if (files) {
      setValue(
        `${name.substring(0, name.lastIndexOf("."))}.${key}`,
        await readFileAsync(files[0])
      );
    }
  };

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <>
            <MuiButton
              title={
                <>
                  {title}
                  <input
                    hidden
                    accept="image/*"
                    type="file"
                    onChange={(e) => {
                      field.onChange(e.target.files);
                      handleChange(e);
                    }}
                  />
                </>
              }
              onChange={(e) => {
                field.onChange(e.target.files);
                handleChange(e);
              }}
              variant={"outlined"}
              startIcon={<UploadImage />}
              sx={{ border: "1px dashed #1976D2", height: 36, fontWeight: 600 }}
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
