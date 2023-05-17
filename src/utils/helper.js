import { errorMessages } from "./errorMessages";
import moment from 'moment';
import {DOMAIN_SERVER_API} from "@/config";
import { getWorkingFormName } from "@/sections/recruitment/helper";

export function alphabetPosition(index) {
  return String.fromCharCode(index + "A".charCodeAt(0));
}
export const convertArrayToObject = (array, key) => {
  const initialValue = {};
  return array.reduce((obj, item) => {
    return {
      ...obj,
      [item[key]]: item,
    };
  }, initialValue);
}

export const getFileUrl = (url) => {
  if (!url || url.includes('https://') || url.includes('http://')) {
    return url;
  }
  return DOMAIN_SERVER_API + '/File/GetFile?filePath=' + encodeURIComponent(url);
}

export const getErrorMessage = (error, defaultMess = null) => {
  if (!error) {
    return defaultMess || 'Có lỗi xảy ra!';
  }
  if (typeof error === 'string') {
    return error;
  }

  if (error.response) {
    error = error.response.data || {};
  }

  const { messages = [], code } = error;
  if (code && errorMessages[code]) {
    return errorMessages[code];
  }

  if (typeof messages === 'string') {
    return messages;
  }

  let output = [];
  messages.map(mess => {
    if (mess) {
      output.push(mess);
      output.push('<br />');
    }
  });
  if (output.length < 1) {
    return defaultMess || 'Có lỗi xảy ra!';
  }
  return output.slice(0, output.length - 1);
}

export const isNumeric = (num) => {
  if (typeof num === 'number') {
    return num - num === 0;
  }
  if (typeof num === 'string' && num.trim() !== '') {
    return Number.isFinite ? Number.isFinite(+num) : isFinite(+num);
  }
  return false;
}

export const toRequestFilterData = (data = {}, removeEmpty = true) => {
  let reqData = {};
  for (let f in data) {
    let val = data[f];

    if (isNumeric(data[f])) {
      val = parseInt(data[f]);
    }

    if (Array.isArray(val)) {
      let newVal = [];
      val.map((itemVal, idx) => {
        if (isNumeric(itemVal)) {
          itemVal = parseInt(itemVal);
        }
        newVal[idx] = itemVal;
      });
      val = newVal;
    }

    if (val instanceof moment) {
      val = val.toISOString();
    }

    if (removeEmpty && (typeof val === 'undefined' || val === '')) {
      continue;
    }

    reqData[f] = val;
  }
  return reqData;
}


export const getRecruitmentFormsNames = (aryWorkingForms = []) => {
  return aryWorkingForms
  .map((wf) => getWorkingFormName(wf))
  .join(", ");
};

export const findIndex = (needle, haystack) => {
  let results = [];
  let idx = haystack.indexOf(needle);
  while (idx !== -1) {
    results.push(idx);
    idx = haystack.indexOf(needle, idx + 1);
  }
  return results;
}

export const replaceValueOffer = (data, objectReplace) => {
  data = data.replace('<span class="tag">T&ecirc;n ứng vi&ecirc;n</span>', '<b>' + (objectReplace.applicantName ?? "") + '</b>');
  data = data.replace('<span class="tag">Vị tr&iacute; c&ocirc;ng việc</span>', '<b>' + (objectReplace.jobPositionName ?? "") + '</b>');
  data = data.replace('<span class="tag">H&igrave;nh thức l&agrave;m việc</span>', '<b>' + (getRecruitmentFormsNames(objectReplace.recruitmentForms) ?? "") + '</b>');
  data = data.replace('<span class="tag">Quyền lợi</span>', '<b>' + (objectReplace.benefit ?? "") + '</b>');
  data = data.replace('<span class="tag">T&ecirc;n c&ocirc;ng ty</span>', '<b>' + (objectReplace.organizationName ?? "") + '</b>');
  data = data.replace('<span class="tag">Địa chỉ c&ocirc;ng ty</span>', '<b>' + (objectReplace.organizationAddress.address ?? "") + '</b>');
  data = data.replace('<span class="tag">Email c&ocirc;ng ty</span>', '<b>' + (objectReplace.organizationEmail ?? "") + '</b>');
  data = data.replace('<span class="tag">Số điện thoại c&ocirc;ng ty</span>', '<b>' + (objectReplace.organizationPhoneNumber ?? "") + '</b>');
  data = data.replace('<span class="tag">Website tuyển dụng c&ocirc;ng ty</span>', '');
  data = data.replace('<span class="tag">T&ecirc;n đơn vị</span>', '<b>' + (objectReplace.rootOrganizationName ?? "") + '</b>');
  data = data.replace('<span class="tag">Địa chỉ đơn vị</span>', '<b>' + (objectReplace.rootOrganizationAddress.address ?? "") + '</b>');
  data = data.replace('<span class="tag">Email đơn vị</span>', '<b>' + (objectReplace.rootOrganizationEmail ?? "") + '</b>');
  data = data.replace('<span class="tag">Số điện thoại đơn vị</span>', '<b>' + (objectReplace.rootOrganizationPhoneNumber ?? "") + '</b>');
  data = data.replace('<span class="tag">Họ v&agrave; t&ecirc;n c&aacute;n bộ tuyển dụng</span>', '<b>' + (objectReplace.recruitmentOwnerName ?? "") + '</b>');
  data = data.replace('<span class="tag">Email c&aacute;n bộ tuyển dụng</span>', '<b>' + (objectReplace.recruitmentOwnerEmail ?? "") + '</b>');
  data = data.replace('<span class="tag">Số điện thoại c&aacute;n bộ tuyển dụng</span>', '<b>' + (objectReplace.recruitmentOwnerPhoneNumber ?? "") + '</b>');
  return data;
}

