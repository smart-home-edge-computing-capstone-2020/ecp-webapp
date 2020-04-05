import React from 'react';
import EcpNavbar from './EcpNavbar';

class Interaction extends React.Component {

    constructor() {
        super();
        this.state = {
            interaction: null,
        }
    }

    getInteraction = (interactionId) => {
        
        fetch('/interaction/' + interactionId).then(res => res.json()).then(data => {
            this.setState({interaction: data.interaction});
        })
    }

    componentDidMount() {
        // get the device via id from the backend
        const interactionId = this.props.match.params.id;
        void(interactionId)
        this.getInteraction();
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
                            Trigger:
                            <div className="trigger-device">
                                {interaction.trigger_device.name}
                            </div>
                            Target:
                            <div className="target-device">
                                {interaction.target_device.name}
                            </div>
                        </div>
                    </div>
                }
                
            </div>
        )

    }
}

export default Interaction;
