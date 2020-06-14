import React from "react";

import "./footer.css";

class MainFooterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="footerMain">
        <div className="footerMenu mb-5">


          <div className='footerMenuSlot'>
            <h3>Ouick LINKS</h3>
            <hr />
            <ul>
              <li>Home</li>
              <li>About</li>

              <li>Other Services</li>

              <li>Contact Us</li>
            </ul>
          </div>
          <div className='footerMenuSlot'>
            <h3>Kuch Bhi</h3>
            <hr />
            <ul>
              <li>Home</li>
              <li>About</li>

              <li>Other Services</li>

              <li>Contact Us</li>
            </ul>
          </div>
          <div className='footerMenuSlot'>
            <h3>New</h3>
            <hr />
            <ul>
              <li>Home</li>
              <li>About</li>

              <li>Other Services</li>

              <li>Contact Us</li>
            </ul>
          </div>
        </div>

        <div className='FooterBottom mt-5'>
        
        <p >
        Copyright
          <span style={{ color: "#c01825" }}>
          
            &copy; 2020 kaa-fal music
        
            <sub>&reg;</sub>.
            All Rights Reserved
          </span>
        
        </p>
     
      </div>

      </div>
    );
  }
}

export default MainFooterPage;
