export function isValidDate(date){
  let year, month, day

  //check for ISO format (YYYY-MM-DD)
  if (!(/\d{4}-\d{1,2}-\d{1,2}$/.test(date))){
    return false;
  }
  let digits = date.split("-").map(Number);
  year = digits[0];
  month = digits[1];
  day = digits[2];

  //if month is invalid
  if(month < 1 || month > 12) return false;

  if([1,3,5,7,8,10,12].includes(month)) {
    //if month has 31 days, verify that the day is correct
    if(day < 1 || day > 31) return false;

  } else {
    if(month === 2){
      //if month is february, check if year is leap and check day

      if(year % 4 === 0){
        if(day < 1 || day > 29) return false;
      } else {
        if(day < 1 || day > 28) return false;
      }

    } else {
      //if month has 30 days, check if day is correct
      if(day < 1 || day > 30) return false;
    }
  }

  return true;
}
