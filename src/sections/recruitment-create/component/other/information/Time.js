import DividerCard from "@/sections/recruitment-create/component/DividerCard";
import {Box} from "@mui/material";
import {LabelStyle} from "@/components/hook-form/style";
import DateFilter from "@/sections/dynamic-filter/DateFilter";
import {isEmpty} from "lodash";
import {BoxInnerStyle} from "@/sections/recruitment-create/style";
import {useFormContext, useWatch} from "react-hook-form";
import {useEffect} from "react";

const Time = ({ recruitment }) => {
    const { setValue } = useFormContext();
    const startDate = useWatch({name: 'startDate'});
    useEffect(() => {
        if (!isEmpty(recruitment)) {
            setValue('startDate', recruitment?.startDate);
            setValue('endDate', recruitment?.endDate);
        }
    }, [recruitment])

    return (
      <BoxInnerStyle>
        <DividerCard title="THỜI GIAN TUYỂN DỤNG"/>
        <Box sx={{px: 4, py: 3}}>
          {/* Đơn vị & Chức danh */}
          <Box sx={{mb: 2, display: 'flex', justifyContent: 'space-between'}}>
            <div style={{flex: 1, marginRight: 8}}>
              <LabelStyle required={true}>Ngày bắt đầu</LabelStyle>
              <DateFilter
                  name='startDate'
                  placeholder='Chọn ngày'
                  DatePickerProps={{
                    minDate: !isEmpty(recruitment) ? startDate : new Date()
                  }}
              />
            </div>
            <div style={{flex: 1, marginLeft: 8}}>
              <LabelStyle required={true}>Ngày kết thúc</LabelStyle>
              <DateFilter
                  name='endDate'
                  placeholder='Chọn ngày'
                  DatePickerProps={{
                    minDate: !isEmpty(recruitment) ? startDate : new Date()
                  }}
              />
            </div>
          </Box>
        </Box>
      </BoxInnerStyle>
  )
}

export default Time;