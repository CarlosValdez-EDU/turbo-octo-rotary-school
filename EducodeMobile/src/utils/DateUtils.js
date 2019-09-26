export const unixTimeToDate = unixDate => {
  var date = new Date(unixDate);
  return date;
};

export const formatDate = date => {
  let newDate = new Date(date);
  let formatDate = `${newDate.getDate()}-${newDate.getMonth()}-${newDate.getFullYear()}`;

  return formatDate;
};
