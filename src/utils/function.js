const containsText = (text, searchText) => {
  return text.toLowerCase().indexOf(searchText.toLowerCase()) > -1;
};

export {
  containsText
}