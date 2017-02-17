import os
import json
from flask import Flask, jsonify, render_template
from apiclient.discovery import build

app = Flask(__name__, template_folder='js/build', static_folder='js/build/static')

service = build("customsearch", "v1", developerKey=os.getenv('GOOGLE_KEY'))

@app.route('/')
def index():
    return render_template('index.html')
@app.route('/hola')
def hola():
    return 'Hola!'
@app.route('/api/')
def api():
    res = service.cse().list(
        q='python',
        cx=os.getenv('GOOGLE_CX'),
        searchType='image',
        filter='1',
        num=10,
        imgType='photo',
        safe= 'high'
    ).execute()
    print json.dumps(res, sort_keys=True, indent=4)
    return jsonify(res)

port = os.getenv('VCAP_APP_PORT', '5000')
if __name__ == "__main__":
    app.run(host='0.0.0.0', port=int(port))

