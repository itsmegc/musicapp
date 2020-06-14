import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Select from "react-select";
import {
  MDBNavbar,
  MDBBtn,
  MDBNavItem,
  MDBNavbarNav,
  MDBIcon,
  MDBModal,
  MDBModalBody,
  MDBModalFooter,
  MDBModalHeader,
  MDBInput
} from "mdbreact";
import Picky from "react-picky";
import "react-picky/dist/picky.css";
import swal from "sweetalert";
import RLDD from "react-list-drag-and-drop/lib/RLDD";
import { css } from "@emotion/core";
import GridLoader from "react-spinners/GridLoader";
import Fade from "react-reveal";
import CKEditor from 'ckeditor4-react';

const topicsList = [];
for (var i = 1; i <= 100; i++) {
  topicsList.push({ id: i, name: `Topic ${i}` });
}

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

class addKeyDates extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,

      Name: "",
      Description: "<p></p>",
      date: new Date(),
      status:1,
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''
    };
    this.onEditorChange = this.onEditorChange.bind( this );
  }

  componentWillMount() {}

  componentDidMount() {}

  //ADD FORM

  onEditorChange( e ) {
    console.log(e)
    this.setState( {
      Description: e.editor.getData()
    } );
  }
  addKeyDates() {
    if (this.state.Name.length == 0) {
      swal("Check News name!", "Please enter valid name", "error");
    } else if (this.state.Description.length == 0) {
      swal("Check News Description field!", "Enter valid tax value", "error");
    } 
    
    else if (!this.state.selectedLanguage.value) {
      swal("Select any language", "Please Select any language!", "error");
    } 
    
    
    else {
      this.setState({
        loading: true
      });
      let language=JSON.parse(localStorage.getItem('language'))

      let details = {
        // product_id:this.state.selected_products.product_id,

        key_dates_title: this.state.Name,
        key_dates_description: this.state.Description,
        key_dates:this.state.date,
        language_id:+language.value,
        language_id:this.state.selectedLanguage.value,
        status:this.state.status
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      this.setState({
        response: fetch("http://18.221.47.207:3000/add_key_dates", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Cache-Control": "max-age=31536000"
          },
          body: formBody
        })
          .then(response => response.json())
          .then(responseJson => {
            if (responseJson.status == 200) {
              this.setState({
                loading: false
                // add_modal:false
              });
              this.props.history.push("/admin/key-dates");
            } else {
              this.setState({
                loading: false
                // add_modal:false
              });

              swal("Warning!", responseJson.message, "warning");
            }
          })
          .catch(error => {
            this.setState({
              loading: false
            });
            swal("Warning!", "Check your network!", "warning");
            console.log(error);
          })
      });
    }
  }

  //HANDLE CHANGE FUNCTIONS

  handleNameChange = text => {

    this.setState({ Name: text.target.value });
  };

  handleDescriptionChange = text => {
 
    this.setState({ Description: text.target.value });
  };

  //RENDER FUNCTIONS
  renderName() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
       Name :
        </label>
        <input
          autoFocus
          value={this.state.Name}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.handleNameChange(text)}
        />
      </div>
    );
  }

  renderDescription() {
    return (
      <div className="col-12 my-2 cost-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          Description :
        </label>
        
           <CKEditor
            data={this.state.Description}
             style={{width:'60%'}}
                onChange={this.onEditorChange} 
                className="textFontSize"/> 
      </div>
    );
  }

  renderDate() {
    return (
      <div className="col-6 my-2">
      <label htmlFor="defaultFormRegisterNameEx" className="date-from-label subject-labels mr-3">
           date:
      </label>
      <DatePicker
      selected={this.state.date}
      onChange={(date)=>this.setState({date:date })}
    />
       </div>
    );
  }

  handleChange = selected_sub => {
    this.setState({ selected_sub });
    console.log(`Option selected:`, selected_sub);

  
  };
  renderSelect() {

   

    return (
      <div className="col-5  d-flex align-items-baseline justify-content-end">
        <span
   
          style={{fontWeight:'bold',fontSize:'18px',paddingRight:'5px'}}
        >
          Language :
        </span>
        <Select
                  closeMenuOnSelect={true}
                  onChange={e => this.setState({ selectedLanguage: e })}
                  value={this.state.selectedLanguage}
                  className="language-select "
                  options={this.state.options}
                />
        {/* {console.log(y)} */}
      </div>
    );
  }
  
  



  render() {
    console.log(this.props.history);
    return (
      <div id="add-subject-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={13} />

          <div className="add-subject-column">
            {this.state.loading ? (
              <div className="sweet-loading">
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={5}
                  color={"#2fb2eb"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                <Fade>
                  <div className="row my-3 px-4">
                    <div className="col-12">
                      <button
                        className="admin-button-style"
                        onClick={() =>
                          this.props.history.push("/admin/key-dates")
                        }
                      >
                        All Key Dates
                      </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                      <h3> Add Add Key Dates</h3>
                      <button
                        className="admin-button-style"
                        onClick={() => this.addKeyDates()}
                      >
                        {" "}
                        Save &amp; Publish
                      </button>
                    </div>
                  </div>

                  <div className="row px-2 my-2 mx-0">
                  {this.renderSelect()}
                    {this.renderName()}

                    {this.renderDescription()}
                    {this.renderDate()}
                  </div>
                </Fade>
              </React.Fragment>
            )}
          </div>

          {console.log(this.state)}
        </div>
      </div>
    );
  }
}

export default addKeyDates;
