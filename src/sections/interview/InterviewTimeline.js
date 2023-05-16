import InterviewSchedule from "./InterviewSchedule";
import {View} from "@/components/FlexStyled";
import {useRouter} from "next/router";
import React, {useMemo, useState} from "react";
import Content from '@/components/BaseComponents/Content'
import {FormCalendar} from "@/sections/interview/components/FormCalendar";
import {useGetCalendarQuery} from "@/sections/interview/InterviewSlice";
import TableHeader from "@/components/BaseComponents/table/TableHeader";
import {isEmpty as _isEmpty} from "lodash";
import useRole from "@/hooks/useRole";
import {PERMISSIONS, TBL_FILTER_TYPE} from "@/config";
import {Box} from "@mui/material";
import FormHeader from "@/sections/emailform/component/FormHeader";
import {API_GET_ORGANIZATION_USERS, API_GET_ORGANIZATION_WITH_CHILD} from "@/routes/api";
import {LIST_STATUS} from "@/utils/formatString";


const columns = [
  {
    dataIndex: "organizationName",
    title: "Đơn vị",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "organizationIds",
      placeholder: "Chọn 1 hoặc nhiều đơn vị",
      remoteUrl: API_GET_ORGANIZATION_WITH_CHILD,
      showAvatar: true
    },
  },
  {
    dataIndex: "creatorName",
    title: "Người tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "creatorIds",
      placeholder: "Chọn 1 hoặc nhiều người",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    }
  },
  {
    dataIndex: "ownerName",
    title: "Cán bộ tuyển dụng",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "organizationIds",
      placeholder: "Chọn 1 hoặc nhiều cán bộ",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    }
  },
  {
    dataIndex: "councilName",
    title: "Hội đồng phỏng vấn",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "councilIds",
      placeholder: "Chọn 1 hoặc nhiều người",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    }
  },
  {
    dataIndex: "creatorName",
    title: "Tin tuyển dụng",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT_CHECKBOX,
      name: "recruitmentIds",
      placeholder: "Chọn 1 hoặc nhiều tin tuyển dụng",
      remoteUrl: API_GET_ORGANIZATION_USERS,
      showAvatar: true
    }
  },
  {
    dataIndex: "createdTime",
    title: "Ngày tạo",
    colFilters: {
      type: TBL_FILTER_TYPE.RANGE_DATE,
      name: ['interviewFrom', 'interviewTo'],
      placeholder: 'Chọn ngày',
    },
  },
  {
    dataIndex: "isActive",
    title: "Trạng thái",
    colFilters: {
      type: TBL_FILTER_TYPE.SELECT,
      name: 'isActive',
      placeholder: 'Tất cả',
      options: LIST_STATUS.map(item => ({value: item.value, label: item.name}),)
    }
  }
]

export const InterviewTimeline = () => {
  const {canAccess} = useRole();
  const canEdit = useMemo(() => canAccess(PERMISSIONS.CRUD_INTV_SCHE), []);
  const router = useRouter();
  const {query, isReady} = router;
  const {data: Data} = useGetCalendarQuery(query, {skip: !isReady});
  const [open, setOpen] = useState(false);

  const onSubmitFilter = (values = {}, reset = false, timeout = 1) => {
    if (reset && _isEmpty(router.query)) {
      return;
    }
    setTimeout(() => {
      router.push({
        query: reset ? {} : {...router.query, ...values, PageIndex: 1, PageSize: 9999},
      }, undefined, {shallow: false});
    }, timeout);
  }
  return (
    <View>
      <FormHeader
        showButton={false}
      />
      <Box sx={{mb: 2}}>
        <TableHeader
          columns={columns}
          onSubmitFilter={onSubmitFilter}
          onClickCreate={() => setOpen(true)}
          createText={canEdit && 'Đặt lịch phỏng vấn'}
          isInside={false}
        />
      </Box>

      <Content>
        <View>
          {open && (
            <FormCalendar
              open={open}
              setOpen={setOpen}
            />
          )}
          <InterviewSchedule Data={Data}/>
        </View>
      </Content>
    </View>
  );
};
