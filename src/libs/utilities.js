const getPastDateText = (selectedDate) => {
  let dateText = "";

  if (selectedDate === "pastHour") {
    dateText = "hour";
  } else if (selectedDate === "past24Hour") {
    dateText = "day";
  }
  if (selectedDate === "pastWeek") {
    dateText = "week";
  }
  if (selectedDate === "pastMonth") {
    dateText = "month";
  }

  return dateText;
};

const isCategoryAllowed = (selectedCategory, selectedSource) =>
  selectedCategory !== "all" && selectedSource === "all";

export { getPastDateText, isCategoryAllowed };
