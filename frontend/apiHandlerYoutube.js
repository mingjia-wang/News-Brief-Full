var request = new XMLHttpRequest();

request.open('GET', "http://127.0.0.1:5000/youtube", true);
request.onload = function() {

	var data = JSON.parse(this.response);

	if (request.status < 200 || request.status > 400) {
		console.log(request.status);
	} else {
		var tnTable = document.querySelectorAll(".thumbnail");
		var ytTable = document.querySelectorAll(".youtube");

		Array.range = (start, end) => Array.from({length: (end - start)}, (v, k) => k + start);

		console.log(data);

		for (var i in Array.range(0,5)) {

			tnTable[i].innerHTML = "<a href=\"https://www.youtube.com/watch?v=" + data["items"][i]["id"]["videoId"] + "\"><img src=\"" + data["items"][i]["snippet"]["thumbnails"]["default"]["url"] + "\"></a>"
			ytTable[i].innerHTML = "<a href= \"https://www.youtube.com/watch?v=" + data["items"][i]["id"]["videoId"] + "\"><h5 class=\"title\">" + data["items"][i]["snippet"]["title"] + 
			"</h5></a>\n" + "<p class=\"desc\">" + data["items"][i]["snippet"]["description"].substring(0,90)+"..." + 
			"</p>" + "<p class=\"link\">";

		}
	}

	
	
}

request.send();
