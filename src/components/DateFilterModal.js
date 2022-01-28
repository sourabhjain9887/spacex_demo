import React,{useEffect} from 'react';

const DateFilterModal = ({dateRange, closeModal}) => {
    const datePicker = [];
    const today = new Date();
    const yesterday = new Date(today);
    const days = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

    const handleDateInput=(e)=>{
        // console.log(e.target.value);
        const value = e.target.value;
        if(value === 'Past Week'){
            let day = today.toDateString();
            day = day.substring(0,3);
            // console.log((day));
            let dayIndex=0;
            for(var i=0;i<days.length;i++){
                if(days[i] === day){
                    dayIndex=i;
                    break;
                }
            }
            yesterday.setDate(yesterday.getDate() - (7+dayIndex));
            today.setDate(today.getDate() - (dayIndex+1));
            const min = yesterday.toDateString();
            const max =today.toDateString();
            datePicker.push(min);
            datePicker.push(max);
            dateRange(datePicker);
            closeModal(false);
            // console.log(dateRange);
        }else if (value === 'Past Month'){
            var now = new Date();
            var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
            var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
            datePicker.push(prevMonthFirstDate);
            datePicker.push(prevMonthLastDate);
            dateRange(datePicker);
            closeModal(false);
        }else if (value === 'Past 3 months'){
            var now = new Date();
            // console.log(now);
            var prevMonthLastDate = new Date(now.getFullYear(), now.getMonth(), 0);
            var prevMonthFirstDate = new Date(now.getFullYear() - (now.getMonth() > 0 ? 0 : 1), (now.getMonth() - 1 + 12) % 12, 1);
            // console.log(prevMonthFirstDate);
            let lastThirdMonthFirstDate = prevMonthFirstDate.setMonth(prevMonthFirstDate.getMonth()-2);
            // console.log(lastThirdMonthFirstDate);
            // console.log(prevMonthLastDate.toDateString());

            var lastThirdMonthFirstDateStringFormat = new Date(lastThirdMonthFirstDate).toDateString();
            // console.log(s);
            datePicker.push(lastThirdMonthFirstDateStringFormat);
            datePicker.push(prevMonthLastDate.toDateString());
            dateRange(datePicker);
            closeModal(false);
            // var new1 = Number(Math.round(new Date(s).getTime() / 1000).toString());
            // console.log(new1);
            // var s1 = new Date(1275677100000).toDateString();
            // console.log(s1);
        }
    }

  return <div>
      <div>
          <div>
              <input type='button' value='Past Week' onClick={handleDateInput}></input>
          </div>
          <div>
              <input type='button' value='Past Month' onClick={handleDateInput}></input>
          </div>
          <div>
              <input type='button' value='Past 3 months' onClick={handleDateInput}></input>
          </div>
          <div></div>
          <div></div>
          <div></div>
      </div>
      <div>

      </div>
  </div>;
};

export default DateFilterModal;
