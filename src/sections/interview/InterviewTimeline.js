import InterviewSchedule from "./InterviewSchedule";
import { View } from "@/components/FlexStyled";
import { useRouter } from "next/router";
import React, {useMemo, useState} from "react";
import Content from '@/components/BaseComponents/Content'
import { FormCalendar } from "@/sections/interview/components/FormCalendar";
import {useGetCalendarQuery} from "@/sections/interview/InterviewSlice";
import TableHeader from "@/components/BaseComponents/table/TableHeader";
import {isEmpty as _isEmpty} from "lodash";
import useRole from "@/hooks/useRole";
import {PERMISSIONS} from "@/config";

export const InterviewTimeline = () => {
  const { canAccess } = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  const router = useRouter();
  const { query, isReady } = router;
  const { data: Data } = useGetCalendarQuery(query, { skip: !isReady });

  const [open, setOpen] = useState(false);

  const onSubmitFilter = (values = {}, reset = false, timeout = 1) => {
    if (reset && _isEmpty(router.query)) {
      return;
    }
    setTimeout(() => {
      router.push({
        query: reset ? {} : { ...router.query, ...values, PageIndex: 1, PageSize: 9999 },
      }, undefined, { shallow: false });
    }, timeout);
  }
  return (
    <View>
      <TableHeader
          onSubmitFilter={onSubmitFilter}
          onClickCreate={() => setOpen(true)}
          createText={canEdit && 'Đặt lịch phỏng vấn'}
          isInside={false}
      />
      <Content>
        <View>
          {open && (
              <FormCalendar
                  open={open}
                  setOpen={setOpen}
              />
          )}
          <InterviewSchedule Data={Data} />
        </View>
      </Content>
    </View>
  );
};
