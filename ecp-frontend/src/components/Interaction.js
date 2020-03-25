import React from 'react';
import EcpNavbar from './EcpNavbar';

class Interaction extends React.Component {

    constructor() {
        super();
        this.state = {
            interaction: null,
        }
    }

    componentDidMount() {
        // get the device via id from the backend
        this.setState({interaction: 
            {id: 1, name: 'bedroom 1', description: 'phillips hue in bedroom 1'}
        })
    }


    render() {
        const {interaction} = this.state;
        return (
            <div className="device-page">
                <EcpNavbar/>
                {interaction &&
                    <div>
                        <div className="page-name">
                            <h1>{interaction.name}</h1>
                        </div>
                        <div className="interaction">
                            <div className="interaction-details">
                                {interaction.description}
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )

    }
}

export default Device;