from flask import Flask
from flask import request

app = Flask(__name__)

@app.route('/devices')
def devices():
    devices = [
        {
            'name': 'bedroom light 1',
            'description': 'light in bedroom 1',
            'status': 'on',
        }
    ]
    return_dict = {'devices': devices}
    return return_dict

@app.route('/device/<device_id>')
def device(device_id):
    device_dict = {
        'name': 'bedroom light 1',
        'description': 'light in bedroom 1',
        'status': 'on'
    }
    return device_dict

@app.route('/comissiondevice')
def addDevice():
    if request.method == 'POST':
        name = request.form.get('name')
        device_type = request.form.get('device_type')
        # do data management with this

@app.route('/interactions')
def interactions():
    interactions_dict = {
        'interactions': [
            {'name': 'morning routine 1'}
        ]
    }
    return interactions_dict