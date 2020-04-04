from flask import Flask
from flask import request
import json 

app = Flask(__name__)

@app.route('/devices')
def devices():
    devices = [
        {
            'id': 1,
            'name': 'bedroom light 1',
            'description': 'light in bedroom 1',
            'status': 'on',
        },
        {
            'id': 2,
            'name': 'bedroom light 2',
            'description': 'light in bedroom 2',
            'status': 'on',
        },
        {
            'id': 3,
            'name': 'bedroom light 3',
            'description': 'light in bedroom 3',
            'status': 'on',
        }
    ]
    return_dict = {'devices': devices}
    return return_dict

@app.route('/device/<device_id>')
def device(device_id):
    device = {
        'device_dict': {
            'id': device_id,
            'name': 'bedroom light 1',
            'description': 'light in bedroom 1',
            'status': 'on',
        }
    }
    return device

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
            {
                'id': 1,
                'name': 'morning routine 1',
                'description': 'I want the lights to turn on five minutes after I wake up.'
            },
            {
                'id': 2,
                'name': 'morning routine 1',
                'description': 'I want the lights to turn on five minutes after I wake up.'
            },
            {
                'id': 3,
                'name': 'morning routine 1',
                'description': 'I want the lights to turn on five minutes after I wake up.'
            }
        ]
    }
    return interactions_dict

@app.route('/interaction/<interaction_id>')
def interaction(interaction_id):
    device = {
        'interaction': {
            'id': interaction_id,
            'name': 'morning routine 1',
            'description': 'When I wake up, lights should turn on after five minutes',
            'trigger_device' : {
                        'id': 2,
                        'name': 'motion sensor 2',
                        'description': 'motion detector in bedroom',
                        'status': 'on',
                    },
            'target_device' : {
                'id': 1,
                'name': 'bedroom light 1',
                'description': 'light in bedroom 1',
                'status': 'on',
            }
        }
    }
    return device

@app.route('/add-device', methods=['POST'])
def add_device():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        print(data['name'])
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 
