import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
import "../AddSubject/addSubject.css";
import "../Lectures/Addlecture.css";
import Select from "react-select";
import MediaComponent from "../MediaComponent/chooseMediaFile";
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

const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
  margin: 30% 45%;
`;

class EditTestimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      userList: [],
      options: [],
      selectedUser: null,
      userFetched: [],
      description: "",
      testimonial:null 
    };
  }

  handleChange = e => {
    this.setState({selectedUser:e});
  };

  componentWillMount() {
    this.setState({loading:true})
    this.getTestimonialFromLocal()
    this.getUsers();
    this.setState({loading:false})
  }

  componentWillUnmount(){
      window.localStorage.removeItem("testimonial")
  }

  componentDidMount() {
    console.log(this.state.userList);
  }

  getTestimonialFromLocal(){
      var testimonial = JSON.parse(window.localStorage.getItem("testimonial"))
      if(testimonial){
          this.setState({testimonial})
      }
      else{
          this.props.history.push('/admin/testimonials')
      }
    }


  getUsers = async () => {
    let user_list = this.state.userList;
    this.setState({});
    this.setState({
      loading:true,
      response: fetch("http://18.221.47.207:3000/get_users", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          responseJson.forEach(element => {
            element.value = element.user_id;
            element.label = element.name
          });
          this.setState({userList:responseJson, selectedUser:responseJson.find(item=>item.user_id === this.state.testimonial.user_id)})
        })
        .catch(error => {
          this.setState({
            loading: false
          });
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };

    editTestimonial() {
    // if (this.state.selectedUser == null) {
    //   swal("Check User field!", "Please select a User", "error");
    //  } else if (this.state.testimonial.description.length == 0 || this.state.testimonial.description == null) {
    //   swal("Check User's testimonial!", "Please enter a testimonial from the user!", "error");
    // } else {
    //   this.setState({
    //     loading: true
    //     // add_modal:false
    //   });


      let details = {
        // product_id:this.state.selected_products.product_id,
        testimonial_id:this.state.testimonial.testimonial_id,
        user_id: this.state.selectedUser.user_id,
        user_testimonial_description: this.state.testimonial.user_testimonial_description,
        user_testimonial_image: this.state.selectedUser.profile_pic,
        user_testimonial_name:  this.state.selectedUser.name,
      };

      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");
      console.log('formbosy',formBody)

      this.setState({
        response: fetch("http://18.221.47.207:3000/edit_testimonial", {
            method: 'POST',
            headers: {
             
              'Content-Type': 'application/x-www-form-urlencoded',
              'Cache-Control': 'max-age=31536000'
            },
            body:formBody })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "QWERTy");
            swal("Success", "Testimonial succesfullly added", "success").then(
              value => {
                this.props.history.push("/admin/testimonials");
              }
            );
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
  




  //GET FUNCTIONS

  //ITEM RENDERER DRAG DROP

  //HANDLE CLICK EVENTS

  //HANDLE CHANGE FUNCTIONS

  handleTestimonialDescription = text => {
   let {testimonial} = this.state;
   testimonial.user_testimonial_description = text.target.value;
   this.setState({testimonial});
  };

  //RENDER FUNCTIONS
  renderUserNameSection() {
    return (
      <div className="col-12  subject-name-section d-flex">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          User Name:
        </label>
        <Select
          value={this.state.selectedUser}
          onChange={this.handleChange}
          options={this.state.userList}
          className="reactSelectName"
        />
      </div>
    );
  }

  renderTestimonialDescriptionContainer() {
    return (
      <React.Fragment>
        <div className="col-12 subject-description-container  d-flex align-items-center">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="subject-labels h-100"
          >
            Testimonial:
          </label>
          <div className="descriptions-container">
            {this.renderTestimonialDescriptions()}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderCourseThumbSection() {
    if (!this.state.selectedUser) {
      return (
        <div className="col-12 d-flex align-items-center subject-thumbnail-container">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="image-label subject-labels"
          >
            Faculty Thumbnail: <br />{" "}
            <span className="text-right text-muted ml-auto"> </span>
          </label>
          <span style={{ marginLeft: "15px" }}>Please choose a Name !</span>
        </div>
      );
    } else {
      return (
        <div className="col-12 d-flex align-items-center subject-thumbnail-container">
          <label
            htmlFor="defaultFormRegisterNameEx"
            className="image-label subject-labels h-100"
          >
            Faculty Thumbnail: <br />{" "}
            <span className="text-right text-muted ml-auto"> </span>
          </label>
          <div className="position-relative">
            <img src={this.state.selectedUser.profile_pic} className="imgUser" />
          </div>
        </div>
      );
    }
  }

  renderTestimonialDescriptions() {
    return (
      <React.Fragment>
        <div className="d-flex align-items-start mt-3">
          <div className="position-relative w-100 ml-3 mr-4">
            <textarea
              style={{ marginLeft: "5px", marginRight: "5px" }}
              label="subject-description"
              className="subject-description-textarea w-100 p-2"
              type="text"
              value={this.state.testimonial.user_testimonial_description}
              onChange={text => this.handleTestimonialDescription(text)}
            />
          </div>
        </div>
        <div className="w-100" />
      </React.Fragment>
    );
  }

  render() {
    console.log(this.state, "state");
    return (
      <div id="add-subject-page">
        <AdminNavbar {...this.props} />

        <div className="d-flex">
          <SidebarPage {...this.props} active={1} />

          <div className="add-subject-column">
            {this.state.loading ? (
              <div className="sweet-loading">
                <GridLoader
                  css={override}
                  sizeUnit={"px"}
                  size={5}
                  color={"#c01825"}
                  loading={this.state.loading}
                />
              </div>
            ) : (
              <React.Fragment>
                <div className="row my-3 px-4">
                  <div className="col-12 top_button_bar d-flex">
                    <button
                      className="admin-button-style admin-button-style-margin"
                      onClick={() =>
                        this.props.history.push("/admin/testimonials")
                      }
                    >
                      All Testimonials
                    </button>
                    <MediaComponent
                      onSelectMediaItem={this.handleMediaChooseImage}
                      buttonName={<MDBIcon icon="camera" />}
                      restriction="image/*"
                    />
                    <button
                      className="admin-button-style ml-auto"
                      onClick={() => this.editTestimonial()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Add Testimonial</h3>
                  </div>
                </div>

                <div className="d-flex">
                  <div className="subject-content-container ml-4">
                    <div className="row px-0 mx-0 ">
                      {this.renderUserNameSection()}
                      {this.renderCourseThumbSection()}
                      {this.renderTestimonialDescriptionContainer()}
                    </div>
                  </div>
                </div>

                <hr />
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default EditTestimonial;
