import React, { useState } from "react";
import Calendar from "react-calendar";
import "./DateFilterModal.css";
import "react-calendar/dist/Calendar.css";

const DateFilterModal = ({ dateRange, closeModal }) => {
  const [minDate, setMinDate] = useState(new Date());
  // const [minDateDisplay, setminDateDisplay] = useState(false);
  // const [maxDate, setMaxDate] = useState(new Date());
  const datePicker = [];
  const today = new Date();
  const yesterday = new Date(today);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec",
  ];

  const calendarClickHandler = (e) => {
    // const value = e.target.value;
    // setMinDate(value);
    console.log(e);
    datePicker.push(minDate.toDateString());
    datePicker.push(e.toDateString());
    dateRange(datePicker);
    closeModal(false);
  };
  const handleDateInput = (e) => {
    // console.log(e.target.value);
    const value = e.target.value;
    if (value === "Past Week") {
      let day = today.toDateString();
      day = day.substring(0, 3);
      // console.log((day));
      let dayIndex = 0;
      for (var i = 0; i < days.length; i++) {
        if (days[i] === day) {
          dayIndex = i;
          break;
        }
      }
      yesterday.setDate(yesterday.getDate() - (7 + dayIndex));
      today.setDate(today.getDate() - (dayIndex + 1));
      const min = yesterday.toDateString();
      const max = today.toDateString();
      datePicker.push(min);
      datePicker.push(max);
      dateRange(datePicker);
      closeModal(false);
      console.log(dateRange);
      console.log(datePicker);
    } else if (value === "Past Month") {
      var now = new Date();
      var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
      var prevMonthFirstDate = new Date(
        now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
        (now.getMonth() - 1 + 12) % 12,
        1
      );
      datePicker.push(prevMonthFirstDate);
      datePicker.push(prevMonthLastDate);
      dateRange(datePicker);
      closeModal(false);
    } else if (value === "Past 3 months") {
      var now = new Date();
      // console.log(now);
      var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
      var prevMonthFirstDate = new Date(
        now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
        (now.getMonth() - 1 + 12) % 12,
        1
      );
      // console.log(prevMonthFirstDate);
      let lastThirdMonthFirstDate = prevMonthFirstDate.setMonth(
        prevMonthFirstDate.getMonth() - 2
      );
      // console.log(lastThirdMonthFirstDate);
      // console.log(prevMonthLastDate.toDateString());

      var lastThirdMonthFirstDateStringFormat = new Date(
        lastThirdMonthFirstDate
      ).toDateString();
      // console.log(s);
      datePicker.push(lastThirdMonthFirstDateStringFormat);
      datePicker.push(prevMonthLastDate.toDateString());
      dateRange(datePicker);
      closeModal(false);
      // var new1 = Number(Math.round(new Date(s).getTime() / 1000).toString());
      // console.log(new1);
      // var s1 = new Date(1275677100000).toDateString();
      // console.log(s1);
    } else if (value === "Past 6 months") {
      var now = new Date();
      // console.log(now);
      var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
      var prevMonthFirstDate = new Date(
        now.getFullYear() - (now.getMonth() > 0 ? 0 : 1),
        (now.getMonth() - 1 + 12) % 12,
        1
      );
      // console.log(prevMonthFirstDate);
      let lastFifthMonthFirstDate = prevMonthFirstDate.setMonth(
        prevMonthFirstDate.getMonth() - 5
      );
      // console.log(lastThirdMonthFirstDate);
      // console.log(prevMonthLastDate.toDateString());

      var lastFifthMonthFirstDateStringFormat = new Date(
        lastFifthMonthFirstDate
      ).toDateString();
      // console.log(s);
      datePicker.push(lastFifthMonthFirstDateStringFormat);
      datePicker.push(prevMonthLastDate.toDateString());
      dateRange(datePicker);
      closeModal(false);
      // var new1 = Number(Math.round(new Date(s).getTime() / 1000).toString());
      // console.log(new1);
      // var s1 = new Date(1275677100000).toDateString();
      // console.log(s1);
    } else if (value === "Past year") {
      var now = new Date();
      now.setFullYear(now.getFullYear() - 1);
      console.log(now);
      let shortMonth = now.toLocaleString("en-us", {
        month: "short",
      }); /* Jun */
      let shortMonthIndex = 0;
      console.log(shortMonth);
      //   console.log(now.toDateString()); // "Fri Oct 04 2019"
      for (var i = 0; i < months.length; i++) {
        if (months[i] === shortMonth) {
          shortMonthIndex = i;
          break;
        }
      }
      const firstMonthIndex = shortMonthIndex;
      console.log(shortMonthIndex);
      now.setMonth(now.getMonth() - firstMonthIndex);
      console.log(now);
      var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      console.log(firstDay.toDateString());
      const lastMonthIndex = 12 - shortMonthIndex;
      now.setMonth(now.getMonth() + lastMonthIndex);
      console.log(now);
      var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      console.log(lastDay.toDateString());
      datePicker.push(firstDay.toDateString());
      datePicker.push(lastDay.toDateString());
      dateRange(datePicker);
      closeModal(false);
    } else if (value === "Past 2 years") {
      var now = new Date();
      now.setFullYear(now.getFullYear() - 2);
      console.log(now);
      let shortMonth = now.toLocaleString("en-us", {
        month: "short",
      }); /* Jun */
      let shortMonthIndex = 0;
      console.log(shortMonth);
      //   console.log(now.toDateString()); // "Fri Oct 04 2019"
      for (var i = 0; i < months.length; i++) {
        if (months[i] === shortMonth) {
          shortMonthIndex = i;
          break;
        }
      }
      const firstMonthIndex = shortMonthIndex;
      console.log(shortMonthIndex);
      now.setMonth(now.getMonth() - firstMonthIndex);
      console.log(now);
      var firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      console.log(firstDay.toDateString());
      const lastMonthIndex = 12 - shortMonthIndex;
      now.setMonth(now.getMonth() + lastMonthIndex);
      console.log(now);
      var lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
      console.log(lastDay.toDateString());
      datePicker.push(firstDay.toDateString());
      datePicker.push(lastDay.toDateString());
      dateRange(datePicker);
      closeModal(false);
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="choosefromcolumn">
          <div>
            <input
              type="button"
              value="Past Week"
              onClick={handleDateInput}
            ></input>
          </div>
          <div>
            <input
              type="button"
              value="Past Month"
              onClick={handleDateInput}
            ></input>
          </div>
          <div>
            <input
              type="button"
              value="Past 3 months"
              onClick={handleDateInput}
            ></input>
          </div>
          <div>
            <input
              type="button"
              value="Past 6 months"
              onClick={handleDateInput}
            ></input>
          </div>
          <div>
            <input
              type="button"
              value="Past year"
              onClick={handleDateInput}
            ></input>
          </div>
          <div>
            <input
              type="button"
              value="Past 2 years"
              onClick={handleDateInput}
            ></input>
          </div>
        </div>
        <div className="calendardatepicker">
          <Calendar value={minDate} onChange={setMinDate} />
          {console.log(minDate.toDateString())}
          {/* {minDateDisplay && (
            <Calendar value={minDate} minDate={minDate} onChange={setMaxDate} />
          )} */}
          <Calendar
            value={minDate}
            minDate={minDate}
            onChange={calendarClickHandler}
          />
          {/* <Calendar activeStartDate={minDate} onChange={calendarClickHandler}/> */}
        </div>
      </div>
    </div>
  );
};

export default DateFilterModal;
