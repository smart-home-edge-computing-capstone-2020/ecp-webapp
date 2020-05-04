import React from 'react';
// import { Link } from 'react-router-dom';
import EcpNavbar from './EcpNavbar';
import { Container, Row, Col } from 'react-bootstrap';
import '../style/Home.css';

class Home extends React.Component {
    render() {
      return (
        <div className="home">
            <EcpNavbar />
            <div className="page-name">
                <h1>Welcome!</h1>
            </div>

            <div className="dashboard">
                <Container>
                    <Row>
                        <Col>
                            <a href="/devices" >
                                <div className="dashboard-item">
                                    <img className="devices-img" src="https://images-na.ssl-images-amazon.com/images/I/61%2B8gqeiikL._AC_SX522_.jpg"/>
                                    <div className="dashboard-label">My Devices</div>
                                </div>
                            </a>

                        </Col>
                        <Col>
                            <a href="/interactions">
                                <div className="dashboard-item">
                                    <img className="interactions-img" src="data:image/jpeg;base64,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" />
                                    <div className="dashboard-label">My Interactions</div>
                                </div>                                
                            </a>
                        </Col>
                        {/* <Col>
                            <a href="/log">
                                <div className="dashboard-item">
                                    <div className="dashboard-label">Log</div>
                                </div>                                
                            </a>

                        </Col> */}
                    </Row>
                </Container>
            </div>
        </div>
      );
    }
}

export default Home;