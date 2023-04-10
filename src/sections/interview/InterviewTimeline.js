import InterviewSchedule from "./InterviewSchedule";
import InterviewHeader from "./components/InterviewHeader";
import { View } from "@/components/FlexStyled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Content from '@/components/BaseComponents/Content'
import { FormCalendar } from "@/sections/interview/components/FormCalendar";

const defaultValues = {
  searchKey: "",
};
export const InterviewTimeline = () => {
  const router = useRouter();
  const { query } = router;
  const Schema = Yup.object().shape({
    search: Yup.string(),
  });
  const methods = useForm({
    mode: "onChange",
    defaultValues: useMemo(
      () =>
        query.searchKey
          ? { ...defaultValues, searchKey: query.searchKey }
          : { ...defaultValues },
      [query.searchKey]
    ),
    // defaultValues: {...defaultValues, searchKey: query.searchKey},
    resolver: yupResolver(Schema),
  });

  const { handleSubmit } = methods;
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);

  const onSubmitSearch = async (data) => {
    await router.push(
      {
        pathname: router.pathname,
        query: { ...query, searchKey: data.searchKey },
      },
      undefined,
      { shallow: true }
    );
  };
 
  return (
    <Content>
      <View>
        <InterviewHeader
          methods={methods}
          isOpen={isOpen}
          onOpenFilterForm={setIsOpen}
          setOpen={setOpen}
          onSubmit={onSubmitSearch}
          handleSubmit={handleSubmit}
        />
        {open && (
          <FormCalendar
            open={open}
            setOpen={setOpen}
          />
        )}
        <InterviewSchedule />
      </View>
    </Content>
  );
};
