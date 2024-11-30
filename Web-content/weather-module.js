"use strict";

export const weekDayNames = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

/*
dateUnix is date and time in unix timestamp format.
(counts secs since January 1, 1970, 00:00:00 UTC)

timezone gives offset from UTS time in seconds example UTC+1=UTC+3600secs

objective of getDate is to convert unix date into readable format as follows:
weekday day, Month: e.g: Friday 29th, November

const date converts time from sec to milisec as js methods function with milisecs

weekDayName extracts week day number (0=sunday, 6=saturday) we match it to our WeekDays Array
same logic applies to monthName

return statment is formated as mentioned above, as: "Weekday Day, Month"
*/
export const getDate = function (dateUnix, timezone) {
  const date = new Date((dateUnix + timezone) * 1000);

  const weekDayName = weekDayNames[date.getUTCDay()];

  const monthName = monthNames[date.getUTCMonth()];

  return `${weekDayName} ${date.getUTCDate()}, ${monthName}`;
};

/*
  getTime follows a similar logic to getDate, but it extracts the clock time 
  instead of the calendar date.
*/
export const getTime = function (timeUnix, timezone) {
  const date = new Date((timeUnix + timezone) * 1000);

  const hours = date.getUTCHours();

  const minutes = date.getUTCMinutes().toString().padStart(2, '0');

  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12}:${minutes} ${period}`;
  
};

export const getHours = function (timeUnix, timezone) {
  const date = new Date((timeUnix + timezone) * 1000);

  const hours = date.getUTCHours();

  const period = hours >= 12 ? "PM" : "AM";

  return `${hours % 12 || 12} ${period}`;
};

// return (wind) speed in km/h rather than mps
export const mps_to_kmh = (mps) => {
  const mph = mps * 3600;
  return mph / 1000;
};

//aqi air quality index retriaval

export const aqiText = {
  1: {
    level: "Good",
    message: "The air quality is ideal for all outdoor and indoor activities.",
  },
  2: {
    level: "Fair",
    message:
      "Air quality poses little to no health risk. Suitable for most outdoor activities.",
  },
  3: {
    level: "Moderate",
    message:
      "No need to modify your usual outdoor activities unless you experience symptoms such as coughing and throat irritation.",
  },
  4: {
    level: "Poor",
    message:
      "Air quality is unhealthy for sensitive groups. Consider reducing prolonged or heavy outdoor exertion. Consider reducing or rescheduling strenuous activities outdoors if you experience symptoms such as coughing and throat irritation",
  },
  5: {
    level: "Very Poor",
    message:
      "Air quality is unhealthy for everyone. Limit outdoor activities and stay indoors when possible.",
  },
};
