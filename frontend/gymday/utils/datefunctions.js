//date utils file
const weekdagen = ["maandag", "dinsdag", "woensdag", "donderdag", "vrijdag", "zaterdag", "zondag"]

const months = ["januari", "februari", "maart", "april", "mei", "juni", "juli", "augustus", "september", "oktober", "november", "december"]

const MyTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone

export function GetCurrentWeekNumber(date){

    let currentDate = new Date(date);

    const onejan = new Date(currentDate.getFullYear(), 0, 1);

    const week = Math.ceil((((currentDate.getTime() - onejan.getTime()) / 86400000) + onejan.getDay() + 1) / 7);

    return week;
}

export function GetAllPossibleWeeksInCurrentMonth(date){
    let currentDate = new Date(date);
    let year = currentDate.getFullYear();
    let month = currentDate.getMonth();
    let weeks = [];
    let week = 1;
    let day = 1;
    let currentMonth = new Date(year, month, day);
    let currentWeek = GetCurrentWeekNumber(currentMonth);
    weeks.push(currentWeek);
    while(currentMonth.getMonth() === month){
        day++;
        currentMonth = new Date(year, month, day);
        let newWeek = GetCurrentWeekNumber(currentMonth);
        if(newWeek !== currentWeek){
            weeks.push(newWeek);
            currentWeek = newWeek;
        }
    }
    return weeks;
}

export function GetDatesOfWeeksFromWeekNumber(weeknumbers, year, selecteddate){

    let weekdates = []; 

    for(let i = 0; i < weeknumbers.length; i++){    
        let date = new Date(year, 0, 1 + (weeknumbers[i] - 1) * 7);
        let currentDate = new Date(date);
        let day = currentDate.getDay() || 7;
        if( day !== 1 )
            currentDate.setHours(-24 * (day - 1));

        for (let i = 0; i < 7; i++) {
            let day = getFullDate(currentDate);

            let dayobject = {
                date : day,
                isCurrentMonth : CheckIfDateIsInCurrentMonth(day, selecteddate), 
                isToday : CheckIfToday(day),
                hasSlots : false,
            }
            weekdates.push(dayobject);
            currentDate.setDate(currentDate.getDate() + 1);
        }

    }
    return weekdates;
}

export function CheckIfToday(date){
    let currentDate = new Date(date);
    let today = new Date();
    if(currentDate.getDate() === today.getDate() && currentDate.getMonth() === today.getMonth() && currentDate.getFullYear() === today.getFullYear()){
        return true;
    }
    else{
        return false;
    }
}

export function CheckIfDateIsInCurrentMonth(date,selecteddate){
    let currentDate = new Date(date);
    let currentMonth = new Date(selecteddate).getMonth();
    let dateMonth = currentDate.getMonth();
    if(currentMonth === dateMonth){
        return true;
    }
    else{
        return false;
    }
}

export function GetMonth(date){
    let currentDate = new Date(date);
    let month = currentDate.getMonth();
    return months[month];
}

export function GetYear(date){
    let currentDate = new Date(date);
    let year = currentDate.getFullYear();
    return year;
}

export function GetDayOfWeek(date){
    let day = [7,1,2,3,4,5,6][new Date(date).getDay()];
    //the weird array is to make sure that the first day of the week is monday and not sunday

    return day;
}

export function getFullDate(date){
    // from Wed Feb 28 2024 00:00:00 GMT+0100 (Central European Standard Time)
    // to 2024-02-28
    // NOOOO THIS MAKJES IT 28/02/2024
    // I WANT 2024-02-28

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    options.timeZone = MyTimezone;

    let currentDate = date.toLocaleString("en-GB", options)

    let formattedDate = currentDate.split(" ")[0].split("/")
    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]

    return formattedDate;

}

export function GetMinuteCount(date){
    // 1200 = 20:00
    let hour = new Date(date).getHours();
    let minute = new Date(date).getMinutes();
    let minuteCount = hour * 60 + minute;
    return minuteCount;
}

export function RetrieveTimestamp(date){
    //date = "2023-07-10 20:00"
    // get the 20:00
    let timestamp = date.split(" ")[1];
    return timestamp;

}
export function GetMondayOfWeek(date){
    let CurrentDate = new Date(date)
    //CurrentDate needs to be year-month-day

    let day = CurrentDate.getDay() || 7;  
    if( day !== 1 ) 
        CurrentDate.setHours(-24 * (day - 1)); 
    CurrentDate.setDate(CurrentDate.getDate());

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    options.timeZone = MyTimezone;

    CurrentDate = CurrentDate.toLocaleString("en-GB", options)

    let formattedDate = CurrentDate.split(" ")[0].split("/")
    
    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]
    

    return formattedDate;
    
}

export function GetSundayOfWeek(date){

    let CurrentDate = new Date(date)
    //CurrentDate needs to be year-month-day

    let day = CurrentDate.getDay() || 7;  
    if( day !== 1 ) 
        CurrentDate.setHours(-24 * (day - 1)); 
    CurrentDate.setDate(CurrentDate.getDate() + 7);

    const options = {
        year: "numeric",
        month: "numeric",
        day: "numeric",
    };
    options.timeZone = MyTimezone;

    CurrentDate = CurrentDate.toLocaleString("en-GB", options)

    let formattedDate = CurrentDate.split(" ")[0].split("/")
    
    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]

    return formattedDate;
}



export function GetDateNumsOfWeek(date){
//expected output : [1,2,3,4,5,6,7]

    let currentDate = new Date(date);
    let day = currentDate.getDay() || 7;
    let weekdates = [];
    if( day !== 1 )
        currentDate.setHours(-24 * (day - 1));

    for (let i = 0; i < 7; i++) {
        let day = currentDate.getDate();
        weekdates.push(day);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    return weekdates;
}
    

export function GetWeekDates(date){
    // 22 23 24 25 26 27 28

    let currentDate = new Date(date);
    let day = currentDate.getDay() || 7;
    let weekdates = [];
    if( day !== 1 )
        currentDate.setHours(-24 * (day - 1));

    for (let i = 0; i < 7; i++) {
        let day = currentDate.getDate();
        weekdates.push(day);
        currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return weekdates;
}

export function GetCurrentWeekDayNumber(date){
    let currentDate = new Date(date);

    let day = currentDate.getDay() || 7;

    return day;
}

export function GetCurrentWeekDayDateNumber(date){

    let currentDate = new Date(date);
    let day = currentDate.getDate();
    return day;
}
// change 2024-02-15 15:33 to 15:33
export function GetTime(date){
    let time = date.split(" ")[1];
    return time;
}

export function RetrieveDate(date){
    date = date.split(" ")[0];
    return date;
}
export function RetrieveDateJS(date){
    // convert default js date to 2024-02-15
    date = date.toISOString().split("T")[0];
    return date;
}