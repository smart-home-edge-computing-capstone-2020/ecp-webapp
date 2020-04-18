from flask import Flask
from flask import request
import json 

# Since db_lib in different folder, have to add to path before importing
import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, '../../interaction-layer')
from db_lib import getAllNodes, getNode, getAllInteractions, getInteraction

app = Flask(__name__)

@app.route('/devices')
def devices():
    # TODO: add 'status' to devices
    devices = getAllNodes()
    for d in devices:
        d['status'] = 'todo, integrate with hardware layer'

    return {'devices': devices}

@app.route('/device/<serial>')
def device(serial):
    # TODO: add 'status' to devices
    device = getNode(int(serial))
    device['status'] = 'todo, integrate with hardware layer'
    # TODO: change frontend from 'name' to 'display_name'

    return {'device_dict' : device}

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
