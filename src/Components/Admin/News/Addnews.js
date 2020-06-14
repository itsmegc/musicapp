import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../../../Components/Admin/Sidebar/sidebarPage";
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

class Addnews extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,

      newsName: "",
      newsDescription: "",
      examDate: new Date(),
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  //ADD FORM

  addNews() {
    if (this.state.newsName.length == 0) {
      swal("Check News name!", "Please enter valid name", "error");
    } else if (this.state.newsDescription.length == 0) {
      swal("Check News Description field!", "Enter valid tax value", "error");
    } else {
      this.setState({
        loading: true
      });

      let details = {
        // product_id:this.state.selected_products.product_id,

        news_title: this.state.newsName,
        news_description: this.state.newsDescription,
        exam_date:this.state.examDate
      };
      let formBody = [];
      for (let property in details) {
        let encodedKey = encodeURIComponent(property);
        let encodedValue = encodeURIComponent(details[property]);
        formBody.push(encodedKey + "=" + encodedValue);
      }
      formBody = formBody.join("&");

      this.setState({
        response: fetch("http://18.221.47.207:3000/add_news", {
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
              this.props.history.push("/admin/news");
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
    console.log("Tax Name:", text.target.value);
    this.setState({ newsName: text.target.value });
  };

  handleDescriptionChange = text => {
    console.log("Tax value", text.target.value);
    this.setState({ newsDescription: text.target.value });
  };

  //RENDER FUNCTIONS
  renderNewsName() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          News Name :
        </label>
        <input
          autoFocus
          value={this.state.newsName}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.handleNameChange(text)}
        />
      </div>
    );
  }

  renderNewsDescription() {
    return (
      <div className="col-12 my-2 cost-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          News Description :
        </label>
        <input
          autoFocus
          value={this.state.newsDescription}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control cost-form custom-form"
          onChange={text => this.handleDescriptionChange(text)}
        />
      </div>
    );
  }

  renderNewsDate() {
    return (
      <div className="col-6 my-2">
      <label htmlFor="defaultFormRegisterNameEx" className="date-from-label subject-labels mr-3">
           Exam date:
      </label>
      <DatePicker
      selected={this.state.examDate}
      onChange={(date)=>this.setState({examDate:date })}
    />
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
                  color={"#c01825"}
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
                          this.props.history.push("/admin/news")
                        }
                      >
                        All News
                      </button>
                    </div>
                    <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                      <h3> Add News</h3>
                      <button
                        className="admin-button-style"
                        onClick={() => this.addNews()}
                      >
                        {" "}
                        Save &amp; Publish
                      </button>
                    </div>
                  </div>

                  <div className="row px-2 my-2 mx-0">
                    {this.renderNewsName()}

                    {this.renderNewsDescription()}
                    {this.renderNewsDate()}
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

export default Addnews;
