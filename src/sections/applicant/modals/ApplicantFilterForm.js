import { FormProvider } from "@/components/hook-form";
import InputFilter from "@/sections/dynamic-filter/InputFilter";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as Yup from "yup";

const defaultValues = {
  search: "",
};

const ApplicantFilterForm = ({ columns = [] }) => {
  // form
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    defaultValues,
    resolver: yupResolver(Schema),
  });

  return (
    <FormProvider  methods={methods}>
      {columns.map((column) => {
        return (
          <InputFilter
            name={column.name}
            placeholder={column.placeholder}
            type={column.type}
            label={column.label}
          />
        );
      })}
    </FormProvider>
  );
};

export default ApplicantFilterForm;
