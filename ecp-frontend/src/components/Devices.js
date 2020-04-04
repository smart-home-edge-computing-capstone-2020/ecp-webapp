import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Devices.css'
import { Button, Modal, Form, Container, Row, Col } from 'react-bootstrap';

const DevicelistDevice = (device) => (
    <a href={"/device/" + device.id} >
        <Row className="device-list-device">
            <Col><div className="device-logo"></div></Col>
            <Col>
                <h1>
                    {device.name}
                </h1>
                <p>
                    {device.description}
                </p>
            </Col>
        </Row>
    </a>
)

class Devices extends React.Component {

    constructor() {
        super();
        this.state = {
            devices: null,
            showDeviceModal: false,
            deviceInfo: {
                name: null,
                description: null,
                ip: null,
                deviceType: null,
            }
        }
    }

    componentDidMount() {
        // gets the state from the backend
        this.getDevices();
    }

    getDevices() {
        fetch('/devices').then(res => res.json()).then(data => {
           this.setState({devices: data.devices}) 
        })
    }

    showDeviceModal = () => {
        this.setState({showDeviceModal: true})
    }
    
    handleClose = () => {
        this.setState({showDeviceModal: false});
    }
    
    handleInputChange = (e) => {
        var {deviceInfo} = this.state;
        deviceInfo[e.target.name] = e.target.value;
        this.setState({
            deviceInfo: deviceInfo,
        });
    };

    handleSelectChange = (e) => {
        const {deviceInfo} = this.state;
        const deviceType = e.target.value;
        deviceInfo["deviceType"] = deviceType;
        this.setState({deviceInfo: deviceInfo})
      }

    saveDevice = event => {
        console.log(this.state);
        event.preventDefault();
        fetch('/add-device', {
            method: 'POST',
            body: JSON.stringify(this.state.deviceInfo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    } 

    render() {
        const {devices, showDeviceModal} = this.state;
        return (
            <div>
                <div className="devices">
                    <EcpNavbar/>
                    <div className="page-name">
                        <h1>Devices</h1>
                    </div>
                    {devices &&
                        <div className="device-list">
                            <Container>
                                {
                                    devices.map((device) => DevicelistDevice(device))
                                }
                                <Button variant="outline-secondary" onClick={this.showDeviceModal}>
                                    Add a new device
                                </Button>
                            </Container>
                        </div>
                    }
                </div>    
                <Modal show={showDeviceModal} onHide={this.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new device to the system</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.saveDevice}>
                        <Modal.Body>
                            <Form.Group controlId="deviceForm.Name">
                                <Form.Label>Device name</Form.Label>
                                <Form.Control name="name" type="text" placeholder="Enter the name of your device" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="deviceForm.Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="Enter a description for your device" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="deviceForm.Ip">
                                <Form.Label>IP Address</Form.Label>
                                <Form.Control name="ip" type="text" placeholder="Enter the IP address of your device" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="deviceForm.DeviceType">
                                <Form.Label>Device Type</Form.Label>
                                <Form.Control as="select" name="deviceType" onChange={this.handleSelectChange}>
                                    <option value="lightbulb">Lightbulb</option>
                                    <option value="motion_detector">Motion Detector</option>
                                    <option value="thermometer">Thermometer</option>
                                    <option value="thermostat">Thermostat</option>
                                </Form.Control>
                            </Form.Group>

                        </Modal.Body>

                        <Modal.Footer>
                            <Button variant="primary" type="submit" onClick={this.handleClose}>Save address</Button>
                        </Modal.Footer>
                        </Form>
                </Modal>            
            </div>

        );
    }
}
export default Devices;
