

const daysOfWeek = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];
const months = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
let allDay=[]
let forecast=[]
const inpWeather = document.querySelector('#inpWeather');
const defaultcity='cairo'



// Function to show the loading message or spinner
const showLoading = () => {
  document.querySelector('.today').innerHTML = `<span class="loader"></span>`; // You can also use a spinner here
};

// Function to clear the loading message after fetching the data
const clearLoading = () => {
  document.querySelector('.today').innerHTML = ''; // Clear the loading message
};


const getLocation = async function (city) {
    try {
      showLoading();
      const data = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=9cb1a32ecea843e2ad9113622252201&q=${city}&days=3`
      );
      if (!data.ok)
        throw new Error(`Failed to fetch weather data. Status: ${data.status}`);

      const finalData = await data.json();
      if (!finalData.location) {
        throw new Error('Location not found.');
      }

      let { location, current, forecast } = finalData;
      console.log('location', location);
      console.log('current', current);
      console.log('forecast', forecast);

      let html2 = '';

      allDay = forecast.forecastday;
      console.log(allDay);
      forecast = finalData.location;
      console.log(forecast);

      for (let i = 0; i < allDay.length; i++) {
        let date = new Date(`${allDay[i].date}`);
        let dayOfWeek = daysOfWeek[date.getDay()];
        let dayOfMonth = date.getDate();
        let month = months[date.getMonth()];
        console.log(dayOfWeek, dayOfMonth, month);
        console.log(`${allDay[i].day.condition.icon}`);

        html2 += `  <div class=" ${
          i === 0 ? 'today' : ''
        } forecast" style="background-color: ${i % 2 === 0 ? '#262936' : ''}">
    <div class="forecast-header" id="today">
    <div class="day">${dayOfWeek}</div>
    <div class=" date">${i === 0 ? `${dayOfMonth} ${month}` : ''}</div>
    </div> 
    <div class="forecast-content" id="current">
    <div class="location">${
      i === 0 ? `${location.name}` : `<img src=${allDay[i].day.condition.icon}`
    } </div>
    <div class="degree">
        <div class="num">${allDay[i].day.avgtemp_c}<sup>o</sup>C</div>
      
        <div class="forecast-icon">
       ${
         i === 0
           ? ` <img src="${current.condition.icon}" alt="" width="90">`
           : `<small>${allDay[i].day.mintemp_c}<sup>o</sup></small>`
       }
           
        </div>	
    
    </div>
    <div class="custom">${allDay[i].day.condition.text}</div>

     ${
       i === 0
         ? `  <span><img src="../image/icon-umberella.png" alt="">${current.wind_mph}%</span>
								<span><img src="../image/icon-wind.png" alt="">${current.wind_kph}km/h</span>
								<span><img src="../image/icon-compass.png" alt="">${current.wind_dir}</span>`
         : ''
     }
  
    </div>
</div>
</div>
`;
      }
      // Clear loading and update with the weather data
      clearLoading();
      document.querySelector('.today').innerHTML = html2;
    } catch (error) {
        clearLoading();
      // If an error occurs (e.g., invalid city), show a user-friendly message
      document.querySelector('.today').innerHTML =
        `Error: ${error.message}. Please try again`;
      console.error('Error fetching weather data:', error);
    }
};



getLocation('cairo')


document.querySelector('#submit').addEventListener('click',function(){
    const city=inpWeather.value.trim()
    if (city) {
        getLocation(city)
        
    }
 
    else {
         document.querySelector(
           '.today'
         ).innerHTML = `Please enter a city name.`;
    }
   
})
// run time search
document.querySelector('#inpWeather').addEventListener('keyup', function () {
  const city = inpWeather.value.trim(); // Get the city name from the input field

  if (city) {
    getLocation(city); // Fetch weather data for the user-provided city
  } 
  else if (inpWeather.value===''){
    getLocation('cairo')
  }
  
  else {
    document.querySelector('.today').innerHTML = 'Please enter a city name.';
  }
  
});
