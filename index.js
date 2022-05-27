const searchForm = document.querySelector('.search-loaction');
const cityValue = document.querySelector('.search-loaction input');
const cityName = document.querySelector('.city-name p');
const cardBody = document.querySelector('.card-body');
const timeImage = document.querySelector('.card-top img');
const cardInfo = document.querySelector('.back-card');

const spitOutCelcius = (kelvin) => {
    celcius = Math.round(kelvin - 273.15);
    return celcius;
}
const isDayTime = (icon) => {
    if (icon.includes('d')) { return true }
    else { return false }
}

updateWeatherApp = (city) => {
    console.log(city);
    console.log(new Date(city.dt*1000-(city.timezone*1000)));
    var now = moment(x).format("MM MMM YYYY");
    console.log(now);
    var now2 = moment(x).format("dddd");
    var now3 = moment(x).format("LT");
    
    const imageName = city.weather[0].icon;
    const iconSrc1 = `./icons/${imageName}.gif`;
    cityName.textContent = city.name;
    cardBody.innerHTML = `
          <div class="card-mid row ">
            <div class="col-4 text-center temp ">
              <span class="">${spitOutCelcius(city.main.temp)}&deg;</span>
            </div>

            <div class="col-7 condition-temp px-4" style="margin-left:20px ; margin-bottom:-0; border-left: 2px solid white; ">
              <div class="row city-name" style="color: #ffffff; margin-bottom: 0%;">
                <p style="font-weight: 50; font-size: 1.6em">${city.weather[0].description}</p>  
                <!-- <p>Mumbai</p> -->
              </div>
              <form class="row search-loaction">
                <input type="text" name="city" value="${city.name}" placeholder="" 
                autocomplete="off" class="form-control p-4 shadow-sm" 
                style="border-radius: 10px; 
                background-color: #c4edf6; 
                color: rgb(20, 15, 15); opacity: .5;"/>
              </form>
            </div>
          </div>

          <div class="icon-container card shadow mx-auto m-2">
            <img src="${iconSrc1}" alt="" style="width: 150px; height:auto; border-radius:100%" />
          </div>
          
          <div class="row justify-content-center mx-auto my-3">
            <!-- <div class="w-100"></div> -->
            <div class="row"><span style="font-weight: 50; font-size: 2.6em;">${now2}</span></div>
            <div class="w-100"></div>
            <div class="row"><span style="font-weight: 50; font-size: 2.6em;">${now}</span></div>
            <div class="w-100"></div>
            <div class="row"><span style="font-weight: 50; font-size: 1.8em;">${now3}</span></div>
          </div>

          <div class="card-bottom row m-2 justify-content-center">
            <div class="row">
            <div class="col text-center my-2">
              <div class="icon-container-2 card shadow mx-auto">
                <img src="./icons/wind.gif" alt="" />
              </div>
            </div>
            <div class="col-3 text-center " style="margin-top: 20px;">
              <p>Wind ${city.wind.speed}Km/h</p>
            </div>
      
            <div class="col text-center my-2">
              <div class="icon-container-2 card shadow mx-auto ">
                <img src="./icons/humidity.gif" alt="" />
              </div>
            </div>
            <div class="col-3 text-center" style="margin-top: 20px;">
              <p>Humidity ${city.main.humidity}%</p>
            </div>
          </div>
            <!-- <div class="w-100"></div> -->
          <div class="row">
            <div class="col-3 text-center my-2">
              <div class="icon-container-2 card shadow mx-auto">
                <img src="./icons/distance.gif" alt="" />
              </div>
            </div>
            <div class="col-3 text-center " style="margin-top: 20px;">
              <p>Visibilty ${city.visibilty/1000}Km</p>
            </div>
      
            <div class="col text-center my-2">
              <div class="icon-container-2 card shadow mx-auto ">
                <img src="./icons/pressure.png" alt="" />
              </div>
            </div>
            <div class="col-3 text-center" style="margin-top: 20px;">
              <p>Air Pressure ${city.main.pressure}hPa</p>
            </div>
          </div>
          </div>
          </div>
    `;

    if (isDayTime(imageName)) {
        console.log('day');
        // var col=document.getElementById("body").innerHTML;
        // col.style.color="red";
        // if (card-bottom.classList.contains('text-white')) {
        //   card-bottom.classList.remove('text-white');
        // } else {
        //   card-bottom.classList.add('text-black');
        // }

    } else {
        console.log('night');
        // var col=document.getElementById("demo").innerHTML;
        // col.style.color="white";
        // if (card-bottom.classList.contains('text-black')) {
        //   card-bottom.classList.remove('text-black');
        // } else {
        //   card-bottom.classList.add('text-white');
        // }

    }
}

searchForm.addEventListener('submit', e => {
    e.preventDefault();
    const citySearched = cityValue.value.trim();
    console.log(citySearched);

    requestCity(citySearched)
    .then((data) => {
        updateWeatherApp(data);
    })
    .catch((error) => { console.log(error) })
})