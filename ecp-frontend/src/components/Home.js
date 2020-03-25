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
                            <div className="dashboard-item"></div>
                            Dashboard item 1
                        </Col>
                        <Col><div className="dashboard-item"></div></Col>
                        <Col><div className="dashboard-item"></div></Col>
                    </Row>
                    <Row>
                        <Col><div className="dashboard-item"></div></Col>
                        <Col><div className="dashboard-item"></div></Col>
                        <Col><div className="dashboard-item"></div></Col>
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