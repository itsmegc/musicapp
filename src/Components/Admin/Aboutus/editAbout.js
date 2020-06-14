import React, { Component } from "react";
import AdminNavbar from "../Navbar/adminNavbar";
import SidebarPage from "../Sidebar/sidebarPage";
import DatePicker from "react-datepicker";
import MediaComponent from "../MediaComponent/chooseMediaFile";
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
import CKEditor from "ckeditor4-react";

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

class AddAboutus extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
      BannerTitle: "",
      BannerLink: "",
      mainTitle: "",
      mainDescription: "",
      missionDescription: "",
      mission_image: "",
      missionTitle: "",
      visionDescription: "",
      visionTitle: "",
      vision_image: "",
      id:'',
      options: [
        { value: "0", label: "English" },
        { value: "1", label: "Hindi" }
      ],
      selectedLanguage:''      

    };
    this.onEditorChangeVision = this.onEditorChangeVision.bind(this);
    this.onEditorChangeMission = this.onEditorChangeMission.bind(this);
    this.onEditorChangeMain = this.onEditorChangeMain.bind(this);
  }

  componentWillMount() {
    let aboutusDetails = JSON.parse(localStorage.getItem("about_us"));
    this.setState({
      about_us: aboutusDetails,
      BannerTitle: aboutusDetails.banner_title,
      BannerLink: aboutusDetails.banner_image,
      mainTitle: aboutusDetails.main_title,
      mainDescription: aboutusDetails.main_description,
      visionTitle: aboutusDetails.vision_title,
      visionDescription: aboutusDetails.vision_description,
      vision_image: aboutusDetails.vision_image,
      missionTitle: aboutusDetails.mission_title,
      mission_image: aboutusDetails.mission_image,
      missionDescription: aboutusDetails.mission_description,
      id:aboutusDetails.id,
      selectedLanguage:this.state.options.find(item=>item.value==aboutusDetails.language_id)
    });
  }

  componentDidMount() {}

  //ADD FORM

  onEditorChangeMain(e) {
    console.log(e);
    this.setState({
      mainDescription: e.editor.getData()
    });
  }
  onEditorChangeMission(e) {
    console.log(e);
    this.setState({
      missionDescription: e.editor.getData()
    });
  }
  onEditorChangeVision(e) {
    console.log(e);
    this.setState({
      visionDescription: e.editor.getData()
    });
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

  renderBannerImage() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Image Link:
        </label>
        <input
          autoFocus
          value={this.state.BannerLink}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ BannerLink: text.target.value })}
        />
      </div>
    );
  }
  renderBannerTitle() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Title:
        </label>
        <input
          autoFocus
          value={this.state.BannerTitle}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ BannerTitle: text.target.value })}
        />
      </div>
    );
  }

  renderMainTitle() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Main Title:
        </label>
        <input
          autoFocus
          value={this.state.mainTitle}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ mainTitle: text.target.value })}
        />
      </div>
    );
  }
  renderMainDescription() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Main Description:
        </label>
        <CKEditor
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          data={this.state.mainDescription}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeMain}
          className="textFontSize"
        />
      </div>
    );
  }

  renderVisionTitle() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Vision Title:
        </label>
        <input
          autoFocus
          value={this.state.visionTitle}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ visionTitle: text.target.value })}
        />
      </div>
    );
  }
  renderVisionImage() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Vision Image Link:
        </label>
        <input
          autoFocus
          value={this.state.visionImage}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ vision_image: text.target.value })}
        />
      </div>
    );
  }
  renderVisionDescription() {
    return (
      <div className="col-12 my-2 cost-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          Vision Description :
        </label>

        <CKEditor
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          data={this.state.visionDescription}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeVision}
          className="textFontSize"
        />
      </div>
    );
  }

  renderMissionTitle() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Mission Title:
        </label>
        <input
          autoFocus
          value={this.state.missionTitle}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ missionTitle: text.target.value })}
        />
      </div>
    );
  }
  renderMissionImage() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Mission Image Link:
        </label>
        <input
          autoFocus
          value={this.state.missionimage}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ mission_image: text.target.value })}
        />
      </div>
    );
  }
  renderMissionDescription() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Mission Description:
        </label>
        <CKEditor
          onBeforeLoad={CKEDITOR => (CKEDITOR.disableAutoInline = true)}
          data={this.state.missionDescription}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeMission}
          className="textFontSize"
        />
      </div>
    );
  }

  editAboutus() {
    this.setState({
      loading: true
    });

    let details = {
      banner_title: this.state.BannerTitle,
      banner_image: this.state.BannerLink,
      main_title: this.state.mainTitle,
      main_description: this.state.mainDescription,
      mission_description: this.state.missionDescription,
      mission_image: this.state.mission_image,
      mission_title: this.state.missionTitle,
      vision_description: this.state.visionDescription,
      vision_title: this.state.visionTitle,
      vision_image: this.state.vision_image,
      id:this.state.id,
   language_id:this.state.selectedLanguage.value
    };
    let formBody = [];
    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    this.setState({
      response: fetch("http://18.221.47.207:3000/edit_aboutus", {
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
            this.props.history.push("/admin/about-us");
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
                  onChange={e => this.setState({ selectedLanguage: e },)}
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
                <div className="row my-3 px-4">
                  <div className="col-12 top_button_bar d-flex align-items-center ">
                    <button
                      className="admin-button-style  admin-button-style-margin"
                      onClick={() => this.props.history.push("/admin/about-us")}
                    >
                      About Us
                    </button>
                    <MediaComponent
                      onSelectMediaItem={this.handleMediaChooseImage}
                      buttonName={<MDBIcon icon="camera" />}
                      restriction="image/*"
                    />
                    <button
                      className="admin-button-style ml-auto"
                      onClick={() => this.editAboutus()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Edit About Us</h3>
                    {this.renderSelect()}
                  </div>
                </div>

                <div className="row px-2 my-2 mx-0">
                  {this.renderBannerTitle()}
                  {this.renderBannerImage()}

                  {this.renderMainTitle()}
                  {this.renderMainDescription()}

                  {this.renderVisionTitle()}
                  {this.renderVisionImage()}
                  {this.renderVisionDescription()}

                  {this.renderMissionTitle()}
                  {this.renderMissionImage()}
                  {this.renderMissionDescription()}
                </div>
              </React.Fragment>
            )}
          </div>

          {console.log(this.state)}
        </div>
      </div>
    );
  }
}

export default AddAboutus;
