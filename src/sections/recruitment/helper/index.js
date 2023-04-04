import moment from 'moment';
import {currencyFormat} from "@/utils/formatNumber";

export const renderSalary = (job, shortZero = false) => {
  let { salaryDisplayType, minSalary, maxSalary, currencyUnit } = job;
  let options = {};
  if (shortZero) {
    minSalary = minSalary / 1000000;
    maxSalary = maxSalary / 1000000;
    options = { unit: currencyUnit === 0 ? 'triệu' : 'milion' };
  }

  if (salaryDisplayType === 0) {
    return 'Không lương';
  }
  if (salaryDisplayType === 1) {
    return 'Thỏa thuận';
  }
  if (minSalary === null && maxSalary) {
    return currencyFormat(maxSalary, currencyUnit, true, options);
  }
  if (maxSalary === null && minSalary) {
    return currencyFormat(minSalary, currencyUnit, true, options);
  }
  if (minSalary === maxSalary) {
    return currencyFormat(minSalary, currencyUnit, true, options);
  }
  return currencyFormat(minSalary, currencyUnit, false)
      + ' - ' + currencyFormat(maxSalary, currencyUnit, true, options);
}

export const renderRemainDay = (endDate) => {
  if (!endDate) {
    return null;
  }
  let diffDay = moment(endDate).diff(moment(), 'days', true);
  diffDay = diffDay < 0 ? 0 : Math.ceil(diffDay);
  if (diffDay < 1) {
    return 'Đã hết hạn ứng tuyển';
  }

  return <>Còn <strong>{diffDay}</strong> ngày để ứng tuyển</>
}
export const getWorkingFormName = (workingForm) => {
  workingForm = parseInt(workingForm);
  if (workingForm === 0) {
    return 'Toàn thời gian';
  }
  if (workingForm === 1) {
    return 'Bán thời gian';
  }
  if (workingForm === 2) {
    return 'Làm việc từ xa';
  }
  if (workingForm === 3) {
    return 'Thời vụ';
  }
  if (workingForm === 4) {
    return 'Hybrid';
  }
  return 'Khác';
}

export const getWorkingFormNames = (aryWorkingForms = []) => {
  return aryWorkingForms.map(wf => getWorkingFormName(wf.workingForm)).join(', ');
}