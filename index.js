var WhenDoesClassEnd = function(){
    var schedule = {
        mon: {
            per1: '8:04 to 8:44',
            per2: '8:48 to 9:28',
            per3: '9:32 to 10:12',
            per4: '10:16 to 10:56',
            lunch: '10:56 to 11:34',
            per5: '11:40 to 12:20',
            per6: '12:24 to 13:04'
        },
        tue: {
            per1: '8:04 to 9:56',
            per3: '10:00 to 12:07',
            lunch: '12:08 to 13:15',
            per5: '13:19 to 15:30'
        },
        wed: {
            per2: '8:04 to 9:5',
            per4: '10:00 to 12:07',
            lunch: '12:11 to 13:1',
            per6: '13:19 to 15:30'            
        },
        thu: {
            per1: '8:04 to 9:34',
            per3: '9:38 to 11:23',
            lunch: '11:27 to 12:31',
            per5: '12:50 to 14:20',
            sss: '14:24 to 15:30'
        },
        fri: {
            per2: '8:04 to 9:34',
            per4: '9:38 to 11:23',
            lunch: '11:27 to 12:31',
            per6: '12:50 to 14:20',
            enrichment: '14:24 to 15:30'
        }
    }
    
    function buttonClicked(){
        console.log('Clicked!')
        var resultDiv = document.getElementById('result')
        // When the user clicks the button
        // We need to grab the current time and date
        var newDate = new Date()
        // The new keyword runs the function and returns an object
        console.log(newDate.toString())
        var splitDate = newDate.toString().split(" ")
        
        var dayOfTheWeek = splitDate[0].toLowerCase() // "Tue" --> "tue"
        var month = splitDate[1]
        var dayNumber = splitDate[2]
        var year = splitDate[3]
        var time = splitDate[4]
        
        console.log(splitDate)

        var isItASchoolDay = checkIfSchoolDay(dayOfTheWeek)
        if (isItASchoolDay === true) {
          var isItDuringSchoolHours = checkIfDuringSchoolHours(time, dayOfTheWeek)
          if (isItDuringSchoolHours === true) {
              schoolHoursCountdown(time, dayOfTheWeek)
          } else {
            resultDiv.innerHTML = 'School is out!'        
          }
        } else {
          resultDiv.innerHTML = 'School is out!'         
        }
        // Then we need to compare it to a schedule
        // Then we need to create a timer that counts down
        // to the end of each period
    }

    // This function returns true if it is a 
    // school day and false if it is not.    
    function checkIfSchoolDay(day){
        if (day === 'sat' || day === 'sun') {
            return false
        }
        return true
    }
    
    // The day will be like 'tue' or 'fri'
    // The time will look like this "11:31:05"
    function checkIfDuringSchoolHours(time, day){
        // Split the time into hours, minutes
        // and then do your check
        var splitTime = time.split(":")
        var hours = Number(splitTime[0])
        var minutes = Number(splitTime[1])
        // ["11", "31", "05"]
        
        if (day === "mon") {
            if ( (hours < 8 || (hours === 8 && minutes < 4)) ||
                 (hours > 13 || (hours === 13 && minutes > 4))) {
                return false
            }
        }
        // Check if the day is monday
        // If it is, check if the time is after 8:04
        // and before 13:04
        if ( (hours < 8 || (hours === 8 && minutes < 4)) || 
             (hours > 15 || (hours === 15 && minutes > 30))) {
            return false
        }
        
        // Otherwise just check that the time is after
        // 8:04 and before 15:30
        return true
    }
    
    // time looks like "11:32:55"
    // day looks like "mon"
    function schoolHoursCountdown(time, day) {
        // First let's get the daily schedule        
        var periodsObject = schedule[day]
        var resultDiv = document.getElementById('result')
        // resultDiv.innerHTML = periodsObject.per3
        
        var splitTime = time.split(":")
        // splitTime looks like ["11", "32", "55"]
        var currentHours = Number(splitTime[0]) // "11" --> 11
        var currentMinutes = Number(splitTime[1]) // "32" --> 32  

        // We need to turn our object into an array        
        var periodTimeArray = Object.values(periodsObject)
        // periodTimeArray looks like
        // ['8:04 to 8:44', '8:48 to 9:28', '9:32 to 10:12', '10:16 to 10:56']
        
        var periodHoursEnd = ''
        var periodMinsEnd = ''
        var periodHoursStart = ''
        var periodMinsStart = ''
        // We'll use iteration and a callback function
        periodTimeArray.forEach(function(periodTime){
            // periodTime looks like "9:32 to 10:12"
            var splitPeriodTime = periodTime.split(" ")
            // now looks like ["9:32", "to", "10:12"]
            var startTime = splitPeriodTime[0] // "9:32"
            var splitStart = startTime.split(":") // ["9", "32"]
            var startHours = Number(splitStart[0])
            var startMins = Number(splitStart[1])
            var endTime = splitPeriodTime[2] // "10:12"
            var splitEnd = endTime.split(":")
            var endHours = Number(splitEnd[0])
            var endMins = Number(splitEnd[1])
            
            // Check to see if the current hours are in between
            // the start hours and the end hours
            // And check to see if the current mins are in between
            // the end mins and the start mins
            
            // this checks that it is after the start of the period
            if (currentHours > startHours || 
               (currentHours === startHours && currentMinutes > startMins)) {
                // check if it is before the end of the period
                if (currentHours < endHours || 
                   (currentHours === endHours && currentMinutes < endMins) ) {
                   periodHoursEnd = endHours
                   periodMinsEnd = endMins
                   periodHoursStart = startHours
                   periodMinsStart = startMins
                }
            }
        })  
        
        if (periodHoursEnd === '') {
            console.log('No answer found')
        } else {
            startTimer(currentHours, currentMinutes, periodHoursEnd, periodMinsEnd, periodHoursStart, periodMinsStart)
        }
    }
    
    function startTimer(currentHours, currentMinutes, periodHoursEnd, periodMinsEnd, periodHoursStart, periodMinsStart){
        // Then we need to subtract the amount of time left
        // from the current time
        var date1 = new Date()
        date1.setHours(currentHours)
        date1.setMinutes(currentMinutes)
        var date2 = new Date()
        date2.setHours(periodHoursEnd)
        date2.setMinutes(periodMinsEnd)
        
        // This subtracts the amount of time between the current time
        // and when the period ends
        var timeDifference = date2.getTime() - date1.getTime()
        // timeDifference is in milliseconds
        console.log(timeDifference)
        // Create a timer that counts down to that moment        
        var hoursLeft = Math.floor(timeDifference / (1000 * 60 * 60))
        timeDifference -= hoursLeft / (1000 * 60 * 60)
        // console.log(timeDifference)
        var minutesLeft = Math.floor(timeDifference / (1000 * 60))
        timeDifference -= minutesLeft / (1000 * 60)
        // var secondsLeft = Math.floor(timeDifference / 1000)
        // console.log(timeDifference)
        
        // timeDifference -= secondsLeft
        // console.log(timeDifference)
        
        var timerDiv = document.getElementById('timer')
        timerDiv.innerHTML = 'There are ' + (Math.floor(hoursLeft / 60) + minutesLeft) + ' minutes left in this period.' 
        var resultDiv = document.getElementById('result')
        if (String(periodMinsStart).length === 1) {
            periodMinsStart = '0' + periodMinsStart
        }
        if (String(periodMinsEnd).length === 1) {
            periodMinsEnd = '0' + periodMinsEnd
        }        
        resultDiv.innerHTML = `${periodHoursStart}:${periodMinsStart} to ${periodHoursEnd}:${periodMinsEnd}`
        
        
        var timeLeftInMinutes = Math.floor(hoursLeft / 60) + minutesLeft
        // var timeLeftInSeconds = (timeLeftInMinutes * 60) + secondsLeft
        
        function updateClock(){
          if (timeLeftInMinutes > 0) {
              timeLeftInMinutes -= 1
              timerDiv.innerHTML = 'There are ' + timeLeftInMinutes + ' minutes left in this period.'              
          } else {
              timerDiv.innerHTML = 'Class is out!'
          }
            // if (timeLeftInSeconds > 0) {
            //     timeLeftInSeconds -= 1
            //     timerDiv.innerHTML = 'There are ' + (timeLeftInSeconds / 60) + ' minutes left.'
            // }
        //   timerDiv.innerHTML = 'There are ' + timeLeftInMinutes + ' minutes left in this period.'          
        }
        
        setInterval(updateClock, 60000)
    }
    
    return {
        onClick: buttonClicked
    }
}


var App = WhenDoesClassEnd()
var clickButton = App.onClick