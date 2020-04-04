import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Device.css'
import { Button } from 'react-bootstrap';

class Device extends React.Component {

    constructor() {
        super();
        this.state = {
            device: null,
            device_id: null,
        }
    }

    componentDidMount() {
        // get the device via id from the backend
        const device_id = this.props.match.params.id;
        this.setState({device_id: device_id});
        this.getDevice(device_id);
        console.log(device_id);
    }

    getDevice = (device_id) => {
        const fetchurl = '/device/' + device_id;
        console.log(fetchurl)
        fetch(fetchurl).then(res => res.json()).then(data => {
            this.setState({device: data.device_dict})
        })
        console.log("hi")
    }

    render() {
        const {device} = this.state;
        return (
            <div className="device-page">
                <EcpNavbar/>
                {device &&
                    <div>
                        <div className="page-name">
                            <h1>{device.name}</h1>
                        </div>
                        <div className="device">
                            <div className="device-details">
                                {device.description}
                            </div>
                            <div>
                                Status: on
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