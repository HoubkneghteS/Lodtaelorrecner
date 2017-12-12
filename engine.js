var dRate = 8; //deaths per thousand people per year
var bRate = 1.6; //children per woman
var immigration = 110000; //immigrants per year
var year = 2017; //starting year of simulation
var lFertilityLimit = 20; //age where simulated people start becoming mothers
var uFertilityLimit = 40; //ending age for this process
var deaths = 0;
var births = 0;

//population array -- year by year
var pop = [
	680000,
	590000,
	510000,
	498000,
	480000,
	490000,
	500000,
	580000,
	620000,
	680000,
	700000,
	720000,
	760000,
	760000,
	760000,
	800000,
	900000,
	850000,
	700000,
	820000,
	850000,
	800000,
	700000,
	700000,
	950000,
	1050000,
	1050000,
	1230000,
	1100000,
	1200000,
	1180000,
	1200000,
	1010000,
	1090000,
	1210000,
	1480000,
	1510000,
	1810000,
	1970000,
	1850000,
	1610000,
	1400000,
	1300000,
	1250000,
	1110000,
	1100000,
	1170000,
	1000000,
	1020000,
	1170000,
	1150000,
	960000,
	990000,
	950000,
	900000,
	960000,
	700000,
	550000,
	400000,
	300000,
	450000,
	500000,
	600000,
	630000,
	700000,
	660000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	600000,
	380000,
	350000,
	260000,
	190000,
	170000,
	170000,
	150000,
	150000,
	150000,
	120000,
	110000,
	110000,
	70000,
	50000,
	40000,
	59000,
	60000,
	20000,
	10000,
	9000,
	4500,
	4000,
	4000
];

//inner html function
function innerHtml(id, content) {
	document.getElementById(id).innerHTML = content;
}

//sum for population
function sum(start, end) {
	var total = 0;
	for (var i = start; i < end; i++){
		total = total + pop[i];
	}
	return total;
}

//changing birth rate
function bChange(number) {
	bRate += number;
	if (bRate < 0) bRate = 0;
	start();
}

//changing immigration
function imChange(number) {
	immigration = number;
	start();
}

//changing death rate
function dChange(number) {
	dRate += number;
	if (dRate < 0) dRate = 0;
	start();
}

//rendering the data
function start() {
	//population tree
	for(var i = 0; i < 100; i += 5) {
		innerHtml(i, sum(i, i+4) + ` (${i} - ${i+4})`);
		document.getElementById(i).style.width = 22 + sum(i, i+4) / sum(0, pop.length) * 200 + "%";
	}
	innerHtml("100", pop[100] + " (100+)");
	document.getElementById(i).style.width = 22 + pop[100] / sum(0, pop.length) * 200 + "%";

	//overall stats
	innerHtml("death", "<b>Deaths:</b> " + deaths);
	innerHtml("birth", "<b>Births:</b> " + births);
	innerHtml("total", "<b>Population:</b> " + sum(0, pop.length));
	innerHtml("deathrate", "<b>Deathrate:</b> " + dRate.toFixed(1));
	innerHtml("birthrate", "<b>Birthrate:</b> " + bRate.toFixed(1));
	innerHtml("immigration", "<b>Immigration:</b> " + immigration);
	innerHtml("year", year)
}

//simulates 1 year
function simulate() {
	
	//ages population by 1 year
	for(var i = 99; i >= 0; i--){
		pop[i+1] += pop[i];
		pop[i] = 0;
	}
	
	var oldPop = sum(0, pop.length);
	
	//polynomial death rate equation
	for(var i = 0; i <= 100; i++) {
		pop[i] = Math.floor(pop[i] * (1 - dRate * (0.0000000000000015 *  Math.pow(i-18, 7) + dRate * 0.00007)));
	}
	
	deaths = oldPop - sum(0, pop.length); //calculates number of deaths
	var deathPop = sum(0, pop.length);
	
	//simulates births
	var mothers = 0;
	
	for(var i = lFertilityLimit; i <= uFertilityLimit; i++) {
		mothers += pop[i]/2;
	}
	
	pop[0] += Math.ceil(mothers * bRate / (uFertilityLimit - lFertilityLimit)); //adds number to infant population
	births = sum(0, pop.length) - deathPop; //calculates number of births
	
	//calculates immigration
	for(var i = 20; i <= 40; i++) {
		pop[i] += Math.round(immigration/20);
	}
	for(var i = 0; i <= 100; i++) {
		if (pop[i] < 0) pop[i] = 0; //extreme case fixer
	}
	
	year++; //increments year
	start();
}