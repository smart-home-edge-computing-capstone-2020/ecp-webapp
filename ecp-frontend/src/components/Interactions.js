import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Interactions.css'
import { Button, Container, Form, Row, Col, Modal } from 'react-bootstrap';

const InteractionlistInteraction = (interaction) => (
    <a href={"/interaction/" + interaction.interaction_id} >
        <Row className="interaction">
            <Col><div className="interaction-logo"></div></Col>
            <Col>
                <h1>
                    {interaction.display_name}
                </h1>
                <p>
                    {interaction.description}
                </p>
            </Col>
        </Row>
    </a>
)

class Interactions extends React.Component {

    constructor() {
        super();
        this.state = {
            devices: [],
            interactions: null,
            showInteractionModal: false,
            interactionInfo: {
                display_name: null,
                description: null,
                trigger_serial: null,
                target_serial: null,
                value: null,
                operator: ">",
                action: null,
            }
        } 
    }

    handleInputChange = (e) => {
        var {interactionInfo} = this.state;
        interactionInfo[e.target.name] = e.target.value;
        this.setState({
            interactionInfo: interactionInfo,
        });
    };

    handleSelectChange = (e) => {
        const {interactionInfo} = this.state;
        const operator = e.target.value;
        interactionInfo["operator"] = operator;
        this.setState({interactionInfo: interactionInfo})
    }

    handleTargetChange = (e) => {
        const {interactionInfo} = this.state;
        const target_serial = e.target.value;
        interactionInfo["target_serial"] = target_serial;
        this.setState({interactionInfo: interactionInfo})
    }

    handleTriggerChange = (e) => {
        const {interactionInfo} = this.state;
        const trigger_serial = e.target.value;
        interactionInfo["trigger_serial"] = trigger_serial;
        this.setState({interactionInfo: interactionInfo})
    }

    getInteractions = () => {
        fetch('/api/interactions').then(res => res.json()).then(data => {
            this.setState({interactions: data.interactions});
        })
    }

    getDevices() {
        fetch('/api/devices').then(res => res.json()).then(data => {
           this.setState({devices: data.devices}) 
           const {interactionInfo} = this.state
           interactionInfo.trigger_serial = data.devices[0].serial;
           interactionInfo.target_serial = data.devices[0].serial;
           this.setState({interactionInfo: interactionInfo})
           console.log(data.devices)
        })
    }

    componentDidMount() {
        // gets the state from the backend
        this.getInteractions();
        this.getDevices();
    }

    showInteractionModal = () => {
        this.setState({showInteractionModal: true})
    }

    closeModal = () => {
        this.setState({showInteractionModal: false})
    }

    saveInteraction = event => {
        event.preventDefault();
	console.log(this.state.interactionInfo)
        fetch('/api/add-interaction', {
            method: 'POST',
            body: JSON.stringify(this.state.interactionInfo),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
        }).then(() => {
		this.getInteractions();
		this.getDevices();
		this.setState({showInteractionModal: false});
	})
    } 

    render() {
      const {devices, interactions, showInteractionModal} = this.state;
      return (
        <div>

            <div className="interactions">
                <EcpNavbar/>
                <div className="page-name">
                    <h1>Interactions</h1>
                </div>
                {interactions &&
                    <div className="device-list">
                        <Container>
                            {
                                interactions.map((device) => InteractionlistInteraction(device))
                            }
                            <Button variant="outline-secondary" onClick={this.showInteractionModal}>
                                Add a new interaction
                            </Button>
                        </Container>
                    </div>
                }
            </div>
            <Modal show={showInteractionModal} onHide={this.closeModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>Add a new device to the system</Modal.Title>
                    </Modal.Header>
                    <Form onSubmit={this.saveInteraction}>
                        <Modal.Body>
                            <Form.Group controlId="interactionForm.Name">
                                <Form.Label>Interaction name</Form.Label>
                                <Form.Control name="display_name" type="text" placeholder="Enter the name of your interaction" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Description">
                                <Form.Label>Description</Form.Label>
                                <Form.Control name="description" type="text" placeholder="Enter a description for your interaction" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Target">
                                <Form.Label>Target Device</Form.Label>
                                <Form.Control as="select" name="target_serial" onChange={this.handleTargetChange}>
                                    {devices.map(device => 
                                        <option value={device.serial}> {device.display_name} </option>
                                    )}                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Action">
                                <Form.Label>Action</Form.Label>
                                <Form.Control name="action" type="text" placeholder="What do you want your target device to do?" onChange={this.handleInputChange}/>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Trigger">
                                <Form.Label>Trigger Device</Form.Label>
                                <Form.Control as="select" name="trigger_serial" onChange={this.handleTriggerChange}>
                                    {devices.map(device => 
                                        <option value={device.serial}> {device.display_name} </option>
                                    )}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Operator">
                                <Form.Label>Condition</Form.Label>
                                <Form.Control as="select" name="operator" onChange={this.handleSelectChange}>
                                    <option value=">"> Greater than </option>
                                    <option value=">="> Greater than or equals to </option>
                                    <option value="<"> Less than</option>
                                    <option value="<="> Less than or equals to </option>
                                    <option value="=="> Equals </option>
                                </Form.Control>
                            </Form.Group>
                            <Form.Group controlId="interactionForm.Value">
                                <Form.Label>Value</Form.Label>
                                <Form.Control name="value" type="text" placeholder="Enter a threshold value" onChange={this.handleInputChange}/>
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

export default Interactions;
