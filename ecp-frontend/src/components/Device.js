import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Device.css'
import { Button } from 'react-bootstrap';

class Device extends React.Component {

    constructor() {
        super();
        this.state = {
            device: null,
            serial: null,
        }
    }

    componentDidMount() {
        // get the device via id from the backend
        const serial = this.props.match.params.serial;
        this.setState({serial: serial});
        this.getDevice(serial);
        console.log(serial);
    }

    getDevice = (serial) => {
        const fetchurl = '/device/' + serial;
        console.log(fetchurl)
        fetch(fetchurl).then(res => res.json()).then(data => {
            this.setState({device: data.device_dict})
        })
    }

    render() {
        const {device} = this.state;
        return (
            <div className="device-page">
                <EcpNavbar/>
                {device &&
                    <div>
                        <div className="page-name">
                            <h1>{device.display_name}</h1>
                        </div>
                        <div className="device">
                            <div className="device-details">
                                Description: {device.description}
                            </div>
                            <div className="device-status">
                                Status: {device.status}
                            </div>
                            <div>
                                <Button variant="btn btn-outline-dark">
                                    Turn off
                                </Button>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )

    }
}

export default Device;