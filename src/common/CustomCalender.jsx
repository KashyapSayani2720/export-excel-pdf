import React, { useEffect, useRef, useState } from "react";
import { LeftOutlined, RightOutlined, DownOutlined } from "@ant-design/icons";

import { DatePicker } from "antd";
import moment from "moment";
import Slider from "react-slick";
import Icon from "@ant-design/icons";

const CustomCalender = () => {
  const { MonthPicker } = DatePicker;
  const monthFormat = "YYYY";
  const [month, setMonth] = useState(moment().month());
  const [year, setYear] = useState(moment().year());
  const [days, setDays] = useState([]);
  const [previousMonth, setPreviousMonth] = useState(null);
  const [nextMonth, setNextMonth] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Note: months are zero-based in Moment.js (0 = January, 1 = February, etc.)
    const daysInMonth = moment([year, month || moment().month()]).daysInMonth();
    let daysOfMonth = [];
    for (let day = 1; day <= daysInMonth; day++) {
      const date = moment([year, month || moment().month(), day]);
      // console.log(date.format("ddd, MMM DD"));
      daysOfMonth.push({
        date: date.format("DD"),
        day: date.format("ddd"),
        dateString: date,
      });
    }
    console.log({ month, year, daysOfMonth });

    setDays(daysOfMonth);
    handleGetPreviousNextMonth(month || moment().month());
  }, [month]);

  const yearChangeHandler = (date) => {
    let datString = moment(new Date(date)).format("MMMM YYYY");
    const month = moment(datString.split(" ")[0], "MMM");

    // Get the month number (months in Moment.js are 0-indexed)
    const monthNumber = month.month(); // Adding 1 to match standard month numbering
    const monthYear = month.year(); // Adding 1 to match standard month numbering
    setMonth(monthNumber);
    setYear(monthYear);
    // setDisplayValue(datString);

    // console.log({ monthNumber, monthYear });
    return date;
  };

  const handleGetPreviousNextMonth = (currentMonthNumber) => {
    var dynamicCurrentMonth = moment().month(currentMonthNumber); // Subtract 1 since month indices start from
    var nextMonth = dynamicCurrentMonth.clone().add(1, "M");
    var previousMonth = dynamicCurrentMonth.clone().subtract(1, "M");
    setPreviousMonth({
      dateString: previousMonth,
      monthString: previousMonth.format("MMMM"),
    });
    setNextMonth({
      dateString: nextMonth,
      monthString: nextMonth.format("MMMM"),
    });
  };

  let settings = {
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

  const handleNextPreviousMonth = (date) => {
    setMonth(date.month());
    setYear(date.year());
  };

  return (
    <div className="calendar-container ">
      <div className="calendar-header">
        <div
          className="cursor-pointer"
          onClick={() => handleNextPreviousMonth(previousMonth?.dateString)}
        >
          <button className="calendar-buttons">
            <LeftOutlined />
          </button>
          <span className="months-heading">{previousMonth?.monthString}</span>
        </div>
        <div className="calender-month-box">
          <span className="h6 text-uppercase">
            {moment().month(month).format("MMMM")}
          </span>{" "}
          <span className="h6 text-black-50">
            {moment().month(month).format("YYYY")}
          </span>
          <MonthPicker
            inputReadOnly={true}
            onChange={yearChangeHandler}
            suffixIcon={<DownOutlined />}
            className="calender-month-picker cursor-pointer"
            format={monthFormat}
          />
        </div>
        <div
          className="cursor-pointer"
          onClick={() => handleNextPreviousMonth(nextMonth?.dateString)}
        >
          <span className="months-heading">{nextMonth?.monthString}</span>
          <button className="calendar-buttons">
            <RightOutlined />
          </button>
        </div>
      </div>
      <div className="container">
        <Slider
          {...settings}
          centerPadding="10"
          ref={sliderRef}
          slidesToScroll={10}
          className="date-picker-slider"
        >
          {days?.map((item, index) => {
            return (
              <>
                <div
                  className={`${
                    index === activeIndex ? "active" : ""
                  } day-card m-2`}
                  onClick={() => setActiveIndex(index)}
                >
                  <div className="day-card-day">{item?.day}</div>
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
