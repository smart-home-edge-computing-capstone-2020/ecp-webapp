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
        const fetchurl = '/api/device/' + serial;
        console.log(fetchurl)
        fetch(fetchurl).then(res => res.json()).then(data => {
            this.setState({device: data.device_dict})
        })
    }

    handleChange = event => {
        this.setState({ newValue: event.target.value });
    };
    
    handleSubmit = event => {
        if (this.state.newValue) {
          console.log("Sending new value")
          this.sendNewValue();
        }
        this.setState({newValue: ''});
        event.preventDefault();
    };

    sendNewValue = () => {
        const data = {serial: this.state.serial, value: this.state.newValue}
        fetch('/api/set-device', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        })
    }

    render() {
        const {device} = this.state;
        var statusClass = "status";
        if (device)
            statusClass = device.is_up ? "status running" : "status offline";

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
                                Device Status:
                                <span className={statusClass}>
                                    {device.is_up ? "Running" : "Offline"}
                                </span>
                            </div>
                            {device.is_up && 
                                <div className="device-state">
                                    Device value:
                                    <span className="status">
                                        {device.state}
                                    </span>
                                </div>
                            }
                            <div>
                                <form onSubmit={this.handleSubmit}>
                                    Set device value:
                                    <input type="text" value={this.state.newValue} onChange={this.handleChange} className="value-input"/>
                                    <Button type="submit">Submit</Button>
                                </form>
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )

    }
}

export default Device;