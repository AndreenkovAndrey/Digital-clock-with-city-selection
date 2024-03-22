const HTMLtimeRefs = {
 hrs : document.getElementById('hours'),
 min : document.getElementById('minutes'),
 sec : document.getElementById('seconds'),
 ampmClock : document.getElementById('ampm'),
};
const timezones = {
    Moscow: +3 ,
    'New York': -4 ,
    London: +0 ,
    Kiev: +2,
    Bangkok: +7 ,
    Sydney: +11 , 
    Taiwan: +8 ,
    Mexico: -6 , 
    Brasilia: -3 , 
    Singapore: +8
} 
const selectEl = document.getElementById('city');
const form = document.querySelector('.container-form');
const LOCALEGMT = +3
let currentTimezone = 'Moscow';
let amPm = 'AM';

setInterval(updateTime, 1000)

function updateTime(){
    const milsecTime = new Date().getTime();
    const resultTime = convertationHrsToMilsec(timezones[currentTimezone]) - (-milsecTime) - convertationHrsToMilsec(LOCALEGMT);
    const date = new Date(resultTime)
    ampmSwitch(date)
    const currentHour = calculateHourModuloTwelve(date) || 12;
    const formattedHour = isLessThanTen(currentHour) ? formatNumberWithLeadingZero(currentHour) : currentHour;

    HTMLtimeRefs.hrs.innerHTML = formattedHour;
    HTMLtimeRefs.min.innerHTML = (date.getMinutes()<10?"0":"") + date.getMinutes();
    HTMLtimeRefs.sec.innerHTML = (date.getSeconds()<10?"0":"") + date.getSeconds();
    HTMLtimeRefs.ampmClock.innerHTML = amPm
}

function calculateHourModuloTwelve(date) {
    return date.getHours() % 12;
}

function isLessThanTen(number) {
    return number < 10;
}

function formatNumberWithLeadingZero(number) {
    return (number < 10 ? "0" : "") + number;
}

selectEl.addEventListener('change', (e) => {
    currentTimezone = e.target.value;
})

function ampmSwitch(date){
    let hours = date.getHours()
   amPm = hours >= 12 ? 'PM' : 'AM';
}

function convertationHrsToMilsec(hours){
    const milsecPerHrs = 3600000
    const resultOfConv = hours * milsecPerHrs
    return resultOfConv
}