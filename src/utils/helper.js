import { errorMessages } from "./errorMessages";

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