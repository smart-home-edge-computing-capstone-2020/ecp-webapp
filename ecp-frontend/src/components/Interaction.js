import React from 'react';
import EcpNavbar from './EcpNavbar';
import {Button} from 'react-bootstrap';

class Interaction extends React.Component {

    constructor() {
        super();
        this.state = {
            interaction: null,
        }
    }

    getInteraction = (interactionId) => {
        
        fetch('/api/interaction/' + interactionId).then(res => res.json()).then(data => {
            this.setState({interaction: data.interaction});
        })
    }

    componentDidMount() {
        // get the device via id from the backend
        const interactionId = this.props.match.params.id;
        this.getInteraction(interactionId);
    }

    deleteInteraction = () => {
        fetch('/api/delete-interaction?interaction_id=' + this.state.interaction.interaction_id);
    }


    render() {
        const {interaction} = this.state;
        return (
            <div className="device-page">
                <EcpNavbar/>
                {interaction &&
                    <div>
                        <div className="page-name">
                            <h1>{interaction.display_name}</h1>
                        </div>
                        <div className="interaction">
                            <div className="interaction-details">
                                Descriptions: {interaction.description}
                            </div>
                            <div className="trigger-device">
                                Trigger device:
                                <span class="interaction-device">
                                    <a href={"/device/" + interaction.trigger_serial}>
                                        {interaction.trigger_name}
                                    </a>
                                </span>
                            </div>
                            <div className="trigger-device">
                                Condition:
                                <span class="interaction-description">
                                    {interaction.operator}
                                </span>
                                <span className="interaction-description">
                                    {interaction.value}
                                </span>
                            </div>
                            <div className="target-device">
                                Target device:
                                <span class="interaction-device">
                                    <a href={"/device/" + interaction.target_serial}>
                                        {interaction.target_name}
                                    </a>
                                </span>
                            </div>
                            <div className="action">
                                Action:
                                <span class="interaction-description">
                                    {interaction.action}
                                </span>
                            </div>
                            <Button onClick={this.deleteInteraction} variant="danger"> 
                                Delete interaction
                            </Button>
                        </div>
                    </div>
                }
                
            </div>
        )

    }
}

export default Interaction;
