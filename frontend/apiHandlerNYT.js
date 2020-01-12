var request = new XMLHttpRequest();

request.open('GET', "http://127.0.0.1:5000/nyt", true);
request.onload = function() {

	var data = JSON.parse(this.response);

	if (request.status < 200 || request.status > 400) {
		console.log(request.status);
	} else {

		var table = document.querySelectorAll(".nyt");

		Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

		console.log(data);

		for (var i in Array.range(0,5)) {

			table[i].innerHTML = "<a href=\"" + data["results"][i]["url"] + "\"><h5 class=\"headline\">" + data["results"][i]["title"] + 
			"</a></h5>\n" + "<p class=\"desc\">" + data["results"][i]["abstract"].substring(0,100) + "...</p>";
		}
	}

	
	
}

request.send();
