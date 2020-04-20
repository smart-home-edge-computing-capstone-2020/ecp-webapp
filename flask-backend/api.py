from flask import Flask
from flask import request
import json 

# Since db_lib in different folder, have to add to path before importing
import sys
# insert at 1, 0 is the script path (or '' in REPL)
sys.path.insert(1, '../../interaction-layer')

from db_lib import getAllNodes, getNode, getAllInteractions, getInteraction, 
from help_lib import *

app = Flask(__name__)

@app.route('/api/devices')
def devices():
    # TODO: add 'status' to devices
    devices = getAllNodes()
    return {'devices': devices}

@app.route('/api/device/<serial>')
def device(serial):
    serial_int = int(serial)
    device = getNode(serial_int)
    statuses = getNodeStatuses([serial_int])
    device['state'] = statuses[serial_int]['status']
    return {'device_dict' : device}

@app.route('/api/interactions')
def interactions():
    interactions = getAllInteractions()
    interactions_dict = { 'interactions': interactions}
    return interactions_dict

@app.route('/api/interaction/<interaction_id>')
def interaction(interaction_id):
    interaction_id = int(interaction_id)
    interaction = getInteraction(interaction_id)
    trigger_device = getNode(interaction['trigger_serial'])
    target_device = getNode(interaction['target_serial'])
    interaction['trigger_name'] = trigger_device['display_name']
    interaction['target_name'] = target_device['display_name']
    return {'interaction': interaction}

@app.route('/add-device', methods=['POST'])
def add_device():
    if request.method == 'POST':
        data = request.get_json()
        print(data)
        print(data['name'])
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 


@app.route('/api/add-interaction', methods=['POST'])
def add_interaction():
    if request.method == 'POST':
        data = request.get_json()
        data['value'] = int(data['value'])
        addInteraction(data)
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/api/set-device', methods=['POST'])
def set_device():
    if request.method == 'POST':
        data = request.get_json()
        serial = int(data['serial'])
        value = data['value']
        setNodeStatus(serial, value)
        return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

@app.route('/api/delete-interaction')
def delete_interaction():
    interaction_id = request.args.get('interaction_id')
    deleteInteraction(interaction_id)
    return json.dumps({'success':True}), 200, {'ContentType':'application/json'} 

#################################################
#################################################
#################################################

# def getNode(serial):
#     print(serial)
#     return {
#         "serial": 1,
#         "ip_address": "1.2.3.4",
#         "is_master": True,
#         "is_broker": False,
#         "is_up": True,
#         "last_up": 1234123,
#         "display_name": "my device yo",
#         "description": "the dopest device for me yo",
#     }

# def getNodeStatuses(serials):
#     print(serials)
#     return {
#         1: {"status": "on like a mothafucka"},
#         2: {"status": "ohio"},
#         3: {"status": "sweet tea jesus"},

#     }

# def getAllNodes():
#     return [
#         {
#         "serial": 1,
#         "ip_address": "1.2.3.4",
#         "is_master": True,
#         "is_broker": False,
#         "is_up": True,
#         "last_up": 1234123,
#         "display_name": "my device yo",
#         "description": "the dopest device for me yo",
#         },
#         {
#         "serial": 2,
#         "ip_address": "1.2.3.4",
#         "is_master": True,
#         "is_broker": False,
#         "is_up": True,
#         "last_up": 1234123,
#         "display_name": "nikos yuted",
#         "description": "its be what it is, nikos device",
#         },
#                 {
#         "serial": 3,
#         "ip_address": "1.2.3.4",
#         "is_master": True,
#         "is_broker": False,
#         "is_up": True,
#         "last_up": 1234123,
#         "display_name": "rips device",
#         "description": "holy hell this rips device",
#         },
#     ]

# def getAllInteractions():
#     return [{
#         "interaction_id": 69,
#         "trigger_serial": 1,
#         "operator": '<',
#         "value": 1,
#         "target_serial": 2,
#         "action": "on",
#         "display_name": "bedroom moves 1",
#         "description": "when i wake up i want coffee",
#     }]

# def getInteraction(serial):
#     return {
#         "interaction_id": 69,
#         "trigger_serial": 1,
#         "operator": '<',
#         "value": 1,
#         "target_serial": 2,
#         "action": "turn on",
#         "display_name": "bedroom moves 1",
#         "description": "when i wake up i want coffee",
#     }

# def setNodeStatus(a, b):
#     print("YOTED THE YTOE")

# def addInteraction(vals):
#     print(vals)

# def deleteInteraction(interaction_id):
#     print(interaction_id)
#     print("deleting")
#     print("ha")