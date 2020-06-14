import React from "react";
import "./homeHeader.css";
import { MDBIcon } from "mdbreact";
import { NavLink } from "react-router-dom";

class homepageHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  pushNext() {
    this.props.history.push("/");
  }

  render() {
    return (
      <div className="headerMain">
        <div className="headerMenu">
          <div>
            <NavLink to="/">
              {" "}
              <h2 style={{ color: "white" }}>Kaa-fal Music </h2>
            </NavLink>
          </div>

          <div className="d-flex  align-items-center">
            <a href="https://twitter.com/iamRawalG">
              <MDBIcon fab icon="twitter" />
            </a>

            <a href="http://facebook.com">
              <MDBIcon className="ml-3" fab icon="facebook-f" />
              
            </a>
            <a href="https://www.instagram.com/shirleysetia/">
            
            <i className="ml-3 fab fa-instagram"></i>
            
          </a>
            

          </div>
        </div>

        <div className="d-flex justify-content-around mr-5 ml-5 pr-5 pl-5" >
        <div className="d-flex ml-5 pl-5" >
          <NavLink to="/">
            <h5 style={{ color: "white" }}>Home</h5>
          </NavLink>
          <NavLink to="/artists">
            <h5 className="ml-4" style={{ color: "white" }}>
              Artist
            </h5>
          </NavLink>
          </div>

          <div className="d-flex ">
          <div style={{ position:'relative'}}>
            <input
              
              type="text"
              className="ml-4 mb-2 serachInput"
            ></input>
            <i
              style={{ color: "white" }}
              className=" iconNew fas fa-search"
            ></i>
          </div>

          <div className="ml-3 buttonFill">
            <div className="textbtn">Search</div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default homepageHeader;
