$(document).ready(function (){

'use strict'
var api = 'https://api.darksky.net/forecast/'
var key = ''
key = prompt("Enter DarkSky API key:")
var lat, lon
var intervals = { // time intervals in msecs
  compliment: 10000,
  weather: 300000,
  time: 500,
  fade: 1000
}
var compliments;

function getTime() {
  $('#time').html(moment().format('h:mm'))
  $('#date').html(moment().format('dddd, MMMM d'))
  setTimeout(this, intervals.time)
}

function init() {
  //TODO modify so that init() only sets timeouts for each function
  console.log('Updating...')

	$.ajax({
		url: 'http://ip-api.com/json',
		dataType: 'jsonp',
		success: function(data) {
			lat = data.lat
			lon = data.lon
			var url = api + key + '/' + lat + ',' + lon
			var icons = new Skycons({
				'color': 'white'
			})
			console.log(url);
			$.ajax({
				url: url,
				dataType: 'jsonp',
				success: function(data) {
					// Set icons
					$('#currently').html(data.currently.icon).attr('alt', data.currently.summary)
					icons.set('currently', data.currently.icon)
					icons.play()
					$('#temp').html(Math.round(data.currently.temperature) + '&deg;')
					$('#high').html(Math.round(data.daily.data[0].temperatureMax) + '&deg;')
					$('#low').html(Math.round(data.daily.data[0].temperatureMin) + '&deg;')
					$('#temp .separator').add('span').addClass('separator dim').text('\/')
					$('#minutely').html(data.minutely.summary)
					$('#hourly').html(data.hourly.summary)
					$('#daily').html(data.daily.data[0].summary)
				}
			})
		}
	})
  // refetch weather at interval
  setTimeout(this, intervals.weather)

  // also:
  getTime()

}

function getWeather() {
  // TODO - pull out of init()
}
function getLoc() {
  // TODO - pull out of init()
}

function loadCompliments () {
  console.log('Loading compliments...')
  compliments = [
    // TODO load these from a txt file, push to array using Node/Socket
    'Hello',
    'Good Day',
		'Howdy',
		'Hola!',
		'Aloha',
		'Greetings'
  ]
  $.each(compliments, function (index, value) {
    $('#compliments').append($('<li></li>').text(value).addClass('compliment'))
  })
}

init()
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
