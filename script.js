document.addEventListener("DOMContentLoaded", () => {
    let time = document.getElementById("Time");
    let input = document.getElementById("SelectvTime");
    let SetAlarm = document.getElementById("SetAlarm");
    let alarmsList = document.getElementById("alarmsList");

    let alarms = [];
    let ringtone = new Audio("audio/ringtone2.wav");

    // Function to convert 24-hour format to 12-hour format
    const convertTo12HourFormat = (hr, min, sec) => {
        const ampm = hr >= 12 ? 'PM' : 'AM';
        const hour12 = hr % 12 || 12;
        return `${hour12}:${min < 10 ? '0' + min : min}:${sec < 10 ? '' + sec : sec} `;
    };

    // Function to update the current time and check alarms
    setInterval(() => {
        let date = new Date();
        let hr = date.getHours();
        let min = date.getMinutes();
        let sec = date.getSeconds();
        let currentTime = convertTo12HourFormat(hr, min, sec);
        time.innerHTML = currentTime;

        // Check if current time matches any alarm time
        alarms.forEach(alarm => {
            if (alarm.time === currentTime) {
                ringtone.play();
                alarm.element.querySelector('.alarm-status').innerText = "Ringing!";
                console.log(`Alarm ringing for: ${currentTime}`);
            }
        });
    }, 1000);

    // Function to set a new alarm
    const setAlarm = () => {
        let alarmTime = input.value;
        if (!alarmTime) {
            alert("Please set a valid time.");
            return;
        }

        // Convert the alarm time to 12-hour format
        let [hours, minutes] = alarmTime.split(":");
        hours = parseInt(hours, 10);
        let alarmTimeFormatted = convertTo12HourFormat(hours, minutes,'0');
 
        let alarmContainer = document.createElement('div');
        alarmContainer.classList.add('alarm-container');

        let alarmTimeText = document.createElement('span');
        alarmTimeText.classList.add('alarm-time');
        alarmTimeText.innerText = alarmTimeFormatted;

        let alarmStatus = document.createElement('span');
        alarmStatus.classList.add('alarm-status');
        alarmStatus.innerText = "Set";

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-alarm');
        deleteButton.innerText = "Delete";
        deleteButton.onclick = () => {
            alarmsList.removeChild(alarmContainer);
            alarms = alarms.filter(alarm => alarm.element !== alarmContainer);
        };

        alarmContainer.appendChild(alarmTimeText);
        alarmContainer.appendChild(alarmStatus);
        alarmContainer.appendChild(deleteButton);
        alarmsList.appendChild(alarmContainer);

        alarms.push({ time: alarmTimeFormatted, element: alarmContainer });

        console.log(`Alarm set for: ${alarmTimeFormatted}`);
    };

    SetAlarm.addEventListener("click", setAlarm);
});
