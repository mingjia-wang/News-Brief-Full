import json
import urllib.parse
import urllib.request

from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route('/nyt')
def get_nyt_data():
	return _get_result(_build_nyt_api_url(get_key('nyt')))

@app.route('/youtube')
def get_youtube_data():
	return _get_result(_build_youtube_api_url(get_key('yt')))

def get_key(api: str):

	file = open('keys.txt', 'r')
	text = file.readlines()
	if api == 'nyt':
		return text[0]
	else:
		return text[1]

def _build_nyt_api_url(api_key: str) -> str:

    query_parameters = [('api-key', api_key)]
                      
    return 'https://api.nytimes.com/svc/topstories/v2/home.json?' + urllib.parse.urlencode(query_parameters)
    
def _build_youtube_api_url(api_key: str) -> str:

    query_parameters = [
    					('key', api_key), ('part', 'snippet'),
    					('type', 'video'), ('maxResults', '10'),
    					('q', 'cats')]
                      
    return 'https://www.googleapis.com/youtube/v3/search/?' + urllib.parse.urlencode(query_parameters)

def _get_result(url: str) -> dict:
    
    response = None

    try:
        response = urllib.request.urlopen(url)
        json_text = response.read().decode(encoding = 'utf-8')
        return json.loads(json_text)
    finally:
        if response != None:
            response.close()

if __name__ == "__main__":
	app.run(debug=True)
