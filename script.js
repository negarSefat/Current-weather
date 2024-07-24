"use strict";

const inputElement = document.querySelector(".inputEl");

//API info
const apiN = {
  url: "https://api.openweathermap.org/data/2.5/weather?q=",
  key: "da77361534387fc0bcc636167ecbf0b2",
};

//fetch API
const fetchData = function () {
  let countryName = inputElement.value;
  fetch(`${apiN.url}${countryName}&appid=${apiN.key}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      showData(data);
    })
    .catch((err) =>
      renderError(
        `Somethimg went wrong.\n Please enter a valid country or check your Internet connection`
      )
    );
};

//events after pressing enter key
inputElement.addEventListener("keypress", function (k) {
  if (k.keyCode === 13) {
    fetchData();
    document.querySelector(".display").style.opacity = 1;
  }
});

// inputElement.addEventListener("", function () {

//error function
const renderError = function (msg) {
  alert(msg);
  document.querySelector(".display").style.opacity = 0;
  document.qu;
};

//date function
const displayDate = function () {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let now = new Date();
  let day = days[now.getDay()];
  let month = months[now.getMonth()];
  let year = now.getFullYear();
  let date = now.getDate();

  return `"${day}" ${date} ${month} ${year}`;
};

//DOM part
const showData = function (data) {
  const country = document.querySelector(".country");
  country.textContent = `${data.name}`;

  const Date = document.querySelector(".date");
  Date.innerHTML = displayDate("");

  const tempPic = document.querySelector(".tempPicture");
  tempPic.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
  );

  const temp = document.querySelector(".tempreture");
  temp.textContent = `${Math.floor(data.main.temp - 273)} °C`;

  const description = document.querySelector(".description-text");
  description.textContent = `${data.weather[0].description}`;

  const minMax = document.querySelector(".minMax");
  minMax.textContent = `${Math.floor(
    data.main.temp_min - 273
  )}°C / ${Math.floor(data.main.temp_max - 273)}°C`;

  // const Date = new Date(`${data.timezone}`);
  // const time = document.querySelector(".time");
  // time.textContent = `new Date(`${data.timezone}`);`;
};

//display a message
const message = document.createElement("div");
message.classList.add("msg");
message.innerHTML = `Hello. Please enter a country or city name to check the current weather...
<button class='btn'> Got it ! </button>`;
document.body.prepend(message);

const button = document.querySelector(".btn");
button.addEventListener("click", function () {
  message.remove();
});
