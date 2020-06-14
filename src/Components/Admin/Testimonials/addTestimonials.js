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

class Addtestimonial extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      userList: [],
      options: [],
      selectedOption: null,
      userFetched: [],
      description: "",
      userId: "",
      userName: "",
      userPic: ""
    };
  }

  handleChange = selectedOption => {
    this.setState(
      {
        selectedOption,
        userName: selectedOption.label,
        userId: selectedOption.value
      },
      () => this.getUserDetails(selectedOption.value)
    );
  };

  getUserDetails = async id => {
    let details = {
      user_id: id
    };

    //  console.log(details,'fetching-details')
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/get_user_details", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },

        body: formBody
      })
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          this.setState({ userFetched: responseJson[0] }, () =>
            this.setState({ userPic: this.state.userFetched.profile_pic })
          );
        })
        .catch(error => {
          this.setState({
            loading: true
          });
          alert("Warning!", "Check your network!", "warning");
          console.log(error);
        })
    });
  };

  componentWillMount() {
    this.getUsers();
  }

  getUsers = async () => {
    let user_list = this.state.userList;
    this.setState({});
    this.setState({
      response: fetch("http://18.221.47.207:3000/get_users", {
        method: "GET",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      })
        .then(response => response.json())
        .then(responseJson => {
          for (var i = 0; i < responseJson.length; i++) {
            var object = new Object();
            object.value = responseJson[i].user_id;
            object.label = responseJson[i].name;
            user_list.push(object);
          }
          this.setState({ userList: user_list, loading: false }, () => {
            const option = [];
            this.state.userList.map(item => {
              option.push(item);
            });
            this.setState({ options: option }, () =>
              console.log(this.state.options)
            );
          });
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

  componentDidMount() {
    console.log(this.state.userList);
  }

  addTestimonial() {
    if (this.state.userName.length == 0) {
      swal("Check User field!", "Please select a User", "error");
    } else if (this.state.userPic.length == 0) {
      swal("User does not have a profile picture", "Please select user with a profile picture!", "error");
    } else if (this.state.description.length == 0) {
      swal("Check User's testimonial!", "Please enter a testimonial from the user!", "error");
    } else {
      this.setState({
        loading: true
        // add_modal:false
      });

      let formData = new FormData();
      formData.append("user_id", this.state.userId);
      formData.append("user_testimonial_description", this.state.description);
      formData.append("user_testimonial_image", this.state.userPic);
      formData.append("user_testimonial_name", this.state.userName);
      console.log(
        this.state.userName,
        this.state.description,
        this.state.userPic,
        this.state.userId
      );
      // console.log(this.state.facultyName,this.state.facultyThumbnail,this.state.profession,this.state.description)
      this.setState({
        response: fetch("http://18.221.47.207:3000/add_testimonial", {
          method: "POST",
          body: formData
        })
          .then(response => response.json())
          .then(responseJson => {
            console.log(responseJson, "QWERTy");
            swal("Success", "Subject succesfullly added", "success").then(
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
  }

  //GET FUNCTIONS

  //ITEM RENDERER DRAG DROP

  //HANDLE CLICK EVENTS

  //HANDLE CHANGE FUNCTIONS

  handleTestimonialDescription = text => {
    this.setState({ description: text.target.value });
  };

  //RENDER FUNCTIONS
  renderUserNameSection() {
    const { selectedOption } = this.state;
    return (
      <div className="col-12  subject-name-section d-flex">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          User Name:
        </label>
        <Select
          value={selectedOption}
          onChange={this.handleChange}
          options={this.state.options}
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
            User Description:
          </label>
          <div className="descriptions-container">
            {this.renderTestimonialDescriptions()}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderCourseThumbSection() {
    if (this.state.userFetched.length == 0) {
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
            <img src={this.state.userFetched.profile_pic} className="imgUser" />
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
              className="subject-description-textarea w-100"
              type="text"
              onChange={text => this.handleTestimonialDescription(text)}
            />
          </div>
        </div>
        <div className="w-100" />
      </React.Fragment>
    );
  }

  render() {
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
                      onClick={() => this.addTestimonial()}
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

export default Addtestimonial;
