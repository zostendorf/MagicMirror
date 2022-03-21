$(document).ready(function (){

'use strict'
var lat, lon
var intervals = { // time intervals in msecs
  compliment: 10000,
  weather: 300000,
  time: 500,
  fade: 1000
}
var compliments;
var weatherData;
var newsData;

function getDate() {
  $('#date').html(moment().format('dddd, MMMM DD yyyy'))
  setTimeout(this, intervals.time)
}

let clock = () => {
  let date = new Date();
  let hrs = date.getHours();
  let mins = date.getMinutes();
  let secs = date.getSeconds();
  let period = "AM";
  if (hrs == 0) {
    hrs = 12;
  } else if (hrs >= 12) {
    hrs = hrs - 12;
    period = "PM";
  }
  hrs = hrs < 10 ? "0" + hrs : hrs;
  mins = mins < 10 ? "0" + mins : mins;
  secs = secs < 10 ? "0" + secs : secs;

  let time = `${hrs}:${mins}:${secs}`;
  let ampm = `${period}`;
  document.getElementById("time").innerText = time;
  document.getElementById("ampm").innerText = ampm;
  setTimeout(clock, 1000);
};

clock();


function init() {
  //TODO modify so that init() only sets timeouts for each function
  console.log('Updating...')

  // also:
  getDate()

}



async function getWeather() {
	try {
	  const response = await axios.get('https://api.openweathermap.org/data/2.5/weather?lat=33.79989247499206&lon=-84.33728740000274&appid=49053d2e55100df281a6b95714a9f6b7');
	  weatherData = response.data
	  console.log(weatherData)
	  $('#currentTemp').append($('<h1>'+Math.round((((weatherData.main.temp-273.15)*9)/5+32))+'°F</h1>'))
	  $('#tempHigh').append($('<h3>'+Math.round((((weatherData.main.temp_max-273.15)*9)/5+32))+'</h3>'))
	  $('#tempLow').append($('<h3>'+Math.round((((weatherData.main.temp_min-273.15)*9)/5+32))+'</h3>'))
	} catch (error) {
	  console.error(error);
	}
}

async function getForecast() {
	
}

async function getNews() {
  try {
    const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&sortBy=popularity&apiKey=0d86d90cd08e465caded56621316774e');
    newsData = response.data
    console.log(newsData)
    newsData.articles.forEach(function(article) {
      compliments.push(article.title);
      console.log(article.title);
      $('#compliments').append($('<li></li>').text(article.title).addClass('compliment'))
    });
    } catch (error) {
      console.error(error);
    }
  }

function loadCompliments () {
  console.log('Loading compliments...')
  compliments = [
    // TODO load these from a txt file, push to array using Node/Socket

  ]
  // $.each(compliments, function (index, value) {
  //   $('#compliments').append($('<li></li>').text(value).addClass('compliment'))
  // })
}

init()
getWeather()
getNews()
loadCompliments()


jQuery(document).ready(function(){ 
    $(function(){
        $('#compliments li:gt(0)').hide();
				$('.compliment').each(function(el) {
					//parseEmoji(el);
				})
        setInterval(function(){
          $('#compliments :first-child')
						.fadeOut(intervals.fade)
            .next('li')
						.fadeIn(intervals.fade)
            .end().appendTo('#compliments');}, 
          intervals.compliment);
    });
});

// Emoji support via Twemoji (SMS texting comments planned for NodeJS serv):
function parseEmoji(el) {
	console.log('Parsing Emoji...')
  if (el == null) {
    el = document.body
  }
  twemoji.size = '36x36'
  twemoji.parse(el)
	console.log('Parsing Emoji: done.')
}
// function fadeInSequence(elements) {
//   elements.each(function(fadeInDiv) {
//     $(this).delay(fadeInDiv * 100).fadeIn(intervals.fade)
//   })
// }

});
