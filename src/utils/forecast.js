const request = require('postman-request');

const my_forecast = (latitude, longitude) => {
	const lat = latitude;
	const lon = longitude;
	const temperature = 20;
	const precipProbability = 5;

	return `It is currently ${temperature} degress out. There is a ${precipProbability} % chance of rain.`;
};

const forecast = (latitude, longitude, callback) => {
	const url =
		'http://api.weatherstack.com/current?access_key=0d46172b06022ebe3de94241f915e9fe&query=NewYork';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to weather service!', undefined);
		} else if (body.error) {
			callback('Unable to find location', undefined);
		} else {
			callback(
				undefined,
				body.daily.data[0].summary +
					' It is currently ' +
					body.currently.temperature +
					' degress out. There is a ' +
					body.currently.precipProbability +
					'% chance of rain.'
			);
		}
	});
};

module.exports = forecast;
