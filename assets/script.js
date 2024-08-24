const timeZones = {
    'EST': -5,
    'EDT': -4,
    'CST': -6,
    'CDT': -5,
    'MST': -7,
    'MDT': -6,
    'PST': -8,
    'PDT': -7,
    'AKST': -9,
    'AKDT': -8,
    'HST': -10,
    'HDT': -9,
    'AST': -4,
    'ADT': -3,
    'NST': -3.5,
    'NDT': -2.5,
    'CET': 1,
    'CEST': 2,
    'BRT': -3,
    'BRST': -2,
    'GMT': 0,
    'UTC': 0,
    'WET': 0,
    'WEST': 1,
    'IST': 5.5,
    'JST': 9,
    'AEST': 10,
    'AEDT': 11,
    'ACST': 9.5,
    'ACDT': 10.5,
    'AWST': 8,
    'NZST': 12,
    'NZDT': 13
};

function updateTime(timeZone) {
    const now = new Date();

    const utcOffsetInHours = -now.getTimezoneOffset() / 60;
    const selectedTimeZoneOffset = timeZones[timeZone] || 0;
    const timeDifference = selectedTimeZoneOffset - utcOffsetInHours;

    const targetTime = new Date(now.getTime() + (timeDifference * 60 * 60 * 1000));

    const hours = targetTime.getHours().toString().padStart(2, '0');
    const minutes = targetTime.getMinutes().toString().padStart(2, '0');
    const seconds = targetTime.getSeconds().toString().padStart(2, '0');
    const timeString = `${hours} ${minutes} ${seconds}`;
    document.getElementById('time').innerText = timeString;

    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const dateString = targetTime.toLocaleDateString(undefined, options);
    document.getElementById('date').innerText = dateString;
}

function calculateOffset(timeZone) {
    const now = new Date();
    const localOffsetInHours = -now.getTimezoneOffset() / 60;
    const selectedTimeZoneOffset = timeZones[timeZone] || 0;
    const offset = Math.abs(selectedTimeZoneOffset - localOffsetInHours);
    document.getElementById('offset').innerText = `-${Math.round(offset)}`;
}

function initClock() {
    const params = new URLSearchParams(window.location.search);
    const timeZone = params.get('tz') || 'UTC';  // Default to UTC if no timezone is specified
    calculateOffset(timeZone);
    updateTime(timeZone);
    setInterval(() => updateTime(timeZone), 1000);
}

initClock();
