import React from 'react';
import EcpNavbar from './EcpNavbar';
import './../style/Devices.css'
import { Button, Container, Row, Col } from 'react-bootstrap';

const DevicelistDevice = (device) => (
    <a href={"/device/" + device.id} >
        <Row className="device">
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
        }
    }

    componentDidMount() {
        // gets the state from the backend
        this.setState({
            devices: [
                {id: 1, name: "bedroom light 1", description: "device 1 description"},
                {id: 2, name: "coffee pot", description: "Keurig in the kitchen"},
                {id: 3, name: "kitchen light 1", description: "light in the kitchen"},
            ]
        })
    }

    render() {
        const {devices} = this.state;
        return (
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
                            <Button variant="outline-secondary">
                                Add a new device
                            </Button>
                        </Container>
                    </div>
                }
            </div>
        );
    }
}
export default Devices;
