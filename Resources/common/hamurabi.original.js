/*
	Main logic of the game
*/

// game variables
var NOTPLAYING = 0;
var PLAYING = 1;
var population;
// current population
var year;
// current year
var bushels;
// bushels in storage
var acreage;
// acreage
var landprice;
// bushels per acre for land
var feeding;
// bushels of grain to feed folks
var planting;
// number of acres planted
var trading;
var gamestate = NOTPLAYING;
// status of the game
var random_number = {
	m: 714025,
	a: 4096,
	c: 150889,
	seed: (new Date()).getTime() % random_number.m
};

// ///////////////////////FUNCTION PRINTF ////////////////////////
function printf(form, data) {
	// TIM: updates the textarea with data from each round
	form.commentwin.value += data;
}

function go(form) {

	if(gamestate == NOTPLAYING) {
		gamestate = PLAYING;
		startgame(form);
		yearly_report(form, 5, 0, 3, 200);
	} else {
		advanceyear(form);
	}
	//    yearly_report(form, 0, 0, 0, 0);
}

// ///////////////////////FUNCTION RANDOM_NUMBER /////////////////
function rand(tops) {// From JavaScript, The Definitive Guide, Page 468
	random_number.seed = (random_number.seed * random_number.a + random_number.c) % random_number.m;
	return Math.floor((random_number.seed / random_number.m) * tops);
}

// ///////////////////////FUNCTION STARTGAME //////////////////////////
function startgame(form) {
	//    printf(form,"Try your hand at governing ancient Samaria\r\nfor a 10-year term of office");
	rats = 200;
	year = 1;
	g4 = 50;
	bushels = 2800;
	population = 100;
	acreage = 1000;
}

// ///////////////////////FUNCTION YEARLY_REPORT //////////////////////////
function yearly_report(form, newcomers, starved, yield, eaten, plague) {
	form.commentwin.value = "";
	var trading = getTrading(form);
	food = form.foodamount.value;
	planting = form.plantamount.value;
	printf(form, "Hamurabi, I beg to report that in year " + year + ":\n");
	if(starved == 1) {
		printf(form, "  1 person starved, and");
	} else {
		printf(form, "  " + starved + " people starved, and");
	}
	if(newcomers == 1) {
		printf(form, " 1 person came to the city.\n");
	} else {
		printf(form, " " + newcomers + " people came to the city.\n");
	}

	//    plague = rand(11);
	if(plague == 0) {
		population -= Math.round(population / 2);
		printf(form, "  The plague killed half the people.\n");
	}
	printf(form, "  The population is now " + population + ".\n");
	printf(form, "  We harvested " + (yield * planting) + " bushels at " + yield + " bushels per acre.\n");
	printf(form, "  Rats destroyed " + eaten + " bushels, leaving " + bushels + " in storage.\n");
	printf(form, "  The city owns " + acreage + " acres of land.\n");
	landprice = 17 + rand(6);
	printf(form, "  Land is worth " + landprice + " bushels per acre.\n");

	clearInputs(form);
	updateData(form);
}

// ///////////////////////FUNCTION ADVANCEYEAR //////////////////////////
function advanceyear(form) {
	var bushelsperacre;
	// harvest (bushels per acre)
	var harvested;
	// grain harvested for the year
	var eaten;
	// amount rats ate
	var arrived;
	// people who moved to city
	var starved = 0;
	// people who starved
	var newcomers;
	year++;

	// test for valid inputs
	var retval = 0;
	if(gamestate != PLAYING)
		return -1;
	var trading = getTrading(form);
	var feeding = getFeeding(form);
	planting = getPlanting(form);
	var bushelsleft = bushels - (trading * landprice) - feeding - Math.floor((planting + 1) / 2);
	var acresleft = acreage + trading;

	if(bushelsleft < 0 || acresleft < 0 || planting > population * 10 || planting > acresleft) {
		alert("Hamurabi! Think again -- you only have\n" + population + " people, " + acreage + " acres, and " + bushels + " bushels in storehouses.");
		return -1;
	}

	// let's see how the year goes...
	bushels = 1 * form.storewin.value;
	acreage = 1 * form.acrewin.value;
	plague = rand(11);

	// calculate the harvest yield (bushels per acre)
	yield = rand(5) + 1;
	harvested = yield * getPlanting(form);
	bushels += harvested;

	// rats are running wild
	// take the new grain amount after feeding and harvest
	// multiply by a random number from 0 to 1, times .07
	// that is the amount eaten
	eaten = rand(bushels * .07);
	bushels -= eaten;

	// how many people had full tummies?
	full = Math.floor(getFeeding(form) / 20);
	if(full < population) {
		starved = population - full;
		population = full;
	}

	// let's have some newcomers
	newcomers = 0;
	if(starved > 0) {
		newcomers = Math.floor(starved / 2);
	}
	newcomers += Math.floor((5 - yield) * bushels / 600 + 1);
	if(newcomers > 50)
		newcomers = 50;
	if(newcomers < 0)
		newcomers = 0;
	population += newcomers;

	yearly_report(form, newcomers, starved, yield, eaten, plague)
}

function getTrading(form) {
	return trading;
}

function getFeeding(form) {
	feeding = Math.floor(form.foodamount.value);
	if(!(feeding > 0)) {
		feeding = 0;
	}
	form.foodamount.value = feeding;
	return feeding;
}

function getPlanting(form) {
	planting = Math.floor(form.plantamount.value);
	if(!(planting > 0)) {
		planting = 0;
	}
	form.plantamount.value = planting;
	return planting;
}

function cheat(form) {
	var maxgrain = bushels + (landprice * acreage);

	// solve equation for maximum number of acres that can be supported:
	// cansupport*2.5 = maxgrain-(cansupport*landprice)
	// cansupport*(2.5+landprice) = maxgrain
	// cansupport = maxgrain / (2.5+landprice)
	var cansupport = Math.floor(maxgrain / (2.5 + landprice));

	var debugmsg = "maxgrain is " + maxgrain + "\nAt most you can support " + cansupport + " acres";
	var landdesired;
	// the amount of land we plan to have after trading
	if(population * 10 < (cansupport)) {
		landdesired = population * 10;
		var excess = Math.floor((maxgrain - 25 * population) / landprice) - landdesired;
		//alert ("maxgrain "+maxgrain+", landprice "+landprice+", landdesired "+landdesired);

		// Now "day trade" the land
		var lowprice = 17;
		var highprice = 22;
		var targetratio = (highprice - landprice) / (highprice - lowprice);
		var targetacres = Math.floor(excess * targetratio);
		landdesired += targetacres;
		debugmsg += "\nYour target ratio for land is " + targetratio + "\nYou have an excess of " + excess + " to play with" + "\nYou want to own " + targetacres + " extra acres";
		feeding = population * 20;
		planting = population * 10;
	} else {
		landdesired = cansupport;
		feeding = Math.floor(landdesired / 10) * 20;
		planting = landdesired;
	}
	trading = landdesired - acreage;
	if(trading >= 0) {
		form.tradetype[0].checked = 1;
		form.tradeamount.value = trading;
	} else {
		form.tradetype[1].checked = 1;
		form.tradeamount.value = -trading;
	}
	form.foodamount.value = feeding;
	form.plantamount.value = planting;

	updateData(form);
	debugmsg += "\nYou desire a total of " + landdesired + " acres" + "\nYou have " + acreage + " acres" + "\nSo you should buy " + trading + " acres" + "\nWe will feed our people " + feeding;

	//    alert(debugmsg);
}

/*
 scratch

 at 21800 (mg), you can
 buy 1000 acres (cs)
 and still have 3800 bushels left (mg-cs*lp)
 to feed and plant
 this amount must be equal to 2.5*cs

 so
 25*cs = mg-(cs*lp)
 cs*(25+lp) = mg
 cs = mg/(25+lp)
 */

function updateTrade(form) {
	var retval = 0;
	if(gamestate != PLAYING)
		return -1;

	var val = form.tradeamount.value
	if(val == "c" || val == "c0" || val == "0c") {
		cheat(form);
		return;
	}
	trading = Math.floor(val);
	if(!(trading > 0)) {
		trading = 0;
	}
	form.tradeamount.value = trading;
	if(form.tradetype[1].checked) {
		trading = -trading;
	}

	if(-trading > acreage) {
		alert("Hamurabi! Think again -- you only have " + acreage + " acres.")
		retval = -1;
	}
	if(trading * landprice > bushels) {
		alert("Hamurabi! Think again -- you only have " + bushels + " bushels\nin storehouses to buy land with.");
		retval = -1;
	}
	return (updateData(form) && retval);
}

function updateFood(form) {
	var retval = 0;
	if(gamestate != PLAYING)
		return -1;
	var trading = getTrading(form);
	feeding = getFeeding(form);
	var bushelsleft = bushels - (trading * landprice);
	if(feeding > bushelsleft) {
		var msg = "Hamurabi! Think again -- you only have " + bushelsleft + " bushels\nin storehouses";
		if(trading == 0) {
			msg += ".";
		} else if(trading > 0) {
			msg += " (after buying land).";
		} else {
			msg += " (after selling land).";
		}
		alert(msg);
		retval = -1;
	}
	return (updateData(form) && retval);
}

function updatePlant(form) {
	var retval = 0;
	if(gamestate != PLAYING)
		return -1;
	var trading = getTrading(form);
	var feeding = getFeeding(form);
	planting = getPlanting(form);
	var bushelsleft = bushels - (trading * landprice) - feeding;
	var acresleft = acreage + trading;
	if(planting > bushelsleft * 2) {
		var msg = "Hamurabi! Think again -- you only have " + bushelsleft + " bushels\nin storehouses (after feeding your people).";
		alert(msg);
		retval = -1;
	} else if(planting > population * 10) {
		alert("Hamurabi! Think again -- you only have " + population + " people\nto plant the grain.");
	} else if(planting > acresleft) {
		alert("Hamurabi! Think again -- you only have " + acresleft + " acres of land\nto plant on.");
	}
	return (updateData(form) && retval);
}

function updateData(form) {
	if(gamestate != PLAYING)
		return;

	var trading = getTrading(form);
	var feeding = getFeeding(form);
	var planting = getPlanting(form);
	form.storewin.value = bushels - (trading * landprice) - feeding - Math.floor((planting + 1) / 2);
	form.acrewin.value = 1 * acreage + trading;

	form.popwin.value = population;
	form.landpwin.value = landprice;
}

function clearInputs(form) {
	form.tradetype[0].checked = 1;
	trading = feeding = planting = 0;
	form.tradeamount.value = 0;
	form.foodamount.value = 0;
	form.plantamount.value = 0;
	form.tradeamount.focus();
}