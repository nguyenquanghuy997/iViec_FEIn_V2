import moment from 'moment';
import { currencyFormat } from "@/utils/formatNumber";

export const renderSalary = (job, shortZero = false) => {
  let {salaryDisplayType, minSalary, maxSalary, currencyUnit} = job;
  let options = {};
  if (shortZero) {
    minSalary = minSalary / 1000000;
    maxSalary = maxSalary / 1000000;
    options = {unit: currencyUnit === 0 ? 'triệu' : 'milion'};
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

export const getYearOfExperience = (year) => {
  let value = undefined;
  switch (true) {
    case 0:
      value = 0;
      break;
    case year < 1:
      value = 1;
      break;
    case year >= 1 && year < 2:
      value = 2;
      break;
    case year >= 2 && year < 3:
      value = 3;
      break;
    case year >= 3 && year < 5:
      value = 4;
      break;
    case year >= 5 && year < 7:
      value = 5;
      break;
    case year >= 7 && year < 10:
      value = 6;
      break;
    case year >= 10:
      value = 7;
      break;
  }
  return value
}

export const getWorkingFormNames = (aryWorkingForms = []) => {
  return aryWorkingForms.map(wf => getWorkingFormName(wf.workingForm)).join(', ');
}


function base64ToBlob(base64String, contentType) {
    const byteCharacters = atob(base64String.split(',')[1]);
    const byteArrays = [];

    for (let offset = 0; offset < byteCharacters.length; offset += 1024) {
        const slice = byteCharacters.slice(offset, offset + 1024);

        const byteNumbers = new Array(slice.length);
        for (let i = 0; i < slice.length; i++) {
            byteNumbers[i] = slice.charCodeAt(i);
        }

        const byteArray = new Uint8Array(byteNumbers);
        byteArrays.push(byteArray);
    }

    return new Blob(byteArrays, {type: contentType});
}
export const setValueFieldScan = (setValue, objectScan) => {
  const blob = base64ToBlob("data:image/png;base64," +objectScan.portraitImage, 'image/png');

const imageUrl = URL.createObjectURL(blob);

console.log('imageUrl',imageUrl);
  setValue("fullName", undefined);
  setValue("email", undefined);
  setValue("phoneNumber", undefined);
  setValue("livingAddress.address", undefined);
  setValue("experience", undefined);
  setValue("education", undefined);
  setValue("weight", undefined);
  setValue("height", undefined);
  setValue("education", undefined);
  setValue("sex", undefined);
  setValue("identityNumber", undefined);
  setValue("yearOfExperience", undefined);
  setValue("rawApplicantSkills", undefined);

  if (objectScan) {
    setValue("fullName", objectScan.fullName);
    setValue("email", objectScan.email);
    setValue("phoneNumber", objectScan.phoneNumber);
    setValue("livingAddress.address", objectScan.homeTower);
    setValue("experience", objectScan.experience);
    setValue("education", objectScan.education);
    setValue("weight", objectScan.weight);
    setValue("height", objectScan.height);
    setValue("identityNumber", objectScan.identityNumber);
    setValue("rawApplicantSkills", objectScan.rawApplicantSkills);
    setValue("yearOfExperience", objectScan.yearOfExperience ? getYearOfExperience(objectScan.yearOfExperience) : "");
    setValue("sex", objectScan.sex && objectScan.sex === "Nữ" ? 1 : 0);
    setValue("portraitImage", "data:image/jpg;base64," + objectScan.portraitImage);
  }
};