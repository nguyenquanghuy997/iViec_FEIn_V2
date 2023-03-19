import InterviewSchedule from "./InterviewSchedule";
import CreateCalendar from "./components/CreateCalendar";
import InterviewHeader from "./components/InterviewHeader";
import { View } from "@/components/FlexStyled";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/router";
import React, { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import Content from '@/components/BaseComponents/Content'

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

  // filter modal
  const handleOpenFilterForm = () => {
    setIsOpen(true);
  };

  const handleCloseFilterForm = () => {
    setIsOpen(false);
  };

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
          onSubmit={onSubmitSearch}
          handleSubmit={handleSubmit}
          handleOpen={() => setOpen(true)}
          handleClose={() => setOpen(false)}
          onOpenFilterForm={handleOpenFilterForm}
          onCloseFilterForm={handleCloseFilterForm}
        />
        {open && (
          <CreateCalendar
            open={open}
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
          />
        )}
        <InterviewSchedule />
      </View>
    </Content>
  );
};
