const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

let app = express();

hbs.registerPartials(__dirname + '/views/partials') //określa lokalizacje gdzie umieszczamy partiale
app.set('view engine', 'hbs'); // key value pair


app.use((req, res, next) => { // next to callback jak 2 poprzednie odpalą
	var now = new Date().toString();
	var log = (`${now}: ${req.method} ${req.url}`);
	console.log(log);
	fs.appendFile('server.log', log + '\n', (err) => {
		if (err) {
			console.log('Unable to append to server.log');
		}
	})
	next();
});

app.use((req, res, next) => {
	res.render('maintenance.hbs',{});  // Jezeli zakomentuje całość to wyjde z maintenace
});

app.use(express.static(__dirname + '/public')); //server

hbs.registerHelper('getCurrentYear', function() {// Jeżeli uzywamy tej samej funckji wszędzie to robimy helper
	return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
	return text.toUpperCase();
})

app.get('/', (req, res) => {
	// res.send('Hello');
	res.render('mypage.hbs',{ //po przecinku tworzymy obiekt który wstrzykujemy 
		pageTitle: 'My page',
		welcomeMessage: 'Elo Bartek',
		name: "Bartek"
	});
});
app.get('/about', (req, res)=> {
	res.render('about.hbs',{ //po przecinku tworzymy obiekt który wstrzykujemy 
		pageTitle: 'About page',
		name: "Bartek"
	});
});
app.get('/help', (req,res) => {
	res.send({
		errorMessage: "chuj pompke strzeił"
	})
});
app.listen(3000);

