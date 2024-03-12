import React, { useState } from "react";
import CalendarHeaderLeft from "./assets/svgs/calendar-header-left.svg";
import CalendarHeaderRight from "./assets/svgs/calendar-header-right.svg";
import { DatePicker } from "antd";
import Slider from "react-slick";

function getDaysOfMonth(dateString) {
  const date = new Date(dateString);

  // Get the month and year
  const month = date.getMonth();
  const year = date.getFullYear();

  // Get the number of days in the month
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const numberOfDays = lastDayOfMonth.getDate();

  // Create an array to store the day names
  const daysList = [];

  // Loop through each day of the month and push the day name to the array
  for (let day = 1; day <= numberOfDays; day++) {
    const currentDay = new Date(year, month, day);
    const dayName = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ][currentDay.getDay()];
    daysList.push({ date: day, dayName });
  }
  return daysList;
}

function getMonthAlphabet(monthNumber) {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  if (monthNumber >= 1 && monthNumber <= 12) {
    return months[monthNumber - 1];
  } else if (monthNumber == 0) {
    return "December";
  } else if (monthNumber > 12) {
    return "January";
  } else {
    return "Invalid month number";
  }
}

const CustomCalender = () => {
  const { MonthPicker } = DatePicker;
  const monthFormat = "YYYY";
  const [month, setMonth] = useState("March");
  const [year, setYear] = useState(2024);
  const [days, setDays] = useState([]);
  const [previousMonth, setPreviousMonth] = useState("February");
  const [nextMonth, setNextMonth] = useState("April");

  const yearChangeHandler = (date) => {
    let month = getMonthAlphabet(date?.$d?.getMonth() + 1);
    setMonth(month);
    setYear(date?.$d?.getFullYear());
    const daysOfMonth = getDaysOfMonth(date);
    setDays(daysOfMonth);

    // Previous month
    let previousMonth = getMonthAlphabet(date?.$d?.getMonth());
    setPreviousMonth(previousMonth);

    // Next month
    let nextMonth = getMonthAlphabet(date?.$d?.getMonth() + 2);
    setNextMonth(nextMonth);
  };
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 12,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="calendar-container">
      <div className="calendar-header">
        <div>
          <button className="calendar-buttons">
            <img src={CalendarHeaderLeft} alt="left" width={10} height={8} />
          </button>
          <span className="months-heading">{previousMonth}</span>
        </div>
        <div className="calender-month-box">
          {month} {year}{" "}
          <MonthPicker
            format={monthFormat}
            inputReadOnly={true}
            onChange={yearChangeHandler}
            className="calender-month-picker"
          />
        </div>
        <div>
          <span className="months-heading">{nextMonth}</span>
          <button className="calendar-buttons">
            <img src={CalendarHeaderRight} alt="right" width={10} height={8} />
          </button>
        </div>
      </div>
      <div className="container date-picker-slider">
        <Slider {...settings}>
          {days?.map((item) => {
            return (
              <>
                <div className="day-card m-2">
                  <div className="day-card-day">
                    {item?.dayName.substring(0, 3)}
                  </div>
                  <div className="day-card-date">{item?.date}</div>
                </div>
              </>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default CustomCalender;
