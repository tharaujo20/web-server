const path = require('path');
const express = require('express');
const hbs = require('hbs');
const forecast = require('./utils/forecast');
const geo = require('./utils/geocode');
const geocode = require('./utils/geocode');

const app = express();
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
	res.render('index', {
		title: 'Weather App',
		name: 'Example Name',
	});
});

app.get('/help', (req, res) => {
	res.render('help', {
		helpText: 'This is the help page',
		title: 'Help Page',
		name: 'Example name',
	});
});

app.get('/about', (req, res) => {
	res.render('about', {
		title: 'About Weather App',
		name: 'Example Name',
	});
});

app.get('/weather', (req, res) => {
	if (!req.query.address) {
		res.send({
			error: 'Ops, something went wrong. Provide an address',
		});
	}

	// const geo = geocode(req.query.address);
	// const fc = forecast(geo.latitude, geo.longitude);

	// res.send({
	// 	forecast: fc,
	// 	location: geo.location,
	// 	address: req.query.address,
	// });

	geocode(req.query.address, (error, { lat, lon, location }) => {
		if (error) return res.send({ error });

		forecast(lat, lon, (error, forecast) => {
			if (error) return res.send({ error });

			res.send({
				forecast: forecast,
				location: location,
				address: req.query.address,
			});
		});
	});
});

//-----

app.get('/products', (req, res) => {
	if (!req.query.search) {
		res.send({
			error: 'Ops, something went wrong',
		});
	}

	console.log(req.query.search);
	res.send({
		products: [],
	});
});

app.get('/help/*', (req, res) => {
	res.render('error', {
		title: 'Another help page',
		name: 'Example name',
		error: 'Ops! Something went wrong',
	});
});

app.get('*', (req, res) => {
	res.render('error', {
		title: 'Page not found',
		name: 'Example name',
		error: 'Ops! Something went wrong',
	});
});

app.listen(3000, () => {
	console.log('Server is up on port 3000');
});
