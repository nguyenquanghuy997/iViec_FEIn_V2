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