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

class editContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadng: true,
   
      main_title: "",
      banner_image_1:'',
      banner_image_2:'',
      banner_image_3:'',
      banner_text_1:'',
      banner_text_2:'',
      banner_text_3:'',
      text_below_bannerImage:'',
     id:'',
     options: [
      { value: "0", label: "English" },
      { value: "1", label: "Hindi" }
    ],
    selectedLanguage:''   
  
    };
    // this.onEditorChangeVision = this.onEditorChangeVision.bind(this);
    // this.onEditorChangeMission = this.onEditorChangeMission.bind(this);
    // this.onEditorChangeMain = this.onEditorChangeMain.bind(this);
    this.onEditorChangeText1=this.onEditorChangeText1.bind(this)
    this.onEditorChangeText2=this.onEditorChangeText2.bind(this)
    this.onEditorChangeText3=this.onEditorChangeText3.bind(this)
    this.onEditorChangeTextBewloBannerImage=this.onEditorChangeTextBewloBannerImage.bind(this)

    
  }

  componentWillMount() {
    let allcontent = JSON.parse(localStorage.getItem("all_content"));
    this.setState({
         main_title:allcontent.main_title,
      banner_image_1:allcontent.banner_image_1,
      banner_image_2:allcontent.banner_image_2,
      banner_image_3:allcontent.banner_image_3,
      banner_text_1:allcontent.banner_text_1,
      banner_text_2:allcontent.banner_text_2,
      banner_text_3:allcontent.banner_text_3,
      text_below_bannerImage:allcontent.text_below_bannerImage,
      selectedLanguage:this.state.options.find(item=>item.value==allcontent.language_id),
       id:allcontent.id
    });

  }

  componentDidMount() {}


 

  //ADD FORM

//   onEditorChangeMain(e) {
//     console.log(e);
//     this.setState({
//       mainDescription: e.editor.getData()
//     });
//   }
//   onEditorChangeMission(e) {
//     console.log(e);
//     this.setState({
//       missionDescription: e.editor.getData()
//     });
//   }
  onEditorChangeText1(e){
    this.setState({
      banner_text_1: e.editor.getData()
      });
  }
  onEditorChangeTextBewloBannerImage(e){
    this.setState({text_below_bannerImage:e.editor.getData()})
  }
  onEditorChangeText2(e){
      this.setState({banner_text_2:e.editor.getData()})
  }
  onEditorChangeText3(e){
      this.setState({banner_text_3:e.editor.getData()})
  }
//   onEditorChangeVision(e) {
//     console.log(e);
//     this.setState({
//       visionDescription: e.editor.getData()
//     });
//   }


  //HANDLE CHANGE FUNCTIONS

  handleNameChange = text => {
    this.setState({ Name: text.target.value });
  };

  handleDescriptionChange = text => {
    this.setState({ Description: text.target.value });
  };

  //RENDER FUNCTIONS




  mainTitle(){
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
          value={this.state.main_title}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ main_title: text.target.value })}
        />
        </div>
      );  
  }

  bannerImage1() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Image 1:
        </label>
        <input
          autoFocus
          value={this.state.banner_image_1}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ banner_image_1: text.target.value })}
        />
      </div>
    );
  }

  bannerText1() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Text 1:
        </label>
        <CKEditor  onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 
          data={this.state.banner_text_1}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeText1}
          className="textFontSize"
        />
      </div>
    );
  }
  bannerImage2() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Image 2:
        </label>
        <input
          autoFocus
          value={this.state.banner_image_2}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({banner_image_2: text.target.value })}
        />
      </div>
    );
  }
   
  bannerText2() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Text 2:
        </label>
        <CKEditor  onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 
          data={this.state.banner_text_2}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeText2}
          className="textFontSize"
        />
      </div>
    );
  }

    
  bannerImage3() {
    return (
      <div className="col-12 my-2 cost-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="cost-label subject-labels"
        >
          Banner Image 3 :
        </label>

        <input
          autoFocus
          value={this.state.banner_image_3}
          type="text"
          id="defaultFormRegisterNameEx"
          className="form-control subject-name-form custom-form"
          onChange={text => this.setState({ banner_image_3 : text.target.value })}
        />
      </div>
    );
  }

  bannerText3() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Banner Text 3:
        </label>
        <CKEditor  onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 
          data={this.state.banner_text_3}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeText3}
          className="textFontSize"
        />
      </div>
    );
  }
  textBelowBannerImage() {
    return (
      <div className="col-12 my-2 subject-name-section">
        <label
          htmlFor="defaultFormRegisterNameEx"
          className="subject-name-label subject-labels"
        >
          Text Below Banner Images :
        </label>
        <CKEditor  onBeforeLoad={ ( CKEDITOR ) => ( CKEDITOR.disableAutoInline = true ) } 
          data={this.state.text_below_bannerImage}
          style={{ width: "60%" }}
          onChange={this.onEditorChangeTextBewloBannerImage}
          className="textFontSize"
        />
      </div>
    );
  }

  addContent() {
      this.setState({
        loading: true
      });

      let details = {
       id:this.state.id,
       main_title:this.state.main_title,
       banner_image_1:this.state.banner_image_1,
       banner_image_2:this.state.banner_image_2,
       banner_image_3:this.state.banner_image_3,
       banner_text_1:this.state.banner_text_1,
       banner_text_2:this.state.banner_text_2,
       banner_text_3:this.state.banner_text_3,
       text_below_bannerImage:this.state.text_below_bannerImage,
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
        response: fetch("http://18.221.47.207:3000/edit_content", {
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
              this.props.history.push("/admin/content");
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
                      onClick={() => this.props.history.push("/admin/content")}
                    >
                      Content
                    </button>
                    <MediaComponent
                      onSelectMediaItem={this.handleMediaChooseImage}
                      buttonName={<MDBIcon icon="camera" />}
                      restriction="image/*"
                    />
                    <button
                      className="admin-button-style ml-auto"
                      onClick={() => this.addContent()}
                    >
                      {" "}
                      Save &amp; Publish
                    </button>
                  </div>
                  <div className="col-12 mt-4 d-flex justify-content-between align-items-center">
                    <h3> Main Content</h3>
                    {this.renderSelect()}
                  </div>
                </div>

                <div className="row px-2 my-2 mx-0">
                    {this.mainTitle()}
                    {this.bannerImage1()}
                    {this.bannerText1()}
                  {this.bannerImage2()}
                  {this.bannerText2()}

                  {this.bannerImage3()}
                  {this.bannerText3()}
                  {this.textBelowBannerImage()}

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

export default editContent;
