import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Device.css'
import { Button } from 'react-bootstrap';

class Device extends React.Component {

    constructor() {
        super();
        this.state = {
            device: null,
        }
    }

    componentDidMount() {
        // get the device via id from the backend
        this.setState({device: 
            {id: 1, name: 'bedroom 1', description: 'phillips hue in bedroom 1'}
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