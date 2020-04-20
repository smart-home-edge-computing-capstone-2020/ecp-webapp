import React from 'react';
import EcpNavbar from './EcpNavbar';

class About extends React.Component {
    render() {
      return (
        <div className="about">
            <EcpNavbar />
            <div className="page-name">
                <h1>About ECP</h1>
		<div>
		    Hey, this is a capstone project by Rip, Richard, and Niko,
		    three senior ECE students.   If you'd like to learn more
		    about us and our project, please go to this
	            <a href="http://course.ece.cmu.edu/~ece500/projects/s20-teama6/"> link</a>.
	            Thanks!
	        </div>
            </div>
        </div>
      );
    }
}

export default About;
