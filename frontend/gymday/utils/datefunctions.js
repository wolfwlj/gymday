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

    console.log(day)
    return day;
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

    console.log(CurrentDate)

    let formattedDate = CurrentDate.split(" ")[0].split("/")
    
    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]
    console.log(formattedDate)
    

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

    console.log(CurrentDate)

    let formattedDate = CurrentDate.split(" ")[0].split("/")
    
    formattedDate = formattedDate[2] + "-" + formattedDate[1] + "-" + formattedDate[0]
    console.log(formattedDate)

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