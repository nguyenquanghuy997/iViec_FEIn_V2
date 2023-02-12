import HeadingBar from "../../components/heading-bar/HeadingBar";
import ApplicantFilterModal from "./modals/ApplicantFilterModal";
import Iconify from "@/components/Iconify";
import { FormProvider, RHFSearchTextField } from "@/components/hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, IconButton, Stack } from "@mui/material";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  search: "",
};

const ApplicantHeader = ({
  columns,
  isOpen,
  onOpenFilterForm,
  onCloseFilterForm,
}) => {
  // form
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });

  return (
    <HeadingBar>
      <Stack flexDirection="row">
        <FormProvider methods={methods}>
          <RHFSearchTextField
            hasLabel={false}
            name="search"
            placeholder="Tìm kiếm..."
          />
        </FormProvider>
        <Button
          onClick={onOpenFilterForm}
          sx={{
            backgroundColor: "#F3F4F6",
            padding: "12px 16px",
            height: "44px",
            borderRadius: "6px",
          }}
        >
          <IconButton>
            <Iconify icon="material-symbols:filter-alt-outline" />
          </IconButton>
          Bộ lọc
        </Button>
      </Stack>
      <ApplicantFilterModal
        columns={columns}
        isOpen={isOpen}
        onClose={onCloseFilterForm}
      />
    </HeadingBar>
  );
};

export default ApplicantHeader;
