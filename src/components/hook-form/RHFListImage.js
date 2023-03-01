import { Stack, Box } from "@mui/material";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { React } from "react";
import { Controller, useFormContext, FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FileUpload from '../../sections/companyinfor/FileUpload'

const EmptyImage = ({ len }) => {
  const methods = useForm({
    resolver: zodResolver(),
  });
  const obj = [];
  let i = 0;
  while (i < 6 - len) {
    obj.push(
      <FormProvider {...methods}>
        <Box
          component="form"
          noValidate
          autoComplete="off"
          // onSubmit={methods.handleSubmit(onSubmitHandler)}
        >
          <FileUpload limit={1} multiple={false} name="image" />
        </Box>
      </FormProvider>
    );
    i++;
  }
  return <>{obj}</>;
};

const RHFListImage = ({ name }) => {
  const { control } = useFormContext();
  

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Stack>
          <ImageList
            sx={{
              maxWidth: "610px",
              width: "100%",
              overflow: "unset!important",
            }}
            cols={6}
            rowHeight={80}
          >
            {field?.value?.map((item) => (
              <ImageListItem
                {...field}
                key={item.id}
                sx={{
                  marginRight: "10px",
                }}
              >
                <img
                  src={item.img}
                  srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                  style={{ borderRadius: "4px" }}
                />
              </ImageListItem>
            ))}
            {field?.value?.length < 5 ? (
              <EmptyImage name={field.name} len={field?.value?.length} />
            ) : (
              ""
            )}
          </ImageList>
        </Stack>
      )}
    />
  );
};

export default RHFListImage;
