//const request = require('postman-request');

const geocode = (address) => {
	const ad = address;
	return {
		latitude: '53.483959',
		longitude: '-2.244644',
		location: 'Manchester, England, UK',
	};
};

const old_geocode = (address, callback) => {
	const url =
		'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
		address +
		'.json?access_token=pk.eyJ1IjoiYW5kcmV3bWVhZDEiLCJhIjoiY2pvOG8ybW90MDFhazNxcnJ4OTYydzJlOSJ9.njY7HvaalLEVhEOIghPTlw&limit=1';

	request({ url, json: true }, (error, { body }) => {
		if (error) {
			callback('Unable to connect to location services!', undefined);
		} else if (body.features.length === 0) {
			callback('Unable to find location. Try another search.', undefined);
		} else {
			callback(undefined, {
				latitude: '53.483959',
				longitude: '-2.244644',
				location: 'Manchester',

				// latitude: body.features[0].center[1],
				// longitude: body.features[0].center[0],
				// location: body.features[0].place_name,
			});
		}
	});
};

module.exports = geocode;
