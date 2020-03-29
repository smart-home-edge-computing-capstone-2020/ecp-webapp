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
                                    <div className="dashboard-label">My Devices</div>
                                </div>
                            </a>

                        </Col>
                        <Col>
                            <a href="/interactions">
                                <div className="dashboard-item">
                                    <div className="dashboard-label">My Interactions</div>
                                </div>                                
                            </a>
                        </Col>
                        <Col>
                            <a href="/log">
                                <div className="dashboard-item">
                                    <div className="dashboard-label">Log</div>
                                </div>                                
                            </a>

                        </Col>
                    </Row>
                    My Favorite Devices
                    <Row>
                        <Col>
                            <div className="dashboard-item"></div>
                        </Col>
                        <Col>
                            <div className="dashboard-item"></div>
                        </Col>
                        <Col>
                            <div className="dashboard-item"></div>
                        </Col>
                    </Row>
                </Container>
            </div>

            {/* <ul>
                <li>
                    <Link to="/register">Register</Link>
                </li>
                <li>
                    <Link to="/about">About</Link>
                </li>
            </ul> */}
        </div>
      );
    }
}

export default Home;