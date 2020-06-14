import React from "react";
import {
  MDBNavbar,
  MDBNavbarNav,
  MDBNavItem,
  MDBNavbarBrand,
  MDBIcon
} from "mdbreact";
import Select from "react-select";
import "./adminNavbar.css";
import Logo from "../../../Assets/images/Logo.png";

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''
    };
  }
  logout() {
    window.localStorage.clear();
    this.props.history.push("/admin");
  }

  componentDidMount() {}
  getDetails() {
    var admindata = window.localStorage.getItem("admindata");
    if (admindata == null) {
      this.props.history.push("/admin");
    }
  }
  render() {
    return (
      <div className="textFontSize">
        <MDBNavbar
          style={{ backgroundColor: "#303336", color: "white" }}
          dark
          expand="md"
        >
          <MDBNavbarBrand
            style={{
              display: "flex",
              alignItems: "center",
              padding: 5,
              margin: 3
            }}
          >
            <img src={Logo} alt="10x10-logo" className="adminLogoHeight" />
          </MDBNavbarBrand>
          <MDBNavbarNav right className="pr-5">
            {/* <MDBNavItem className="mr-5">
   
              <Select
                closeMenuOnSelect={true}
                onChange={e => this.setState({ selectedLanguage: e },()=>localStorage.setItem('language',this.state.selectedLanguage.value))}
                value={this.state.selectedLanguage}
                className="language-select "
                options={this.state.options}
              />
            </MDBNavItem> */}
         
            <MDBNavItem onClick={() => this.logout()}>
              <MDBIcon
                icon="sign-out-alt"
                size="lg"
                style={{ marginTop: "10px" }}
              />
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBNavbar>
      </div>
    );
  }
}

export default AdminNavbar;
