
// create an SVG image for each side of the dice 
// indexed by side value
var reg_poss_results = [
	"<img src=\"./img/zero.svg\"  alt=\"0\" width=\"25\"/>", //0
	"<img src=\"./img/one.svg\"   alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/two.svg\"   alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/three.svg\" alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/four.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/five.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/six.svg\"   alt=\"6\" width=\"25\"/>"];//6

var d2_poss_results = [
	"<img src=\"./img/d2_0.svg\"  alt=\"0\" width=\"25\"/>", //Tails
	"<img src=\"./img/d2_1.svg\"  alt=\"1\" width=\"25\"/>"];//Heads

var d8_poss_results = [
	"<img src=\"./img/d8_1.svg\"  alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/d8_2.svg\"  alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/d8_3.svg\"  alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/d8_4.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/d8_5.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/d8_6.svg\"  alt=\"6\" width=\"25\"/>", //6
	"<img src=\"./img/d8_7.svg\"  alt=\"7\" width=\"25\"/>", //7
	"<img src=\"./img/d8_8.svg\"  alt=\"8\" width=\"25\"/>"];//8

var d12_poss_results = [
	"<img src=\"./img/d12_1.svg\"  alt=\"1\" width=\"25\"/>", //1
	"<img src=\"./img/d12_2.svg\"  alt=\"2\" width=\"25\"/>", //2
	"<img src=\"./img/d12_3.svg\"  alt=\"3\" width=\"25\"/>", //3
	"<img src=\"./img/d12_4.svg\"  alt=\"4\" width=\"25\"/>", //4
	"<img src=\"./img/d12_5.svg\"  alt=\"5\" width=\"25\"/>", //5
	"<img src=\"./img/d12_6.svg\"  alt=\"6\" width=\"25\"/>", //6
	"<img src=\"./img/d12_7.svg\"  alt=\"7\" width=\"25\"/>", //7
	"<img src=\"./img/d12_8.svg\"  alt=\"8\" width=\"25\"/>", //8
	"<img src=\"./img/d12_9.svg\"  alt=\"9\" width=\"25\"/>", //9
	"<img src=\"./img/d12_10.svg\" alt=\"10\" width=\"25\"/>", //10
	"<img src=\"./img/d12_11.svg\" alt=\"11\" width=\"25\"/>", //11
	"<img src=\"./img/d12_12.svg\" alt=\"12\" width=\"25\"/>"];//12

function rollDice(num_die1, num_die2) {
	var subtotal, total, i, result;
	var is_d2 = false;
	var is_d6 = false; // d3 and d6 share the same image array
	var is_d8 = false;
	var is_d12 = false;
	var tmp = "" // minimize updates in browser
	total = 0;   // cumulative dice values
	subtotal = 0; // each set's value
	if(num_die1 <= 0 || num_die2 < 0) { // second set may be zero
		document.getElementById("results").innerHTML = "<p>You must roll at least one die.</p>";
		return;
	}
	if(num_die1 > 1000 || num_die2 > 1000) {
		document.getElementById("results").innerHTML = "<p>That is too many dice! (limit 1000)</p>";
		return;
	}
	// roll the first set
	for (i = 0; i < num_die1; i++) {
		if(document.getElementById("twoside1").checked) {
			result = roll(0,2);
			is_d2 = true;
		} else if(document.getElementById("sixside1").checked) {
			result = roll(1,7);
			is_d6 = true;
		} else if(document.getElementById("threeside1").checked) {
			result = roll(0,3);
			is_d6 = true;
		} else if(document.getElementById("eightside1").checked) {
			result = roll(1,9);
			is_d8 = true;
		} else if(document.getElementById("twelveside1").checked) {
			result = roll(1,13);
			is_d12 = true;
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		subtotal += result;
		if(0 == i%8) { // wrap every 8 dice
			tmp += "<br/>";
		}
		if(is_d2 == true) {
			tmp += d2_poss_results[result];
		} else if(is_d6 == true) {
			tmp += reg_poss_results[result];
		} else if(is_d8 == true) {
			tmp += d8_poss_results[result-1];
		} else if(is_d12 == true) {
			tmp += d12_poss_results[result-1];
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		if(i != num_die1 - 1) { // comma separate
			tmp  += ", ";	
		}
	}
	if(num_die2 > 0) { //only print if 2 sets rolled
		tmp += "<br/><b>Set 1 Total: " + subtotal + "</b>";
	}
	// accumulate
	total = subtotal;
	// roll the second set
	subtotal = 0; // reset
	is_d2 = false;
	is_d6 = false; 
	is_d8 = false;
	is_d12 = false;
	for (i = 0; i < num_die2; i++) {
		if(document.getElementById("twoside2").checked) {
			result = roll(0,2);
			is_d2 = true;
		} else if(document.getElementById("sixside2").checked) {
			result = roll(1,7);
			is_d6 = true;
		} else if(document.getElementById("threeside2").checked) {
			result = roll(0,3);
			is_d6 = true;
		} else if(document.getElementById("eightside2").checked) {
			result = roll(1,9);
			is_d8 = true;
		} else if(document.getElementById("twelveside2").checked) {
			result = roll(1,13);
			is_d12 = true;
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		subtotal += result;
		if(0 == i%8) { // wrap every 8 dice
			tmp += "<br/>";
		}
		if(is_d2 == true) {
			tmp += d2_poss_results[result];
		} else if(is_d6 == true) {
			tmp += reg_poss_results[result];
		} else if(is_d8 == true) {
			tmp += d8_poss_results[result-1];
		} else if(is_d12 == true) {
			tmp += d12_poss_results[result-1];
		} else { // something went wrong
			document.getElementById("results").innerHTML = "<p>Please select dice type.</p>";
			return;
		}
		if(i != num_die2 - 1) { // comma separate
			tmp  += ", ";	
		}
	}
	if(num_die2 > 0) { //only print if 2 sets rolled
		tmp += "<br/><b>Set 2 Total: " + subtotal + "</b>";
		total += subtotal;
	}
	tmp += "<br/><h3>Grand Total: " + total + "</h3><br/>";
	// write out to web page
	document.getElementById("results").innerHTML = tmp;
}

function roll(lo, hi) { // hi bound not inclusive
	return Math.floor(Math.random() * (hi-lo) + lo);
}
