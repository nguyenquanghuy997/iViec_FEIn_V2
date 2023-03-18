import _ from "lodash";
import {ExcelIcon, PdfIcon, WordIcon} from "@/sections/offerform/component/editor/Icon";
import React from "react";

const containsText = (text, searchText) => {
  return convertViToEn(text).toLowerCase().indexOf(convertViToEn(searchText).toLowerCase()) > -1;
};

const convertViToEn = (str, removeSpecial = true) => {
  if (!str) {
    return str;
  }
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g,"a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g,"e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g,"i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g,"o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g,"u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g,"y");
  str = str.replace(/đ/g,"d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  // Một vài bộ encode coi các dấu mũ, dấu chữ như một kí tự riêng biệt nên thêm hai dòng này
  str = str.replace(/\u0300|\u0301|\u0303|\u0309|\u0323/g, ""); //       huyền, sắc, ngã, hỏi, nặng
  str = str.replace(/\u02C6|\u0306|\u031B/g, ""); // ˆ    Â, Ê, Ă, Ơ, Ư
  // Bỏ các khoảng trắng liền nhau
  str = str.replace(/ + /g," ");
  str = str.trim();
  // Bỏ dấu câu, kí tự đặc biệt
  if (removeSpecial) {
    str = str.replace(/!|@|%|\^|\*|\(|\)|\+|\=|\<|\>|\?|\/|,|\.|\:|\;|\'|\"|\&|\#|\[|\]|~|\$|_|`|-|{|}|\||\\/g," ");
  }
  return str;
}

export const removeEmpty = (obj, key) => {
  return _.transform(obj, (r, v, k) => {
    if (k === key && _.isEmpty(v)) return;
    r[k] = _.isObject(v) ? removeEmpty(v, key) : v;
  });
}
const convertFlatDataToTree = (flatData, parentKey = 'parentOrganizationId') => {
  const hashTable = Object.create(null);
  flatData?.forEach((aData) => {
    hashTable[aData.id] = { ...aData, children: [] };
  });
  const dataTree = [];
  flatData?.forEach((aData) => {
    if (aData[parentKey]) {
      hashTable[aData[parentKey]]?.children.push(hashTable[aData.id]);
    } else {
      dataTree.push(hashTable[aData.id]);
    }
  });
  return removeEmpty(dataTree, 'children') || [];
};

function stringToColor(string) {
  let hash = 0;
  let i;
  /* eslint-disable no-bitwise */
  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }
  /* eslint-enable no-bitwise */
  return color;
}

function stringAvatar(name) {
  return {
    sx: {
      backgroundColor: stringToColor(name),
      width: 24,
      height: 24
    },
    children: <span style={{ fontSize: 10 }}>{name.split(' ')[0][0]}{name.split(' ')[1][0]}</span>,
  };
}

const showIconByFileType = (fileType) => {
  let icon = null;
  switch (fileType) {
    case ".doc":
      icon = <WordIcon/>;
      break;
    case "doc":
      icon = <WordIcon/>;
      break;
    case ".docx":
      icon = <WordIcon/>;
      break;
    case "docx":
      icon = <WordIcon/>;
      break;
    case ".pdf":
      icon = <PdfIcon/>;
      break;
    case "pdf":
      icon = <PdfIcon/>;
      break;
    case ".xlsx":
      icon = <ExcelIcon/>;
      break;
    case "xlsx":
      icon = <ExcelIcon/>;
      break;
    case ".xls":
      icon = <ExcelIcon/>;
      break;
    case "xls":
      icon = <ExcelIcon/>;
      break;
    default:
      break;
  }
  return icon;
}

const calcFileSize = (fileSize) => {
  let fileSizeStr = fileSize.toString();
  if (fileSizeStr.length < 7) return `${(+fileSizeStr / 1024).toFixed(2)} KB`
  return `${(Math.round(+fileSizeStr / 1024) / 1000).toFixed(2)} MB`
}

const cleanObject = (obj) => {
  return Object.entries(obj).reduce((a, [k, v]) => ((v === null || v === undefined || v === "" || v?.length === 0) ? a : ((a[k] = v), a)), {})
}

export {
  containsText,
  convertViToEn,
  convertFlatDataToTree,
  stringToColor,
  stringAvatar,
  showIconByFileType,
  calcFileSize,
  cleanObject,
}