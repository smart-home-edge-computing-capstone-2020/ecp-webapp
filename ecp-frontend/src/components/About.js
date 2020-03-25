import React from 'react';
import EcpNavbar from './EcpNavbar';

class About extends React.Component {
    render() {
      return (
        <div className="about">
            <EcpNavbar />
            <div className="page-name">
                <h1>About ECP</h1>
            </div>
        </div>
      );
    }
}

export default About;