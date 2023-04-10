import { errorMessages } from "./errorMessages";
import moment from 'moment';
import {DOMAIN_SERVER_API} from "@/config";

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