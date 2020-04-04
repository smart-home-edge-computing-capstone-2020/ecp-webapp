import React from 'react';
import EcpNavbar from './EcpNavbar';
import '../style/Interactions.css'
import { Button, Container, Row, Col } from 'react-bootstrap';

const InteractionlistInteraction = (interaction) => (
    <a href={"/interaction/" + interaction.id} >
        <Row className="interaction">
            <Col><div className="interaction-logo"></div></Col>
            <Col>
                <h1>
                    {interaction.name}
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
            interactions: null,
        } 
    }

    getInteractions = () => {
        fetch('/interactions').then(res => res.json()).then(data => {
            this.setState({interactions: data.interactions});
        })
    }

    componentDidMount() {
        // gets the state from the backend
        this.getInteractions();
    }

    render() {
      const {interactions} = this.state;
      return (
          <div className="interactions">
              <EcpNavbar/>
              <div className="page-name">
                  <h1>interactions</h1>
              </div>
              {interactions &&
                  <div className="device-list">
                      <Container>
                          {
                              interactions.map((device) => InteractionlistInteraction(device))
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

export default Interactions;